import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { Anthropic } from "@anthropic-ai/sdk";
import { generateObject, generateText } from "ai";
import { z } from "zod";

export type LLMProvider = "openai" | "claude" | "google";

export interface LLMResponse {
  provider: LLMProvider;
  response: SearchResult[];
  metadata: Record<string, unknown>;
  error?: string;
}

const schemaDescription = {
  title: "Title of the brand/topic",
  url: "URL of the brand/topic it must be a top level domain and not a subdomain or a path",
  snippet:
    "Snippet about the brand/topic in 100 words MAXIMUM based on the prompt and the search results",
};

const resultSchema = z.object({
  title: z.string().describe(schemaDescription.title),
  url: z.string().describe(schemaDescription.url),
  snippet: z.string().describe(schemaDescription.snippet),
});
const searchResultsSchema = z.array(resultSchema);

export type SearchResult = z.infer<typeof resultSchema>;

function createSearchPrompt(originalPrompt: string): string {
  return `<ROLE>
  You are a helpful assistant that can search the web and analyze information based on the prompt.
</ROLE>

<TASK>
  Search and analyze information for: "${originalPrompt}"
</TASK>

<INSTRUCTIONS>
  - You must only return information in the format of a array of JSON objects.
  - Each object must have the following keys:
    - title: Title of the brand/topic
    - url: string (the URL of the brand/topic) it must be a top level domain and not a subdomain or a path
    - snippet: string (the snippet of the brand/topic in 100 words MAXIMUM based on the prompt and the search results)
  - We are only going to return one object per brand/topic, no other text or formatting
</INSTRUCTIONS>

<EXAMPLES>
  PROMPT: "top 3 search engines"
  RESPONSE: [
    {
      "title": "Google",
      "url": "https://www.google.com",
      "snippet": "Google is a search engine"
    },
    {
      "title": "Bing",
      "url": "https://www.bing.com",
      "snippet": "Bing is a search engine"
    },
    {
      "title": "DuckDuckGo",
      "url": "https://www.duckduckgo.com",
      "snippet": "DuckDuckGo is a search engine"
    }
  ]

  PROMPT: "Best electric car brands in the US"
  RESPONSE: [
    {
      "title": "Tesla",
      "url": "https://www.tesla.com",
      "snippet": "Tesla is a electric car company"
    },
    {
      "title": "Lucid",
      "url": "https://www.lucid.com",
      "snippet": "Lucid is a electric car company"
    },
    {
      "title": "Rivian",
      "url": "https://www.rivian.com",
      "snippet": "Rivian is a electric car company"
    }
  ]
</EXAMPLES>
`;
}

export async function processPromptWithOpenAI(
  prompt: string
): Promise<LLMResponse> {
  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      tools: {
        web_search_preview: openai.tools.webSearchPreview({
          searchContextSize: "high",
        }),
      },
    });

    const parsed = searchResultsSchema.parse(JSON.parse(result.text));

    return {
      provider: "openai",
      response: parsed,
      metadata: { result },
    };
  } catch (error) {
    return {
      provider: "openai",
      response: [],
      metadata: {},
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function processPromptWithGoogle(
  prompt: string
): Promise<LLMResponse> {
  try {
    const result = await generateObject({
      model: google("gemini-2.5-pro-preview-05-06", {
        useSearchGrounding: true,
        structuredOutputs: true,
      }),
      output: "object",
      schema: searchResultsSchema,
      prompt,
      maxTokens: 5000,
    });

    if (!result.object) {
      throw new Error("No results found");
    }

    const parsed = searchResultsSchema.parse(result.object);

    return {
      provider: "google",
      response: parsed,
      metadata: { result },
    };
  } catch (error) {
    return {
      provider: "google",
      response: [],
      metadata: {},
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

const claudeSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          title: {
            type: "string" as const,
            description: schemaDescription.title,
          },
          url: {
            type: "string" as const,
            description: schemaDescription.url,
          },
          snippet: {
            type: "string" as const,
            description: schemaDescription.snippet,
          },
        },
        required: ["title", "url", "snippet"],
      },
    },
  },
  required: ["results"],
};

const anthropic = new Anthropic();

export async function processPromptWithClaude(
  prompt: string
): Promise<LLMResponse> {
  try {
    const result = await anthropic.messages.create({
      model: "claude-3-7-sonnet-latest",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 5000,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 5,
        },
        {
          name: "format_search_results",
          description: "Format search results into structured JSON",
          input_schema: claudeSchema,
        },
      ],
      tool_choice: { type: "tool", name: "format_search_results" },
    });

    const formatted = result.content.find((block) => block.type === "tool_use");

    if (!formatted || !formatted.input) {
      throw new Error("No formatted results found");
    }

    const parsed = z
      .object({
        results: searchResultsSchema,
      })
      .parse(formatted.input);

    return {
      provider: "claude",
      response: parsed.results,
      metadata: { result },
    };
  } catch (error) {
    return {
      provider: "claude",
      response: [],
      metadata: {},
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function processPromptWithAllProviders(
  prompt: string
): Promise<LLMResponse[]> {
  const searchPrompt = createSearchPrompt(prompt);
  const promises = [
    processPromptWithOpenAI(searchPrompt),
    processPromptWithGoogle(searchPrompt),
    processPromptWithClaude(searchPrompt),
  ];

  return Promise.all(promises);
}

"use server";

import { db } from "@/db";
import { topics } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getUser } from "@/auth/server";
import { revalidatePath } from "next/cache";
import { cleanUrl } from "@/lib/utils";
import { checkTopicLimit } from "@/lib/subscription";
import { generatePromptSuggestions } from "@/lib/suggestions";
import { createPrompt } from "@/components/dashboard/rankings/actions";

export async function deleteTopic(topicId: string) {
  const user = await getUser();
  if (!user) throw new Error("User not found");

  try {
    await db
      .delete(topics)
      .where(and(eq(topics.id, topicId), eq(topics.userId, user.id)));

    revalidatePath("/dashboard/topics");
  } catch (error) {
    console.error("Failed to delete topic:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export interface CreateTopicFromUrlData {
  url: string;
}

export interface CreateTopicState {
  success?: boolean;
  error?: string;
  topicId?: string;
}

export async function createTopicFromUrl(
  prevState: CreateTopicState | null,
  formData: FormData
): Promise<CreateTopicState> {
  try {
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const url = formData.get("url") as string;

    if (!url?.trim()) {
      return {
        success: false,
        error: "URL is required",
      };
    }

    // Check topic limits before creating
    const topicCheck = await checkTopicLimit(user.id);

    if (!topicCheck.canCreateTopic) {
      return {
        success: false,
        error: `You've reached your limit of ${topicCheck.limit} topic(s). Upgrade your plan to track more topics.`,
      };
    }

    const domain = cleanUrl(url.trim());
    const name = domain.split(".")[0];
    const description = `Topic for ${cleanUrl(url.trim())}`;

    const [newTopic] = await db
      .insert(topics)
      .values({
        name,
        logo: domain,
        description,
        userId: user.id,
      })
      .returning({ id: topics.id });

    revalidatePath("/dashboard/topics");

    // Auto-create 10 prompts for the new topic in the background
    // Don't await this - let it happen asynchronously
    createAutoPromptsInBackground(newTopic.id, name, description).catch(
      (error) => {
        console.error("Failed to create auto-prompts in background:", error);
      }
    );

    return {
      success: true,
      topicId: newTopic.id,
    };
  } catch (error) {
    console.error("Failed to create topic:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Helper function to create prompts in the background
async function createAutoPromptsInBackground(
  topicId: string,
  name: string,
  description: string
) {
  try {
    const suggestions = await generatePromptSuggestions(name, description, 10);

    // Take up to 10 suggestions, or create fallback prompts if fewer suggestions
    const promptsToCreate = suggestions.slice(0, 10);

    // If we have fewer than 10 suggestions, add some fallback prompts
    if (promptsToCreate.length < 10) {
      const fallbackPrompts = [
        `best ${name} alternatives`,
        `${name} vs competitors`,
        `top ${name} features`,
        `${name} pricing comparison`,
        `${name} customer reviews`,
        `${name} use cases`,
        `${name} integration options`,
        `${name} security features`,
        `${name} performance benchmarks`,
        `${name} implementation guide`,
      ];

      const remainingCount = 10 - promptsToCreate.length;
      for (let i = 0; i < remainingCount && i < fallbackPrompts.length; i++) {
        promptsToCreate.push({
          id: `fallback_${i}`,
          content: fallbackPrompts[i],
          description: `Auto-generated prompt for ${name} analysis`,
        });
      }
    }

    // Create prompts in parallel with skipRevalidation to avoid render context issues
    const promptCreationPromises = promptsToCreate.map((suggestion) =>
      createPrompt({
        content: suggestion.content,
        topicId: topicId,
        geoRegion: "global",
        skipRevalidation: true,
      })
    );

    await Promise.all(promptCreationPromises);

    console.log(
      `Successfully created ${promptsToCreate.length} auto-prompts for topic ${name}`
    );
  } catch (error) {
    console.error("Failed to create auto-prompts in background:", error);
  }
}

// Keep the original function for backward compatibility if needed elsewhere
export async function createTopicFromUrlLegacy(
  data: CreateTopicFromUrlData
): Promise<{ success: boolean; topicId?: string; error?: string }> {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");

    // Check topic limits before creating
    const topicCheck = await checkTopicLimit(user.id);

    if (!topicCheck.canCreateTopic) {
      return {
        success: false,
        error: `You've reached your limit of ${topicCheck.limit} topics. Upgrade your plan to track more topics.`,
      };
    }

    const domain = cleanUrl(data.url);
    const name = domain.split(".")[0];
    const description = `Topic for ${cleanUrl(data.url)}`;

    const [newTopic] = await db
      .insert(topics)
      .values({
        name,
        logo: domain,
        description,
        userId: user.id,
      })
      .returning({ id: topics.id });

    revalidatePath("/dashboard/topics");

    // Auto-create 10 prompts for the new topic in the background
    // Don't await this - let it happen asynchronously
    createAutoPromptsInBackground(newTopic.id, name, description).catch(
      (error) => {
        console.error("Failed to create auto-prompts in background:", error);
      }
    );

    return {
      success: true,
      topicId: newTopic.id,
    };
  } catch (error) {
    console.error("Failed to create topic:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

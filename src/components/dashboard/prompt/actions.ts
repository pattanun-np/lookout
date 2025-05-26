import { Prompt, Region } from "@/types/prompt";
import { db } from "@/db";
import { prompts, modelResults } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getUser } from "@/auth/server";

export async function getPrompts(): Promise<Prompt[]> {
  try {
    const promptsWithResults = await db
      .select({
        id: prompts.id,
        content: prompts.content,
        visibilityScore: prompts.visibilityScore,
        tags: prompts.tags,
        geoRegion: prompts.geoRegion,
        completedAt: prompts.completedAt,
        results: modelResults.results,
      })
      .from(prompts)
      .leftJoin(modelResults, eq(prompts.id, modelResults.promptId))
      .where(eq(prompts.status, "completed"))
      .orderBy(desc(prompts.createdAt));

    const transformedPrompts: Prompt[] = promptsWithResults.map((row) => ({
      id: row.id,
      content: row.content,
      visibilityScore: row.visibilityScore,
      tags: row.tags || [],
      geoRegion: row.geoRegion,
      completedAt: row.completedAt,
      top: row.results || [],
    }));

    return transformedPrompts;
  } catch (error) {
    console.error("Failed to fetch prompts:", error);
    return [];
  }
}

export interface CreatePromptData {
  content: string;
  topicId: string;
  geoRegion?: Region;
  tags?: string[];
}

export async function createPrompt(
  data: CreatePromptData
): Promise<{ success: boolean; promptId?: string; error?: string }> {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");

    const [newPrompt] = await db
      .insert(prompts)
      .values({
        content: data.content,
        topicId: data.topicId,
        userId: user.id,
        geoRegion: data.geoRegion ?? "global",
        tags: data.tags ?? [],
        status: "pending",
      })
      .returning({ id: prompts.id });

    return {
      success: true,
      promptId: newPrompt.id,
    };
  } catch (error) {
    console.error("Failed to create prompt:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

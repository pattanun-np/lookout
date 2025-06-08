"use server";

import { db } from "@/db";
import { topics } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getUser } from "@/auth/server";
import type { Topic } from "@/types/topic";

export async function getTopics(): Promise<Topic[]> {
  const user = await getUser();
  if (!user) throw new Error("User not found");

  try {
    const res = await db.query.topics.findMany({
      where: eq(topics.userId, user.id),
      orderBy: desc(topics.createdAt),
      with: {
        prompts: true,
      },
    });

    return res;
  } catch (error) {
    console.error("Failed to fetch topics:", error);
    return [];
  }
}

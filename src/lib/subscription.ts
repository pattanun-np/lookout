import { db } from "@/db";
import { prompts, topics } from "@/db/schema";
import { eq, and, gte, count } from "drizzle-orm";
import { isPlanType, PLANS, PlanType } from "./stripe/server";
import { getUser } from "@/auth/server";

export interface UserSubscription {
  plan: PlanType;
  planStatus: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripeCurrentPeriodEnd: Date | null;
  limits: (typeof PLANS)[PlanType]["limits"];
}

const getUserPlan = async (): Promise<UserSubscription> => {
  const user = await getUser();
  const plan = user?.plan && isPlanType(user.plan) ? user.plan : "free";
  const subDetails = PLANS[plan] ?? PLANS.free;

  return {
    plan,
    planStatus: user?.planStatus || "active",
    stripeCustomerId: user?.stripeCustomerId ?? null,
    stripeSubscriptionId: user?.stripeSubscriptionId ?? null,
    stripeCurrentPeriodEnd: user?.stripeCurrentPeriodEnd ?? null,
    limits: subDetails.limits,
  };
};

export async function checkUsageLimit(userId: string): Promise<{
  canProcess: boolean;
  currentUsage: number;
  limit: number;
  plan: PlanType;
}> {
  const user = await getUser();

  if (!user) {
    return {
      canProcess: false,
      currentUsage: 0,
      limit: 0,
      plan: "free",
    };
  }

  const userPlan = await getUserPlan();

  if (user.planStatus !== "active") {
    return {
      canProcess: false,
      currentUsage: 0,
      limit: userPlan.limits.promptsPerDay || userPlan.limits.promptsPerMonth,
      plan: userPlan.plan,
    };
  }

  if (userPlan.plan === "free") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [usage] = await db
      .select({ count: count() })
      .from(prompts)
      .where(
        and(eq(prompts.userId, userId), gte(prompts.createdAt, startOfMonth))
      );

    const currentUsage = usage?.count || 0;
    const limit = userPlan.limits.promptsPerMonth;

    return {
      canProcess: currentUsage < limit,
      currentUsage,
      limit,
      plan: userPlan.plan,
    };
  }

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [usage] = await db
    .select({ count: count() })
    .from(prompts)
    .where(and(eq(prompts.userId, userId), gte(prompts.createdAt, startOfDay)));

  const currentUsage = usage?.count || 0;
  const limit = userPlan.limits.promptsPerDay;

  return {
    canProcess: currentUsage < limit,
    currentUsage,
    limit,
    plan: userPlan.plan,
  };
}

export async function getAvailableProviders(): Promise<string[]> {
  const user = await getUser();

  if (!user || user.planStatus !== "active") {
    return [...PLANS.free.limits.providers];
  }

  const userPlan = await getUserPlan();

  return [...userPlan.limits.providers];
}

export function getProcessingPriority(plan: PlanType) {
  return PLANS[plan].limits.priority;
}

export async function checkTopicLimit(userId: string): Promise<{
  canCreateTopic: boolean;
  currentTopics: number;
  limit: number;
  plan: PlanType;
}> {
  const user = await getUser();

  if (!user) {
    return {
      canCreateTopic: false,
      currentTopics: 0,
      limit: 0,
      plan: "free",
    };
  }

  const userPlan = await getUserPlan();

  if (user.planStatus !== "active") {
    return {
      canCreateTopic: false,
      currentTopics: 0,
      limit: userPlan.limits.topicsLimit,
      plan: userPlan.plan,
    };
  }

  const [topicCount] = await db
    .select({ count: count() })
    .from(topics)
    .where(and(eq(topics.userId, userId), eq(topics.isActive, true)));

  const currentTopics = topicCount?.count || 0;
  const limit = userPlan.limits.topicsLimit;

  return {
    canCreateTopic: currentTopics < limit,
    currentTopics,
    limit,
    plan: userPlan.plan,
  };
}

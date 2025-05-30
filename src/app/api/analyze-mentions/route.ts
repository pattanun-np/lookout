import { NextResponse } from "next/server";
import { getUser } from "@/auth/server";
import { processUserMentions } from "@/lib/mentions/background-processor";
import { waitUntil } from "@vercel/functions";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: work out a better strategy for background processing
    waitUntil(processUserMentions(user.id));

    return NextResponse.json({
      success: true,
      message: "Mention analysis started in background",
    });
  } catch (error) {
    console.error("Failed to start mention analysis:", error);
    return NextResponse.json(
      { error: "Failed to start analysis" },
      { status: 500 }
    );
  }
}

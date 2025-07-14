import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { redeemCode } = await request.json();

    if (!redeemCode) {
      return NextResponse.json({ error: "Redeem code is required" }, { status: 400 });
    }

    // Check if the redeem code matches the environment variable
    const validRedeemKey = process.env.REDEEM_KEY;
    
    if (!validRedeemKey) {
      return NextResponse.json({ error: "Redeem functionality not configured" }, { status: 500 });
    }

    if (redeemCode !== validRedeemKey) {
      return NextResponse.json({ error: "Invalid redeem code" }, { status: 400 });
    }

    // Update user to enterprise plan
    const updatedUser = await db
      .update(user)
      .set({
        plan: "enterprise",
        planStatus: "active",
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id))
      .returning();

    if (!updatedUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Successfully upgraded to Enterprise plan!",
      plan: updatedUser[0].plan 
    });

  } catch (error) {
    console.error("Error redeeming code:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
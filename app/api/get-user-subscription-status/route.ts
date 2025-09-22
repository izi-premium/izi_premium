import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { UserService } from "../../../lib/user-service";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserService.getUserById(userId);
    const hasActivePremium = await UserService.hasActivePremium(userId);

    return NextResponse.json({
      user: {
        plan: user?.plan || "free",
        subscriptionEndDate: user?.subscriptionEndDate,
        paymentDate: user?.paymentDate,
      },
      hasActivePremium,
    });
  } catch (error) {
    console.error("Error getting user subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

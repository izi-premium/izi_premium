import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    // Get the user session
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user in Firestore by email
    const userQuery = await getAdminDb()
      .collection("users")
      .where("email", "==", session.user.email)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();

    // Return subscription data
    const subscriptionData = {
      isPremium: userData.isPremium || false,
      subscriptionStatus: userData.subscriptionStatus || "inactive",
      premiumEndsAt: userData.premiumEndsAt?.toDate() || null,
      currentPeriodEnd: userData.currentPeriodEnd?.toDate() || null,
      currentPeriodStart: userData.currentPeriodStart?.toDate() || null,
      stripeSubscriptionId: userData.stripeSubscriptionId || null,
      stripeCustomerId: userData.stripeCustomerId || null,
      region: userData.region || null,
      premiumActivatedAt: userData.premiumActivatedAt?.toDate() || null,
    };

    return NextResponse.json(subscriptionData);
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

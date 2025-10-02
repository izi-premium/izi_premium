import { getServerUser } from "@/lib/auth-server";
import { getAdminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the user from Firebase Auth
    const user = await getServerUser();

    if (!user?.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user in Firestore by uid
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", user.uid)
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

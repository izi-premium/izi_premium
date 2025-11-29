import { getServerUser } from "@/lib/auth-server";
import { getAdminDb } from "@/lib/firebase-admin";
import { getServerStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

    // If user has an active subscription, cancel it first
    if (
      userData.stripeSubscriptionId &&
      userData.subscriptionStatus === "active"
    ) {
      try {
        const stripe = getServerStripe();
        // Cancel the subscription immediately
        await stripe.subscriptions.cancel(userData.stripeSubscriptionId);
        console.log(
          "Cancelled Stripe subscription:",
          userData.stripeSubscriptionId
        );
      } catch (stripeError) {
        console.error("Error cancelling Stripe subscription:", stripeError);
        // Continue with account deletion even if subscription cancellation fails
      }
    }

    // Delete user data from Firestore
    // Delete OTPs related to this user
    if (user.email) {
      const otpDoc = await getAdminDb()
        .collection("otps")
        .doc(user.email)
        .get();
      if (otpDoc.exists) {
        await otpDoc.ref.delete();
      }

      // Delete password resets related to this user
      const resetDoc = await getAdminDb()
        .collection("passwordResets")
        .doc(user.email)
        .get();
      if (resetDoc.exists) {
        await resetDoc.ref.delete();
      }
    }

    // Delete user document from Firestore
    await userDoc.ref.delete();

    // Delete user from Firebase Authentication
    const admin = require("firebase-admin");
    try {
      await admin.auth().deleteUser(user.uid);
      console.log("Deleted user from Firebase Auth:", user.uid);
    } catch (authError) {
      console.error("Error deleting user from Firebase Auth:", authError);
      // Continue even if auth deletion fails
    }

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete account" },
      { status: 500 }
    );
  }
}

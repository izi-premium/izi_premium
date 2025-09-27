// File: /app/api/subscription/cancel/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { getServerStripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
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

    // Check if user has an active subscription
    if (!userData.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 400 }
      );
    }

    if (userData.subscriptionStatus !== "active") {
      return NextResponse.json(
        { error: "Subscription is not active" },
        { status: 400 }
      );
    }

    // Cancel the subscription in Stripe
    const stripe = getServerStripe();

    try {
      // Cancel the subscription at period end (so user keeps access until current period ends)
      const cancelledSubscription: Stripe.Subscription =
        await stripe.subscriptions.update(userData.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });

      console.log("Stripe subscription cancelled:", cancelledSubscription.id);
      console.log("Updating Firebase for user:", session.user.email);

      // Update user in Firestore with better error handling
      const updateData = {
        subscriptionStatus: "cancelled",
        premiumCancelledAt: new Date(),
        updatedAt: new Date(),
        // Note: We don't set isPremium to false here because user keeps access until period ends
        // The webhook will handle setting isPremium to false when the subscription actually ends
      };

      console.log("Update data:", updateData);

      try {
        await userDoc.ref.update(updateData);
        console.log("Firebase update successful");

        // Verify the update by reading the document again
        const updatedDoc = await userDoc.ref.get();
        const updatedData = updatedDoc.data();
        console.log(
          "Updated subscription status:",
          updatedData?.subscriptionStatus
        );
      } catch (firebaseError) {
        console.error("Firebase update error:", firebaseError);
        throw new Error("Failed to update subscription status in database");
      }

      // Send cancellation confirmation email (optional)
      await sendCancellationEmail(
        session.user.email,
        userData.displayName || session.user.name
      );

      return NextResponse.json({
        success: true,
        message: "Subscription cancelled successfully",
        subscriptionEndsAt: userData.premiumEndsAt?.toDate() || null,
        newStatus: "cancelled", // Return the new status for frontend verification
      });
    } catch (stripeError) {
      console.error("Stripe cancellation error:", stripeError);
      return NextResponse.json(
        { error: "Failed to cancel subscription with payment provider" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendCancellationEmail(email: string, name?: string) {
  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: "Subscription Cancelled",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Subscription Cancelled</h2>
            <p>Hi ${name || "there"},</p>
            <p>Your premium subscription has been cancelled successfully. You'll continue to have access to premium features until the end of your current billing period.</p>
            <p>We're sorry to see you go! If you change your mind, you can always reactivate your subscription from your account settings.</p>
            <p>Thank you for being part of IZI World!</p>
            <p>Best regards,<br>The IZI World Team</p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send cancellation email");
    }
  } catch (error) {
    console.error("Error sending cancellation email:", error);
  }
}

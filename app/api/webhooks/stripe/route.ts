// app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerStripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";
import Stripe from "stripe";

// Extend Stripe Invoice interface to include subscription property
interface StripeInvoiceWithSubscription extends Stripe.Invoice {
  subscription: string | Stripe.Subscription | null;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature found" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getServerStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("Received Stripe webhook:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "subscription") {
          await handleSubscriptionCheckout(session);
        } else {
          await handleSuccessfulPayment(session);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as StripeInvoiceWithSubscription;
        await handleSuccessfulSubscriptionPayment(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as StripeInvoiceWithSubscription;
        await handleFailedSubscriptionPayment(invoice);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancelled(subscription);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCheckout(session: Stripe.Checkout.Session) {
  console.log("Processing subscription checkout completion:", session.id);

  const userId = session.metadata?.userId;
  const userEmail = session.metadata?.userEmail;
  const region = session.metadata?.region;

  if (!userId) {
    console.error("No userId in session metadata");
    return;
  }

  try {
    // Get the subscription details
    const subscription = await getServerStripe().subscriptions.retrieve(
      session.subscription as string,
      { expand: ["items"] } // Expand items to get period info
    );

    // Find user in Firestore
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", userId)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.error("User not found:", userId);
      return;
    }

    const userDoc = userQuery.docs[0];

    // Get period info from the first subscription item
    const subscriptionItem = subscription.items.data[0];
    const currentPeriodStart = subscriptionItem.current_period_start;
    const currentPeriodEnd = subscriptionItem.current_period_end;

    // Update user to premium with subscription info
    await userDoc.ref.update({
      isPremium: true,
      premiumActivatedAt: new Date(),
      stripeCustomerId: session.customer,
      stripeSubscriptionId: subscription.id,
      stripeSessionId: session.id,
      subscriptionStatus: subscription.status,
      currentPeriodStart: new Date(currentPeriodStart * 1000),
      currentPeriodEnd: new Date(currentPeriodEnd * 1000),
      paymentMethod: "stripe",
      region: region,
      updatedAt: new Date(),
    });

    // Update checkout session status
    await getAdminDb().collection("checkoutSessions").doc(session.id).update({
      status: "completed",
      completedAt: new Date(),
      stripeCustomerId: session.customer,
      stripeSubscriptionId: subscription.id,
    });

    // Create subscription record
    await getAdminDb()
      .collection("subscriptions")
      .add({
        userId: userId,
        userEmail: userEmail,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: session.customer,
        status: subscription.status,
        currentPeriodStart: new Date(currentPeriodStart * 1000),
        currentPeriodEnd: new Date(currentPeriodEnd * 1000),
        region: region,
        createdAt: new Date(),
      });

    console.log("Successfully activated subscription for user:", userEmail);

    // Send welcome email
    await sendWelcomeEmail(userEmail!, userDoc.data().displayName);
  } catch (error) {
    console.error("Error handling subscription checkout:", error);
  }
}

async function handleSuccessfulSubscriptionPayment(
  invoice: StripeInvoiceWithSubscription
) {
  console.log("Processing successful subscription payment:", invoice.id);

  // Invoice.subscription can be a string (ID) or Subscription object or null
  const subscriptionId =
    typeof invoice.subscription === "string"
      ? invoice.subscription
      : invoice.subscription?.id;

  if (!subscriptionId) {
    console.log("No subscription ID found in invoice");
    return;
  }

  try {
    const subscription = await getServerStripe().subscriptions.retrieve(
      subscriptionId,
      { expand: ["items"] } // Expand items to get period info
    );

    // Find user by subscription ID
    const userQuery = await getAdminDb()
      .collection("users")
      .where("stripeSubscriptionId", "==", subscription.id)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.error("User not found for subscription:", subscription.id);
      return;
    }

    const userDoc = userQuery.docs[0];

    // Get period info from the first subscription item
    const subscriptionItem = subscription.items.data[0];
    const currentPeriodStart = subscriptionItem.current_period_start;
    const currentPeriodEnd = subscriptionItem.current_period_end;

    // Update subscription period
    await userDoc.ref.update({
      currentPeriodStart: new Date(currentPeriodStart * 1000),
      currentPeriodEnd: new Date(currentPeriodEnd * 1000),
      subscriptionStatus: subscription.status,
      updatedAt: new Date(),
    });

    console.log("Updated subscription period for user");
  } catch (error) {
    console.error("Error handling subscription payment:", error);
  }
}

async function handleFailedSubscriptionPayment(
  invoice: StripeInvoiceWithSubscription
) {
  console.log("Processing failed subscription payment:", invoice.id);

  // Invoice.subscription can be a string (ID) or Subscription object or null
  const subscriptionId =
    typeof invoice.subscription === "string"
      ? invoice.subscription
      : invoice.subscription?.id;

  if (!subscriptionId) {
    console.log("No subscription ID found in invoice");
    return;
  }

  try {
    // Find user by subscription ID
    const userQuery = await getAdminDb()
      .collection("users")
      .where("stripeSubscriptionId", "==", subscriptionId)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.error("User not found for subscription:", subscriptionId);
      return;
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();

    // Update user status but don't immediately remove premium
    await userDoc.ref.update({
      subscriptionStatus: "past_due",
      updatedAt: new Date(),
    });

    // Send payment failed email
    await sendPaymentFailedEmail(userData.email, userData.displayName);
  } catch (error) {
    console.error("Error handling failed subscription payment:", error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("Processing subscription update:", subscription.id);

  try {
    // Find user by subscription ID
    const userQuery = await getAdminDb()
      .collection("users")
      .where("stripeSubscriptionId", "==", subscription.id)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.error("User not found for subscription:", subscription.id);
      return;
    }

    const userDoc = userQuery.docs[0];

    // Get period info from the first subscription item
    const subscriptionItem = subscription.items.data[0];
    const currentPeriodStart = subscriptionItem.current_period_start;
    const currentPeriodEnd = subscriptionItem.current_period_end;

    // Update subscription status
    await userDoc.ref.update({
      subscriptionStatus: subscription.status,
      currentPeriodStart: new Date(currentPeriodStart * 1000),
      currentPeriodEnd: new Date(currentPeriodEnd * 1000),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error handling subscription update:", error);
  }
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  console.log("Processing subscription cancellation:", subscription.id);

  try {
    // Find user by subscription ID
    const userQuery = await getAdminDb()
      .collection("users")
      .where("stripeSubscriptionId", "==", subscription.id)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.error("User not found for subscription:", subscription.id);
      return;
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();

    // Update user status - remove premium access
    await userDoc.ref.update({
      isPremium: false,
      subscriptionStatus: "cancelled",
      premiumCancelledAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Cancelled premium access for user:", userData.email);
  } catch (error) {
    console.error("Error handling subscription cancellation:", error);
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  console.log("Processing successful payment for session:", session.id);

  const userId = session.metadata?.userId;
  const userEmail = session.metadata?.userEmail;
  const region = session.metadata?.region;

  if (!userId) {
    console.error("No userId in session metadata");
    return;
  }

  try {
    // Find user in Firestore
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", userId)
      .limit(1)
      .get();

    if (userQuery.empty) {
      console.error("User not found:", userId);
      return;
    }

    const userDoc = userQuery.docs[0];

    // Update user to premium
    await userDoc.ref.update({
      isPremium: true,
      premiumActivatedAt: new Date(),
      stripeCustomerId: session.customer,
      stripeSessionId: session.id,
      paymentMethod: "stripe",
      region: region,
      updatedAt: new Date(),
    });

    // Update checkout session status
    await getAdminDb().collection("checkoutSessions").doc(session.id).update({
      status: "completed",
      completedAt: new Date(),
      stripeCustomerId: session.customer,
    });

    // Create purchase record
    await getAdminDb().collection("purchases").add({
      userId: userId,
      userEmail: userEmail,
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      amount: session.amount_total,
      currency: session.currency,
      region: region,
      status: "completed",
      purchaseType: "premium",
      createdAt: new Date(),
    });

    console.log("Successfully updated user to premium:", userEmail);

    // Optional: Send welcome email
    await sendWelcomeEmail(userEmail!, userDoc.data().displayName);
  } catch (error) {
    console.error("Error updating user to premium:", error);
  }
}

async function sendWelcomeEmail(email: string, name: string) {
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
        subject: "Welcome to IziWorld Premium! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to IZI World Premium!</h2>
            <p>Hi ${name},</p>
            <p>Your premium subscription is now active! You now have access to all premium features.</p>
            <p>Your subscription will renew monthly, and you can manage it anytime in your account settings.</p>
            <p>Thank you for supporting IziWorld!</p>
            <p>Best regards,<br>The IZI World Team</p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send welcome email");
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

async function sendPaymentFailedEmail(email: string, name: string) {
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
        subject: "Payment Failed - Action Required",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Payment Failed</h2>
            <p>Hi ${name},</p>
            <p>We couldn't process your subscription payment. Please update your payment method to continue your premium access.</p>
            <p>Visit your account settings to update your payment information.</p>
            <p>Best regards,<br>The IZI World Team</p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error("Error sending payment failed email:", error);
  }
}

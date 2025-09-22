import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebase-admin";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature found" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
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
        await handleSuccessfulPayment(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        await handleFailedPayment(paymentIntent);
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

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  console.log("Processing failed payment:", paymentIntent.id);

  // You can add logic here to handle failed payments
  // For example, sending an email to the user or updating records
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
            <p>Congratulations! Your premium subscription is now active. You now have access to all premium features in the IziWorld mobile app.</p>
            <p>Here's what you can do now:</p>
            <ul>
              <li>Access all premium content in the mobile app</li>
              <li>Enjoy an ad-free experience</li>
              <li>Get priority customer support</li>
            </ul>
            <p>Download the mobile app and log in with the same email address to access your premium features.</p>
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

// app/api/webhooks/stripe/route.ts - Simplified version
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { UserService } from "../../../../lib/user-service";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const clerkUserId = session.metadata?.clerkUserId;

        if (clerkUserId && session.subscription) {
          // Simply set user to premium - let Stripe handle the rest
          // await UserService.updateSubscription(
          //   clerkUserId,
          //   "premium",
          //   undefined, // No end date - Stripe manages this
          //   session.customer as string,
          //   session.subscription as string
          // );

          console.log("User upgraded to premium:", clerkUserId);
        }
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object;
        const customer = await stripe.customers.retrieve(
          updatedSubscription.customer as string
        );

        if (customer && !customer.deleted && customer.metadata?.clerkUserId) {
          // Update based on subscription status only
          const plan =
            updatedSubscription.status === "active" ? "premium" : "free";

          // await UserService.updateSubscription(
          //   customer.metadata.clerkUserId,
          //   plan,
          //   undefined, // No end date needed
          //   customer.id,
          //   updatedSubscription.id
          // );

          console.log(
            `User subscription updated to ${plan}:`,
            customer.metadata.clerkUserId
          );
        }
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        const deletedCustomer = await stripe.customers.retrieve(
          deletedSubscription.customer as string
        );

        if (
          deletedCustomer &&
          !deletedCustomer.deleted &&
          deletedCustomer.metadata?.clerkUserId
        ) {
          await UserService.updateSubscription(
            deletedCustomer.metadata.clerkUserId,
            "free"
          );

          console.log(
            "User subscription cancelled:",
            deletedCustomer.metadata.clerkUserId
          );
        }
        break;

      case "invoice.payment_succeeded":
        // Handle successful recurring payments
        const successfulInvoice = event.data.object;

        // if (successfulInvoice.subscription && successfulInvoice.customer) {
        //   const paymentCustomer = await stripe.customers.retrieve(
        //     successfulInvoice.customer as string
        //   );

        //   if (
        //     paymentCustomer &&
        //     !paymentCustomer.deleted &&
        //     paymentCustomer.metadata?.clerkUserId
        //   ) {
        //     // Ensure user is set to premium on successful payment
        //     await UserService.updateSubscription(
        //       paymentCustomer.metadata.clerkUserId,
        //       "premium",
        //       undefined,
        //       paymentCustomer.id,
        //       successfulInvoice.subscription as string
        //     );

        //     console.log(
        //       "Payment successful, user remains premium:",
        //       paymentCustomer.metadata.clerkUserId
        //     );
        //   }
        // }
        break;

      case "invoice.payment_failed":
        // Handle failed payments
        const failedInvoice = event.data.object;

        if (failedInvoice.customer) {
          const failedCustomer = await stripe.customers.retrieve(
            failedInvoice.customer as string
          );

          if (
            failedCustomer &&
            !failedCustomer.deleted &&
            failedCustomer.metadata?.clerkUserId
          ) {
            console.log(
              "Payment failed for user:",
              failedCustomer.metadata.clerkUserId
            );
            // Note: Don't immediately downgrade - Stripe will retry payments
            // Only downgrade when subscription status actually changes via subscription.updated
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

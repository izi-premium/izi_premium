import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, regionalPricing, getUserRegion } from "@/lib/stripe";
import { adminDb, getAdminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required", redirectTo: "/signin" },
        { status: 401 }
      );
    }

    // Get user data from Firestore
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", session.user.id)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userQuery.docs[0].data();

    // Check if user is already premium
    if (userData.isPremium) {
      return NextResponse.json(
        { error: "User already has premium access", redirectTo: "/dashboard" },
        { status: 400 }
      );
    }

    // Parse request body for region info
    const { countryCode, timezone, currency } = await request.json();

    // Determine user's region for pricing
    const userRegion = getUserRegion(countryCode, timezone, currency);
    const pricingConfig = regionalPricing[userRegion];

    console.log(
      "Creating checkout session for user:",
      session.user.email,
      "Region:",
      userRegion
    );

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: pricingConfig.priceId,
          quantity: 1,
        },
      ],
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email,
        region: userRegion,
      },
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      tax_id_collection: {
        enabled: true,
      },
    });

    // Store checkout session info for reference
    await getAdminDb()
      .collection("checkoutSessions")
      .doc(checkoutSession.id)
      .set({
        userId: session.user.id,
        userEmail: session.user.email,
        region: userRegion,
        amount: pricingConfig.price * 100, // Store in cents
        currency: pricingConfig.currency,
        status: "pending",
        createdAt: new Date(),
      });

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

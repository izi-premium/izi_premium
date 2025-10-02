import { getServerUser } from "@/lib/auth-server";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  getServerStripe,
  getUserRegion,
  isDiscountActive,
  LAUNCH_DISCOUNT,
  regionalPricing,
} from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Checkout API called");

    // Check if user is authenticated
    const user = await getServerUser();
    console.log("User:", user?.uid ? "authenticated" : "not authenticated");

    if (!user?.uid) {
      return NextResponse.json(
        { error: "Authentication required", redirectTo: "/signin" },
        { status: 401 }
      );
    }

    // Get user data from Firestore
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", user.uid)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userQuery.docs[0].data();

    // Check if user is already premium
    if (userData.isPremium) {
      return NextResponse.json(
        { error: "User already has premium access", redirectTo: "/" },
        { status: 400 }
      );
    }

    // Parse request body for region info
    const { countryCode, timezone, currency } = await request.json();

    // Determine user's region for pricing
    const userRegion = getUserRegion(countryCode, timezone, currency);
    console.log("User region:", userRegion);
    const pricingConfig = regionalPricing[userRegion];
    console.log("Pricing config:", pricingConfig);

    console.log(
      "Creating subscription checkout for user:",
      user.email,
      "Region:",
      userRegion,
      "Discount active:",
      isDiscountActive()
    );

    // Check if discount is active
    const discountActive = isDiscountActive();

    // Build absolute base URL for Stripe redirects
    const originHeader =
      request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "";
    const baseUrl = originHeader.startsWith("http")
      ? originHeader
      : originHeader
        ? `https://${originHeader}`
        : "http://localhost:3000";

    // Create Stripe checkout session for subscription
    const checkoutSession = await getServerStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: pricingConfig.priceId,
          quantity: 1,
        },
      ],
      // Apply discount if active, otherwise allow promotion codes
      ...(discountActive
        ? {
            discounts: [
              {
                coupon: LAUNCH_DISCOUNT.couponId,
              },
            ],
          }
        : {
            allow_promotion_codes: true,
          }),
      customer_email: user.email,
      metadata: {
        userId: user.uid,
        userEmail: user.email,
        region: userRegion,
      },
      success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      billing_address_collection: "auto",
      tax_id_collection: {
        enabled: true,
      },
      // Subscription specific settings
      subscription_data: {
        metadata: {
          userId: user.uid,
          userEmail: user.email,
          region: userRegion,
        },
      },
    });

    // Store checkout session info for reference
    await getAdminDb()
      .collection("checkoutSessions")
      .doc(checkoutSession.id)
      .set({
        userId: user.uid,
        userEmail: user.email,
        region: userRegion,
        priceId: pricingConfig.priceId,
        currency: pricingConfig.currency,
        status: "pending",
        type: "subscription",
        discountApplied: discountActive,
        couponId: discountActive ? LAUNCH_DISCOUNT.couponId : null,
        createdAt: new Date(), // This is fine - Firestore handles Date objects
      });

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

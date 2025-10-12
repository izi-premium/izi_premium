import { getServerUser } from "@/lib/auth-server";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  getServerStripe,
  getUserRegion,
  isDiscountActive,
  regionalPricing,
} from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Checkout API called");

    const user = await getServerUser();

    if (!user?.uid) {
      return NextResponse.json(
        { error: "Authentication required", redirectTo: "/signin" },
        { status: 401 }
      );
    }
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", user.uid)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userQuery.docs[0].data();

    if (userData.isPremium) {
      return NextResponse.json(
        { error: "User already has premium access", redirectTo: "/" },
        { status: 400 }
      );
    }

    const { countryCode, timezone, currency } = await request.json();

    const userRegion = getUserRegion(countryCode, timezone, currency);
    const pricingConfig = regionalPricing[userRegion];

    const discountActive = isDiscountActive();
    const originHeader =
      request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "";
    const baseUrl = originHeader.startsWith("http")
      ? originHeader
      : originHeader
        ? `https://${originHeader}`
        : "http://localhost:3000";
    const checkoutSession = await getServerStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: pricingConfig.priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
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
      subscription_data: {
        metadata: {
          userId: user.uid,
          userEmail: user.email,
          region: userRegion,
        },
      },
    });

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
        isEarlyAdopter: discountActive,
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

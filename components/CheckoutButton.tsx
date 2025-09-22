"use client";

import { useState } from "react";
import { stripePromise } from "../lib/stripe-client";

interface CheckoutButtonProps {
  priceId: string;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

export function CheckoutButton({
  priceId,
  children,
  className = "",
  textClassName = "",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe checkout error:", error);
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} ${textClassName} ${loading ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}

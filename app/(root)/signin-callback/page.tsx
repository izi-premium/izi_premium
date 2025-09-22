"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SigninCallbackPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const checkoutIntent = searchParams.get("checkout") === "true";

  useEffect(() => {
    if (status === "loading") return; // Still loading, wait

    if (status === "authenticated" && session?.user && checkoutIntent) {
      // User is authenticated and came from checkout flow
      // Initiate Stripe checkout
      const initiateCheckout = async () => {
        try {
          const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              countryCode: undefined,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              currency: undefined,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            // Redirect to Stripe checkout
            window.location.href = data.checkoutUrl;
          } else {
            console.error("Checkout error:", data.error);
            // Fallback to home page
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Checkout network error:", error);
          // Fallback to home page
          window.location.href = "/";
        }
      };

      initiateCheckout();
    } else if (status === "authenticated" && session?.user) {
      // User is authenticated but no checkout intent, redirect to home
      window.location.href = "/";
    } else if (status === "unauthenticated") {
      // User is not authenticated, redirect to signin
      window.location.href = "/signin";
    }
  }, [session, status, checkoutIntent]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-gray-600">
          {checkoutIntent ? "Redirecting to checkout..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
}

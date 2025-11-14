"use client";

import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function CancelPage() {
  const tCancel = useTranslations("Cancel");
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleTryAgain = async () => {
    if (loading) return;

    if (!user) {
      // User is not logged in, redirect to signup with checkout intent
      window.location.href = "/signup?checkout=true";
      return;
    }

    // User is logged in, create Stripe checkout session
    setLoading(true);
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
        alert(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop flex min-h-screen w-full items-center justify-center bg-gray-50 py-12 pt-[12rem]">
      <div className="bg-secondary-text-50 w-full max-w-[clamp(60rem,31.2vw,120rem)] space-y-8 rounded-[1.2rem] px-8 py-8 shadow-sm">
        <div className="text-center">
          {/* Cancel Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h2 className="paragraph-24-medium md:subtitle-medium mb-2 font-bold text-gray-900">
            {tCancel("title")}
          </h2>

          <p className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal mb-6 text-gray-600">
            {tCancel("subtitle")}
          </p>

          {/* Why upgrade section */}
          <div className="mb-6 rounded-lg bg-white p-6 text-left shadow-md">
            <h3 className="paragraph-18-medium md:paragraph-24-medium 2xl:subtitle-medium mb-3 text-gray-900 xl:mb-8">
              {tCancel("reasons-title")}
            </h3>
            <ul className="space-y- text-sm text-gray-600 xl:space-y-6">
              <li className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal text-primary-text-500 flex w-full items-center">
                <svg
                  className="mr-2 size-4 h-4 min-h-4 w-4 min-w-4 text-green-500 xl:size-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {tCancel("reason1")}
              </li>
              <li className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal text-primary-text-500 flex w-full items-center">
                <svg
                  className="mr-2 size-4 h-4 min-h-4 w-4 min-w-4 text-green-500 xl:size-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {tCancel("reason2")}
              </li>
              <li className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal text-primary-text-500 flex w-full items-center">
                <svg
                  className="mr-2 size-4 h-4 min-h-4 w-4 min-w-4 text-green-500 xl:size-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {tCancel("reason3")}
              </li>
              <li className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal text-primary-text-500 flex w-full items-center">
                <svg
                  className="mr-2 size-4 h-4 min-h-4 w-4 min-w-4 text-green-500 xl:size-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {tCancel("reason4")}
              </li>
              <li className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal text-primary-text-500 flex w-full items-center">
                <svg
                  className="mr-2 size-4 h-4 min-h-4 w-4 min-w-4 text-green-500 xl:size-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {tCancel("reason5")}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleTryAgain}
              disabled={loading}
              className="paragraph-14-normal md:paragraph-18-medium inline-block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:cursor-pointer hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? `${tCancel("process")}` : `${tCancel("retry")}`}
            </button>

            <Link
              href="/"
              className="paragraph-14-normal md:paragraph-18-medium inline-block w-full rounded-lg bg-gray-200 px-4 py-3 text-center font-medium text-gray-700 transition-colors hover:cursor-pointer hover:bg-gray-300"
            >
              {tCancel("home")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

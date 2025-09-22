// app/thank-you/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ThankYouPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add any post-purchase logic here if needed
    // For example, you could verify the payment with Stripe
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-green-600"></div>
          <p className="text-gray-600">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Thank You Message */}
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Thank You for Your Purchase!
        </h1>

        <div className="mb-6 space-y-3">
          <p className="text-gray-600">
            {session?.user?.name ? `Hi ${session.user.name}, y` : "Y"}our
            premium subscription is now active!
          </p>

          <p className="text-gray-600">
            You now have access to all premium features in the IziWorld mobile
            app.
          </p>

          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">What's Next?</h3>
            <ul className="space-y-1 text-left text-sm text-blue-800">
              <li>• Download the IziWorld mobile app</li>
              <li>• Log in with the same email address</li>
              <li>• Enjoy your premium features!</li>
            </ul>
          </div>

          {sessionId && (
            <p className="mt-4 text-xs text-gray-400">
              Order ID: {sessionId.slice(-8)}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block w-full rounded-md bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Return to Home
          </Link>

          <div className="flex gap-3">
            <a
              href="#" // Replace with your App Store link
              className="flex-1 rounded-md bg-gray-900 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
            >
              App Store
            </a>
            <a
              href="#" // Replace with your Play Store link
              className="flex-1 rounded-md bg-gray-900 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
            >
              Play Store
            </a>
          </div>
        </div>

        {/* Support */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Need help? Contact our{" "}
            <Link href="/support" className="text-blue-600 hover:underline">
              support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

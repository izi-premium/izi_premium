"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    // Optional: You could trigger app download or show instructions here
    console.log(
      "Payment successful - user can now use premium features in mobile app"
    );
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
          <svg
            className="h-8 w-8 text-white"
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

        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Premium Activated!
        </h1>
        <p className="mb-6 text-gray-600">
          Your premium subscription is now active. Open the mobile app to access
          all premium features.
        </p>

        <Link href="/">
          <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

// app/thank-you/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import imageData from "@/data/uploadedImages.json";

export default function ThankYouPage() {
  const tThanks = useTranslations("Thanks");
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
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-green-600"></div>
          <p className="text-gray-600">{tThanks("processing")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper flex min-h-screen w-full items-center justify-center bg-gray-50 py-12 pt-[12rem]">
      <div className="w-full max-w-[clamp(60rem,31.2vw,120rem)] space-y-8 rounded-[1.2rem] border border-solid border-green-200 bg-gradient-to-br from-green-50 to-blue-50 px-8 py-8 shadow-sm">
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
        <h2 className="paragraph-24-medium md:subtitle-medium mb-2 w-full text-center text-gray-900">
          {tThanks("thank")}
        </h2>

        <div className="mb-6 w-full space-y-3">
          <p className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal mb-6 text-gray-600">
            {session?.user?.name
              ? `${tThanks("greet")} ${session.user.name}, ${tThanks("greetMin")}`
              : `${tThanks("greetMay")}`}
            {tThanks("active")}
          </p>

          <p className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal mb-6 text-gray-600">
            {tThanks("msg")}
          </p>

          <div className="bg-base-50 border-base-400 mt-4 rounded-lg border p-4">
            <h3 className="paragraph-18-medium md:paragraph-24-medium xl:subtitle-medium mb-3 text-gray-900 xl:mb-8">
              {tThanks("question")}
            </h3>
            <ul className="paragraph-14-normal md:paragraph-18-normal 2xl:paragraph-24-normal text-primary-text-500 flex-start-col gap-3 lg:gap-6">
              <li>{tThanks("li1")}</li>
              <li>{tThanks("li2")}</li>
              <li>{tThanks("li3")}</li>
            </ul>
          </div>

          {sessionId && (
            <p className="mt-4 text-xs text-gray-400">
              Order ID: {sessionId.slice(-8)}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex-begin-col gap-2">
          <p className="paragraph-18-medium md:paragraph-24-medium text-primary-text-700">
            {tThanks("download")}
          </p>
          <div className="flex-center-col w-full gap-3 md:flex-row md:gap-6">
            {/* App Store */}
            <Link
              href="/"
              className="border-primary-text-900 flex-center hover:shadow-hover-inner shadow-cta-header w-full max-w-[30rem] flex-nowrap gap-2 rounded-[0.8rem] border border-solid bg-white px-6 py-3 whitespace-nowrap hover:cursor-pointer"
            >
              <Image
                src={imageData["ic_baseline-apple"]}
                alt={tThanks("apple-alt")}
                width={32}
                height={32}
                className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <span className="paragraph-14-normal md:paragraph-18-medium flex-nowrap font-medium whitespace-nowrap text-black">
                {tThanks("apple")}
              </span>
            </Link>

            {/* Play Store */}
            <Link
              href="/"
              className="border-primary-text-900 flex-center hover:shadow-hover-inner shadow-cta-header w-full max-w-[30rem] flex-nowrap gap-2 rounded-[0.8rem] border border-solid bg-white px-6 py-3 whitespace-nowrap hover:cursor-pointer"
            >
              <Image
                src={imageData["streamline_play-store"]}
                alt={tThanks("google-alt")}
                width={32}
                height={32}
                className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <span className="paragraph-14-normal md:paragraph-18-medium flex-nowrap font-medium whitespace-nowrap text-black">
                {tThanks("google")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

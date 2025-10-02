"use client";

import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import imageData from "@/data/uploadedImages.json";
import { getPriceInfoWithDiscount, getUserRegion } from "@/lib/stripe";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Card2 = () => {
  const tPrice = useTranslations("Pricing");
  const { user, loading } = useAuth();
  const [pricingInfo, setPricingInfo] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userRegion = getUserRegion(
      undefined, // countryCode - you can implement geolocation if needed
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      undefined // currency
    );
    const pricing = getPriceInfoWithDiscount(userRegion);
    setPricingInfo(pricing);
  }, []);

  const handlePremiumClick = async () => {
    if (loading) return;

    if (!user) {
      // User is not logged in, redirect to signup with checkout intent
      window.location.href = "/signup?checkout=true";
      return;
    }

    // User is logged in, create Stripe checkout session
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryCode: undefined, // You can implement geolocation if needed
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
        // Handle error - could show a toast or alert
        alert(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div
      id="premium-plan"
      className="border-base-800 h-full w-full flex-1 scroll-mt-24 rounded-[3.2rem] border border-solid bg-white p-2 md:p-6 lg:min-h-[100%]"
    >
      <div className="border-base-800 flex-begin-col h-full justify-between gap-10 rounded-[1.6rem] border border-solid bg-linear-to-b from-white from-0% to-[#F5F5F5] to-[85%] p-4 md:gap-[6.4rem] md:p-12 xl:gap-[clamp(4rem,2.1vw,8rem)]">
        <div className="flex-begin-col gap-[5.6rem]">
          {/* Head */}
          <div className="flex-begin-col w-full gap-4">
            <h3 className="subtitle-medium lg:h2-medium text-primary-text-700">
              {tPrice("premium-plan-title")}
            </h3>

            {/* Pricing with discount */}
            <div className="flex-center w-full gap-2">
              {isClient && pricingInfo ? (
                <>
                  {pricingInfo.discount ? (
                    <div className="flex-start-col w-full gap-2 md:flex-row md:items-end">
                      {/* Discounted price */}
                      <div className="flex items-baseline gap-2">
                        <p className="h1-small md:h1-big lg:h1-xxl text-primary-text-700">
                          {pricingInfo.final.formatted}
                        </p>
                      </div>

                      {/* Original price crossed out */}
                      <div className="flex-start-col w-full items-end md:items-start">
                        <div className="relative inline-block">
                          <p className="paragraph-24-normal md:subtitle-normal text-primary-text-400">
                            {pricingInfo.original.formatted}
                          </p>
                          <span className="bg-error absolute top-1/2 left-0 h-[3px] w-full -rotate-12 rounded-full"></span>
                        </div>
                        <div className="flex w-full flex-nowrap items-center justify-end gap-1 md:mt-[-1.6rem] md:justify-start">
                          <p className="paragraph-24-normal md:subtitle-normal text-primary-text-700 whitespace-nowrap">
                            {pricingInfo.original.currency}
                          </p>
                          <p className="paragraph-24-normal md:subtitle-normal text-primary-text-700 whitespace-nowrap">
                            / Month
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="h1-small md:h1-big lg:h1-xxl text-primary-text-700">
                      {pricingInfo.final.formatted}
                    </p>
                  )}
                </>
              ) : (
                // Loading state to prevent hydration mismatch
                <div className="h1-small md:h1-big lg:h1-xxl text-primary-text-700">
                  <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
                </div>
              )}
            </div>
          </div>
          {/* Bullet Points */}
          <ul className="flex-begin-col w-full gap-8 xl:gap-[clamp(3.2rem,1.7vw,6.4rem)]">
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("premium-li1-img") as keyof typeof imageData]
                }
                alt={tPrice("premium-li1-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("premium-li1-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("premium-li2-img") as keyof typeof imageData]
                }
                alt={tPrice("premium-li2-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("premium-li2-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("premium-li3-img") as keyof typeof imageData]
                }
                alt={tPrice("premium-li3-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("premium-li3-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("premium-li4-img") as keyof typeof imageData]
                }
                alt={tPrice("premium-li4-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("premium-li4-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("premium-li5-img") as keyof typeof imageData]
                }
                alt={tPrice("premium-li5-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("premium-li5-text")}
              </p>
            </li>
          </ul>
        </div>

        {/* CTA button */}
        <div className="flex-begin-col w-full gap-2">
          <p className="paragraph-18-medium md:paragraph-24-medium text-primary-text-700">
            {tPrice.rich("premium-upgrade", {
              u: (chunks: React.ReactNode) => <u>{chunks}</u>,
            })}
          </p>

          <button
            onClick={handlePremiumClick}
            disabled={loading}
            className="hover:shadow-header bg-primary-action-900 relative flex w-full items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="bg-primary-action-100 absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <span className="bg-primary-action-100 absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(32px,1.66vw)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
              <p className="paragraph-18-medium md:paragraph-24-medium text-secondary-text-500 w-full text-center">
                {loading
                  ? "Loading..."
                  : !user
                    ? tPrice("premium-cta")
                    : tPrice("premium-cta")}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Card2 };

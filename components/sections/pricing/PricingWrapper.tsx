import React from "react";
import { useTranslations } from "next-intl";
import { Card1 } from "./Card1";
import { Card2 } from "./Card2";

const PricingWrapper = () => {
  const tPrice = useTranslations("Pricing");
  return (
    <section
      id="pricing"
      className="flex-center-col px-mobile md:px-tablet lg:px-desktop w-full max-w-[180rem] scroll-mt-20 gap-10 py-[6.4rem]"
    >
      <div className="flex-center-col w-fulll gap-4">
        <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
          {tPrice("title")}
        </h2>
        <p className="paragraph-18-normal md:subtitle-normal text-primary-text-500 max-w-[clamp(90rem,50.9vw,200rem)] text-center">
          {tPrice("subtitle")}
        </p>
      </div>

      <div className="gird-cols-1 grid h-fit w-full max-w-[clamp(124rem,64.6vw,248rem)] gap-10 lg:grid-cols-2">
        <Card1 />
        <Card2 />
      </div>
    </section>
  );
};

export { PricingWrapper };

import React from "react";
import { useTranslations } from "next-intl";
import { Card1 } from "./Card1";
import { Card2 } from "./Card2";

const PricingWrapper = () => {
  const tPrice = useTranslations("Pricing");
  return (
    <section className="flex-start-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-10 py-[8rem]">
      <div className="flex-center-col gap-4">
        <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
          {tPrice("title")}
        </h2>
        <p className="paragraph-18-normal md:subtitle-normal text-primary-text-500 max-w-[90rem] text-center">
          {tPrice("title")}
        </p>
      </div>

      <div className="flex-center-col w-full gap-10 lg:flex-row">
        <Card1 />
        <Card2 />
      </div>
    </section>
  );
};

export { PricingWrapper };

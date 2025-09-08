import React from "react";
import FeaturesCards from "./FeaturesCards";
import { useTranslations } from "next-intl";

const MainFeatures = () => {
  const tFeatures = useTranslations("Features");
  return (
    <section className="flex-start-col px-mobile md:px-tablet lg:px-desktop w-full gap-[6.4rem] py-[8rem] md:flex-row lg:py-[10rem]">
      <div className="flex-center-col h-auto w-full gap-10">
        <h2>{tFeatures("title")}</h2>
        <FeaturesCards />
      </div>
    </section>
  );
};

export default MainFeatures;

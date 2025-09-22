import React from "react";
import FeaturesCards from "./FeaturesCards";
import { useTranslations } from "next-intl";

const MainFeatures = () => {
  const tFeatures = useTranslations("Features");
  return (
    <section
      id="features"
      className="flex-start-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-[6.4rem] py-[8rem] lg:py-[10rem]"
    >
      <div className="flex-center-col h-fit w-full gap-10 rounded-[2rem] bg-white px-6 pt-10 pb-0 md:px-10 xl:h-fit">
        <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
          {tFeatures("title")}
        </h2>
        <FeaturesCards />
      </div>
    </section>
  );
};

export default MainFeatures;

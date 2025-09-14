import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

const Hero = () => {
  const tHero = useTranslations("Hero");

  return (
    <section className="flex-center-col w-full justify-between gap-[6.4rem] py-[8rem] lg:flex-row lg:justify-between lg:py-[10rem]">
      <div className="flex w-full flex-col items-start justify-start gap-10 py-10">
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <h1
            className="subtitle-medium text-primery-text-900 md:h2-medium lg:h1-big w-full text-center lg:text-left"
            dangerouslySetInnerHTML={{
              __html: tHero("title"),
            }}
          ></h1>
          <p className="paragraph-18-normal md:paragraph-24-normal lg:subtitle-normal text-secondary-text-900 w-full text-left">
            {tHero("subtitle")}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-4 md:items-start">
          <div className="flex w-full flex-col items-start justify-start gap-1">
            <div className="flex-start gap-[-1.75rem]">#Set of images</div>
            <div className="flex-start w-hug w-full gap-1 text-nowrap">
              <span className="paragraph-18-medium text-primary-text-700 text-nowrap">
                + # de clientes viene de DB.
              </span>
              <span className="paragraph-18-medium text-primary-text-700 text-nowrap">
                {tHero("people")}
              </span>
            </div>
          </div>
          <Link
            href="#"
            className="hover:shadow-header bg-primary-action-900 flex-center relative rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <div className="border-elevated-surfaces-500 rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(32px,1.66vw)] xl:py-[clamp(12px,0.625vw)]">
              <span className="paragraph-24-medium text-secondary-text-500">
                {tHero("cta")}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="relative h-[52.4rem] w-full bg-red-200 lg:h-[62.8rem] lg:w-[25.4rem]">
        {/* Image */}
      </div>
    </section>
  );
};

export default Hero;

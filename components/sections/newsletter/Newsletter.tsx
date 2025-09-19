import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Newsletter = () => {
  const tNewsletter = useTranslations("Newsletter");

  return (
    <section className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-10 bg-white py-[8rem] lg:py-[10rem]">
      <div className="flex-center-col gap-4">
        <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
          {tNewsletter("title")}
        </h2>
        <p className="paragraph-18-normal md:subtitle-normal text-primary-text-500 max-w-[clamp(90rem,46.9vw,180rem)] text-center">
          {tNewsletter("text")}
        </p>
      </div>
      <Link
        href="#"
        className="hover:shadow-header bg-accent-500 relative flex items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer md:w-[38rem] xl:w-fit"
      >
        <span className="absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
        <span className="absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
        <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(3.2rem,1.66vw,6.4rem)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
          <p className="paragraph-24-medium md:subtitle-medium text-secondary-text-500 w-full text-center">
            {tNewsletter("cta")}
          </p>
        </div>
      </Link>
    </section>
  );
};

export default Newsletter;

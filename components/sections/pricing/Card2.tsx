import React from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import imageData from "@/data/uploadedImages.json";
import Link from "next/link";

const Card2 = () => {
  const tPrice = useTranslations("Pricing");
  return (
    <div className="border-base-800 h-full w-full flex-1 rounded-[3.2rem] border border-solid bg-white p-2 md:p-6 lg:min-h-[100%]">
      <div className="border-base-800 flex-begin-col h-full justify-between gap-10 rounded-[1.6rem] border border-solid bg-linear-to-b from-white from-0% to-[#F5F5F5] to-[85%] p-4 md:gap-[6.4rem] md:p-12 xl:gap-[clamp(4rem,2.1vw,8rem)]">
        <div className="flex-begin-col gap-[5.6rem]">
          {/* Head */}
          <div className="flex-begin-col gap-4">
            <h3 className="subtitle-medium lg:h2-medium text-primary-text-700">
              {tPrice("premium-plan-title")}
            </h3>
            <p className="h1-small md:h1-big lg:h1-xxl text-primary-text-700">
              {tPrice("premium-plan-price")}
            </p>
            <p className="paragraph-24-normal text-primary-text-500">
              {tPrice("premium-plan-text")}
            </p>
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
          <Link
            href="#"
            className="hover:shadow-header bg-primary-action-900 relative flex w-full items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <span className="bg-primary-action-100 absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <span className="bg-primary-action-100 absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
            <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(32px,1.66vw)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
              <p className="paragraph-18-medium md:paragraph-24-medium text-secondary-text-500 w-full text-center">
                {tPrice("premium-cta")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Card2 };

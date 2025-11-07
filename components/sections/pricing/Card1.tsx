import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import imageData from "@/data/uploadedImages.json";
import Link from "next/link";

const Card1 = () => {
  const tPrice = useTranslations("Pricing");
  return (
    <div className="border-base-800 h-full w-full flex-1 rounded-[3.2rem] border border-solid bg-white p-2 md:p-6">
      <div className="border-base-800 flex-begin-col gap-10 rounded-[1.6rem] border border-solid bg-linear-to-b from-white from-0% to-[#F5F5F5] to-[85%] p-4 md:gap-[6.4rem] md:p-12 xl:gap-[clamp(4rem,2.1vw,8rem)]">
        <div className="flex-begin-col gap-[5.6rem]">
          {/* Head */}
          <div className="flex-begin-col gap-4">
            <h3 className="subtitle-medium lg:h2-medium text-primary-text-700">
              {tPrice("free-plan-title")}
            </h3>
            <p className="h1-small md:h1-big lg:h1-xxl text-primary-text-700">
              {tPrice("free-plan-price")}
            </p>
            <p className="paragraph-24-normal text-primary-text-500">
              {tPrice("free-plan-text")}
            </p>
          </div>
          {/* Bullet Points */}
          <ul className="flex-begin-col w-full gap-8 xl:gap-[clamp(3.2rem,1.7vw,6.4rem)]">
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("free-li1-img") as keyof typeof imageData]
                }
                alt={tPrice("free-li1-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("free-li1-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("free-li2-img") as keyof typeof imageData]
                }
                alt={tPrice("free-li2-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("free-li2-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("free-li3-img") as keyof typeof imageData]
                }
                alt={tPrice("free-li3-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("free-li3-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("free-li4-img") as keyof typeof imageData]
                }
                alt={tPrice("free-li4-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("free-li4-text")}
              </p>
            </li>
            <li className="flex-center w-full gap-2">
              <Image
                src={
                  imageData[tPrice("free-li5-img") as keyof typeof imageData]
                }
                alt={tPrice("free-li5-alt")}
                width={32}
                height={32}
                className="size-[2.8rem] md:size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <p className="paragraph-18-normal text-primary-text-600 md:paragraph-24-normal w-full text-left">
                {tPrice("free-li5-text")}
              </p>
            </li>
          </ul>
        </div>

        {/* Download buttons */}
        <div className="flex-begin-col w-full gap-2">
          <p className="paragraph-18-medium md:paragraph-24-medium text-primary-text-700">
            {tPrice.rich("download", {
              u: (chunks: React.ReactNode) => <u>{chunks}</u>,
            })}
          </p>
          <div className="flex-center-col w-full gap-6">
            {/* App Store */}
            <Link
              href="/"
              className="border-primary-text-900 flex-center hover:shadow-hover-inner shadow-cta-header w-full flex-nowrap gap-2 rounded-[0.8rem] border border-solid bg-white px-6 py-3 whitespace-nowrap hover:cursor-pointer xl:py-[clamp(1.2rem,0.625vw,2.4rem)]"
            >
              <Image
                src={imageData["ic_baseline-apple"]}
                alt={tPrice("apple-alt")}
                width={32}
                height={32}
                className="size-[3.2rem] 2xl:size-[4.4rem]"
              />
              <span className="paragraph-18-medium md:paragraph-24-medium flex-nowrap whitespace-nowrap text-black">
                {tPrice("apple")}
              </span>
            </Link>

            {/* Play Store */}
            <Link
              href="/"
              className="border-primary-text-900 flex-center hover:shadow-hover-inner shadow-cta-header w-full flex-nowrap gap-2 rounded-[0.8rem] border border-solid bg-white px-6 py-3 whitespace-nowrap hover:cursor-pointer xl:py-[clamp(1.2rem,0.625vw,2.4rem)]"
            >
              <Image
                src={imageData["streamline_play-store"]}
                alt={tPrice("google-alt")}
                width={32}
                height={32}
                className="size-[3.2rem] stroke-[3px] 2xl:size-[4.4rem]"
              />
              <span className="paragraph-18-medium md:paragraph-24-medium flex-nowrap whitespace-nowrap text-black">
                {tPrice("google")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card1 };

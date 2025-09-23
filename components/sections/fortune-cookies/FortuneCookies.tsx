import React from "react";
import { useTranslations } from "next-intl";
import imageData from "@/data/uploadedImages.json";
import Image from "next/image";
import { RotatoryText } from "../../shared/RotatoryText";

const FortuneCookies = () => {
  const tCookie = useTranslations("Cookies");
  const phrases = [tCookie("phrase1"), tCookie("phrase2"), tCookie("phrase3")];
  return (
    <section
      id="cookies"
      className="flex-start-col xl:container-wrapper w-full scroll-mt-20 px-[1.2rem] py-10 md:px-[3.2rem] lg:px-[5rem] lg:py-20"
    >
      <div className="flex-start-col border-primary-text-200 w-full gap-10 rounded-[2rem] border border-solid bg-white px-[1.2rem] py-10 md:px-[3.2rem] lg:px-[5rem] lg:py-20">
        <div className="flex-center-col w-full gap-4">
          <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
            {tCookie("title")}
          </h2>
          <RotatoryText
            phrases={phrases}
            textClassName="paragraph-24-normal md:paragraph-24-medium lg:subtitle-medium text-primary-text-600"
          />
        </div>
        <div className="flex-center-col w-full gap-10">
          <div className="bg-elevated-surfaces-500 border-primary-text-200 flex-start-col w-full gap-10 rounded-[1.6rem] border border-solid px-6 py-6 md:flex-row md:px-12 md:py-12">
            <div className="flex-start-col w-full gap-4">
              <h3 className="paragraph-24-medium md:subtitle-medium text-primary-text-700">
                {tCookie("card1-title")}
              </h3>
              <p className="paragraph-18-normal md:paragraph-24-normal text-primary-text-600 xl:max-w-[85%]">
                {tCookie("card1-text")}
              </p>
            </div>
            <div className="ratio-[464/360] bg-primary-text-100 flex h-[35rem] w-full justify-center overflow-hidden rounded-[0.8rem] shadow-lg md:w-[40%]">
              {/* <Image src={imageData[tCookie("card1-image") as keyof typeof imageData]}
                    alt={tCookie("card1-alt")}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 2240px): 75vw, 25vw"
                    className="object-contain object-center"/> */}
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-elevated-surfaces-500 border-primary-text-200 flex-start-col w-full flex-col-reverse gap-10 rounded-[1.6rem] border border-solid px-6 py-6 md:flex-row-reverse md:px-12 md:py-12">
          <div className="flex-start-col w-full gap-4">
            <h3 className="paragraph-24-medium md:subtitle-medium text-primary-text-700">
              {tCookie("card2-title")}
            </h3>
            <p
              className="paragraph-18-normal md:paragraph-24-normal text-primary-text-600 xl:max-w-[90%]"
              dangerouslySetInnerHTML={{
                __html: tCookie("card2-text"),
              }}
            />
          </div>
          <div className="ratio-[464/360] bg-primary-text-100 flex h-[35rem] w-full justify-center overflow-hidden rounded-[0.8rem] shadow-lg md:w-[40%]">
            {/* <Image src={imageData[tCookie("card1-image") as keyof typeof imageData]}
                    alt={tCookie("card1-alt")}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 2240px): 75vw, 25vw"
                    className="object-contain object-center"/> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export { FortuneCookies };

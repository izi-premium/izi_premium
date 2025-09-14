import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import imageData from "@/data/uploadedImages.json";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface FeatureCard {
  subtitle: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
}

const FeaturesCards = () => {
  const tFeatures = useTranslations("Features");
  const cards = tFeatures.raw("cards") as FeatureCard[];
  return (
    <div className="flex-center-col h-fit w-full min-w-full items-stretch gap-10 xl:flex-row">
      {cards.map((card, index) => (
        <div
          key={index}
          className="border-primary-text-500 bg-elevated-surfaces-500 flex w-full flex-col items-start justify-between gap-6 rounded-t-[0.8rem] border border-solid px-4 pt-4 pb-0 lg:gap-[clamp(2.4rem,1.25vw)] xl:border-b-0"
        >
          <div className="flex-start-col gap-2">
            <p className="paragraph-24-medium text-primary-text-700 w-full text-left">
              {card.subtitle}
            </p>
            <p
              className="paragraph-18-normal text-primary-text-500 w-full text-left"
              dangerouslySetInnerHTML={{
                __html: `${card.text}`,
              }}
            ></p>
          </div>
          <div className="border-primary-text-700 relative flex h-[16rem] w-full min-w-full items-end justify-end rounded-tl-[0.4rem] rounded-tr-[0.4rem] border border-solid bg-white md:h-[24rem] lg:h-full lg:min-h-[2rem] xl:border-b-0">
            <div className="relative h-[16rem] w-full md:h-[24rem] lg:h-full lg:min-h-[2rem]">
              <Image
                src={imageData[card.image.src as keyof typeof imageData]}
                alt={card.image.alt}
                fill
                sizes="(max-width: 1024px) 70vw, 25vw"
                className="bg-bottom bg-no-repeat object-contain xl:object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesCards;

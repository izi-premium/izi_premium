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
    <div className="flex-center-col w-full gap-10 md:flex-row xl:justify-between">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex-center-col border-primary-text-500 bg-elevated-surfaces-500 h-full min-h-[36rem] w-full rounded-t-[0.8rem] border border-solid px-4 pt-4 pb-0 md:max-w-[36rem] md:border-b-0 xl:max-w-[44rem] 2xl:max-w-[50rem]"
        >
          <div className="flex-start-col gap-2">
            <p className="paragraph-24-medium text-primary-text-700 w-full text-left">
              {card.subtitle}
            </p>
            <p className="paragraph-18-normal text-primary-text-500 w-full text-left">
              {card.text}
            </p>
          </div>
          <div className="border-primary-text-700 relative flex h-[14rem] w-full min-w-full items-end justify-end rounded-tl-[0.4rem] rounded-tr-[0.4rem] border border-solid bg-white md:border-b-0">
            <AspectRatio ratio={4 / 3} className="h-full w-full">
              <Image
                src={
                  imageData[card.image.src as keyof typeof imageData] ||
                  "/placeholder-icon.svg"
                }
                alt={card.image.alt}
                fill
                sizes="(max-width: 1024px) 33rem, 40rem"
                className="bg-no-repeat object-contain xl:object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesCards;

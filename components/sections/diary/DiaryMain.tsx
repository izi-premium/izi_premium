import React from "react";
import { RotatoryText } from "../../shared/RotatoryText";
import { useTranslations } from "next-intl";
import imageData from "@/data/uploadedImages.json";
import Image from "next/image";
import { AspectRatio } from "../../ui/aspect-ratio";

const DiaryMain = () => {
  const tDiary = useTranslations("Diary");
  const phrases = [tDiary("phrase1"), tDiary("phrase2"), tDiary("phrase3")];
  return (
    <section className="flex-begin-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-10 lg:flex-row-reverse">
      <div className="flex-begin-col special:min-h-[48rem] h-full w-full items-stretch">
        <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
          {tDiary("title")}
        </h2>
        <div className="flex-center-col special:min-h-[52.8rem] h-full w-full gap-10">
          <RotatoryText phrases={phrases} />
          <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal text-center">
            {tDiary("text")}
          </p>
        </div>
      </div>

      <div className="relative flex w-full justify-center overflow-hidden rounded-[1.6rem] shadow-lg">
        <Image
          src={imageData["diary-1-bg"]}
          alt="image background with paper texture"
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 2240px): 75vw, 25vw"
          className="size-full object-cover object-center"
        />
        <AspectRatio ratio={1 / 1.1} className="overflow-hidden">
          <Image
            src={imageData[tDiary("image") as keyof typeof imageData]}
            alt={tDiary("alt")}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 2240px): 75vw, 25vw"
            className="object-contain object-center"
          />
        </AspectRatio>
      </div>
    </section>
  );
};

export { DiaryMain };

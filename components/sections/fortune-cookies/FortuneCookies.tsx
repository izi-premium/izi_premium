import React from "react";
import { useTranslations } from "next-intl";
import imageData from "@/data/uploadedImages.json";
import Image from "next/image";
import { RotatoryText } from "../../shared/RotatoryText";

const FortuneCookies = () => {
  const tChat = useTranslations("Chat");
  const phrases = ["a"];
  return (
    <section className="flex-start-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-[6.4rem] py-[8rem] lg:py-[10rem]">
      <div>
        <h2></h2>
        <RotatoryText phrases={phrases} />
      </div>
    </section>
  );
};

export { FortuneCookies };

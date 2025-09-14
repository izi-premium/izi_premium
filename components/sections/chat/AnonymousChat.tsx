import React from "react";
import { useTranslations } from "next-intl";
import imageData from "@/data/uploadedImages.json";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

const AnonymousChat = () => {
  const tChat = useTranslations("Chat");
  return (
    <section className="flex-start-col w-full gap-[6.4rem] py-[8rem] lg:py-[10rem]">
      <div className="w-full">
        <div className="special:grid-cols-2 grid items-start gap-10 md:gap-16">
          <div className="flex flex-col items-start justify-start gap-10">
            <div className="flex flex-col items-start gap-2">
              <h2 className="subtitle-medium md:h2-medium text-primary-text-700">
                {tChat("title")}
              </h2>
              <p className="paragraph-24-normal md:subtitle-normal text-primary-500">
                {tChat("subtitle")}
              </p>
            </div>

            <div className="flex flex-col items-start gap-10">
              <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                {tChat("text1")}
              </p>
              <ul className="flex-start-col gap-6 py-4">
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["save"]}
                    alt="save icon"
                    width={24}
                    height={24}
                    className="2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("li1-text")}
                  </p>
                </li>
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["message-circle"]}
                    alt="nickname icon"
                    width={24}
                    height={24}
                    className="2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("li2-text")}
                  </p>
                </li>
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["globe-lock"]}
                    alt="globe with a security lock icon"
                    width={24}
                    height={24}
                    className="2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("li3-text")}
                  </p>
                </li>
              </ul>
              <p
                className="paragraph-18-normal md:paragraph-24-normal text-primary-text-500 w-full text-left"
                dangerouslySetInnerHTML={{
                  __html: tChat("note-text"),
                }}
              ></p>
            </div>
          </div>
          <div className="flex justify-center">
            <AspectRatio
              ratio={5 / 6}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              {/* <Image
                src={imageData["chat-image"]}
                alt={tChat("alt")}
                fill
                className="object-cover object-center"
              /> */}
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AnonymousChat };

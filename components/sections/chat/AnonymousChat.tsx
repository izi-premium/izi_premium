import React from "react";
import { useTranslations } from "next-intl";
import imageData from "@/data/uploadedImages.json";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

const AnonymousChat = () => {
  const tChat = useTranslations("Chat");
  return (
    <section
      id="chat"
      className="flex-start-col px-mobile md:px-tablet lg:px-desktop w-full max-w-[180rem] scroll-mt-20 gap-[6.4rem] py-[8rem] lg:py-[10rem]"
    >
      <div className="w-full">
        <div className="special:grid-cols-2 grid items-start gap-10 md:gap-16">
          <div className="flex flex-col items-start justify-start gap-10 xl:gap-16">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h2 className="subtitle-medium md:h2-medium text-primary-text-700">
                {tChat("title")}
              </h2>
              <p className="paragraph-24-normal md:subtitle-normal text-primary-text-500 text-center md:text-left">
                {tChat("subtitle")}
              </p>
            </div>

            <div className="flex flex-col items-start gap-10 xl:gap-16">
              <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                {tChat("text1")}
              </p>
              <ul className="flex-start-col gap-6 px-4">
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["save"]}
                    alt="save icon"
                    width={32}
                    height={32}
                    className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("li1-text")}
                  </p>
                </li>
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["message-circle"]}
                    alt="nickname icon"
                    width={32}
                    height={32}
                    className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("li2-text")}
                  </p>
                </li>
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["globe-lock"]}
                    alt="globe with a security lock icon"
                    width={32}
                    height={32}
                    className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("li3-text")}
                  </p>
                </li>
              </ul>
              <p className="paragraph-18-normal md:paragraph-24-normal text-primary-text-500 w-full text-left">
                {tChat.rich("note-text", {
                  b: (chunks: React.ReactNode) => <b>{chunks}</b>,
                })}
              </p>
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

      <div className="flex-center-col border-primary-text-300 w-full rounded-[2.4rem] border-2 border-solid bg-white p-2">
        <div className="flex-center-col border-primary-text-200 w-full gap-6 rounded-[1.6rem] border border-solid bg-linear-to-b from-white to-[#F5F5F5] to-[154.72%] p-4 xl:p-[clamp(1.6rem,1vw,4.4rem)]">
          <div className="flex-center-col special:flex-row h-fit w-full gap-10">
            {/* Card #1 */}
            <div className="flex-begin-col shadow-chat-boxes special:min-h-[22.4rem] h-full w-full gap-6 rounded-[0.4rem] bg-white px-6 py-4 xl:gap-[clamp-(2.4rem,1.75vw,6.8rem)]">
              <h3 className="paragraph-24-medium md:subtitle-medium text-primary-text-700">
                {tChat("free-chat-title")}
              </h3>
              <ul className="flex-start-col w-full gap-6">
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["save"]}
                    alt="save icon"
                    width={32}
                    height={32}
                    className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("free-li1")}
                  </p>
                </li>
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["handshake"]}
                    alt="save icon"
                    width={32}
                    height={32}
                    className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("free-li2")}
                  </p>
                </li>
              </ul>
            </div>

            {/* Card #2 */}
            <div className="flex-begin-col shadow-chat-boxes special:min-h-[22.4rem] h-fit w-full gap-6 rounded-[0.4rem] bg-white px-6 py-4">
              <h3 className="paragraph-24-medium md:subtitle-medium text-primary-text-700 xl:gap-[clamp-(2.4rem,1.75vw,6.8rem)]">
                {tChat("premium-chat-title")}
              </h3>
              <ul className="flex-start-col w-full gap-6">
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["cloud-upload"]}
                    alt="save icon"
                    width={32}
                    height={32}
                    className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("premium-li1")}
                  </p>
                </li>
                <li className="flex-start w-full items-center gap-2">
                  <Image
                    src={imageData["handshake"]}
                    alt="save icon"
                    width={32}
                    height={32}
                    className="size-[2.4rem] md:size-[3.2rem] 2xl:size-[4rem]"
                  />
                  <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                    {tChat("premium-li2")}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <p className="paragraph-14-normal text-primary-text-500 md:paragraph-18-normal text-center">
            {tChat.rich("note-chats", {
              b: (chunks: React.ReactNode) => <b>{chunks}</b>,
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export { AnonymousChat };

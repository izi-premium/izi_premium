"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import imageData from "@/data/uploadedImages.json";
import Image from "next/image";
import { AspectRatio } from "../../ui/aspect-ratio";

const DiaryTabs = () => {
  const tTabs = useTranslations("Diary-Tabs");
  return (
    <section className="flex-begin-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-10 bg-white py-[10rem]">
      <Tabs defaultValue="free" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-[0.8rem] bg-[#D7D7D7] px-[0.4rem] py-1">
          <TabsTrigger
            value="free"
            className="paragraph-18-medium text-primary-text-700 flex-center md:paragraph-24-medium lg:subtitle-medium data-[state=inactive]:bg-secondary-text-100 data-[state=active]:bg-base-400 data-[state=inactive]:hover:shadow-hover-inner w-full rounded-[0.4rem] px-4 py-3 text-center hover:cursor-pointer"
          >
            {tTabs("tab1-title")}
          </TabsTrigger>
          <TabsTrigger
            value="premium"
            className="paragraph-18-medium text-primary-text-700 flex-center md:paragraph-24-medium lg:subtitle-medium data-[state=inactive]:bg-secondary-text-100 data-[state=active]:bg-base-400 data-[state=inactive]:hover:shadow-hover-inner w-full rounded-[0.4rem] px-4 py-3 text-center hover:cursor-pointer"
          >
            {tTabs("tab2-title")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="free" className="border-0">
          <Card className="border-0 shadow-none">
            <CardContent className="flex-center-col special:px-12 gap-10 px-4 py-6 md:flex-row xl:gap-[clamp(16rem,8.33vw,32rem)]">
              <div className="flex-begin-col special:max-w-[47.5vw] w-full gap-6 lg:max-w-[52.5vw] xl:max-w-[clamp(56.6rem,29.48vw,113.2rem)]">
                <CardTitle className="h1-small lg:h1-big text-base-700 text-left">
                  {tTabs("tab1-title")}
                </CardTitle>
                <p
                  className="paragraph-18-normal text-primary-text-500 lg:paragraph-24-normal text-left"
                  dangerouslySetInnerHTML={{
                    __html: tTabs("tab1-text"),
                  }}
                />
              </div>
              <div className="relative flex aspect-[378/520] min-h-[42rem] w-full items-center justify-center overflow-hidden rounded-[1.6rem] shadow-lg lg:h-[clamp(52rem,27vw,104rem)] lg:w-[clamp(37.8rem,19.6vw,75.6rem)] xl:max-w-[33vw]">
                <Image
                  src={imageData["diary-bg"]}
                  alt="image background with paper texture"
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 2240px): 75vw, 25vw"
                  className="size-full object-cover object-center"
                />

                <div className="relative aspect-[300/400] w-[clamp(24rem,12.5vw,48rem)]">
                  <Image
                    src={
                      imageData[tTabs("tab1-image") as keyof typeof imageData]
                    }
                    alt={tTabs("tab1-alt")}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1980px) 70vw, (max-width: 2240px) 33vw, 15vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="premium">
          <Card>
            <CardHeader>
              <CardTitle className="paragraph-24-medium text-black-800">
                Web Development
              </CardTitle>
              <CardDescription className="paragraph-18-normal text-black-700">
                We build fast, secure, and scalable web applications using the
                latest technologies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="paragraph-18-normal text-black-700">
                Our development team is expert in Next.js, React, and
                TypeScript. We follow best practices to deliver high-quality
                code that is easy to maintain and extend.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export { DiaryTabs };

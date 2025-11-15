"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import imageData from "@/data/uploadedImages.json";
import Image from "next/image";
import { RotatoryText } from "../../shared/RotatoryText";

const DiaryTabs = () => {
  const tTabs = useTranslations("Diary-Tabs");

  const plainColorOptions = [
    {
      id: "blue",
      color: "#1E2F4D",
      imageKey: tTabs("tab2-plain-blue"),
      name: "Blue",
    },
    {
      id: "black",
      color: "#1C1C1C",
      imageKey: tTabs("tab2-plain-black"),
      name: "Black",
    },
    {
      id: "green",
      color: "#264029",
      imageKey: tTabs("tab2-plain-green"),
      name: "Green",
    },
    {
      id: "brown",
      color: "#6E4B3A",
      imageKey: tTabs("tab2-plain-brown"),
      name: "Brown",
    },
  ];

  const realisticColorOptions = [
    {
      id: "blue",
      color: "#06335C",
      imageKey: tTabs("tab2-blue"),
      name: "Blue",
    },
    {
      id: "black",
      color: "#1C1C1C",
      imageKey: tTabs("tab2-black"),
      name: "Black",
    },
    {
      id: "red",
      color: "#5E2029",
      imageKey: tTabs("tab2-red"),
      name: "Red",
    },
    {
      id: "brown",
      color: "#562611",
      imageKey: tTabs("tab2-brown"),
      name: "Brown",
    },
    {
      id: "purple",
      color: "#4B2246",
      imageKey: tTabs("tab2-purple"),
      name: "Purple",
    },
    {
      id: "green",
      color: "#043C21",
      imageKey: tTabs("tab2-green"),
      name: "Green",
    },
  ];

  const phrases = [
    "Zana",
    "Lucas",
    "Melanie",
    "Gabriel",
    "Lucy",
    "Amanda",
    "Michael",
    "Fabrizio",
    "Emma",
  ];

  const [selectedColor, setSelectedColor] = useState(plainColorOptions[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTab, setActiveTab] = useState("free");
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const [diaryVersion, setDiaryVersion] = useState("plain");
  const [isDiaryVersionTransitioning, setIsDiaryVersionTransitioning] =
    useState(false);
  const [isPremiumTabLoading, setIsPremiumTabLoading] = useState(false);

  // Get current color options based on diary version
  const getCurrentColorOptions = () => {
    return diaryVersion === "plain" ? plainColorOptions : realisticColorOptions;
  };

  const handleColorChange = (colorOption: (typeof plainColorOptions)[0]) => {
    if (colorOption.id === selectedColor.id) return;

    setIsTransitioning(true);

    // Increased delay to account for Vercel Blob loading time
    setTimeout(() => {
      setSelectedColor(colorOption);
      setIsTransitioning(false);
    }, 400);
  };

  const handleTabChange = (value: string) => {
    if (value === activeTab) return;

    setIsTabTransitioning(true);

    // If switching to premium, set loading state for text delay
    if (value === "premium") {
      setIsPremiumTabLoading(true);
    }

    // Short delay for smooth transition
    setTimeout(() => {
      setActiveTab(value);
      setTimeout(() => {
        setIsTabTransitioning(false);

        // Add delay for premium tab text to sync with image loading
        if (value === "premium") {
          setTimeout(() => {
            setIsPremiumTabLoading(false);
          }, 300); // 300ms delay to match image loading time
        }
      }, 50);
    }, 200);
  };

  const handleDiaryVersionChange = (version: string) => {
    if (version === diaryVersion) return;

    setIsDiaryVersionTransitioning(true);

    setTimeout(() => {
      setDiaryVersion(version);
      // Reset to first color of the new version
      const newColorOptions =
        version === "plain" ? plainColorOptions : realisticColorOptions;
      setSelectedColor(newColorOptions[0]);

      setTimeout(() => {
        setIsDiaryVersionTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <section className="flex-begin-col bg-secondary-text-50 w-full gap-10">
      <Tabs
        defaultValue="free"
        value={activeTab}
        onValueChange={handleTabChange}
        className="px-mobile md:px-tablet lg:px-desktop w-full max-w-[180rem] rounded-[1.2rem] bg-white py-[10rem] md:rounded-[1.6rem] lg:rounded-[2rem] xl:rounded-[2.4rem]"
      >
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-[0.8rem] bg-[#D7D7D7] px-[0.4rem] py-1">
          <TabsTrigger
            value="free"
            className="paragraph-18-medium text-primary-text-700 flex-center md:paragraph-24-medium lg:subtitle-medium data-[state=inactive]:bg-secondary-text-100 data-[state=active]:bg-base-400 data-[state=inactive]:hover:shadow-hover-inner w-full rounded-[0.4rem] px-4 py-3 text-center transition-all duration-200 hover:cursor-pointer"
          >
            {tTabs("tab1-title")}
          </TabsTrigger>
          <TabsTrigger
            value="premium"
            className="paragraph-18-medium text-primary-text-700 flex-center md:paragraph-24-medium lg:subtitle-medium data-[state=inactive]:bg-secondary-text-100 data-[state=active]:bg-base-400 data-[state=inactive]:hover:shadow-hover-inner w-full rounded-[0.4rem] px-4 py-3 text-center transition-all duration-200 hover:cursor-pointer"
          >
            {tTabs("tab2-title")}
          </TabsTrigger>
        </TabsList>

        <div className="relative overflow-hidden">
          <TabsContent
            value="free"
            className={`border-0 transition-all duration-500 ease-in-out ${
              isTabTransitioning && activeTab === "free"
                ? "translate-x-4 opacity-0"
                : isTabTransitioning && activeTab !== "free"
                  ? "-translate-x-4 opacity-0"
                  : "translate-x-0 opacity-100"
            }`}
          >
            <Card className="border-0 shadow-none">
              <CardContent className="flex-center-col special:px-12 gap-10 px-4 py-6 md:flex-row xl:gap-[clamp(16rem,8.33vw,32rem)]">
                <div className="flex-begin-col special:max-w-[47.5vw] w-full gap-6 lg:max-w-[52.5vw] xl:max-w-[clamp(62rem,32.29vw,124rem)]">
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
                <div className="relative flex min-h-[42rem] w-full min-w-[28rem] items-center justify-center overflow-hidden rounded-[1.6rem] shadow-lg lg:h-[clamp(52rem,27vw,88rem)] lg:w-[(37.8rem,19.6vw,75.6rem)] xl:max-w-[33vw]">
                  <Image
                    src={imageData["diary-bg"]}
                    alt="image background with paper texture"
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 2240px): 75vw, 25vw"
                    className="size-full object-cover object-center"
                  />

                  <div className="relative aspect-[300/400] w-[clamp(24rem,12.5vw,48rem)] xl:w-[clamp(30rem,15.6vw,0rem)]">
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

          {/* Premium tab content */}
          <TabsContent
            value="premium"
            className={`border-0 transition-all duration-500 ease-in-out ${
              isTabTransitioning && activeTab === "premium"
                ? "translate-x-4 opacity-0"
                : isTabTransitioning && activeTab !== "premium"
                  ? "-translate-x-4 opacity-0"
                  : "translate-x-0 opacity-100"
            }`}
          >
            <Card className="border-0 shadow-none">
              <CardContent className="flex-center-col special:px-12 gap-10 px-4 py-6 md:flex-row xl:gap-[clamp(16rem,8.33vw,32rem)]">
                <div className="flex-begin-col special:max-w-[47.5vw] w-full gap-6 lg:max-w-[52.5vw] xl:max-w-[clamp(66rem,34.3vw,132rem)]">
                  <CardTitle className="h1-small lg:h1-big text-base-700 text-left">
                    {tTabs("tab2-title")}
                  </CardTitle>
                  <p
                    className="paragraph-18-normal text-primary-text-500 lg:paragraph-24-normal text-left"
                    dangerouslySetInnerHTML={{
                      __html: tTabs("tab2-text"),
                    }}
                  />
                  <ul className="flex-start-col gap-6 px-4">
                    <li className="flex-start w-full items-center gap-2">
                      <Image
                        src={imageData["notebook-premium"]}
                        alt="icon of a notebook with a pen"
                        width={32}
                        height={32}
                        className="2xl:size-[4rem]"
                      />
                      <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                        {tTabs("tab2-li1")}
                      </p>
                    </li>
                    <li className="flex-start w-full items-center gap-2">
                      <Image
                        src={imageData["rocket-premium"]}
                        alt="rocket icon"
                        width={32}
                        height={32}
                        className="2xl:size-[4rem]"
                      />
                      <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                        {tTabs("tab2-li2")}
                      </p>
                    </li>
                    <li className="flex-start w-full items-center gap-2">
                      <Image
                        src={imageData["signature-premium"]}
                        alt="personalized signature icon"
                        width={32}
                        height={32}
                        className="2xl:size-[4rem]"
                      />
                      <p className="paragraph-18-normal text-primary-text-500 md:paragraph-24-normal">
                        {tTabs("tab2-li3")}
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Image Container with Color Selector */}
                <div className="flex flex-col items-center gap-6">
                  {/* Diary Version Selector - Above Image */}
                  <div className="flex w-full items-center gap-2 rounded-[0.8rem] bg-[#D7D7D7] p-[0.4rem]">
                    <button
                      onClick={() => handleDiaryVersionChange("plain")}
                      className={`paragraph-14-normal md:paragraph-18-medium text-primary-text-700 flex-center w-full rounded-[0.4rem] px-4 py-2 font-medium transition-all duration-200 ${
                        diaryVersion === "plain"
                          ? "bg-base-400 shadow-sm"
                          : "bg-secondary-text-100 hover:shadow-hover-inner"
                      }`}
                      disabled={isDiaryVersionTransitioning}
                    >
                      {tTabs("diary-version-t1")}
                    </button>
                    <button
                      onClick={() => handleDiaryVersionChange("realistic")}
                      className={`paragraph-14-normal md:paragraph-18-medium text-primary-text-700 flex-center w-full rounded-[0.4rem] px-4 py-2 font-medium transition-all duration-200 ${
                        diaryVersion === "realistic"
                          ? "bg-base-400 shadow-sm"
                          : "bg-secondary-text-100 hover:shadow-hover-inner"
                      }`}
                      disabled={isDiaryVersionTransitioning}
                    >
                      {tTabs("diary-version-t2")}
                    </button>
                  </div>

                  {/* Main Image Container */}
                  <div className="relative flex aspect-[378/520] min-h-[42rem] w-full min-w-[28rem] items-center justify-center overflow-hidden rounded-[1.6rem] shadow-lg lg:h-[clamp(52rem,27vw,104rem)] lg:w-[clamp(37.8rem,19.6vw,75.6rem)] xl:max-w-[33vw]">
                    {/* Background Image (Static) */}
                    <Image
                      src={imageData["diary-bg"]}
                      alt="image background with paper texture"
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 2240px): 75vw, 25vw"
                      className="size-full object-cover object-center"
                    />

                    {/* Diary Image with Transition */}
                    <div className="relative aspect-[300/400] w-[clamp(24rem,12.5vw,48rem)] xl:w-[clamp(30rem,15.6vw,60rem)]">
                      <RotatoryText
                        phrases={phrases}
                        className={`absolute top-1/2 left-1/2 z-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
                          isTransitioning ||
                          isDiaryVersionTransitioning ||
                          isPremiumTabLoading
                            ? "scale-95 opacity-0"
                            : "scale-100 opacity-100"
                        }`}
                        textClassName="handwritten-18 lg:handwritten-24 text-[#D18E34]"
                      />
                      <Image
                        src={
                          imageData[
                            selectedColor.imageKey as keyof typeof imageData
                          ]
                        }
                        alt={`${tTabs("tab2-alt")} ${selectedColor.name} ${diaryVersion}`}
                        fill
                        sizes="(max-width: 768px) 85vw, (max-width: 1980px) 70vw, (max-width: 2240px) 33vw, 15vw"
                        className={`object-contain transition-all duration-500 ease-in-out ${
                          isTransitioning || isDiaryVersionTransitioning
                            ? "scale-95 opacity-0"
                            : "scale-100 opacity-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {getCurrentColorOptions().map((colorOption) => (
                      <button
                        key={colorOption.id}
                        onClick={() => handleColorChange(colorOption)}
                        className={`relative h-12 w-12 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-md ${
                          selectedColor.id === colorOption.id
                            ? "border-accent-200 scale-105 shadow-lg"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                        aria-label={`Select ${colorOption.name} ${diaryVersion} diary`}
                        disabled={
                          isTransitioning || isDiaryVersionTransitioning
                        }
                      >
                        {/* Inner highlight for selected state */}
                        {selectedColor.id === colorOption.id && (
                          <div
                            className="bg-opacity-20 absolute inset-1 rounded-md"
                            style={{ backgroundColor: colorOption.color }}
                          ></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export { DiaryTabs };

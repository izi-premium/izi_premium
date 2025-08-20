"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeatureCard from "@/components/shared/cards/FeatureCard";
import { Zap, ShieldCheck, Code, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description:
      "Optimized for performance with Next.js 15 and Server Components.",
  },
  {
    icon: ShieldCheck,
    title: "Type-Safe",
    description:
      "Fully written in TypeScript for robust and maintainable code.",
  },
  {
    icon: Code,
    title: "Developer-Friendly",
    description: "Comes with ESLint, Prettier, and Husky for a great DX.",
  },
  {
    icon: Rocket,
    title: "Ready to Deploy",
    description: "Deploy to Vercel with a single click.",
  },
  {
    icon: Zap,
    title: "Modern UI",
    description: "Includes Shadcn UI for beautiful and accessible components.",
  },
  {
    icon: Code,
    title: "Server Actions",
    description: "Uses modern Next.js features like Server Actions for forms.",
  },
];

export default function CarouselSection() {
  return (
    <section className="px-mobile md:px-tablet lg:px-desktop w-full max-w-[160rem] py-12 md:py-24 lg:py-32">
      <div className="w-full">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="h2-medium text-black-700">Core Features</h2>
          <p className="paragraph-24-normal text-black-600 3xl:max-w-[220rem] max-w-[120rem] 2xl:max-w-[160rem]">
            This boilerplate comes packed with features to get you started.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {features.map((feature, index) => (
              <CarouselItem
                key={index}
                className="basis-full pl-4 md:basis-[40%] lg:basis-[28.5%]"
              >
                <div className="h-full p-1">
                  <FeatureCard {...feature} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-[-50px] -translate-y-1/2 fill-black" />
          <CarouselNext className="absolute top-1/2 right-[-50px] -translate-y-1/2 fill-black" />
        </Carousel>
      </div>
    </section>
  );
}

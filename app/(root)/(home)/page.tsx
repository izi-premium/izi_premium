import { AnonymousChat } from "@/components/sections/chat/AnonymousChat";
import { DiaryWrapper } from "@/components/sections/diary/DiaryWrapper";
import MainFeatures from "@/components/sections/features/MainFeatures";
import { FortuneCookies } from "@/components/sections/fortune-cookies/FortuneCookies";
import Hero from "@/components/sections/hero/Hero";
import SkeletonCard from "@/components/shared/cards/SkeletonCard";
import { Suspense } from "react";
import { BetaButton } from "../../../components/sections/beta/BetaButton";
import Newsletter from "../../../components/sections/newsletter/Newsletter";
import { PricingWrapper } from "../../../components/sections/pricing/PricingWrapper";

export default function Home() {
  return (
    <div className="flex-center-col bg-white-50 min-h-screen w-full gap-[3.4rem] pt-24">
      <Hero />
      <MainFeatures />
      <AnonymousChat />
      <Suspense fallback={<SkeletonLoader />}>
        <DiaryWrapper />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <FortuneCookies />
      </Suspense>
      <Suspense fallback={<SkeletonLoader />}>
        <PricingWrapper />
      </Suspense>
      <BetaSection />
      <Suspense fallback={<SkeletonLoader />}>
        <Newsletter />
      </Suspense>
    </div>
  );
}

function BetaSection() {
  return (
    <section className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-8 py-[4rem]">
      <div className="flex-center-col max-w-[clamp(60rem,50vw,120rem)] gap-4">
        <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
          ¿Quieres ser de los primeros?
        </h2>
        <p className="paragraph-18-normal md:subtitle-normal text-primary-text-500 max-w-[clamp(50rem,40vw,100rem)] text-center">
          Únete a nuestra beta y obtén acceso anticipado a nuevas
          características y descuentos exclusivos.
        </p>
        <BetaButton language="es" variant="primary" size="large" />
      </div>
    </section>
  );
}

function SkeletonLoader() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
}

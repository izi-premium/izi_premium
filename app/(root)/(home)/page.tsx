import { Suspense } from "react";
import FaqSection from "@/components/sections/FaqSection";
import CarouselSection from "@/components/sections/CarouselSection";
import TabsSection from "@/components/sections/TabsSection";
import SkeletonCard from "@/components/shared/cards/SkeletonCard";
import ContactForm from "@/components/sections/ContactForm";
import TextWithImageSection from "@/components/sections/TextWithImageSection";
import Hero from "@/components/sections/hero/Hero";
import MainFeatures from "@/components/sections/features/MainFeatures";
import { AnonymousChat } from "../../../components/sections/chat/AnonymousChat";

export default function Home() {
  return (
    <div className="flex-center-col bg-white-50 px-mobile md:px-tablet lg:px-desktop xl:container-wrapper min-h-screen w-full gap-[3.4rem]">
      <Hero />
      <MainFeatures />
      <AnonymousChat />

      <TextWithImageSection
        title="Build Faster Than Ever"
        description="This boilerplate is designed to get you up and running in minutes. It includes everything you need to build a modern, performant, and scalable web application."
        imageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Team working on a project"
        ctaText="Learn More"
        ctaLink="#features"
      />

      <Suspense fallback={<SkeletonLoader />}>
        <CarouselSection />
      </Suspense>

      <TextWithImageSection
        title="Fully Customizable and Extensible"
        description="Easily adapt the boilerplate to your needs. The modular structure and clean code make it simple to add new features, change the styling, and integrate with other services."
        imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Developer coding"
        ctaText="Get Started"
        ctaLink="#contact"
        reverse={true}
      />

      <Suspense fallback={<SkeletonLoader />}>
        <TabsSection />
      </Suspense>

      <Suspense fallback={<SkeletonLoader />}>
        <FaqSection />
      </Suspense>

      <ContactForm />
    </div>
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

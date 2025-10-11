import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Faqs.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FAQsPage() {
  const t = await getTranslations("Faqs");

  // Get the FAQ items from translations using raw to avoid HTML parsing issues
  const faqItems = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => ({
    question: t(`items.${index}.question`),
    answer: t.raw(`items.${index}.answer`) as string,
  }));

  return (
    <section className="px-mobile md:px-tablet lg:px-desktop xl:container-wrapper flex-center-col min-h-[100vh] w-full bg-white py-12 pt-[12rem]">
      <div className="w-full">
        {/* Header */}
        <div className="flex-center-col mb-12 w-full space-y-4 text-center md:mb-16">
          <div className="space-y-2">
            <h1 className="h2-medium md:h1-small text-primary-text-700">
              {t("title")}
            </h1>
            <p className="paragraph-18-normal md:paragraph-24-normal text-primary-text-600 mx-auto max-w-[90rem] 2xl:max-w-[120rem] 3xl:max-w-[160rem]">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="flex-center-col mx-auto mt-12">
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-[90rem] 2xl:max-w-[120rem] 3xl:max-w-[160rem]"
          >
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="paragraph-18-normal md:paragraph-24-normal text-primary-text-700 py-6 transition-all duration-300 ease-in-out hover:cursor-pointer hover:text-secondary-action xl:py-8 2xl:py-10 3xl:py-12">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="paragraph-14-normal md:paragraph-18-normal text-primary-text-600 pb-6">
                  {/* Render HTML content safely */}
                  <div
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                    className="prose prose-sm md:prose-base max-w-none"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

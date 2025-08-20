import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a Next.js boilerplate?",
    answer:
      "A Next.js boilerplate is a starter project that includes a pre-configured setup for building Next.js applications. It often comes with features like TypeScript, Tailwind CSS, ESLint, and common components to speed up development.",
  },
  {
    question: "Why use this boilerplate?",
    answer:
      "This boilerplate is designed for performance and developer experience. It uses modern best practices, including Server Components, Shadcn UI for beautiful and accessible components, and a well-organized file structure.",
  },
  {
    question: "Is it easy to customize?",
    answer:
      "Yes, the boilerplate is highly customizable. You can easily change the theme, add or remove components, and configure it to fit your project's specific needs. The code is well-documented to guide you.",
  },
  {
    question: "How do I deploy a site built with this boilerplate?",
    answer:
      "You can deploy your site to any platform that supports Next.js, such as Vercel, Netlify, or your own server. Vercel is the recommended platform for optimal performance and ease of use.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="features"
      className="px-mobile md:px-tablet lg:px-desktop w-full max-w-[160rem] py-12 md:py-24 lg:py-32"
    >
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="h2-medium text-black-800">
              Frequently Asked Questions
            </h2>
            <p className="paragraph-24-normal text-black-600 3xl:max-w-[220rem] max-w-[120rem] 2xl:max-w-[160rem]">
              Find answers to common questions about our boilerplate and its
              features.
            </p>
          </div>
        </div>
        <div className="flex-center-col mx-auto mt-12">
          <Accordion
            type="single"
            collapsible
            className="3xl:max-w-[220rem] w-full max-w-[90rem] 2xl:max-w-[160rem]"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="paragraph-24-normal text-black-700 3xl:py-10 transition-all duration-300 ease-in-out hover:cursor-pointer xl:py-6 2xl:py-8">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="paragraph-18-normal text-black-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

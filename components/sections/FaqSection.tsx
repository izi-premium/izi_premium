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
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="h2-bold">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground p-large">
              Find answers to common questions about our boilerplate and its features.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="p-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="p-base text-muted-foreground">
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
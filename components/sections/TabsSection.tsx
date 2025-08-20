"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoDialog from "@/components/shared/InfoDialog";

export default function TabsSection() {
  return (
    <section className="px-mobile md:px-tablet lg:px-desktop max-w-[160rem] 3xl:max-w-[220rem] w-full py-12 md:py-24 lg:py-32">
      <div className="flex-center-col w-full">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="h2-medium text-black-800">Our Services</h2>
          <p className="paragraph-24-normal text-black-600 3xl:max-w-[220rem] max-w-[120rem] 2xl:max-w-[160rem]">
            We offer a range of services to help you build your next project.
          </p>
        </div>
        <Tabs defaultValue="design" className="mx-auto w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger
              value="design"
              className="paragraph-18-medium text-black-800 flex-center data-[state=inactive]:bg-white-400 text-center hover:cursor-pointer"
            >
              Design
            </TabsTrigger>
            <TabsTrigger
              value="development"
              className="paragraph-18-medium text-black-800 flex-center data-[state=inactive]:bg-white-400 text-center hover:cursor-pointer"
            >
              Development
            </TabsTrigger>
            <TabsTrigger
              value="seo"
              className="paragraph-18-medium text-black-800 flex-center data-[state=inactive]:bg-white-400 text-center hover:cursor-pointer"
            >
              SEO
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="paragraph-18-medium text-black-800 flex-center data-[state=inactive]:bg-white-400 text-center hover:cursor-pointer"
            >
              Support
            </TabsTrigger>
          </TabsList>
          <TabsContent value="design">
            <Card>
              <CardHeader>
                <CardTitle className="paragraph-24-medium text-black-800">
                  Web Design
                </CardTitle>
                <CardDescription className="paragraph-18-normal text-black-700">
                  We create beautiful, modern, and responsive designs that look
                  great on all devices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="paragraph-18-normal text-black-700">
                  Our design process is collaborative and user-centric. We work
                  with you to understand your brand and your users' needs to
                  create a design that is both visually appealing and highly
                  functional.
                </p>
              </CardContent>
              <CardFooter>
                <InfoDialog />
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="development">
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
              <CardFooter>
                <InfoDialog />
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle className="paragraph-24-medium text-black-800">
                  SEO Optimization
                </CardTitle>
                <CardDescription className="paragraph-18-normal text-black-700">
                  We help you rank higher in search engines and drive more
                  organic traffic to your site.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="paragraph-18-normal text-black-700">
                  We use a data-driven approach to SEO, focusing on keyword
                  research, on-page optimization, and technical SEO to improve
                  your site's visibility.
                </p>
              </CardContent>
              <CardFooter>
                <InfoDialog />
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle className="paragraph-24-medium text-black-800">
                  Ongoing Support
                </CardTitle>
                <CardDescription className="paragraph-18-normal text-black-700">
                  We provide ongoing support and maintenance to ensure your site
                  is always up-to-date and secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="paragraph-18-normal text-black-700">
                  Our support plans are flexible and tailored to your needs. We
                  are here to help you with any issues or questions you may
                  have.
                </p>
              </CardContent>
              <CardFooter>
                <InfoDialog />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

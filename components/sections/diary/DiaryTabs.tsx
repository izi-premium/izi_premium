"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DiaryTabs = () => {
  return (
    <section className="flex-begin-col w-full gap-10">
      <Tabs defaultValue="design" className="mx-auto w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger
            value="free"
            className="paragraph-18-medium text-black-800 flex-center data-[state=inactive]:bg-white-400 text-center hover:cursor-pointer"
          >
            Design
          </TabsTrigger>
          <TabsTrigger
            value="premium"
            className="paragraph-18-medium text-black-800 flex-center data-[state=inactive]:bg-white-400 text-center hover:cursor-pointer"
          >
            Support
          </TabsTrigger>
        </TabsList>
        <TabsContent value="free">
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

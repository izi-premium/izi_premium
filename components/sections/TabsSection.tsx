"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InfoDialog from "@/components/shared/InfoDialog"

export default function TabsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="h2-bold">Our Services</h2>
                <p className="max-w-[900px] text-muted-foreground p-large">
                    We offer a range of services to help you build your next project.
                </p>
            </div>
            <Tabs defaultValue="design" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
              <TabsContent value="design">
                <Card>
                  <CardHeader>
                    <CardTitle>Web Design</CardTitle>
                    <CardDescription>
                      We create beautiful, modern, and responsive designs that look great on all devices.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="p-base">Our design process is collaborative and user-centric. We work with you to understand your brand and your users' needs to create a design that is both visually appealing and highly functional.</p>
                  </CardContent>
                  <CardFooter>
                    <InfoDialog />
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="development">
                <Card>
                  <CardHeader>
                    <CardTitle>Web Development</CardTitle>
                    <CardDescription>
                      We build fast, secure, and scalable web applications using the latest technologies.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="p-base">Our development team is expert in Next.js, React, and TypeScript. We follow best practices to deliver high-quality code that is easy to maintain and extend.</p>
                  </CardContent>
                   <CardFooter>
                    <InfoDialog />
                  </CardFooter>
                </Card>
              </TabsContent>
               <TabsContent value="seo">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Optimization</CardTitle>
                    <CardDescription>
                      We help you rank higher in search engines and drive more organic traffic to your site.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="p-base">We use a data-driven approach to SEO, focusing on keyword research, on-page optimization, and technical SEO to improve your site's visibility.</p>
                  </CardContent>
                  <CardFooter>
                    <InfoDialog />
                  </CardFooter>
                </Card>
              </TabsContent>
               <TabsContent value="support">
                <Card>
                  <CardHeader>
                    <CardTitle>Ongoing Support</CardTitle>
                    <CardDescription>
                      We provide ongoing support and maintenance to ensure your site is always up-to-date and secure.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="p-base">Our support plans are flexible and tailored to your needs. We are here to help you with any issues or questions you may have.</p>
                  </CardContent>
                  <CardFooter>
                    <InfoDialog />
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
        </div>
    </section>
  )
} 
import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const generalSans = localFont({
  src: "../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // Remember to change this to your domain
  title: {
    default: "Next.js Boilerplate | Ready-to-Use and Optimized",
    template: "%s | Next.js Boilerplate",
  },
  description:
    "A performant and developer-friendly Next.js 15 boilerplate with Shadcn UI, Tailwind CSS, and Server Components.",
  keywords: [
    "Next.js boilerplate",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn UI",
    "Server Components",
  ],
  authors: [{ name: "Your Name" }], // Change this to your name
  creator: "Your Name", // Change this to your name
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com", // Remember to change this to your domain
    title: "Next.js Boilerplate | Ready-to-Use and Optimized",
    description: "A performant and developer-friendly Next.js 15 boilerplate.",
    siteName: "Next.js Boilerplate",
    images: "/opengraph-image.png", // Add your own opengraph image
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Boilerplate | Ready-to-Use and Optimized",
    description: "A performant and developer-friendly Next.js 15 boilerplate.",
    images: "/twitter-image.png", // Add your own twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external sites if any */}
        {/* <link
          rel="preconnect"
          href="https://your-external-site.com"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          generalSans.variable
        )}
      >
        <Header />
        <main className="flex-center-col relative min-h-screen w-screen bg-white pt-[66px]">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

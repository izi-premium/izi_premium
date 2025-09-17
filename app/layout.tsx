import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const switzer = localFont({
  src: "../public/fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  display: "swap",
  preload: true,
});

const parisienne = localFont({
  src: "../public/fonts/Parisienne-Regular.ttf",
  variable: "--font-parisienne",
  display: "swap",
  preload: false,
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // Remember to change this to your domain
  title: {
    default: "Home | I.Z.I Premium",
    template: "%s | I.Z.I Premium",
  },
  description:
    "A companionship app that cares about your mental health and helps you improve and get better everyday.",
  keywords: [
    "Mental health",
    "Companionship",
    "Personal diary",
    "Daily advise",
    "Anonymous chat with strangers",
  ],
  authors: [{ name: "Esteban Santiago" }],
  creator: "Esteban Santiago",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com", // Remember to change this to your domain
    title: "Home | I.Z.I Premium",
    description:
      "A companionship app that cares about your mental health and helps you improve and get better everyday.",
    siteName: "I.Z.I Premium",
    images: "/opengraph-image.png", // Add your own opengraph image
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | I.Z.I Premium",
    description:
      "A companionship app that cares about your mental health and helps you improve and get better everyday.",
    images: "/twitter-image.png", // Add your own twitter image
  },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to external sites if any */}
        <link
          rel="preconnect"
          href="https://qbr8tbwo7jmtgyon.public.blob.vercel-storage.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://qbr8tbwo7jmtgyon.public.blob.vercel-storage.com"
        />
      </head>
      <body
        className={cn(
          "bg-secondary-text-50 min-h-screen font-sans antialiased",
          switzer.variable,
          parisienne.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-center-col bg-secondary-text-50 relative min-h-screen w-screen pt-24">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

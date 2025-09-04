import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const switzer = localFont({
  src: "../public/fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  display: "swap",
  preload: true,
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
          switzer.variable
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

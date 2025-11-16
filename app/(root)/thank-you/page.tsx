import type { Metadata } from "next";
import ThankYouPageClient from "./ThankYouPageClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ThankYouPageClient />;
}

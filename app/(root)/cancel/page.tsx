import type { Metadata } from "next";
import CancelPageClient from "./CancelPageClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <CancelPageClient />;
}

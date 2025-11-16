import type { Metadata } from "next";
import SubscriptionManagement from "./SettingsClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <SubscriptionManagement />;
}

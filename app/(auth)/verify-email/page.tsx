import type { Metadata } from "next";
import VerifyEmailPage from "./VerifyEmailClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return <VerifyEmailPage />;
}

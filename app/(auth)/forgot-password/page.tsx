import type { Metadata } from "next";
import ForgotPasswordPage from "./ForgotPasswordClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return <ForgotPasswordPage />;
}

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("cookieConsent");

  useEffect(() => {
    // Set mounted to true to avoid hydration mismatch
    setMounted(true);

    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      setShowBanner(true);
      // Prevent scrolling when banner is shown
      document.body.style.overflow = "hidden";
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
    // Re-enable scrolling
    document.body.style.overflow = "unset";
  };

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted || !showBanner) return null;

  return (
    <>
      {/* Backdrop overlay - blocks entire page */}
      <div
        className="bg-primary-text-900/80 fixed inset-0 z-[100] backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Cookie consent modal */}
      <div
        className="fixed inset-0 z-[101] flex items-end justify-center p-[2.4rem] md:items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-message"
      >
        <div className="animate-fadeIn bg-primary-text-50 w-full max-w-[60rem] rounded-[1.6rem] p-[3.2rem] shadow-2xl md:p-[4.8rem]">
          {/* Content */}
          <div className="mb-[3.2rem]">
            <p
              id="cookie-consent-message"
              className="paragraph-18-normal text-primary-text-700 leading-[160%]"
            >
              {t("message")}{" "}
              <Link
                href="/legal/cookies"
                className="text-primary-action-800 hover:decoration-secondary-action font-semibold underline underline-offset-[0.4rem] transition-all"
              >
                {t("link")}
              </Link>
              .
            </p>
          </div>

          {/* Accept button */}
          <button
            onClick={acceptCookies}
            className="paragraph-18-semibold bg-primary-action-800 shadow-cta-header hover:bg-primary-action-800/90 hover:shadow-hover-inner focus:ring-secondary-action/50 w-full rounded-[0.8rem] px-[4.8rem] py-[1.6rem] text-white transition-all hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none md:w-auto"
            aria-label={t("accept")}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </>
  );
}

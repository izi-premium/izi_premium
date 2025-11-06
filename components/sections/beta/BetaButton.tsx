"use client";

import { useState } from "react";
import { BetaSignupModal } from "./BetaSignupModal";

interface BetaButtonProps {
  language?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

export function BetaButton({
  language = "es",
  variant = "primary",
  size = "medium",
}: BetaButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getButtonClasses = () => {
    const baseClasses =
      "relative flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer";

    if (variant === "primary") {
      return `${baseClasses} bg-primary-action-900 hover:shadow-header`;
    } else {
      return `${baseClasses} border-2 border-primary-action-900 bg-transparent hover:bg-primary-action-50`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-4 py-2";
      case "large":
        return "px-8 py-4";
      default:
        return "px-6 py-3";
    }
  };

  const getTextClasses = () => {
    switch (size) {
      case "small":
        return "paragraph-18-medium";
      case "large":
        return "paragraph-24-medium md:paragraph-32-medium";
      default:
        return "paragraph-18-medium md:paragraph-24-medium";
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="hover:shadow-header bg-primary-action-900 relative flex w-full items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[75%] lg:max-w-[60%]"
      >
        <span className="bg-primary-action-100 absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
        <span className="bg-primary-action-100 absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
        <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(32px,1.66vw)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
          <p className="paragraph-18-medium md:paragraph-24-medium text-secondary-text-500 w-full text-center">
            {language === "es" ? "🚀 Únete a la Beta" : "🚀 Join the Beta"}
          </p>
        </div>
      </button>

      <BetaSignupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        language={language}
      />
    </>
  );
}

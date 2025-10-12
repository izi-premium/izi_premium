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
        className={`${getButtonClasses()} ${getSizeClasses()}`}
      >
        <span className="bg-primary-action-100 absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px]"></span>
        <span className="bg-primary-action-100 absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px]"></span>
        <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-4 py-2">
          <p
            className={`${getTextClasses()} text-center ${
              variant === "primary"
                ? "text-secondary-text-500"
                : "text-primary-action-900"
            }`}
          >
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

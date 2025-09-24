"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const Newsletter = () => {
  const tNewsletter = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(tNewsletter("success"));
        setMessageType("success");
        setEmail(""); // Clear the email input
      } else {
        setMessage(data.message || tNewsletter("error1"));
        setMessageType("error");
      }
    } catch (error) {
      setMessage(tNewsletter("error2"));
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return (
    <section className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper w-full gap-10 bg-white py-[8rem] lg:py-[10rem]">
      <div className="flex-center-col gap-4">
        <h2 className="subtitle-medium md:h2-medium text-primary-text-700 text-center">
          {tNewsletter("title")}
        </h2>
        <p className="paragraph-18-normal md:subtitle-normal text-primary-text-500 max-w-[clamp(90rem,46.9vw,180rem)] text-center">
          {tNewsletter("text")}
        </p>
      </div>

      {/* Email Input and Subscribe Button */}
      <div className="flex w-full max-w-[clamp(40rem,32vw,80rem)] flex-col items-center justify-center gap-4 2xl:gap-8">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your email address"
          className="paragraph-18-normal focus:ring-accent-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
          disabled={isLoading}
        />

        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className="hover:shadow-header bg-accent-500 relative flex w-fit items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
          <span className="absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full bg-red-50 blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
          <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(3.2rem,1.66vw,6.4rem)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
            <p className="paragraph-24-medium md:subtitle-medium text-secondary-text-500 w-full text-center">
              {isLoading ? tNewsletter("subscribing") : tNewsletter("cta")}
            </p>
          </div>
        </button>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`rounded-lg p-3 text-center ${
              messageType === "success"
                ? "border border-green-300 bg-green-100 text-green-700"
                : "border border-red-300 bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;

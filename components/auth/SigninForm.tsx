"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface SigninFormProps {
  redirectUrl?: string;
}

export default function SigninForm({ redirectUrl }: SigninFormProps) {
  const tIn = useTranslations("Signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get redirect URL from search params or props, default to home page
  const finalRedirectUrl = redirectUrl || searchParams.get("redirect") || "/";
  const checkoutIntent = searchParams.get("checkout") === "true";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        if (checkoutIntent) {
          // If user came from checkout flow, initiate Stripe checkout
          try {
            const checkoutResponse = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                countryCode: undefined,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                currency: undefined,
              }),
            });

            const checkoutData = await checkoutResponse.json();

            if (checkoutResponse.ok) {
              // Redirect to Stripe checkout
              window.location.href = checkoutData.checkoutUrl;
            } else {
              console.error("Checkout error:", checkoutData.error);
              router.push(finalRedirectUrl);
            }
          } catch (error) {
            console.error("Checkout network error:", error);
            router.push(finalRedirectUrl);
          }
        } else {
          router.push(finalRedirectUrl);
        }
      }
    } catch (err) {
      setError(`${tIn("error1")}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = () => {
    if (checkoutIntent) {
      // If user came from checkout flow, redirect to a special callback that will handle checkout
      signIn("google", {
        callbackUrl: `/signin-callback?checkout=true`,
        redirect: true,
      });
    } else {
      signIn("google", {
        callbackUrl: finalRedirectUrl,
        redirect: true,
      });
    }
  };

  // Eye icon component
  const EyeIcon = ({
    isVisible,
    onClick,
  }: {
    isVisible: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:cursor-pointer hover:text-gray-600"
    >
      {isVisible ? (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="mx-auto mt-[12rem] mb-12 max-w-[clamp(40rem,20.8vw,80rem)] rounded-lg bg-white p-6 shadow-sm md:p-8">
      <h2 className="paragraph-24-medium md:subtitle-medium mb-2 w-full text-center text-gray-900">
        {tIn("title")}
      </h2>

      {error && (
        <div className="paragraph-14-normal mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {/* Google Signin Button */}
      <button
        onClick={handleGoogleSignin}
        className="paragraph-14-normal 2xl:paragraph-18-medium mb-4 flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {tIn("google")}
      </button>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-400 bg-white px-2">
            {tIn("continue")}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-500 mb-2">
            {tIn("email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="paragraph-18-normal w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-500 mb-2">
            {tIn("password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="paragraph-18-normal w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <EyeIcon
              isVisible={showPassword}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="paragraph-14-normal 2xl:paragraph-18-normal w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
        >
          {loading ? `${tIn("signing-in")}` : `${tIn("title")}`}
        </button>
      </form>

      <div className="mt-6 space-y-2 text-center">
        <p className="text-sm text-gray-600">
          <Link
            href="/forgot-password"
            className="paragraph-14-normal 2xl:paragraph-18-normal text-blue-600 hover:underline"
          >
            {tIn("question1")}
          </Link>
        </p>
        <p className="paragraph-14-normal 2xl:paragraph-18-normal text-gray-600">
          {tIn("question2")}{" "}
          <Link
            href={checkoutIntent ? "/signup?checkout=true" : "/signup"}
            className="text-blue-600 hover:underline"
          >
            {tIn("signup")}
          </Link>
        </p>
      </div>
    </div>
  );
}

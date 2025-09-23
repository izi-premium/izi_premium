"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const tUp = useTranslations("Signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    acceptedPrivacy: false,
  });
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get redirect URL from search params
  const redirectUrl = searchParams.get("redirect");
  const checkoutIntent = searchParams.get("checkout") === "true";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError(`${tUp("fields")}`);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(`${tUp("pswd-mismatch")}`);
      return;
    }

    if (formData.password.length < 8) {
      setError(`${tUp("pswd-len")}`);
      return;
    }

    if (!formData.acceptedTerms || !formData.acceptedPrivacy) {
      setError(`${tUp("accept")}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          acceptedTerms: formData.acceptedTerms,
          acceptedPrivacy: formData.acceptedPrivacy,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setShowVerification(true);
      } else {
        setError(data.error || `${tUp("error1")}`);
      }
    } catch (err) {
      setError(`${tUp("error2")}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        // Handle different redirect scenarios
        setTimeout(async () => {
          if (onSuccess) {
            onSuccess();
          } else if (checkoutIntent) {
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
                // Fallback to signin if checkout fails
                router.push("/signin");
              }
            } catch (error) {
              console.error("Checkout network error:", error);
              // Fallback to signin if checkout fails
              router.push("/signin");
            }
          } else if (redirectUrl) {
            // If specific redirect URL was provided
            router.push(redirectUrl);
          } else {
            // Default: redirect to signin
            router.push("/signin");
          }
        }, 2000);
      } else {
        setError(data.error || `${tUp("verif-error")}`);
      }
    } catch (err) {
      setError(`${tUp("error2")}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || `${tUp("failed-code")}`);
      }
    } catch (err) {
      setError(`${tUp("error2")}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Check if both terms and privacy policy are accepted
    if (!formData.acceptedTerms || !formData.acceptedPrivacy) {
      return;
    }

    // Construct callback URL based on redirect intent
    let callbackUrl = "/";

    if (checkoutIntent) {
      callbackUrl = "/checkout";
    } else if (redirectUrl) {
      callbackUrl = redirectUrl;
    }

    signIn("google", {
      callbackUrl,
      redirect: true,
    });
  };

  // Check if both terms and privacy policy are accepted
  const isConsentGiven = formData.acceptedTerms && formData.acceptedPrivacy;

  // Eye icon components
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
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
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

  if (showVerification) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">{tUp("title")}</h2>

        {message && (
          <div className="mb-4 rounded border border-green-400 bg-green-100 p-3 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleVerification}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              {tUp("show-verif")} {formData.email}
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
          >
            {loading ? `${tUp("verif-load")}` : `${tUp("verif-email")}`}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOTP}
            disabled={loading}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {tUp("resend-msg")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[40rem] rounded-lg bg-white p-6 shadow-md xl:max-w-[clamp(40rem,20.8vw,80rem)] 2xl:max-w-[90rem]">
      <h2 className="mb-6 text-center text-2xl font-bold">{tUp("title")}</h2>

      {checkoutIntent && (
        <div className="mb-4 rounded border border-blue-400 bg-blue-100 p-3 text-blue-700">
          {tUp("after")}
        </div>
      )}

      {message && (
        <div className="mb-4 rounded border border-green-400 bg-green-100 p-3 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            {tUp("name")} <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            {tUp("email")} <span className="text-error">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            {tUp("password")} <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              minLength={8}
              required
            />
            <EyeIcon
              isVisible={showPassword}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            {tUp("confirm")} <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <EyeIcon
              isVisible={showConfirmPassword}
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="mb-4 space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleInputChange}
              className="mt-1 mr-2"
              required
            />
            <label className="text-sm text-gray-700">
              {tUp("agree1")}{" "}
              <Link
                href="/terms-of-use"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                {tUp("terms")}
              </Link>
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              name="acceptedPrivacy"
              checked={formData.acceptedPrivacy}
              onChange={handleInputChange}
              className="mt-1 mr-2"
              required
            />
            <label className="text-sm text-gray-700">
              {tUp("agree2")}{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                {tUp("privacy")}
              </Link>
            </label>
          </div>
        </div>

        {/* Google Signup Button - Now positioned after consent checkboxes */}
        <button
          onClick={handleGoogleSignup}
          className={`mb-4 flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            isConsentGiven
              ? "cursor-pointer border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          }`}
          type="button"
        >
          <svg
            className={`h-5 w-5 ${isConsentGiven ? "" : "opacity-50"}`}
            viewBox="0 0 24 24"
          >
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
          {tUp("google")}
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {tUp("continue")}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
        >
          {loading ? `${tUp("creating")}` : `${tUp("create")}`}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {tUp("question")}{" "}
          <Link
            href={checkoutIntent ? "/signin?checkout=true" : "/signin"}
            className="text-blue-600 hover:underline"
          >
            {tUp("signin")}
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPasswordPage() {
  const tForgot = useTranslations("Forgot");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle URL parameters
  useEffect(() => {
    const urlEmail = searchParams.get("email");

    if (urlEmail) {
      setEmail(decodeURIComponent(urlEmail));
    }
  }, [searchParams]);

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, language: locale }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Email de recuperación enviado a ${email}`);
        setStep("reset");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(`${tForgot("error2")}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError(`${tForgot("pswd-mismatch")}`);
      return;
    }

    if (newPassword.length < 8) {
      setError(`${tForgot("pswd-len")}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetCode, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(`${tForgot("error2")}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop bg-secondary-text-50 h-fit min-h-[100vh] w-full gap-10">
      <div className="mx-auto mt-[12rem] mb-12 max-w-[clamp(40rem,20.8vw,80rem)] rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="paragraph-24-medium md:subtitle-medium mb-2 w-full text-center text-gray-900">
          {step === "email" ? `${tForgot("forgot")}` : `${tForgot("reset")}`}
        </h2>

        {step === "reset" && (
          <p className="paragraph-14-normal 2xl:paragraph-18-normal mb-6 text-center text-gray-600">
            Ingresa el código de 6 dígitos que enviamos a{" "}
            <strong>{email}</strong>
          </p>
        )}

        {message && (
          <div className="paragraph-14-normal mb-4 rounded border border-green-400 bg-green-100 p-3 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="paragraph-14-normal mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendReset}>
            <div className="mb-6">
              <label className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-500 mb-2 block">
                {tForgot("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="paragraph-18-normal w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="paragraph-14-normal 2xl:paragraph-18-normal w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar Código de Recuperación"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-6">
              <label className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-500 mb-2 block">
                Código de recuperación
              </label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="paragraph-18-normal w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-[0.5em] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <div className="mb-4">
              <label className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-500 mb-2 block">
                {tForgot("new")}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="paragraph-18-normal w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                minLength={8}
                required
              />
            </div>

            <div className="mb-6">
              <label className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-500 mb-2 block">
                {tForgot("confirm-new")}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="paragraph-18-normal w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || resetCode.length !== 6}
              className="paragraph-14-normal 2xl:paragraph-18-normal w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
            >
              {loading ? `${tForgot("resetting")}` : `${tForgot("reset")}`}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/signin"
            className="paragraph-14-normal 2xl:paragraph-18-normal text-blue-600 hover:underline"
          >
            {tForgot("back")}
          </Link>
        </div>
      </div>
    </div>
  );
}

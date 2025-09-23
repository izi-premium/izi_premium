"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const tForgot = useTranslations("Forgot");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold">
            {step === "email" ? `${tForgot("forgot")}` : `${tForgot("reset")}`}
          </h2>

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

          {step === "email" ? (
            <form onSubmit={handleSendReset}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  {tForgot("email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  {tForgot("reset-code")} ({tForgot("direction")} {email})
                </label>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  {tForgot("new")}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  minLength={8}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  {tForgot("confirm-new")}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
              >
                {loading ? `${tForgot("resetting")}` : `${tForgot("reset")}`}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="text-sm text-blue-600 hover:underline"
            >
              {tForgot("back")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

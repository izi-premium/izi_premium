"use client";

import React, { useState } from "react";
import { FaAndroid, FaApple } from "react-icons/fa";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

export function BetaSignupModal({
  isOpen,
  onClose,
  language = "es",
}: BetaSignupModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState<"ios" | "android" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "warning" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "warning") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!platform) {
      setStatus("error");
      setMessage(
        language === "es"
          ? "Por favor selecciona tu plataforma"
          : "Please select your platform"
      );
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/beta/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          platform,
          language,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadyRegistered) {
          setStatus("warning");
          setMessage(
            language === "es"
              ? "Este correo ya está registrado. ¿Quieres usar otro correo?"
              : "This email is already registered. Do you want to use another email?"
          );
          setPlatform(null);
        } else {
          setStatus("success");
          setMessage(
            language === "es"
              ? "¡Perfecto! 🎉 Tu correo ha sido agregado a la lista de beta. Te notificaremos cuando esté listo tu acceso."
              : "Perfect! 🎉 Your email has been added to the beta list. We'll notify you when your access is ready."
          );
          setEmail("");
          setPlatform(null);
          setTimeout(() => {
            onClose();
            setStatus("idle");
            setMessage("");
          }, 3000);
        }
      } else {
        setStatus("error");
        setMessage(
          language === "es"
            ? data.error || "Hubo un error. Por favor intenta de nuevo."
            : data.error || "There was an error. Please try again."
        );
      }
    } catch (error) {
      console.error("Beta signup error:", error);
      setStatus("error");
      setMessage(
        language === "es"
          ? "Error de conexión. Por favor intenta de nuevo."
          : "Connection error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setEmail("");
      setName("");
      setPlatform(null);
      setStatus("idle");
      setMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative mx-auto w-[320px] rounded-xl bg-white p-5 shadow-2xl md:p-6">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-5 text-center">
          <div className="mb-3 flex justify-center">
            <span className="text-5xl">🚀</span>
          </div>
          <h2 className="subtitle-medium text-primary-text-700 mb-2">
            {language === "es" ? "Únete a la Beta" : "Join the Beta"}
          </h2>
          <p className="paragraph-18-normal text-primary-text-500">
            {language === "es"
              ? "Sé de los primeros en probar IZI World"
              : "Be among the first to try IZI World"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="beta-email"
              className="paragraph-18-medium text-primary-text-700 mb-2 block"
            >
              {language === "es" ? "Email *" : "Email *"}
            </label>
            <input
              id="beta-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={
                language === "es" ? "tu@email.com" : "your@email.com"
              }
              required
              className="paragraph-18-normal text-primary-text-700 focus:border-primary-action-900 focus:ring-primary-action-100 w-full rounded-lg border border-gray-300 px-3 py-2 transition-all focus:ring-2 focus:outline-none"
              disabled={isLoading}
            />
          </div>

          {/* Platform Selection */}
          <div>
            <label className="paragraph-18-medium text-primary-text-700 mb-2 block">
              {language === "es" ? "Plataforma *" : "Platform *"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPlatform("ios")}
                disabled={isLoading}
                className={`flex flex-col items-center rounded-lg border-2 p-3 transition-all ${
                  platform === "ios"
                    ? "border-primary-action-900 bg-primary-action-50"
                    : "border-gray-200 hover:border-gray-300"
                } disabled:opacity-50`}
              >
                <FaApple className="mb-2 h-8 w-8 text-gray-800" />
                <span className="paragraph-18-medium text-primary-text-700 text-sm">
                  iOS
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform("android")}
                disabled={isLoading}
                className={`flex flex-col items-center rounded-lg border-2 p-3 transition-all ${
                  platform === "android"
                    ? "border-primary-action-900 bg-primary-action-50"
                    : "border-gray-200 hover:border-gray-300"
                } disabled:opacity-50`}
              >
                <FaAndroid className="mb-2 h-8 w-8 text-green-600" />
                <span className="paragraph-18-medium text-primary-text-700 text-sm">
                  Android
                </span>
              </button>
            </div>
          </div>

          {/* Status Message */}
          {status !== "idle" && (
            <div
              className={`rounded-lg p-3 ${
                status === "success"
                  ? "border border-green-200 bg-green-50"
                  : status === "warning"
                    ? "border border-yellow-200 bg-yellow-50"
                    : "border border-red-200 bg-red-50"
              }`}
            >
              <p
                className={`paragraph-18-normal ${
                  status === "success"
                    ? "text-green-700"
                    : status === "warning"
                      ? "text-yellow-700"
                      : "text-red-700"
                }`}
              >
                {status === "success"
                  ? "✅ "
                  : status === "warning"
                    ? "⚠️ "
                    : "❌ "}
                {message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email || !platform || status === "warning"}
            className="hover:shadow-header bg-primary-action-900 relative flex w-full items-center justify-center rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-4 py-3">
              <p className="paragraph-18-medium text-secondary-text-500 w-full text-center">
                {isLoading
                  ? language === "es"
                    ? "Registrando..."
                    : "Signing up..."
                  : language === "es"
                    ? "Unirse a Beta"
                    : "Join Beta"}
              </p>
            </div>
          </button>
        </form>

        {/* Benefits */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="paragraph-18-medium text-primary-text-700 mb-3 text-center">
            {language === "es" ? "Beneficios:" : "Benefits:"}
          </p>
          <ul className="grid grid-cols-1 gap-2 text-center">
            <li className="flex items-center justify-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="paragraph-18-normal text-primary-text-600">
                {language === "es" ? "Acceso anticipado" : "Early access"}
              </span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="paragraph-18-normal text-primary-text-600">
                {language === "es"
                  ? "Descuentos exclusivos"
                  : "Exclusive discounts"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

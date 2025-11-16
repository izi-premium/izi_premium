"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al verificar el código");
      } else {
        setMessage("¡Email verificado exitosamente! Redirigiendo al login...");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      }
    } catch (err) {
      setError("Error de red. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al reenviar el código");
      } else {
        setMessage("Código reenviado exitosamente. Revisa tu email.");
      }
    } catch (err) {
      setError("Error de red. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop bg-secondary-text-50 h-fit min-h-[100vh] w-full gap-10">
      <div className="mx-auto mt-[12rem] mb-12 max-w-[clamp(40rem,20.8vw,80rem)] rounded-lg bg-white p-6 shadow-sm md:p-8">
        <h2 className="paragraph-24-medium md:subtitle-medium mb-2 w-full text-center text-gray-900">
          Verificar Email
        </h2>

        <p className="paragraph-14-normal 2xl:paragraph-18-normal mb-6 text-center text-gray-600">
          Ingresa el código de 6 dígitos que enviamos a <strong>{email}</strong>
        </p>

        {error && (
          <div className="paragraph-14-normal mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="paragraph-14-normal mb-4 rounded border border-green-400 bg-green-100 p-3 text-green-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-500 mb-2 block">
              Código de verificación
            </label>
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="paragraph-18-normal w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-[0.5em] focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="paragraph-14-normal 2xl:paragraph-18-normal w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Verificar Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={loading}
            className="paragraph-14-normal 2xl:paragraph-18-normal text-blue-600 hover:underline disabled:opacity-50"
          >
            ¿No recibiste el código? Reenviar
          </button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Payment Cancelled
        </h1>
        <p className="mb-6 text-gray-600">
          No worries! You can upgrade to premium anytime.
        </p>

        <Link href="/">
          <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

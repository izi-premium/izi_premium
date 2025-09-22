import SigninForm from "@/components/auth/SigninForm";
import { Suspense } from "react";

export default function SigninPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SigninForm />
        </Suspense>
      </div>
    </div>
  );
}

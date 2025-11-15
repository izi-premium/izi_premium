import SigninForm from "@/components/auth/SigninForm";
import { Suspense } from "react";

export default function SigninPage() {
  return (
    <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop bg-secondary-text-50 h-fit min-h-[100vh] w-full gap-10">
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <SigninForm />
        </Suspense>
      </div>
    </div>
  );
}

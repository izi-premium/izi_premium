import SignupForm from "@/components/auth/SignupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <section className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper h-screen min-h-[100vh] w-full gap-10 bg-white">
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <SignupForm />
        </Suspense>
      </div>
    </section>
  );
}

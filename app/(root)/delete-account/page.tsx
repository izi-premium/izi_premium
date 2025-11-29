"use client";

import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccountPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const t = useTranslations("DeleteAccount");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) {
      setError(t("notLoggedIn"));
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete account");
      }

      setSuccess(true);
      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err: any) {
      console.error("Error deleting account:", err);
      setError(err.message || t("errorDeleting"));
    } finally {
      setDeleting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper h-fit min-h-[100vh] w-full gap-10 bg-white py-12 pt-[12rem]">
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper h-fit min-h-[100vh] w-full gap-10 bg-white py-12 pt-[12rem]">
        <Card className="w-full max-w-[clamp(40rem,20.8vw,80rem)] border-none">
          <CardHeader className="flex w-full flex-col items-center justify-center text-center">
            <CardTitle className="paragraph-24-medium md:subtitle-medium text-center text-gray-900">
              {t("successTitle")}
            </CardTitle>
            <CardDescription className="paragraph-18-normal 2xl:paragraph-24-normal mt-2 text-gray-700">
              {t("successMessage")}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop xl:container-wrapper h-fit min-h-[100vh] w-full gap-10 bg-white py-12 pt-[12rem]">
      <div className="mb-8">
        <h1 className="subtitle-medium md:h2-medium text-center text-gray-900">
          {t("title")}
        </h1>
        <p className="paragraph-18-normal 2xl:paragraph-24-normal mt-2 text-center text-gray-700">
          {t("description")}
        </p>
      </div>

      {error && (
        <div className="mb-6 w-full max-w-[clamp(40rem,20.8vw,80rem)] rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="paragraph-18-normal 2xl:paragraph-24-normal text-red-800">
            {error}
          </p>
        </div>
      )}

      <Card className="w-full max-w-[clamp(40rem,20.8vw,80rem)] border-none">
        <CardHeader className="flex w-full flex-col items-center justify-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <CardTitle className="paragraph-24-medium md:subtitle-medium text-center text-gray-900">
            {t("warningTitle")}
          </CardTitle>
          <CardDescription className="paragraph-18-normal 2xl:paragraph-24-normal mt-2 text-gray-700">
            {t("warningDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full space-y-6">
          <div className="space-y-4">
            <h3 className="paragraph-18-medium 2xl:paragraph-24-medium text-gray-900">
              {t("whatWillBeDeleted")}
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li className="paragraph-14-normal 2xl:paragraph-18-normal text-gray-700">
                {t("deleteItem1")}
              </li>
              <li className="paragraph-14-normal 2xl:paragraph-18-normal text-gray-700">
                {t("deleteItem2")}
              </li>
              <li className="paragraph-14-normal 2xl:paragraph-18-normal text-gray-700">
                {t("deleteItem3")}
              </li>
              <li className="paragraph-14-normal 2xl:paragraph-18-normal text-gray-700">
                {t("deleteItem4")}
              </li>
            </ul>
          </div>

          {user ? (
            <div className="border-t pt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex-center h-fit w-full bg-red-600 py-3 hover:cursor-pointer hover:bg-red-700"
                    disabled={deleting}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span className="paragraph-14-normal 2xl:paragraph-18-medium font-medium text-white">
                      {t("deleteButton")}
                    </span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-[clamp(50rem,20.8vw,100rem)] bg-white">
                  <AlertDialogHeader className="w-full">
                    <AlertDialogTitle className="paragraph-24-medium md:subtitle-medium text-center text-gray-900">
                      {t("confirmTitle")}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="paragraph-14-normal 2xl:paragraph-18-normal mt-2 w-full text-gray-700">
                      {t("confirmDescription")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="paragraph-14-normal 2xl:paragraph-18-normal border border-solid border-gray-300 bg-gray-100 px-2 hover:cursor-pointer"
                      disabled={deleting}
                    >
                      <span className="paragraph-14-normal 2xl:paragraph-18-normal text-gray-700">
                        {t("cancelButton")}
                      </span>
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleting}
                      className="bg-red-600 hover:cursor-pointer hover:bg-red-700"
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span className="paragraph-14-normal 2xl:paragraph-18-normal text-white">
                            {t("deleting")}
                          </span>
                        </>
                      ) : (
                        <span className="paragraph-14-normal 2xl:paragraph-18-normal text-white">
                          {t("confirmDeleteButton")}
                        </span>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="space-y-4 border-t pt-4">
              <p className="paragraph-18-normal 2xl:paragraph-24-normal text-center text-gray-700">
                {t("notLoggedInMessage")}
              </p>
              <div className="flex-center gap-4">
                <Link
                  href="/auth/signin"
                  className="bg-primary-action-900 hover:bg-primary-action-800 rounded-[0.8rem] px-6 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer"
                >
                  <span className="paragraph-18-medium text-white">
                    {t("signInButton")}
                  </span>
                </Link>
                <Link
                  href="/"
                  className="rounded-[0.8rem] border border-solid border-gray-300 px-6 py-2 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-50"
                >
                  <span className="paragraph-18-medium text-gray-700">
                    {t("goHomeButton")}
                  </span>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CreditCard, Crown, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserSubscriptionData {
  isPremium: boolean;
  subscriptionStatus?: string;
  premiumEndsAt?: Date;
  currentPeriodEnd?: Date;
  stripeSubscriptionId?: string;
  region?: string;
}

export default function SettingsClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const t = useTranslations("Subscription");
  const tTerms = useTranslations("termsCheckbox");
  const locale = useLocale(); // Get current locale from next-intl
  const [subscriptionData, setSubscriptionData] =
    useState<UserSubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin");
    }
  }, [authLoading, user, router]);

  // Fetch user subscription data
  useEffect(() => {
    if (user?.email) {
      fetchSubscriptionData();
    }
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/subscription/status");

      if (!response.ok) {
        throw new Error("Failed to fetch subscription data");
      }

      const data = await response.json();
      setSubscriptionData(data);
    } catch (err) {
      console.error("Error fetching subscription data:", err);
      setError(t("errorFetchingData"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setCancelling(true);
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      // Refresh subscription data
      await fetchSubscriptionData();

      // Show success message (you can implement toast notifications here)
      setError(null);
    } catch (err) {
      console.error("Error cancelling subscription:", err);
      setError(t("errorCancellingSubscription"));
    } finally {
      setCancelling(false);
    }
  };

  const handlePremiumClick = async () => {
    if (authLoading) return;

    if (!user) {
      // User is not logged in, redirect to signup with checkout intent
      window.location.href = "/signup?checkout=true";
      return;
    }

    // User is logged in, create Stripe checkout session
    try {
      setPurchasing(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryCode: undefined, // You can implement geolocation if needed
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          currency: undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Checkout error:", data.error);
        setError(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Use the proper locale from next-intl
    const dateLocale = locale === "es" ? "es-ES" : "en-US";

    return dateObj.toLocaleDateString(dateLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadgeVariant = (status?: string) => {
    switch (status) {
      case "active":
        return "default";
      case "past_due":
        return "destructive";
      case "canceled": // Fixed: Use American spelling
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "active":
        return t("statusActive");
      case "past_due":
        return t("statusPastDue");
      case "canceled": // Fixed: Use American spelling
        return t("statusCanceled");
      default:
        return t("statusInactive");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop h-fit min-h-[100vh] w-full gap-10 bg-white py-12 pt-[12rem]">
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex-center-col px-mobile md:px-tablet lg:px-desktop h-fit min-h-[100vh] w-full gap-10 bg-white py-12 pt-[12rem]">
      <div className="mb-8">
        <h1 className="subtitle-medium md:h2-medium text-center text-gray-900">
          {t("title")}
        </h1>
        <p className="paragraph-18-normal 2xl:paragraph-24-normal mt-2 text-center text-gray-700">
          {t("description")}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="paragraph-18-normal 2xl:paragraph-24-normal text-red-800">
            {error}
          </p>
        </div>
      )}

      {subscriptionData ? (
        subscriptionData.isPremium ? (
          // Premium user - show subscription details
          <Card className="w-full max-w-[clamp(40rem,20.8vw,80rem)] border-none">
            <CardHeader className="flex w-full flex-col items-center justify-center text-center">
              <Crown className="h-12 w-12 text-yellow-500" />
              <CardTitle className="paragraph-24-medium md:subtitle-medium text-center text-gray-900">
                {t("premiumSubscription")}
              </CardTitle>
              <CardDescription className="paragraph-18-normal 2xl:paragraph-24-normal mt-2 text-gray-700">
                {t("premiumDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="paragraph-14-normal 2xl:paragraph-18-normal text-gray-700">
                    {t("status")}:
                  </span>
                  <Badge
                    variant={getStatusBadgeVariant(
                      subscriptionData.subscriptionStatus
                    )}
                    className={`paragraph-14-normal 2xl:paragraph-18-normal border border-solid px-6 ${
                      subscriptionData.subscriptionStatus === "active"
                        ? "border-green-300 bg-green-100"
                        : subscriptionData.subscriptionStatus === "canceled" // Fixed: Use American spelling
                          ? "border-yellow-300 bg-yellow-100"
                          : "border-gray-300 bg-gray-100"
                    }`}
                  >
                    <span
                      className={`paragraph-14-normal 2xl:paragraph-18-normal ${
                        subscriptionData.subscriptionStatus === "active"
                          ? "text-green-700"
                          : subscriptionData.subscriptionStatus === "canceled" // Fixed: Use American spelling
                            ? "text-yellow-700"
                            : "text-gray-700"
                      }`}
                    >
                      {getStatusText(subscriptionData.subscriptionStatus)}
                    </span>
                  </Badge>
                </div>
              </div>

              {subscriptionData.premiumEndsAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-6 w-6" />
                  <span className="paragraph-18-normal 2xl:paragraph-24-normal text-gray-700">
                    {subscriptionData.subscriptionStatus === "active"
                      ? t("renewsOn", {
                          date: formatDate(subscriptionData.premiumEndsAt),
                        })
                      : t("endsOn", {
                          date: formatDate(subscriptionData.premiumEndsAt),
                        })}
                  </span>
                </div>
              )}

              {subscriptionData.subscriptionStatus === "active" &&
                subscriptionData.stripeSubscriptionId && (
                  <div className="border-t pt-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-base-200 flex-center h-fit w-full border border-solid border-red-700 py-3 hover:cursor-pointer">
                          <span className="paragraph-14-normal 2xl:paragraph-18-medium font-medium text-red-700">
                            {t("cancelSubscription")}
                          </span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-full max-w-[clamp(50rem,20.8vw,100rem)] bg-white">
                        <AlertDialogHeader className="w-full">
                          <AlertDialogTitle className="paragraph-24-medium md:subtitle-medium text-center text-gray-900">
                            {t("confirmCancellation")}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="paragraph-14-normal 2xl:paragraph-18-normal mt-2 w-full text-gray-700">
                            {t("cancellationDescription")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="paragraph-14-normal 2xl:paragraph-18-normal border border-solid border-green-300 bg-green-100 px-2 hover:cursor-pointer">
                            <span className="paragraph-14-normal 2xl:paragraph-18-normal text-green-700">
                              {t("keepSubscription")}
                            </span>
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCancelSubscription}
                            disabled={cancelling}
                            className="bg-base-200 border-red-700 hover:cursor-pointer"
                          >
                            {cancelling ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-800">
                                  {t("cancelling")}
                                </span>
                              </>
                            ) : (
                              <span className="paragraph-14-normal 2xl:paragraph-18-normal text-primary-text-800">
                                {t("confirmCancel")}
                              </span>
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
            </CardContent>
          </Card>
        ) : (
          // Non-premium user - show empty state
          <Card className="w-full max-w-[clamp(40rem,20.8vw,80rem)] border-none">
            <CardHeader className="flex w-full flex-col items-center justify-center text-center">
              <CreditCard className="text-muted-foreground h-12 w-12" />
              <CardTitle className="paragraph-24-medium md:subtitle-medium text-center text-gray-900">
                {t("noPremiumTitle")}
              </CardTitle>
              <CardDescription className="paragraph-18-normal 2xl:paragraph-24-normal mt-2 text-gray-700">
                {t("noPremiumDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-center-col gap-4">
              {/* Terms and Conditions Checkbox */}
              <div className="flex w-full items-start gap-3">
                <Checkbox
                  id="terms-subscription"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms(checked as boolean)
                  }
                  className="mt-1 hover:cursor-pointer"
                />
                <label
                  htmlFor="terms-subscription"
                  className="paragraph-14-normal md:paragraph-18-normal text-primary-text-600 cursor-pointer leading-tight select-none"
                >
                  {tTerms("label")}{" "}
                  <Link
                    href="/legal/terms-and-conditions"
                    className="text-secondary-action decoration-secondary-action/30 hover:decoration-secondary-action font-semibold underline underline-offset-[0.3rem] transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tTerms("link")}
                  </Link>
                </label>
              </div>

              <button
                onClick={handlePremiumClick}
                disabled={purchasing || !acceptedTerms}
                className="hover:shadow-header bg-primary-action-900 relative flex w-full items-center justify-center rounded-[0.8rem] p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale"
              >
                <span className="bg-primary-action-100 absolute right-[63px] bottom-[-17px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
                <span className="bg-primary-action-100 absolute bottom-[-26px] left-[52px] z-5 h-[5rem] w-[12rem] rounded-full blur-[100px] xl:h-[clamp(5rem,2.6vw,9rem)] xl:w-[clamp(12rem,6.25vw,20rem)]"></span>
                <div className="border-elevated-surfaces-500 relative w-full rounded-[0.4rem] border border-solid px-8 py-3 xl:px-[clamp(32px,1.66vw)] xl:py-[clamp(1.2rem,0.625vw,2.4rem)]">
                  <p className="paragraph-18-medium md:paragraph-24-medium text-secondary-text-500 w-full text-center">
                    {purchasing ? "Loading..." : t("activatePremium")}
                  </p>
                </div>
              </button>
            </CardContent>
          </Card>
        )
      ) : (
        // Loading state or error
        <Card className="w-full max-w-[clamp(40rem,20.8vw,80rem)] border-none">
          <CardContent className="py-8">
            <div className="text-center">
              <p className="paragraph-18-normal 2xl:paragraph-24-normal text-gray-700">
                {t("loadingSubscription")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

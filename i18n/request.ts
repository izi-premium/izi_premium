import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

// Supported locales
export const locales = ["en", "es"] as const;
export const defaultLocale = "en" as const;

export default getRequestConfig(async () => {
  // Read locale from cookie or detect from browser
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;

  // Detect browser language as fallback
  let browserLocale = defaultLocale;
  try {
    const acceptLanguage = (await import("next/headers")).headers();
    const languages = (await acceptLanguage).get("accept-language") || "";

    // Extract language codes from accept-language header
    const preferredLanguages = languages
      .split(",")
      .map((lang) => lang.split(";")[0].trim())
      .map((lang) => lang.split("-")[0]); // Get language code only

    // Find first supported language
    const supportedLanguage = preferredLanguages.find((lang) =>
      locales.includes(lang as any)
    );

    if (supportedLanguage && locales.includes(supportedLanguage as any)) {
      browserLocale = supportedLanguage as typeof defaultLocale;
    }
  } catch (error) {
    // Fallback to default if detection fails
    console.log("Language detection failed, using default");
  }

  // Priority: Cookie > Browser detection > Default
  const locale =
    localeCookie && locales.includes(localeCookie as any)
      ? localeCookie
      : browserLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

// Regional pricing configuration based on your Excel data
export const regionalPricing = {
  EU: {
    currency: "eur",
    price: 6.99,
    priceId: process.env.STRIPE_PRICE_ID_EU!,
    symbol: "€",
    locale: "en-EU",
    countries: ["ES", "DE", "FR", "IT"],
  },
  CH: {
    currency: "chf",
    price: 7.99,
    priceId: process.env.STRIPE_PRICE_ID_CH!,
    symbol: "CHF",
    locale: "de-CH",
    countries: ["CH"],
  },
  US: {
    currency: "usd",
    price: 7.99,
    priceId: process.env.STRIPE_PRICE_ID_US!,
    symbol: "$",
    locale: "en-US",
    countries: ["US"],
  },
  CA: {
    currency: "cad",
    price: 7.99,
    priceId: process.env.STRIPE_PRICE_ID_CA!,
    symbol: "C$",
    locale: "en-CA",
    countries: ["CA"],
  },
  AU: {
    currency: "aud",
    price: 7.99,
    priceId: process.env.STRIPE_PRICE_ID_AU!,
    symbol: "A$",
    locale: "en-AU",
    countries: ["AU"],
  },
  MX: {
    currency: "mxn",
    price: 91.3,
    priceId: process.env.STRIPE_PRICE_ID_MX!,
    symbol: "$",
    locale: "es-MX",
    countries: ["MX"],
  },
  AR: {
    currency: "ars",
    price: 7364,
    priceId: process.env.STRIPE_PRICE_ID_AR!,
    symbol: "$",
    locale: "es-AR",
    countries: ["AR"],
  },
  CO: {
    currency: "cop",
    price: 19360,
    priceId: process.env.STRIPE_PRICE_ID_CO!,
    symbol: "$",
    locale: "es-CO",
    countries: ["CO"],
  },
  CL: {
    currency: "clp",
    price: 4768,
    priceId: process.env.STRIPE_PRICE_ID_CL!,
    symbol: "$",
    locale: "es-CL",
    countries: ["CL"],
  },
  PE: {
    currency: "pen",
    price: 17.45,
    priceId: process.env.STRIPE_PRICE_ID_PE!,
    symbol: "S/",
    locale: "es-PE",
    countries: ["PE"],
  },
  UY: {
    currency: "uyu",
    price: 205,
    priceId: process.env.STRIPE_PRICE_ID_UY!,
    symbol: "$U",
    locale: "es-UY",
    countries: ["UY"],
  },
  // Individual Latin American countries
  EC: {
    currency: "usd",
    price: 4.99,
    priceId: process.env.STRIPE_PRICE_ID_EC!,
    symbol: "$",
    locale: "es-EC",
    countries: ["EC"],
  },
  PA: {
    currency: "usd",
    price: 4.99,
    priceId: process.env.STRIPE_PRICE_ID_PA!,
    symbol: "$",
    locale: "es-PA",
    countries: ["PA"],
  },
  SV: {
    currency: "usd",
    price: 3.99,
    priceId: process.env.STRIPE_PRICE_ID_SV!,
    symbol: "$",
    locale: "es-SV",
    countries: ["SV"],
  },
  CR: {
    currency: "crc",
    price: 2620,
    priceId: process.env.STRIPE_PRICE_ID_CR!,
    symbol: "₡",
    locale: "es-CR",
    countries: ["CR"],
  },
  DO: {
    currency: "dop",
    price: 295,
    priceId: process.env.STRIPE_PRICE_ID_DO!,
    symbol: "RD$",
    locale: "es-DO",
    countries: ["DO"],
  },
  PY: {
    currency: "pyg",
    price: 36.6,
    priceId: process.env.STRIPE_PRICE_ID_PY!,
    symbol: "₲",
    locale: "es-PY",
    countries: ["PY"],
  },
  BO: {
    currency: "bob",
    price: 34.5,
    priceId: process.env.STRIPE_PRICE_ID_BO!,
    symbol: "Bs.",
    locale: "es-BO",
    countries: ["BO"],
  },
  GT: {
    currency: "gtq",
    price: 38.6,
    priceId: process.env.STRIPE_PRICE_ID_GT!,
    symbol: "Q",
    locale: "es-GT",
    countries: ["GT"],
  },
  HN: {
    currency: "hnl",
    price: 124,
    priceId: process.env.STRIPE_PRICE_ID_HN!,
    symbol: "L",
    locale: "es-HN",
    countries: ["HN"],
  },
  NI: {
    currency: "nio",
    price: 183,
    priceId: process.env.STRIPE_PRICE_ID_NI!,
    symbol: "C$",
    locale: "es-NI",
    countries: ["NI"],
  },
  VE: {
    currency: "usd",
    price: 4.88,
    priceId: process.env.STRIPE_PRICE_ID_VE!,
    symbol: "$",
    locale: "es-VE",
    countries: ["VE"],
  },
};

// Country to region mapping for easier lookup
const countryToRegionMap: Record<string, keyof typeof regionalPricing> = {
  // Europe
  ES: "EU",
  DE: "EU",
  FR: "EU",
  IT: "EU",

  // Switzerland
  CH: "CH",

  // North America
  US: "US",
  CA: "CA",

  // Oceania
  AU: "AU",

  // Latin America - Major economies
  MX: "MX",
  AR: "AR",
  CO: "CO",
  CL: "CL",
  PE: "PE",
  UY: "UY",

  // Latin America - Individual countries
  EC: "EC",
  PA: "PA",
  SV: "SV",
  CR: "CR",
  DO: "DO",
  PY: "PY",
  BO: "BO",
  GT: "GT",
  HN: "HN",
  NI: "NI",
  VE: "VE",
};

// Get user's region based on various factors
export function getUserRegion(
  countryCode?: string,
  timezone?: string,
  currency?: string
): keyof typeof regionalPricing {
  // Priority order: explicit currency > country code > timezone > default

  if (currency) {
    const region = Object.entries(regionalPricing).find(
      ([_, config]) => config.currency.toUpperCase() === currency.toUpperCase()
    );
    if (region) return region[0] as keyof typeof regionalPricing;
  }

  if (countryCode) {
    const region = countryToRegionMap[countryCode.toUpperCase()];
    if (region) return region;
  }

  if (timezone) {
    // Timezone-based fallbacks
    if (
      timezone.includes("America/New_York") ||
      timezone.includes("America/Los_Angeles")
    )
      return "US";
    if (timezone.includes("America/Toronto")) return "CA";
    if (
      timezone.includes("Europe/Madrid") ||
      timezone.includes("Europe/Berlin")
    )
      return "EU";
    if (timezone.includes("Europe/Zurich")) return "CH";
    if (timezone.includes("Australia/")) return "AU";
    if (timezone.includes("America/Mexico_City")) return "MX";
    if (timezone.includes("America/Argentina")) return "AR";
    if (timezone.includes("America/Bogota")) return "CO";
    if (timezone.includes("America/Santiago")) return "CL";
    if (timezone.includes("America/Lima")) return "PE";
    if (timezone.includes("America/Montevideo")) return "UY";
    // Individual Latin American countries
    if (timezone.includes("America/Guayaquil")) return "EC";
    if (timezone.includes("America/Panama")) return "PA";
    if (timezone.includes("America/El_Salvador")) return "SV";
    if (timezone.includes("America/Costa_Rica")) return "CR";
    if (timezone.includes("America/Santo_Domingo")) return "DO";
    if (timezone.includes("America/Asuncion")) return "PY";
    if (timezone.includes("America/La_Paz")) return "BO";
    if (timezone.includes("America/Guatemala")) return "GT";
    if (timezone.includes("America/Tegucigalpa")) return "HN";
    if (timezone.includes("America/Managua")) return "NI";
    if (timezone.includes("America/Caracas")) return "VE";
  }

  // Default to US pricing if nothing matches
  return "US";
}

// Format price with currency symbol
export function formatPrice(region: keyof typeof regionalPricing): string {
  const config = regionalPricing[region];
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
  }).format(config.price);
}

// Get price info for frontend display
export function getPriceInfo(region: keyof typeof regionalPricing) {
  const config = regionalPricing[region];
  return {
    amount: config.price,
    currency: config.currency.toUpperCase(),
    symbol: config.symbol,
    formatted: formatPrice(region),
  };
}

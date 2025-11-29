import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Your static pages
  const staticPages = [
    "",
    "faqs",
    "/legal/terms-and-conditions",
    "/legal/app-terms-and-conditions",
    "/legal/community-rules",
    "/legal/privacy-policy",
    "/legal/cookies",
    "/legal/subcontractors",
    "/legal/legal-notice",
  ];

  const siteMaps = staticPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date().toISOString(),
  }));

  return siteMaps;
}

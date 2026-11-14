import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* The legal pages are drafts and set to noindex, so only the home page is listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}

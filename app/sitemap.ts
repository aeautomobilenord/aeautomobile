import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/bewertung"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/standorte"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/ueber-uns"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/faq"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/datenschutz"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: absoluteUrl("/impressum"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
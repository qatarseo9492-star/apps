import type { MetadataRoute } from "next";
import { sql } from "@vercel/postgres";

const SITE =
  (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "") ||
  "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, priority: 1 },
    { url: `${SITE}/software`, changeFrequency: "daily", priority: 0.6 },
  ];

  // Software slugs
  const sw = await sql/* sql */`select slug from software limit 1000`;
  for (const r of sw.rows as Array<{ slug: string }>) {
    urls.push({
      url: `${SITE}/software/${r.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Category slugs (if you have categories table)
  try {
    const cats = await sql/* sql */`select slug from categories limit 1000`;
    for (const r of cats.rows as Array<{ slug: string }>) {
      urls.push({
        url: `${SITE}/category/${r.slug}`,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  } catch {
    // categories table might not exist yet; skip
  }

  return urls;
}

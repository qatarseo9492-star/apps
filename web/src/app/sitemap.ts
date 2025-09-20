import { MetadataRoute } from 'next';
import { db } from '@/db/client';
import { software, categories } from '@/db/schema';
import { sql } from '@vercel/postgres';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // NOTE: You can write proper Drizzle selects; placeholder minimal listing:
  const sw = await db.execute(sql`select slug from software limit 1000`);
  const cats = await db.execute(sql`select slug from categories limit 1000`);

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
  ];

  const swPages: MetadataRoute.Sitemap = (sw.rows as any[]).map((r) => ({
    url: `${base}/software/${r.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8
  }));
  const catPages: MetadataRoute.Sitemap = (cats.rows as any[]).map((r) => ({
    url: `${base}/category/${r.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.6
  }));

  return [...staticPages, ...swPages, ...catPages];
}

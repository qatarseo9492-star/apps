import type { MetadataRoute } from 'next';
import { sql } from '@vercel/postgres';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'http://localhost:3000';

  const [{ rows: sw }, { rows: cats }] = await Promise.all([
    sql`select slug, coalesce(last_updated_at, now()) as lm from software limit 1000`,
    sql`select slug from categories limit 1000`,
  ]);

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...sw.map((r: any) => ({
      url: `${base}/software/${r.slug}`,
      lastModified: r.lm ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...cats.map((c: any) => ({
      url: `${base}/category/${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  return entries;
}

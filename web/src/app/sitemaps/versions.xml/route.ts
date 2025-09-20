import { db } from '@/lib/db';
export const revalidate = 60 * 60 * 6;

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const rows = await db.softwareVersion.findMany({ select: { version: true, software: { select: { slug: true } }, createdAt: true } });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.map(r=>`<url><loc>${base}/software/${r.software.slug}/${encodeURIComponent(r.version)}</loc><lastmod>${r.createdAt.toISOString()}</lastmod></url>`).join('')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

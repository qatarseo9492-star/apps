import { db } from '@/lib/db';
export const revalidate = 60 * 60 * 6;

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const items = await db.category.findMany({ select: { slug: true } });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.map(i=>`<url><loc>${base}/category/${i.slug}</loc></url>`).join('')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

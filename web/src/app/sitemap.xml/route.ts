export const revalidate = 60 * 60 * 6;

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const index = [
    `${base}/sitemaps/software.xml`,
    `${base}/sitemaps/categories.xml`,
    `${base}/sitemaps/vendors.xml`,
    `${base}/sitemaps/versions.xml`
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${index.map(u=>`<sitemap><loc>${u}</loc></sitemap>`).join('')}
</sitemapindex>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=21600' } });
}

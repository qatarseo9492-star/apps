import type { Metadata } from 'next';
import { db } from '@/lib/db';

export default async function Head({ params }: { params: { slug: string } }) {
  const s = await db.software.findUnique({ where: { slug: params.slug }, include: { currentVersion: true } });
  const title = s ? `${s.name}${s.currentVersion ? ' ' + s.currentVersion.version : ''} Free Download — SoftHub` : 'Software — SoftHub';
  const desc = s?.shortDesc || 'Software details and downloads.';
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/software/${params.slug}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}

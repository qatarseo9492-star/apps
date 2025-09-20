import { db } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';

export const revalidate = 60 * 60 * 6;

export default async function Page({ params }: { params: { slug: string; version: string } }) {
  const s = await db.software.findUnique({ where: { slug: params.slug }, include: { versions: true } });
  if (!s) return notFound();
  // Strategy: canonicalize to base page
  redirect(`/software/${params.slug}`);
}

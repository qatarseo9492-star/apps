import { db } from '@/lib/db';
import { SoftwareCard } from '@/components/SoftwareCard';
import Link from 'next/link';

export const revalidate = 60 * 60 * 6; // 6h ISR

export default async function Home() {
  const [trending, recent, topFree] = await Promise.all([
    db.software.findMany({ where: { status: 'published' }, orderBy: { ratingsCount: 'desc' }, take: 8, include: { currentVersion: true } }),
    db.software.findMany({ where: { status: 'published' }, orderBy: { lastUpdatedAt: 'desc' }, take: 8, include: { currentVersion: true } }),
    db.software.findMany({ where: { status: 'published', isFree: true }, orderBy: { ratingsAvg: 'desc' }, take: 8, include: { currentVersion: true } })
  ]);

  return (
    <div className="space-y-10">
      <section className="text-center py-10 bg-gray-50 rounded-2xl">
        <h1 className="text-3xl font-bold">Download Your Desired App For Free</h1>
        <p className="text-gray-600 mt-2">Popular · Most Viewed · New</p>
      </section>

      <Section title="Trending" href="/category/top" items={trending} />
      <Section title="Recently Updated" href="/category/recent" items={recent} />
      <Section title="Top Free" href="/category/free" items={topFree} />
    </div>
  );
}

function Section({ title, href, items }: { title: string; href: string; items: any[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link className="link" href={href}>View All</Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((s) => <SoftwareCard key={s.id} s={s} />)}
      </div>
    </section>
  );
}

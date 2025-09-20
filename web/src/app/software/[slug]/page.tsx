import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/lib/jsonld';
import { notFound } from 'next/navigation';

export const revalidate = 60 * 60 * 6; // 6h

export default async function SoftwarePage({ params }: { params: { slug: string } }) {
  const s = await db.software.findUnique({
    where: { slug: params.slug },
    include: {
      currentVersion: { include: { mirrors: true, media: true } },
      versions: { orderBy: { releaseDate: 'desc' } },
      faqs: { orderBy: { order: 'asc' } },
      media: { orderBy: { order: 'asc' } },
      category: true,
      vendor: true
    }
  });
  if (!s || s.status !== 'published') return notFound();
  const v = s.currentVersion;

  const similar = await db.software.findMany({
    where: { status: 'published', categoryId: s.categoryId, NOT: { id: s.id } },
    orderBy: { ratingsAvg: 'desc' },
    take: 6,
    include: { currentVersion: true }
  });

  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: s.name,
    softwareVersion: v?.version,
    operatingSystem: v?.os,
    applicationCategory: 'SoftwareApplication',
    offers: { '@type': 'Offer', price: s.isFree ? 0 : 0, priceCurrency: 'USD' },
    aggregateRating: s.ratingsCount > 0 ? { '@type': 'AggregateRating', ratingValue: s.ratingsAvg, reviewCount: s.ratingsCount } : undefined
  };

  return (
    <div className="space-y-8">
      <JsonLd data={jsonLd} />
      <Breadcrumb slug={s.slug} name={s.name} category={s.category?.name} />

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {s.heroUrl && <Image src={s.heroUrl} alt={s.name} width={480} height={270} className="rounded" />}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{s.name} {v?.version ? `v${v.version}` : ''}</h1>
          <p className="text-gray-600 mt-2">{s.shortDesc}</p>
          <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-3">
            {v?.os && <span className="px-2 py-0.5 rounded-full bg-gray-100">{v.os}</span>}
            {s.licenseDefault && <span>License: {s.licenseDefault}</span>}
            {v?.fileSizeBytes && <span>Size: {(v.fileSizeBytes/1024/1024).toFixed(1)} MB</span>}
            {v?.checksumSha256 && <span>SHA-256: <code className="break-all">{v.checksumSha256}</code></span>}
            <span>Last updated: {new Date(s.lastUpdatedAt).toLocaleDateString()}</span>
          </div>
          <div className="mt-4 flex gap-3">
            {v?.downloadUrl && <a className="px-4 py-2 rounded bg-brand-accent text-white" href={`/api/download?slug=${encodeURIComponent(s.slug)}&version=${encodeURIComponent(v.version)}`}>Download</a>}
            {v?.mirrors?.length ? <a className="px-4 py-2 rounded border" href="#mirrors">Mirrors</a> : null}
            {s.website && <a className="px-4 py-2 rounded border" href={s.website} target="_blank">Homepage</a>}
            <a className="px-4 py-2 rounded border" href="#older">Older Versions</a>
            <Link className="px-4 py-2 rounded border" href="/help/how-to-download">How-to</Link>
          </div>
        </div>
      </div>

      <Tabs s={s} />

      <section id="older" className="mt-8">
        <h2 className="font-semibold mb-3">Older Versions</h2>
        <ul className="divide-y">
          {s.versions.map(ver => (
            <li key={ver.id} className="py-3 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium">{ver.version} — {ver.os}</div>
                <div className="text-gray-500">
                  {ver.releaseDate ? new Date(ver.releaseDate).toLocaleDateString() : '—'}
                  {' · '} {(ver.fileSizeBytes/1024/1024).toFixed(1)} MB
                  {' · '} SHA-256 {ver.checksumSha256}
                </div>
              </div>
              <a className="link" href={`/api/download?slug=${encodeURIComponent(s.slug)}&version=${encodeURIComponent(ver.version)}`}>Download</a>
            </li>
          ))}
        </ul>
      </section>

      {v?.mirrors?.length ? (
        <section id="mirrors" className="mt-8">
          <h2 className="font-semibold mb-3">Mirrors</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {v.mirrors.map(m => (
              <li key={m.id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.region}</div>
                  <div className="text-xs text-gray-500">Latency: {m.latencyMs} ms · Status: {m.status}</div>
                </div>
                <a className="link" href={m.baseUrl} target="_blank">Open</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-semibold mb-3">Similar Apps</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {similar.map(x => (
            <Link key={x.id} className="border rounded p-4 hover:shadow-sm" href={`/software/${x.slug}`}>{x.name}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Breadcrumb({ slug, name, category }: { slug: string; name: string; category?: string }) {
  const items = [
    { name: 'Home', url: '/' },
    category ? { name: category, url: '#' } : undefined,
    { name, url: `/software/${slug}` }
  ].filter(Boolean) as { name: string; url: string }[];
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i+1, name: it.name, item: it.url }))
  };
  return (
    <>
      <JsonLd data={jsonLd} />
      <nav className="text-sm text-gray-500">
        {items.map((it, i) => (
          <span key={it.url}>
            {i>0 && ' / '}<a className="link" href={it.url}>{it.name}</a>
          </span>
        ))}
      </nav>
    </>
  );
}

function Tabs({ s }: { s: any }) {
  const v = s.currentVersion;
  return (
    <div className="border rounded-xl">
      <div className="flex gap-4 px-4 pt-3 border-b">
        {['Overview','Changelog','System Requirements','FAQ','Compare','Screenshots/Video'].map((t, i) => (
          <a key={t} href={`#tab-${i}`} className="py-2 text-sm hover:text-brand-accent">{t}</a>
        ))}
      </div>
      <div className="p-4 space-y-8">
        <section id="tab-0">
          <h3 className="font-semibold mb-2">Overview</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: s.longDesc.replace(/\n/g,'<br/>') }} />
        </section>
        <section id="tab-1">
          <h3 className="font-semibold mb-2">Changelog</h3>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">{v?.changelog || '—'}</pre>
        </section>
        <section id="tab-2">
          <h3 className="font-semibold mb-2">System Requirements</h3>
          <ReqTable softwareId={s.id} />
        </section>
        <section id="tab-3">
          <h3 className="font-semibold mb-2">FAQ</h3>
          <dl className="divide-y">
            {s.faqs.map((f:any)=> (
              <div key={f.id} className="py-3">
                <dt className="font-medium">{f.question}</dt>
                <dd className="text-sm text-gray-600 mt-1">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section id="tab-4">
          <h3 className="font-semibold mb-2">Compare</h3>
          <p className="text-sm text-gray-600">Comparison UI can be wired to the `Comparison` model as needed.</p>
        </section>
        <section id="tab-5">
          <h3 className="font-semibold mb-2">Screenshots / Video</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {(s.media || v?.media || []).map((m:any)=> (
              <figure key={m.id} className="border rounded overflow-hidden">
                <Image src={m.url} alt={m.caption || s.name} width={480} height={270} />
                {m.caption && <figcaption className="text-xs p-2 text-gray-500">{m.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

async function ReqTable({ softwareId }: { softwareId: string }) {
  const reqs = await db.systemRequirement.findMany({ where: { softwareId } });
  const osOrder = ['Windows','macOS','Linux'];
  const ordered = reqs.sort((a:any,b:any)=> osOrder.indexOf(a.os) - osOrder.indexOf(b.os));
  return (
    <div className="overflow-auto">
      <table className="min-w-[600px] w-full text-sm">
        <thead><tr className="text-left">
          <th className="p-2">OS</th>
          <th className="p-2">Minimum</th>
          <th className="p-2">Recommended</th>
        </tr></thead>
        <tbody>
          {ordered.map((r:any)=> (
            <tr key={r.id} className="border-t">
              <td className="p-2 font-medium">{r.os}</td>
              <td className="p-2 whitespace-pre-wrap">{JSON.stringify(r.minimum, null, 2)}</td>
              <td className="p-2 whitespace-pre-wrap">{r.recommended ? JSON.stringify(r.recommended, null, 2) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

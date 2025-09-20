import { db } from '@/lib/db';
import { SoftwareCard } from '@/components/SoftwareCard';
import { Pagination } from '@/components/Pagination';
import { notFound } from 'next/navigation';

export const revalidate = 60 * 60 * 6; // 6h ISR

export default async function CategoryPage({
  params, searchParams
}: { params: { slug: string }; searchParams: Record<string, string | undefined>; }) {
  const page = Number(searchParams.page ?? '1');
  const perPage = 12;

  const category = await db.category.findUnique({ where: { slug: params.slug } });
  if (!category) return notFound();

  // Facets
  const os = searchParams.os;
  const license = searchParams.license;
  const minSize = searchParams.minSize ? Number(searchParams.minSize) : undefined; // MB
  const maxSize = searchParams.maxSize ? Number(searchParams.maxSize) : undefined; // MB
  const minRating = searchParams.minRating ? Number(searchParams.minRating) : undefined;
  const sort = searchParams.sort ?? 'recent';

  const where: any = { status: 'published', categoryId: category.id };
  if (os) where.versions = { some: { os } };
  if (license) where.licenseDefault = license;
  if (minRating) where.ratingsAvg = { gte: minRating };
  if (minSize || maxSize) {
    where.versions = {
      some: {
        ...(os ? { os } : {}),
        ...(minSize ? { fileSizeBytes: { gte: minSize * 1024 * 1024 } } : {}),
        ...(maxSize ? { fileSizeBytes: { lte: maxSize * 1024 * 1024 } } : {})
      }
    };
  }

  const orderBy =
    sort === 'rating' ? { ratingsAvg: 'desc' } :
    sort === 'downloads' ? { ratingsCount: 'desc' } :
    { lastUpdatedAt: 'desc' };

  const [total, rows] = await Promise.all([
    db.software.count({ where }),
    db.software.findMany({ where, orderBy, skip: (page - 1) * perPage, take: perPage, include: { currentVersion: true } })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <aside className="space-y-4">
          <form className="space-y-3">
            <Field label="OS">
              <select name="os" defaultValue={os} className="w-full border rounded p-2">
                <option value="">All</option>
                <option>Windows</option>
                <option>macOS</option>
                <option>Linux</option>
                <option>Android</option>
              </select>
            </Field>
            <Field label="License">
              <select name="license" defaultValue={license} className="w-full border rounded p-2">
                <option value="">All</option>
                <option>Free</option>
                <option>Trial</option>
                <option>Paid</option>
              </select>
            </Field>
            <Field label="Size (MB)">
              <div className="flex gap-2">
                <input name="minSize" defaultValue={minSize} placeholder="Min" className="w-full border rounded p-2"/>
                <input name="maxSize" defaultValue={maxSize} placeholder="Max" className="w-full border rounded p-2"/>
              </div>
            </Field>
            <Field label="Min Rating">
              <input name="minRating" defaultValue={minRating} placeholder="0-5" className="w-full border rounded p-2"/>
            </Field>
            <button className="w-full border rounded p-2" formAction="get">Apply</button>
          </form>
        </aside>
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{total} results</div>
            <form>
              <select name="sort" defaultValue={sort} className="border rounded p-2">
                <option value="recent">Recently Updated</option>
                <option value="rating">Rating</option>
                <option value="downloads">Downloads</option>
              </select>
              <button className="ml-2 border rounded p-2" formAction="get">Go</button>
            </form>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rows.map((s) => <SoftwareCard key={s.id} s={s} />)}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath={`/category/${params.slug}`}
            query={{ os, license, minSize, maxSize, minRating, sort }}
          />
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <div>
      <label className="font-medium text-sm">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

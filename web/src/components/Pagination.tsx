import Link from 'next/link';

export function Pagination({
  page, totalPages, basePath, query
}: {
  page: number; totalPages: number; basePath: string; query?: Record<string, string | number | undefined>;
}) {
  const q = new URLSearchParams(
    Object.fromEntries(
      Object.entries(query || {}).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)])
    )
  );
  function url(p: number) {
    q.set('page', String(p));
    return `${basePath}?${q.toString()}`;
    }
  return (
    <div className="flex items-center gap-2 justify-center my-8">
      <Link className="px-3 py-1 border rounded" href={page > 1 ? url(page - 1) : url(1)} aria-disabled={page === 1}>Prev</Link>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <Link className="px-3 py-1 border rounded" href={page < totalPages ? url(page + 1) : url(totalPages)} aria-disabled={page === totalPages}>Next</Link>
    </div>
  );
}

import { apiGet } from '@/lib/api';

export default async function AdminSoftwareList(){
  const data = await apiGet<{ ok:boolean; items:any[] }>('/api/software').catch(()=>({ok:false, items:[]}));
  return (
    <main className="container-max py-10">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Software</h1>
          <a className="btn btn-primary" href="/admin/software/new">New</a>
        </div>
        <div className="mt-6 grid gap-3">
          {(data.items || []).map((s) => (
            <a key={s.slug} href={`/admin/software/${s.slug}/edit`} className="p-4 rounded-xl border border-[var(--border)] hover:bg-white/5">
              <div className="font-medium">{s.name}</div>
              <div className="opacity-60 text-sm">{s.slug}</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

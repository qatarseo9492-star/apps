'use client';

import { useState, useEffect } from 'react';
import { apiPost, apiPut } from '@/lib/api';
import { slugify } from '@/lib/slug';
import type { SoftwareInput } from '@/types';

const OS_OPTS = ['Windows','macOS','Linux','Android','iOS'];

export default function NewSoftwareForm({ initial }:{ initial?: Partial<SoftwareInput> }){
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string|null>(null);
  const [form, setForm] = useState<SoftwareInput>(() => ({
    slug: initial?.slug || '',
    name: initial?.name || '',
    shortDesc: initial?.shortDesc || '',
    longDesc: initial?.longDesc || '',
    license: initial?.license || '',
    os: initial?.os || [],
    vendorSlug: initial?.vendorSlug || '',
    categorySlug: initial?.categorySlug || '',
    seoTitle: initial?.seoTitle || '',
    seoDescription: initial?.seoDescription || '',
  }));

  useEffect(() => {
    if (!initial?.slug) setForm((f)=> ({ ...f, slug: slugify(f.name) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  const onSave = async () => {
    setSaving(true); setErr(null);
    try {
      const payload = { ...form, os: form.os || [] };
      if (initial?.slug) {
        await apiPut(`/api/software/${initial.slug}`, payload);
      } else {
        await apiPost('/api/software', payload);
      }
      window.location.href = '/admin/software';
    } catch (e:any) {
      setErr(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {err && <div className="text-red-400 text-sm">{err}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <div className="text-xs opacity-70 mb-1">Name</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.name} onChange={(e)=> setForm({ ...form, name: e.target.value })}/>
        </label>
        <label className="block">
          <div className="text-xs opacity-70 mb-1">Slug</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.slug} onChange={(e)=> setForm({ ...form, slug: e.target.value })}/>
        </label>
        <label className="block sm:col-span-2">
          <div className="text-xs opacity-70 mb-1">Short Description</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.shortDesc ?? ''} onChange={(e)=> setForm({ ...form, shortDesc: e.target.value })}/>
        </label>
        <label className="block sm:col-span-2">
          <div className="text-xs opacity-70 mb-1">Long Description (HTML/Markdown)</div>
          <textarea rows={8} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.longDesc ?? ''} onChange={(e)=> setForm({ ...form, longDesc: e.target.value })}/>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <div className="text-xs opacity-70 mb-1">Vendor Slug</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.vendorSlug ?? ''} onChange={(e)=> setForm({ ...form, vendorSlug: e.target.value })}/>
        </label>
        <label className="block">
          <div className="text-xs opacity-70 mb-1">Category Slug</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.categorySlug ?? ''} onChange={(e)=> setForm({ ...form, categorySlug: e.target.value })}/>
        </label>
        <label className="block">
          <div className="text-xs opacity-70 mb-1">License</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.license ?? ''} onChange={(e)=> setForm({ ...form, license: e.target.value })}/>
        </label>
        <div>
          <div className="text-xs opacity-70 mb-1">OS</div>
          <div className="flex flex-wrap gap-2">
            {OS_OPTS.map((o)=>{
              const checked = form.os?.includes(o);
              return (
                <label key={o} className="inline-flex items-center gap-2 border border-[var(--border)] rounded-lg px-2 py-1 cursor-pointer">
                  <input type="checkbox" checked={!!checked}
                    onChange={()=> setForm((f)=> ({
                      ...f,
                      os: checked ? (f.os||[]).filter(x=>x!==o) : ([...(f.os||[]), o])
                    }))}/>
                  <span className="text-sm">{o}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <div className="text-xs opacity-70 mb-1">SEO Title</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.seoTitle ?? ''} onChange={(e)=> setForm({ ...form, seoTitle: e.target.value })}/>
        </label>
        <label className="block">
          <div className="text-xs opacity-70 mb-1">SEO Description</div>
          <input className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent"
                 value={form.seoDescription ?? ''} onChange={(e)=> setForm({ ...form, seoDescription: e.target.value })}/>
        </label>
      </div>

      <div className="pt-2">
        <button onClick={onSave} disabled={saving} className="btn btn-primary">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}

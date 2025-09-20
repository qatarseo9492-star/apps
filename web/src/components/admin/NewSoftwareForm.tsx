"use client";

import { useEffect, useMemo, useState } from "react";
import type { SoftwareInput } from "../../types";

/** local, tiny slugify to avoid import churn */
function slugify(input: string) {
  return (input || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type Props = {
  initial?: Partial<SoftwareInput>;
  onSaved?: (res: { ok: boolean; slug: string }) => void;
};

export default function NewSoftwareForm({ initial, onSaved }: Props) {
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<SoftwareInput>(() => ({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    shortDesc: initial?.shortDesc ?? "",
    longDesc: initial?.longDesc ?? "",
    license: initial?.license ?? "",
    os: initial?.os ?? [],
    categories: initial?.categories ?? [],
    seoTitle: initial?.seoTitle ?? "",
    seoDescription: initial?.seoDescription ?? "",
    vendor: initial?.vendor ?? "",
    vendorSlug: initial?.vendorSlug ?? "",
    categorySlug: initial?.categorySlug ?? "",
    version: initial?.version ?? "",
    fileSizeBytes: initial?.fileSizeBytes ?? null,
    featuredImage: initial?.featuredImage ?? "",
    faqs: initial?.faqs ?? [],
    systemRequirements: initial?.systemRequirements ?? [],
  }));

  // autoslug
  useEffect(() => {
    if (!initial?.slug && form.name) {
      setForm((f) => ({ ...f, slug: slugify(f.name!) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  const save = async () => {
    setSaving(true);
    setErr(null);
    try {
      // keep payload inline with your /api/software POST handler (Postgres columns)
      const payload = {
        name: (form.name || "").trim(),
        slug: (form.slug || "").trim() || slugify(form.name || ""),
        shortDesc: form.shortDesc ?? null,
        longDesc: form.longDesc ?? null,
        license: form.license ?? null,
        os: Array.isArray(form.os) ? form.os : [],
        vendorSlug: form.vendorSlug ?? null,
        categorySlug: form.categorySlug ?? null,
        seoTitle: form.seoTitle ?? null,
        seoDescription: form.seoDescription ?? null,
      };

      const res = await fetch("/api/software", {
        method: "POST",
        headers: { "content-type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `HTTP ${res.status}`);
      }

      const json = (await res.json()) as { ok: boolean; slug: string; error?: string };
      if (!json.ok) throw new Error(json.error || "Save failed");

      onSaved?.(json);
    } catch (e: any) {
      setErr(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="rounded-xl border p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">New Software</h2>
          {err && <div className="text-sm text-red-500">{err}</div>}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <div className="mb-1 text-xs opacity-70">Name</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs opacity-70">Slug</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.slug || ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="mb-1 text-xs opacity-70">Short Description</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.shortDesc ?? ""}
              onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="mb-1 text-xs opacity-70">Long Description</div>
            <textarea
              rows={6}
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.longDesc ?? ""}
              onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs opacity-70">License</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.license ?? ""}
              onChange={(e) => setForm({ ...form, license: e.target.value })}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs opacity-70">Vendor Slug</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.vendorSlug ?? ""}
              onChange={(e) => setForm({ ...form, vendorSlug: e.target.value })}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs opacity-70">Category Slug</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.categorySlug ?? ""}
              onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs opacity-70">OS (comma separated)</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={(form.os || []).join(", ")}
              onChange={(e) =>
                setForm({ ...form, os: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
              }
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="mb-1 text-xs opacity-70">SEO Title</div>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.seoTitle ?? ""}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="mb-1 text-xs opacity-70">SEO Description</div>
            <textarea
              rows={3}
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={form.seoDescription ?? ""}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
            />
          </label>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={save}
            disabled={saving || !form.name?.trim()}
            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60 dark:bg-white dark:text-black"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

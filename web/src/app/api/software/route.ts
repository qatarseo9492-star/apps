import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { sql } from '@vercel/postgres';
import { slugify } from '@/lib/slug';

export async function GET() {
  const res = await db.execute(sql`select slug, name, short_desc from software order by last_updated_at desc limit 200`);
  return NextResponse.json({ ok: true, items: res.rows });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || '').trim();
    if (!name) throw new Error('Name is required');
    const slug = slugify(body?.slug || name);
    const shortDesc = body?.shortDesc ?? null;
    const longDesc  = body?.longDesc ?? null;
    const license   = body?.license ?? null;
    const os        = Array.isArray(body?.os) ? body.os : null;
    const vendorSlug   = body?.vendorSlug ?? null;
    const categorySlug = body?.categorySlug ?? null;
    const seoTitle = body?.seoTitle ?? null;
    const seoDescription = body?.seoDescription ?? null;

    await db.execute(sql`
      insert into software (slug, name, short_desc, long_desc, license, os, vendor_slug, category_slug, seo_title, seo_description, last_updated_at, status)
      values (${slug}, ${name}, ${shortDesc}, ${longDesc}, ${license}, ${os}::jsonb, ${vendorSlug}, ${categorySlug}, ${seoTitle}, ${seoDescription}, now(), 'published')
      on conflict (slug) do update set
        name = excluded.name,
        short_desc = excluded.short_desc,
        long_desc = excluded.long_desc,
        license = excluded.license,
        os = excluded.os,
        vendor_slug = excluded.vendor_slug,
        category_slug = excluded.category_slug,
        seo_title = excluded.seo_title,
        seo_description = excluded.seo_description,
        last_updated_at = now()
    `);

    return NextResponse.json({ ok: true, slug });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Create failed' }, { status: 400 });
  }
}

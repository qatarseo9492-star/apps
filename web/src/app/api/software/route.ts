import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  const { rows } =
    await sql`select slug, name, short_desc from software order by last_updated_at desc limit 200`;
  return NextResponse.json({ ok: true, items: rows });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const name = String(body?.name || '').trim();
    if (!name) throw new Error('Name is required');

    const slug =
      String(body?.slug || name.toLowerCase().replace(/\s+/g, '-')).trim();

    const shortDesc = body?.shortDesc ?? null;
    const longDesc = body?.longDesc ?? null;
    const license = body?.license ?? null;
    const os = Array.isArray(body?.os) ? body.os : [];
    const vendorSlug = body?.vendorSlug ?? null;
    const categorySlug = body?.categorySlug ?? null;
    const seoTitle = body?.seoTitle ?? null;
    const seoDescription = body?.seoDescription ?? null;
    const status = 'published';

    const { rows } = await sql`
      insert into software (
        slug, name, short_desc, long_desc, license, os,
        vendor_slug, category_slug, seo_title, seo_description,
        last_updated_at, status
      )
      values (
        ${slug}, ${name}, ${shortDesc}, ${longDesc}, ${license},
        ${JSON.stringify(os)}::jsonb,
        ${vendorSlug}, ${categorySlug}, ${seoTitle}, ${seoDescription},
        now(), ${status}
      )
      returning id, slug
    `;

    return NextResponse.json({ ok: true, id: rows[0].id, slug: rows[0].slug });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'Create failed' },
      { status: 400 }
    );
  }
}

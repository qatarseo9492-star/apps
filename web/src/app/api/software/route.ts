import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const { rows } = await sql/* sql */`
    select slug, name, short_desc
    from software
    order by last_updated_at desc
    limit 200
  `;
  return NextResponse.json({ ok: true, items: rows });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const slug = String(body.slug || "").trim();
    const name = String(body.name || "").trim();
    if (!slug || !name) {
      return NextResponse.json({ ok: false, error: "slug and name are required" }, { status: 400 });
    }

    const shortDesc = body.shortDesc ?? null;
    const longDesc = body.longDesc ?? null;
    const license = body.license ?? null;
    const osJson = body?.os ? JSON.stringify(body.os) : null;
    const vendorSlug = body.vendorSlug ?? null;
    const categorySlug = body.categorySlug ?? null;
    const seoTitle = body.seoTitle ?? null;
    const seoDescription = body.seoDescription ?? null;

    const { rows } = await sql/* sql */`
      insert into software (
        slug, name, short_desc, long_desc, license, os,
        vendor_slug, category_slug, seo_title, seo_description,
        last_updated_at, status
      )
      values (
        ${slug}, ${name}, ${shortDesc}, ${longDesc}, ${license},
        ${osJson}::jsonb, ${vendorSlug}, ${categorySlug}, ${seoTitle}, ${seoDescription},
        now(), 'published'
      )
      on conflict (slug) do update set
        name            = excluded.name,
        short_desc      = excluded.short_desc,
        long_desc       = excluded.long_desc,
        license         = excluded.license,
        os              = excluded.os,
        vendor_slug     = excluded.vendor_slug,
        category_slug   = excluded.category_slug,
        seo_title       = excluded.seo_title,
        seo_description = excluded.seo_description,
        last_updated_at = now()
      returning slug
    `;

    return NextResponse.json({ ok: true, slug: rows[0]?.slug || slug });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Create failed" }, { status: 400 });
  }
}

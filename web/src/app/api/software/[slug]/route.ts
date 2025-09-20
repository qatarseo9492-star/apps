// src/app/api/software/[slug]/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const r = await sql/*sql*/`
    SELECT * FROM software
    WHERE slug = ${params.slug}
    LIMIT 1
  `;
  if (r.rows.length === 0) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, item: r.rows[0] });
}

// PUT
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const body = await req.json().catch(() => ({} as any));
  const osJson = Array.isArray(body.os) ? JSON.stringify(body.os) : null;

  const res = await sql/*sql*/`
    UPDATE software SET
      name             = ${body.name ?? null},
      short_desc       = ${body.shortDesc ?? null},
      long_desc        = ${body.longDesc ?? null},
      license          = ${body.license ?? null},
      os               = ${osJson}::jsonb,
      vendor_slug      = ${body.vendorSlug ?? null},
      category_slug    = ${body.categorySlug ?? null},
      seo_title        = ${body.seoTitle ?? null},
      seo_description  = ${body.seoDescription ?? null},
      last_updated_at  = NOW()
    WHERE slug = ${params.slug}
  `;

  if (res.rowCount === 0) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, slug: params.slug });
}

// DELETE
export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  const res = await sql/*sql*/`DELETE FROM software WHERE slug = ${params.slug}`;
  if (res.rowCount === 0) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

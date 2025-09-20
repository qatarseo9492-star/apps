import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { rows } = await sql/* sql */`
    select * from software where slug = ${params.slug} limit 1
  `;
  if (!rows.length) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, item: rows[0] });
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json().catch(() => ({} as any));

    // Coerce arrays/objects to jsonb
    const osJson = body?.os ? JSON.stringify(body.os) : null;

    await sql/* sql */`
      update software set
        name            = ${body.name ?? null},
        short_desc      = ${body.shortDesc ?? null},
        long_desc       = ${body.longDesc ?? null},
        license         = ${body.license ?? null},
        os              = ${osJson}::jsonb,
        vendor_slug     = ${body.vendorSlug ?? null},
        category_slug   = ${body.categorySlug ?? null},
        seo_title       = ${body.seoTitle ?? null},
        seo_description = ${body.seoDescription ?? null},
        last_updated_at = now()
      where slug = ${params.slug}
    `;

    return NextResponse.json({ ok: true, slug: params.slug });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  await sql/* sql */`delete from software where slug = ${params.slug}`;
  return NextResponse.json({ ok: true });
}

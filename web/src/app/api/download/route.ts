import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug')!;
  const version = searchParams.get('version')!;
  const s = await db.software.findUnique({ where: { slug }, select: { id: true } });
  const v = await db.softwareVersion.findFirst({ where: { softwareId: s?.id, version } });
  if (!s || !v) return NextResponse.redirect('/', 302);

  await db.downloadLog.create({
    data: {
      softwareId: s.id,
      versionId: v.id,
      country: req.headers.get('x-vercel-ip-country') || undefined,
      referrer: req.headers.get('referer') || undefined,
      userAgent: req.headers.get('user-agent') || undefined,
    }
  });

  return NextResponse.redirect(v.downloadUrl, 302);
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-secret');
  if (secret !== process.env.REVALIDATE_SECRET) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const body = await req.json().catch(()=>({}));
    const paths: string[] = body.paths || ['/'];
    // Return list for your deploy logs; wire up tag-based revalidation later if needed
    return NextResponse.json({ ok: true, paths });
  } catch(e:any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

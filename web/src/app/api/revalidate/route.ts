import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const token = req.headers.get('x-revalidate-token');
  if (token !== process.env.REVALIDATE_TOKEN) return NextResponse.json({ ok:false }, { status:401 });

  const { paths } = await req.json().catch(()=> ({ paths:[] }));
  if (Array.isArray(paths)) paths.forEach((p)=> revalidatePath(p));
  return NextResponse.json({ ok:true });
}

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge'; // faster, recommended for Blob

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return NextResponse.json({ ok:false, error:'No file' }, { status:400 });

    const blob = await put(`uploads/${Date.now()}_${file.name}`, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    return NextResponse.json({ ok:true, url: blob.url });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:e?.message || 'Upload failed' }, { status:500 });
  }
}

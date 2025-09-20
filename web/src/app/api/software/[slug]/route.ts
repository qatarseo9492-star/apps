import { NextResponse } from 'next/server';
import { sql } from '@/lib/db'; // Import your configured sql instance

// Define a type for your database row for better code safety
type Software = {
  id: string;
  slug: string;
  name: string;
  // ... add other fields from your Software table
};

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    // CORRECTED USAGE:
    // Await the sql template tag directly.
    // Use <Software[]> to tell TypeScript what kind of data to expect.
    const result = await sql<Software[]>`SELECT * FROM "Software" WHERE slug = ${params.slug} LIMIT 1`;

    // The result is an array of rows, so check its length.
    if (result.length === 0) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    // Return the first item from the result array.
    return NextResponse.json({ ok: true, item: result[0] });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

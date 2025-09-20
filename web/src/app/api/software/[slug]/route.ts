import { NextResponse } from 'next/server';
import { sql } from '@/lib/db'; // Import the sql instance

// Define a type for the software row for better type safety
type Software = {
  id: string;
  slug: string;
  name: string;
  // Add other fields from your database schema as needed
};

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    // Correct usage: Call the `sql` template tag directly.
    // It returns a promise that resolves with the query result.
    const result = await sql<Software[]>`SELECT * FROM "Software" WHERE slug = ${params.slug} LIMIT 1`;

    if (result.length === 0) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    // The result is the array of rows directly
    return NextResponse.json({ ok: true, item: result[0] });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

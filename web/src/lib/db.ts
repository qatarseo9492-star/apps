import { neon } from '@neondatabase/serverless';

// This function creates a new neon sql instance.
// The DATABASE_URL is automatically read from the .env file by Next.js.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const sql = neon(process.env.DATABASE_URL);

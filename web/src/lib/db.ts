import { neon } from '@neondatabase/serverless';

// Ensure the environment variable is set before creating a connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create and export the 'sql' instance for querying
export const sql = neon(process.env.DATABASE_URL);

// In a real application, this file would contain functions that use `fetch`
// to communicate with your backend API or Next.js API routes.

const API_BASE_URL = '/api'; // Assuming your API routes are under /api

// Placeholder for the Software type from Prisma
interface Software {
  id: string;
  slug: string;
  name: string;
  version: string;
  lastUpdatedAt: string;
}

/**
 * Fetches a list of all software from the backend.
 */
export async function getSoftwareList(): Promise<Software[]> {
  console.log('Fetching software list...');
  // In a real app:
  // const response = await fetch(`${API_BASE_URL}/software`);
  // if (!response.ok) throw new Error('Failed to fetch software list');
  // return response.json();

  // For now, return mock data
  return [
    { id: '1', name: 'Wondershare Filmora', slug: 'wondershare-filmora', version: '14.0.11.9772', lastUpdatedAt: new Date().toISOString() },
    { id: '2', name: 'CapCut', slug: 'capcut', version: '3.5.0', lastUpdatedAt: new Date().toISOString() },
  ];
}

/**
 * Creates a new software entry.
 */
export async function createSoftware(data: Omit<Software, 'id' | 'lastUpdatedAt'>): Promise<Software> {
  console.log('Creating software:', data);
  // In a real app:
  // const response = await fetch(`${API_BASE_URL}/software`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error('Failed to create software');
  // return response.json();

  // For now, return mock data
  return { id: 'new-id', ...data, lastUpdatedAt: new Date().toISOString() };
}

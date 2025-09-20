type HttpMethod = "GET"|"POST"|"PUT"|"PATCH"|"DELETE";

const ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
).replace(/\/$/, '');

function toAbs(p: string){
  try { return new URL(p).toString(); }
  catch { return new URL(p, ORIGIN).toString(); }
}
async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} — ${await res.text().catch(()=> '')}`);
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? await res.json() as T : (await res.text()) as unknown as T;
}

export async function apiJSON<T>(path: string, init?: RequestInit): Promise<T>;
export async function apiJSON<T>(path: string, method: HttpMethod, payload?: unknown): Promise<T>;
export async function apiJSON<T>(path: string, arg2?: any, payload?: unknown): Promise<T> {
  const url = toAbs(path);
  if (typeof arg2 === 'string') {
    const res = await fetch(url, {
      method: arg2,
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: payload === undefined ? undefined : JSON.stringify(payload),
    });
    return handle<T>(res);
  }
  const res = await fetch(url, { cache: 'no-store', ...(arg2 || {}) });
  return handle<T>(res);
}

export const apiGet  = <T=any>(path: string, init?: RequestInit) =>
  apiJSON<T>(path, { ...(init || {}) });

export const apiPost = <T=any>(path: string, data?: unknown, init?: RequestInit) =>
  apiJSON<T>(path, { ...(init || {}), method: 'POST', headers: { 'Content-Type':'application/json', ...(init?.headers||{}) }, body: data===undefined?undefined:JSON.stringify(data) });

export const apiPut  = <T=any>(path: string, data?: unknown, init?: RequestInit) =>
  apiJSON<T>(path, { ...(init || {}), method: 'PUT',  headers: { 'Content-Type':'application/json', ...(init?.headers||{}) }, body: data===undefined?undefined:JSON.stringify(data) });

export const apiDelete = <T=any>(path: string, init?: RequestInit) =>
  apiJSON<T>(path, { ...(init || {}), method: 'DELETE' });

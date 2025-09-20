export function siteTitle(...parts: (string | undefined)[]) {
  const base = 'SoftHub';
  const filtered = parts.filter(Boolean) as string[];
  return filtered.length ? `${filtered.join(' · ')} — ${base}` : base;
}

export function siteDescription(fallback?: string) {
  return fallback || 'Trending, newly updated, and top software by OS, license, and category.';
}

export function canonical(pathname: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${base}${pathname}`;
}

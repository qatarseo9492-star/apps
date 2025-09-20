export function siteTitle(...parts: (string | undefined)[]) {
  const base = 'SoftHub';
  const filtered = parts.filter(Boolean) as string[];
  retur

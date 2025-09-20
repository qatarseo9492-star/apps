export function OSBadge({ os }: { os: string }) {
  return <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{os}</span>;
}

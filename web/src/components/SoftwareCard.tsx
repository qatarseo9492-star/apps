import Link from 'next/link';
import Image from 'next/image';
import { Rating } from './Rating';
import { OSBadge } from './OSBadge';

export function SoftwareCard({ s }: { s: any }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-sm transition">
      <div className="flex gap-3">
        {s.iconUrl && (
          <Image src={s.iconUrl} alt={s.name} width={64} height={64} className="rounded" />
        )}
        <div className="flex-1 min-w-0">
          <Link href={`/software/${s.slug}`} className="font-semibold hover:underline line-clamp-1">{s.name}</Link>
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
            {s.currentVersion?.version && <span>v{s.currentVersion.version}</span>}
            <span>·</span>
            <Rating value={s.ratingsAvg || 5} />
            {s.currentVersion?.os && <><span>·</span><OSBadge os={s.currentVersion.os} /></>}
          </div>
          <p className="text-sm mt-2 line-clamp-2">{s.shortDesc}</p>
        </div>
      </div>
    </div>
  );
}

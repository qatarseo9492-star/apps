import Link from 'next/link';

const NAV = [
  { href: '/category/windows-tools', label: 'Windows' },
  { href: '/category/macos', label: 'macOS' },
  { href: '/category/android', label: 'Android' },
  { href: '/category/pc-games', label: 'PC Games' },
  { href: '/category/e-learning', label: 'E-learning' },
  { href: '/help/how-to-download', label: 'How to Download' },
  { href: '/help/faqs', label: 'FAQs' }
];

export function Nav() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-bold text-xl">SoftHub</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {NAV.map((i) => (
            <Link key={i.href} href={i.href} className="hover:text-brand-accent">{i.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

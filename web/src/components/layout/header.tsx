import Link from 'next/link';
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-brand-secondary/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-bold text-white">
          LOGO
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/category/windows" className="hover:text-brand-accent transition-colors">Windows</Link>
          <Link href="/category/macos" className="hover:text-brand-accent transition-colors">Mac</Link>
          <Link href="/category/pc-games" className="hover:text-brand-accent transition-colors">PC Games</Link>
          <Link href="/category/android-games" className="hover:text-brand-accent transition-colors">Android Games</Link>
        </div>
        <div className="flex items-center border border-gray-600 rounded-full px-3 py-1">
          <input 
            type="text" 
            placeholder="Search Here" 
            className="bg-transparent focus:outline-none text-sm" 
          />
          <button className="text-gray-400 hover:text-white">
            <Search size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}

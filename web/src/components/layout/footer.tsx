import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-secondary border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">LOGO</h3>
          <p className="text-gray-400 text-sm">
            Your source for safe and verified software downloads.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about-us" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link href="/contact-us" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms and Conditions</Link></li>
            <li><Link href="/faqs" className="text-gray-400 hover:text-white">FAQS</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/category/windows" className="text-gray-400 hover:text-white">Windows</Link></li>
            <li><Link href="/category/macos" className="text-gray-400 hover:text-white">Mac</Link></li>
            <li><Link href="/category/pc-games" className="text-gray-400 hover:text-white">PC Game</Link></li>
            <li><Link href="/category/android" className="text-gray-400 hover:text-white">Android Game</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Company Info</h3>
          <p className="text-gray-400 text-sm">
            113 Alexander Drive, <br />
            4852 Mission Beach, Australia <br />
            hi@tranquility.com.au
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4">
        <p className="text-center text-xs text-gray-500">
          © 2025 Copyright - loren ipsum.id
        </p>
      </div>
    </footer>
  );
}

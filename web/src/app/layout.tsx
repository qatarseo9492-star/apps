import './globals.css';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'SoftHub',
  description: 'Trending, newly updated, and top software by OS, license, and category.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', title: 'SoftHub', url: '/', siteName: 'SoftHub' },
  twitter: { card: 'summary_large_image' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

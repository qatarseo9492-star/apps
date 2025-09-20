import { Metadata } from 'next';
import Image from 'next/image';
import { Download, HardDrive, KeyRound, Info } from 'lucide-react';
import { SoftwareTabs } from './_components/software-tabs';

// This is a placeholder for your actual data fetching logic.
// In a real app, this would fetch from your DB/API based on the slug.
async function getSoftwareBySlug(slug: string) {
    if (slug === 'wondershare-filmora') {
        return {
            name: 'Wondershare Filmora',
            version: '14.0.11.9772',
            updatedAgo: '2 years ago',
            fileSize: '761 MB',
            password: '1234',
            overview: `Video Editing Simplified-Ignite Your Story. A powerful and intuitive video editing experience. Filmora has two new ways to edit: Action Cam Tool (Correct lens distortion, Clean up your audio, New speed controls) and Instant Cutter (Trim or merge clips quickly, instant export).`,
            features: [
                'Motion Tracking: Attach an element to a moving object.',
                'Keyframing: Customize animation by adding keyframes.',
                'Color Match: Match the color of selected clips to another frame.',
                'Audio Ducking: Quickly fade your music so your dialogue stands out.',
            ],
            systemRequirements: {
                windows: {
                    supportedOS: 'Windows 11 / Windows 10 / Windows 8.1 / Windows 7',
                    processor: 'Multicore Intel i-Series or above, Xeon or AMD equivalent',
                    ram: '4GB (8GB or more recommended)',
                    diskSpace: '4GB or more recommended',
                }
            }
        };
    }
    return null; // Handle not found case
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const software = await getSoftwareBySlug(params.slug);
  if (!software) return { title: 'Not Found' };
  
  return {
    title: `${software.name} ${software.version} - Free Download`,
    description: software.overview.substring(0, 160),
    openGraph: {
      title: `${software.name} ${software.version}`,
      description: software.overview.substring(0, 160),
      images: ['/og-image.png'], // Add a dynamic image later
    },
  };
}

// Page Component
export default async function SoftwareDetailPage({ params }: { params: { slug: string } }) {
  // ISR configuration: revalidate this page every 6 hours
  // const software = await fetch(`.../api/software/${params.slug}`, { next: { revalidate: 21600 } }).then(res => res.json());
  const software = await getSoftwareBySlug(params.slug);

  if (!software) {
    return <div>Software not found.</div>;
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-brand-secondary rounded-lg p-8 grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2">
            <p className="text-sm text-gray-400 mb-2">Home &gt; Video Editor &gt; {software.name}</p>
            <h1 className="text-4xl font-bold">{software.name} {software.version}</h1>
            <p className="text-gray-400 mt-2">{software.updatedAgo} | 5.0 Stars</p>
            <div className="mt-8 flex flex-col md:flex-row gap-4">
                <button className="bg-brand-accent hover:bg-sky-400 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 text-lg">
                    <Download size={24} />
                    Download Now
                </button>
                 <div className="flex items-center gap-6 text-center">
                    <div className="flex items-center gap-2">
                        <HardDrive size={20} className="text-gray-400" />
                        <span>{software.fileSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <KeyRound size={20} className="text-gray-400" />
                        <span>Password: {software.password}</span>
                    </div>
                 </div>
            </div>
        </div>
        <div className="hidden md:block">
            {/* Placeholder for a featured image or ad */}
                        <Image src="https://placehold.co/300x200/0f172a/38bdf8?text=Project+Sharing" alt="Filmora Feature" width={300} height={200} className="rounded-lg mx-auto" />
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section>
        <SoftwareTabs software={software} />
      </section>

      {/* You can add sections for Related Products, Reviews etc. here */}
    </div>
  );
}

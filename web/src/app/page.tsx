import { SoftwareCard } from "@/components/software-card";
import { Suspense } from "react";

// In a real app, this data would come from your database via an API call
const popularApps = [
  { id: '1', name: 'Wondershare Filmora', version: '14.0.11.9772', category: 'Video Editor', slug: 'wondershare-filmora', iconUrl: 'https://placehold.co/100x100/38bdf8/white?text=F' },
  { id: '2', name: 'CapCut', version: '3.5.0', category: 'Video Editor', slug: 'capcut', iconUrl: 'https://placehold.co/100x100/38bdf8/white?text=C' },
  { id: '3', name: 'Adobe Photoshop', version: '25.9.1', category: 'Photo Editor', slug: 'adobe-photoshop', iconUrl: 'https://placehold.co/100x100/38bdf8/white?text=Ps' },
  { id: '4', name: 'Lightroom Photo', version: '7.3', category: 'Photo Editor', slug: 'lightroom-photo', iconUrl: 'https://placehold.co/100x100/38bdf8/white?text=Lr' },
];
const recentlyReleased = [
    { id: '5', name: 'Driver Easy Pro', version: '6.1.1.29', category: 'Utility', slug: 'driver-easy-pro', size: '761 MB', description: 'Video Editing Simplified - Ignite Your Story. A powerful and intuitive video editing experience.', iconUrl: 'https://placehold.co/100x100/22c55e/white?text=D' },
    { id: '6', name: 'Another App', version: '1.2.3', category: 'Productivity', slug: 'another-app', size: '123 MB', description: 'A great app for doing things more productively and getting work done faster.', iconUrl: 'https://placehold.co/100x100/22c55e/white?text=A' },
];


export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      
      <section>
        <h2 className="text-3xl font-bold mb-6">Popular Apps</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <Suspense fallback={<p>Loading popular apps...</p>}>
            {popularApps.map(app => (
              <SoftwareCard key={app.id} {...app} />
            ))}
          </Suspense>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Recently Released</h2>
        <div className="space-y-4">
           <Suspense fallback={<p>Loading recent apps...</p>}>
            {recentlyReleased.map(app => (
              <RecentlyReleasedCard key={app.id} {...app} />
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function HeroSection() {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-extrabold mb-4">Download Your Desired App In Free</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                The ultimate destination for the latest software, games, and applications. Safe, secure, and always up-to-date.
            </p>
            <div className="relative max-w-xl mx-auto">
                <input type="search" placeholder="Search Here..." className="w-full bg-brand-secondary border border-gray-700 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-accent text-white font-semibold rounded-full px-6 py-2">
                    Search
                </button>
            </div>
        </div>
    );
}

// A specific card for the "Recently Released" section as per the mockup
function RecentlyReleasedCard(props: { name: string, version: string, category: string, slug: string, size: string, description: string, iconUrl: string }) {
    return (
        <div className="bg-brand-secondary p-4 rounded-lg flex items-center gap-4 hover:bg-slate-800 transition-colors">
            <img src={props.iconUrl} alt={`${props.name} icon`} className="w-16 h-16 rounded-md" />
            <div className="flex-grow">
                <h3 className="font-bold text-lg">{props.name} {props.version}</h3>
                <p className="text-sm text-gray-400">{props.category} - 2 years ago</p>
                <p className="text-sm mt-1">{props.description}</p>
            </div>
            <a href={`/software/${props.slug}`} className="bg-brand-green text-center text-white font-bold rounded-md px-4 py-6">
                {props.size}
                <span className="block text-xs font-normal">Download</span>
            </a>
        </div>
    );
}

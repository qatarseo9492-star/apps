/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co', // Placeholder images
            },
            // Add your actual CDN hostname here later
        ],
    },
};

export default nextConfig;

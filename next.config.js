/**
 * next.config.js — MODIFIED
 * Added Cache-Control: must-revalidate for /assets/ so freshly added
 * logo or campus images show immediately after Vercel redeploy.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      // MODIFIED: No-cache for all assets — new files appear on every deploy
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      // Security (unchanged)
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

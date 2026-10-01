/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't let `next dev` write AGENTS.md / CLAUDE.md into the repo.
  agentRules: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

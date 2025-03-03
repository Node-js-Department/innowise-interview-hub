
(
  async () => {
    const dotenv = await import('dotenv');
    dotenv.config({ path: '../../.env' });
  }
)();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
};

module.exports = nextConfig;

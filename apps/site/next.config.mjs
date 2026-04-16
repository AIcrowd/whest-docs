import path from 'node:path';

const nextConfig = {
  output: 'export',
  basePath: '/whest-docs',
  assetPrefix: '/whest-docs/',
  experimental: {
    externalDir: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
};

export default nextConfig;

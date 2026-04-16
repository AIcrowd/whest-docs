import fs from 'node:fs/promises';
import path from 'node:path';

import { loadSourceManifest } from '../lib/load-source-manifest.mjs';
import { resolveProductSource } from '../lib/resolve-product-source.mjs';
import { getWhestProduct } from '../lib/products/whest.mjs';
import { getWhestBenchProduct } from '../lib/products/whestbench.mjs';

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const generatedRoot = path.join(repoRoot, '.generated');
const sourcesRoot = path.join(repoRoot, '.sources');

const adapters = {
  whest: getWhestProduct,
  whestbench: getWhestBenchProduct,
};

const manifest = await loadSourceManifest();
const contentIndex = {};

for (const [productId, config] of Object.entries(manifest.products)) {
  const localPath = process.env[`${productId.toUpperCase()}_PATH`];
  const source = await resolveProductSource({
    productId,
    ...config,
    localPath,
    sourcesRoot,
  });
  const product = adapters[productId]();

  contentIndex[productId] = {
    ...product,
    sourceMode: source.mode,
    checkoutPath: source.checkoutPath,
    absoluteContentRoot: path.join(source.checkoutPath, product.contentRoot),
    absoluteAssetsRoot: path.join(source.checkoutPath, product.assetsRoot),
  };
}

await fs.mkdir(generatedRoot, { recursive: true });
await fs.writeFile(
  path.join(generatedRoot, 'content-index.json'),
  `${JSON.stringify(contentIndex, null, 2)}\n`,
  'utf8',
);

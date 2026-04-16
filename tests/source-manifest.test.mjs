import test from 'node:test';
import assert from 'node:assert/strict';

import { loadSourceManifest } from '../lib/load-source-manifest.mjs';

test('source manifest defaults both products to main refs', async () => {
  const manifest = await loadSourceManifest();

  assert.equal(manifest.products.whest.repo, 'AIcrowd/whest');
  assert.equal(manifest.products.whest.ref, 'main');
  assert.equal(manifest.products.whest.routeBase, '/whest');

  assert.equal(manifest.products.whestbench.repo, 'AIcrowd/whestbench');
  assert.equal(manifest.products.whestbench.ref, 'main');
  assert.equal(manifest.products.whestbench.routeBase, '/whestbench');
});

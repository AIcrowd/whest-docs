import test from 'node:test';
import assert from 'node:assert/strict';

import { getWhestProduct } from '../lib/products/whest.mjs';
import { getWhestBenchProduct } from '../lib/products/whestbench.mjs';

test('whest adapter targets the current website docs content without replacing production GH Pages', () => {
  const product = getWhestProduct();

  assert.equal(product.id, 'whest');
  assert.equal(product.routeBase, '/whest');
  assert.equal(product.contentRoot, 'website/content/docs');
  assert.equal(product.assetsRoot, 'website/public');
});

test('whestbench adapter targets the repo-local markdown docs tree', () => {
  const product = getWhestBenchProduct();

  assert.equal(product.id, 'whestbench');
  assert.equal(product.routeBase, '/whestbench');
  assert.equal(product.contentRoot, 'docs');
  assert.equal(product.assetsRoot, 'assets');
});

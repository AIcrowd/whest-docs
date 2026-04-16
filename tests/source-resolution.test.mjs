import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';

import { resolveProductSource } from '../lib/resolve-product-source.mjs';

test('resolveProductSource prefers an explicit local override path', async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'whest-docs-source-'));
  const localSource = path.join(tempRoot, 'whest-local');
  const remoteCache = path.join(tempRoot, '.sources');

  await fs.mkdir(localSource, { recursive: true });

  const resolved = await resolveProductSource({
    productId: 'whest',
    repo: 'AIcrowd/whest',
    ref: 'main',
    routeBase: '/whest',
    localPath: localSource,
    sourcesRoot: remoteCache,
  });

  assert.equal(resolved.mode, 'local');
  assert.equal(resolved.checkoutPath, localSource);
});

test('resolveProductSource falls back to a cached checkout path', async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'whest-docs-source-'));
  const remoteCache = path.join(tempRoot, '.sources');
  const checkoutPath = path.join(remoteCache, 'whest');

  await fs.mkdir(checkoutPath, { recursive: true });

  const resolved = await resolveProductSource({
    productId: 'whest',
    repo: 'AIcrowd/whest',
    ref: 'main',
    routeBase: '/whest',
    sourcesRoot: remoteCache,
  });

  assert.equal(resolved.mode, 'cached');
  assert.equal(resolved.checkoutPath, checkoutPath);
});

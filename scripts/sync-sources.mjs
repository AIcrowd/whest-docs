import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';

import { loadSourceManifest } from '../lib/load-source-manifest.mjs';
import { resolveProductSource } from '../lib/resolve-product-source.mjs';
import { getRemoteUrl } from '../lib/source-remote-url.mjs';

const execFile = promisify(execFileCallback);
const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const sourcesRoot = path.join(repoRoot, '.sources');

function localOverrideEnv(productId) {
  return `${productId.toUpperCase()}_PATH`;
}

async function ensureCheckout(productId, config) {
  const localPath = process.env[localOverrideEnv(productId)];
  const resolved = await resolveProductSource({
    productId,
    ...config,
    localPath,
    sourcesRoot,
  });

  if (resolved.mode === 'local') {
    return resolved;
  }

  await fs.mkdir(sourcesRoot, { recursive: true });

  if (resolved.mode === 'missing') {
    await execFile('git', [
      'clone',
      '--depth',
      '1',
      '--branch',
      config.ref,
      getRemoteUrl(config.repo),
      resolved.checkoutPath,
    ]);

    return {
      ...resolved,
      mode: 'cached',
    };
  }

  await execFile('git', ['-C', resolved.checkoutPath, 'fetch', 'origin', config.ref, '--depth', '1']);
  await execFile('git', ['-C', resolved.checkoutPath, 'checkout', '--force', 'FETCH_HEAD']);

  return resolved;
}

const manifest = await loadSourceManifest();

for (const [productId, config] of Object.entries(manifest.products)) {
  const resolved = await ensureCheckout(productId, config);
  console.log(`${productId}: ${resolved.mode} -> ${resolved.checkoutPath}`);
}

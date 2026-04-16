import fs from 'node:fs/promises';
import path from 'node:path';

export async function resolveProductSource({
  productId,
  repo,
  ref,
  routeBase,
  localPath,
  sourcesRoot = path.resolve('.sources'),
}) {
  if (localPath) {
    return {
      productId,
      repo,
      ref,
      routeBase,
      mode: 'local',
      checkoutPath: localPath,
    };
  }

  const checkoutPath = path.join(sourcesRoot, productId);

  try {
    const stats = await fs.stat(checkoutPath);
    if (stats.isDirectory()) {
      return {
        productId,
        repo,
        ref,
        routeBase,
        mode: 'cached',
        checkoutPath,
      };
    }
  } catch {
    return {
      productId,
      repo,
      ref,
      routeBase,
      mode: 'missing',
      checkoutPath,
    };
  }

  return {
    productId,
    repo,
    ref,
    routeBase,
    mode: 'missing',
    checkoutPath,
  };
}

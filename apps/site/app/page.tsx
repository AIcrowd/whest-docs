import path from 'node:path';
import { loadSourceManifest } from '../../../lib/load-source-manifest.mjs';
import { resolveProductSource } from '../../../lib/resolve-product-source.mjs';

const sourcesRoot = process.env.WHEST_DOCS_SOURCES_ROOT ?? path.resolve(process.cwd(), '../../.sources');
type ProductConfig = {
  repo: string;
  ref: string;
  routeBase: string;
};

export default async function HomePage() {
  const manifest = await loadSourceManifest();
  const productConfigs = manifest.products as Record<string, ProductConfig>;
  const products = await Promise.all(
    Object.entries(productConfigs).map(async ([productId, config]) => {
      const localPath = process.env[`${productId.toUpperCase()}_PATH`];
      const resolved = await resolveProductSource({
        productId,
        ...config,
        localPath,
        sourcesRoot,
      });

      return {
        ...config,
        ...resolved,
      };
    }),
  );

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Phase 1 additive rollout</p>
        <h1>whest-docs</h1>
        <p className="lede">
          This repository owns the shared docs shell for <code>whest</code> and <code>whestbench</code>. The
          current production <code>whest</code> GitHub Pages docs remain unchanged.
        </p>
      </section>

      <section className="grid">
        {products.map((product) => (
          <article key={product.productId} className="card">
            <h2>{product.productId}</h2>
            <dl>
              <dt>Repo</dt>
              <dd>{product.repo}</dd>
              <dt>Ref</dt>
              <dd>{product.ref}</dd>
              <dt>Route base</dt>
              <dd>{product.routeBase}</dd>
              <dt>Source mode</dt>
              <dd>{product.mode}</dd>
              <dt>Checkout path</dt>
              <dd className="path">{product.checkoutPath}</dd>
            </dl>
          </article>
        ))}
      </section>
    </main>
  );
}

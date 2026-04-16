import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = '/Users/mohanty/.codex/worktrees/pages1/whest-docs';

test('Next config exports static site output for GitHub Pages under /whest-docs', () => {
  const source = fs.readFileSync(path.join(repoRoot, 'apps', 'site', 'next.config.mjs'), 'utf8');

  assert.match(source, /output:\s*'export'/);
  assert.match(source, /basePath:\s*'\/*whest-docs'/);
  assert.match(source, /assetPrefix:\s*'\/*whest-docs\//);
  assert.match(source, /unoptimized:\s*true/);
});

test('Pages workflow uploads and deploys the static out directory', () => {
  const source = fs.readFileSync(
    path.join(repoRoot, '.github', 'workflows', 'sync-and-build.yml'),
    'utf8',
  );

  assert.match(source, /push:\s*\n\s*branches:\s*\[main\]/);
  assert.match(source, /actions\/configure-pages@v5/);
  assert.match(source, /actions\/upload-pages-artifact@v3/);
  assert.match(source, /actions\/deploy-pages@v4/);
  assert.match(source, /path:\s*\.\/apps\/site\/out/);
});

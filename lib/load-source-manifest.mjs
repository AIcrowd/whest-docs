import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export async function loadSourceManifest() {
  const manifestPath = path.join(repoRoot, 'config', 'sources.json');
  const raw = await fs.readFile(manifestPath, 'utf8');
  return JSON.parse(raw);
}

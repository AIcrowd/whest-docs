import test from 'node:test';
import assert from 'node:assert/strict';

import { getRemoteUrl } from '../lib/source-remote-url.mjs';

test('getRemoteUrl uses public https github remotes for source checkouts', () => {
  assert.equal(getRemoteUrl('AIcrowd/whest'), 'https://github.com/AIcrowd/whest.git');
  assert.equal(getRemoteUrl('AIcrowd/whestbench'), 'https://github.com/AIcrowd/whestbench.git');
});

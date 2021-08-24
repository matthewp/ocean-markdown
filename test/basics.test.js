import './shim.js';
import { assert, Ocean } from './deps.js';
import { OceanMarkdown } from '../lib/mod.js';
import { consume, parse } from './helpers.js';

Deno.test('Renders markdown', async () => {
  let ocean = new Ocean({ document });
  let { md } = new OceanMarkdown(ocean);
  let iter = md`
    # Title

    More stuff

    1. List One
    2. List Two
  `;
  let out = await consume(iter);
  let doc = parse(out);
  assert(doc.querySelector('ol li'), 'got lis');
});

Deno.test('Can interpolate values', async () => {
  let ocean = new Ocean({ document });
  let { md } = new OceanMarkdown(ocean);
  let iter = md`
    # Title

    [value ${'one'}](/path)
  `;
  let out = await consume(iter);
  let doc = parse(out);
  let anchor = doc.querySelector('a[href="/path"]');
  assert(anchor);
});
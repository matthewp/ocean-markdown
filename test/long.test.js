import './shim.js';
import { assert, Ocean } from './deps.js';
import { OceanMarkdown } from '../lib/mod.js';
import { consume, parse } from './helpers.js';

Deno.test('Very long markdown page', async () => {
  let ocean = new Ocean({ document });
  let { md } = new OceanMarkdown(ocean);
  let fileURL = new URL('./fixtures/ocean.md', import.meta.url);
  let mdStr = await Deno.readTextFile(fileURL);
  let strings = [mdStr];
  strings.raw = strings;
  let iter = md(strings);
  await consume(iter);
});
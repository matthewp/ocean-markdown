# Ocean Markdown

Brings Markdown syntax to [Ocean](https://github.com/matthewp/ocean).

```js
import 'https://cdn.spooky.click/ocean/1.2.0/shim.js?global';
import { Ocean } from 'https://cdn.spooky.click/ocean/1.2.0/mod.js';
import { OceanMarkdown } from 'https://cdn.spooky.click/ocean-markdown/0.0.1/mod.js';

let ocean = new Ocean({ document });
let { md } = new OceanMarkdown(ocean);

let iter = md`
  # Some title

  1. List item
  2. Another list item
`;

let out = '';
for await(let chunk of iter) {
  out +=  chunk;
}
console.log(out); // prints the HTML
```
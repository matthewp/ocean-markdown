import { outdent, parseMarkdown } from './deps.js';

const prefix = 'öcean';
const commentPlaceholder = `<!--${prefix}-->`;

export class OceanMarkdown {
  constructor(ocean) {
    this.ocean = ocean;
    this.mdCache = new WeakMap();
    this.md = this.md.bind(this);
  }

  md(strings, ...values) {
    if(this.mdCache.has(strings)) {
      let htmlStrings = this.mdCache.get(strings);
      return this.ocean.html(htmlStrings, ...values);
    } else {
      let replacedValues = Array.from({ length: values.length }, _ => commentPlaceholder);
      let rawMD = outdent(strings, ...replacedValues);
      let rawHTML = parseMarkdown(rawMD);
      let htmlStrings = rawHTML.split(commentPlaceholder);
      htmlStrings.raw = htmlStrings;
      Object.freeze(htmlStrings);
      this.mdCache.set(strings, htmlStrings);
      return this.ocean.html(htmlStrings, ...values);
    }
  }
}
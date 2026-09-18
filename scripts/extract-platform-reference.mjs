import { readFile, writeFile } from 'node:fs/promises';

const referencePath = '/Users/zhangmingchun/Downloads/project2_full_optimized_v14/index.html';
const outputPath = new URL('../src/data/platformReference.js', import.meta.url);
const source = await readFile(referencePath, 'utf8');

function readCallArguments(start) {
  let depth = 1;
  let quote = '';
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
    } else if (char === '(') {
      depth += 1;
    } else if (char === ')') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index);
    }
  }
  throw new Error('Unclosed makeMeta call in reference HTML');
}

function localize(value) {
  if (Array.isArray(value)) return value.map(localize);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, localize(entry)]));
  if (typeof value !== 'string') return value;
  const match = value.match(/images\.unsplash\.com\/photo-([\w-]+)/);
  return match ? `/reference-images/${match[1]}.jpg` : value;
}

const pages = {};
const matcher = /if\(raw==='platform\/([^']+)'\)return this\.makeMeta\(/g;
for (const match of source.matchAll(matcher)) {
  const args = readCallArguments(match.index + match[0].length);
  const [key, title, description, parent, backHref, short, action, anchors, sections, ctaTitle, ctaText] = Function(`"use strict"; return [${args}];`)();
  pages[match[1]] = localize({ key, title, description, parent, backHref, short, action, anchors, sections, ctaTitle, ctaText });
}

if (Object.keys(pages).length !== 16) throw new Error(`Expected 16 platform pages, found ${Object.keys(pages).length}`);
await writeFile(outputPath, `// Generated from the supplied HTML reference. Do not edit by hand.\nexport default ${JSON.stringify(pages, null, 2)};\n`);
console.log(`Extracted ${Object.keys(pages).length} platform pages.`);

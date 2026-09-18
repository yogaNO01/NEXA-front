import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const referencePath = '/Users/zhangmingchun/Downloads/project2_full_optimized_v14/index.html';
const outputDir = path.resolve('public/reference-images');
const html = await readFile(referencePath, 'utf8');
const urls = [...new Set(html.match(/https:\/\/images\.unsplash\.com\/photo-[^'"\\s)]+/g) || [])];
const photos = new Map();
const replacements = new Map([
  // The reference campus-detail URL returns Unsplash 404. Reuse its working
  // campus photo so the rendered detail and scene cards retain their intended crop.
  ['1523050854058-8df90110c9f1', '1564981797816-1043664bf78d'],
]);

for (const url of urls) {
  const id = new URL(url).pathname.replace(/^\/photo-/, '');
  if (replacements.has(id)) continue;
  photos.set(id, url);
}

await mkdir(outputDir, { recursive: true });
const failures = [];

for (const [id, source] of photos) {
  const target = path.join(outputDir, `${id}.jpg`);
  try {
    const existing = await stat(target).catch(() => null);
    if (existing?.size > 1024) continue;
    const response = await fetch(source);
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.startsWith('image/')) {
      throw new Error(`HTTP ${response.status}; content-type ${contentType || 'missing'}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength <= 1024) throw new Error(`unexpectedly small payload (${bytes.byteLength} bytes)`);
    await writeFile(target, bytes);
  } catch (error) {
    failures.push(`${id}: ${error.message}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verified ${photos.size} local image files in ${outputDir}`);
}

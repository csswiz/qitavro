/**
 * QITAVRO Image Optimization Script
 * Converts book covers and hero image to WebP
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, copyFile, unlink } from 'fs/promises';
import { join, basename, extname } from 'path';

const PUBLIC = 'public';

// Book covers → WebP (quality 82, 2:3 aspect ratio preserved)
const BOOK_COVERS = [
  'images/books/she-left-but-stayed-inside-me.jpg',
  'images/books/the-art-of-letting-go.jpg',
  'images/books/darling-in-reds.jpg',
  'images/books/possess-me-break-me.jpg',
];

// Hero → WebP (quality 80, eager load)
const HERO = 'images/hero/hero-library-aisle.jpg';

async function optimizeImage(relPath, quality = 82) {
  const src = join(PUBLIC, relPath);
  const name = basename(relPath, extname(relPath));
  const dir = join(PUBLIC, relPath.replace(basename(relPath), ''));
  const outWebp = join(dir, `${name}.webp`);

  const info = await stat(src);
  const original = info.size;

  await sharp(src)
    .webp({ quality, effort: 6 })
    .toFile(outWebp);

  const webpInfo = await stat(outWebp);
  console.log(
    `  ${relPath}: ${(original / 1024).toFixed(1)} KB → ${(webpInfo.size / 1024).toFixed(1)} KB WebP (${Math.round((1 - webpInfo.size / original) * 100)}% saved)`
  );
}

async function main() {
  console.log('Converting book covers to WebP...');
  for (const cover of BOOK_COVERS) {
    await optimizeImage(cover, 82);
  }

  console.log('\nConverting hero image to WebP...');
  await optimizeImage(HERO, 80);

  console.log('\nDone! Original JPEGs kept as fallbacks.');
}

main().catch(console.error);

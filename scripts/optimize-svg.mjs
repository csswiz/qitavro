/**
 * QITAVRO SVG Logo Optimization
 * Run: node scripts/optimize-svg.mjs
 */
import { readFileSync, writeFileSync, statSync, copyFileSync } from 'fs';
import { optimize } from 'svgo';

const FILES = ['public/logo.svg', 'public/favicon.svg'];

const svgoConfig = {
  multipass: true,
  plugins: [
    { name: 'preset-default', params: {
      overrides: {
        removeViewBox: false,
        cleanupIds: { minify: true },
        convertPathData: { floatPrecision: 1, transformPrecision: 2 },
        mergePaths: { force: true },
        convertTransform: { floatPrecision: 2 },
        cleanupNumericValues: { floatPrecision: 1 },
        collapseGroups: true,
        removeUselessStrokeAndFill: true,
        removeEmptyContainers: true,
        removeEmptyAttrs: true,
        removeUnusedNS: true,
      }
    }},
    'removeXMLNS',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeEditorsNSData',
    { name: 'removeAttrs', params: { attrs: ['data-name', 'class'] } },
  ],
};

for (const file of FILES) {
  const before = statSync(file).size;
  const svg = readFileSync(file, 'utf8');
  const result = optimize(svg, { ...svgoConfig, path: file });
  writeFileSync(file, result.data);
  const after = statSync(file).size;
  console.log(`${file}: ${(before/1024).toFixed(1)} KB → ${(after/1024).toFixed(1)} KB (${Math.round((1 - after/before)*100)}% saved)`);
}

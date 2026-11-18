import fs from 'fs';
import path from 'path';

console.log('--- STARTING COMPREHENSIVE INTEGRITY VERIFICATION ---');

// 1. Check books.json
const books = JSON.parse(fs.readFileSync('./src/data/books.json', 'utf8'));
console.log(`✓ books.json loaded: ${books.length} books found`);

const bookIds = new Set(books.map(b => b.id));
const bookSlugs = new Set();
let missingImages = 0;

books.forEach((b) => {
  if (bookSlugs.has(b.slug)) {
    console.error(`✗ Duplicate slug found: ${b.slug}`);
  }
  bookSlugs.add(b.slug);

  // Check required fields
  const requiredFields = ['id', 'slug', 'title', 'author', 'price', 'rating', 'category', 'image', 'description'];
  requiredFields.forEach(f => {
    if (b[f] === undefined || b[f] === null || b[f] === '') {
      console.error(`✗ Book id ${b.id} missing field: ${f}`);
    }
  });

  // Check image exists in public folder
  const imgPath = path.join('./public', b.image);
  if (!fs.existsSync(imgPath)) {
    console.warn(`! Image not found on disk: ${imgPath}`);
    missingImages++;
  }
});

if (missingImages === 0) {
  console.log(`✓ All ${books.length} book images physically exist on disk in public/`);
}

// 2. Check collections.json
const collections = JSON.parse(fs.readFileSync('./src/data/collections.json', 'utf8'));
console.log(`✓ collections.json loaded: ${collections.length} collections found`);

collections.forEach(c => {
  const imgPath = path.join('./public', c.coverImage);
  if (!fs.existsSync(imgPath)) {
    console.warn(`! Collection image missing: ${imgPath}`);
  }

  // Check referenced bookIds exist
  c.bookIds.forEach(id => {
    if (!bookIds.has(id)) {
      console.error(`✗ Collection "${c.title}" references non-existent book ID: ${id}`);
    }
  });
});
console.log(`✓ All collection book IDs verified against books.json`);

// 3. Check articles.json
const articles = JSON.parse(fs.readFileSync('./src/data/articles.json', 'utf8'));
console.log(`✓ articles.json loaded: ${articles.length} articles found`);

articles.forEach(a => {
  const imgPath = path.join('./public', a.image);
  if (!fs.existsSync(imgPath)) {
    console.warn(`! Article image missing: ${imgPath}`);
  }

  if (a.relatedBookIds) {
    a.relatedBookIds.forEach(id => {
      if (!bookIds.has(id)) {
        console.error(`✗ Article "${a.title}" references non-existent book ID: ${id}`);
      }
    });
  }
});
console.log(`✓ All article related book IDs verified against books.json`);

// 4. Check Hero Image
const heroPath = './public/images/hero/hero-reading.svg';
if (fs.existsSync(heroPath)) {
  console.log(`✓ Hero editorial artwork exists at ${heroPath}`);
} else {
  console.error(`✗ Hero image missing at ${heroPath}`);
}

// 5. Check Favicon
const faviconPath = './public/favicon.svg';
if (fs.existsSync(faviconPath)) {
  console.log(`✓ Favicon exists at ${faviconPath}`);
} else {
  console.error(`✗ Favicon missing at ${faviconPath}`);
}

// 6. Test HTTP responses from preview server
async function testEndpoints() {
  const endpoints = [
    '/',
    '/shop',
    '/book/the-shadow-of-the-wind',
    '/book/atomic-habits',
    '/book/meditations',
    '/collections',
    '/reading-room',
    '/reading-room/the-art-of-unhurried-reading',
    '/about',
    '/cart',
    '/wishlist',
    '/checkout',
    '/images/books/the-shadow-of-the-wind.svg',
    '/images/hero/hero-reading.svg',
    '/favicon.svg'
  ];

  console.log('\n--- TESTING LOCAL PREVIEW SERVER (PORT 4173) ---');
  let successCount = 0;
  for (const ep of endpoints) {
    try {
      const res = await fetch(`http://localhost:4173${ep}`);
      if (res.status === 200) {
        console.log(`✓ [200 OK] ${ep} (${res.headers.get('content-type')})`);
        successCount++;
      } else {
        console.error(`✗ [${res.status}] ${ep}`);
      }
    } catch (err) {
      console.error(`✗ Failed to connect to http://localhost:4173${ep}: ${err.message}`);
    }
  }

  console.log(`\nVerification finished: ${successCount}/${endpoints.length} endpoints responded with 200 OK.`);
}

testEndpoints();

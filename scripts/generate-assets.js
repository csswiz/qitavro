import fs from 'fs';
import path from 'path';

// Helper to ensure dir exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const books = JSON.parse(fs.readFileSync('./src/data/books.json', 'utf8'));
const collections = JSON.parse(fs.readFileSync('./src/data/collections.json', 'utf8'));
const articles = JSON.parse(fs.readFileSync('./src/data/articles.json', 'utf8'));

ensureDir('./public/images/books');
ensureDir('./public/images/collections');
ensureDir('./public/images/articles');
ensureDir('./public/images/hero');

// Color presets for book covers
const palettes = [
  { bg: '#421F2A', accent: '#B69A72', text: '#F6F0E8', sub: '#C7A7A2', motif: 'urn' },      // Deep Wine / Gold
  { bg: '#652E3C', accent: '#DED6CC', text: '#FFFFFF', sub: '#DAC1BD', motif: 'geometry' }, // Burgundy / Stone
  { bg: '#272321', accent: '#B69A72', text: '#F6F0E8', sub: '#B69A72', motif: 'quill' },    // Dark Charcoal / Gold
  { bg: '#2D3748', accent: '#E2E8F0', text: '#F7FAFC', sub: '#CBD5E0', motif: 'stars' },    // Deep Navy
  { bg: '#3C2E2A', accent: '#D4B483', text: '#F6F0E8', sub: '#E0C9A6', motif: 'leaf' },     // Antique Espresso
  { bg: '#1E3A34', accent: '#C8A97E', text: '#F3EFE6', sub: '#A8C3B8', motif: 'tree' },     // Forest Emerald
  { bg: '#542E38', accent: '#EED9C4', text: '#FFF8F0', sub: '#C99E98', motif: 'arch' },     // Mulberry / Ivory
  { bg: '#4A3B32', accent: '#D9C5B2', text: '#F9F6F0', sub: '#BFA89B', motif: 'compass' },  // Vintage Leather
];

function getMotifPath(motif) {
  switch (motif) {
    case 'quill':
      return `<path d="M180,240 C170,200 210,170 200,130 C190,170 230,200 220,240 Z" fill="none" stroke="currentColor" stroke-width="2"/>
              <path d="M200,140 L200,260" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3,3"/>`;
    case 'urn':
      return `<ellipse cx="200" cy="190" rx="35" ry="25" fill="none" stroke="currentColor" stroke-width="2"/>
              <path d="M180,190 L170,240 Q200,260 230,240 L220,190" fill="none" stroke="currentColor" stroke-width="2"/>
              <line x1="175" y1="165" x2="225" y2="165" stroke="currentColor" stroke-width="2"/>`;
    case 'geometry':
      return `<circle cx="200" cy="190" r="32" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <polygon points="200,162 228,208 172,208" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="200" cy="190" r="8" fill="currentColor"/>`;
    case 'stars':
      return `<circle cx="200" cy="190" r="28" fill="none" stroke="currentColor" stroke-width="1"/>
              <path d="M200,165 L203,185 L223,190 L203,195 L200,215 L197,195 L177,190 L197,185 Z" fill="currentColor"/>`;
    case 'tree':
      return `<path d="M200,155 L220,185 L210,185 L225,215 L175,215 L190,185 L180,185 Z" fill="none" stroke="currentColor" stroke-width="2"/>
              <line x1="200" y1="215" x2="200" y2="240" stroke="currentColor" stroke-width="2.5"/>`;
    case 'arch':
      return `<path d="M175,240 L175,190 A25,25 0 0,1 225,190 L225,240" fill="none" stroke="currentColor" stroke-width="2"/>
              <circle cx="200" cy="175" r="4" fill="currentColor"/>`;
    default:
      return `<circle cx="200" cy="190" r="26" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <line x1="170" y1="190" x2="230" y2="190" stroke="currentColor" stroke-width="1"/>
              <line x1="200" y1="160" x2="200" y2="220" stroke="currentColor" stroke-width="1"/>`;
  }
}

// Generate Book Cover SVGs
books.forEach((b, idx) => {
  const pal = palettes[idx % palettes.length];
  const motifSvg = getMotifPath(pal.motif);
  
  // Format title if long
  const titleWords = b.title.split(' ');
  let titleLines = [];
  let cur = '';
  titleWords.forEach(w => {
    if ((cur + ' ' + w).length > 16) {
      titleLines.push(cur.trim());
      cur = w;
    } else {
      cur += (cur ? ' ' : '') + w;
    }
  });
  if (cur) titleLines.push(cur.trim());

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.bg}"/>
      <stop offset="100%" stop-color="#1A1114"/>
    </linearGradient>
    <linearGradient id="goldSheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${pal.accent}"/>
      <stop offset="50%" stop-color="#FFF0D0"/>
      <stop offset="100%" stop-color="${pal.accent}"/>
    </linearGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"/>
      <feComposite in2="SourceGraphic" in="glare" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="400" height="600" fill="url(#bgGrad)"/>
  
  <!-- Subtle Spine Shadow Left -->
  <rect width="18" height="600" fill="#000000" opacity="0.3"/>
  <line x1="18" y1="0" x2="18" y2="600" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5"/>
  <line x1="22" y1="0" x2="22" y2="600" stroke="#000000" stroke-opacity="0.25" stroke-width="1"/>

  <!-- Ornate Border Frame -->
  <rect x="36" y="32" width="332" height="536" fill="none" stroke="${pal.accent}" stroke-width="1.5" stroke-opacity="0.85"/>
  <rect x="42" y="38" width="320" height="524" fill="none" stroke="${pal.accent}" stroke-width="0.75" stroke-opacity="0.4" stroke-dasharray="4,3"/>
  
  <!-- Corner Ornaments -->
  <polygon points="36,48 48,36 36,36" fill="${pal.accent}"/>
  <polygon points="364,48 352,36 364,36" fill="${pal.accent}"/>
  <polygon points="36,552 48,564 36,564" fill="${pal.accent}"/>
  <polygon points="364,552 352,564 364,564" fill="${pal.accent}"/>

  <!-- Category Eyebrow -->
  <text x="202" y="86" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="3.5" fill="${pal.sub}" text-transform="uppercase">
    ${b.category}
  </text>
  
  <line x1="140" y1="102" x2="264" y2="102" stroke="${pal.accent}" stroke-width="1" stroke-opacity="0.6"/>
  <circle cx="202" cy="102" r="2.5" fill="${pal.accent}"/>

  <!-- Center Motif -->
  <g color="${pal.accent}">
    ${motifSvg}
  </g>

  <!-- Title -->
  <g text-anchor="middle" font-family="'Playfair Display', 'Cormorant Garamond', serif" fill="${pal.text}">
    ${titleLines.map((line, i) => {
      const fontSize = titleLines.length > 2 ? 26 : (line.length > 14 ? 28 : 32);
      const startY = 320 - ((titleLines.length - 1) * 18);
      return `<text x="202" y="${startY + (i * 38)}" font-size="${fontSize}" font-weight="700" letter-spacing="0.5">${line}</text>`;
    }).join('\n    ')}
  </g>

  <!-- Author Divider -->
  <line x1="160" y1="440" x2="244" y2="440" stroke="${pal.accent}" stroke-width="1" stroke-opacity="0.6"/>
  <circle cx="202" cy="440" r="2" fill="${pal.accent}"/>

  <!-- Author -->
  <text x="202" y="475" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="19" font-style="italic" fill="${pal.sub}" letter-spacing="1">
    ${b.author}
  </text>

  <!-- Publisher Imprint Footer -->
  <text x="202" y="534" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" letter-spacing="3" fill="${pal.accent}" text-transform="uppercase" opacity="0.8">
    QITAVRO EDITORIAL • ${b.publisher.toUpperCase()}
  </text>
</svg>`;

  fs.writeFileSync(`./public/images/books/${b.slug}.svg`, svg);
});

// Generate Collection SVGs
collections.forEach((c, idx) => {
  const pal = palettes[(idx * 2) % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="collGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.bg}"/>
      <stop offset="100%" stop-color="#140D0F"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#collGrad)"/>
  
  <rect x="25" y="25" width="550" height="400" fill="none" stroke="${pal.accent}" stroke-width="1" stroke-opacity="0.5"/>
  <rect x="35" y="35" width="530" height="380" fill="none" stroke="${pal.accent}" stroke-width="0.5" stroke-opacity="0.25"/>

  <!-- Decorative circles -->
  <circle cx="300" cy="160" r="70" fill="none" stroke="${pal.accent}" stroke-width="1" stroke-opacity="0.3"/>
  <circle cx="300" cy="160" r="50" fill="none" stroke="${pal.accent}" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="300" cy="160" r="6" fill="${pal.accent}"/>

  <text x="300" y="275" text-anchor="middle" font-family="'Playfair Display', serif" font-size="32" font-weight="700" fill="#F6F0E8" letter-spacing="1">
    ${c.title}
  </text>
  
  <text x="300" y="315" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="18" font-style="italic" fill="${pal.accent}" letter-spacing="0.5">
    ${c.tagline}
  </text>

  <line x1="240" y1="340" x2="360" y2="340" stroke="${pal.accent}" stroke-width="1" stroke-opacity="0.6"/>

  <text x="300" y="380" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="600" letter-spacing="3" fill="#DED6CC" text-transform="uppercase">
    CURATED SHELF • ${c.bookIds.length} EDITIONS
  </text>
</svg>`;

  fs.writeFileSync(`./public/images/collections/${c.slug}.svg`, svg);
});

// Generate Article SVGs
articles.forEach((a, idx) => {
  const pal = palettes[(idx * 3 + 1) % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="artGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.bg}"/>
      <stop offset="100%" stop-color="#110A0C"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#artGrad)"/>
  
  <rect x="35" y="35" width="730" height="430" fill="none" stroke="${pal.accent}" stroke-width="1.2" stroke-opacity="0.4"/>
  <rect x="45" y="45" width="710" height="410" fill="none" stroke="${pal.accent}" stroke-width="0.5" stroke-opacity="0.2"/>

  <!-- Magazine Monogram / Watermark -->
  <text x="400" y="210" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="140" font-style="italic" fill="${pal.accent}" opacity="0.12">
    Q
  </text>

  <text x="400" y="160" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="${pal.accent}" text-transform="uppercase">
    THE READING ROOM • ${a.category.toUpperCase()}
  </text>

  <line x1="320" y1="185" x2="480" y2="185" stroke="${pal.accent}" stroke-width="1" stroke-opacity="0.6"/>

  <text x="400" y="270" text-anchor="middle" font-family="'Playfair Display', serif" font-size="30" font-weight="700" fill="#F6F0E8" letter-spacing="0.5">
    ${a.title.length > 40 ? a.title.slice(0, 38) + '...' : a.title}
  </text>

  <text x="400" y="325" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" font-style="italic" fill="#DAC1BD">
    By ${a.author}
  </text>

  <text x="400" y="380" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="500" letter-spacing="2" fill="#B69A72">
    ${a.date.toUpperCase()} • ${a.readTime.toUpperCase()}
  </text>
</svg>`;

  fs.writeFileSync(`./public/images/articles/${a.slug}.svg`, svg);
});

// Generate Hero Editorial Image
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="900" height="1100">
  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#3A1C25"/>
      <stop offset="40%" stop-color="#421F2A"/>
      <stop offset="100%" stop-color="#241016"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#B69A72"/>
      <stop offset="50%" stop-color="#E5D3B8"/>
      <stop offset="100%" stop-color="#9E825A"/>
    </linearGradient>
    <radialGradient id="sunbeam" cx="0.85" cy="0.15" r="0.75">
      <stop offset="0%" stop-color="#FFF2DC" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#C7A7A2" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#421F2A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="900" height="1100" fill="url(#heroBg)"/>
  <rect width="900" height="1100" fill="url(#sunbeam)"/>

  <!-- Architectural Molding / Arch Frame -->
  <rect x="40" y="40" width="820" height="1020" fill="none" stroke="#B69A72" stroke-width="1.5" stroke-opacity="0.45"/>
  <rect x="55" y="55" width="790" height="990" fill="none" stroke="#B69A72" stroke-width="0.75" stroke-opacity="0.25" stroke-dasharray="6,4"/>

  <!-- Classic Bookshelf Silhouette Background -->
  <g opacity="0.18" stroke="#F6F0E8" stroke-width="1.5" fill="none">
    <line x1="80" y1="280" x2="820" y2="280"/>
    <line x1="80" y1="520" x2="820" y2="520"/>
    <line x1="80" y1="760" x2="820" y2="760"/>
    <!-- Book vertical spines -->
    <rect x="120" y="140" width="30" height="140" fill="#F6F0E8" fill-opacity="0.05"/>
    <rect x="155" y="120" width="45" height="160" fill="#F6F0E8" fill-opacity="0.07"/>
    <rect x="205" y="150" width="28" height="130" fill="#F6F0E8" fill-opacity="0.04"/>
    <rect x="238" y="130" width="50" height="150" fill="#F6F0E8" fill-opacity="0.08"/>
    <rect x="620" y="360" width="40" height="160" fill="#F6F0E8" fill-opacity="0.06"/>
    <rect x="665" y="340" width="55" height="180" fill="#F6F0E8" fill-opacity="0.08"/>
    <rect x="725" y="370" width="32" height="150" fill="#F6F0E8" fill-opacity="0.05"/>
  </g>

  <!-- Central Editorial Book Arrangement -->
  <!-- Stacked Books on Mahogany Table -->
  <g transform="translate(180, 480)">
    <!-- Table top surface -->
    <line x1="-100" y1="360" x2="640" y2="360" stroke="#B69A72" stroke-width="2" stroke-opacity="0.6"/>
    <polygon points="-80,362 620,362 570,410 -30,410" fill="#2B151C" opacity="0.6"/>

    <!-- Bottom Book (Large Leather Tome) -->
    <rect x="40" y="310" width="460" height="48" rx="3" fill="#272321" stroke="#B69A72" stroke-width="1.5"/>
    <line x1="55" y1="310" x2="55" y2="358" stroke="#B69A72" stroke-width="2"/>
    <text x="270" y="340" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="14" fill="#B69A72" letter-spacing="3">ENCYCLOPÉDIE DES ARTS ET LETTRES</text>

    <!-- Middle Book (Burgundy Cloth) -->
    <rect x="75" y="260" width="390" height="48" rx="2" fill="#652E3C" stroke="#DAC1BD" stroke-width="1.2"/>
    <line x1="90" y1="260" x2="90" y2="308" stroke="#DAC1BD" stroke-width="1.5"/>
    <text x="270" y="291" text-anchor="middle" font-family="'Playfair Display', serif" font-size="13" font-style="italic" fill="#FAF6F0" letter-spacing="2">The Shadow of the Wind — Carlos Ruiz Zafón</text>

    <!-- Top Book (Warm Ivory & Gold) -->
    <rect x="110" y="210" width="320" height="48" rx="2" fill="#F6F0E8" stroke="#B69A72" stroke-width="1.5"/>
    <line x1="125" y1="210" x2="125" y2="258" stroke="#B69A72" stroke-width="2"/>
    <text x="270" y="241" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="14" font-weight="600" fill="#421F2A" letter-spacing="3">MEDITATIONS • MARCUS AURELIUS</text>

    <!-- Reading Glasses Resting on Top -->
    <ellipse cx="230" cy="195" rx="22" ry="14" fill="none" stroke="#B69A72" stroke-width="2"/>
    <ellipse cx="285" cy="195" rx="22" ry="14" fill="none" stroke="#B69A72" stroke-width="2"/>
    <path d="M252,195 Q257,190 263,195" fill="none" stroke="#B69A72" stroke-width="2"/>
    <line x1="208" y1="195" x2="185" y2="180" stroke="#B69A72" stroke-width="1.5"/>
    <line x1="307" y1="195" x2="330" y2="180" stroke="#B69A72" stroke-width="1.5"/>
  </g>

  <!-- Ceramic Teacup with Steam -->
  <g transform="translate(680, 780)">
    <path d="M20,60 C20,95 70,95 70,60 Z" fill="#F6F0E8" stroke="#DED6CC" stroke-width="1.5"/>
    <ellipse cx="45" cy="60" rx="25" ry="8" fill="#421F2A" stroke="#DED6CC" stroke-width="1.5"/>
    <path d="M68,68 Q82,72 68,82" fill="none" stroke="#F6F0E8" stroke-width="2"/>
    <ellipse cx="45" cy="98" rx="36" ry="6" fill="#F6F0E8" stroke="#DED6CC" stroke-width="1"/>
    <!-- Steam -->
    <path d="M42,48 Q38,35 44,22" fill="none" stroke="#B69A72" stroke-width="1.2" opacity="0.6"/>
    <path d="M50,45 Q54,32 48,18" fill="none" stroke="#B69A72" stroke-width="1.2" opacity="0.4"/>
  </g>

  <!-- Editorial Monogram Plaque at Top -->
  <circle cx="450" cy="170" r="45" fill="#2B151C" stroke="#B69A72" stroke-width="1.5"/>
  <circle cx="450" cy="170" r="38" fill="none" stroke="#B69A72" stroke-width="0.8" stroke-dasharray="3,3"/>
  <text x="450" y="186" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="44" font-weight="600" fill="#B69A72">Q</text>

  <!-- Editorial Quote & Tagline at bottom -->
  <text x="450" y="960" text-anchor="middle" font-family="'Playfair Display', serif" font-size="22" font-style="italic" fill="#F6F0E8" letter-spacing="1">
    "Stories worth keeping."
  </text>
  <text x="450" y="995" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="4" fill="#B69A72" text-transform="uppercase">
    THE EDITORIAL SANCTUARY • EST. MMXXVI
  </text>
</svg>`;

fs.writeFileSync('./public/images/hero/hero-reading.svg', heroSvg);
console.log('All vector assets successfully generated!');

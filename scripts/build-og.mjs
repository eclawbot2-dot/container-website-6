import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = process.argv[2]; // raw event photo
if (!src) {
  console.error('usage: node scripts/build-og.mjs <raw-photo.jpg>');
  process.exit(1);
}
const W = 1200, H = 630;

// Dark + grayscale-leaning treatment so the design's terminal palette reads;
// keep the crowd/lights subject visible underneath the gradient + text.
const base = await sharp(src)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .modulate({ saturation: 0.35, brightness: 0.78 })
  .toBuffer();

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#070806" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#070806" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#070806" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="#070806" opacity="0.18"/>
  <!-- amber tick -->
  <rect x="84" y="250" width="70" height="10" fill="#ffb000"/>
  <text x="82" y="345" font-family="Arial, sans-serif" font-size="92" font-weight="800"
        fill="#ffb000" letter-spacing="2">THE CONTAINER</text>
  <text x="86" y="408" font-family="Arial, sans-serif" font-size="40" font-weight="700"
        fill="#ffffff" letter-spacing="14">JEDDAH · RED SEA PORT</text>
  <text x="86" y="462" font-family="Arial, sans-serif" font-size="24" font-weight="600"
        fill="#9a9482" letter-spacing="4">INDUSTRIAL TECHNO &amp; HOUSE · SHAMS CONTAINER TERMINAL</text>
  <!-- hazard tape sliver bottom -->
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#ffb000" opacity="0.7"/>
</svg>`);

await sharp(base)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86 })
  .toFile(path.join(root, 'public', 'og.jpg'));

console.log('og.jpg written');

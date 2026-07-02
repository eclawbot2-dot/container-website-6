// Post-build static-output audit. Run after `next build` (output: 'export').
//
// Enforces this site's link policy: NO fabricated/unverified external
// destinations (Instagram handles, ticketers, mailboxes) may appear as links —
// they must stay as non-linking "coming soon" placeholders until verified in
// lib/config.ts. Also sanity-checks the exported artifacts.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../out', import.meta.url));
// Keep in sync with SITE_URL in lib/config.ts (canonical public origin).
const SITE_URL = 'https://container6.jahdev.com';

// External hosts that are verified-safe to link (see lib/config.ts).
const ALLOWED_HOSTS = new Set(['www.google.com', 'google.com', 'fonts.googleapis.com', 'fonts.gstatic.com']);

// Unverified until the config flags in lib/config.ts flip — must NOT link out.
const FORBIDDEN = [
  /instagram\.com/i,
  /facebook\.com/i,
  /tiktok\.com/i,
  /twitter\.com/i,
  /(^|[^a-z0-9])x\.com/i,
  /webook\.com/i,
  /mailto:/i,
  /localhost/i,
  /127\.0\.0\.1/,
];

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`FAIL: ${msg}`);
};

if (!existsSync(OUT)) {
  console.error(`FAIL: out/ not found at ${OUT} — run \`next build\` first.`);
  process.exit(1);
}

// 1. Exported artifacts exist.
for (const f of [
  'index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'favicon.svg',
  'apple-touch-icon.png',
  'site.webmanifest',
  'og.jpg',
  'images/port.jpg',
]) {
  if (!existsSync(join(OUT, f))) fail(`missing out/${f}`);
}

// 2. Sitemap points at the canonical host only.
if (existsSync(join(OUT, 'sitemap.xml'))) {
  const sm = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail('sitemap.xml has no <loc> entries');
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) fail(`sitemap loc not on canonical host: ${loc}`);
  }
}

// 3. HTML pages: forbidden destinations, unknown external hosts, broken local assets.
let pages = 0;
for (const file of htmlFiles(OUT)) {
  pages++;
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(OUT.length);

  for (const re of FORBIDDEN) {
    if (re.test(html)) fail(`${rel}: matches forbidden pattern ${re}`);
  }

  for (const m of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    const host = new URL(m[1]).hostname;
    if (host.endsWith('.jahdev.com') || ALLOWED_HOSTS.has(host)) continue;
    fail(`${rel}: link to unverified external host ${host} (${m[1]})`);
  }

  // Local assets referenced by attributes AND by inline-style CSS backgrounds
  // must exist in the export.
  for (const m of html.matchAll(
    /(?:(?:href|src)="|url\()(\/images\/[^")]+|\/favicon[^")]*|\/apple-touch-icon[^")]*|\/og\.jpg[^")]*)["\)]/g,
  )) {
    const asset = decodeURIComponent(m[1].split('?')[0]);
    if (!existsSync(join(OUT, asset))) fail(`${rel}: references missing asset ${asset}`);
  }
}
// home + 3 event pages + 404 (+ Next's internal /_not-found stub if emitted)
if (pages < 5) fail(`only ${pages} HTML pages exported — expected home + 3 events + 404`);

// 4. 404 page must be the branded one, not Next's default (invisible on dark body).
if (existsSync(join(OUT, '404.html'))) {
  const p404 = readFileSync(join(OUT, '404.html'), 'utf8');
  if (p404.includes('This page could not be found')) {
    fail('404.html is the unbranded Next default (black text on dark body)');
  }
}

if (failures) {
  console.error(`\ncheck-site: ${failures} failure(s) across ${pages} pages`);
  process.exit(1);
}
console.log(`check-site: OK — ${pages} pages, link policy + artifacts verified`);

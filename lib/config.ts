// ── Venue config — single place to confirm/swap real values ────────────────

// ── LINK AUDIT — no fabricated / guessed links. ────────────────────────────
// Every outbound link below is either VERIFIED real, or an explicit
// PLACEHOLDER surfaced to the user as a label (never a guessed URL).

// Instagram: NO verified handle for The Container, Jeddah. We do NOT guess a
// handle or link to a guessed instagram.com/... profile (that could point at
// the wrong/another account). Surfaced as a visible "coming soon" placeholder.
// TODO real IG unknown — set INSTAGRAM_URL to the confirmed profile when known.
export const INSTAGRAM_URL: string | null = null;

// Webook Jeddah events — swap to specific event slug when on sale
export const TICKETS_URL: string | null = 'https://webook.com/explore?city=JED&country=SA';

// Contact email: no live mailbox provisioned at this address yet. Shown as a
// label, not a mailto: that would bounce. Flip to a real address to enable.
// TODO real mailbox unknown — set CONTACT_EMAIL to a monitored address.
export const CONTACT_EMAIL: string | null = null;

// Public site origin (canonical, OG, JSON-LD).
export const SITE_URL = 'https://container6.jahdev.com';

// Venue geo (Al Moulysaa district, Jeddah port, Red Sea coast) — VERIFIED.
export const VENUE_COORDS = { lat: 21.2727, lng: 39.1935 };

// Open the location in Google Maps (full app / new tab) — VERIFIED.
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${VENUE_COORDS.lat},${VENUE_COORDS.lng}`;

// Reliable, no-API-key Google Maps embed for an <iframe>. Pass the active UI
// language so map labels follow EN/AR. (staticmap.openstreetmap.de images were
// unreliable / frequently 5xx — this embed renders consistently.)
export function mapsEmbedUrl(lang: 'en' | 'ar' = 'en'): string {
  return `https://www.google.com/maps?q=${VENUE_COORDS.lat},${VENUE_COORDS.lng}&z=15&hl=${lang}&output=embed`;
}

// Per-language bio / time copy lives on the event so the detail pages can be
// fully bilingual without scattering strings across the i18n dictionary.
type Localized = { en: string; ar: string };

export type EventItem = {
  id: string;
  dateISO: string; // for sorting / datetime attr
  artist: string;
  artistAr: string; // artist name transliterated for AR UI
  bay: string; // manifest "BAY/STAGE" code
  time?: string; // local door/set time, e.g. "23:00" — omit if unconfirmed
  genre: Localized;
  bio: Localized;
  ticketsUrl?: string | null; // per-event ticketing override (else TICKETS_URL)
  tba?: boolean;
};

// Real confirmed lineup (verified). Lineup subject to change.
export const EVENTS: EventItem[] = [
  {
    id: 'anja-schneider',
    dateISO: '2026-08-21',
    artist: 'Anja Schneider',
    artistAr: 'آنيا شنايدر',
    bay: 'BAY 01',
    time: '23:00',
    genre: { en: 'House · Techno', ar: 'هاوس · تكنو' },
    bio: {
      en: 'Berlin-based DJ, producer and broadcaster — a long-standing figure in international house and techno, and founder of the SOUS Music label.',
      ar: 'منسّقة أغانٍ ومنتجة وإذاعية مقيمة في برلين — شخصية راسخة في عالم الهاوس والتكنو الدولي، ومؤسِّسة لِيبل SOUS Music.',
    },
  },
  {
    id: 'cassy',
    dateISO: '2026-09-11',
    artist: 'Cassy',
    artistAr: 'كاسي',
    bay: 'BAY 02',
    genre: { en: 'House · Techno', ar: 'هاوس · تكنو' },
    bio: {
      en: 'Austrian-Greek DJ and producer celebrated for deep, hypnotic house and techno and long, immersive sets; founder of Kwench Records.',
      ar: 'منسّقة أغانٍ ومنتجة نمساوية-يونانية، اشتهرت بموسيقى الهاوس والتكنو العميقة المنوّمة والعروض الطويلة الغامرة؛ مؤسِّسة Kwench Records.',
    },
  },
  {
    id: 'tba-1',
    dateISO: '2026-10-16',
    artist: 'TBA',
    artistAr: 'يُعلن لاحقًا',
    bay: 'BAY 03',
    genre: { en: '', ar: '' },
    bio: { en: '', ar: '' },
    tba: true,
  },
];

export function getEvent(id: string): EventItem | undefined {
  return EVENTS.find((e) => e.id === id);
}

// Resolve the effective tickets URL for an event (per-event override → global).
export function ticketsHref(ev?: EventItem | null): string | null {
  return (ev?.ticketsUrl ?? TICKETS_URL) || null;
}

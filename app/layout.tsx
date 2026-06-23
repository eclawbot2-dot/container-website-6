import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/components/LangProvider';
import { SITE_URL, VENUE_COORDS, EVENTS } from '@/lib/config';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ar',
  display: 'swap',
});

const TITLE = 'THE CONTAINER · Jeddah · Red Sea Port';
const DESC =
  "Jeddah's industrial techno & house venue on the Red Sea port. Live electronic music at Shams Container Terminal — Anja Schneider, Cassy & more.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  applicationName: 'THE CONTAINER',
  keywords: [
    'The Container Jeddah',
    'Jeddah techno',
    'Jeddah house music',
    'Red Sea electronic music',
    'Shams Container Terminal',
    'Saudi Arabia nightlife',
    'Anja Schneider Jeddah',
    'Cassy Jeddah',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'en-SA': SITE_URL, 'ar-SA': SITE_URL },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'THE CONTAINER',
    url: SITE_URL,
    title: TITLE,
    description: DESC,
    locale: 'en_SA',
    alternateLocale: ['ar_SA'],
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'THE CONTAINER — industrial techno & house venue on the Jeddah Red Sea port',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#070806',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// ── Structured data: the venue + each confirmed event ──────────────────────
const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Shams Container Terminal, Al Moulysaa district, Jeddah port area',
  addressLocality: 'Jeddah',
  addressRegion: 'Makkah Province',
  addressCountry: 'SA',
};
const GEO = {
  '@type': 'GeoCoordinates',
  latitude: VENUE_COORDS.lat,
  longitude: VENUE_COORDS.lng,
};

const venueJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicVenue',
  '@id': `${SITE_URL}/#venue`,
  name: 'THE CONTAINER',
  alternateName: 'ذا كونتينر',
  url: SITE_URL,
  description: DESC,
  image: `${SITE_URL}/og.jpg`,
  address: ADDRESS,
  geo: GEO,
  // No verified social profile yet — omit sameAs rather than assert a guessed
  // Instagram URL in structured data (that would be a fabricated claim).
};

// Only emit structured data for confirmed events. TBA placeholders have no
// real performer/lineup, so a "TBA at THE CONTAINER" MusicEvent would be
// low-quality markup (and risks a Google structured-data spam flag).
const eventsJsonLd = EVENTS.filter((e) => !e.tba).map((e) => ({
  '@context': 'https://schema.org',
  '@type': 'MusicEvent',
  name: `${e.artist} at THE CONTAINER`,
  startDate: e.dateISO,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  url: `${SITE_URL}/events/${e.id}/`,
  image: `${SITE_URL}/og.jpg`,
  performer: { '@type': 'PerformingGroup', name: e.artist },
  location: {
    '@type': 'MusicVenue',
    name: 'THE CONTAINER',
    address: ADDRESS,
    geo: GEO,
  },
  organizer: { '@type': 'Organization', name: 'THE CONTAINER', url: SITE_URL },
}));

const jsonLd = [venueJsonLd, ...eventsJsonLd];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${mono.variable} ${arabic.variable}`}>
      <head>
        {/* Pre-paint: apply the saved language's dir/lang before first paint so
            returning Arabic visitors don't flash English LTR (static export
            serves lang=en by default; LangProvider re-syncs after hydration). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('container6.lang');if(l==='ar'){var e=document.documentElement;e.lang='ar';e.dir='rtl';}}catch(e){}`,
          }}
        />
        {/* MusicVenue + MusicEvent structured data (Google rich results). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void font-mono antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

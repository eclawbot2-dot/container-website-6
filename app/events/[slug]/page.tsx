import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EventDetail } from '@/components/EventDetail';
import { EVENTS, getEvent, SITE_URL, VENUE_COORDS } from '@/lib/config';

// Pre-render one static page per confirmed event (and the TBA placeholder so
// every manifest row resolves). Output lands in `out/events/<slug>/`.
export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ev = getEvent(params.slug);
  if (!ev || ev.tba) {
    // TBA placeholder page: keep it reachable from the manifest but out of
    // search indexes (no real performer/date content to rank; it's also
    // deliberately excluded from sitemap.xml).
    return { title: 'Event · THE CONTAINER', robots: { index: false, follow: true } };
  }
  const title = `${ev.artist} · THE CONTAINER · Jeddah`;
  const desc = `${ev.artist} at THE CONTAINER — Shams Container Terminal, Jeddah, Red Sea port. ${ev.bio.en}`;
  const url = `${SITE_URL}/events/${ev.id}/`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'THE CONTAINER',
      url,
      title,
      description: desc,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description: desc, images: ['/og.jpg'] },
  };
}

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Shams Container Terminal, Al Moulysaa district, Jeddah port area',
  addressLocality: 'Jeddah',
  addressRegion: 'Makkah Province',
  addressCountry: 'SA',
};

export default function EventPage({ params }: { params: { slug: string } }) {
  const ev = getEvent(params.slug);
  if (!ev) notFound();

  // Per-event MusicEvent structured data (skip the TBA placeholder — no real
  // performer means low-quality markup / spam-flag risk).
  const jsonLd =
    ev && !ev.tba
      ? {
          '@context': 'https://schema.org',
          '@type': 'MusicEvent',
          name: `${ev.artist} at THE CONTAINER`,
          startDate: ev.time ? `${ev.dateISO}T${ev.time}:00+03:00` : ev.dateISO,
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          url: `${SITE_URL}/events/${ev.id}/`,
          image: `${SITE_URL}/og.jpg`,
          description: ev.bio.en,
          performer: { '@type': 'PerformingGroup', name: ev.artist },
          location: {
            '@type': 'MusicVenue',
            name: 'THE CONTAINER',
            address: ADDRESS,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: VENUE_COORDS.lat,
              longitude: VENUE_COORDS.lng,
            },
          },
          organizer: { '@type': 'Organization', name: 'THE CONTAINER', url: SITE_URL },
        }
      : null;

  return (
    <div className="scanlines min-h-screen">
      {jsonLd && (
        <script
          type="application/ld+json"
          // Escape "<" so no content string can ever break out of the <script>
          // element (standard JSON-LD embedding hardening).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <Header />
      <main>
        <EventDetail id={params.slug} />
      </main>
      <Footer />
    </div>
  );
}

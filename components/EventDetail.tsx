'use client';

import { useLang } from './LangProvider';
import { formatEventDate, containerCode } from '@/lib/i18n';
import {
  getEvent,
  MAPS_URL,
  mapsEmbedUrl,
  ticketsHref,
  VENUE_COORDS,
} from '@/lib/config';

export function EventDetail({ id }: { id: string }) {
  const { lang, t } = useLang();
  const ar = lang === 'ar';
  const ev = getEvent(id);

  if (!ev) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <p className={`text-lg text-hazard ${ar ? 'font-ar' : ''}`}>{t.event.notFound}</p>
        <a
          href="/#manifest"
          className={`mt-6 inline-flex items-center gap-2 border border-amber px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber transition-colors hover:bg-amber hover:text-void ${
            ar ? 'font-ar tracking-normal' : ''
          }`}
        >
          <span aria-hidden>{ar ? '▸' : '◂'}</span>
          {t.event.back}
        </a>
      </div>
    );
  }

  const artist = ar ? ev.artistAr : ev.artist;
  const tix = ticketsHref(ev);

  const rows: { code: string; label: string; value: string; ltr?: boolean }[] = [
    { code: 'DATE', label: t.event.dateLabel, value: formatEventDate(ev.dateISO, lang) },
    {
      code: 'TIME',
      label: t.event.timeLabel,
      value: ev.time ? `${ev.time}` : t.event.timeTba,
      ltr: !!ev.time,
    },
    { code: 'CARGO', label: t.event.genreLabel, value: ar ? ev.genre.ar : ev.genre.en },
    { code: 'BERTH', label: t.event.venueLabel, value: t.event.venueName },
    { code: 'LOC', label: t.event.locationLabel, value: t.event.venueLine },
  ].filter((r) => r.value);

  return (
    <article className="border-b border-line">
      {/* Manifest document header strip */}
      <div className="border-b border-line bg-panel/60">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-muted sm:px-6 sm:text-xs">
          <span className={`text-amber/90 ${ar ? 'font-ar tracking-normal' : ''}`}>
            {t.event.docId}
          </span>
          <span className="font-mono text-ink" dir="ltr">
            {containerCode(ev.dateISO)}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
        {/* Back link */}
        <a
          href="/#manifest"
          className={`mb-8 inline-flex min-h-[44px] items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
            ar ? 'font-ar tracking-normal' : ''
          }`}
        >
          <span aria-hidden>{ar ? '▸' : '◂'}</span>
          {t.event.back}
        </a>

        {/* Ref + bay stamp line */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
          <span className="stamp text-amber/90" dir="ltr">{ev.bay}</span>
          <span className="stamp text-phosphor glow-green">{t.lineup.statusBoarding}</span>
          <span className="leader" aria-hidden />
        </div>

        {/* Artist title */}
        <h1
          className={`mb-3 text-amber glow ${
            ar
              ? 'font-ar text-4xl font-bold sm:text-6xl'
              : 'text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl'
          }`}
        >
          {artist}
        </h1>
        <p className={`mb-10 text-sm uppercase tracking-[0.2em] text-muted ${ar ? 'font-ar tracking-normal' : ''}`}>
          {formatEventDate(ev.dateISO, lang)}
          {ev.time ? <span dir="ltr"> · {ev.time}</span> : null}
        </p>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Manifest-style detail rows */}
          <div>
            <dl className="divide-y divide-line border border-line bg-panel/40">
              {rows.map((r, i) => (
                <div key={i} className="p-5">
                  <dt className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-amber/80">
                    <span className="font-mono" dir="ltr">{r.code}</span>
                    <span className="leader" aria-hidden />
                    <span className={ar ? 'font-ar tracking-normal text-muted' : 'text-muted'}>
                      {r.label}
                    </span>
                  </dt>
                  <dd
                    className={`text-sm leading-relaxed text-ink/90 ${ar ? 'font-ar' : ''}`}
                    dir={r.ltr ? 'ltr' : undefined}
                  >
                    {r.value}
                  </dd>
                </div>
              ))}

              {/* Bio / manifest notes */}
              {(ar ? ev.bio.ar : ev.bio.en) && (
                <div className="p-5">
                  <dt className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-amber/80">
                    <span className="font-mono" dir="ltr">BIO</span>
                    <span className="leader" aria-hidden />
                    <span className={ar ? 'font-ar tracking-normal text-muted' : 'text-muted'}>
                      {t.event.bioLabel}
                    </span>
                  </dt>
                  <dd className={`text-sm leading-relaxed text-ink/90 ${ar ? 'font-ar' : ''}`}>
                    {ar ? ev.bio.ar : ev.bio.en}
                  </dd>
                </div>
              )}
            </dl>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {tix ? (
                <a
                  href={tix}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[44px] items-center gap-2 border border-amber bg-amber px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-void transition-colors hover:bg-amber-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                    ar ? 'font-ar tracking-normal' : ''
                  }`}
                >
                  <span aria-hidden>▸</span>
                  {t.event.ticketsCta}
                </a>
              ) : (
                // No verified ticket URL → visible, non-clickable placeholder.
                // Never link to Instagram or a guessed ticketer.
                <span
                  className={`inline-flex min-h-[44px] cursor-default items-center gap-2 border border-amber/40 bg-amber/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-amber/80 ${
                    ar ? 'font-ar tracking-normal' : ''
                  }`}
                  aria-disabled="true"
                >
                  <span aria-hidden>◷</span>
                  {t.event.ticketsSoon}
                </span>
              )}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-[44px] items-center gap-2 border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-amber hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                  ar ? 'font-ar tracking-normal' : ''
                }`}
              >
                <span aria-hidden>◎</span>
                {t.event.mapCta}
              </a>
            </div>

            <p className={`mt-6 text-xs leading-relaxed text-muted ${ar ? 'font-ar' : ''}`}>
              <span className="text-hazard" aria-hidden>⚠ </span>
              {t.event.subjectToChange}
            </p>
          </div>

          {/* Berth location — live Google Maps embed (verified coords). */}
          <div className="flex flex-col border border-line bg-panel/40">
            <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-muted">
              <span className="text-amber/80" dir="ltr">BERTH LOCATION</span>
              <span className="font-mono text-ink" dir="ltr">
                {VENUE_COORDS.lat}°N · {VENUE_COORDS.lng}°E
              </span>
            </div>
            <div className="relative flex-1">
              <iframe
                src={mapsEmbedUrl(lang)}
                title={ar ? 'خريطة محطة شمس للحاويات، جدة' : 'Map of Shams Container Terminal, Jeddah'}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[280px] w-full border-0"
                style={{ filter: 'grayscale(0.35) contrast(1.05) brightness(0.95)' }}
              />
              <span
                className="pointer-events-none absolute inset-0 bg-amber/[0.05] mix-blend-screen"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hazard-tape h-2 w-full opacity-60" aria-hidden />
    </article>
  );
}

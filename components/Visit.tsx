'use client';

import { useLang } from './LangProvider';
import { MAPS_URL, STATIC_MAP_URL, VENUE_COORDS } from '@/lib/config';

export function Visit() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';

  const rows = [
    { title: t.visit.addressTitle, body: t.visit.address, code: 'LOC' },
    { title: t.visit.gettingThereTitle, body: t.visit.gettingThere, code: 'NAV' },
    { title: t.visit.hoursTitle, body: t.visit.hours, code: 'ETA' },
    { title: t.visit.entryTitle, body: t.visit.entry, code: 'GATE' },
  ];

  return (
    <section id="visit" className="border-b border-line bg-grid">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-amber/90">
          <span className="stamp">SEC 03</span>
          <span className={ar ? 'font-ar tracking-normal' : ''}>{t.visit.eyebrow}</span>
          <span className="leader" aria-hidden />
        </div>

        <h2
          className={`mb-10 text-2xl text-ink sm:text-4xl ${
            ar ? 'font-ar font-bold' : 'font-bold tracking-tight'
          }`}
        >
          {t.visit.title}
        </h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Manifest-style info rows */}
          <dl className="divide-y divide-line border border-line bg-panel/40">
            {rows.map((r, i) => (
              <div key={i} className="p-5">
                <dt className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-amber/80">
                  <span className="font-mono">{r.code}</span>
                  <span className="leader" aria-hidden />
                  <span className={ar ? 'font-ar tracking-normal text-muted' : 'text-muted'}>
                    {r.title}
                  </span>
                </dt>
                <dd className={`text-sm leading-relaxed text-ink/90 ${ar ? 'font-ar' : ''}`}>
                  {r.body}
                </dd>
              </div>
            ))}
            <div className="p-5">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 border border-amber px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber transition-colors hover:bg-amber hover:text-void ${
                  ar ? 'font-ar tracking-normal' : ''
                }`}
              >
                <span aria-hidden>◎</span>
                {t.visit.mapCta}
              </a>
            </div>
          </dl>

          {/* Map panel */}
          <div className="flex flex-col border border-line bg-panel/40">
            <div className="flex items-center justify-between border-b border-line px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-muted">
              <span className="text-amber/80">PORT COORDINATES</span>
              <span className="font-mono text-ink">
                {VENUE_COORDS.lat}°N · {VENUE_COORDS.lng}°E
              </span>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block flex-1"
              aria-label={t.visit.mapCta}
            >
              <img
                src={STATIC_MAP_URL}
                alt="Map of Shams Container Terminal, Jeddah"
                loading="lazy"
                className="h-full min-h-[260px] w-full object-cover opacity-80 contrast-110 grayscale transition-opacity group-hover:opacity-100"
              />
              <span className="pointer-events-none absolute inset-0 bg-amber/[0.06] mix-blend-screen" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-hazard glow">
                ⊕
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

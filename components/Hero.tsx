'use client';

import { useLang } from './LangProvider';
import { SplitFlap } from './SplitFlap';
import { INSTAGRAM_URL, VENUE_COORDS } from '@/lib/config';

export function Hero() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      {/* Gritty port image, heavily darkened, as backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/images/port.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-[0.18] grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/85 to-void" />
      </div>

      {/* Manifest document header strip */}
      <div className="border-b border-line bg-panel/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-muted sm:px-6 sm:text-xs">
          <span className={`text-amber/90 ${ar ? 'font-ar tracking-normal' : ''}`}>
            {t.terminal.docId}
          </span>
          <span className="hidden sm:inline">
            {t.terminal.coords}:{' '}
            <span className="text-ink">
              {VENUE_COORDS.lat}°N {VENUE_COORDS.lng}°E
            </span>
          </span>
          <span className="inline-flex items-center gap-2">
            {t.terminal.status}:
            <span className="text-phosphor glow-green">{t.terminal.statusValue}</span>
            <span className="h-2 w-2 animate-blink rounded-full bg-phosphor" aria-hidden />
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        {/* Container ID + port-of line */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
          <span className="stamp text-amber/90">CNTR 21 27 39</span>
          <span className={`text-muted ${ar ? 'font-ar tracking-normal' : ''}`}>
            {t.terminal.port}{' '}
            <span className="text-ink">{t.terminal.portValue}</span>
          </span>
        </div>

        {/* Departures-board title */}
        <h1
          className={`mb-6 text-amber glow ${
            ar
              ? 'font-ar text-5xl font-bold sm:text-7xl'
              : 'text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-8xl'
          }`}
        >
          {ar ? (
            <span className="block">{t.hero.title}</span>
          ) : (
            <SplitFlap text={t.hero.title} />
          )}
        </h1>

        {/* Boarding strip */}
        <div className="mb-8 inline-flex items-center gap-3 border border-amber/40 bg-amber/5 px-3 py-1.5">
          <span className="h-2 w-2 animate-blink bg-amber" aria-hidden />
          <span
            className={`text-xs font-bold uppercase tracking-[0.22em] text-amber-soft ${
              ar ? 'font-ar tracking-normal' : ''
            }`}
          >
            {t.hero.boarding}
          </span>
        </div>

        <p
          className={`max-w-2xl text-sm leading-relaxed text-ink sm:text-base ${
            ar ? 'font-ar' : ''
          }`}
        >
          {t.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#manifest"
            className={`inline-flex items-center gap-2 border border-amber bg-amber px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-void transition-colors hover:bg-amber-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-void ${
              ar ? 'font-ar tracking-normal' : ''
            }`}
          >
            <span aria-hidden>▸</span>
            {t.hero.cta}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-amber hover:text-amber ${
              ar ? 'font-ar tracking-normal' : ''
            }`}
          >
            <span aria-hidden>◎</span>
            {t.hero.instagram}
          </a>
        </div>
      </div>

      {/* Hazard tape bottom edge */}
      <div className="hazard-tape h-2 w-full opacity-70" aria-hidden />
    </section>
  );
}

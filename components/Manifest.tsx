'use client';

import { useLang } from './LangProvider';
import { formatEventDate, containerCode } from '@/lib/i18n';
import { EVENTS, ticketsHref } from '@/lib/config';

export function Manifest() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';
  const sorted = [...EVENTS].sort((a, b) => a.dateISO.localeCompare(b.dateISO));

  return (
    <section id="manifest" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-amber/90">
          <span className="stamp">SEC 02</span>
          <span className={ar ? 'font-ar tracking-normal' : ''}>{t.lineup.eyebrow}</span>
          <span className="leader" aria-hidden />
          <span className="hidden text-muted sm:inline">
            {sorted.length.toString().padStart(2, '0')} ENTRIES
          </span>
        </div>

        <h2
          className={`mb-2 text-2xl text-ink sm:text-4xl ${
            ar ? 'font-ar font-bold' : 'font-bold tracking-tight'
          }`}
        >
          {t.lineup.title}
        </h2>
        <p className={`mb-10 text-sm text-muted sm:text-base ${ar ? 'font-ar' : ''}`}>
          {t.lineup.subtitle}
        </p>

        {/* ── Desktop / tablet: tabular manifest ───────────────────────── */}
        {/* Contained horizontal scroll: the fixed-width grid never forces
            page-level overflow; it scrolls inside this wrapper if narrow. */}
        <div
          className="hidden overflow-x-auto border border-line md:block"
          role="region"
          aria-label={t.lineup.title}
          tabIndex={0}
        >
          <div className="min-w-[760px]">
          {/* Column header row */}
          <div
            className={`grid items-center gap-4 border-b border-line bg-panel px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-muted ${
              ar ? 'font-ar tracking-normal' : ''
            }`}
            style={{ gridTemplateColumns: '120px 1.6fr 1.4fr 100px 150px 120px' }}
          >
            <span>{t.lineup.cols.ref}</span>
            <span>{t.lineup.cols.vessel}</span>
            <span>{t.lineup.cols.etd}</span>
            <span>{t.lineup.cols.bay}</span>
            <span>{t.lineup.cols.status}</span>
            <span className={ar ? 'text-left' : 'text-right'}>{t.lineup.detailsCta}</span>
          </div>

          {sorted.map((ev, i) => {
            const pending = ev.tba;
            const tix = ticketsHref(ev);
            return (
              <div
                key={ev.id}
                className="grid items-center gap-4 border-b border-line/60 px-5 py-5 transition-colors last:border-b-0 hover:bg-amber/[0.04]"
                style={{ gridTemplateColumns: '120px 1.6fr 1.4fr 100px 150px 120px' }}
              >
                <span className="font-mono text-xs text-amber/80">{containerCode(ev.dateISO)}</span>
                <span
                  className={`text-base font-bold ${
                    pending ? 'text-muted' : 'text-ink'
                  } ${ar ? 'font-ar' : 'tracking-wide'}`}
                >
                  {pending ? t.lineup.tba : ev.artist}
                </span>
                <span className={`text-sm text-ink/90 ${ar ? 'font-ar' : ''}`}>
                  {pending ? '—' : formatEventDate(ev.dateISO, lang)}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  {ev.bay}
                </span>
                <span>
                  <span
                    className={`stamp text-[10px] ${
                      pending ? 'text-hazard' : 'text-phosphor glow-green'
                    } ${ar ? 'font-ar tracking-normal' : ''}`}
                  >
                    {pending ? t.lineup.statusPending : t.lineup.statusBoarding}
                  </span>
                </span>
                <span className={`flex flex-wrap items-center gap-2 ${ar ? 'justify-start' : 'justify-end'}`}>
                  {pending ? (
                    <span className="text-xs text-muted">—</span>
                  ) : (
                    <>
                      {tix ? (
                        <a
                          href={tix}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.lineup.ticketsCta} — ${ar ? ev.artistAr : ev.artist}`}
                          className={`inline-flex items-center gap-1.5 border border-amber bg-amber px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-void transition-colors hover:bg-amber-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                            ar ? 'font-ar tracking-normal' : ''
                          }`}
                        >
                          {t.lineup.ticketsCta}
                        </a>
                      ) : (
                        // No ticket URL yet → visible non-link "on sale soon" placeholder.
                        <span
                          aria-disabled="true"
                          className={`inline-flex cursor-default items-center gap-1.5 border border-amber/40 bg-amber/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber/80 ${
                            ar ? 'font-ar tracking-normal' : ''
                          }`}
                        >
                          {t.event.ticketsSoon}
                        </span>
                      )}
                      <a
                        href={`/events/${ev.id}/`}
                        className={`inline-flex items-center gap-1.5 border border-amber/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber transition-colors hover:bg-amber hover:text-void focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                          ar ? 'font-ar tracking-normal' : ''
                        }`}
                      >
                        {t.lineup.detailsCta}
                        <span aria-hidden>{ar ? '◂' : '▸'}</span>
                      </a>
                    </>
                  )}
                </span>
              </div>
            );
          })}
          </div>
        </div>

        {/* ── Mobile: stacked manifest cards ───────────────────────────── */}
        <div className="space-y-4 md:hidden">
          {sorted.map((ev) => {
            const pending = ev.tba;
            const tix = ticketsHref(ev);
            return (
              <div key={ev.id} className="border border-line bg-panel/40 p-4">
                <div className="mb-3 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em]">
                  <span className="font-mono text-amber/80">{containerCode(ev.dateISO)}</span>
                  <span
                    className={`stamp ${
                      pending ? 'text-hazard' : 'text-phosphor'
                    } ${ar ? 'font-ar tracking-normal' : ''}`}
                  >
                    {pending ? t.lineup.statusPending : t.lineup.statusBoarding}
                  </span>
                </div>
                <div
                  className={`mb-1 text-xl font-bold ${pending ? 'text-muted' : 'text-amber glow'} ${
                    ar ? 'font-ar' : 'tracking-wide'
                  }`}
                >
                  {pending ? t.lineup.tba : ev.artist}
                </div>
                <div className={`mb-3 text-sm text-ink/90 ${ar ? 'font-ar' : ''}`}>
                  {pending ? '—' : formatEventDate(ev.dateISO, lang)}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {ev.bay}
                  </span>
                  {!pending && (
                    <span className="flex items-center gap-2">
                      {tix ? (
                        <a
                          href={tix}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.lineup.ticketsCta} — ${ar ? ev.artistAr : ev.artist}`}
                          className={`inline-flex min-h-[44px] items-center gap-1.5 border border-amber bg-amber px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-void transition-colors hover:bg-amber-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                            ar ? 'font-ar tracking-normal' : ''
                          }`}
                        >
                          {t.lineup.ticketsCta}
                        </a>
                      ) : (
                        // No ticket URL yet → visible non-link "on sale soon" placeholder.
                        <span
                          aria-disabled="true"
                          className={`inline-flex min-h-[44px] cursor-default items-center gap-1.5 border border-amber/40 bg-amber/5 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-amber/80 ${
                            ar ? 'font-ar tracking-normal' : ''
                          }`}
                        >
                          {t.event.ticketsSoon}
                        </span>
                      )}
                      <a
                        href={`/events/${ev.id}/`}
                        className={`inline-flex min-h-[44px] items-center gap-1.5 border border-amber px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-amber transition-colors hover:bg-amber hover:text-void focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                          ar ? 'font-ar tracking-normal' : ''
                        }`}
                      >
                        {t.lineup.detailsCta}
                        <span aria-hidden>{ar ? '◂' : '▸'}</span>
                      </a>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className={`mt-6 max-w-3xl text-xs leading-relaxed text-muted ${ar ? 'font-ar' : ''}`}>
          <span className="text-hazard" aria-hidden>
            ⚠{' '}
          </span>
          {t.lineup.note}
        </p>
      </div>
    </section>
  );
}

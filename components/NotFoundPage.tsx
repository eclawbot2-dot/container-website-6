'use client';

import { useLang } from './LangProvider';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Branded bilingual 404 — replaces Next's default not-found page, whose
 * inlined `color:#000` is invisible on this site's near-black body.
 * Styled as a "lost cargo" manifest error to match the terminal design.
 */
export function NotFoundPage() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';

  return (
    <div className="scanlines min-h-screen">
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center border-b border-line bg-grid px-4 py-24 sm:px-6">
        <div className="max-w-xl text-center">
          <p className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.22em]">
            <span className="stamp text-hazard" dir="ltr">
              ERR 404
            </span>
            <span className="stamp text-amber/80" dir="ltr">
              CARGO LOST
            </span>
          </p>
          <h1
            className={`mb-4 text-3xl text-amber glow sm:text-5xl ${
              ar ? 'font-ar font-bold' : 'font-extrabold tracking-tight'
            }`}
          >
            {t.notFound.title}
          </h1>
          <p className={`mb-10 text-sm leading-relaxed text-ink/90 sm:text-base ${ar ? 'font-ar' : ''}`}>
            {t.notFound.body}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className={`inline-flex min-h-[44px] items-center gap-2 border border-amber bg-amber px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-void transition-colors hover:bg-amber-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-void ${
                ar ? 'font-ar tracking-normal' : ''
              }`}
            >
              <span aria-hidden>{ar ? '◂' : '▸'}</span>
              {t.notFound.home}
            </a>
            <a
              href="/#manifest"
              className={`inline-flex min-h-[44px] items-center gap-2 border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-amber hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                ar ? 'font-ar tracking-normal' : ''
              }`}
            >
              <span aria-hidden>◎</span>
              {t.notFound.manifest}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

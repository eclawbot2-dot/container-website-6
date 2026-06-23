'use client';

import { useLang } from './LangProvider';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, CONTACT_EMAIL } from '@/lib/config';

export function Footer() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-void">
      <div className="hazard-tape h-2 w-full opacity-60" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand block */}
          <div>
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-amber glow" aria-hidden>
                ▮
              </span>
              <span
                className={`text-sm font-extrabold uppercase tracking-[0.22em] text-ink ${
                  ar ? 'font-ar' : ''
                }`}
              >
                {ar ? 'ذا كونتينر' : 'THE CONTAINER'}
              </span>
            </div>
            <p className={`max-w-xs text-xs leading-relaxed text-muted ${ar ? 'font-ar' : ''}`}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Follow */}
          <div>
            <h3
              className={`mb-3 text-[10px] uppercase tracking-[0.22em] text-amber/80 ${
                ar ? 'font-ar tracking-normal' : ''
              }`}
            >
              {t.footer.follow}
            </h3>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-amber"
            >
              <span aria-hidden>◎</span>@{INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3
              className={`mb-3 text-[10px] uppercase tracking-[0.22em] text-amber/80 ${
                ar ? 'font-ar tracking-normal' : ''
              }`}
            >
              {t.footer.contact}
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-amber"
            >
              <span aria-hidden>✉</span>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* End-of-manifest divider */}
        <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted">
          <span className="leader" aria-hidden />
          <span className={ar ? 'font-ar tracking-normal' : ''}>{t.footer.endOfManifest}</span>
          <span className="leader" aria-hidden />
        </div>

        <div className="mt-6 flex flex-col gap-2 text-[10px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className={ar ? 'font-ar tracking-normal' : ''}>{t.footer.eventsNote}</span>
          <span className={ar ? 'font-ar tracking-normal' : ''}>
            © {year} THE CONTAINER · {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useLang } from './LangProvider';
import { LangToggle } from './LangToggle';

export function Header() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#manifest', label: t.nav.lineup },
    { href: '#visit', label: t.nav.visit },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2 whitespace-nowrap">
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
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`inline-flex min-h-[44px] items-center text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                ar ? 'font-ar tracking-normal text-sm' : ''
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <LangToggle />
      </div>
    </header>
  );
}

'use client';

import { useLang } from './LangProvider';

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, t, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.langToggle.switchTo}
      title={t.langToggle.switchTo}
      className={`group inline-flex min-h-[44px] items-center gap-2 border border-line bg-panel px-3 py-2 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-amber hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${className}`}
    >
      <span aria-hidden className="text-amber glow">{lang === 'ar' ? '◂' : '▸'}</span>
      <span className={lang === 'ar' ? 'font-ar' : ''}>{t.langToggle.label}</span>
    </button>
  );
}

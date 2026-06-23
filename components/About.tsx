'use client';

import { useLang } from './LangProvider';

function SectionLabel({ index, eyebrow, ar }: { index: string; eyebrow: string; ar: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-amber/90">
      <span className="stamp">{index}</span>
      <span className={ar ? 'font-ar tracking-normal' : ''}>{eyebrow}</span>
      <span className="leader" aria-hidden />
    </div>
  );
}

export function About() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';

  return (
    <section id="about" className="border-b border-line bg-grid">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionLabel index="SEC 01" eyebrow={t.about.eyebrow} ar={ar} />

        <h2
          className={`mb-8 max-w-3xl text-2xl text-ink sm:text-4xl ${
            ar ? 'font-ar font-bold' : 'font-bold leading-tight tracking-tight'
          }`}
        >
          {t.about.title}
        </h2>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div className="space-y-4">
            {t.about.body.map((p, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed text-ink/90 sm:text-base ${ar ? 'font-ar' : ''}`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Spec sheet / cargo data panel */}
          <dl className="divide-y divide-line border border-line bg-panel/50">
            {t.about.stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-1 p-4">
                <dt
                  className={`text-[10px] uppercase tracking-[0.2em] text-muted ${
                    ar ? 'font-ar tracking-normal' : ''
                  }`}
                >
                  {s.label}
                </dt>
                <dd
                  className={`text-amber glow ${
                    ar ? 'font-ar text-lg font-bold' : 'text-lg font-bold tracking-wide'
                  }`}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

'use client';

/**
 * Split-flap / departures-board style text. Each character "flips" into place
 * as soon as the stylesheet loads (pure CSS animation — no JS gate, so the
 * hero H1 is never stuck invisible without JS or before hydration).
 * Respects prefers-reduced-motion (CSS sets animation:none → fully visible).
 */
export function SplitFlap({ text, className = '' }: { text: string; className?: string }) {
  const chars = Array.from(text);

  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`${i}-${ch}`}
          aria-hidden
          className="inline-block min-w-[0.62em] animate-flip overflow-hidden text-center"
          style={{ animationDelay: `${Math.min(i * 45, 900)}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

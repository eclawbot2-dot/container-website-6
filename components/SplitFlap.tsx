'use client';

import { useEffect, useState } from 'react';

/**
 * Split-flap / departures-board style text. Each character "flips" into place
 * on mount. Respects prefers-reduced-motion (CSS handles the no-anim case).
 */
export function SplitFlap({ text, className = '' }: { text: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const chars = Array.from(text);

  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`${i}-${ch}`}
          aria-hidden
          className={`inline-block min-w-[0.62em] overflow-hidden text-center ${
            mounted ? 'animate-flip' : 'opacity-0'
          }`}
          style={{ animationDelay: `${Math.min(i * 45, 900)}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

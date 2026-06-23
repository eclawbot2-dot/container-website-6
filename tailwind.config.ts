import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Near-black port-terminal background
        void: '#070806',
        panel: '#0d0f0c',
        steel: '#1a1d18',
        line: '#2a2e25',
        // Phosphor amber (primary terminal glow)
        amber: {
          DEFAULT: '#ffb000',
          dim: '#9c6a00',
          soft: '#ffcd57',
        },
        // CRT green (secondary readout)
        phosphor: '#37ff8b',
        // Hazard / status accents
        hazard: '#ff5a1f',
        ink: '#c9c2ad',
        // Bumped from #6f6a58 (3.71:1, fails AA) to #8a8470 (5.37:1) so the
        // many small mono labels/captions clear WCAG AA on the near-black bg.
        muted: '#8a8470',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        ar: ['var(--font-ar)', 'var(--font-mono)', 'monospace'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.86' },
        },
        flip: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 4s ease-in-out infinite',
        flip: 'flip 0.4s ease-out both',
        scan: 'scan 7s linear infinite',
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;

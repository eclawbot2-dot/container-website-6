import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/components/LangProvider';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ar',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THE CONTAINER · Jeddah · Red Sea Port',
  description:
    "Jeddah's industrial techno & house venue on the Red Sea port. Live electronic music at Shams Container Terminal.",
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'THE CONTAINER · Jeddah',
    description: "Jeddah's industrial techno & house venue on the Red Sea port.",
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#070806',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${mono.variable} ${arabic.variable}`}>
      <head>
        {/* Pre-paint: apply the saved language's dir/lang before first paint so
            returning Arabic visitors don't flash English LTR (static export
            serves lang=en by default; LangProvider re-syncs after hydration). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('container6.lang');if(l==='ar'){var e=document.documentElement;e.lang='ar';e.dir='rtl';}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-void font-mono antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

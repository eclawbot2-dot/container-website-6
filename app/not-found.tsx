import type { Metadata } from 'next';
import { NotFoundPage } from '@/components/NotFoundPage';

// Server wrapper: keeps the metadata export legal (NotFoundPage is a client
// component) — with output:'export' this title + noindex land in out/404.html,
// which Vercel serves for every unknown path.
export const metadata: Metadata = {
  title: 'Page not found · THE CONTAINER',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage />;
}

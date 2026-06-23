import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Manifest } from '@/components/Manifest';
import { Visit } from '@/components/Visit';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <div className="scanlines min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Manifest />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}

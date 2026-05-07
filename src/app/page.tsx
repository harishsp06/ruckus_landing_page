import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Features from '@/components/Features';
import Marquee from '@/components/Marquee';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import ThemeBadge from '@/components/ThemeBadge';

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <Hero />
      <Problem />
      <Features />
      <Marquee />
      <Waitlist />
      <Footer />
      <ThemeBadge />
    </>
  );
}

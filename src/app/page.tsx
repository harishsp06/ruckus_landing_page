import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Features from '@/components/Features';
import MobileFeatureCarousel from '@/components/MobileFeatureCarousel';
import Marquee from '@/components/Marquee';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import ThemeBadge from '@/components/ThemeBadge';
import MobileDetect from '@/components/MobileDetect';

export default function Home() {
  return (
    <>
      <MobileDetect />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <Hero />
      <Problem />
      <Features />
      <MobileFeatureCarousel />
      <Marquee />
      <Waitlist />
      <Footer />
      <ThemeBadge />
    </>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const crowdRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.4)' },
      '-=0.3'
    );

    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(crowdRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    );

    // Crowd parallax on scroll
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (crowdRef.current) gsap.set(crowdRef.current, { y: self.progress * -80 });
      },
    });

    // Beams fade on scroll
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: '80% top',
      scrub: 0.5,
      onUpdate: (self) => {
        if (beamsRef.current) gsap.set(beamsRef.current, { opacity: 1 - self.progress * 0.6 });
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg" aria-hidden="true" />

      <div className="beams" aria-hidden="true" ref={beamsRef}>
        <div className="beam beam-1" />
        <div className="beam beam-2" />
        <div className="beam beam-3" />
        <div className="beam beam-4" />
        <div className="beam beam-5" />
      </div>

      <div className="hero-floor" aria-hidden="true" />

      <div className="hero-crowd" aria-hidden="true" ref={crowdRef} style={{ opacity: 0 }}>
        <Image
          src="/crowd_illustration.png"
          alt=""
          width={1800}
          height={600}
          style={{ width: '100%', maxWidth: 1800, height: 'auto' }}
          priority
        />
      </div>

      <div className="hero-center">
        <div className="hero-eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>
          <span className="live-dot" />
          Launching NYC — Summer 2026
        </div>

        <Image
          ref={logoRef}
          src="/ruckus_logo_main.png"
          alt="RUCKUS"
          className="hero-main-logo"
          width={540}
          height={540}
          priority
          style={{ opacity: 0 }}
        />

        <p className="hero-tagline" ref={taglineRef} style={{ opacity: 0 }}>
          Real-time crowd intel. Crew coordination.<br />
          <em>NYC nightlife, finally figured out.</em>
        </p>
      </div>
    </section>
  );
}

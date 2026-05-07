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
  const statsRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const crowdRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Eyebrow fades in
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    // Logo scales in from below
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.4)' },
      '-=0.3'
    );

    // Tagline slides up
    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );

    // Stats stagger in
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat, .stat-divider');
      tl.fromTo(statItems,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // CTAs pop in
    if (ctasRef.current) {
      const btns = ctasRef.current.querySelectorAll('.btn');
      tl.fromTo(btns,
        { opacity: 0, scale: 0.9, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.2'
      );
    }

    // Crowd illustration slides up
    tl.fromTo(crowdRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    );

    // Parallax crowd on scroll
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (crowdRef.current) {
          gsap.set(crowdRef.current, { y: self.progress * -80 });
        }
      },
    });

    // Hero scale-out on scroll
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: '80% top',
      scrub: 0.5,
      onUpdate: (self) => {
        if (beamsRef.current) {
          gsap.set(beamsRef.current, { opacity: 1 - self.progress * 0.6 });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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

        <div className="hero-stats" ref={statsRef}>
          <div className="stat">
            <span className="stat-val" data-target="500">0</span>
            <span className="stat-label">Venues mapped</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-val" data-target="60">0</span>
            <span className="stat-label">Sec updates</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-val">NYC</span>
            <span className="stat-label">First city</span>
          </div>
        </div>
      </div>

      <div className="hero-ctas" ref={ctasRef}>
        <a href="#waitlist" className="btn btn-primary btn-lg">
          Join the waitlist
        </a>
        <a href="#features" className="btn btn-ghost btn-lg">
          See how it works
        </a>
      </div>
    </section>
  );
}

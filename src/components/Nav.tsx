'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // GSAP entrance animation
    const tl = gsap.timeline();
    tl.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className={`nav-container ${scrolled ? 'scrolled' : ''}`}
        style={{ opacity: 0 }}
      >
        <a href="#" className="nav-logo">
          <Image src="/ruckus_logo_white.png" alt="RUCKUS" width={130} height={52} style={{ height: 52, width: 'auto' }} />
        </a>
        <ul className="nav-links">
          <li><a href="#problem">The Problem</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#waitlist">Waitlist</a></li>
        </ul>
        <div className="nav-right">
          <a href="#waitlist" className="btn btn-primary btn-sm">Join the waitlist</a>
          <button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <a href="#problem" onClick={closeMenu}>The Problem</a>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#waitlist" onClick={closeMenu}>Waitlist</a>
        <a href="#waitlist" className="btn btn-primary btn-md" onClick={closeMenu}>Join the waitlist</a>
      </div>
    </>
  );
}

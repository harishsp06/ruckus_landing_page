'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ opacity: 0 }}>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src="/ruckus_logo_white.png"
              alt="RUCKUS"
              className="footer-logo"
              width={100}
              height={44}
              style={{ height: 44, width: 'auto' }}
            />
            <p className="footer-tagline">Your night, handled.</p>
          </div>
          <div className="footer-links-group">
            <div className="footer-links-col">
              <div className="footer-links-col-title">Product</div>
              <a href="#features">Features</a>
              <a href="#waitlist">Waitlist</a>
            </div>
            <div className="footer-links-col">
              <div className="footer-links-col-title">Company</div>
              <a href="mailto:hello@ruckusapp.co">Contact</a>
              <a href="#">Press</a>
            </div>
            <div className="footer-links-col">
              <div className="footer-links-col-title">Legal</div>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 RUCKUS. Made in <span>NYC</span>.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="TikTok">tt</a>
            <a href="#" aria-label="Twitter/X">𝕏</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

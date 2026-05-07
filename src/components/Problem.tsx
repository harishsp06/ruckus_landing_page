'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: isMobile ? 0 : -60, y: isMobile ? 40 : 0 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: isMobile ? 0 : 60, y: isMobile ? 40 : 0 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out',
          delay: isMobile ? 0.12 : 0,
          scrollTrigger: {
            trigger: isMobile ? sectionRef.current : rightRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (rightRef.current) {
        const items = rightRef.current.querySelectorAll('.problem-item');
        gsap.fromTo(items,
          { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 24 : 0 },
          {
            opacity: 1, x: 0, y: 0, duration: 0.5, stagger: 0.13, ease: 'power2.out',
            scrollTrigger: {
              trigger: isMobile ? sectionRef.current : rightRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="problem-section" id="problem" ref={sectionRef}>
      <div className="wrap">
        <div className="problem-grid">
          <div className="problem-left" ref={leftRef} style={{ opacity: 0 }}>
            <div className="section-label">The problem</div>
            <h2>Going out<br />shouldn&apos;t be<br />this hard.</h2>
            <p className="problem-sub">
              You&apos;ve been there. The group chat chaos, the dead bar, the two-hour line
              you didn&apos;t know about until you were already in the Uber.
            </p>
          </div>
          <div className="problem-right" ref={rightRef} style={{ opacity: 0 }}>
            <p className="problem-quote">
              &ldquo;You shouldn&apos;t need three group chats and a Google Doc to figure out where to get drinks.&rdquo;
            </p>
            <div className="problem-items">
              <div className="problem-item">
                <span className="problem-icon">🚶</span>
                <div>
                  <div className="problem-item-q">You never know if it&apos;s packed until you&apos;re there.</div>
                  <div className="problem-item-a">Live crowd levels, updated every 60 seconds.</div>
                </div>
              </div>
              <div className="problem-item">
                <span className="problem-icon">💬</span>
                <div>
                  <div className="problem-item-q">The group chat becomes 47 unanswered messages.</div>
                  <div className="problem-item-a">One place to decide. Drop a pin and go.</div>
                </div>
              </div>
              <div className="problem-item">
                <span className="problem-icon">🗺️</span>
                <div>
                  <div className="problem-item-q">You don&apos;t know what&apos;s good in a neighborhood.</div>
                  <div className="problem-item-a">The whole city mapped and pinging live.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = ['MAKE A RUCKUS', 'MAKE A RUCKUS', 'MAKE A RUCKUS', 'MAKE A RUCKUS',
               'MAKE A RUCKUS', 'MAKE A RUCKUS', 'MAKE A RUCKUS', 'MAKE A RUCKUS'];

export default function Marquee() {
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(bandRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: bandRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div className="marquee-band" aria-hidden="true" ref={bandRef} style={{ opacity: 0 }}>
      <div className="marquee-track">
        {items.flatMap((text, i) => [
          <div key={`${i}-f`} className={`marquee-item ${i % 2 === 0 ? 'filled' : 'outline'}`}>
            {text}
          </div>,
          <div key={`${i}-d`} className="marquee-item">
            <span className="marquee-dot" />
          </div>,
        ])}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MobileFeatureCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.m-feature-intro',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo('.m-fcard',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    const rail = railRef.current;
    const updateDots = () => {
      if (!rail || !dotsRef.current) return;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      if (maxScroll <= 0) return;
      const index = Math.round((rail.scrollLeft / maxScroll) * 2);
      dotsRef.current.querySelectorAll('.m-rail-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    };
    rail?.addEventListener('scroll', updateDots, { passive: true });

    return () => {
      ctx.revert();
      rail?.removeEventListener('scroll', updateDots);
    };
  }, []);

  return (
    <section className="m-feature-section" ref={sectionRef}>
      <div className="m-feature-intro">
        <div className="section-label" style={{ justifyContent: 'center' }}>What you get</div>
        <h2>Three things,<br />done right.</h2>
        <p>Swipe to explore →</p>
      </div>

      <div className="m-feature-rail" ref={railRef}>
        {/* Card 1 — Live crowd intel */}
        <div className="m-fcard">
          <div className="section-label">01 — Know before you go</div>
          <h3>Live crowd intel.</h3>
          <p className="m-fbody">Real-time crowd levels, wait times, and vibe checks from people actually there.</p>
          <div className="m-fphone">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1a1018 0%,#0a0508 100%)', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: 13, lineHeight: 1 }}>What&apos;s the move?</div>
                  <div style={{ fontSize: 8, color: 'var(--muted)', marginTop: 3 }}>Bars near you tonight</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(255,46,147,0.15)', border: '1px solid rgba(255,46,147,0.3)', padding: '3px 6px', borderRadius: 8 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF2E93', display: 'block' }} />
                  <span style={{ fontSize: 7, fontWeight: 700, color: '#FF2E93' }}>LIVE</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 8, padding: '3px 8px', borderRadius: 10, background: 'var(--orange)', color: '#fff' }}>All</span>
                <span style={{ fontSize: 8, padding: '3px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', color: 'var(--muted)' }}>Nearby</span>
                <span style={{ fontSize: 8, padding: '3px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', color: 'var(--muted)' }}>Open</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                {[
                  { emoji: '🍸', name: 'Employees Only', hood: 'West Village', bars: [1,1,1,1,1], colors: ['orange','orange','orange','pink','pink'] },
                  { emoji: '🎧', name: 'House of Yes', hood: 'Bushwick', bars: [1,1,1,0,0], colors: ['orange','orange','orange','dim','dim'] },
                  { emoji: '🌃', name: '230 Fifth', hood: 'Midtown', bars: [1,1,0,0,0], colors: ['orange','orange','dim','dim','dim'] },
                ].map((venue) => (
                  <div key={venue.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                    <div style={{ width: 24, height: 24, background: 'rgba(255,94,26,0.15)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{venue.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 9, color: 'var(--cream)', fontWeight: 600 }}>{venue.name}</div>
                      <div style={{ fontSize: 7, color: 'var(--muted)' }}>{venue.hood}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 1.5 }}>
                      {venue.colors.map((c, i) => (
                        <span key={i} style={{ width: 3, height: 8, background: c === 'orange' ? 'var(--orange)' : c === 'pink' ? '#FF2E93' : 'rgba(255,255,255,0.1)', borderRadius: 1, display: 'block' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Crew coordination */}
        <div className="m-fcard">
          <div className="section-label">02 — Get your crew together</div>
          <h3>One link.<br />Whole night planned.</h3>
          <p className="m-fbody">No more group chat chaos. Vote on spots, share pins, see who&apos;s omw.</p>
          <div className="m-fphone">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1a1018 0%,#0a0508 100%)', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: 14 }}>Social</span>
                <span style={{ fontSize: 8, color: 'var(--orange)', fontWeight: 700 }}>＋ New night</span>
              </div>
              <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid var(--line)', paddingBottom: 6 }}>
                <span style={{ fontSize: 8, color: 'var(--orange)', fontWeight: 700 }}>Parties (2)</span>
                <span style={{ fontSize: 8, color: 'var(--muted)' }}>Friends (5)</span>
              </div>
              {[
                { emoji: '🎉', name: 'Friday Squad', meta: 'Sat · House of Yes', badge: 'active', color: '#22c55e' },
                { emoji: '🎉', name: 'Birthday Bash', meta: 'Fri · TBD', badge: 'planned', color: 'var(--orange)' },
              ].map((party) => (
                <div key={party.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                  <span style={{ fontSize: 14 }}>{party.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: 'var(--cream)', fontWeight: 600 }}>{party.name}</div>
                    <div style={{ fontSize: 7, color: 'var(--muted)' }}>{party.meta}</div>
                  </div>
                  <span style={{ fontSize: 7, background: `${party.color}33`, color: party.color, padding: '2px 5px', borderRadius: 6 }}>{party.badge}</span>
                </div>
              ))}
              <div style={{ fontSize: 7, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginTop: 4 }}>Your crew</div>
              {[
                { initials: 'JD', bg: '#22c55e', name: 'Jordan D.', status: 'omw 🏃' },
                { initials: 'AK', bg: '#22c55e', name: 'Alex K.', status: 'at House of Yes' },
                { initials: 'MS', bg: '#444', name: 'Marcus S.', status: 'leaving soon' },
              ].map((friend) => (
                <div key={friend.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: friend.bg, color: '#fff', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{friend.initials}</div>
                  <div>
                    <div style={{ fontSize: 8, color: 'var(--cream)' }}>{friend.name}</div>
                    <div style={{ fontSize: 7, color: 'var(--muted)' }}>{friend.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3 — Map */}
        <div className="m-fcard">
          <div className="section-label">03 — See the whole city</div>
          <h3>The entire city,<br />pinging live.</h3>
          <p className="m-fbody">Every bar, club, rooftop, and dive on one real-time map. Hot spots glow louder.</p>
          <div className="m-fphone">
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#FFF8EF 0%,#F5EDE0 100%)' }} />
              <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <rect x="0" y="0" width="100" height="130" fill="#C9DFEB" />
                <path d="M 38 0 L 58 0 L 60 18 L 56 35 L 52 52 L 48 70 L 44 88 L 40 105 L 36 125 L 30 130 L 24 130 L 22 115 L 26 95 L 30 75 L 32 55 L 34 38 L 36 20 Z" fill="#FFF8EF" />
                <path d="M 65 30 L 100 28 L 100 130 L 50 130 L 46 110 L 50 92 L 56 75 L 62 55 Z" fill="#FFF8EF" />
                <ellipse cx="68" cy="82" rx="4" ry="6" fill="#C9E4C5" />
                <line x1="32" y1="15" x2="38" y2="108" stroke="#fff" strokeWidth="1.2" />
                <line x1="40" y1="15" x2="46" y2="108" stroke="#fff" strokeWidth="1.2" />
                <line x1="48" y1="15" x2="54" y2="108" stroke="#fff" strokeWidth="1.2" />
                <line x1="68" y1="32" x2="72" y2="125" stroke="#fff" strokeWidth="1.2" />
                <line x1="78" y1="32" x2="82" y2="125" stroke="#fff" strokeWidth="1.2" />
              </svg>
              <div style={{ position: 'absolute', top: '22%', left: '42%', width: 14, height: 14, borderRadius: '50%', background: '#FF2E93', border: '2px solid #fff', boxShadow: '0 0 0 4px rgba(255,46,147,0.25)' }} />
              <div style={{ position: 'absolute', top: '38%', left: '54%', width: 12, height: 12, borderRadius: '50%', background: 'var(--orange)', border: '2px solid #fff', boxShadow: '0 0 0 3px rgba(255,94,26,0.25)' }} />
              <div style={{ position: 'absolute', top: '55%', left: '62%', width: 10, height: 10, borderRadius: '50%', background: 'var(--orange)', border: '2px solid #fff' }} />
              <div style={{ position: 'absolute', top: '28%', left: '35%', width: 10, height: 10, borderRadius: '50%', background: 'var(--orange)', border: '2px solid #fff' }} />
              <div style={{ position: 'absolute', bottom: 14, left: 8, right: 8, background: '#fff', borderRadius: 10, padding: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>🎧</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, color: '#1A130A', fontWeight: 700 }}>House of Yes</div>
                  <div style={{ fontSize: 7, color: '#7A6656' }}>🔥 very hot</div>
                </div>
                <span style={{ fontSize: 7, color: 'var(--orange)', fontWeight: 700 }}>View</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-rail-dots" ref={dotsRef}>
        <span className="m-rail-dot active" />
        <span className="m-rail-dot" />
        <span className="m-rail-dot" />
      </div>
    </section>
  );
}

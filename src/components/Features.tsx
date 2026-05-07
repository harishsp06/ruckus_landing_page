'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CrowdBar({ filled, hot = false }: { filled: number; hot?: boolean }) {
  return (
    <div className="crowd-bar">
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          className={`crowd-seg ${i < filled ? 'filled' : ''} ${hot && i >= 3 && i < filled ? 'hot' : ''}`}
        />
      ))}
    </div>
  );
}

function PhoneWhatsMoveAndrew() {
  return (
    <div className="feat-phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="wtm-hdr">
          <div>
            <div className="wtm-hdr-title">What&apos;s the move?</div>
            <div className="wtm-hdr-sub">Bars near you tonight</div>
          </div>
          <span className="live-badge"><span className="red-dot" />LIVE</span>
        </div>
        <div className="chip-row">
          <span className="chip active">All</span>
          <span className="chip">Nearby</span>
          <span className="chip">Open now</span>
          <span className="chip">Cocktails</span>
        </div>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {[
            { emoji: '🍸', name: 'Employees Only', meta: 'West Village · cocktail bar', filled: 5, hot: true },
            { emoji: '🎧', name: 'House of Yes', meta: 'Bushwick · nightclub', filled: 3 },
            { emoji: '🌃', name: '230 Fifth Rooftop', meta: 'Midtown · rooftop bar', filled: 2 },
            { emoji: '🍺', name: 'The Dead Rabbit', meta: 'Financial District · bar', filled: 4 },
            { emoji: '🎤', name: 'Brooklyn Bowl', meta: 'Williamsburg · live music', filled: 1 },
          ].map((v) => (
            <div className="pb-row" key={v.name}>
              <div className="pb-emoji-box">{v.emoji}</div>
              <div className="pb-info">
                <div className="pb-name">{v.name}</div>
                <div className="pb-meta">{v.meta}</div>
              </div>
              <div className="pb-crowd">
                <CrowdBar filled={v.filled} hot={v.hot} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneSocial() {
  return (
    <div className="feat-phone" style={{ height: 530 }}>
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="soc-hdr">
          <span className="soc-hdr-title">Social</span>
          <span className="soc-new-btn">＋ New night</span>
        </div>
        <div className="phone-tab-bar">
          <span className="phone-tab active">Parties (2)</span>
          <span className="phone-tab">Friends (5)</span>
        </div>
        <div className="party-row">
          <span className="party-emoji">🎉</span>
          <div className="party-info">
            <div className="party-name">Friday Squad</div>
            <div className="party-meta">Sat, Apr 19 · House of Yes</div>
          </div>
          <span className="party-status ps-active">active</span>
        </div>
        <div className="party-row">
          <span className="party-emoji">🎉</span>
          <div className="party-info">
            <div className="party-name">Birthday Bash</div>
            <div className="party-meta">Fri, Apr 25 · TBD</div>
          </div>
          <span className="party-status ps-planned">planned</span>
        </div>
        <div style={{ padding: '7px 13px 5px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Your crew</div>
        </div>
        {[
          { initials: 'JD', name: 'Jordan Davis', handle: '@jordand · omw 🏃', online: true },
          { initials: 'AK', name: 'Alex Kim', handle: '@alexk · at House of Yes', online: true },
          { initials: 'MS', name: 'Marcus S.', handle: '@marcuss · leaving soon', online: false },
          { initials: 'RP', name: 'Riley P.', handle: '@rileyp · not out yet', online: false },
        ].map((f) => (
          <div className="friend-row" key={f.initials}>
            <div className={`friend-av ${f.online ? 'friend-av-online' : ''}`}>{f.initials}</div>
            <div className="friend-info">
              <div className="friend-name">{f.name}</div>
              <div className="friend-handle">{f.handle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneMap() {
  return (
    <div className="feat-phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="phone-tab-bar">
          <span className="phone-tab">Featured</span>
          <span className="phone-tab active">Map 🗺️</span>
        </div>
        <div className="map-screen">
          <svg className="map-svg" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice">
            <rect x="0" y="0" width="100" height="130" className="map-water" />
            <path d="M 38 0 L 58 0 L 60 18 L 56 35 L 52 52 L 48 70 L 44 88 L 40 105 L 36 125 L 30 130 L 24 130 L 22 115 L 26 95 L 30 75 L 32 55 L 34 38 L 36 20 Z" className="map-land" />
            <path d="M 65 30 L 100 28 L 100 130 L 50 130 L 46 110 L 50 92 L 56 75 L 62 55 Z" className="map-land" />
            <rect x="34" y="30" width="6" height="16" className="map-park" rx="0.5" />
            <ellipse cx="68" cy="82" rx="4" ry="6" className="map-park" />
            <line x1="32" y1="15" x2="38" y2="108" className="map-street-major" />
            <line x1="36" y1="15" x2="42" y2="108" className="map-street-major" />
            <line x1="40" y1="15" x2="46" y2="108" className="map-street-major" />
            <line x1="44" y1="15" x2="50" y2="108" className="map-street-major" />
            <line x1="48" y1="15" x2="54" y2="108" className="map-street-major" />
            <line x1="52" y1="15" x2="58" y2="108" className="map-street-major" />
            <line x1="30" y1="25" x2="58" y2="22" className="map-street-minor" />
            <line x1="30" y1="35" x2="58" y2="32" className="map-street-minor" />
            <line x1="30" y1="45" x2="58" y2="42" className="map-street-minor" />
            <line x1="32" y1="55" x2="58" y2="52" className="map-street-minor" />
            <line x1="34" y1="65" x2="58" y2="62" className="map-street-minor" />
            <line x1="36" y1="75" x2="58" y2="72" className="map-street-minor" />
            <line x1="38" y1="85" x2="58" y2="82" className="map-street-minor" />
            <line x1="40" y1="95" x2="58" y2="92" className="map-street-minor" />
            <line x1="60" y1="45" x2="100" y2="50" className="map-street-minor" />
            <line x1="58" y1="60" x2="100" y2="65" className="map-street-minor" />
            <line x1="54" y1="75" x2="100" y2="80" className="map-street-minor" />
            <line x1="50" y1="90" x2="100" y2="95" className="map-street-minor" />
            <line x1="48" y1="105" x2="100" y2="110" className="map-street-minor" />
            <line x1="68" y1="32" x2="72" y2="125" className="map-street-major" />
            <line x1="78" y1="32" x2="82" y2="125" className="map-street-major" />
            <line x1="88" y1="32" x2="92" y2="125" className="map-street-major" />
            <text x="38" y="40" className="map-hood-label">UWS</text>
            <text x="44" y="56" className="map-hood-label">MIDTOWN</text>
            <text x="43" y="72" className="map-hood-label">SOHO</text>
            <text x="42" y="88" className="map-hood-label">LES</text>
            <text x="68" y="58" className="map-hood-label">WBG</text>
            <text x="66" y="95" className="map-hood-label">PARK SLOPE</text>
            <text x="82" y="50" className="map-hood-label">BUSHWICK</text>
          </svg>
          <div className="map-pin mp-orange" style={{ width: 14, height: 14, top: '28%', left: '35%' }} />
          <div className="map-pin mp-orange" style={{ width: 12, height: 12, top: '55%', left: '62%' }} />
          <div className="map-pin mp-orange" style={{ width: 16, height: 16, top: '38%', left: '54%' }} />
          <div className="map-pin mp-pink"   style={{ width: 18, height: 18, top: '22%', left: '42%' }} />
          <div className="map-pin mp-pink"   style={{ width: 10, height: 10, top: '48%', left: '72%' }} />
          <div className="map-pin mp-muted"  style={{ width: 9, height: 9, top: '60%', left: '25%' }} />
          <div className="map-pin mp-muted"  style={{ width: 9, height: 9, top: '32%', left: '22%' }} />
          <div className="map-label" style={{ top: '13%', left: '43%' }}>House of Yes 🔥</div>
          <div className="map-label" style={{ top: '42%', left: '32%' }}>Employees Only</div>
          <div style={{ position: 'absolute', top: '52%', left: '48%', width: 12, height: 12, borderRadius: '50%', background: '#3B82F6', border: '2px solid #fff', boxShadow: '0 0 0 4px rgba(59,130,246,0.25)', transform: 'translate(-50%,-50%)' }} />
          <div className="bs-peek">
            <div className="bs-handle" />
            <div className="bs-row">
              <span className="bs-emoji">🎧</span>
              <div className="bs-info">
                <div className="bs-name">House of Yes</div>
                <div className="bs-meta">Bushwick · nightclub · 🔥 very hot</div>
              </div>
              <span className="bs-view">View</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    label: '01 — Know before you go',
    h2: 'Live crowd intel.\nNo more dead bars.',
    body: 'Stop showing up to a ghost town or a two-hour line. RUCKUS pulls real-time crowd levels, wait times, and vibe checks from people who are actually there right now.',
    pills: [
      { dot: 'orange', text: 'Crowd levels updating live' },
      { dot: 'pink',   text: 'Hot venue alerts' },
      { dot: 'green',  text: 'Wait time estimates' },
    ],
    phone: <PhoneWhatsMoveAndrew />,
    flip: false,
  },
  {
    label: '02 — Get your crew together',
    h2: 'One link.\nThe whole night planned.',
    body: 'No more group chat chaos. Create a night, drop your crew in, vote on spots, share pins. Works for two people or twenty. No app required for your friends — but they\'ll want it.',
    pills: [
      { dot: 'green',  text: 'See who\'s online and omw' },
      { dot: 'orange', text: 'Venue voting, no drama' },
      { dot: 'pink',   text: 'Drop a pin, not an address' },
    ],
    phone: <PhoneSocial />,
    flip: true,
  },
  {
    label: '03 — See the whole city',
    h2: 'The entire city,\npinging live.',
    body: 'Every bar, club, rooftop, and dive in NYC on one real-time map. Filter by vibe or neighborhood. Hot spots glow louder. See exactly where your friends are.',
    pills: [
      { dot: 'orange', text: 'Live heat — hot spots glow brighter' },
      { dot: 'green',  text: 'Filter by vibe or neighborhood' },
      { dot: 'pink',   text: 'See where your friends are' },
    ],
    phone: <PhoneMap />,
    flip: false,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each feature block
      const featureEls = sectionRef.current?.querySelectorAll('.feature');
      featureEls?.forEach((el) => {
        const textEl = el.querySelector('.feature-text');
        const phoneEl = el.querySelector('.phone-wrap');
        const isFlip = el.classList.contains('flip');

        gsap.fromTo(textEl,
          { opacity: 0, x: isFlip ? 60 : -60 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(phoneEl,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Stagger pills
        const pills = el.querySelectorAll('.feature-pill');
        gsap.fromTo(pills,
          { opacity: 0, x: isFlip ? 20 : -20 },
          {
            opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="features-section" id="features" ref={sectionRef}>
      <div className="wrap">
        {features.map((f, i) => (
          <div key={i} className={`feature ${f.flip ? 'flip' : ''}`}>
            <div className="feature-text" style={{ opacity: 0 }}>
              <div className="section-label">{f.label}</div>
              <h2 className="feature-h2">
                {f.h2.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < f.h2.split('\n').length - 1 && <br />}</span>
                ))}
              </h2>
              <p className="feature-body">{f.body}</p>
              <div className="feature-pills">
                {f.pills.map((p) => (
                  <div key={p.text} className="feature-pill">
                    <span className={`dot ${p.dot === 'green' ? 'dot-green' : p.dot === 'pink' ? 'dot-pink' : ''}`} />
                    {p.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="phone-wrap" style={{ opacity: 0 }}>
              {f.phone}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

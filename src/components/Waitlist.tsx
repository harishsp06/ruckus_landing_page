'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwOsuusg7veDslBtZbpgGq1jTiAgLfkiVGsXvOi0C_gpOtLc8bAqjLJkVIXtokOu5pK/exec';
const PHONE_RE = /^\(\d{3}\) \d{3}-\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Waitlist() {
  const innerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [phone, setPhone]         = useState('');
  const [email, setEmail]         = useState('');
  const [error, setError]         = useState('');
  const [invalid, setInvalid]     = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(innerRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: {
            trigger: innerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Pulsing orb via GSAP
      gsap.to(orbRef.current, {
        scale: 1.15, opacity: 1,
        duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  function formatPhone(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (!digits) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setInvalid(null);

    if (!firstName.trim()) { setInvalid('first'); setError('First name is required.'); return; }
    if (!lastName.trim())  { setInvalid('last');  setError('Last name is required.');  return; }
    if (!phone.trim())     { setInvalid('phone'); setError('Phone number is required.'); return; }
    if (!PHONE_RE.test(phone)) { setInvalid('phone'); setError('Enter a 10-digit US number: (555) 555-5555'); return; }
    if (email && !EMAIL_RE.test(email)) { setInvalid('email'); setError('Please enter a valid email address.'); return; }

    setLoading(true);
    const params = new URLSearchParams();
    params.append('first_name', firstName.trim());
    params.append('last_name',  lastName.trim());
    params.append('phone', phone);
    params.append('email', email);

    try {
      await fetch(SHEETS_URL, { method: 'POST', mode: 'no-cors', body: params });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <section className="waitlist-section" id="waitlist">
      <div
        className="waitlist-orb"
        ref={orbRef}
        aria-hidden="true"
        style={{ opacity: 0.8 }}
      />
      <div className="waitlist-inner" ref={innerRef} style={{ opacity: 0 }}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
          Early access
        </div>
        <h2>Your night<br />starts here.</h2>
        <p className="waitlist-sub">NYC Summer 2026. Get early access and be first when we launch.</p>

        {submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 0' }}>
            <div style={{ fontSize: 48 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>You&apos;re on the list.</div>
            <div style={{ fontSize: 14, color: 'var(--muted)' }}>We&apos;ll text you when NYC goes live. Get your crew ready.</div>
          </div>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <input
                className={`form-input ${invalid === 'first' ? 'is-invalid' : ''}`}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
              <input
                className={`form-input ${invalid === 'last' ? 'is-invalid' : ''}`}
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
            <div className="form-row">
              <input
                className={`form-input ${invalid === 'phone' ? 'is-invalid' : ''}`}
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={e => setPhone(formatPhone(e.target.value))}
                autoComplete="tel"
              />
            </div>
            <div className="form-row">
              <input
                className={`form-input ${invalid === 'email' ? 'is-invalid' : ''}`}
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', borderRadius: 12 }}
              >
                {loading ? 'Sending…' : "I'm in"}
              </button>
            </div>
          </form>
        )}

        <p className="waitlist-note">No spam. No BS. Just your night, handled.</p>
      </div>
    </section>
  );
}

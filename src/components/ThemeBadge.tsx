'use client';

import { useEffect, useState } from 'react';

function isDay(): boolean {
  const h = new Date().getHours();
  return h >= 8 && h < 17;
}

export default function ThemeBadge() {
  const [day, setDay] = useState(false);

  useEffect(() => {
    function apply() {
      const d = isDay();
      setDay(d);
      document.documentElement.setAttribute('data-theme', d ? 'light' : '');
    }
    apply();
    const id = setInterval(apply, 60000);
    return () => clearInterval(id);
  }, []);

  function toggle() {
    setDay(prev => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? 'light' : '');
      return next;
    });
  }

  return (
    <button className="theme-badge" onClick={toggle} aria-label="Toggle theme">
      <span style={{ fontSize: 14 }}>{day ? '☀️' : '🌙'}</span>
      <span>{day ? 'Day mode' : 'Night mode'}</span>
    </button>
  );
}

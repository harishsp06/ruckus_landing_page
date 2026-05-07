'use client';

import { useEffect } from 'react';

export default function MobileDetect() {
  useEffect(() => {
    const update = () => {
      document.body.classList.toggle('is-mobile', window.innerWidth < 768);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return null;
}

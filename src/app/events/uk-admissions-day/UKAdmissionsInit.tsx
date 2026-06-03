'use client';
import { useEffect } from 'react';

export default function UKAdmissionsInit() {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];
    function loadScript(src: string) {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
      scripts.push(s);
    }

    loadScript('/events/js/countdown.js');
    loadScript('/events/js/register-panel.js');
    loadScript('/events/js/event-form.js');
    loadScript('/events/js/spin-wheel-event.js');

    return () => {
      scripts.forEach(s => {
        if (document.body.contains(s)) document.body.removeChild(s);
      });
    };
  }, []);

  return null;
}

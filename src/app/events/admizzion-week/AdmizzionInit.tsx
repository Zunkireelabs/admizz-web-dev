'use client';
import { useEffect } from 'react';

export default function AdmizzionInit() {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    function handleTargetCardClick(e: MouseEvent) {
      const btn = (e.target as Element).closest('.btn-target-register');
      if (!btn) return;
      const panelBtn = document.getElementById('openRegisterPanel');
      if (panelBtn) panelBtn.click();
    }
    document.addEventListener('click', handleTargetCardClick);

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
      document.removeEventListener('click', handleTargetCardClick);
      scripts.forEach(s => {
        if (document.body.contains(s)) document.body.removeChild(s);
      });
    };
  }, []);

  return null;
}

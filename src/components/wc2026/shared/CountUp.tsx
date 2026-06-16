"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export default function CountUp({ value, duration = 1400, className = "", suffix = "" }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;

    startedRef.current = false;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTime = performance.now();
      const tick = (t: number) => {
        const elapsed = t - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(node);

    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={elRef} className={className}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

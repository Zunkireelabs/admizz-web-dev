"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 847, suffix: "+",   prefix: "",      label: "Active affiliates" },
  { value: 2.3, suffix: "M+",  prefix: "NPR ",  label: "Total paid out", decimals: 1 },
  { value: 62,  suffix: "%",   prefix: "",      label: "Reach Rising Star in 3 months" },
  { value: 48,  suffix: " hrs", prefix: "",     label: "Average approval time" },
];

function useCountUp(target: number, active: boolean, duration = 1800, decimals = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();
}

function StatItem({ s, active }: { s: typeof STATS[0]; active: boolean }) {
  const value = useCountUp(s.value, active, 1800, s.decimals ?? 0);
  return (
    <div className="flex flex-col items-center text-center px-4 md:px-6">
      <span
        className="text-3xl md:text-[40px] font-extrabold leading-none mb-2 tracking-tight"
        style={{
          color: "#FDED22",
          textShadow: "0 0 24px rgba(253,237,34,0.25)",
        }}
      >
        {s.prefix}{value}{s.suffix}
      </span>
      <span className="text-[12.5px] md:text-[13px] font-medium leading-snug max-w-[160px]" style={{ color: "rgba(255,255,255,0.5)" }}>
        {s.label}
      </span>
    </div>
  );
}

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="py-20 md:py-24 relative overflow-hidden" style={{ background: "#001353" }}>
      {/* Refined dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(253,237,34,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(49,66,156,0.4) 0%, transparent 70%)" }} />
      {/* Top/bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.4), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(252,183,48,0.2), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Eyebrow header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase"
            style={{
              background: "rgba(253,237,34,0.08)",
              border: "1px solid rgba(253,237,34,0.22)",
              color: "#FDED22",
              letterSpacing: "0.18em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            Live Numbers
          </span>
          <h3 className="mt-5 text-2xl md:text-[32px] font-extrabold text-white leading-tight tracking-tight">
            A program that&apos;s actually working.
          </h3>
        </motion.div>

        {/* Premium stats card */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(0,8,30,0.5)",
            border: "1px solid rgba(252,183,48,0.18)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(49,66,156,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 py-10 md:py-12 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <StatItem s={stat} active={inView} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import GlobeScene from "./GlobeScene";
import type { Destination } from "./data";
import DestinationCard from "./DestinationCard";

/**
 * Lazy-mounted, accessibility-aware mobility globe wrapper.
 * - Falls back to a static placeholder if Three.js fails or motion is reduced
 * - Detects mobile / reduced motion before mounting the scene
 * - Holds the hover state + DOM destination card overlay
 */
export default function MobilityGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const [reducedDetail, setReducedDetail] = useState(false);
  const [staticOnly,    setStaticOnly]    = useState(false);

  const [hoverDest, setHoverDest] = useState<Destination | null>(null);
  const [hoverPos,  setHoverPos]  = useState<{ x: number; y: number } | null>(null);

  // Detect mobile + reduced-motion on mount; track viewport changes
  useEffect(() => {
    const mqlMobile = window.matchMedia("(max-width: 768px)");
    const mqlReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedDetail(mqlMobile.matches);
      setStaticOnly(mqlReduce.matches);
    };
    sync();
    mqlMobile.addEventListener("change", sync);
    mqlReduce.addEventListener("change", sync);
    return () => {
      mqlMobile.removeEventListener("change", sync);
      mqlReduce.removeEventListener("change", sync);
    };
  }, []);

  // Track container size for card placement
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full"
      style={{ minHeight: 320 }}
    >
      <GlobeScene
        reducedDetail={reducedDetail}
        staticOnly={staticOnly}
        onHoverDestination={(d, pos) => {
          setHoverDest(d);
          setHoverPos(pos);
        }}
      />

      <DestinationCard
        destination={hoverDest}
        position={hoverPos}
        containerWidth={size.w}
        containerHeight={size.h}
      />
    </div>
  );
}

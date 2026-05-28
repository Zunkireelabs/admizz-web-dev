import type { LandmarkKey } from "@/data/cities/types";

interface CityLandmarkSvgProps {
  landmarkKey?: LandmarkKey;
  className?: string;
}

/**
 * Stylised silhouettes of city landmarks rendered behind the hero gradient.
 * Pure inline SVG — sub-2KB each, scales cleanly to any size.
 */
export default function CityLandmarkSvg({
  landmarkKey,
  className = "",
}: CityLandmarkSvgProps) {
  if (!landmarkKey) return null;
  if (landmarkKey === "janaki-mandir") {
    return <JanakiMandirSvg className={className} />;
  }
  if (landmarkKey === "ghantaghar") {
    return <GhantagharSvg className={className} />;
  }
  return null;
}

/* --------------------------------------------------------------------- */
/*  Janaki Mandir — three-tiered shikhar silhouette                       */
/* --------------------------------------------------------------------- */

function JanakiMandirSvg({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Ground */}
      <line x1="0" y1="395" x2="800" y2="395" strokeWidth="1.2" />

      {/* Outer wall + boundary */}
      <path
        d="M40 395 L40 320 L760 320 L760 395"
        strokeWidth="1.2"
      />
      <path
        d="M80 320 L80 280 L100 280 L100 320 M120 320 L120 285 M140 320 L140 285 M160 320 L160 280 L180 280 L180 320"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path
        d="M620 320 L620 280 L640 280 L640 320 M660 320 L660 285 M680 320 L680 285 M700 320 L700 280 L720 280 L720 320"
        strokeWidth="0.8"
        opacity="0.7"
      />

      {/* Main entrance gate */}
      <path
        d="M360 320 L360 280 Q360 260 380 260 L420 260 Q440 260 440 280 L440 320"
        strokeWidth="1.4"
      />

      {/* Lower platform */}
      <path
        d="M180 320 L180 270 L620 270 L620 320"
        strokeWidth="1.2"
      />
      <path
        d="M200 270 L200 250 L600 250 L600 270"
        strokeWidth="1.2"
      />

      {/* Side towers (left + right) */}
      <path
        d="M220 250 L220 200 Q220 180 240 180 L280 180 Q300 180 300 200 L300 250"
        strokeWidth="1.4"
      />
      <path d="M250 180 L250 150 L260 145 L270 150 L270 180" strokeWidth="1" />
      <path d="M260 145 L260 130" strokeWidth="1" />
      <circle cx="260" cy="125" r="4" strokeWidth="1" />

      <path
        d="M500 250 L500 200 Q500 180 520 180 L560 180 Q580 180 580 200 L580 250"
        strokeWidth="1.4"
      />
      <path d="M530 180 L530 150 L540 145 L550 150 L550 180" strokeWidth="1" />
      <path d="M540 145 L540 130" strokeWidth="1" />
      <circle cx="540" cy="125" r="4" strokeWidth="1" />

      {/* Central main shikhar — 3 tiers */}
      <path
        d="M310 250 L310 180 L490 180 L490 250"
        strokeWidth="1.4"
      />
      {/* Tier 1 */}
      <path
        d="M340 180 L340 130 Q340 110 360 110 L440 110 Q460 110 460 130 L460 180"
        strokeWidth="1.4"
      />
      {/* Tier 2 — narrower */}
      <path
        d="M360 110 L360 70 Q360 55 380 55 L420 55 Q440 55 440 70 L440 110"
        strokeWidth="1.4"
      />
      {/* Tier 3 — peak */}
      <path
        d="M380 55 L380 30 L400 15 L420 30 L420 55"
        strokeWidth="1.4"
      />
      {/* Finial spire */}
      <path d="M400 15 L400 0" strokeWidth="1" />
      <circle cx="400" cy="-2" r="3" strokeWidth="1" fill="currentColor" />

      {/* Decorative arches under main tower */}
      <path d="M350 250 Q360 230 370 250" strokeWidth="0.7" opacity="0.6" />
      <path d="M380 250 Q390 230 400 250" strokeWidth="0.7" opacity="0.6" />
      <path d="M410 250 Q420 230 430 250" strokeWidth="0.7" opacity="0.6" />
      <path d="M440 250 Q450 230 460 250" strokeWidth="0.7" opacity="0.6" />

      {/* Decorative dots between tiers */}
      <circle cx="350" cy="160" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="450" cy="160" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="370" cy="95" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="430" cy="95" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/*  Ghantaghar — Birgunj's iconic clock tower                             */
/* --------------------------------------------------------------------- */

function GhantagharSvg({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Ground */}
      <line x1="0" y1="495" x2="400" y2="495" strokeWidth="1.2" />

      {/* Base platform */}
      <path d="M100 495 L100 470 L300 470 L300 495" strokeWidth="1.4" />
      <path d="M120 470 L120 450 L280 450 L280 470" strokeWidth="1.2" />

      {/* Tower shaft */}
      <path d="M150 450 L150 200 L250 200 L250 450" strokeWidth="1.4" />

      {/* Vertical pilasters on shaft */}
      <line x1="170" y1="450" x2="170" y2="200" strokeWidth="0.6" opacity="0.5" />
      <line x1="200" y1="450" x2="200" y2="200" strokeWidth="0.6" opacity="0.5" />
      <line x1="230" y1="450" x2="230" y2="200" strokeWidth="0.6" opacity="0.5" />

      {/* Decorative bands */}
      <line x1="150" y1="430" x2="250" y2="430" strokeWidth="0.6" opacity="0.5" />
      <line x1="150" y1="350" x2="250" y2="350" strokeWidth="0.6" opacity="0.5" />
      <line x1="150" y1="270" x2="250" y2="270" strokeWidth="0.6" opacity="0.5" />

      {/* Window arches */}
      <path d="M170 420 Q175 405 180 420" strokeWidth="0.6" opacity="0.6" />
      <path d="M220 420 Q225 405 230 420" strokeWidth="0.6" opacity="0.6" />
      <path d="M170 340 Q175 325 180 340" strokeWidth="0.6" opacity="0.6" />
      <path d="M220 340 Q225 325 230 340" strokeWidth="0.6" opacity="0.6" />

      {/* Clock housing */}
      <path d="M140 200 L140 170 L260 170 L260 200" strokeWidth="1.4" />
      <path d="M150 170 L150 130 L250 130 L250 170" strokeWidth="1.4" />

      {/* Clock face */}
      <circle cx="200" cy="148" r="22" strokeWidth="1.2" />
      <circle cx="200" cy="148" r="2" fill="currentColor" />
      {/* Hands: 10:10 */}
      <line x1="200" y1="148" x2="186" y2="135" strokeWidth="1.4" />
      <line x1="200" y1="148" x2="214" y2="135" strokeWidth="1.4" />
      {/* Tick marks */}
      <line x1="200" y1="130" x2="200" y2="134" strokeWidth="0.8" />
      <line x1="200" y1="162" x2="200" y2="166" strokeWidth="0.8" />
      <line x1="182" y1="148" x2="186" y2="148" strokeWidth="0.8" />
      <line x1="214" y1="148" x2="218" y2="148" strokeWidth="0.8" />

      {/* Roof crown — pyramidal cap */}
      <path d="M150 130 L160 110 L240 110 L250 130" strokeWidth="1.4" />
      <path d="M160 110 L170 90 L230 90 L240 110" strokeWidth="1.2" />
      <path d="M170 90 L200 50 L230 90" strokeWidth="1.4" />

      {/* Spire */}
      <line x1="200" y1="50" x2="200" y2="20" strokeWidth="1.2" />
      <circle cx="200" cy="16" r="3" fill="currentColor" />
      <line x1="200" y1="13" x2="200" y2="2" strokeWidth="0.8" />
      <path d="M196 4 L204 4" strokeWidth="0.8" />
      <path d="M198 0 L202 0" strokeWidth="0.8" />
    </svg>
  );
}

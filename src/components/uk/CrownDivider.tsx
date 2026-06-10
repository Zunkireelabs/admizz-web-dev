export default function CrownDivider({ color = "#B08D57" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center py-8" aria-hidden="true">
      <div className="flex-1 h-px max-w-[140px]" style={{ background: `linear-gradient(to right, transparent, ${color}66)` }} />
      <div className="mx-4">
        <svg viewBox="0 0 80 60" width="44" height="33" fill={color}>
          {/* base band */}
          <rect x="6" y="42" width="68" height="6" rx="1" />
          <rect x="6" y="48" width="68" height="2" />
          {/* gem dots on band */}
          <circle cx="20" cy="45" r="1.5" fill="white" />
          <circle cx="40" cy="45" r="2" fill="white" />
          <circle cx="60" cy="45" r="1.5" fill="white" />
          {/* arches (3 spikes) */}
          <path d="M 8 42 L 14 22 L 20 42 Z" />
          <path d="M 28 42 L 40 14 L 52 42 Z" />
          <path d="M 60 42 L 66 22 L 72 42 Z" />
          {/* tip jewels */}
          <circle cx="14" cy="20" r="2.5" />
          <circle cx="40" cy="12" r="3" />
          <circle cx="66" cy="20" r="2.5" />
          {/* cross on top */}
          <rect x="39" y="2" width="2" height="10" />
          <rect x="36" y="5" width="8" height="2" />
        </svg>
      </div>
      <div className="flex-1 h-px max-w-[140px]" style={{ background: `linear-gradient(to left, transparent, ${color}66)` }} />
    </div>
  );
}

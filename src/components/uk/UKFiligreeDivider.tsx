export default function UKFiligreeDivider({ color = "#B08D57" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center py-7" aria-hidden="true">
      <div
        className="flex-1 h-px max-w-[180px]"
        style={{ background: `linear-gradient(to right, transparent, ${color}55)` }}
      />
      <div className="mx-4 flex items-center gap-2">
        <svg viewBox="0 0 140 24" width="180" height="22" fill="none">
          {/* central diamond */}
          <path d="M 70 4 L 78 12 L 70 20 L 62 12 Z" fill={color} opacity="0.95" />
          <path
            d="M 70 8 L 74 12 L 70 16 L 66 12 Z"
            fill="#FFFFFF"
            opacity="0.35"
          />
          {/* left scrollwork */}
          <path
            d="M 62 12 C 54 12, 50 6, 42 6 C 36 6, 32 12, 28 12"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 28 12 C 24 12, 22 14, 20 16"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.85"
          />
          <circle cx="42" cy="6" r="1.6" fill={color} />
          <circle cx="20" cy="16" r="1.4" fill={color} opacity="0.85" />
          {/* left leaf */}
          <path
            d="M 50 12 Q 52 8, 56 9 Q 53 11, 50 12 Z"
            fill={color}
            opacity="0.8"
          />
          {/* right scrollwork (mirror) */}
          <path
            d="M 78 12 C 86 12, 90 6, 98 6 C 104 6, 108 12, 112 12"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 112 12 C 116 12, 118 14, 120 16"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.85"
          />
          <circle cx="98" cy="6" r="1.6" fill={color} />
          <circle cx="120" cy="16" r="1.4" fill={color} opacity="0.85" />
          {/* right leaf */}
          <path
            d="M 90 12 Q 88 8, 84 9 Q 87 11, 90 12 Z"
            fill={color}
            opacity="0.8"
          />
          {/* outer terminal dots */}
          <circle cx="4" cy="12" r="1.2" fill={color} opacity="0.7" />
          <circle cx="136" cy="12" r="1.2" fill={color} opacity="0.7" />
        </svg>
      </div>
      <div
        className="flex-1 h-px max-w-[180px]"
        style={{ background: `linear-gradient(to left, transparent, ${color}55)` }}
      />
    </div>
  );
}

"use client";

export default function ChakraDivider({ color = "#0B3D2E" }: { color?: string }) {
  const spokes = Array.from({ length: 24 });
  return (
    <div className="flex items-center justify-center py-8" aria-hidden="true">
      <div className="flex-1 h-px max-w-[120px]" style={{ background: `linear-gradient(to right, transparent, ${color}55)` }} />
      <div className="mx-4 relative" style={{ width: 36, height: 36 }}>
        <style>{`
          @keyframes india-chakra-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .india-chakra-wheel { animation: india-chakra-spin 60s linear infinite; }
          @media (prefers-reduced-motion: reduce) {
            .india-chakra-wheel { animation: none; }
          }
        `}</style>
        <svg viewBox="0 0 100 100" className="india-chakra-wheel" width="36" height="36">
          <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill={color} />
          {spokes.map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2="50"
                y2="8"
                stroke={color}
                strokeWidth="1.2"
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </svg>
      </div>
      <div className="flex-1 h-px max-w-[120px]" style={{ background: `linear-gradient(to left, transparent, ${color}55)` }} />
    </div>
  );
}

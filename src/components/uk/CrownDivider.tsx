export default function CrownDivider({ color = "#B08D57" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center py-9" aria-hidden="true">
      {/* Left wing: double rule + diamond terminal */}
      <Wing color={color} side="left" />

      {/* Crown */}
      <div className="mx-5">
        <svg viewBox="0 0 140 100" width="84" height="60">
          {/* ermine band (base) */}
          <rect x="12" y="80" width="116" height="12" rx="2" fill={color} />
          {/* ermine spots */}
          {[28, 48, 70, 92, 112].map((x) => (
            <g key={x} fill="#FFFFFF">
              <ellipse cx={x} cy="86" rx="1.2" ry="1.6" />
              <circle cx={x - 2.6} cy="89" r="0.7" />
              <circle cx={x + 2.6} cy="89" r="0.7" />
            </g>
          ))}
          {/* highlight on ermine */}
          <rect x="14" y="81" width="112" height="1" fill="#FFFFFF" opacity="0.35" />

          {/* gold rim band */}
          <rect x="14" y="68" width="112" height="12" fill={color} />
          {/* pearls along top of rim */}
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={`pl-${i}`} cx={20 + i * 10} cy="68" r="1.5" fill="#FFFFFF" />
          ))}
          {/* shading line on rim */}
          <rect x="14" y="78" width="112" height="1.2" fill="#000000" opacity="0.12" />

          {/* Velvet cap (filled region between arches) */}
          <path
            d="M 20 68 Q 30 36 70 30 Q 110 36 120 68 Z"
            fill={color}
            opacity="0.35"
          />

          {/* Rim ornaments: alternating cross pattée and fleur-de-lis */}
          {/* center cross pattée */}
          <CrossPattee cx={70} cy={62} color={color} />
          {/* side crosses pattée */}
          <CrossPattee cx={28} cy={64} color={color} scale={0.72} />
          <CrossPattee cx={112} cy={64} color={color} scale={0.72} />
          {/* fleurs-de-lis between */}
          <FleurDeLis cx={49} cy={64} color={color} />
          <FleurDeLis cx={91} cy={64} color={color} />

          {/* arches (twin pearled arches) */}
          <path
            d="M 20 68 Q 30 32 70 28"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 120 68 Q 110 32 70 28"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* pearled arch detailing */}
          {Array.from({ length: 5 }).map((_, i) => {
            const t = (i + 1) / 6;
            const x = 20 + (70 - 20) * t;
            const y = 68 + (28 - 68) * t - 8 * Math.sin(Math.PI * t);
            return <circle key={`la-${i}`} cx={x} cy={y} r="1.2" fill="#FFFFFF" />;
          })}
          {Array.from({ length: 5 }).map((_, i) => {
            const t = (i + 1) / 6;
            const x = 120 + (70 - 120) * t;
            const y = 68 + (28 - 68) * t - 8 * Math.sin(Math.PI * t);
            return <circle key={`ra-${i}`} cx={x} cy={y} r="1.2" fill="#FFFFFF" />;
          })}

          {/* Monde (orb) at apex */}
          <circle cx="70" cy="24" r="5.2" fill={color} />
          {/* orb cross-band */}
          <path
            d="M 65 24 L 75 24 M 70 19 L 70 29"
            stroke="#FFFFFF"
            strokeWidth="0.9"
          />
          <circle cx="70" cy="24" r="5.2" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" />

          {/* surmounting cross pattée */}
          <g transform="translate(70 12)">
            <path
              d="M -1.4 -7 L 1.4 -7 L 1.4 -3.5 Q 3.5 -3.5 3.5 -1.5 L 5.5 -1.5 L 5.5 1.5 L 3.5 1.5 Q 3.5 3.5 1.4 3.5 L 1.4 7 L -1.4 7 L -1.4 3.5 Q -3.5 3.5 -3.5 1.5 L -5.5 1.5 L -5.5 -1.5 L -3.5 -1.5 Q -3.5 -3.5 -1.4 -3.5 Z"
              fill={color}
            />
            <circle cx="0" cy="0" r="1" fill="#FFFFFF" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* Right wing: double rule + diamond terminal */}
      <Wing color={color} side="right" />
    </div>
  );
}

function Wing({ color, side }: { color: string; side: "left" | "right" }) {
  const gradient =
    side === "left"
      ? `linear-gradient(to right, transparent, ${color}66)`
      : `linear-gradient(to left, transparent, ${color}66)`;
  return (
    <div className="flex-1 max-w-[170px] flex items-center" aria-hidden>
      {side === "right" && (
        <span
          className="mr-2 inline-block"
          style={{
            width: 6,
            height: 6,
            transform: "rotate(45deg)",
            background: color,
            opacity: 0.85,
          }}
        />
      )}
      <div className="flex-1 flex flex-col gap-[3px]">
        <div className="h-px" style={{ background: gradient }} />
        <div className="h-px opacity-60" style={{ background: gradient }} />
      </div>
      {side === "left" && (
        <span
          className="ml-2 inline-block"
          style={{
            width: 6,
            height: 6,
            transform: "rotate(45deg)",
            background: color,
            opacity: 0.85,
          }}
        />
      )}
    </div>
  );
}

function CrossPattee({
  cx,
  cy,
  color,
  scale = 1,
}: {
  cx: number;
  cy: number;
  color: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <path
        d="M -1.8 -8 L 1.8 -8 L 1.8 -4 Q 4 -4 4 -1.8 L 7 -1.8 L 7 1.8 L 4 1.8 Q 4 4 1.8 4 L 1.8 8 L -1.8 8 L -1.8 4 Q -4 4 -4 1.8 L -7 1.8 L -7 -1.8 L -4 -1.8 Q -4 -4 -1.8 -4 Z"
        fill={color}
      />
      <circle cx={0} cy={0} r="1.2" fill="#FFFFFF" opacity="0.85" />
    </g>
  );
}

function FleurDeLis({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* center petal */}
      <path
        d="M 0 -9 Q -1.5 -5 0 -1 Q 1.5 -5 0 -9 Z"
        fill={color}
      />
      {/* side petals */}
      <path
        d="M -4.5 -5 Q -6 -2 -3 0 Q -1 -1 0 -2 Q -2 -5 -4.5 -5 Z"
        fill={color}
      />
      <path
        d="M 4.5 -5 Q 6 -2 3 0 Q 1 -1 0 -2 Q 2 -5 4.5 -5 Z"
        fill={color}
      />
      {/* band tying petals */}
      <rect x="-4" y="-1" width="8" height="2" fill={color} />
      {/* lower trefoil */}
      <path
        d="M -3 1 L 3 1 L 1.5 5 L 0 3 L -1.5 5 Z"
        fill={color}
      />
    </g>
  );
}

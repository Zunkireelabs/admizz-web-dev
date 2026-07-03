export type LandmarkName =
  | "taj-mahal"
  | "india-gate"
  | "lotus-temple"
  | "red-fort"
  | "hawa-mahal"
  | "mysore-palace"
  | "gateway-of-india"
  | "charminar"
  | "victoria-memorial"
  | "big-ben"
  | "tower-bridge"
  | "edinburgh-castle"
  | "oxford-spires"
  | "kings-college"
  | "manchester-town-hall"
  | "london-skyline";

interface Props {
  name: LandmarkName;
  className?: string;
  color?: string;
  opacity?: number;
  width?: number | string;
  height?: number | string;
  title?: string;
}

const paths: Record<LandmarkName, { vb: string; d: React.ReactNode }> = {
  // Taj Mahal — central dome + 4 minarets + base
  "taj-mahal": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="85" width="200" height="15" />
        <rect x="10" y="40" width="6" height="50" />
        <rect x="184" y="40" width="6" height="50" />
        <rect x="40" y="50" width="5" height="40" />
        <rect x="155" y="50" width="5" height="40" />
        <circle cx="13" cy="38" r="5" />
        <circle cx="187" cy="38" r="5" />
        <circle cx="42.5" cy="48" r="4" />
        <circle cx="157.5" cy="48" r="4" />
        <rect x="60" y="55" width="80" height="30" />
        <path d="M 70 55 Q 100 10 130 55 Z" />
        <rect x="98" y="15" width="4" height="12" />
        <circle cx="100" cy="14" r="3" />
      </>
    ),
  },
  // India Gate — triumphal arch
  "india-gate": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <path d="M 60 92 L 60 35 Q 60 20 100 20 Q 140 20 140 35 L 140 92 L 120 92 L 120 50 Q 120 38 100 38 Q 80 38 80 50 L 80 92 Z" />
        <rect x="55" y="15" width="90" height="10" />
        <rect x="50" y="10" width="100" height="6" />
      </>
    ),
  },
  // Lotus Temple — lotus petals
  "lotus-temple": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <path d="M 100 30 Q 70 70 50 92 Q 60 75 70 50 Q 80 80 100 92 Q 120 80 130 50 Q 140 75 150 92 Q 130 70 100 30 Z" />
        <path d="M 100 40 Q 80 70 75 90 Q 90 75 100 92 Q 110 75 125 90 Q 120 70 100 40 Z" />
      </>
    ),
  },
  // Red Fort — long crenellated wall with central gate
  "red-fort": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <rect x="10" y="55" width="180" height="37" />
        {/* crenellations */}
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={10 + i * 10} y="48" width="6" height="8" />
        ))}
        {/* central gate */}
        <path d="M 88 92 L 88 75 Q 88 65 100 65 Q 112 65 112 75 L 112 92 Z" fill="white" />
        <rect x="40" y="35" width="6" height="20" />
        <rect x="154" y="35" width="6" height="20" />
        <circle cx="43" cy="33" r="3" />
        <circle cx="157" cy="33" r="3" />
      </>
    ),
  },
  // Hawa Mahal — many small windowed arches stacked
  "hawa-mahal": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <rect x="20" y="50" width="160" height="42" />
        {/* row of arched windows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M ${30 + i * 20} 70 Q ${40 + i * 20} 58 ${50 + i * 20} 70 L ${50 + i * 20} 80 L ${30 + i * 20} 80 Z`} fill="white" />
        ))}
        {/* top tier */}
        <rect x="40" y="35" width="120" height="15" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={50 + i * 22} y="22" width="14" height="13" />
        ))}
        {/* crown domes */}
        <circle cx="57" cy="20" r="4" />
        <circle cx="100" cy="18" r="5" />
        <circle cx="143" cy="20" r="4" />
      </>
    ),
  },
  // Mysore Palace — central dome + side towers
  "mysore-palace": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <rect x="10" y="60" width="180" height="32" />
        <rect x="30" y="40" width="20" height="20" />
        <rect x="150" y="40" width="20" height="20" />
        <path d="M 30 40 L 40 25 L 50 40 Z" />
        <path d="M 150 40 L 160 25 L 170 40 Z" />
        <rect x="80" y="35" width="40" height="25" />
        <path d="M 70 35 Q 100 5 130 35 Z" />
        <rect x="98" y="0" width="4" height="10" />
      </>
    ),
  },
  // Gateway of India — basalt arch by the sea
  "gateway-of-india": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <rect x="40" y="30" width="120" height="62" />
        <path d="M 75 92 L 75 55 Q 75 40 100 40 Q 125 40 125 55 L 125 92 Z" fill="white" />
        <rect x="35" y="25" width="130" height="8" />
        <circle cx="55" cy="22" r="6" />
        <circle cx="100" cy="18" r="8" />
        <circle cx="145" cy="22" r="6" />
      </>
    ),
  },
  // Charminar — square base with 4 minarets at corners
  "charminar": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <rect x="40" y="50" width="120" height="42" />
        {/* corner minarets */}
        <rect x="35" y="20" width="8" height="72" />
        <rect x="157" y="20" width="8" height="72" />
        <rect x="60" y="35" width="6" height="20" />
        <rect x="134" y="35" width="6" height="20" />
        <circle cx="39" cy="18" r="5" />
        <circle cx="161" cy="18" r="5" />
        {/* central arch */}
        <path d="M 85 92 L 85 65 Q 85 55 100 55 Q 115 55 115 65 L 115 92 Z" fill="white" />
        <rect x="98" y="10" width="4" height="10" />
      </>
    ),
  },
  // Victoria Memorial — domed marble building
  "victoria-memorial": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <rect x="20" y="65" width="160" height="27" />
        <rect x="60" y="50" width="80" height="15" />
        <path d="M 65 50 Q 100 15 135 50 Z" />
        <circle cx="100" cy="20" r="5" />
        <rect x="40" y="55" width="6" height="10" />
        <rect x="154" y="55" width="6" height="10" />
        <circle cx="43" cy="52" r="4" />
        <circle cx="157" cy="52" r="4" />
      </>
    ),
  },
  // Big Ben — tall Gothic clock tower
  "big-ben": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        <rect x="82" y="20" width="36" height="72" />
        <rect x="80" y="38" width="40" height="4" />
        <rect x="78" y="62" width="44" height="4" />
        {/* clock face */}
        <circle cx="100" cy="50" r="9" fill="white" />
        <circle cx="100" cy="50" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="100" y1="50" x2="100" y2="44" stroke="currentColor" strokeWidth="1.2" />
        <line x1="100" y1="50" x2="104" y2="50" stroke="currentColor" strokeWidth="1.2" />
        {/* belfry */}
        <rect x="86" y="14" width="28" height="8" />
        <path d="M 84 14 L 100 4 L 116 14 Z" />
        <rect x="98" y="0" width="4" height="6" />
        <circle cx="100" cy="0" r="2" />
      </>
    ),
  },
  // Tower Bridge — Victorian Gothic twin towers, high-level walkway, side-span suspension chains
  "tower-bridge": {
    vb: "0 0 200 100",
    d: (
      <>
        {/* water / ground line */}
        <rect x="0" y="92" width="200" height="8" />

        {/* side abutments */}
        <rect x="2" y="78" width="14" height="14" />
        <rect x="184" y="78" width="14" height="14" />

        {/* roadway deck */}
        <rect x="0" y="78" width="200" height="4" />

        {/* suspension chains — left span (upper + lower) */}
        <path d="M 16 78 Q 32 56 50 46" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M 16 78 Q 30 70 50 60" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* suspension chains — right span (upper + lower) */}
        <path d="M 184 78 Q 168 56 150 46" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M 184 78 Q 170 70 150 60" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* chain hangers — left */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={`lch-${i}`} x={20 + i * 7} y={66 - i * 3} width="0.8" height={12 + i * 3} />
        ))}
        {/* chain hangers — right */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={`rch-${i}`} x={180 - i * 7} y={66 - i * 3} width="0.8" height={12 + i * 3} />
        ))}

        {/* === TOWER 1 (left, center x=60) === */}
        {/* base pier */}
        <rect x="48" y="68" width="24" height="14" />
        {/* lower shaft */}
        <rect x="50" y="50" width="20" height="18" />
        {/* arched opening in lower shaft */}
        <path d="M 56 56 Q 56 52 60 52 Q 64 52 64 56 L 64 66 L 56 66 Z" fill="white" />
        {/* cornice band */}
        <rect x="46" y="46" width="28" height="4" />
        {/* upper chamber */}
        <rect x="48" y="30" width="24" height="16" />
        {/* upper-chamber windows */}
        <rect x="51.5" y="34" width="2.5" height="7" fill="white" />
        <rect x="56.5" y="34" width="2.5" height="7" fill="white" />
        <rect x="61" y="34" width="2.5" height="7" fill="white" />
        <rect x="66" y="34" width="2.5" height="7" fill="white" />
        {/* corner pinnacles */}
        <rect x="46" y="22" width="3" height="8" />
        <path d="M 45 22 L 47.5 16 L 50 22 Z" />
        <rect x="71" y="22" width="3" height="8" />
        <path d="M 70 22 L 72.5 16 L 75 22 Z" />
        {/* central pyramidal roof */}
        <path d="M 50 30 L 60 12 L 70 30 Z" />
        {/* central spire + finial */}
        <rect x="58.5" y="4" width="3" height="9" />
        <path d="M 57 4 L 60 -1 L 63 4 Z" />
        <circle cx="60" cy="-1" r="1.2" />

        {/* === TOWER 2 (right, center x=140) === */}
        <rect x="128" y="68" width="24" height="14" />
        <rect x="130" y="50" width="20" height="18" />
        <path d="M 136 56 Q 136 52 140 52 Q 144 52 144 56 L 144 66 L 136 66 Z" fill="white" />
        <rect x="126" y="46" width="28" height="4" />
        <rect x="128" y="30" width="24" height="16" />
        <rect x="131.5" y="34" width="2.5" height="7" fill="white" />
        <rect x="136.5" y="34" width="2.5" height="7" fill="white" />
        <rect x="141" y="34" width="2.5" height="7" fill="white" />
        <rect x="146" y="34" width="2.5" height="7" fill="white" />
        <rect x="126" y="22" width="3" height="8" />
        <path d="M 125 22 L 127.5 16 L 130 22 Z" />
        <rect x="151" y="22" width="3" height="8" />
        <path d="M 150 22 L 152.5 16 L 155 22 Z" />
        <path d="M 130 30 L 140 12 L 150 30 Z" />
        <rect x="138.5" y="4" width="3" height="9" />
        <path d="M 137 4 L 140 -1 L 143 4 Z" />
        <circle cx="140" cy="-1" r="1.2" />

        {/* === HIGH-LEVEL WALKWAY BETWEEN TOWERS === */}
        {/* upper deck */}
        <rect x="72" y="20" width="56" height="3" />
        {/* lower deck */}
        <rect x="72" y="28" width="56" height="3" />
        {/* vertical hangers between the two walkway decks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={`wh-${i}`} x={78 + i * 9} y="23" width="0.8" height="5" />
        ))}
      </>
    ),
  },
  // Edinburgh Castle — castle on a hill with battlements
  "edinburgh-castle": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        {/* hill */}
        <path d="M 0 92 Q 50 78 100 70 Q 150 78 200 92 Z" />
        {/* main keep */}
        <rect x="80" y="38" width="40" height="42" />
        {/* battlements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={`bk-${i}`} x={80 + i * 7} y="32" width="4" height="6" />
        ))}
        {/* side towers */}
        <rect x="60" y="48" width="18" height="32" />
        <rect x="122" y="48" width="18" height="32" />
        {Array.from({ length: 3 }).map((_, i) => (
          <rect key={`b1-${i}`} x={60 + i * 6} y="42" width="3" height="6" />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <rect key={`b2-${i}`} x={122 + i * 6} y="42" width="3" height="6" />
        ))}
        {/* flag pole */}
        <rect x="99" y="20" width="2" height="18" />
        <path d="M 101 20 L 110 24 L 101 28 Z" />
        {/* windows */}
        <rect x="92" y="50" width="5" height="9" fill="white" />
        <rect x="103" y="50" width="5" height="9" fill="white" />
      </>
    ),
  },
  // Oxford Spires — pointed Gothic spires skyline
  "oxford-spires": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        {/* base buildings */}
        <rect x="10" y="60" width="180" height="32" />
        {/* spire 1 */}
        <rect x="22" y="42" width="14" height="18" />
        <path d="M 20 42 L 29 14 L 38 42 Z" />
        {/* spire 2 (tallest, central) */}
        <rect x="60" y="38" width="18" height="22" />
        <path d="M 58 38 L 69 4 L 80 38 Z" />
        <rect x="68" y="0" width="2" height="6" />
        {/* spire 3 */}
        <rect x="95" y="46" width="14" height="14" />
        <path d="M 93 46 L 102 22 L 111 46 Z" />
        {/* spire 4 (dome — Radcliffe Camera) */}
        <rect x="125" y="46" width="22" height="14" />
        <path d="M 122 46 Q 136 28 150 46 Z" />
        <rect x="135" y="22" width="2" height="6" />
        <circle cx="136" cy="22" r="2" />
        {/* spire 5 */}
        <rect x="158" y="44" width="14" height="16" />
        <path d="M 156 44 L 165 18 L 174 44 Z" />
        {/* arched windows on base */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M ${22 + i * 20} 78 Q ${28 + i * 20} 70 ${34 + i * 20} 78 L ${34 + i * 20} 88 L ${22 + i * 20} 88 Z`} fill="white" />
        ))}
      </>
    ),
  },
  // King's College Chapel — Gothic chapel with twin towers
  "kings-college": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        {/* main body */}
        <rect x="40" y="40" width="120" height="52" />
        {/* twin towers */}
        <rect x="30" y="22" width="20" height="70" />
        <rect x="150" y="22" width="20" height="70" />
        {/* tower pinnacles (4) */}
        <rect x="30" y="14" width="4" height="10" />
        <rect x="46" y="14" width="4" height="10" />
        <rect x="150" y="14" width="4" height="10" />
        <rect x="166" y="14" width="4" height="10" />
        <path d="M 30 14 L 32 8 L 34 14 Z" />
        <path d="M 46 14 L 48 8 L 50 14 Z" />
        <path d="M 150 14 L 152 8 L 154 14 Z" />
        <path d="M 166 14 L 168 8 L 170 14 Z" />
        {/* central gothic window */}
        <path d="M 80 80 L 80 52 Q 80 44 100 44 Q 120 44 120 52 L 120 80 Z" fill="white" />
        {/* small gothic windows row */}
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={i} d={`M ${48 + i * 22} 80 Q ${54 + i * 22} 70 ${60 + i * 22} 80 L ${60 + i * 22} 88 L ${48 + i * 22} 88 Z`} fill="currentColor" />
        ))}
      </>
    ),
  },
  // Manchester Town Hall — Victorian Gothic with central clock tower
  "manchester-town-hall": {
    vb: "0 0 200 100",
    d: (
      <>
        <rect x="0" y="92" width="200" height="8" />
        {/* wings */}
        <rect x="10" y="50" width="60" height="42" />
        <rect x="130" y="50" width="60" height="42" />
        {/* central clock tower */}
        <rect x="80" y="20" width="40" height="72" />
        <rect x="78" y="48" width="44" height="4" />
        <circle cx="100" cy="36" r="7" fill="white" />
        <circle cx="100" cy="36" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
        {/* belfry top */}
        <rect x="82" y="12" width="36" height="8" />
        <path d="M 78 12 L 100 0 L 122 12 Z" />
        {/* roof pitched */}
        <path d="M 10 50 L 40 38 L 70 50 Z" />
        <path d="M 130 50 L 160 38 L 190 50 Z" />
        {/* arched windows */}
        {Array.from({ length: 3 }).map((_, i) => (
          <path key={`l-${i}`} d={`M ${18 + i * 17} 82 Q ${24 + i * 17} 70 ${30 + i * 17} 82 L ${30 + i * 17} 90 L ${18 + i * 17} 90 Z`} fill="white" />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <path key={`r-${i}`} d={`M ${138 + i * 17} 82 Q ${144 + i * 17} 70 ${150 + i * 17} 82 L ${150 + i * 17} 90 L ${138 + i * 17} 90 Z`} fill="white" />
        ))}
      </>
    ),
  },
  // London Skyline — Big Ben → London Eye → St Paul's → The Shard → Tower Bridge
  "london-skyline": {
    vb: "0 0 700 110",
    d: (
      <>
        {/* ground / Thames line */}
        <rect x="0" y="100" width="700" height="10" />

        {/* === BIG BEN & PARLIAMENT (far left) === */}
        {/* Parliament block */}
        <rect x="100" y="70" width="60" height="30" />
        {Array.from({ length: 3 }).map((_, i) => (
          <path key={`pp-${i}`} d={`M ${106 + i * 18} 70 L ${115 + i * 18} 60 L ${124 + i * 18} 70 Z`} />
        ))}
        <rect x="118" y="60" width="2" height="6" />
        {/* Big Ben tower */}
        <rect x="70" y="40" width="22" height="60" />
        {/* clock chamber */}
        <rect x="66" y="28" width="30" height="14" />
        {/* clock face */}
        <circle cx="81" cy="35" r="4.5" fill="white" />
        <circle cx="81" cy="35" r="3.8" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <line x1="81" y1="35" x2="81" y2="32" stroke="currentColor" strokeWidth="0.7" />
        <line x1="81" y1="35" x2="83" y2="35" stroke="currentColor" strokeWidth="0.7" />
        {/* belfry roof */}
        <path d="M 66 28 L 81 12 L 96 28 Z" />
        {/* spire pinnacle */}
        <rect x="79" y="4" width="4" height="8" />
        <path d="M 77 4 L 81 -1 L 85 4 Z" />
        <circle cx="81" cy="-1" r="1.3" />
        {/* corner pinnacles on clock chamber */}
        <rect x="65" y="22" width="2.5" height="6" />
        <rect x="94.5" y="22" width="2.5" height="6" />
        {/* small windows on tower */}
        <rect x="76" y="48" width="10" height="3" fill="white" />
        <rect x="76" y="56" width="10" height="3" fill="white" />
        <rect x="76" y="64" width="10" height="3" fill="white" />

        {/* === LONDON EYE === */}
        {/* support A-frame */}
        <line x1="210" y1="68" x2="226" y2="100" stroke="currentColor" strokeWidth="1.8" />
        <line x1="210" y1="68" x2="236" y2="100" stroke="currentColor" strokeWidth="1.8" />
        {/* base anchor */}
        <rect x="222" y="94" width="20" height="6" />
        {/* wheel rim */}
        <circle cx="210" cy="68" r="30" fill="none" stroke="currentColor" strokeWidth="2.2" />
        {/* hub */}
        <circle cx="210" cy="68" r="3.5" />
        {/* spokes */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * Math.PI) / 8;
          const x2 = 210 + 28 * Math.cos(angle);
          const y2 = 68 + 28 * Math.sin(angle);
          return <line key={`sp-${i}`} x1="210" y1="68" x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.6" opacity="0.7" />;
        })}
        {/* capsules at edge */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * Math.PI) / 8;
          const cx = 210 + 30 * Math.cos(angle);
          const cy = 68 + 30 * Math.sin(angle);
          return <ellipse key={`cp-${i}`} cx={cx} cy={cy} rx="2.4" ry="1.4" />;
        })}

        {/* === ST PAUL'S CATHEDRAL === */}
        {/* main rectangular nave */}
        <rect x="310" y="68" width="70" height="32" />
        {/* twin west towers */}
        <rect x="298" y="58" width="14" height="42" />
        <path d="M 296 58 L 305 50 L 314 58 Z" />
        <rect x="378" y="58" width="14" height="42" />
        <path d="M 376 58 L 385 50 L 394 58 Z" />
        {/* dome drum (peristyle) */}
        <rect x="328" y="50" width="34" height="18" />
        {/* dome */}
        <path d="M 328 50 Q 328 26 345 26 Q 362 26 362 50 Z" />
        {/* lantern */}
        <rect x="342" y="12" width="6" height="14" />
        <path d="M 340 12 L 345 6 L 350 12 Z" />
        {/* cross on top */}
        <rect x="344" y="-1" width="2" height="9" />
        <rect x="341" y="2" width="8" height="2" />
        {/* small windows on dome drum */}
        <rect x="333" y="55" width="3" height="8" fill="white" />
        <rect x="342" y="55" width="3" height="8" fill="white" />
        <rect x="351" y="55" width="3" height="8" fill="white" />
        {/* nave windows */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={`pn-${i}`} x={318 + i * 16} y="80" width="6" height="14" fill="white" />
        ))}

        {/* === THE SHARD === */}
        {/* asymmetric glass pyramid */}
        <path d="M 428 100 L 436 22 L 452 100 Z" />
        {/* spire tip */}
        <rect x="440" y="14" width="2" height="10" />
        {/* faint glass facets */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`sh-${i}`} x1={430 + i * 0.8} y1={94 - i * 7} x2={452 - i * 1.4} y2={94 - i * 7} stroke="white" strokeWidth="0.4" opacity="0.5" />
        ))}

        {/* === TOWER BRIDGE (right) === */}
        {/* abutments */}
        <rect x="486" y="86" width="14" height="14" />
        <rect x="676" y="86" width="14" height="14" />
        {/* roadway */}
        <rect x="486" y="86" width="204" height="4" />
        {/* suspension chains — outer spans */}
        <path d="M 500 86 Q 516 64 534 54" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 500 86 Q 514 78 534 68" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 690 86 Q 674 64 656 54" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 690 86 Q 676 78 656 68" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* === Tower 1 (left, center x=544) === */}
        <rect x="532" y="76" width="24" height="14" />
        <rect x="534" y="58" width="20" height="18" />
        <path d="M 540 64 Q 540 60 544 60 Q 548 60 548 64 L 548 74 L 540 74 Z" fill="white" />
        <rect x="530" y="54" width="28" height="4" />
        <rect x="532" y="38" width="24" height="16" />
        <rect x="535.5" y="42" width="2.5" height="7" fill="white" />
        <rect x="540.5" y="42" width="2.5" height="7" fill="white" />
        <rect x="545" y="42" width="2.5" height="7" fill="white" />
        <rect x="550" y="42" width="2.5" height="7" fill="white" />
        <rect x="530" y="30" width="3" height="8" />
        <path d="M 529 30 L 531.5 24 L 534 30 Z" />
        <rect x="555" y="30" width="3" height="8" />
        <path d="M 554 30 L 556.5 24 L 559 30 Z" />
        <path d="M 534 38 L 544 20 L 554 38 Z" />
        <rect x="542.5" y="12" width="3" height="9" />
        <path d="M 541 12 L 544 7 L 547 12 Z" />

        {/* === Tower 2 (right, center x=632) === */}
        <rect x="620" y="76" width="24" height="14" />
        <rect x="622" y="58" width="20" height="18" />
        <path d="M 628 64 Q 628 60 632 60 Q 636 60 636 64 L 636 74 L 628 74 Z" fill="white" />
        <rect x="618" y="54" width="28" height="4" />
        <rect x="620" y="38" width="24" height="16" />
        <rect x="623.5" y="42" width="2.5" height="7" fill="white" />
        <rect x="628.5" y="42" width="2.5" height="7" fill="white" />
        <rect x="633" y="42" width="2.5" height="7" fill="white" />
        <rect x="638" y="42" width="2.5" height="7" fill="white" />
        <rect x="618" y="30" width="3" height="8" />
        <path d="M 617 30 L 619.5 24 L 622 30 Z" />
        <rect x="643" y="30" width="3" height="8" />
        <path d="M 642 30 L 644.5 24 L 647 30 Z" />
        <path d="M 622 38 L 632 20 L 642 38 Z" />
        <rect x="630.5" y="12" width="3" height="9" />
        <path d="M 629 12 L 632 7 L 635 12 Z" />

        {/* Walkway between towers */}
        <rect x="556" y="28" width="64" height="3" />
        <rect x="556" y="36" width="64" height="3" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={`wh-${i}`} x={562 + i * 9} y="31" width="0.8" height="5" />
        ))}
      </>
    ),
  },
};

export default function LandmarkSilhouette({
  name,
  className = "",
  color = "#0B3D2E",
  opacity = 1,
  width,
  height,
  title,
}: Props) {
  const entry = paths[name];
  return (
    <svg
      viewBox={entry.vb}
      className={className}
      width={width}
      height={height}
      fill={color}
      opacity={opacity}
      preserveAspectRatio="xMidYMax meet"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={!title}
    >
      {entry.d}
    </svg>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Interactive India city map.
 *
 * Desktop: stylized SVG outline of India with city pins. Click/hover a pin
 * to see details in the side panel.
 * Mobile: city list with expandable cards.
 *
 * Student counts are approximate placeholders. Replace with real data when available.
 */

interface City {
  id: string;
  name: string;
  // Coordinates inside the 600x680 viewBox of the SVG outline
  x: number;
  y: number;
  popular?: boolean;
  region: string;
  universities: string[];
  studentsApprox: string;
  signatureDish: string;
  climate: string;
  flightHours: string;
  blurb: string;
}

const CITIES: City[] = [
  {
    id: "delhi",
    name: "Delhi",
    x: 332,
    y: 308,
    popular: true,
    region: "North India · National Capital Region",
    universities: ["University of Delhi", "JNU", "IIT Delhi", "AIIMS", "Jamia Millia Islamia"],
    studentsApprox: "~420 Nepali students",
    signatureDish: "Chole Bhature, Butter Chicken",
    climate: "Hot summers · Cold foggy winters",
    flightHours: "1h 35m direct from Kathmandu",
    blurb:
      "The political and academic capital. Home to India's most prestigious central universities, world-class research institutes, and a huge community of South Asian students.",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    x: 215,
    y: 623,
    popular: true,
    region: "West India · Maharashtra",
    universities: ["University of Mumbai", "IIT Bombay", "TISS", "Jai Hind College", "NMIMS"],
    studentsApprox: "~310 Nepali students",
    signatureDish: "Vada Pav, Pav Bhaji",
    climate: "Warm year-round · Monsoon Jun–Sep",
    flightHours: "3h direct from Kathmandu",
    blurb:
      "India's financial and creative capital. Best place for business, finance, media, and design programs. Cosmopolitan, fast-paced, full of opportunity.",
  },
  {
    id: "bangalore",
    name: "Bangalore",
    x: 343,
    y: 824,
    popular: true,
    region: "South India · Karnataka",
    universities: ["IISc Bangalore", "Christ University", "Bangalore University", "IIM Bangalore"],
    studentsApprox: "~280 Nepali students",
    signatureDish: "Masala Dosa, Bisi Bele Bath",
    climate: "Mild year-round · India's most pleasant climate",
    flightHours: "3h 30m direct from Kathmandu",
    blurb:
      "India's Silicon Valley. The default destination for engineering, computer science, AI, and entrepreneurship. Internship and placement opportunities are unmatched.",
  },
  {
    id: "pune",
    name: "Pune",
    x: 240,
    y: 643,
    region: "West India · Maharashtra",
    universities: ["Symbiosis International", "Savitribai Phule Pune University", "MIT-WPU"],
    studentsApprox: "~190 Nepali students",
    signatureDish: "Misal Pav, Puran Poli",
    climate: "Pleasant · Mild winters",
    flightHours: "3h via Mumbai from Kathmandu",
    blurb:
      "The Oxford of the East. Strong in management, design, and engineering. Calmer than Mumbai but with all the academic prestige.",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    x: 367,
    y: 679,
    region: "South India · Telangana",
    universities: ["University of Hyderabad", "IIIT Hyderabad", "Osmania University", "ISB"],
    studentsApprox: "~165 Nepali students",
    signatureDish: "Hyderabadi Biryani",
    climate: "Warm · Mild winters",
    flightHours: "3h direct from Kathmandu",
    blurb:
      "India's emerging tech and biotech hub. Strong in computer science, pharmacy, and business. Affordable cost of living with world-class infrastructure.",
  },
  {
    id: "chennai",
    name: "Chennai",
    x: 416,
    y: 824,
    region: "South India · Tamil Nadu",
    universities: ["IIT Madras", "Anna University", "Loyola College", "Madras Christian College"],
    studentsApprox: "~140 Nepali students",
    signatureDish: "Idli Sambar, Filter Coffee",
    climate: "Hot tropical · Coastal",
    flightHours: "3h 45m via Kolkata",
    blurb:
      "India's engineering and medical hub. IIT Madras is consistently ranked India's #1 engineering institute. Strong cultural identity and student-friendly.",
  },
  {
    id: "manipal",
    name: "Manipal",
    x: 267,
    y: 814,
    region: "South India · Karnataka",
    universities: ["Manipal Academy of Higher Education (MAHE)"],
    studentsApprox: "~95 Nepali students",
    signatureDish: "Mangalorean coastal cuisine",
    climate: "Coastal · Warm · Monsoon Jun–Sep",
    flightHours: "4h via Bangalore",
    blurb:
      "A purpose-built university town. MAHE is one of India's top private universities for medicine, engineering, and management. Beautiful campus, focused academic culture.",
  },
];

export default function IndiaCityMap() {
  const [active, setActive] = useState<string>("delhi");
  const sectionRef = useRef<HTMLElement>(null);
  const city = CITIES.find((c) => c.id === active)!;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !el) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.from(el.querySelectorAll("[data-cm-fade]"), {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });
        }, el);
        (el as unknown as { __ctx?: gsap.Context }).__ctx = ctx;
      }
    );
    return () => {
      cancelled = true;
      const ctx = (el as unknown as { __ctx?: { revert: () => void } }).__ctx;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF8F1 0%, #FFFFFF 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow + heading */}
        <div className="text-center mb-14" data-cm-fade>
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8" style={{ background: "#C9A961" }} />
            <span
              className="text-[11px] uppercase tracking-[0.28em] font-semibold"
              style={{ color: "#0B3D2E" }}
            >
              Where You&apos;ll Study
            </span>
            <span className="h-px w-8" style={{ background: "#C9A961" }} />
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#0B3D2E" }}
          >
            Seven cities. One country. <span style={{ color: "#FF6B1A" }}>Every kind of student life.</span>
          </h2>
          <p className="text-[15px] md:text-base text-gray-700 max-w-2xl mx-auto">
            Tap a city to see top universities, the student community, climate, and what makes each place special.
          </p>
        </div>

        {/* Desktop: map + panel */}
        <div className="hidden md:grid grid-cols-[1fr_1fr] gap-10 items-start" data-cm-fade>
          {/* Map */}
          <div className="relative">
            <svg
              viewBox="0 0 1024 1024"
              width="100%"
              style={{ maxHeight: 620 }}
              role="img"
              aria-label="Map of India with study city pins"
            >
              <defs>
                <filter id="cityGlow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Real India outline — public-domain SVG (mapsicon) */}
              <image
                href="/images/maps/india-outline.svg"
                x="0"
                y="0"
                width="1024"
                height="1024"
                preserveAspectRatio="xMidYMid meet"
              />

              {/* Kathmandu — external reference (Nepal sits north of India) */}
              <g aria-hidden="true">
                <path
                  d="M 540 330 L 560 240"
                  stroke="#FF6B1A"
                  strokeWidth="2"
                  strokeDasharray="6 5"
                  strokeOpacity="0.55"
                  fill="none"
                />
                <circle cx="560" cy="232" r="6" fill="#FF6B1A" />
                <circle cx="560" cy="232" r="11" fill="none" stroke="#FF6B1A" strokeWidth="2" strokeOpacity="0.4" />
                <text x="578" y="228" fontSize="22" fontWeight="700" fill="#0B3D2E">
                  Kathmandu
                </text>
                <text x="578" y="252" fontSize="14" fontWeight="600" fill="#5C7189" letterSpacing="1.5">
                  NEPAL · YOU ARE HERE
                </text>
              </g>

              {/* City pins */}
              {CITIES.map((c) => {
                const isActive = c.id === active;
                // Per-city label offset to avoid overlap in dense southern cluster
                const labelOffset: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
                  delhi: { dx: 24, dy: 7, anchor: "start" },
                  mumbai: { dx: -24, dy: 7, anchor: "end" },
                  pune: { dx: 24, dy: 7, anchor: "start" },
                  hyderabad: { dx: 24, dy: 7, anchor: "start" },
                  manipal: { dx: -24, dy: 7, anchor: "end" },
                  bangalore: { dx: 0, dy: 38, anchor: "middle" },
                  chennai: { dx: 24, dy: 7, anchor: "start" },
                };
                const off = labelOffset[c.id] ?? { dx: 24, dy: 7, anchor: "start" as const };
                return (
                  <g
                    key={c.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(c.id)}
                    onMouseEnter={() => setActive(c.id)}
                    filter={isActive ? "url(#cityGlow)" : undefined}
                  >
                    {c.popular && (
                      <circle cx={c.x} cy={c.y} r="22" fill="#FF6B1A" opacity="0.18">
                        <animate attributeName="r" values="22;34;22" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.18;0;0.18" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isActive ? 16 : 12}
                      fill={isActive ? "#FF6B1A" : "#1C5D3F"}
                      stroke="#FFF8F1"
                      strokeWidth="3"
                      style={{ transition: "all 0.25s ease" }}
                    />
                    <text
                      x={c.x + off.dx}
                      y={c.y + off.dy}
                      fontSize="22"
                      fontWeight={isActive ? "700" : "600"}
                      fill={isActive ? "#0B3D2E" : "#1A1A1A"}
                      textAnchor={off.anchor}
                      style={{ transition: "all 0.25s ease", paintOrder: "stroke" }}
                      stroke="#FFF8F1"
                      strokeWidth="4"
                      strokeOpacity="0.9"
                      strokeLinejoin="round"
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Side panel */}
          <div
            className="rounded-2xl p-7 sticky top-32"
            style={{
              background: "#fff",
              border: "1px solid rgba(201,169,97,0.4)",
              boxShadow: "0 10px 40px rgba(11,61,46,0.07)",
            }}
            key={city.id}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-1"
                  style={{ color: "#FF6B1A" }}
                >
                  {city.region}
                </p>
                <h3
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#0B3D2E" }}
                >
                  {city.name}
                </h3>
              </div>
              {city.popular && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: "#FDED22", color: "#0B3D2E" }}
                >
                  Popular
                </span>
              )}
            </div>

            <p className="text-[14.5px] text-gray-700 leading-relaxed mb-6">{city.blurb}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Fact label="Nepali students" value={city.studentsApprox} />
              <Fact label="Flight from KTM" value={city.flightHours} />
              <Fact label="Climate" value={city.climate} />
              <Fact label="Signature dish" value={city.signatureDish} />
            </div>

            <div>
              <p
                className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-2"
                style={{ color: "#0B3D2E" }}
              >
                Top universities
              </p>
              <ul className="space-y-1.5">
                {city.universities.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-[13.5px] text-gray-800">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#C9A961"
                      className="mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M12 2 L14 9 L21 10 L15.5 14.5 L17 21 L12 17.5 L7 21 L8.5 14.5 L3 10 L10 9 Z" />
                    </svg>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile: city cards */}
        <div className="md:hidden space-y-3" data-cm-fade>
          {CITIES.map((c) => {
            const isOpen = c.id === active;
            return (
              <div
                key={c.id}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "#fff",
                  border: `1px solid ${isOpen ? "rgba(255,107,26,0.5)" : "rgba(201,169,97,0.3)"}`,
                }}
              >
                <button
                  onClick={() => setActive(isOpen ? "" : c.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block rounded-full"
                      style={{
                        width: 10,
                        height: 10,
                        background: c.popular ? "#FF6B1A" : "#1C5D3F",
                      }}
                    />
                    <div>
                      <p className="font-bold text-[15px]" style={{ color: "#0B3D2E" }}>
                        {c.name}
                      </p>
                      <p className="text-[11px] text-gray-500">{c.region}</p>
                    </div>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0B3D2E"
                    strokeWidth="2"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-[13.5px] text-gray-700 leading-relaxed mb-3">{c.blurb}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <Fact small label="Nepali students" value={c.studentsApprox} />
                      <Fact small label="Flight from KTM" value={c.flightHours} />
                      <Fact small label="Climate" value={c.climate} />
                      <Fact small label="Dish" value={c.signatureDish} />
                    </div>
                    <p
                      className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-1.5"
                      style={{ color: "#0B3D2E" }}
                    >
                      Top universities
                    </p>
                    <ul className="space-y-1">
                      {c.universities.map((u) => (
                        <li key={u} className="text-[13px] text-gray-800">
                          • {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div>
      <p
        className={`uppercase tracking-[0.2em] font-semibold mb-0.5 ${small ? "text-[9px]" : "text-[10px]"}`}
        style={{ color: "#FF6B1A" }}
      >
        {label}
      </p>
      <p className={`font-medium ${small ? "text-[12px]" : "text-[13px]"}`} style={{ color: "#0B3D2E" }}>
        {value}
      </p>
    </div>
  );
}

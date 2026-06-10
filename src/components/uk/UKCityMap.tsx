"use client";

import { useEffect, useRef, useState } from "react";

interface City {
  id: string;
  name: string;
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
    id: "london",
    name: "London",
    x: 611,
    y: 800,
    popular: true,
    region: "South East · England",
    universities: ["Imperial College London", "UCL", "King's College London", "LSE", "Queen Mary"],
    studentsApprox: "~6,000 Nepali students",
    signatureDish: "Fish & chips, full English",
    climate: "Mild · Rainy winters · Long summer days",
    flightHours: "9h direct · or 1-stop via Delhi/Doha",
    blurb:
      "The world's most international student city. Home to four of the UK's top universities, the strongest job market for graduates, and the densest Nepali community in the country.",
  },
  {
    id: "oxford",
    name: "Oxford",
    x: 551,
    y: 780,
    popular: true,
    region: "South Central · England",
    universities: ["University of Oxford", "Oxford Brookes University"],
    studentsApprox: "~250 Nepali students",
    signatureDish: "Pub roast, Oxford sausage",
    climate: "Mild · Occasional frost in winter",
    flightHours: "10h via London Heathrow",
    blurb:
      "England's oldest university town and one of the world's most prestigious. Tutorial-led teaching, ancient colleges, and a serious academic culture. PhD-track and humanities students thrive here.",
  },
  {
    id: "cambridge",
    name: "Cambridge",
    x: 622,
    y: 741,
    popular: true,
    region: "East · England",
    universities: ["University of Cambridge", "Anglia Ruskin University"],
    studentsApprox: "~200 Nepali students",
    signatureDish: "Cambridge burnt cream",
    climate: "Mild · Cool springs",
    flightHours: "10h via London Stansted",
    blurb:
      "The other ancient university, world-leading in maths, physics, computer science, and life sciences. Compact, walkable, and deeply academic — punt-on-the-Cam meets Nobel-laureate lecture.",
  },
  {
    id: "edinburgh",
    name: "Edinburgh",
    x: 450,
    y: 423,
    region: "Lothian · Scotland",
    universities: ["University of Edinburgh", "Heriot-Watt", "Edinburgh Napier"],
    studentsApprox: "~500 Nepali students",
    signatureDish: "Haggis, Scotch broth",
    climate: "Cool · Windy · Bright summers",
    flightHours: "11h via London",
    blurb:
      "Scotland's capital and one of the UK's most beautiful cities. Strong in informatics, AI, life sciences, and business. Lower cost of living than London with a globally ranked university.",
  },
  {
    id: "manchester",
    name: "Manchester",
    x: 500,
    y: 633,
    region: "North West · England",
    universities: ["University of Manchester", "Manchester Met", "Salford"],
    studentsApprox: "~900 Nepali students",
    signatureDish: "Lancashire hotpot, Eccles cake",
    climate: "Mild · Rainy · Cool",
    flightHours: "10h via London or direct via Doha",
    blurb:
      "The UK's second-largest student city, with a huge graduate scene in tech, engineering, and creative industries. Lower rent than London, strong music and culture, and a thriving Nepali community.",
  },
  {
    id: "birmingham",
    name: "Birmingham",
    x: 517,
    y: 718,
    region: "West Midlands · England",
    universities: ["University of Birmingham", "Aston University", "BCU"],
    studentsApprox: "~750 Nepali students",
    signatureDish: "Balti curry, Cadbury chocolate",
    climate: "Mild · Cloudy · Cool",
    flightHours: "10h via London or Manchester",
    blurb:
      "The UK's second city. Strong in business, engineering, medicine, and computer science. Most diverse city outside London with a large South Asian community and affordable student life.",
  },
  {
    id: "glasgow",
    name: "Glasgow",
    x: 395,
    y: 431,
    region: "Strathclyde · Scotland",
    universities: ["University of Glasgow", "Strathclyde", "Glasgow Caledonian"],
    studentsApprox: "~400 Nepali students",
    signatureDish: "Square sausage, Tunnock's teacake",
    climate: "Cool · Wet · Mild winters",
    flightHours: "11h via London",
    blurb:
      "Scotland's largest city. Russell Group university, strong engineering and medical schools, vibrant arts scene, and noticeably cheaper than Edinburgh or London. A favourite for STEM students.",
  },
];

export default function UKCityMap() {
  const [active, setActive] = useState<string>("london");
  const sectionRef = useRef<HTMLElement>(null);
  const city = CITIES.find((c) => c.id === active);

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
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-cm-fade>
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-px w-8" style={{ background: "#B08D57" }} />
            <span
              className="text-[11px] uppercase tracking-[0.28em] font-semibold"
              style={{ color: "#002147" }}
            >
              Where You&apos;ll Study
            </span>
            <span className="h-px w-8" style={{ background: "#B08D57" }} />
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#002147" }}
          >
            Seven cities. One island.{" "}
            <span style={{ color: "#B08D57" }}>Centuries of academic prestige.</span>
          </h2>
          <p className="text-[15px] md:text-base text-gray-700 max-w-2xl mx-auto">
            Tap a city to see top universities, the student community, climate, and what makes each place special.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-[1fr_1fr] gap-10 items-start" data-cm-fade>
          <div className="relative">
            <svg
              viewBox="0 0 1024 1024"
              width="100%"
              style={{ maxHeight: 620 }}
              role="img"
              aria-label="Map of the United Kingdom with study city pins"
            >
              <defs>
                <filter id="ukCityGlow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Real UK outline */}
              <image
                href="/images/maps/uk-outline.svg"
                x="0"
                y="0"
                width="1024"
                height="1024"
                preserveAspectRatio="xMidYMid meet"
              />

              {/* City pins */}
              {CITIES.map((c) => {
                const isActive = c.id === active;
                const labelOffset: Record<
                  string,
                  { dx: number; dy: number; anchor: "start" | "end" | "middle" }
                > = {
                  london: { dx: 24, dy: 7, anchor: "start" },
                  oxford: { dx: -24, dy: 7, anchor: "end" },
                  cambridge: { dx: 24, dy: 7, anchor: "start" },
                  edinburgh: { dx: 24, dy: 7, anchor: "start" },
                  manchester: { dx: 24, dy: 7, anchor: "start" },
                  birmingham: { dx: -24, dy: 7, anchor: "end" },
                  glasgow: { dx: -24, dy: 7, anchor: "end" },
                };
                const off = labelOffset[c.id] ?? { dx: 24, dy: 7, anchor: "start" as const };
                return (
                  <g
                    key={c.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(c.id)}
                    onMouseEnter={() => setActive(c.id)}
                    filter={isActive ? "url(#ukCityGlow)" : undefined}
                  >
                    {c.popular && (
                      <circle cx={c.x} cy={c.y} r="22" fill="#B08D57" opacity="0.18">
                        <animate attributeName="r" values="22;34;22" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.18;0;0.18" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isActive ? 16 : 12}
                      fill={isActive ? "#B08D57" : "#002147"}
                      stroke="#F5F3EE"
                      strokeWidth="3"
                      style={{ transition: "all 0.25s ease" }}
                    />
                    <text
                      x={c.x + off.dx}
                      y={c.y + off.dy}
                      fontSize="22"
                      fontWeight={isActive ? "700" : "600"}
                      fill={isActive ? "#002147" : "#1A1A1A"}
                      textAnchor={off.anchor}
                      style={{ transition: "all 0.25s ease", paintOrder: "stroke" }}
                      stroke="#F5F3EE"
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
          {city && (
            <div
              className="rounded-2xl p-7 sticky top-32"
              style={{
                background: "#fff",
                border: "1px solid rgba(176,141,87,0.4)",
                boxShadow: "0 10px 40px rgba(0,33,71,0.07)",
              }}
              key={city.id}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-1"
                    style={{ color: "#B08D57" }}
                  >
                    {city.region}
                  </p>
                  <h3
                    className="text-3xl font-bold mb-1"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#002147" }}
                  >
                    {city.name}
                  </h3>
                </div>
                {city.popular && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: "#B08D57", color: "#002147" }}
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
                  style={{ color: "#002147" }}
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
                        fill="#B08D57"
                        className="mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12 2 L22 12 L12 22 L2 12 Z" />
                      </svg>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-3" data-cm-fade>
          {CITIES.map((c) => {
            const isOpen = c.id === active;
            return (
              <div
                key={c.id}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "#fff",
                  border: `1px solid ${isOpen ? "rgba(176,141,87,0.5)" : "rgba(176,141,87,0.25)"}`,
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
                        background: c.popular ? "#B08D57" : "#002147",
                      }}
                    />
                    <div>
                      <p className="font-bold text-[15px]" style={{ color: "#002147" }}>
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
                    stroke="#002147"
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
                      style={{ color: "#002147" }}
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
        className="uppercase tracking-[0.18em] font-semibold mb-0.5"
        style={{ color: "#B08D57", fontSize: small ? 9 : 10 }}
      >
        {label}
      </p>
      <p
        className="text-gray-800 leading-snug"
        style={{ fontSize: small ? 12 : 13, fontWeight: 500 }}
      >
        {value}
      </p>
    </div>
  );
}

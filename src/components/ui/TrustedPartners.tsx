"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  University Data (copied from events-web-dev)                       */
/* ------------------------------------------------------------------ */

const universities: Record<string, { name: string; logo: string }[]> = {
  UK: [
    { name: "Buckinghamshire New University", logo: "https://admizzeducation.com/images/universities/uk/Buckinghamshire-New-University.webp" },
    { name: "BPP University", logo: "https://admizzeducation.com/images/universities/uk/BPP-University.webp" },
    { name: "Coventry University", logo: "https://admizzeducation.com/images/universities/uk/Coventry-University.webp" },
    { name: "Health Sciences University", logo: "https://admizzeducation.com/images/universities/uk/Health-Sciences-University.webp" },
    { name: "Ravensbourne University London", logo: "https://admizzeducation.com/images/universities/uk/Ravensbourne-University-London.webp" },
    { name: "University of Sunderland", logo: "https://admizzeducation.com/images/universities/uk/University-of-Sunderland.webp" },
    { name: "University of East London", logo: "https://admizzeducation.com/images/universities/uk/University-of-East-London.webp" },
    { name: "Ulster University", logo: "https://admizzeducation.com/images/universities/uk/Ulster-University.webp" },
    { name: "University of Greenwich", logo: "https://admizzeducation.com/images/universities/uk/University-of-Greenwich.webp" },
    { name: "The University of Law", logo: "https://admizzeducation.com/images/universities/uk/The-University-of-Law.webp" },
    { name: "University of Roehampton", logo: "https://admizzeducation.com/images/universities/uk/University-of-Roehampton.webp" },
    { name: "University of Worcester", logo: "https://admizzeducation.com/images/universities/uk/University-of-Worcester.webp" },
    { name: "University of West London", logo: "https://admizzeducation.com/images/universities/uk/University-of-West-London.webp" },
    { name: "University of the West of Scotland", logo: "https://admizzeducation.com/images/universities/uk/University-of-the-West-of-Scotland.webp" },
    { name: "York St John University", logo: "https://admizzeducation.com/images/universities/uk/York-St-John-University.webp" },
  ],
  USA: [
    { name: "Colorado State University", logo: "https://admizzeducation.com/images/universities/usa/COLORADO.webp" },
    { name: "Webster University", logo: "https://admizzeducation.com/images/universities/usa/webster-1.webp" },
    { name: "Avila University", logo: "https://admizzeducation.com/images/universities/usa/AVILA.webp" },
    { name: "Concordia University", logo: "https://admizzeducation.com/images/universities/usa/CONCORDIA.webp" },
    { name: "Southeast Missouri State", logo: "https://admizzeducation.com/images/universities/usa/SOUTHEAST-MISSOURI.webp" },
    { name: "Herzing University", logo: "https://admizzeducation.com/images/universities/usa/HERZING.webp" },
    { name: "Wright State University", logo: "https://admizzeducation.com/images/universities/usa/WRIGHT-STATE.webp" },
    { name: "Washington University", logo: "https://admizzeducation.com/images/universities/usa/WASHINGTON.webp" },
    { name: "Texas State University", logo: "https://admizzeducation.com/images/universities/usa/TEXAS.webp" },
    { name: "Murray State University", logo: "https://admizzeducation.com/images/universities/usa/MURRAY.webp" },
  ],
  Australia: [
    { name: "Western Sydney University", logo: "https://admizzeducation.com/images/universities/australia/western-sydney-university.webp" },
    { name: "La Trobe University", logo: "https://admizzeducation.com/images/universities/australia/la-trobe-university.webp" },
    { name: "Victoria University", logo: "https://admizzeducation.com/images/universities/australia/victoria-university.webp" },
    { name: "University of Queensland", logo: "https://admizzeducation.com/images/universities/australia/university-of-queensland.webp" },
    { name: "Monash University", logo: "https://admizzeducation.com/images/universities/australia/monash-university.webp" },
    { name: "RMIT University", logo: "https://admizzeducation.com/images/universities/australia/rmit-university.webp" },
  ],
  Canada: [
    { name: "University of Toronto", logo: "https://admizzeducation.com/images/universities/canada/university-of-toronto.webp" },
    { name: "University of British Columbia", logo: "https://admizzeducation.com/images/universities/canada/university-of-british-columbia.webp" },
    { name: "McGill University", logo: "https://admizzeducation.com/images/universities/canada/mcgill-university.webp" },
    { name: "McMaster University", logo: "https://admizzeducation.com/images/universities/canada/mcmaster-university.webp" },
    { name: "University of Waterloo", logo: "https://admizzeducation.com/images/universities/canada/university-of-waterloo.webp" },
  ],
  India: [
    { name: "VIT", logo: "https://admizzeducation.com/images/universities/india/vit.webp" },
    { name: "University of Delhi", logo: "https://admizzeducation.com/images/universities/india/university-of-delhi.webp" },
    { name: "JNU", logo: "https://admizzeducation.com/images/universities/india/jawaharlal-nehru-university.webp" },
    { name: "Anna University", logo: "https://admizzeducation.com/images/universities/india/anna-university.webp" },
    { name: "IISc Bangalore", logo: "https://admizzeducation.com/images/universities/india/iisc-bangalore.webp" },
  ],
  "New Zealand": [
    { name: "University of Auckland", logo: "https://admizzeducation.com/images/universities/newzealand/university-of-auckland.webp" },
    { name: "University of Otago", logo: "https://admizzeducation.com/images/universities/newzealand/university-of-otago.webp" },
    { name: "Victoria University of Wellington", logo: "https://admizzeducation.com/images/universities/newzealand/victoria-university-of-wellington.webp" },
    { name: "Massey University", logo: "https://admizzeducation.com/images/universities/newzealand/massey-university.webp" },
    { name: "Lincoln University", logo: "https://admizzeducation.com/images/universities/newzealand/lincoln-university.webp" },
  ],
  Finland: [
    { name: "Haaga-Helia", logo: "https://admizzeducation.com/images/universities/finland/haaga-helia.webp" },
    { name: "Lab University", logo: "https://admizzeducation.com/images/universities/finland/lab-university.webp" },
    { name: "Satakunta University", logo: "https://admizzeducation.com/images/universities/finland/satakunta-university.webp" },
    { name: "Vaasa University", logo: "https://admizzeducation.com/images/universities/finland/vaasa-university.webp" },
  ],
  Germany: [
    { name: "TU Munich", logo: "https://admizzeducation.com/images/universities/germany/technical-university-of-munich.webp" },
    { name: "LMU München", logo: "https://admizzeducation.com/images/universities/germany/ludwig-maximilians-universitat.webp" },
    { name: "Heidelberg University", logo: "https://admizzeducation.com/images/universities/germany/heidelberg-university.webp" },
    { name: "RWTH Aachen", logo: "https://admizzeducation.com/images/universities/germany/rwth-aachen-university.webp" },
    { name: "TU Berlin", logo: "https://admizzeducation.com/images/universities/germany/technische-universitat-berlin.webp" },
  ],
  France: [
    { name: "Sorbonne University", logo: "https://admizzeducation.com/images/universities/france/sorbonne-university.webp" },
    { name: "Sciences Po", logo: "https://admizzeducation.com/images/universities/france/sciences-po.webp" },
    { name: "Ecole Polytechnique", logo: "https://admizzeducation.com/images/universities/france/ecole-polytechnique.webp" },
    { name: "Université de Bordeaux", logo: "https://admizzeducation.com/images/universities/france/universite-de-bordeaux.webp" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Country filter config                                              */
/* ------------------------------------------------------------------ */

const countryFilters = [
  { key: "all", label: "All" },
  { key: "USA", label: "USA", flag: "\u{1F1FA}\u{1F1F8}" },
  { key: "UK", label: "UK", flag: "\u{1F1EC}\u{1F1E7}" },
  { key: "Australia", label: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
  { key: "Canada", label: "Canada", flag: "\u{1F1E8}\u{1F1E6}" },
  { key: "India", label: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { key: "New Zealand", label: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}" },
  { key: "Finland", label: "Finland", flag: "\u{1F1EB}\u{1F1EE}" },
  { key: "Germany", label: "Germany", flag: "\u{1F1E9}\u{1F1EA}" },
  { key: "France", label: "France", flag: "\u{1F1EB}\u{1F1F7}" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const MIN_CARDS_PER_SET = 8;
const SECONDS_PER_CARD = 120 / Math.ceil(22 / 2); // ~10.9s per card

function getFilteredList(country: string) {
  if (country === "all") return Object.values(universities).flat();
  return universities[country] || [];
}

function fillRow(row: { name: string; logo: string }[]) {
  if (row.length === 0) return [];
  const repeats = Math.ceil(MIN_CARDS_PER_SET / row.length);
  let set: { name: string; logo: string }[] = [];
  for (let r = 0; r < repeats; r++) set = set.concat(row);
  return set.concat(set); // duplicate for seamless loop
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TrustedPartners() {
  const [activeCountry, setActiveCountry] = useState("all");
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const renderRows = useCallback((country: string) => {
    const list = getFilteredList(country);
    const half = Math.ceil(list.length / 2);
    const row1 = fillRow(list.slice(0, half));
    const row2 = fillRow(list.slice(half));

    const set1Count = row1.length / 2;
    const set2Count = row2.length / 2;
    const dur1 = Math.max(set1Count * SECONDS_PER_CARD, 20);
    const dur2 = Math.max(set2Count * SECONDS_PER_CARD, 20);

    if (row1Ref.current) {
      row1Ref.current.innerHTML = row1
        .map(
          (u) =>
            `<div class="tp-partner-card"><img src="${u.logo}" alt="${u.name}" loading="lazy"><span>${u.name}</span></div>`
        )
        .join("");
      row1Ref.current.style.animation = `tp-marquee-right ${dur1}s linear infinite`;
    }

    if (row2Ref.current) {
      row2Ref.current.innerHTML = row2
        .map(
          (u) =>
            `<div class="tp-partner-card"><img src="${u.logo}" alt="${u.name}" loading="lazy"><span>${u.name}</span></div>`
        )
        .join("");
      row2Ref.current.style.animation = `tp-marquee-left ${dur2}s linear infinite`;
    }
  }, []);

  useEffect(() => {
    renderRows(activeCountry);
  }, [activeCountry, renderRows]);

  function handleFilter(country: string) {
    setActiveCountry(country);
  }

  return (
    <>
      <style>{`
        @keyframes tp-marquee-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tp-marquee-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .tp-marquee-wrap:hover .tp-marquee {
          animation-play-state: paused;
        }
        .tp-marquee {
          display: flex;
          gap: 20px;
          width: max-content;
        }
        .tp-partner-card {
          flex-shrink: 0;
          width: 200px;
          background: #fff;
          border-radius: 14px;
          padding: 20px 16px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .tp-partner-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }
        .tp-partner-card img {
          width: 80px;
          height: 60px;
          object-fit: contain;
          margin: 0 auto 10px;
          display: block;
        }
        .tp-partner-card span {
          font-size: 12px;
          font-weight: 500;
          color: #333;
          display: block;
          line-height: 1.3;
        }
        @media (max-width: 768px) {
          .tp-partner-card {
            width: 160px;
            padding: 16px 12px;
          }
        }
      `}</style>

      <section className="py-16 bg-[#f8f9ff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            TRUSTED PARTNERS
          </p>

          {/* Heading */}
          <h2 className="text-center text-2xl md:text-[32px] font-extrabold text-navy max-w-[600px] mx-auto mb-3 leading-tight">
            Trusted by 100+ Universities, Colleges &amp; Schools Worldwide
          </h2>

          {/* Subtext */}
          <p className="text-center text-[15px] text-gray-dark max-w-[520px] mx-auto mb-7">
            We partner with leading institutions worldwide to provide our
            students with the best opportunities.
          </p>

          {/* Trust Badges */}
          <div className="flex justify-center items-center gap-6 mb-7">
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#001353">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
              <span>100+ Institutions</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#001353">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              <span>Verified Partners</span>
            </div>
          </div>

          {/* Country Filter Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-9">
            {countryFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilter(f.key)}
                className={`px-4 py-2 rounded-full border text-[13px] font-medium cursor-pointer transition-all ${
                  activeCountry === f.key
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-gray-700 border-gray-200 hover:border-navy hover:text-navy"
                }`}
              >
                {f.flag ? `${f.flag} ${f.label}` : f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Marquee Row 1 (scrolls right) */}
        <div className="tp-marquee-wrap relative mb-4 overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#f8f9ff] to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#f8f9ff] to-transparent" />
          <div className="tp-marquee" ref={row1Ref} />
        </div>

        {/* Marquee Row 2 (scrolls left) */}
        <div className="tp-marquee-wrap relative mb-4 overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#f8f9ff] to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#f8f9ff] to-transparent" />
          <div className="tp-marquee" ref={row2Ref} />
        </div>
      </section>
    </>
  );
}

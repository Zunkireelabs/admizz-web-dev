"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const offices = [
  {
    country: "USA",
    flag: "us",
    city: "Denver, Colorado, USA",
    address: "",
    phone: "",
    email: "hello@admizz.com",
    mapQuery: "Denver, Colorado, USA",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d392041.5985498284!2d-105.05978785!3d39.7642548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x118ef4f8278a36d6!2sDenver%2C%20CO!5e0!3m2!1sen!2sus!4v1",
  },
  {
    country: "India",
    flag: "in",
    city: "",
    address:
      "2nd Floor, Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062, India",
    phone: "",
    email: "hello@admizz.com",
    mapQuery:
      "Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.567843767493!2d77.5671!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15c1e2a0d12d%3A0x71be7e2d9f9b4e1a!2sKanakapura%20Main%20Rd%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1",
  },
  {
    country: "Zambia",
    flag: "zm",
    city: "",
    address: "Plot number 12A, Lusaka, Zambia",
    phone: "",
    email: "hello@admizz.com",
    mapQuery: "Lusaka, Zambia",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246740.5508684509!2d28.2224!3d-15.3875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408b4eab21f0b3%3A0xa26736511b44bfab!2sLusaka%2C%20Zambia!5e0!3m2!1sen!2szm!4v1",
  },
  {
    country: "Bangladesh",
    flag: "bd",
    city: "",
    address: "Rajagalli, Bogra, Bangladesh",
    phone: "",
    email: "hello@admizz.com",
    mapQuery: "Bogra, Bangladesh",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57889.10!2d89.3600!3d24.8500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc5518a0f3f42d%3A0x9bf8b56dc4789e32!2sBogra%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1",
  },
  {
    country: "Nepal",
    flag: "np",
    cities: [
      {
        name: "Kathmandu",
        address:
          "Sita Ram Square (4th Floor), Putalisadak, Kathmandu 44600, Nepal (Opp. to Nabil Bank)",
        phone: "+977-01-5328444, +977-9856100444",
        mapQuery:
          "Admizz Education Nepal, Sita Ram Square, Putalisadak, Kathmandu",
        mapEmbed:
          "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3532!2d85.324!3d27.7045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190e46e90e81%3A0x787f8a00af1c4d6a!2sAdmizz%20Education%20Nepal!5e0!3m2!1sen!2snp!4v1",
      },
      {
        name: "Birgunj",
        pageSlug: "birgunj",
        address: "Ghanta Ghar, Link Rd, Birgunj 44300, Nepal",
        localCounsellorCard: true,
        accent: "#1E6DEB" as const,
        accentBg: "#EBF3FF" as const,
        waNumber: "9779856100444",
      },
      {
        name: "Janakpur",
        pageSlug: "janakpur",
        address: "Vishwakarma Chowk-04, Janakpurdham (Near Sarhanchiya Kuti), Nepal",
        localCounsellorCard: true,
        accent: "#3FB5A0" as const,
        accentBg: "#EDFAF7" as const,
        waNumber: "9779856100444",
      },
    ],
    email: "hello@admizz.com",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toEmoji(code: string) {
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");
}

/* ------------------------------------------------------------------ */
/*  Glass card wrapper                                                 */
/* ------------------------------------------------------------------ */

const glassStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  boxShadow:
    "0 8px 32px rgba(13, 18, 130, 0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
};

/* ------------------------------------------------------------------ */
/*  Office Card (horizontal: info left, map right)                     */
/* ------------------------------------------------------------------ */

function OfficeCard({
  flag,
  name,
  address,
  phone,
  email,
  mapQuery,
  mapEmbed,
  pageSlug,
}: {
  flag: string;
  name: string;
  address: string;
  phone?: string;
  email: string;
  mapQuery: string;
  mapEmbed: string;
  pageSlug?: string;
}) {
  return (
    <div
      className="rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={glassStyle}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left — Info */}
        <div className="flex-1 p-6 md:p-7">
          {/* Flag + Name */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-xl leading-none">{toEmoji(flag)}</span>
            {pageSlug ? (
              <a
                href={`/${pageSlug}`}
                className="group inline-flex items-center gap-1 text-[17px] font-bold text-[#0D1282] hover:text-[#1E6DEB] transition-colors"
              >
                <h3 className="text-[17px] font-bold group-hover:underline">{name}</h3>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            ) : (
              <h3 className="text-[17px] font-bold text-[#0D1282]">{name}</h3>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-2.5 mb-3.5">
            <svg
              className="w-[18px] h-[18px] shrink-0 mt-0.5 text-[#6B7280]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              {address}
            </p>
          </div>

          {/* Phone */}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 mb-3.5 group/phone"
            >
              <svg
                className="w-[18px] h-[18px] shrink-0 text-[#6B7280]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span className="text-[14px] text-gray-600 group-hover/phone:underline">
                {phone}
              </span>
            </a>
          )}

          {/* Email */}
          <div className="flex items-center gap-2.5">
            <svg
              className="w-[18px] h-[18px] shrink-0 text-[#6B7280]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <a
              href={`mailto:${email}`}
              className="text-[14px] text-[#1E6DEB] hover:underline"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Right — Map */}
        <div className="sm:w-[200px] md:w-[220px] shrink-0 p-3 sm:p-4 flex flex-col">
          <div className="relative flex-1 min-h-[140px] rounded-xl overflow-hidden bg-gray-100">
            <iframe
              src={mapEmbed}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${name}`}
              style={{ border: 0 }}
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #4A90D9, #6BB8F0)",
            }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            View on Map
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Local Counsellor Card (Birgunj / Janakpur)                        */
/* ------------------------------------------------------------------ */

function LocalCounsellorCard({
  flag,
  name,
  pageSlug,
  accent,
  accentBg,
  waNumber,
}: {
  flag: string;
  name: string;
  pageSlug: string;
  accent: string;
  accentBg: string;
  waNumber: string;
}) {
  const waText = encodeURIComponent(`Hi Admizz, I'm interested in studying abroad`);
  return (
    <div
      className="rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={glassStyle}
    >
      <div className="h-[3px]" style={{ background: accent }} />
      <div className="flex flex-col sm:flex-row">
        {/* Left — Info */}
        <div className="flex-1 p-6 md:p-7">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-xl leading-none">{toEmoji(flag)}</span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em]"
              style={{ background: accentBg, color: accent }}
            >
              📍 {name}
            </span>
          </div>

          <h3
            className="text-[18px] md:text-[20px] font-bold leading-snug mb-3"
            style={{ color: "#0D1282" }}
          >
            Are you a student<br className="hidden sm:block" /> from {name}?
          </h3>

          <p className="text-[14px] leading-relaxed" style={{ color: "#5C7189" }}>
            Our local counsellors are ready to guide you — from choosing the right country to getting your visa sorted, step by step.
          </p>
        </div>

        {/* Right — Action panel */}
        <div
          className="sm:w-[200px] md:w-[210px] shrink-0 p-5 flex flex-col items-stretch justify-center gap-3"
          style={{ background: `linear-gradient(135deg, ${accentBg}80, rgba(255,255,255,0.4))`, borderLeft: "1px solid rgba(255,255,255,0.7)" }}
        >
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "#25D366", boxShadow: "0 4px 12px rgba(37,211,102,0.25)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            WhatsApp Us
          </a>

          <a
            href={`/${pageSlug}`}
            className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: `${accentBg}`, color: accent, border: `1px solid ${accent}25` }}
          >
            Visit {name}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Coming Soon Card                                                   */
/* ------------------------------------------------------------------ */

function ComingSoonCard({ flag, name }: { flag: string; name: string }) {
  return (
    <div
      className="rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 relative"
      style={{
        ...glassStyle,
        border: "2px dashed rgba(13, 18, 130, 0.15)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(232,240,254,0.5) 50%, rgba(240,236,250,0.5) 100%)",
      }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #1E6DEB, transparent)" }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #0D1282, transparent)" }}
      />

      <div className="flex flex-col sm:flex-row items-center relative z-10">
        {/* Left — Info */}
        <div className="flex-1 p-6 md:p-7 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-xl leading-none">{toEmoji(flag)}</span>
            <h3 className="text-[17px] font-bold text-[#0D1282]">{name}</h3>
          </div>

          <p className="text-[13px] text-gray-500 mb-5 leading-relaxed max-w-[260px]">
            We&apos;re expanding to {name}! Stay tuned for our newest office
            location.
          </p>

          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold text-white shadow-md"
            style={{
              background: "linear-gradient(135deg, #0D1282, #1E6DEB)",
              boxShadow: "0 4px 14px rgba(13,18,130,0.2)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Coming Soon
          </span>
        </div>

        {/* Right — Illustration */}
        <div className="sm:w-[200px] md:w-[220px] shrink-0 p-4 flex items-center justify-center">
          <div
            className="w-full min-h-[140px] rounded-xl flex flex-col items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,18,130,0.04), rgba(30,109,235,0.06))",
            }}
          >
            <svg
              className="w-12 h-12 text-[#1E6DEB]/40 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="text-[11px] font-medium text-[#0D1282]/30 tracking-wide uppercase">
              Opening Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function GlobalPresence() {
  const nepalIndex = offices.findIndex((o) => o.country === "Nepal");
  const [activeTab, setActiveTab] = useState(nepalIndex);

  return (
    <section
      className="py-14 md:py-20"
      style={{
        background: "linear-gradient(135deg, #F0ECFA 0%, #E8F0FE 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-[26px] md:text-[34px] font-bold text-[#0D1282] mb-3"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Our Global Presence
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            With a strong international presence, our offices are dedicated to
            providing support and opportunities on a global scale.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex overflow-x-auto max-w-full rounded-xl border border-gray-200 bg-white">
            {offices.map((office, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={office.country}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-5 md:px-6 py-3 text-[14px] font-medium whitespace-nowrap transition-all duration-200 shrink-0 border-b-2 ${
                    isActive
                      ? "border-[#0D1282] text-[#0D1282] bg-[#F5F2FF]/60 font-semibold"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base leading-none">
                    {toEmoji(office.flag)}
                  </span>
                  {office.country}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[240px]">
          {offices.map((office, idx) => {
            const isActive = idx === activeTab;
            const isNepal = "cities" in office && office.cities;

            return (
              <div
                key={office.country}
                className="transition-all duration-300 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(12px)",
                  pointerEvents: isActive ? "auto" : "none",
                  position: isActive ? "relative" : "absolute",
                  top: isActive ? undefined : 0,
                  left: isActive ? undefined : 0,
                  right: isActive ? undefined : 0,
                }}
              >
                {isNepal && "cities" in office && office.cities ? (
                  (() => {
                    const realCities = office.cities.filter(
                      (c) => !("comingSoon" in c && c.comingSoon)
                    );
                    const trailingOdd =
                      realCities.length % 2 === 1
                        ? realCities[realCities.length - 1]
                        : null;
                    const pairedCities = trailingOdd
                      ? realCities.slice(0, -1)
                      : realCities;
                    const comingSoonCities = office.cities.filter(
                      (c) => "comingSoon" in c && c.comingSoon
                    );
                    return (
                      <>
                        {pairedCities.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {pairedCities.map((c) => (
                              (c as { localCounsellorCard?: boolean }).localCounsellorCard ? (
                                <LocalCounsellorCard
                                  key={c.name}
                                  flag={office.flag}
                                  name={c.name}
                                  pageSlug={(c as { pageSlug: string }).pageSlug}
                                  accent={(c as { accent: string }).accent}
                                  accentBg={(c as { accentBg: string }).accentBg}
                                  waNumber={(c as { waNumber: string }).waNumber}
                                />
                              ) : (
                              <OfficeCard
                                key={c.name}
                                flag={office.flag}
                                name={c.name}
                                address={(c as { address: string }).address}
                                phone={(c as { phone: string }).phone}
                                email={(c as { email?: string }).email ?? office.email}
                                mapQuery={(c as { mapQuery: string }).mapQuery}
                                mapEmbed={(c as { mapEmbed: string }).mapEmbed}
                                pageSlug={(c as { pageSlug?: string }).pageSlug}
                              />
                              )
                            ))}
                          </div>
                        )}
                        {trailingOdd && (
                          <div
                            className={`flex justify-center ${
                              pairedCities.length > 0 ? "mt-5" : ""
                            }`}
                          >
                            <div className="w-full md:w-[calc(50%-10px)]">
                              {(trailingOdd as { localCounsellorCard?: boolean }).localCounsellorCard ? (
                                <LocalCounsellorCard
                                  flag={office.flag}
                                  name={trailingOdd.name}
                                  pageSlug={(trailingOdd as { pageSlug: string }).pageSlug}
                                  accent={(trailingOdd as { accent: string }).accent}
                                  accentBg={(trailingOdd as { accentBg: string }).accentBg}
                                  waNumber={(trailingOdd as { waNumber: string }).waNumber}
                                />
                              ) : (
                                <OfficeCard
                                  flag={office.flag}
                                  name={trailingOdd.name}
                                  address={(trailingOdd as { address: string }).address}
                                  phone={(trailingOdd as { phone: string }).phone}
                                  email={(trailingOdd as { email?: string }).email ?? office.email}
                                  mapQuery={(trailingOdd as { mapQuery: string }).mapQuery}
                                  mapEmbed={(trailingOdd as { mapEmbed: string }).mapEmbed}
                                  pageSlug={(trailingOdd as { pageSlug?: string }).pageSlug}
                                />
                              )}
                            </div>
                          </div>
                        )}
                        {comingSoonCities.length > 0 && (
                          <div className="flex justify-center mt-5">
                            <div className="w-full md:w-[calc(50%-10px)]">
                              {comingSoonCities.map((c) => (
                                <ComingSoonCard
                                  key={c.name}
                                  flag={office.flag}
                                  name={c.name}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()
                ) : (
                  <div className="max-w-2xl mx-auto">
                    <OfficeCard
                      flag={office.flag}
                      name={
                        office.country === "USA"
                          ? "Denver, Colorado"
                          : office.country
                      }
                      address={office.city || office.address || ""}
                      phone={"phone" in office ? office.phone : undefined}
                      email={office.email}
                      mapQuery={
                        "mapQuery" in office
                          ? (office as { mapQuery: string }).mapQuery
                          : ""
                      }
                      mapEmbed={
                        "mapEmbed" in office
                          ? (office as { mapEmbed: string }).mapEmbed
                          : ""
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-10 pt-8 border-t border-[#0D1282]/8 text-center">
          <p className="text-[15px] text-gray-500 mb-4">
            Need help? Contact our nearest office.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0D1282, #1E6DEB)",
              boxShadow: "0 4px 14px rgba(13,18,130,0.25)",
            }}
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

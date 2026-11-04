"use client";

import { useState } from "react";
import Link from "next/link";
import { blogH2, blogP } from "@/components/lib/blog-typography";

export interface TimelineItem {
  id: string;
  year: string;
  upcoming: boolean;
  country: string;
  effective: string;
  title: string;
  summary: string;
  affects: string;
  source: { label: string; url: string };
  guide: { label: string; href: string };
  explainer?: { label: string; href: string };
}

const COUNTRY_STYLE: Record<string, { badge: string; bar: string }> = {
  "United Kingdom": { badge: "bg-[#E8ECFA] text-[#1E3A8A]", bar: "#1E3A8A" },
  Australia: { badge: "bg-[#FFF1D1] text-[#8A5A00]", bar: "#D99A00" },
  Canada: { badge: "bg-[#FDE8EA] text-[#B3122B]", bar: "#C8102E" },
};

const countryId = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

export default function RuleTimeline({ items, countries }: { items: TimelineItem[]; countries: string[] }) {
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? items : items.filter((c) => c.country === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by country">
        {["All", ...countries].map((c) => {
          const count = c === "All" ? items.length : items.filter((x) => x.country === c).length;
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={active}
              className={`text-[13px] font-semibold px-4 py-2 rounded-full border transition-colors ${
                active ? "bg-[#001353] border-[#001353] text-white" : "bg-white border-border-light text-navy hover:bg-off-white"
              }`}
            >
              {c} ({count})
            </button>
          );
        })}
      </div>

      <ol className="space-y-6">
            {visible
              .map((c) => {
                const style = COUNTRY_STYLE[c.country] ?? COUNTRY_STYLE["United Kingdom"];
                const firstOfCountry = items.findIndex((x) => x.country === c.country) === items.indexOf(c);
                return (
                  <li key={c.id} id={c.id} className="relative scroll-mt-28">
                    {firstOfCountry && <span id={countryId(c.country)} className="absolute -top-24" aria-hidden="true" />}
                    <div className="rounded-[14px] border border-border-light bg-white p-6 shadow-sm" style={{ borderLeft: `4px solid ${style.bar}` }}>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${style.badge}`}>{c.country}</span>
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full bg-off-white text-navy border border-border-light">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
                          </svg>
                          Effective {c.effective}
                        </span>
                        {c.upcoming && (
                          <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-[#E3F6EC] text-[#0F6E56]">Upcoming</span>
                        )}
                      </div>
                      <h3 className="mb-3" style={{ ...blogH2.style, borderColor: undefined }}>{c.title}</h3>
                      <p className={blogP.className} style={blogP.style}>{c.summary}</p>

                      <div className="rounded-xl bg-off-white border border-border-light px-4 py-3 mb-4">
                        <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Who it affects</p>
                        <p className="text-[16px] leading-relaxed text-gray-dark">{c.affects}</p>
                      </div>

                      <a
                        href={c.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[15px] font-semibold text-navy underline underline-offset-2"
                      >
                        {c.source.label}
                        <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M10 7H6a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4" />
                        </svg>
                      </a>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link href={c.guide.href} className="text-[13px] font-semibold px-3.5 py-2 rounded-full bg-[#EEF2FF] text-[#0D1282] hover:bg-[#E0E7FF] transition-colors">
                          {c.guide.label}
                        </Link>
                        {c.explainer && (
                          <Link href={c.explainer.href} className="text-[13px] font-semibold px-3.5 py-2 rounded-full border border-[#0D1282]/20 text-[#0D1282] hover:bg-[#EEF2FF] transition-colors">
                            {c.explainer.label}
                          </Link>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ol>
    </div>
  );
}

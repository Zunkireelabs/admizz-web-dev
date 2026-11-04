"use client";

import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import DestinationEntitySchema from "@/components/ui/DestinationEntitySchema";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import ConsultationPopup from "@/components/ui/consultation/ConsultationPopup";
import Select from "@/components/ui/consultation/Select";
import { countryOptions, dialFor } from "@/components/ui/consultation/useConsultationForm";
import { NEPAL_OFFICES } from "@/data/nepalOffices";
import type { SanityPost } from "@/types";

export interface NepalBenefit {
  title: string;
  description: string;
}

export interface VisaRequirement {
  category: string;
  details: string;
}

export interface IntakeRow {
  intake: string;
  months: string;
  details?: string;
}

export interface TestRequirement {
  test: string;
  score: string;
  notes?: string;
}

export interface CostRow {
  category: string;
  cost: string;
  nprCost?: string;
}

export interface ScholarshipRow {
  name: string;
  provider?: string;
  details: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

/** A big number shown beside the "why study here" list, e.g. { value: "18", unit: "months", label: "Graduate visa" } */
export interface HighlightStat {
  value: string;
  unit?: string;
  label: string;
  note?: string;
}

export interface StudentPhoto {
  name: string;
  image: string;
  caption: string;
  /** CSS object-position, e.g. "center 70%", to keep faces in frame */
  imagePosition?: string;
}

export interface GuideSection {
  id: string;
  title: string;
  intro?: string;
  table?: { headers: string[]; rows: string[][] };
  bullets?: string[];
  links?: { label: string; href: string }[];
  note?: string;
}

export interface SourceLink {
  label: string;
  href: string;
}

/** Same shape as GuideSection; rendered in the same style. */
export type ExtraSection = GuideSection;

export interface NepalVariantData {
  countryName: string;
  heroHeading: string;
  heroSubheading: string;
  /** Short hero paragraph; falls back to heroSubheading */
  heroDescription?: string;
  /** Background photo for the hero and closing banner, e.g. /images/hero/uk-hero.webp */
  heroImage?: string;
  /** Facts bar under the hero (intakes, tuition, visa...) */
  quickFacts?: QuickFact[];
  introTitle: string;
  introContent: string;
  whyStudyTitle: string;
  whyStudyIntro?: string;
  benefits: NepalBenefit[];
  /** First stat renders large; the rest as small tiles */
  highlightStats?: HighlightStat[];
  whyAdmizzTitle?: string;
  whyAdmizzPoints?: string[];
  topCoursesTitle?: string;
  topCourses?: string[];
  visaTitle: string;
  visaIntro?: string;
  visaRequirements: VisaRequirement[];
  visaNote?: string;
  /** Checklist shown beside the visa steps */
  visaDocuments?: string[];
  intakesTitle: string;
  intakesIntro?: string;
  intakes: IntakeRow[];
  intakesNote?: string;
  testTitle?: string;
  testIntro?: string;
  testRequirements?: TestRequirement[];
  testNote?: string;
  costTitle: string;
  costIntro?: string;
  costTables: {
    title?: string;
    rows: CostRow[];
  }[];
  costNote?: string;
  scholarshipsTitle: string;
  scholarshipsIntro?: string;
  scholarships: ScholarshipRow[];
  scholarshipsNote?: string;
  /** Admizz students already studying in this country */
  students?: StudentPhoto[];
  universities: { name: string; logo: string }[];
  faqItems: FAQItem[];
  ctaTitle: string;
  ctaContent: string;
  countryCategorySlug?: string;
  /** Answer-first summary shown under the "Why study" list, for search and AI answer engines. */
  quickAnswer?: string;
  /** Human-readable month/year the page content was last revised, e.g. "October 2026". */
  lastUpdated?: string;
  /** Official sources the page's facts can be checked against. */
  sources?: { label: string; url?: string; href?: string }[];
  /** Extra guide sections (requirements, documents, work rights...) rendered before the FAQ. */
  extraSections?: ExtraSection[];
  /** Internal links to closely related Admizz pages. */
  relatedLinks?: { label: string; href: string; description?: string }[];
  /** ISO date (YYYY-MM-DD) of the last real content review. Only set it when the page was actually
   * reviewed, because it is published as WebPage dateModified for search and AI engines. */
  dateModified?: string;
  /** Month/year shown as "Checked in ..." next to the quick answer. */
  lastChecked?: string;
  guideTabLabel?: string;
  guideSections?: GuideSection[];
  sourcesTitle?: string;
}

interface NepalVariantTemplateProps {
  data: NepalVariantData;
  blogPosts?: SanityPost[];
}

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };
const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const eyebrowClass = "text-xs font-bold tracking-[0.16em] uppercase text-blue-royal mb-3";
const h2Class = "text-3xl md:text-[42px] font-bold leading-[1.15] text-navy";
const leadClass = "mt-4 text-base md:text-[17px] leading-relaxed text-gray-dark max-w-xl";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Michaelmas Term — September (Main Intake)" → "Sep"; null when no month is named */
function shortMonth(intake: string): string | null {
  const lower = intake.toLowerCase();
  const hit = MONTHS.find((m) => new RegExp(`\\b${m.toLowerCase()}`).test(lower));
  return hit ?? null;
}

/** Decorative blurred card shape (no text) used at the row edges so the main intake reads as the center */
function GhostCard({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      // Same gap as the real cards (gap-6) and shrunk toward that gap, so it reads as its own card
      className={`hidden md:block absolute top-1/2 -translate-y-1/2 scale-90 h-[85%] w-[min(340px,26vw)] rounded-3xl border border-[#DCE2F5] bg-white p-8 opacity-50 blur-[1.5px] pointer-events-none ${
        side === "left" ? "right-full mr-6 origin-right" : "left-full ml-6 origin-left"
      }`}
    >
      <div className="h-12 w-24 rounded-xl bg-[#C9D1EA]" />
      <div className="mt-6 h-4 w-36 rounded bg-[#D5DCF0]" />
      <div className="mt-3 h-3 w-48 rounded bg-[#E1E6F5]" />
      <div className="mt-8 h-px w-full bg-[#E1E6F5]" />
      <div className="mt-5 h-3 w-32 rounded bg-[#D5DCF0]" />
    </div>
  );
}

/**
 * Intake cards with the main intake (listed first in the data) in the middle and the real
 * intakes beside it, all readable. Blurred empty cards at the edges make the row feel like it
 * continues. Phone: swipe carousel that opens on the main intake.
 */
function IntakeCards({ intakes }: { intakes: IntakeRow[] }) {
  // [main, b, c] → [c, main, b]; with two intakes the main one stays first
  const ordered = intakes.length >= 3 ? [intakes[2], intakes[0], intakes[1], ...intakes.slice(3)] : intakes;
  const mainIndex = ordered.indexOf(intakes[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(mainIndex);

  const cards = () => Array.from(scrollRef.current?.querySelectorAll<HTMLElement>("[data-intake-card]") ?? []);

  // Phone: start with the main intake centred
  useEffect(() => {
    const box = scrollRef.current;
    const card = cards()[mainIndex];
    if (!box || !card || box.scrollWidth <= box.clientWidth) return;
    box.scrollLeft = card.offsetLeft - (box.clientWidth - card.offsetWidth) / 2;
  }, [mainIndex]);

  const onScroll = () => {
    const box = scrollRef.current;
    if (!box) return;
    const center = box.scrollLeft + box.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    cards().forEach((el, i) => {
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="relative mt-10 -mx-4 px-[11%] md:mx-auto md:px-0 md:w-fit flex items-center gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <GhostCard side="left" />
        {ordered.map((row, i) => {
          const month = shortMonth(row.intake);
          const main = i === mainIndex;
          return (
            <div
              key={row.intake}
              data-intake-card
              className={`relative z-10 snap-center shrink-0 w-[78vw] max-w-[320px] md:max-w-none rounded-3xl ${
                main
                  ? "md:w-[min(420px,34vw)] p-7 md:p-10 bg-navy text-white shadow-[0_30px_60px_-25px_rgba(0,19,83,0.55)]"
                  : "md:w-[min(340px,26vw)] p-7 md:p-8 bg-white"
              }`}
            >
              {main && (
                <span className="absolute top-5 right-5 rounded-full bg-golden px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black">
                  Main intake
                </span>
              )}
              {month && (
                <p className={`font-bold leading-none ${main ? "text-golden text-6xl md:text-[80px]" : "text-navy text-5xl md:text-[64px]"}`} style={rubikFont}>{month}</p>
              )}
              <h3 className={`mt-4 text-lg md:text-xl font-semibold ${main ? "text-white" : "text-navy"}`} style={rubikFont}>{row.intake}</h3>
              {row.details && <p className={`mt-2 text-[15px] leading-relaxed ${main ? "text-[#B9C3E6]" : "text-body"}`}>{row.details}</p>}
              <p className={`mt-5 pt-4 border-t text-sm font-semibold ${main ? "border-white/15 text-white" : "border-border-light text-navy"}`}>{row.months}</p>
            </div>
          );
        })}
        <GhostCard side="right" />
      </div>
      {/* Phone: position dots */}
      <div className="mt-5 flex justify-center gap-2 md:hidden" aria-hidden="true">
        {ordered.map((row, i) => (
          <span key={row.intake} className={`h-2 rounded-full transition-all ${i === active ? "w-5 bg-blue-royal" : "w-2 bg-[#C9D1EA]"}`} />
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-gray-dark md:hidden">← Swipe to see other intakes →</p>
    </>
  );
}

/** "1. Choose Course" → "Choose Course" */
const stripStepNumber = (s: string) => s.replace(/^\s*\d+\.\s*/, "");


/** "Topic: details" bullets render as a two-column table, other bullets as one column. */
function BulletTable({ bullets }: { bullets: string[] }) {
  const split = bullets.map((b) => {
    const m = b.match(/^([^:]{2,48}): ([\s\S]+)$/);
    return m ? [m[1], m[2]] : null;
  });
  const labelled = split.every(Boolean);
  const headers = labelled ? ["Topic", "Details"] : ["Key points"];
  const rows: string[][] = labelled ? (split as string[][]) : bullets.map((b) => [b]);
  return (
    <div className="overflow-x-auto mb-4 rounded-2xl border border-border-light bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-navy text-white">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 sm:px-6 py-3 text-sm font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={row.join("|")} className={r % 2 === 0 ? "bg-white" : "bg-[#F4F6FF]"}>
              {row.map((cell, c) => (
                <td key={c} className={`px-4 sm:px-6 py-3 text-sm align-top ${labelled && c === 0 ? "text-navy font-medium" : "text-body"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GuideBlock({ section, tinted }: { section: GuideSection; tinted: boolean }) {
  return (
    <section id={section.id} className={`scroll-mt-32 py-14 md:py-20 ${tinted ? "bg-[#F4F6FF]" : ""}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-[30px] font-bold text-navy mb-4" style={rubikFont}>{section.title}</h2>
        {section.intro && <p className="text-[15px] text-body mb-6">{section.intro}</p>}
        {section.table && (
          <div className="overflow-x-auto mb-4 rounded-2xl border border-border-light bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-navy text-white">
                  {section.table.headers.map((h) => (
                    <th key={h} className="text-left px-4 sm:px-6 py-3 text-sm font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row) => (
                  <tr key={row.join("|")} className="even:bg-[#F4F6FF]">
                    {row.map((cell, c) => (
                      <td key={c} className={`px-4 sm:px-6 py-3 text-sm align-top ${c === 0 ? "text-navy font-medium" : "text-body"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {section.bullets && <BulletTable bullets={section.bullets} />}
        {section.note && <p className="mt-4 text-sm text-gray-dark italic">{section.note}</p>}
        {section.links && (
          <p className="mt-4 text-sm text-gray-dark">
            Related guides:{" "}
            {section.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <Link href={l.href} className="text-blue-royal underline">{l.label}</Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

const baseTabs = [
  { id: "why", label: "Why Study Here" },
  { id: "cost", label: "Costs" },
  { id: "visa", label: "Visa Steps" },
  { id: "intakes", label: "Intakes" },
  { id: "scholarships", label: "Scholarships" },
  { id: "faq", label: "FAQs" },
];

export default function NepalVariantTemplate({ data, blogPosts }: NepalVariantTemplateProps) {
  const pathname = usePathname();
  const guideTabs = data.guideSections?.length
    ? [{ id: data.guideSections[0].id, label: data.guideTabLabel ?? "Requirements" }]
    : [];
  const tabs = [...baseTabs.slice(0, -1), ...guideTabs, baseTabs[baseTabs.length - 1]];
  const tabIds = tabs.map((t) => t.id).join(",");
  const [activeTab, setActiveTab] = useState("why");
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [heroName, setHeroName] = useState("");
  const [heroCountry, setHeroCountry] = useState("nepal");
  const [heroPhone, setHeroPhone] = useState("");
  const openPopup = () => setPopupOpen(true);
  const closePopup = useCallback(() => setPopupOpen(false), []);

  const onHeroSubmit = (e: FormEvent) => {
    e.preventDefault();
    openPopup();
  };

  const scrollToSection = (id: string) => {
    isClickScrolling.current = true;
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { isClickScrolling.current = false; }, 1000);
  };

  const scrollTabIntoView = useCallback((tabId: string) => {
    const container = tabScrollRef.current;
    const btn = container?.querySelector(`[data-tab="${tabId}"]`) as HTMLElement | null;
    if (!container || !btn) return;
    container.scrollTo({ left: btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
            scrollTabIntoView(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    tabIds.split(",").forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [scrollTabIntoView, tabIds]);

  const shortCountry = data.countryName.replace(/^the /i, "");
  const [mainStat, ...smallStats] = data.highlightStats ?? [];
  const heroText = data.heroDescription ?? data.heroSubheading;

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Study Destinations", url: "https://admizzeducation.com/study-destinations" },
          { name: data.countryName, url: `https://admizzeducation.com${pathname}` },
        ]}
      />
      <DestinationEntitySchema
        countryName={data.countryName}
        url={`https://admizzeducation.com${pathname}`}
      />
      {data.dateModified && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: data.heroHeading,
              url: `https://admizzeducation.com${pathname}`,
              dateModified: data.dateModified,
              author: { "@type": "Organization", name: "Admizz Education", url: "https://admizzeducation.com" },
              publisher: { "@type": "Organization", name: "Admizz Education", url: "https://admizzeducation.com" },
            }),
          }}
        />
      )}
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy">
        {data.heroImage && (
          <Image src={data.heroImage} alt="" fill priority className="object-cover object-center" sizes="100vw" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,19,83,0.94) 0%, rgba(0,19,83,0.82) 42%, rgba(0,19,83,0.25) 78%, rgba(0,19,83,0.05) 100%)",
          }}
        />
        <div className={`relative ${containerClass} pt-10 pb-24 md:pt-14 md:pb-32`}>
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/70 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/study-destinations" className="hover:text-white">Destinations</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{shortCountry} from Nepal</span>
          </nav>
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-golden mb-4">For students in Nepal</p>
              <h1 className="text-[40px] sm:text-5xl md:text-[64px] font-bold leading-[1.05] text-white" style={rubikFont}>
                {data.heroHeading}
              </h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/85 max-w-xl">{heroText}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={openPopup}
                  className="inline-flex lg:hidden items-center bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-8 py-3.5 rounded-full transition-colors"
                >
                  Book a Free Consultation →
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("cost")}
                  className="text-white font-semibold text-[15px] border-b border-white/50 hover:border-white pb-0.5"
                >
                  See costs &amp; visa steps
                </button>
              </div>
            </div>

            <form
              onSubmit={onHeroSubmit}
              className="hidden lg:block bg-white rounded-3xl p-8 shadow-[0_30px_60px_-30px_rgba(0,19,83,0.45)]"
            >
              <p className={eyebrowClass}>Free counseling</p>
              <h2 className="text-2xl font-bold text-navy" style={rubikFont}>Get your {shortCountry} plan</h2>
              <p className="mt-1.5 mb-5 text-sm text-gray-dark">Universities, costs and visa steps for your profile.</p>
              <div className="grid gap-2.5">
                <label className="sr-only" htmlFor="hero-name">Full name</label>
                <input
                  id="hero-name"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  className="h-12 rounded-xl border border-border-light px-4 text-[15px] text-navy outline-none focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/15"
                />
                <div className="flex gap-2">
                  <div className="w-[112px] flex-shrink-0">
                    <Select
                      id="hero-country"
                      ariaLabel="Country code"
                      value={heroCountry}
                      onChange={setHeroCountry}
                      options={countryOptions}
                      placeholder="+"
                      searchable
                      searchPlaceholder="Search country or code"
                      buttonLabel={(o) => dialFor(o.value) || "+"}
                      minListWidth={300}
                    />
                  </div>
                  <label className="sr-only" htmlFor="hero-phone">Phone number</label>
                  <input
                    id="hero-phone"
                    value={heroPhone}
                    onChange={(e) => setHeroPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                    placeholder="Phone number"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    className="h-12 min-w-0 flex-1 rounded-xl border border-border-light px-4 text-[15px] text-navy outline-none focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/15"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] py-3.5 rounded-full transition-colors"
              >
                Book a Free Consultation
              </button>
              <p className="mt-3 text-center text-xs text-gray-dark">Takes under a minute · No spam</p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FACTS BAR ===== */}
      {data.quickFacts && data.quickFacts.length > 0 && (
        <div className={`relative z-10 -mt-14 ${containerClass}`}>
          <dl className="bg-white rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,19,83,0.35)] grid grid-cols-2 md:grid-cols-5 py-2 md:py-6">
            {data.quickFacts.map((fact, i) => (
              <div
                key={fact.label}
                className={`px-5 py-3 md:py-0 md:px-6 ${i > 0 ? "md:border-l border-border-light" : ""} ${i % 2 === 1 ? "border-l md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} border-border-light`}
              >
                <dt className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.08em] text-gray-dark">{fact.label}</dt>
                <dd className="mt-1 text-[17px] md:text-xl font-semibold text-navy" style={rubikFont}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* ===== UNIVERSITY LOGOS (marquee) ===== */}
      {data.universities.length > 0 && (
        <section className="pt-14 pb-2" aria-label={`Partner universities in ${data.countryName}`}>
          <p className="text-center text-[13px] font-semibold text-gray-dark">
            {data.universities.length}+ partner universities in {data.countryName}
          </p>
          <style>{`
            @keyframes nvt-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .nvt-marquee:hover .nvt-track { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) { .nvt-track { animation: none !important; } }
          `}</style>
          <div
            className="nvt-marquee relative mt-6 overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <ul
              className="nvt-track flex w-max items-center gap-6"
              style={{ animation: `nvt-marquee ${Math.max(data.universities.length * 4, 30)}s linear infinite` }}
            >
              {[...data.universities, ...data.universities].map((u, i) => (
                <li
                  key={`${u.name}-${i}`}
                  aria-hidden={i >= data.universities.length}
                  className="relative h-20 w-44 shrink-0 rounded-2xl border border-border-light bg-white"
                >
                  <Image src={u.logo} alt={i < data.universities.length ? u.name : ""} fill className="object-contain p-1.5" sizes="176px" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== STICKY TABS ===== */}
      <nav className="sticky top-[70px] z-30 mt-8 py-3">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-fit max-w-full mx-auto rounded-full border border-white/70 bg-gradient-to-b from-white/75 to-white/45 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_32px_rgba(0,19,83,0.12)]">
            <div ref={tabScrollRef} className="overflow-x-auto scrollbar-hide rounded-full p-1.5">
              <div className="flex gap-1 min-w-max md:justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    data-tab={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-4 py-2 text-sm sm:text-[15px] font-medium whitespace-nowrap rounded-full transition-colors ${
                      activeTab === tab.id
                        ? "bg-white/80 text-blue-royal font-semibold shadow-[0_2px_10px_rgba(49,66,156,0.15)] ring-1 ring-white"
                        : "text-body hover:text-navy hover:bg-white/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== WHY STUDY HERE ===== */}
      <section id="why" className="scroll-mt-32 py-16 md:py-24">
        <div className={`${containerClass} ${mainStat ? "grid lg:grid-cols-[460px_1fr] gap-12 lg:gap-20 items-start" : ""}`}>
          {mainStat && (
            <div className="grid gap-4 lg:mt-10 order-2 lg:order-1">
              <div className="rounded-3xl bg-navy p-8 md:p-9 text-white">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-golden">{mainStat.label}</p>
                <p className="mt-2 font-bold leading-none" style={rubikFont}>
                  <span className="text-6xl md:text-7xl">{mainStat.value}</span>
                  {mainStat.unit && <span className="text-2xl md:text-[28px]"> {mainStat.unit}</span>}
                </p>
                {mainStat.note && <p className="mt-3 text-[15px] text-[#B9C3E6]">{mainStat.note}</p>}
              </div>
              {smallStats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {smallStats.map((s) => (
                    <div key={s.label} className="rounded-3xl bg-[#F4F6FF] p-6 md:p-7">
                      <p className={`${s.value.length > 4 ? "text-2xl md:text-[28px]" : "text-4xl md:text-[44px]"} font-bold leading-none text-navy break-words`} style={rubikFont}>{s.value}</p>
                      <p className="mt-2 font-semibold text-navy">{s.unit}</p>
                      <p className="text-sm text-gray-dark">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="order-1 lg:order-2">
            <p className={eyebrowClass}>Why {shortCountry}</p>
            <h2 className={h2Class} style={rubikFont}>{data.whyStudyTitle}</h2>
            {data.whyStudyIntro && <p className={leadClass}>{data.whyStudyIntro}</p>}
            <ol className={`mt-8 ${mainStat ? "" : "grid md:grid-cols-2 md:gap-x-12"}`}>
              {data.benefits.map((b, i) => (
                <li key={b.title} className="grid grid-cols-[48px_1fr] py-5 border-t border-border-light">
                  <span className="text-lg font-semibold text-blue-royal" style={rubikFont}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg md:text-[19px] font-semibold text-navy" style={rubikFont}>{b.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-body">{b.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            {data.quickAnswer && (
              <div className="mt-8 rounded-2xl border border-border-light bg-[#F4F6FF] px-5 py-4">
                <p className="text-[13px] font-semibold uppercase tracking-wide text-navy mb-1">Quick answer</p>
                <p className="text-[15px] text-body leading-relaxed">{data.quickAnswer}</p>
                {(data.lastChecked ?? data.lastUpdated) && (
                  <p className="mt-2 text-[13px] text-gray-dark italic">Checked in {data.lastChecked ?? data.lastUpdated}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== TOP COURSES (optional) ===== */}
      {data.topCourses && data.topCourses.length > 0 && (
        <section className={`${containerClass} pb-16 md:pb-20`}>
          <h2 className="text-xl md:text-2xl font-bold text-navy" style={rubikFont}>{data.topCoursesTitle ?? "Popular courses"}</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {data.topCourses.map((c) => (
              <li key={c} className="rounded-full bg-[#F4F6FF] px-4 py-2 text-sm font-semibold text-navy">{c}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== COSTS ===== */}
      <section id="cost" className="scroll-mt-32 bg-navy py-16 md:py-24">
        <div className={`${containerClass} grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start`}>
          <div>
            <p className={`${eyebrowClass} !text-golden`}>Costs</p>
            <h2 className={`${h2Class} !text-white`} style={rubikFont}>{data.costTitle}</h2>
            {data.costIntro && <p className={`${leadClass} !text-[#B9C3E6]`}>{data.costIntro}</p>}
          </div>
          <div>
            <div className={`grid gap-5 ${data.costTables.length > 1 ? "md:grid-cols-2" : ""}`}>
              {data.costTables.map((table, ti) => (
                <div key={table.title ?? ti} className="rounded-2xl bg-white p-6 md:p-8">
                  {table.title && <h3 className="text-lg font-semibold text-navy mb-3" style={rubikFont}>{table.title}</h3>}
                  <table className="w-full text-[15px]">
                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row.category} className="border-t border-border-light">
                          <td className="py-3.5 pr-4 text-body">{row.category}</td>
                          <td className="py-3.5 text-right font-bold text-navy">
                            {row.cost}
                            {row.nprCost && <span className="block text-xs font-medium text-gray-dark">{row.nprCost}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            {data.costNote && <p className="mt-4 text-[13px] text-[#B9C3E6]">{data.costNote}</p>}
          </div>
        </div>
      </section>

      {/* ===== VISA STEPS ===== */}
      <section id="visa" className="scroll-mt-32 py-16 md:py-24">
        <div className={`${containerClass} grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-20 items-start`}>
          <div>
            <p className={eyebrowClass}>Visa steps</p>
            <h2 className={h2Class} style={rubikFont}>{data.visaTitle}</h2>
            {data.visaIntro && <p className={leadClass}>{data.visaIntro}</p>}
            {data.visaDocuments && data.visaDocuments.length > 0 && (
              <div className="mt-8 rounded-2xl bg-[#F4F6FF] p-6">
                <h3 className="text-[17px] font-semibold text-navy" style={rubikFont}>Documents checklist</h3>
                <ul className="mt-3 grid gap-2 text-sm text-body">
                  {data.visaDocuments.map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-royal" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <ol className="relative pl-12">
            {data.visaRequirements.map((step, i) => {
              const last = i === data.visaRequirements.length - 1;
              return (
                <li key={step.category} className={`relative ${last ? "" : "pb-8"}`}>
                  {/* Connector to the next step's circle only, so the line stops at the last (✓) step */}
                  {!last && <span className="absolute -left-[29px] top-10 bottom-0 w-0.5 bg-border-light" aria-hidden="true" />}
                  <span
                    className={`absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-semibold ${
                      last ? "bg-golden text-black" : i === 0 ? "bg-blue-royal text-white" : "border-2 border-border-light bg-white text-navy"
                    }`}
                    style={rubikFont}
                  >
                    {last ? "✓" : i + 1}
                  </span>
                  <h3 className="pt-2 text-lg md:text-[19px] font-semibold text-navy" style={rubikFont}>{stripStepNumber(step.category)}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">{step.details}</p>
                </li>
              );
            })}
            {data.visaNote && <p className="mt-8 text-sm text-gray-dark">{data.visaNote}</p>}
          </ol>
        </div>
      </section>

      {/* ===== INTAKES ===== */}
      <section id="intakes" className="scroll-mt-32 bg-[#F4F6FF] py-16 md:py-24 overflow-x-clip">
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className={eyebrowClass}>Intakes</p>
              <h2 className={h2Class} style={rubikFont}>{data.intakesTitle}</h2>
            </div>
            {data.intakesIntro && <p className="text-[15px] text-gray-dark max-w-sm">{data.intakesIntro}</p>}
          </div>
          <IntakeCards intakes={data.intakes} />
          {data.intakesNote && <p className="mt-6 text-sm text-gray-dark">{data.intakesNote}</p>}

          {/* English tests (optional) */}
          {data.testRequirements && data.testRequirements.length > 0 && (
            <div className="mt-12 rounded-3xl bg-white p-6 md:p-8">
              <h3 className="text-xl font-semibold text-navy" style={rubikFont}>{data.testTitle ?? "English test scores"}</h3>
              {data.testIntro && <p className="mt-1 text-[15px] text-gray-dark">{data.testIntro}</p>}
              <table className="mt-4 w-full text-[15px]">
                <tbody>
                  {data.testRequirements.map((t) => (
                    <tr key={t.test} className="border-t border-border-light">
                      <td className="py-3.5 pr-4 font-semibold text-navy">{t.test}</td>
                      <td className="py-3.5 pr-4 font-bold text-navy">{t.score}</td>
                      <td className="py-3.5 text-body hidden sm:table-cell">{t.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.testNote && <p className="mt-4 text-sm text-gray-dark">{data.testNote}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ===== STUDENTS (optional) ===== */}
      {data.students && data.students.length > 0 && (
        <section className="py-16 md:py-24">
          <div className={containerClass}>
            <p className={eyebrowClass}>Our students</p>
            <h2 className={h2Class} style={rubikFont}>Already studying in {data.countryName}</h2>
            <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {data.students.map((s) => (
                <li key={s.name}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#F4F6FF]">
                    <Image src={s.image} alt={s.name} fill className="object-cover" style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                  <p className="mt-3 text-sm md:text-[15px] font-bold text-navy">{s.name}</p>
                  <p className="text-xs md:text-sm text-gray-dark">{s.caption}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== SCHOLARSHIPS ===== */}
      <section id="scholarships" className={`scroll-mt-32 ${data.students?.length ? "pb-16 md:pb-24" : "py-16 md:py-24"}`}>
        <div className={`${containerClass} grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-20 items-start`}>
          <div>
            <p className={eyebrowClass}>Scholarships</p>
            <h2 className={h2Class} style={rubikFont}>{data.scholarshipsTitle}</h2>
            {data.scholarshipsIntro && <p className={leadClass}>{data.scholarshipsIntro}</p>}
            <button
              type="button"
              onClick={openPopup}
              className="mt-7 inline-flex bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors"
            >
              Check my eligibility
            </button>
          </div>
          <div>
            <div className="hidden md:grid grid-cols-[1fr_200px] pb-3 text-xs font-bold uppercase tracking-[0.08em] text-gray-dark">
              <span>Scholarship</span>
              <span>Offered by</span>
            </div>
            <ul>
              {data.scholarships.map((s, i) => (
                <li
                  key={s.name}
                  className={`grid md:grid-cols-[1fr_200px] gap-1 md:gap-4 py-5 border-t border-border-light ${i === data.scholarships.length - 1 ? "border-b" : ""}`}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-navy" style={rubikFont}>{s.name}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-dark">{s.details}</p>
                  </div>
                  {s.provider && <p className="text-sm text-body md:pt-1">{s.provider}</p>}
                </li>
              ))}
            </ul>
            {data.scholarshipsNote && <p className="mt-4 text-sm text-gray-dark">{data.scholarshipsNote}</p>}
          </div>
        </div>
      </section>

      {/* ===== WHY ADMIZZ (optional) ===== */}
      {data.whyAdmizzPoints && data.whyAdmizzPoints.length > 0 && (
        <section className={`${containerClass} pb-16 md:pb-24`}>
          <div className="rounded-3xl bg-[#F4F6FF] p-7 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy" style={rubikFont}>{data.whyAdmizzTitle ?? "How Admizz helps"}</h2>
            <ul className="mt-6 grid md:grid-cols-2 gap-x-10 gap-y-3 text-[15px] text-body">
              {data.whyAdmizzPoints.map((p) => (
                <li key={p} className="flex gap-3">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-blue-royal" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== GUIDE SECTIONS (optional: eligibility, documents, work rights, ...) ===== */}
      {data.guideSections?.map((section, idx) => (
        <GuideBlock key={section.id} section={section} tinted={idx % 2 === 1} />
      ))}
      {data.extraSections?.map((section, idx) => (
        <GuideBlock key={section.id} section={section} tinted={idx % 2 === 1} />
      ))}

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-32">
        <FAQ
          items={data.faqItems}
          sidebar
          comfortableText
          sidebarTitle="Questions students ask us"
          sidebarSubtitle={`Common questions about studying in ${data.countryName} from Nepal.`}
        />
      </div>

      {/* ===== SOURCES & RELATED GUIDES ===== */}
      {((data.sources && data.sources.length > 0) || (data.relatedLinks && data.relatedLinks.length > 0)) && (
        <section className="py-14 bg-[#F4F6FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2 items-stretch">
            {data.relatedLinks && data.relatedLinks.length > 0 && (
              <div className="bg-white border border-border-light rounded-2xl overflow-hidden flex flex-col">
                <div className="px-5 sm:px-6 py-4 bg-navy text-white">
                  <h2 className="text-base font-semibold">Related guides</h2>
                </div>
                <ul>
                  {data.relatedLinks.map((l, i) => (
                    <li key={l.href} className={i > 0 ? "border-t border-border-light" : ""}>
                      <Link href={l.href} className="group flex items-start justify-between gap-4 px-5 sm:px-6 py-3.5 transition-colors hover:bg-off-white">
                        <span>
                          <span className="block text-[15px] font-semibold text-navy">{l.label}</span>
                          {l.description && <span className="block text-[13px] text-gray-dark mt-0.5">{l.description}</span>}
                        </span>
                        <svg className="w-4 h-4 mt-1 flex-shrink-0 text-navy transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.sources && data.sources.length > 0 && (
              <div className="bg-white border border-border-light rounded-2xl overflow-hidden flex flex-col">
                <div className="px-5 sm:px-6 py-4 bg-navy text-white">
                  <h2 className="text-base font-semibold">{data.sourcesTitle ?? "Official sources"}</h2>
                </div>
                <ul>
                  {data.sources.map((src, i) => (
                    <li key={src.url ?? src.href} className={i > 0 ? "border-t border-border-light" : ""}>
                      <a href={src.url ?? src.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 px-5 sm:px-6 py-3 text-[14px] text-gray-dark transition-colors hover:bg-off-white hover:text-navy">
                        <span>{src.label}</span>
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M10 7H6a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== BLOG ===== */}
      {/* Renders itself only when there is something to show (Sanity posts or repo posts for this category). */}
      <StudyAbroadInsights posts={blogPosts ?? []} countryName={data.countryName} categorySlug={data.countryCategorySlug} />

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24">
        <div className={containerClass}>
          <div className="overflow-hidden rounded-[28px] bg-navy grid lg:grid-cols-2">
            <div className="p-8 md:p-14">
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-golden mb-3">{NEPAL_OFFICES.length} offices in Nepal</p>
              <h2 className="text-3xl md:text-[44px] font-bold leading-[1.15] text-white" style={rubikFont}>{data.ctaTitle}</h2>
              <p className="mt-4 text-base md:text-[17px] text-[#B9C3E6] max-w-lg">{data.ctaContent}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openPopup}
                  className="bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors"
                >
                  Book a Free Consultation
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center border border-white/35 hover:border-white text-white font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </div>
            {data.heroImage && (
              <div className="relative min-h-[220px] lg:min-h-full order-last lg:order-none">
                <Image src={data.heroImage} alt="" fill className="object-cover object-[85%_center]" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            )}
            {/* Offices: under the buttons on phones, a full-width strip below text + photo on desktop,
                so the taller cards don't stretch (and over-crop) the photo */}
            <div className="px-8 pb-8 md:px-14 md:pb-14 lg:col-span-2 lg:border-t lg:border-white/10 lg:py-8">
              <ul className="grid sm:grid-cols-3 gap-3">
                {NEPAL_OFFICES.map((office) => (
                  <li key={office.city} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="flex items-center gap-2 font-semibold text-white">
                      <svg className="h-4 w-4 shrink-0 text-golden" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {office.city}
                    </p>
                    <p className="mt-0.5 text-sm text-[#B9C3E6]">{office.area}</p>
                    <a
                      href={office.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Directions to Admizz ${office.city} office`}
                      className="mt-3 inline-flex text-sm font-semibold text-golden hover:underline"
                    >
                      Get directions →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MOBILE STICKY CTA ===== */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border-light bg-white/95 backdrop-blur px-4 py-3">
        <button
          type="button"
          onClick={openPopup}
          className="w-full bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] py-3.5 rounded-full transition-colors"
        >
          Book a Free Consultation
        </button>
      </div>

      <ConsultationPopup
        open={popupOpen}
        onClose={closePopup}
        countryName={data.countryName}
        formSource={`nepal-${shortCountry.toLowerCase().replace(/\s+/g, "-")}`}
        prefill={{ fullName: heroName, country: heroCountry, phone: heroPhone }}
      />
    </main>
  );
}

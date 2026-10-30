"use client";

import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import ConsultationPopup from "@/components/ui/consultation/ConsultationPopup";
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

/** "1. Choose Course" → "Choose Course" */
const stripStepNumber = (s: string) => s.replace(/^\s*\d+\.\s*/, "");

const tabs = [
  { id: "why", label: "Why Study Here" },
  { id: "cost", label: "Costs" },
  { id: "visa", label: "Visa Steps" },
  { id: "intakes", label: "Intakes" },
  { id: "scholarships", label: "Scholarships" },
  { id: "faq", label: "FAQs" },
];

export default function NepalVariantTemplate({ data, blogPosts }: NepalVariantTemplateProps) {
  const [activeTab, setActiveTab] = useState("why");
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [heroName, setHeroName] = useState("");
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
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [scrollTabIntoView]);

  const shortCountry = data.countryName.replace(/^the /i, "");
  const [mainStat, ...smallStats] = data.highlightStats ?? [];
  const heroText = data.heroDescription ?? data.heroSubheading;

  return (
    <main>
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
                  className="inline-flex items-center bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-8 py-3.5 rounded-full transition-colors"
                >
                  Get free counselling →
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
              <p className={eyebrowClass}>Free counselling</p>
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
                <label className="sr-only" htmlFor="hero-phone">Phone number</label>
                <input
                  id="hero-phone"
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(e.target.value)}
                  placeholder="Phone number"
                  inputMode="tel"
                  autoComplete="tel"
                  className="h-12 rounded-xl border border-border-light px-4 text-[15px] text-navy outline-none focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/15"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] py-3.5 rounded-full transition-colors"
              >
                Book free consultation
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
            <span className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border-light" aria-hidden="true" />
            {data.visaRequirements.map((step, i) => {
              const last = i === data.visaRequirements.length - 1;
              return (
                <li key={step.category} className={`relative ${last ? "" : "pb-8"}`}>
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
      <section id="intakes" className="scroll-mt-32 bg-[#F4F6FF] py-16 md:py-24">
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className={eyebrowClass}>Intakes</p>
              <h2 className={h2Class} style={rubikFont}>{data.intakesTitle}</h2>
            </div>
            {data.intakesIntro && <p className="text-[15px] text-gray-dark max-w-sm">{data.intakesIntro}</p>}
          </div>
          <div className="mt-10 -mx-4 px-4 flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.intakes.map((row, i) => {
              const month = shortMonth(row.intake);
              const main = i === 0;
              return (
                <div
                  key={row.intake}
                  className={`snap-start shrink-0 w-[260px] md:w-auto rounded-3xl p-7 md:p-8 ${main ? "bg-navy text-white" : "bg-white"}`}
                >
                  {month && (
                    <p className={`text-5xl md:text-[64px] font-bold leading-none ${main ? "text-golden" : "text-navy"}`} style={rubikFont}>{month}</p>
                  )}
                  <h3 className={`mt-4 text-lg md:text-xl font-semibold ${main ? "text-white" : "text-navy"}`} style={rubikFont}>{row.intake}</h3>
                  {row.details && <p className={`mt-2 text-[15px] leading-relaxed ${main ? "text-[#B9C3E6]" : "text-body"}`}>{row.details}</p>}
                  <p className={`mt-5 pt-4 border-t text-sm font-semibold ${main ? "border-white/15 text-white" : "border-border-light text-navy"}`}>{row.months}</p>
                </div>
              );
            })}
          </div>
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

      {/* ===== BLOG ===== */}
      {blogPosts && blogPosts.length > 0 && (
        <StudyAbroadInsights posts={blogPosts} countryName={data.countryName} categorySlug={data.countryCategorySlug} />
      )}

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24">
        <div className={containerClass}>
          <div className="overflow-hidden rounded-[28px] bg-navy grid lg:grid-cols-[1fr_420px]">
            <div className="p-8 md:p-14">
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-golden mb-3">Kathmandu office</p>
              <h2 className="text-3xl md:text-[44px] font-bold leading-[1.15] text-white" style={rubikFont}>{data.ctaTitle}</h2>
              <p className="mt-4 text-base md:text-[17px] text-[#B9C3E6] max-w-lg">{data.ctaContent}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openPopup}
                  className="bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-7 py-3.5 rounded-full transition-colors"
                >
                  Book free consultation
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
              <div className="relative min-h-[220px] lg:min-h-full">
                <Image src={data.heroImage} alt="" fill className="object-cover object-[85%_center]" sizes="(min-width: 1024px) 420px, 100vw" />
              </div>
            )}
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
          Free consultation
        </button>
      </div>

      <ConsultationPopup
        open={popupOpen}
        onClose={closePopup}
        countryName={data.countryName}
        formSource={`nepal-${shortCountry.toLowerCase().replace(/\s+/g, "-")}`}
        prefill={{ fullName: heroName, phone: heroPhone }}
      />
    </main>
  );
}

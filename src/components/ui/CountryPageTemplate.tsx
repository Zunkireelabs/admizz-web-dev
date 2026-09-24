"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Hero from "@/components/ui/Hero";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import type { SanityPost } from "@/types";

export interface QuickFact {
  label: string;
  value: string;
}

export interface BenefitCard {
  title: string;
  description: string;
  icon?: string;
}

export interface DocumentSection {
  title: string;
  intro: string;
  documents: string[];
}

export interface IntakeInfo {
  name: string;
  details: string[];
}

export interface CostRow {
  program: string;
  fee: string;
}

export interface VisaStep {
  title: string;
  description: string;
}

export interface CountryPageData {
  countryName: string;
  heroHeading: string;
  heroSubheading: string;
  heroDescription?: string;
  heroBackground?: string;
  quickFacts: QuickFact[];
  whyStudyTitle: string;
  whyStudyIntro: string;
  benefits: BenefitCard[];
  admissionTitle: string;
  admissionIntro: string;
  documentSections: DocumentSection[];
  intakes?: {
    title: string;
    intro: string;
    items: IntakeInfo[];
  };
  universities: { name: string; logo: string }[];
  costTitle: string;
  costIntro: string;
  costTable: CostRow[];
  costNote?: string;
  visaTitle: string;
  visaIntro: string;
  visaSteps: VisaStep[];
  faqItems: FAQItem[];
  blogArticles?: string[];
  countryCategorySlug?: string;
}

interface CountryPageTemplateProps {
  data: CountryPageData;
  blogPosts?: SanityPost[];
}

const tabs = [
  { id: "why", label: "Why Study Here" },
  { id: "admission", label: "Admission" },
  { id: "universities", label: "Top Universities" },
  { id: "cost", label: "Cost & Financial" },
  { id: "visa", label: "Visa Process" },
  { id: "faq", label: "FAQs" },
];

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

export default function CountryPageTemplate({ data, blogPosts }: CountryPageTemplateProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("why");
  const [showFade, setShowFade] = useState(true);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const scrollToSection = (id: string) => {
    isClickScrolling.current = true;
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { isClickScrolling.current = false; }, 1000);
  };

  // Auto-scroll tab bar to show active tab
  const scrollTabIntoView = useCallback((tabId: string) => {
    const container = tabScrollRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-tab="${tabId}"]`) as HTMLElement;
    if (!btn) return;
    const left = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, []);

  // Update fade hint on tab bar scroll
  useEffect(() => {
    const container = tabScrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const atEnd = container.scrollLeft + container.offsetWidth >= container.scrollWidth - 4;
      setShowFade(!atEnd);
    };
    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver to track active section on scroll
  useEffect(() => {
    const ids = tabs.map((t) => t.id);
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
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [scrollTabIntoView]);

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Study Destinations", url: "https://admizzeducation.com/study-destinations" },
          { name: data.countryName, url: `https://admizzeducation.com${pathname}` },
        ]}
      />
      {data.heroBackground && (
        <link
          rel="preload"
          as="image"
          href={data.heroBackground}
          fetchPriority="high"
        />
      )}
      {/* ===== HERO ===== */}
      <Hero
        heading={data.heroHeading}
        subheading={data.heroSubheading}
        description={data.heroDescription}
        ctaText="Learn More"
        ctaHref="#admission"
        variant="gradient"
        backgroundImage={data.heroBackground}
        rightContent={{
          type: "form",
          formProps: { defaultDestination: data.countryName },
        }}
      />

      {/* ===== QUICK FACTS ===== */}
      <section className="bg-white py-5 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {data.quickFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <p className="text-sm font-bold text-navy">{fact.value}</p>
                <p className="text-[13px] text-gray-dark mt-0.5">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <nav className="sticky top-[70px] z-40 bg-white border-b border-border-light shadow-sm">
        <div className="max-w-7xl mx-auto relative">
          <div
            ref={tabScrollRef}
            className="overflow-x-auto px-4 sm:px-6 lg:px-8 scrollbar-hide"
          >
            <div className="flex gap-0 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-4 py-3.5 sm:px-5 sm:py-3.5 text-[13px] sm:text-sm font-medium whitespace-nowrap border-b-[3px] transition-colors ${
                    activeTab === tab.id
                      ? "border-[#007cba] text-[#007cba] font-semibold"
                      : "border-transparent text-gray-dark hover:text-navy"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Fade hint — mobile only */}
          {showFade && (
            <div
              className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none md:hidden"
              style={{ background: "linear-gradient(to right, transparent, white)" }}
            />
          )}
        </div>
      </nav>

      {/* ===== STATS BAR ===== */}
      <section className="bg-off-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-navy" style={rubikFont}>1500+</p>
            <p className="text-[13px] text-gray-dark mt-1">
              Students successfully enrolled worldwide
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-navy" style={rubikFont}>95%</p>
            <p className="text-[13px] text-gray-dark mt-1">
              Student Visa Approval Rate with Expert Guidance
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-navy" style={rubikFont}>$2M+</p>
            <p className="text-[13px] text-gray-dark mt-1">
              In Scholarships Awarded to Our Students
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY STUDY HERE ===== */}
      <section id="why" className="py-16 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[28px] font-bold text-navy mb-4"
            style={rubikFont}
          >
            {data.whyStudyTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-10 max-w-3xl leading-relaxed">
            {data.whyStudyIntro}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border border-border-light rounded-[10px] p-6 text-center hover:shadow-md transition-shadow"
              >
                {benefit.icon && (
                  <div className="flex justify-center mb-4">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={128}
                      height={128}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <h3 className="font-bold text-navy text-[16px]" style={rubikFont}>
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ADMISSION REQUIREMENTS ===== */}
      <section id="admission" className="bg-off-white py-16 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[28px] font-bold text-navy mb-4"
            style={rubikFont}
          >
            {data.admissionTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-10 leading-relaxed">
            {data.admissionIntro}
          </p>

          {/* Document sections in card grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {data.documentSections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-[12px] p-6 shadow-sm"
              >
                <h3
                  className="text-[16px] font-bold text-navy mb-2"
                  style={rubikFont}
                >
                  {section.title}
                </h3>
                <p className="text-[13px] sm:text-xs text-gray-dark mb-4 leading-relaxed">
                  {section.intro}
                </p>
                <ul className="space-y-2.5">
                  {section.documents.map((doc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-gray-dark"
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#0056b3"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12l4.243 4.243 8.484-8.486"
                        />
                      </svg>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {data.intakes && (
            <div className="mt-8">
              <h3
                className="text-lg font-bold text-navy mb-3"
                style={rubikFont}
              >
                {data.intakes.title}
              </h3>
              <p className="text-sm text-gray-dark mb-5 leading-relaxed">
                {data.intakes.intro}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.intakes.items.map((intake) => (
                  <div
                    key={intake.name}
                    className="bg-white rounded-[12px] p-5 shadow-sm text-center"
                  >
                    <Image
                      src="/images/icons/school-1.webp"
                      alt={intake.name}
                      width={128}
                      height={128}
                      className="w-12 h-12 object-contain mx-auto mb-3"
                    />
                    <h4 className="font-bold text-navy text-sm" style={rubikFont}>
                      {intake.name}
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {intake.details.map((detail, i) => (
                        <li key={i} className="text-[13px] text-gray-dark">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== TOP UNIVERSITIES (Marquee) ===== */}
      <section id="universities" className="py-16 overflow-hidden scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h2
            className="text-2xl md:text-[28px] font-bold text-navy text-center"
            style={rubikFont}
          >
            Popular {data.countryName.replace(/^the /, "")} Universities
          </h2>
        </div>

        <style>{`
          @keyframes cpt-marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes cpt-marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .cpt-marquee-row:hover > div[style*="animation"] {
            animation-play-state: paused;
          }
          .cpt-uni-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .cpt-uni-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(30, 109, 235, 0.12) !important;
          }
        `}</style>

        {(() => {
          // Fill row with enough cards to cover viewport, then double for seamless loop
          const MIN_CARDS = 8;
          function fillRow(row: typeof data.universities) {
            if (row.length === 0) return [];
            const repeats = Math.ceil(MIN_CARDS / row.length);
            const set: typeof row = [];
            for (let r = 0; r < repeats; r++) set.push(...row);
            return [...set, ...set];
          }

          // Single row for small sets (≤8), two rows for larger
          const useSingleRow = data.universities.length <= 8;
          const row1 = useSingleRow ? data.universities : data.universities.slice(0, Math.ceil(data.universities.length / 2));
          const row2 = useSingleRow ? [] : data.universities.slice(Math.ceil(data.universities.length / 2));

          const filled1 = fillRow(row1);
          const filled2 = fillRow(row2);

          // Scale duration: ~10s per card in one set
          const set1Count = filled1.length / 2;
          const set2Count = filled2.length / 2;
          const row1Duration = Math.max(set1Count * 10, 30);
          const row2Duration = Math.max(set2Count * 10, 35);

          return (
            <>
              <div className="cpt-marquee-row relative overflow-hidden mb-5">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
                <div className="flex w-max gap-5" style={{ animation: `cpt-marquee-left ${row1Duration}s linear infinite` }}>
                  {filled1.map((uni, i) => (
                    <div key={`r1-${i}`} className="cpt-uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[200px]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div className="w-full flex items-center justify-center" style={{ height: 52 }}>
                        <Image src={uni.logo} alt={uni.name} width={140} height={48} style={{ maxHeight: 48, objectFit: "contain" }} />
                      </div>
                      <p className="text-[13px] font-medium text-center leading-snug tracking-wide" style={{ color: "#6b7280" }}>{uni.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              {row2.length > 0 && (
                <div className="cpt-marquee-row relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
                  <div className="flex w-max gap-5" style={{ animation: `cpt-marquee-right ${row2Duration}s linear infinite` }}>
                    {filled2.map((uni, i) => (
                      <div key={`r2-${i}`} className="cpt-uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[200px]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                        <div className="w-full flex items-center justify-center" style={{ height: 52 }}>
                          <Image src={uni.logo} alt={uni.name} width={140} height={48} style={{ maxHeight: 48, objectFit: "contain" }} />
                        </div>
                        <p className="text-[13px] font-medium text-center leading-snug tracking-wide" style={{ color: "#6b7280" }}>{uni.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </section>

      {/* ===== COST ===== */}
      <section id="cost" className="bg-off-white py-16 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[28px] font-bold text-navy mb-4"
            style={rubikFont}
          >
            {data.costTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-8 leading-relaxed">
            {data.costIntro}
          </p>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: "#f4f4f4" }}>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]">
                    Program Type
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]">
                    Tuition Fees (Per Year)
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.costTable.map((row) => (
                  <tr key={row.program}>
                    <td className="px-4 py-3 text-sm text-navy font-medium border border-[#ddd]">
                      {row.program}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-dark border border-[#ddd]">
                      {row.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card layout */}
          <div className="sm:hidden space-y-3">
            {data.costTable.map((row) => (
              <div key={row.program} className="bg-white rounded-lg p-4 border border-[#ddd]">
                <p className="text-sm font-semibold text-navy">{row.program}</p>
                <p className="text-sm text-gray-dark mt-1">{row.fee}</p>
              </div>
            ))}
          </div>

          {data.costNote && (
            <p className="mt-4 text-sm text-gray-dark italic">
              {data.costNote}
            </p>
          )}
        </div>
      </section>

      {/* ===== VISA PROCESS — Alternating Centered Timeline ===== */}
      <section
        id="visa"
        className="py-16 scroll-mt-32"
        style={{ background: "#f8f9fa" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[28px] font-bold text-navy mb-4"
            style={rubikFont}
          >
            {data.visaTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-12 leading-relaxed max-w-3xl">
            {data.visaIntro}
          </p>

          {/* Desktop: alternating left-right timeline */}
          <div className="hidden md:block relative" style={{ width: "90%", margin: "0 auto" }}>
            {/* Center vertical blue line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
              style={{ width: "3px", background: "#0056b3" }}
            />

            <div className="space-y-6">
              {data.visaSteps.map((step, index) => {
                const isOdd = index % 2 === 0;
                return (
                  <div key={index} className="relative flex">
                    {/* Circle on center line */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-[10px] w-4 h-4 rounded-full z-10"
                      style={{
                        background: "#fff",
                        border: "4px solid #0056b3",
                      }}
                    />

                    {isOdd ? (
                      <>
                        {/* Content left side */}
                        <div className="w-1/2 pr-10 text-right">
                          <div
                            className="bg-white rounded-[6px] p-4 inline-block text-left shadow-sm"
                            style={{
                              borderLeft: "4px solid #fcb730",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            <h3
                              className="font-semibold text-black text-[16px] mb-1"
                              style={rubikFont}
                            >
                              {index + 1}. {step.title}
                            </h3>
                            <p className="text-sm text-gray-dark leading-relaxed" style={rubikFont}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/2" />
                      </>
                    ) : (
                      <>
                        <div className="w-1/2" />
                        {/* Content right side */}
                        <div className="w-1/2 pl-10">
                          <div
                            className="bg-white rounded-[6px] p-4 shadow-sm"
                            style={{
                              borderLeft: "4px solid #fcb730",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            <h3
                              className="font-semibold text-black text-[16px] mb-1"
                              style={rubikFont}
                            >
                              {index + 1}. {step.title}
                            </h3>
                            <p className="text-sm text-gray-dark leading-relaxed" style={rubikFont}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: gradient accent bar cards */}
          <div className="md:hidden space-y-4">
            {data.visaSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 relative overflow-hidden"
                style={{
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                }}
              >
                {/* Navy-to-gold gradient left bar */}
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{
                    width: "4px",
                    background: "linear-gradient(to bottom, #0D1282, #fcb730)",
                  }}
                />
                <span
                  className="inline-flex items-center justify-center text-[12px] font-bold text-white px-3 py-1 rounded-full mb-3"
                  style={{ background: "#0D1282" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-semibold text-[15px] mb-1.5"
                  style={{ ...rubikFont, color: "#0D1282" }}
                >
                  {step.title}
                </h3>
                <p className="text-[13px] text-gray-dark leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-32">
        <FAQ items={data.faqItems} title="Everything You Need to Know" />
      </div>

      {/* ===== STUDY ABROAD INSIGHTS (Blog) ===== */}
      {blogPosts && blogPosts.length > 0 && (
        <StudyAbroadInsights
          posts={blogPosts}
          countryName={data.countryName}
          categorySlug={data.countryCategorySlug}
        />
      )}

      {/* ===== CTA ===== */}
      <section className="relative py-14 md:py-20 overflow-hidden" style={{ background: "#FFFAED" }}>
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)", backdropFilter: "blur(2px)" }} />
        <div className="hidden sm:block absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-40 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[13px] font-semibold tracking-wide" style={{ color: "#0D1282" }}>Accepting Applications</span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-bold leading-tight mb-4" style={{ ...rubikFont, color: "#0D1282" }}>
                Ready to Build Your <span style={{ color: "#E8430C" }}>Global Career?</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-md mb-8" style={{ color: "rgba(13,18,130,0.7)" }}>
                Let our expert counselors guide you through university selection, applications, visas, and everything in between.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>24hr Response</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>Average reply time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Free Consultation</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>No commitment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Expert Team</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>10+ years experience</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col gap-3">
              {/* Schedule Card */}
              <Link href="/register" className="group block bg-white rounded-2xl p-6 md:p-7 transition-shadow hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#EEF2FF" }}>
                    <svg className="w-6 h-6" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <svg className="w-5 h-5 text-[#0D1282] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={rubikFont}>Schedule a Free Consultation</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Book a free 30-minute call to discuss your study abroad goals and get expert recommendations.</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: "#0D1282" }}>
                  Book your slot
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
              {/* Email Card */}
              <a href="mailto:hello@admizz.com" className="flex items-center justify-center gap-3 rounded-2xl px-5 py-3 w-full transition-colors hover:opacity-90" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(13,18,130,0.1)" }}>
                  <svg className="w-4 h-4" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Email Us</p>
                  <p className="text-[13px] sm:text-[11px] truncate" style={{ color: "rgba(13,18,130,0.5)" }}>hello@admizz.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

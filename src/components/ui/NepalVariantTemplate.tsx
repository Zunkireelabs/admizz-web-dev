"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Hero from "@/components/ui/Hero";
import CTAForm from "@/components/ui/CTAForm";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import Link from "next/link";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import type { SanityPost } from "@/types";
import ChakraDivider from "@/components/india/ChakraDivider";
import IndiaFiligreeDivider from "@/components/india/IndiaFiligreeDivider";
import FlagStripe from "@/components/india/FlagStripe";
import LandmarkSilhouette, { type LandmarkName } from "@/components/india/LandmarkSilhouette";
import JourneyStrip from "@/components/india/JourneyStrip";
import CrownDivider from "@/components/uk/CrownDivider";
import UKFiligreeDivider from "@/components/uk/UKFiligreeDivider";

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

export interface CountryTheme {
  // palette
  primary: string;
  primaryDeep: string;
  accent: string;
  accentSoft: string;
  gold: string;
  surfaceTint: string;
  ink: string;

  // hero
  heroImage?: string;
  heroEyebrow?: string;
  heroGradient?: string;
  heroOverlay?: string;

  // identity
  showChakraDividers?: boolean;
  dividerStyle?: "chakra" | "crown" | "filigree" | "uk-alternating" | "none";
  showFlagStripeOnCards?: boolean;
  flagColors?: [string, string, string];
  serifHeadings?: boolean;
  heritagePattern?: boolean;
  towerBridgeTransition?: boolean;
  crownTabIcon?: boolean;
  dropCapIntro?: boolean;
  ctaCrownOrnament?: boolean;
  benefitLandmarks?: LandmarkName[];
  universitiesBackdrop?: LandmarkName;
  universitiesEyebrow?: string;
  ctaLandmarks?: { left: LandmarkName; right: LandmarkName };
  journeyStrip?: {
    stats: { value: string; label: string }[];
    cities?: { name: string; landmark: string; image: string }[];
    eyebrow?: string;
    accentColor?: string;
    accentSoftColor?: string;
    ringColor?: string;
    bgGradient?: string;
  };
}

export interface NepalVariantData {
  countryName: string;
  heroHeading: string;
  heroSubheading: string;
  introTitle: string;
  introContent: string;
  whyStudyTitle: string;
  whyStudyIntro?: string;
  benefits: NepalBenefit[];
  whyAdmizzTitle?: string;
  whyAdmizzPoints?: string[];
  topCoursesTitle?: string;
  topCourses?: string[];
  visaTitle: string;
  visaIntro?: string;
  visaRequirements: VisaRequirement[];
  visaNote?: string;
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
  universities: { name: string; logo: string }[];
  faqItems: FAQItem[];
  ctaTitle: string;
  ctaContent: string;
  countryCategorySlug?: string;
}

interface NepalVariantTemplateProps {
  data: NepalVariantData;
  blogPosts?: SanityPost[];
  theme?: CountryTheme;
  customHero?: React.ReactNode;
  replaceCostSection?: React.ReactNode;
  replaceWhySection?: React.ReactNode;
  replaceVisaSection?: React.ReactNode;
  insertAfterIntakes?: React.ReactNode;
  insertBeforeCTA?: React.ReactNode;
}

const tabs = [
  { id: "why", label: "Why Study Here" },
  { id: "visa", label: "Visa Requirements" },
  { id: "intakes", label: "Intakes" },
  { id: "cost", label: "Cost & Scholarships" },
  { id: "faq", label: "FAQs" },
];

export default function NepalVariantTemplate({ data, blogPosts, theme, customHero, replaceCostSection, replaceWhySection, replaceVisaSection, insertAfterIntakes, insertBeforeCTA }: NepalVariantTemplateProps) {
  const pathname = usePathname();
  const themed = !!theme;
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

  const scrollTabIntoView = useCallback((tabId: string) => {
    const container = tabScrollRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-tab="${tabId}"]`) as HTMLElement;
    if (!btn) return;
    const left = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, []);

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

  const dividerStyle: "chakra" | "crown" | "filigree" | "uk-alternating" | "none" = theme?.dividerStyle ??
    (theme?.showChakraDividers ? "chakra" : "none");

  const dividerCounter = { current: 0 };

  const renderDivider = () => {
    if (!themed || dividerStyle === "none") return null;
    if (dividerStyle === "crown") return <CrownDivider color={theme!.gold} />;
    if (dividerStyle === "filigree") return <IndiaFiligreeDivider color={theme!.gold} accent={theme!.accent} />;
    if (dividerStyle === "uk-alternating") {
      const idx = dividerCounter.current++;
      return idx % 2 === 0
        ? <CrownDivider color={theme!.gold} />
        : <UKFiligreeDivider color={theme!.gold} />;
    }
    return <ChakraDivider color={theme!.primaryDeep} />;
  };

  const serifStyle = themed && theme!.serifHeadings
    ? { fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, "Times New Roman", serif', letterSpacing: "-0.01em" as const }
    : undefined;

  const heritagePatternSvg = themed && theme!.heritagePattern
    ? `url("data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='${theme!.primaryDeep}' fill-opacity='0.04'><path d='M30 0 L36 12 L30 18 L24 12 Z'/><path d='M30 42 L36 54 L30 60 L24 54 Z'/><circle cx='30' cy='30' r='3'/><path d='M0 30 L12 24 L18 30 L12 36 Z'/><path d='M42 30 L54 24 L60 30 L54 36 Z'/></svg>`
      )}")`
    : undefined;


  // CSS variables for themed pages
  const mainStyle = themed
    ? ({
        ["--th-primary" as string]: theme!.primary,
        ["--th-primary-deep" as string]: theme!.primaryDeep,
        ["--th-accent" as string]: theme!.accent,
        ["--th-accent-soft" as string]: theme!.accentSoft,
        ["--th-gold" as string]: theme!.gold,
        ["--th-surface" as string]: theme!.surfaceTint,
        ["--th-ink" as string]: theme!.ink,
      } as React.CSSProperties)
    : undefined;

  const sectionTintBg = themed
    ? { backgroundColor: theme!.surfaceTint, ...(heritagePatternSvg ? { backgroundImage: heritagePatternSvg } : {}) }
    : undefined;
  const headingColor = themed
    ? { color: theme!.primaryDeep, ...(serifStyle || {}) }
    : undefined;
  const bodyColor = themed ? { color: theme!.ink + "BB" } : undefined;
  const tableHeaderStyle = themed
    ? { background: theme!.primaryDeep, borderBottom: `2px solid ${theme!.gold}` }
    : undefined;
  const tableAltRowStyle = themed ? { background: theme!.surfaceTint } : undefined;
  const tableLabelStyle = themed ? { color: theme!.primaryDeep } : undefined;

  return (
    <main style={mainStyle}>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com/" },
          { name: "Study Destinations", url: "https://admizzeducation.com/study-destinations" },
          { name: data.countryName, url: `https://admizzeducation.com${pathname}` },
        ]}
      />
      {themed && theme!.serifHeadings && (
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap');`}</style>
      )}
      {/* ===== HERO ===== */}
      {customHero ? (
        <>{customHero}</>
      ) : themed && theme!.heroImage ? (
        <section
          className="relative overflow-hidden"
          style={{
            minHeight: 560,
            backgroundImage: `url(${theme!.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                theme!.heroGradient ||
                "linear-gradient(115deg, rgba(11,61,46,0.92) 0%, rgba(11,61,46,0.75) 45%, rgba(255,107,26,0.55) 100%)",
            }}
          />
          {/* darken */}
          <div
            className="absolute inset-0"
            style={{ background: theme!.heroOverlay || "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.4))" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              {theme!.heroEyebrow && (
                <p
                  className="mb-3 text-sm md:text-base font-medium tracking-wide"
                  style={{ color: theme!.accentSoft, fontFamily: "var(--font-rubik), serif" }}
                 
                >
                  {theme!.heroEyebrow}
                </p>
              )}
              <h1
               
                className="text-3xl md:text-5xl font-bold leading-tight mb-4"
                style={
                  theme!.serifHeadings
                    ? { ...serifStyle, fontWeight: 700 }
                    : { fontFamily: "var(--font-rubik), sans-serif" }
                }
              >
                {data.heroHeading}
              </h1>
              {theme!.serifHeadings && (
                <div className="h-px w-16 mb-5" style={{ background: theme!.gold }} />
              )}
              <p className="text-base md:text-lg text-white/90 max-w-xl mb-8">
                {data.heroSubheading}
              </p>
              <a
               
                href="#why"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{
                  background: theme!.accent,
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(255,107,26,0.35)",
                }}
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
            <div>
              <CTAForm defaultDestination={data.countryName} />
            </div>
          </div>
        </section>
      ) : (
        <Hero
          heading={data.heroHeading}
          subheading={data.heroSubheading}
          ctaText="Learn More"
          ctaHref="#why"
          variant="gradient"
          rightContent={{
            type: "form",
            formProps: { defaultDestination: data.countryName },
          }}
        />
      )}

      {/* ===== STATS / JOURNEY STRIP ===== */}
      {themed && theme!.journeyStrip ? (
        <JourneyStrip
          stats={theme!.journeyStrip.stats}
          cities={theme!.journeyStrip.cities}
          eyebrow={theme!.journeyStrip.eyebrow}
          accentColor={theme!.journeyStrip.accentColor}
          accentSoftColor={theme!.journeyStrip.accentSoftColor}
          ringColor={theme!.journeyStrip.ringColor}
          bgGradient={theme!.journeyStrip.bgGradient}
          labelColor={theme!.primaryDeep}
          subLabelColor={theme!.ink + "AA"}
        />
      ) : (
        <section className="bg-off-white py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-navy">1500+</p>
              <p className="text-[13px] text-gray-dark">Students successfully enrolled worldwide</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">95%</p>
              <p className="text-[13px] text-gray-dark">Student Visa Approval Rate with Expert Guidance</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">$2M+</p>
              <p className="text-[13px] text-gray-dark">In Scholarships Awarded to Our Students</p>
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB NAVIGATION ===== */}
      <nav className="sticky top-[70px] z-40 bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto relative">
          <div
            ref={tabScrollRef}
            className="overflow-x-auto px-4 sm:px-6 lg:px-8 scrollbar-hide"
          >
            <div className="flex gap-0 min-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const activeStyle = themed && isActive
                  ? { color: theme!.accent, borderColor: theme!.accent }
                  : undefined;
                return (
                  <button
                    key={tab.id}
                    data-tab={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    style={activeStyle}
                    className={`px-4 py-3.5 sm:px-5 text-[13px] sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      isActive
                        ? themed
                          ? ""
                          : "border-blue-link text-blue-link"
                        : "border-transparent text-gray-dark hover:text-navy"
                    }`}
                  >
                    {themed && theme!.crownTabIcon && isActive && (
                      <svg viewBox="0 0 24 18" className="inline-block mr-1.5 -mt-0.5" width="16" height="12" fill={theme!.accent} aria-hidden="true">
                        <path d="M2 14 L4 6 L8 10 L12 2 L16 10 L20 6 L22 14 Z" />
                        <rect x="2" y="14" width="20" height="2.5" />
                        <circle cx="4" cy="6" r="1.2" />
                        <circle cx="12" cy="2" r="1.5" />
                        <circle cx="20" cy="6" r="1.2" />
                      </svg>
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          {showFade && (
            <div
              className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none md:hidden"
              style={{ background: "linear-gradient(to right, transparent, white)" }}
            />
          )}
        </div>
      </nav>

      {/* ===== INTRO SECTION ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4" style={headingColor}>
            {data.introTitle}
          </h2>
          {themed && theme!.dropCapIntro && data.introContent ? (
            <p data-anim="fade-up" className="text-[15.5px] text-gray-dark leading-[1.7] [&::first-letter]:hidden">
              <span
                aria-hidden
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: theme!.gold,
                  float: "left",
                  fontSize: "5rem",
                  lineHeight: 0.82,
                  marginTop: "0.4rem",
                  marginRight: "0.85rem",
                  marginBottom: "-0.15rem",
                  letterSpacing: "-0.04em",
                  textShadow: `1px 1px 0 ${theme!.gold}22`,
                }}
              >
                {data.introContent.charAt(0)}
              </span>
              {data.introContent.slice(1)}
            </p>
          ) : (
            <p data-anim="fade-up" className="text-[15px] text-gray-dark leading-relaxed">
              {data.introContent}
            </p>
          )}
        </div>
      </section>

      {renderDivider()}

      {/* ===== WHY STUDY HERE ===== */}
      {replaceWhySection ? (
        <div id="why" className="scroll-mt-32">{replaceWhySection}</div>
      ) : (
      <section id="why" className="py-16 scroll-mt-32" style={sectionTintBg || { backgroundColor: undefined }}>
        <div className={themed ? "" : "bg-off-white"} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={!themed ? undefined : undefined}>
          <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4" style={headingColor}>
            {data.whyStudyTitle}
          </h2>
          {data.whyStudyIntro && (
            <p className="text-[15px] text-gray-dark mb-8 max-w-3xl">
              {data.whyStudyIntro}
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-anim="stagger-fade-up">
            {data.benefits.map((benefit, idx) => {
              if (themed) {
                const landmark = theme!.benefitLandmarks?.[idx];
                return (
                  <div
                    key={benefit.title}
                    className="relative bg-white rounded-[10px] p-6 pl-7 overflow-hidden"
                    style={{
                      border: `1px solid ${theme!.gold}33`,
                      boxShadow: "0 2px 14px rgba(11,61,46,0.05)",
                    }}
                  >
                    {theme!.showFlagStripeOnCards && (
                      <div className="absolute left-0 top-3 bottom-3 w-1">
                        <FlagStripe width={4} colors={theme!.flagColors} />
                      </div>
                    )}
                    {landmark && (
                      <div className="absolute top-3 right-3 opacity-50">
                        <LandmarkSilhouette name={landmark} color={theme!.gold} width={48} height={24} />
                      </div>
                    )}
                    <h3 className="font-bold pr-12" style={{ color: theme!.primaryDeep }}>
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: theme!.ink + "AA" }}>
                      {benefit.description}
                    </p>
                  </div>
                );
              }
              return (
                <div
                  key={benefit.title}
                  className="bg-white border border-border-light rounded-[10px] p-6"
                >
                  <h3 className="font-bold text-navy">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ===== WHY ADMIZZ (optional) ===== */}
      {data.whyAdmizzTitle && data.whyAdmizzPoints && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4" style={headingColor}>
              {data.whyAdmizzTitle}
            </h2>
            <ul className="space-y-3">
              {data.whyAdmizzPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-dark">
                  <svg
                    className="w-4 h-4 text-golden flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={themed ? { color: theme!.accent } : undefined}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== TOP COURSES (optional) ===== */}
      {data.topCoursesTitle && data.topCourses && (
        <section className="bg-off-white py-16" style={sectionTintBg}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-6" style={headingColor}>
              {data.topCoursesTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.topCourses.map((course, i) => (
                <div
                  key={i}
                  className="bg-white border border-border-light rounded-[10px] px-5 py-3 text-sm text-navy font-medium"
                  style={themed ? { borderColor: theme!.gold + "44", color: theme!.primaryDeep } : undefined}
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {renderDivider()}

      {/* ===== VISA REQUIREMENTS ===== */}
      {replaceVisaSection ? (
        <div id="visa" className="scroll-mt-32">{replaceVisaSection}</div>
      ) : (
      <section id="visa" className="py-16 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4" style={headingColor}>
            {data.visaTitle}
          </h2>
          {data.visaIntro && (
            <p className="text-[15px] text-gray-dark mb-8">{data.visaIntro}</p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden" style={themed ? { borderColor: theme!.gold + "33" } : undefined}>
              <thead>
                <tr className="bg-navy text-white" style={tableHeaderStyle}>
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Requirement</th>
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody data-anim="row-slide">
                {data.visaRequirements.map((req, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"} style={i % 2 === 1 ? tableAltRowStyle : undefined}>
                    <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium" style={tableLabelStyle}>{req.category}</td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{req.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.visaNote && (
            <p className="mt-4 text-sm text-gray-dark italic">{data.visaNote}</p>
          )}
        </div>
      </section>
      )}

      {renderDivider()}

      {/* ===== INTAKES ===== */}
      <section id="intakes" className="bg-off-white py-16 scroll-mt-32" style={sectionTintBg}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4" style={headingColor}>
            {data.intakesTitle}
          </h2>
          {data.intakesIntro && (
            <p className="text-[15px] text-gray-dark mb-8">{data.intakesIntro}</p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden" style={themed ? { borderColor: theme!.gold + "33" } : undefined}>
              <thead>
                <tr className="bg-navy text-white" style={tableHeaderStyle}>
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Intake</th>
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Months</th>
                  {data.intakes.some((i) => i.details) && (
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Details</th>
                  )}
                </tr>
              </thead>
              <tbody data-anim="row-slide">
                {data.intakes.map((intake, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"} style={i % 2 === 1 ? tableAltRowStyle : undefined}>
                    <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium" style={tableLabelStyle}>{intake.intake}</td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{intake.months}</td>
                    {data.intakes.some((i) => i.details) && (
                      <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{intake.details || ""}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.intakesNote && (
            <p className="mt-4 text-sm text-gray-dark italic">{data.intakesNote}</p>
          )}
        </div>
      </section>

      {insertAfterIntakes}

      {/* ===== TEST REQUIREMENTS (optional) ===== */}
      {data.testTitle && data.testRequirements && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4" style={headingColor}>
              {data.testTitle}
            </h2>
            {data.testIntro && (
              <p className="text-[15px] text-gray-dark mb-8">{data.testIntro}</p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden" style={themed ? { borderColor: theme!.gold + "33" } : undefined}>
                <thead>
                  <tr className="bg-navy text-white" style={tableHeaderStyle}>
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Test</th>
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Minimum Score</th>
                    {data.testRequirements.some((t) => t.notes) && (
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Notes</th>
                    )}
                  </tr>
                </thead>
                <tbody data-anim="row-slide">
                  {data.testRequirements.map((test, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"} style={i % 2 === 1 ? tableAltRowStyle : undefined}>
                      <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium" style={tableLabelStyle}>{test.test}</td>
                      <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{test.score}</td>
                      {data.testRequirements!.some((t) => t.notes) && (
                        <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{test.notes || ""}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.testNote && (
              <p className="mt-4 text-sm text-gray-dark italic">{data.testNote}</p>
            )}
          </div>
        </section>
      )}

      {renderDivider()}

      {/* ===== COST ===== */}
      {replaceCostSection ? (
        <>{replaceCostSection}</>
      ) : (
      <section id="cost" className="bg-off-white py-16 scroll-mt-32" style={sectionTintBg}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4 flex items-center gap-3" style={headingColor}>
            {data.costTitle}
            {themed && (
              <span
                className="inline-flex items-center justify-center text-xs font-bold rounded-full px-2.5 py-0.5"
                style={{ background: theme!.gold + "22", color: theme!.primaryDeep, border: `1px solid ${theme!.gold}66` }}
              >
                ₹
              </span>
            )}
          </h2>
          {data.costIntro && (
            <p className="text-[15px] text-gray-dark mb-8">{data.costIntro}</p>
          )}

          {data.costTables.map((table, tableIdx) => (
            <div key={tableIdx} className="mb-8">
              {table.title && (
                <h3 className="text-lg font-bold text-navy mb-3" style={headingColor}>{table.title}</h3>
              )}
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden" style={themed ? { borderColor: theme!.gold + "33" } : undefined}>
                  <thead>
                    <tr className="bg-navy text-white" style={tableHeaderStyle}>
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Category</th>
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Cost</th>
                      {table.rows.some((r) => r.nprCost) && (
                        <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">NPR (Approx.)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody data-anim="row-slide">
                    {table.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"} style={i % 2 === 1 ? tableAltRowStyle : undefined}>
                        <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium" style={tableLabelStyle}>{row.category}</td>
                        <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{row.cost}</td>
                        {table.rows.some((r) => r.nprCost) && (
                          <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{row.nprCost || ""}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {data.costNote && (
            <p className="mt-4 text-sm text-gray-dark italic">{data.costNote}</p>
          )}

          {/* ===== SCHOLARSHIPS (nested under cost section) ===== */}
          <div className="mt-12">
            <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy mb-4" style={headingColor}>
              {data.scholarshipsTitle}
            </h2>
            {data.scholarshipsIntro && (
              <p className="text-[15px] text-gray-dark mb-8">{data.scholarshipsIntro}</p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden" style={themed ? { borderColor: theme!.gold + "33" } : undefined}>
                <thead>
                  <tr className="bg-navy text-white" style={tableHeaderStyle}>
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Scholarship</th>
                    {data.scholarships.some((s) => s.provider) && (
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Provider</th>
                    )}
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody data-anim="row-slide">
                  {data.scholarships.map((s, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"} style={i % 2 === 1 ? tableAltRowStyle : undefined}>
                      <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium" style={tableLabelStyle}>{s.name}</td>
                      {data.scholarships.some((s) => s.provider) && (
                        <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{s.provider || ""}</td>
                      )}
                      <td className="px-3 sm:px-6 py-3 text-sm text-gray-dark">{s.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.scholarshipsNote && (
              <p className="mt-4 text-sm text-gray-dark italic">{data.scholarshipsNote}</p>
            )}
          </div>
        </div>
      </section>
      )}

      {renderDivider()}

      {/* ===== TOP UNIVERSITIES (Marquee) ===== */}
      {data.universities && data.universities.length > 0 && (
        <section className="py-16 overflow-hidden relative">
          {themed && theme!.universitiesBackdrop && (
            <div className="absolute inset-x-0 bottom-8 flex items-end justify-center pointer-events-none opacity-[0.06]">
              <LandmarkSilhouette
                name={theme!.universitiesBackdrop}
                color={theme!.primaryDeep}
                width="80%"
                height={220}
              />
            </div>
          )}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative">
            {themed && theme!.universitiesEyebrow && (
              <p
                className="text-center text-sm md:text-base mb-2 tracking-wide"
                style={{ color: theme!.accent, fontFamily: "var(--font-rubik), serif" }}
              >
                {theme!.universitiesEyebrow}
              </p>
            )}
            <h2 data-anim="fade-up" className="text-2xl md:text-[28px] font-bold text-navy text-center" style={headingColor}>
              Popular {data.countryName.replace(/^the /, "")} Universities
            </h2>
          </div>

          <style>{`
            @keyframes nvt-marquee-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes nvt-marquee-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .nvt-marquee-track-left {
              animation: nvt-marquee-left 45s linear infinite;
            }
            .nvt-marquee-track-right {
              animation: nvt-marquee-right 50s linear infinite;
            }
            .nvt-marquee-row:hover .nvt-marquee-track-left,
            .nvt-marquee-row:hover .nvt-marquee-track-right {
              animation-play-state: paused;
            }
            .nvt-uni-card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .nvt-uni-card:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 30px rgba(30, 109, 235, 0.12) !important;
            }
          `}</style>

          {(() => {
            const mid = Math.ceil(data.universities.length / 2);
            const row1 = data.universities.slice(0, mid);
            const row2 = data.universities.slice(mid);
            const fadeColor = themed ? "#FFFFFF" : "#ffffff";
            return (
              <>
                <div className="nvt-marquee-row relative overflow-hidden mb-5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }} />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }} />
                  <div className="nvt-marquee-track-left flex w-max gap-5">
                    {[...row1, ...row1].map((uni, i) => (
                      <div key={`r1-${i}`} className={`nvt-uni-card bg-white ${themed && theme!.serifHeadings ? "rounded-md" : "rounded-2xl"} px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 w-[160px] sm:w-[200px]`} style={themed && theme!.serifHeadings ? { border: `1.5px solid ${theme!.gold}`, boxShadow: `inset 0 0 0 3px #FFFFFF, inset 0 0 0 4px ${theme!.gold}55, 0 4px 16px rgba(0,33,71,0.08)` } : { border: "1px solid #eef1f6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                        <div className="w-full flex items-center justify-center" style={{ height: 52 }}>
                          <img src={uni.logo} alt={uni.name} width={140} height={48} loading="lazy" style={{ maxHeight: 48, objectFit: "contain" }} />
                        </div>
                        <p className="text-[13px] font-medium text-center leading-snug tracking-wide" style={{ color: "#6b7280" }}>{uni.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {row2.length > 0 && (
                  <div className="nvt-marquee-row relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }} />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }} />
                    <div className="nvt-marquee-track-right flex w-max gap-5">
                      {[...row2, ...row2].map((uni, i) => (
                        <div key={`r2-${i}`} className={`nvt-uni-card bg-white ${themed && theme!.serifHeadings ? "rounded-md" : "rounded-2xl"} px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 w-[160px] sm:w-[200px]`} style={themed && theme!.serifHeadings ? { border: `1.5px solid ${theme!.gold}`, boxShadow: `inset 0 0 0 3px #FFFFFF, inset 0 0 0 4px ${theme!.gold}55, 0 4px 16px rgba(0,33,71,0.08)` } : { border: "1px solid #eef1f6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                          <div className="w-full flex items-center justify-center" style={{ height: 52 }}>
                            <img src={uni.logo} alt={uni.name} width={140} height={48} loading="lazy" style={{ maxHeight: 48, objectFit: "contain" }} />
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
      )}

      {renderDivider()}

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-32">
        <FAQ items={data.faqItems} />
      </div>

      {/* ===== STUDY ABROAD INSIGHTS (Blog) ===== */}
      {blogPosts && blogPosts.length > 0 && (
        <>
          {themed && theme!.serifHeadings && (
            <div className="pt-10 -mb-4 md:-mb-6" style={{ background: theme!.surfaceTint }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3">
                <span className="h-px w-12 md:w-20" style={{ background: theme!.gold }} />
                <span
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.36em] font-bold"
                  style={{ color: theme!.gold, fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif' }}
                >
                  From our journal
                </span>
                <span className="h-px w-12 md:w-20" style={{ background: theme!.gold }} />
              </div>
            </div>
          )}
          <StudyAbroadInsights
            posts={blogPosts}
            countryName={data.countryName}
            categorySlug={data.countryCategorySlug}
          />
        </>
      )}

      {/* ===== TRANSITION SILHOUETTE ===== */}
      {themed && theme!.towerBridgeTransition && (
        <div className="relative overflow-hidden" style={{ background: theme!.surfaceTint, borderTop: `1px solid ${theme!.gold}33` }}>
          <div className="max-w-[1400px] mx-auto px-4 flex items-end justify-center" style={{ height: 170 }}>
            <LandmarkSilhouette name="london-skyline" color={theme!.primaryDeep} opacity={0.3} width="100%" height={160} />
          </div>
        </div>
      )}

      {insertBeforeCTA}

      {/* ===== CTA ===== */}
      <section
        className="relative py-14 md:py-20 overflow-hidden"
        style={{ background: themed ? theme!.surfaceTint : "#FFFAED" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: themed
              ? `radial-gradient(ellipse at 30% 30%, ${theme!.accent}22, transparent 60%), radial-gradient(ellipse at 70% 70%, ${theme!.accentSoft}22, transparent 60%)`
              : "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)",
            backdropFilter: themed ? undefined : "blur(2px)",
          }}
        />
        {themed && theme!.ctaLandmarks && (
          <>
            <div className="hidden md:block absolute left-0 bottom-0 w-[320px] h-[180px] opacity-[0.14] pointer-events-none">
              <LandmarkSilhouette name={theme!.ctaLandmarks.left} color={theme!.primaryDeep} width="100%" height="100%" />
            </div>
            <div className="hidden md:block absolute right-0 bottom-0 w-[320px] h-[180px] opacity-[0.14] pointer-events-none">
              <LandmarkSilhouette name={theme!.ctaLandmarks.right} color={theme!.primaryDeep} width="100%" height="100%" />
            </div>
          </>
        )}
        {!themed && (
          <>
            <div className="hidden sm:block absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-40 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }} />
            <div className="hidden sm:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)" }} />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Left Column */}
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
                style={{
                  background: themed ? theme!.primaryDeep + "10" : "rgba(13,18,130,0.1)",
                  border: themed ? `1px solid ${theme!.primaryDeep}33` : "1px solid rgba(13,18,130,0.2)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" style={themed ? { background: theme!.accent } : undefined} />
                <span className="text-[13px] font-semibold tracking-wide" style={{ color: themed ? theme!.primaryDeep : "#0D1282" }}>Accepting Applications</span>
              </div>
              {themed && theme!.ctaCrownOrnament && (
                <div className="mb-4" aria-hidden>
                  <svg width="56" height="34" viewBox="0 0 56 34" fill="none">
                    <g fill={theme!.gold}>
                      <path d="M 4 26 L 4 12 L 12 20 L 20 6 L 28 18 L 36 6 L 44 20 L 52 12 L 52 26 Z" opacity="0.95" />
                      <circle cx="4" cy="9" r="2.2" />
                      <circle cx="20" cy="3" r="2.4" />
                      <circle cx="28" cy="15" r="2" />
                      <circle cx="36" cy="3" r="2.4" />
                      <circle cx="52" cy="9" r="2.2" />
                      <rect x="2" y="28" width="52" height="3.5" rx="1" />
                    </g>
                    <g fill={theme!.primaryDeep} opacity="0.5">
                      <circle cx="14" cy="22" r="0.9" />
                      <circle cx="28" cy="22" r="0.9" />
                      <circle cx="42" cy="22" r="0.9" />
                    </g>
                  </svg>
                </div>
              )}
              <h2 data-anim="fade-up" className="text-[24px] sm:text-[28px] md:text-[40px] font-bold leading-tight mb-4" style={{ fontFamily: themed && theme!.serifHeadings ? 'var(--font-playfair), "Playfair Display", Georgia, serif' : "var(--font-rubik), sans-serif", color: themed ? theme!.primaryDeep : "#0D1282" }}>
                Ready to Build Your <span style={{ color: themed ? theme!.accent : "#E8430C" }}>Global Career?</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-md mb-8" style={{ color: themed ? theme!.ink + "AA" : "rgba(13,18,130,0.7)" }}>
                Let our expert counselors guide you through university selection, applications, visas, and everything in between.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {[
                  { title: "24hr Response", sub: "Average reply time", icon: (<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />) },
                  { title: "Free Consultation", sub: "No commitment", icon: (<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />) },
                  { title: "Expert Team", sub: "10+ years experience", icon: (<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />) },
                ].map((item) => (
                  <div className="flex items-center gap-3" key={item.title}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: themed ? theme!.primaryDeep + "10" : "rgba(13,18,130,0.1)",
                        border: themed ? `1px solid ${theme!.gold}66` : undefined,
                      }}
                    >
                      <svg className="w-5 h-5" style={{ color: themed ? theme!.primaryDeep : "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: themed ? theme!.primaryDeep : "#0D1282" }}>{item.title}</p>
                      <p className="text-[13px] sm:text-[11px]" style={{ color: themed ? theme!.ink + "77" : "rgba(13,18,130,0.5)" }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col gap-3">
              <Link href="/register" className="group block bg-white rounded-2xl p-6 md:p-7 transition-shadow hover:shadow-xl" style={themed ? { border: `1px solid ${theme!.gold}44` } : undefined}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: themed ? theme!.accent + "1A" : "#EEF2FF" }}>
                    <svg className="w-6 h-6" style={{ color: themed ? theme!.accent : "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: themed ? theme!.primaryDeep : "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>Schedule a Free Consultation</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Book a free 30-minute call to discuss your study abroad goals and get expert recommendations.</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: themed ? theme!.accent : "#0D1282" }}>
                  Book your slot
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
              <a href="mailto:hello@admizz.com" className="flex items-center justify-center gap-3 rounded-2xl px-5 py-3 w-full transition-colors hover:opacity-90" style={{ background: themed ? theme!.primaryDeep + "10" : "rgba(13,18,130,0.1)", border: themed ? `1px solid ${theme!.primaryDeep}33` : "1px solid rgba(13,18,130,0.2)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: themed ? theme!.primaryDeep + "10" : "rgba(13,18,130,0.1)" }}>
                  <svg className="w-4 h-4" style={{ color: themed ? theme!.primaryDeep : "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: themed ? theme!.primaryDeep : "#0D1282" }}>Email Us</p>
                  <p className="text-[13px] sm:text-[11px] truncate" style={{ color: themed ? theme!.ink + "77" : "rgba(13,18,130,0.5)" }}>hello@admizz.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

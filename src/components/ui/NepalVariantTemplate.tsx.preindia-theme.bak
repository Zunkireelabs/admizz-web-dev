"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Hero from "@/components/ui/Hero";
import CTAForm from "@/components/ui/CTAForm";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import Link from "next/link";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
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
}

const tabs = [
  { id: "why", label: "Why Study Here" },
  { id: "visa", label: "Visa Requirements" },
  { id: "intakes", label: "Intakes" },
  { id: "cost", label: "Cost & Scholarships" },
  { id: "faq", label: "FAQs" },
];

export default function NepalVariantTemplate({ data, blogPosts }: NepalVariantTemplateProps) {
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
      {/* ===== HERO ===== */}
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

      {/* ===== STATS BAR ===== */}
      <section className="bg-off-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-navy">1500+</p>
            <p className="text-[13px] text-gray-dark">
              Students successfully enrolled worldwide
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-navy">95%</p>
            <p className="text-[13px] text-gray-dark">
              Student Visa Approval Rate with Expert Guidance
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-navy">$2M+</p>
            <p className="text-[13px] text-gray-dark">
              In Scholarships Awarded to Our Students
            </p>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <nav className="sticky top-[70px] z-40 bg-white border-b border-border-light">
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
                  className={`px-4 py-3.5 sm:px-5 text-[13px] sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-link text-blue-link"
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

      {/* ===== INTRO SECTION ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.introTitle}
          </h2>
          <p className="text-[15px] text-gray-dark leading-relaxed">
            {data.introContent}
          </p>
        </div>
      </section>

      {/* ===== WHY STUDY HERE ===== */}
      <section id="why" className="bg-off-white py-16 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.whyStudyTitle}
          </h2>
          {data.whyStudyIntro && (
            <p className="text-[15px] text-gray-dark mb-8 max-w-3xl">
              {data.whyStudyIntro}
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border border-border-light rounded-[10px] p-6"
              >
                <h3 className="font-bold text-navy">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY ADMIZZ (optional) ===== */}
      {data.whyAdmizzTitle && data.whyAdmizzPoints && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
              {data.whyAdmizzTitle}
            </h2>
            <ul className="space-y-3">
              {data.whyAdmizzPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-dark">
                  <svg
                    className="w-4 h-4 text-golden flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
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
        <section className="bg-off-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-6">
              {data.topCoursesTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.topCourses.map((course, i) => (
                <div
                  key={i}
                  className="bg-white border border-border-light rounded-[10px] px-5 py-3 text-sm text-navy font-medium"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== VISA REQUIREMENTS ===== */}
      <section id="visa" className="py-16 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.visaTitle}
          </h2>
          {data.visaIntro && (
            <p className="text-[15px] text-gray-dark mb-8">{data.visaIntro}</p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Requirement</th>
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {data.visaRequirements.map((req, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                    <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium">{req.category}</td>
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

      {/* ===== INTAKES ===== */}
      <section id="intakes" className="bg-off-white py-16 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.intakesTitle}
          </h2>
          {data.intakesIntro && (
            <p className="text-[15px] text-gray-dark mb-8">{data.intakesIntro}</p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Intake</th>
                  <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Months</th>
                  {data.intakes.some((i) => i.details) && (
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Details</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.intakes.map((intake, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                    <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium">{intake.intake}</td>
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

      {/* ===== TEST REQUIREMENTS (optional) ===== */}
      {data.testTitle && data.testRequirements && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
              {data.testTitle}
            </h2>
            {data.testIntro && (
              <p className="text-[15px] text-gray-dark mb-8">{data.testIntro}</p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Test</th>
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Minimum Score</th>
                    {data.testRequirements.some((t) => t.notes) && (
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Notes</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.testRequirements.map((test, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                      <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium">{test.test}</td>
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

      {/* ===== COST ===== */}
      <section id="cost" className="bg-off-white py-16 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.costTitle}
          </h2>
          {data.costIntro && (
            <p className="text-[15px] text-gray-dark mb-8">{data.costIntro}</p>
          )}

          {data.costTables.map((table, tableIdx) => (
            <div key={tableIdx} className="mb-8">
              {table.title && (
                <h3 className="text-lg font-bold text-navy mb-3">{table.title}</h3>
              )}
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Category</th>
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Cost</th>
                      {table.rows.some((r) => r.nprCost) && (
                        <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">NPR (Approx.)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                        <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium">{row.category}</td>
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
            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
              {data.scholarshipsTitle}
            </h2>
            {data.scholarshipsIntro && (
              <p className="text-[15px] text-gray-dark mb-8">{data.scholarshipsIntro}</p>
            )}
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Scholarship</th>
                    {data.scholarships.some((s) => s.provider) && (
                      <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Provider</th>
                    )}
                    <th className="text-left px-3 sm:px-6 py-3 text-sm font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {data.scholarships.map((s, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                      <td className="px-3 sm:px-6 py-3 text-sm text-navy font-medium">{s.name}</td>
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

      {/* ===== TOP UNIVERSITIES (Marquee) ===== */}
      {data.universities && data.universities.length > 0 && (
        <section className="py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center">
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
            return (
              <>
                <div className="nvt-marquee-row relative overflow-hidden mb-5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
                  <div className="nvt-marquee-track-left flex w-max gap-5">
                    {[...row1, ...row1].map((uni, i) => (
                      <div key={`r1-${i}`} className="nvt-uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[200px]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
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
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
                    <div className="nvt-marquee-track-right flex w-max gap-5">
                      {[...row2, ...row2].map((uni, i) => (
                        <div key={`r2-${i}`} className="nvt-uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[200px]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
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

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-32">
        <FAQ items={data.faqItems} />
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
              <h2 className="text-[24px] sm:text-[28px] md:text-[40px] font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-rubik), sans-serif", color: "#0D1282" }}>
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
                <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>Schedule a Free Consultation</h3>
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

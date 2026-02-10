"use client";

import { useState } from "react";
import Hero from "@/components/ui/Hero";
import CTAForm from "@/components/ui/CTAForm";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import Link from "next/link";

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
}

interface NepalVariantTemplateProps {
  data: NepalVariantData;
}

const tabs = [
  { id: "why", label: "Why Study Here" },
  { id: "visa", label: "Visa Requirements" },
  { id: "intakes", label: "Intakes" },
  { id: "cost", label: "Cost & Scholarships" },
  { id: "faq", label: "FAQs" },
];

export default function NepalVariantTemplate({ data }: NepalVariantTemplateProps) {
  const [activeTab, setActiveTab] = useState("why");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      {/* ===== HERO ===== */}
      <Hero
        heading={data.heroHeading}
        subheading={data.heroSubheading}
        ctaText="Book Free Counseling"
        variant="gradient"
        rightContent={{
          type: "form",
          formProps: { defaultDestination: data.countryName },
        }}
      />

      {/* ===== STATS BAR ===== */}
      <section className="bg-off-white py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-navy">1500+</p>
            <p className="text-xs text-gray-dark">
              Students successfully enrolled worldwide
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-navy">95%</p>
            <p className="text-xs text-gray-dark">
              Student Visa Approval Rate with Expert Guidance
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-navy">$2M+</p>
            <p className="text-xs text-gray-dark">
              In Scholarships Awarded to Our Students
            </p>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <nav className="sticky top-[70px] z-40 bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
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
      </nav>

      {/* ===== INTRO SECTION ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.introTitle}
          </h2>
          <p className="text-[15px] text-gray-dark leading-relaxed">
            {data.introContent}
          </p>
        </div>
      </section>

      {/* ===== WHY STUDY HERE ===== */}
      <section id="why" className="bg-off-white py-16 px-4 scroll-mt-32">
        <div className="max-w-7xl mx-auto">
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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
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
        <section className="bg-off-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
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
      <section id="visa" className="py-16 px-4 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
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
                  <th className="text-left px-6 py-3 text-sm font-semibold">Requirement</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {data.visaRequirements.map((req, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                    <td className="px-6 py-3 text-sm text-navy font-medium">{req.category}</td>
                    <td className="px-6 py-3 text-sm text-gray-dark">{req.details}</td>
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
      <section id="intakes" className="bg-off-white py-16 px-4 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
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
                  <th className="text-left px-6 py-3 text-sm font-semibold">Intake</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Months</th>
                  {data.intakes.some((i) => i.details) && (
                    <th className="text-left px-6 py-3 text-sm font-semibold">Details</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.intakes.map((intake, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                    <td className="px-6 py-3 text-sm text-navy font-medium">{intake.intake}</td>
                    <td className="px-6 py-3 text-sm text-gray-dark">{intake.months}</td>
                    {data.intakes.some((i) => i.details) && (
                      <td className="px-6 py-3 text-sm text-gray-dark">{intake.details || ""}</td>
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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
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
                    <th className="text-left px-6 py-3 text-sm font-semibold">Test</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold">Minimum Score</th>
                    {data.testRequirements.some((t) => t.notes) && (
                      <th className="text-left px-6 py-3 text-sm font-semibold">Notes</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.testRequirements.map((test, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                      <td className="px-6 py-3 text-sm text-navy font-medium">{test.test}</td>
                      <td className="px-6 py-3 text-sm text-gray-dark">{test.score}</td>
                      {data.testRequirements!.some((t) => t.notes) && (
                        <td className="px-6 py-3 text-sm text-gray-dark">{test.notes || ""}</td>
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
      <section id="cost" className="bg-off-white py-16 px-4 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
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
                      <th className="text-left px-6 py-3 text-sm font-semibold">Category</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Cost</th>
                      {table.rows.some((r) => r.nprCost) && (
                        <th className="text-left px-6 py-3 text-sm font-semibold">NPR (Approx.)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                        <td className="px-6 py-3 text-sm text-navy font-medium">{row.category}</td>
                        <td className="px-6 py-3 text-sm text-gray-dark">{row.cost}</td>
                        {table.rows.some((r) => r.nprCost) && (
                          <td className="px-6 py-3 text-sm text-gray-dark">{row.nprCost || ""}</td>
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
                    <th className="text-left px-6 py-3 text-sm font-semibold">Scholarship</th>
                    {data.scholarships.some((s) => s.provider) && (
                      <th className="text-left px-6 py-3 text-sm font-semibold">Provider</th>
                    )}
                    <th className="text-left px-6 py-3 text-sm font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {data.scholarships.map((s, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-off-white"}>
                      <td className="px-6 py-3 text-sm text-navy font-medium">{s.name}</td>
                      {data.scholarships.some((s) => s.provider) && (
                        <td className="px-6 py-3 text-sm text-gray-dark">{s.provider || ""}</td>
                      )}
                      <td className="px-6 py-3 text-sm text-gray-dark">{s.details}</td>
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

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-32">
        <FAQ items={data.faqItems} />
      </div>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-[28px] font-bold">
            {data.ctaTitle}
          </h2>
          <p className="mt-3 text-[15px]">
            {data.ctaContent}
          </p>
          <Link
            href="/register/"
            className="inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    </main>
  );
}

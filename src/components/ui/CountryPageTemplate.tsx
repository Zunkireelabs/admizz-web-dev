"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/ui/Hero";
import CTAForm from "@/components/ui/CTAForm";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";

export interface QuickFact {
  label: string;
  value: string;
}

export interface BenefitCard {
  title: string;
  description: string;
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
}

interface CountryPageTemplateProps {
  data: CountryPageData;
}

const tabs = [
  { id: "why", label: "Why Study Here" },
  { id: "admission", label: "Admission" },
  { id: "universities", label: "Top Universities" },
  { id: "cost", label: "Cost & Financial" },
  { id: "visa", label: "Visa Process" },
  { id: "faq", label: "FAQs" },
];

export default function CountryPageTemplate({ data }: CountryPageTemplateProps) {
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

      {/* ===== QUICK FACTS ===== */}
      <section className="bg-off-white py-6 px-4 border-b border-border-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {data.quickFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <p className="text-sm font-bold text-navy">{fact.value}</p>
                <p className="text-xs text-gray-dark">{fact.label}</p>
              </div>
            ))}
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

      {/* ===== WHY STUDY HERE ===== */}
      <section id="why" className="py-16 px-4 scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.whyStudyTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-8 max-w-3xl">
            {data.whyStudyIntro}
          </p>
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

      {/* ===== ADMISSION REQUIREMENTS ===== */}
      <section id="admission" className="bg-off-white py-16 px-4 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.admissionTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-8">{data.admissionIntro}</p>

          {data.documentSections.map((section) => (
            <div key={section.title} className="mb-8">
              <h3 className="text-lg font-bold text-navy mb-3">
                {section.title}
              </h3>
              <p className="text-sm text-gray-dark mb-4">{section.intro}</p>
              <ul className="space-y-2">
                {section.documents.map((doc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-dark"
                  >
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
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {data.intakes && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-navy mb-3">
                {data.intakes.title}
              </h3>
              <p className="text-sm text-gray-dark mb-4">
                {data.intakes.intro}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.intakes.items.map((intake) => (
                  <div
                    key={intake.name}
                    className="bg-white border border-border-light rounded-[10px] p-4"
                  >
                    <h4 className="font-bold text-navy text-sm">
                      {intake.name}
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {intake.details.map((detail, i) => (
                        <li key={i} className="text-xs text-gray-dark">
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

      {/* ===== TOP UNIVERSITIES ===== */}
      <section id="universities" className="py-16 px-4 scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Top Universities in {data.countryName}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {data.universities.map((uni) => (
              <div
                key={uni.name}
                className="bg-white border border-border-light rounded-[10px] p-4 flex items-center justify-center aspect-[3/2] hover:shadow-md transition-shadow"
              >
                <Image
                  src={uni.logo}
                  alt={uni.name}
                  width={120}
                  height={80}
                  className="object-contain max-h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COST ===== */}
      <section id="cost" className="bg-off-white py-16 px-4 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.costTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-8">{data.costIntro}</p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-6 py-3 text-sm font-semibold">
                    Program
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">
                    Tuition Fees (Per Year)
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.costTable.map((row, i) => (
                  <tr
                    key={row.program}
                    className={i % 2 === 0 ? "bg-white" : "bg-off-white"}
                  >
                    <td className="px-6 py-3 text-sm text-navy font-medium">
                      {row.program}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-dark">
                      {row.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.costNote && (
            <p className="mt-4 text-sm text-gray-dark italic">
              {data.costNote}
            </p>
          )}
        </div>
      </section>

      {/* ===== VISA PROCESS ===== */}
      <section id="visa" className="py-16 px-4 scroll-mt-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
            {data.visaTitle}
          </h2>
          <p className="text-[15px] text-gray-dark mb-8">{data.visaIntro}</p>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-light" />
            <div className="space-y-6">
              {data.visaSteps.map((step, index) => (
                <div key={index} className="relative pl-16">
                  <div className="absolute left-0 w-12 h-12 bg-blue-dark text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                    {index + 1}
                  </div>
                  <div className="bg-white border border-border-light rounded-[10px] p-5">
                    <h3 className="font-bold text-navy text-sm">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-dark">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
            Ready to Begin Your Study Abroad Journey?
          </h2>
          <p className="mt-3 text-[15px]">
            Our expert consultants are here to guide you every step of the way.
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

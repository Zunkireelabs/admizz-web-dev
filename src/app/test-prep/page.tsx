"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import FAQ from "@/components/ui/FAQ";
import AlumniSection from "@/components/ui/AlumniSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import CRMFormEmbed from "@/components/ui/CRMFormEmbed";
import { allUniversities } from "@/lib/universities";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const testCards = [
  {
    name: "IELTS",
    logo: "/images/test-prep/IELTS_LOGO.webp",
    description:
      "A globally recognized English proficiency test for study, work, and migration\u2014widely accepted in countries like the UK, Canada, Australia, and many others.",
  },
  {
    name: "GRE",
    logo: "/images/test-prep/Untitled-design.webp",
    description:
      "Globally accepted graduate admissions test for master\u2019s, MBA, and PhD programs\u2014widely recognized in the U.S., Canada, and beyond.",
  },
  {
    name: "TOEFL",
    logo: "/images/test-prep/TOFEL_LOGO.webp",
    description:
      "Preferred by U.S. universities, this test measures academic English skills in reading, writing, speaking, and listening.",
  },
  {
    name: "PTE",
    logo: "/images/test-prep/PTE_LOGO.webp",
    description:
      "AI-scored exam with fast results\u2014ideal for studying or immigrating to Australia, New Zealand, and beyond.",
  },
  {
    name: "SAT",
    logo: "/images/test-prep/SAT.webp",
    description:
      "Standardized test for undergraduate admissions in the U.S. and select international universities\u2014tests math, reading, and writing.",
  },
  {
    name: "Duolingo",
    logo: "/images/test-prep/duolingo-2.webp",
    description:
      "Flexible, fast, and accepted by 4,000+ institutions\u2014complete the test from home in under an hour.",
  },
];

const whyItems = [
  {
    title: "Structured Course Plans",
    content:
      "At Admizz Education, every program is based on a well-structured curriculum aligned with the specific test format. From orientation to strategy sessions, we guide you through weekly milestones\u2014ensuring you master each module in a clear, systematic, and achievable way.",
  },
  {
    title: "Mock Tests & Personalized Score Analysis",
    content:
      "Regular full-length mock tests closely simulate the real exam environment. Following each test, you receive in-depth performance analytics that highlight your strengths and pinpoint areas for improvement\u2014enabling targeted and effective learning.",
  },
  {
    title: "Small Batch Sizes for Focused Attention",
    content:
      "To ensure each student receives the attention they deserve, we intentionally keep our class sizes small. This enables our trainers to offer personalized support, address doubts in real-time, and tailor their teaching approach to suit individual learning styles.",
  },
  {
    title: "One-on-One Mentorship & Doubt Clearing",
    content:
      "In addition to group classes, students can schedule one-on-one sessions with mentors for extra support. Whether you\u2019re struggling with a specific module or need strategic guidance, we\u2019re here to ensure you stay on track and never feel stuck or left behind.",
  },
  {
    title: "Experienced & Certified Trainers",
    content:
      "Our instructors are certified professionals with years of experience in coaching students for competitive tests. They don\u2019t just teach\u2014they mentor, motivate, and bring insights from hundreds of student success stories to help you reach your goal score.",
  },
  {
    title: "Flexible Learning Modes",
    content:
      "Attend sessions your way\u2014join physical classrooms at our centers or learn from the comfort of your home through interactive live online classes. Choose from weekday, weekend, or fast-track batches based on your schedule.",
  },
  {
    title: "Complete Study Material & Practice Resources",
    content:
      "You\u2019ll receive curated study materials that are regularly updated based on exam trends. From grammar rules to essay templates and speaking topics, everything is included to prepare you comprehensively.",
  },
  {
    title: "Full Support from Registration to Results",
    content:
      "We don\u2019t just train\u2014you get step-by-step assistance from test registration to post-exam counseling. Our support team ensures you\u2019re confident and well-prepared every step of the way.",
  },
];

const featureCards = [
  {
    title: "Personalized Experience",
    iconBg: "#DBEAFE",
    iconColor: "#3B82F6",
    icon: (color: string) => (
      <svg className="w-7 h-7" fill="none" stroke={color} strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Custom Study Schedules",
    iconBg: "#D1FAE5",
    iconColor: "#059669",
    icon: (color: string) => (
      <svg className="w-7 h-7" fill="none" stroke={color} strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Comprehensive Classes",
    iconBg: "#FCE7F3",
    iconColor: "#DB2777",
    icon: (color: string) => (
      <svg className="w-7 h-7" fill="none" stroke={color} strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Start to End Preparation",
    iconBg: "#DBEAFE",
    iconColor: "#3B82F6",
    icon: (color: string) => (
      <svg className="w-7 h-7" fill="none" stroke={color} strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Rated 4.4 by Students",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    icon: (color: string) => (
      <svg className="w-7 h-7" fill="none" stroke={color} strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "24/7 Student Support",
    iconBg: "#DBEAFE",
    iconColor: "#3B82F6",
    icon: (color: string) => (
      <svg className="w-7 h-7" fill="none" stroke={color} strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
];


const faqItems = [
  {
    question: "How do I know which test is right for me?",
    answer: "Our experts guide you based on your destination and university requirements.",
  },
  {
    question: "Can I switch from online to offline batch?",
    answer: "Yes, we offer complete flexibility based on your preference.",
  },
  {
    question: "What if I miss a class?",
    answer: "We provide class recordings and revision sessions.",
  },
  {
    question: "How long is each course?",
    answer: "It depends on your test date\u2014typically between 4 to 8 weeks.",
  },
  {
    question: "Is the demo class really free?",
    answer: "Absolutely. No commitments\u2014just try before you enroll.",
  },
];


const prizes = [
  { name: "Free Test Prep", icon: "book" },
  { name: "Internet Recharge", icon: "wifi" },
  { name: "Laptop", icon: "laptop" },
  { name: "Free Flight Ticket", icon: "plane" },
  { name: "Movie Ticket", icon: "ticket" },
  { name: "Tablet", icon: "tablet" },
  { name: "Smart Phone", icon: "phone" },
  { name: "Ear Buds", icon: "headphones" },
  { name: "Smart Watch", icon: "watch" },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function TestPrepPage() {
  const [whyOpen, setWhyOpen] = useState<number | null>(null);
  const [uniFilter, setUniFilter] = useState("All");

  const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

  const uniCountries = [
    { label: "All", flag: "" },
    { label: "USA", flag: "🇺🇸" },
    { label: "UK", flag: "🇬🇧" },
    { label: "Australia", flag: "🇦🇺" },
    { label: "Canada", flag: "🇨🇦" },
    { label: "India", flag: "🇮🇳" },
    { label: "New Zealand", flag: "🇳🇿" },
    { label: "Finland", flag: "🇫🇮" },
    { label: "Germany", flag: "🇩🇪" },
    { label: "France", flag: "🇫🇷" },
  ];

  const filteredUnis = useMemo(() =>
    uniFilter === "All" ? allUniversities : allUniversities.filter(u => u.country === uniFilter),
    [uniFilter]
  );

  const uniRow1 = filteredUnis.slice(0, Math.ceil(filteredUnis.length / 2));
  const uniRow2 = filteredUnis.slice(Math.ceil(filteredUnis.length / 2));

  // Match homepage speed: 120s for 11-card set (USA) → ~10.9s per card
  const SECONDS_PER_CARD = 120 / Math.ceil(22 / 2);
  const uniRow1Duration = Math.max(uniRow1.length * SECONDS_PER_CARD, 20);
  const uniRow2Duration = Math.max(uniRow2.length * SECONDS_PER_CARD, 20);

  return (
    <main>
      {/* ===== 1. HERO (heading + features + stats on LEFT, form on RIGHT) ===== */}
      <section id="book-demo" className="pt-10 pb-6" style={{ background: "linear-gradient(180deg, #e8f0fe 0%, #f5f7f8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[55fr_45fr] gap-10 items-start">
          {/* --- LEFT COLUMN --- */}
          <div className="pt-8">
            <p className="text-sm font-semibold text-[#0D1282] uppercase tracking-wide mb-3">
              CRACK YOUR TEST, ACHIEVE YOUR DREAM
            </p>
            <h1
              className="text-3xl md:text-[42px] font-bold leading-tight md:leading-[52px] text-[#0D1282]"
              style={rubikFont}
            >
              Leading Institute for Test Prep &amp; Study Abroad
            </h1>

            {/* Feature Cards */}
            <div className="mt-8">

              {/* Mobile & Desktop: 3-column grid (all 3 boxes in one row) */}
              <div className="grid grid-cols-3 gap-3">
                {([
                  { icon: "/images/icons/user.webp", label: "Personalized Coaching", bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)", arc: "rgba(147,197,253,0.5)" },
                  { icon: "/images/icons/online-learning.webp", label: "Flexible Online Learning", bg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)", arc: "rgba(110,231,183,0.4)" },
                  { icon: "/images/icons/excellence.webp", label: "Guaranteed Score Improvement", bg: "linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)", arc: "rgba(253,224,71,0.4)" },
                ] as const).map((f) => (
                  <div
                    key={f.label}
                    className="relative rounded-2xl overflow-hidden flex flex-col items-start justify-between p-5"
                    style={{ background: f.bg, minHeight: 140 }}
                  >
                    <div className="absolute -right-8 -bottom-8 w-[120px] h-[120px] rounded-full pointer-events-none" style={{ background: f.arc }} />
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.55)" }}>
                      <Image src={f.icon} alt={f.label} width={24} height={24} className="relative z-10" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#0D1282] leading-snug relative z-10 mt-2">{f.label}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { value: "1K+", label: "Students Trained" },
                { value: "10+", label: "Study Destinations" },
                { value: "98%", label: "Success Rate" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center text-center gap-0.5 rounded-[12px] px-2 py-3 sm:flex-row sm:items-center sm:text-left sm:gap-3 sm:px-4"
                  style={{
                    background: "linear-gradient(182deg, #bfdbfe -115.27%, #ffffff 53.32%)",
                    border: "1px solid #F2F2F2",
                  }}
                >
                  <span className="text-lg sm:text-xl font-bold text-[#B8860B] whitespace-nowrap">{s.value}</span>
                  <span className="text-[11px] sm:text-[13px] font-medium text-[#0D1282] leading-tight">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Content Cards: Unlimited Mock Tests & Study Material */}
            <div className="mt-6 space-y-2">
              {/* Card 1: Unlimited Mock Tests */}
              <div
                className="relative rounded-[16px] overflow-hidden flex flex-col sm:flex-row items-start gap-3 p-3"
                style={{
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  minHeight: 80,
                }}
              >
                <div className="absolute -right-6 -bottom-6 w-[80px] h-[80px] rounded-full pointer-events-none" style={{ background: "rgba(147,197,253,0.5)" }} />
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center relative z-10 flex-shrink-0" style={{ background: "rgba(255,255,255,0.6)" }}>
                  <Image src="/images/icons/exam-1.webp" alt="Mock Tests" width={24} height={24} />
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-sm font-semibold text-navy mb-1">
                    Unlimited Mock Tests
                  </h3>
                  <p className="text-[12px] text-gray-dark leading-snug">
                    Take unlimited full-length mock tests to track progress with detailed analytics.
                  </p>
                </div>
              </div>

              {/* Card 2: Study Material Provided */}
              <div
                className="relative rounded-[16px] overflow-hidden flex flex-col sm:flex-row items-start gap-3 p-3"
                style={{
                  background: "linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%)",
                  minHeight: 80,
                }}
              >
                <div className="absolute -right-6 -bottom-6 w-[80px] h-[80px] rounded-full pointer-events-none" style={{ background: "rgba(168,85,247,0.4)" }} />
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center relative z-10" style={{ background: "rgba(255,255,255,0.6)" }}>
                  <Image src="/images/icons/knowledge.webp" alt="Study Material" width={24} height={24} />
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-sm font-semibold text-navy mb-1">
                    Study Material Provided
                  </h3>
                  <p className="text-[12px] text-gray-dark leading-snug">
                    Comprehensive, regularly updated materials aligned with latest exam trends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Form (iframe) --- */}
          <div
            className="p-3 sm:p-5"
            style={{
              border: "1px solid #D4955A",
              borderRadius: 24,
              background: "linear-gradient(to bottom, #F0ECF9, #FFFFFF)",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <p className="text-[1.1rem] font-semibold text-[#1d419d] text-center mb-4">
              Book a Free Demo Class
            </p>
            <CRMFormEmbed
              src="https://edgex.zunkireelabs.com/form/admizz/test-prep?bg=F0ECF9"
              height={580}
              mobileHeight={470}
              title="Test Prep Enquiry Form"
              formSource="test-prep"
            />
          </div>
        </div>
      </section>

      {/* ===== 1.5 ALUMNI SECTION ===== */}
      <AlumniSection />

      {/* ===== 2. TEST CARDS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[30px] font-bold text-[#0D1282] mb-4"
            style={rubikFont}
          >
            Essential English Proficiency &amp; Standardized Tests
          </h2>
          <p className="text-sm text-gray-dark leading-relaxed mb-10 max-w-4xl">
            Choosing the right exam is a crucial step in your study abroad journey. Whether
            you&apos;re applying for university admissions, meeting visa requirements, or seeking
            job placements, each test&mdash;IELTS, TOEFL, PTE, SAT, or Duolingo&mdash;serves a
            distinct purpose and follows its own unique format. Therefore, understanding what sets
            them apart is essential. By doing so, you can make a well-informed decision based on
            your goals, strengths, and preferred destination.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {testCards.map((card) => (
              <div
                key={card.name}
                className="rounded-[12px] overflow-hidden"
                style={{
                  background: "linear-gradient(182deg, #bfdbfe -115.27%, #ffffff 53.32%)",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <div className="h-[80px] flex items-center justify-center p-3">
                  <Image
                    src={card.logo}
                    alt={card.name}
                    width={80}
                    height={50}
                    className="object-contain max-h-[50px]"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-[#0D1282] mb-1.5">{card.name}</h3>
                  <p className="text-[13px] sm:text-[11px] text-gray-dark leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. WHY OUR TEST PREP WORKS — 2-column Accordion ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[30px] font-bold text-[#0D1282] mb-8"
            style={rubikFont}
          >
            Why Our Test Prep Works
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {whyItems.map((item, index) => (
              <div
                key={index}
                className="border border-border-light rounded-[10px] overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setWhyOpen(whyOpen === index ? null : index)}
                >
                  <span className="text-[13px] font-medium text-navy pr-4">
                    {item.title}
                  </span>
                  <svg
                    className={`w-4 h-4 flex-shrink-0 text-navy transition-transform ${
                      whyOpen === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {whyOpen === index && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-gray-dark leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. WHAT MAKES US BEST ===== */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[30px] font-bold text-[#0D1282] mb-1"
            style={rubikFont}
          >
            What makes us the best
          </h2>
          <p className="text-sm text-gray-dark mb-10">
            We Don&apos;t Just Teach&mdash;We Help You Succeed
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            {featureCards.map((card) => (
              <div key={card.title}>
                <div
                  className="w-14 h-14 mb-3 rounded-full flex items-center justify-center"
                  style={{ background: card.iconBg }}
                >
                  {card.icon(card.iconColor)}
                </div>
                <h3 className="text-sm font-semibold text-slate">{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== 6. CTA BANNER — 2 column: text left, test logos right ===== */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #fde8d8 0%, #fce4ec 50%, #f3e7f9 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2
              className="text-2xl md:text-[34px] font-bold leading-tight text-[#0D1282] mb-4"
              style={rubikFont}
            >
              Take the First Step Toward
              <br />
              Your Global Future
            </h2>
            <p className="text-sm text-gray-dark mb-6 leading-relaxed max-w-md">
              Your dream university is just a test away. Start with a free demo
              class and see how Admizz Education makes the difference.
            </p>
            <a
              href="#book-demo"
              className="inline-flex items-center gap-2 bg-[#0D1282] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#1a237e] transition-colors"
            >
              Book a Free Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8l4 4m0 0l-4 4m4-4H8" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {testCards.map((card) => (
              <div
                key={card.name}
                className="bg-white rounded-xl p-4 flex items-center justify-center shadow-sm"
              >
                <Image
                  src={card.logo}
                  alt={card.name}
                  width={100}
                  height={50}
                  className="object-contain max-h-[50px]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. UNIVERSITY FILTERABLE GRID ===== */}
      <section className="py-16 overflow-hidden" style={{ background: "#F8F9FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl md:text-[30px] font-bold text-[#0D1282] text-center mb-6" style={rubikFont}>
            Our Students Made It Here
          </h2>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#EBF2FF" }}>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="#1E6DEB" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold" style={{ color: "#3d4663" }}>100+ Institutions</span>
            </div>
            <div className="w-px h-5" style={{ background: "#d0d5dd" }} />
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#EBF2FF" }}>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="#1E6DEB" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <span className="text-[13px] font-semibold" style={{ color: "#3d4663" }}>Verified Partners</span>
            </div>
          </div>

          {/* Country Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {uniCountries.map((c) => (
              <button
                key={c.label}
                onClick={() => setUniFilter(c.label)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 border"
                style={{
                  background: uniFilter === c.label ? "#0D1282" : "#fff",
                  color: uniFilter === c.label ? "#fff" : "#3d4663",
                  borderColor: uniFilter === c.label ? "#0D1282" : "#d0d5dd",
                  boxShadow: uniFilter === c.label ? "0 2px 8px rgba(13,18,130,0.2)" : "none",
                }}
              >
                {c.flag && <span>{c.flag}</span>}
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animation styles */}
        <style>{`
          @keyframes tp-uni-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes tp-uni-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .tp-uni-row:hover .tp-uni-track { animation-play-state: paused; }
          .tp-uni-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
          .tp-uni-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(13,18,130,0.12) !important; }

        `}</style>

        {/* Row 1 — scrolls left */}
        {uniRow1.length > 0 && (
          <div className="tp-uni-row relative overflow-hidden mb-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: "linear-gradient(to right, #F8F9FF, transparent)" }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: "linear-gradient(to left, #F8F9FF, transparent)" }} />
            <div className="tp-uni-track flex w-max gap-4" style={{ animation: `tp-uni-left ${uniRow1Duration}s linear infinite` }}>
              {[...uniRow1, ...uniRow1].map((u, i) => (
                <div key={i} className="tp-uni-card bg-white rounded-2xl px-5 py-4 flex flex-col items-center justify-center gap-2 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[190px]" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div className="w-full flex items-center justify-center" style={{ height: 48 }}>
                    <Image src={u.logo} alt={u.name} width={130} height={44} className="object-contain max-h-[44px]" />
                  </div>
                  <p className="text-[12px] font-medium text-center leading-snug" style={{ color: "#6b7280" }}>{u.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 2 — scrolls right */}
        {uniRow2.length > 0 && (
          <div className="tp-uni-row relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style={{ background: "linear-gradient(to right, #F8F9FF, transparent)" }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style={{ background: "linear-gradient(to left, #F8F9FF, transparent)" }} />
            <div className="tp-uni-track flex w-max gap-4" style={{ animation: `tp-uni-right ${uniRow2Duration}s linear infinite` }}>
              {[...uniRow2, ...uniRow2].map((u, i) => (
                <div key={i} className="tp-uni-card bg-white rounded-2xl px-5 py-4 flex flex-col items-center justify-center gap-2 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[190px]" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div className="w-full flex items-center justify-center" style={{ height: 48 }}>
                    <Image src={u.logo} alt={u.name} width={130} height={44} className="object-contain max-h-[44px]" />
                  </div>
                  <p className="text-[12px] font-medium text-center leading-snug" style={{ color: "#6b7280" }}>{u.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===== 8. FAQ ===== */}
      <FAQ
        title="Frequently Asked Questions"
        items={faqItems}
      />

    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \"<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \\\"<div class=\\\\\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\\\\\">\\\\n  <section class=\\\\\\\"gap-2.5\\\\\\\">\\\\n    <h2 class=\\\\\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\\\\\">Admizz Education vs. Competitors</h2>\\\\n    <div class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\"><p class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\">When it comes to test preparation for international studies, Admizz Education stands out with its personalized coaching and guaranteed score improvement, which may not be as readily available at other institutes. This focus on tailored support and performance tracking through unlimited mock tests offers a clear advantage for students aiming for high scores in tests like IELTS, GRE, TOEFL, and SAT.</p><div class=\\\\\\\"overflow-x-auto\\\\\\\"><table class=\\\\\\\"w-full border-collapse\\\\\\\"><thead><tr><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Feature</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Alternative</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">This Option</th></tr></thead><tbody><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Coaching Style</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Standardized group coaching with less individual focus</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Personalized coaching tailored to individual needs</td></tr><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Mock Tests</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Limited mock tests without detailed performance tracking</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Unlimited full-length mock tests with analytics</td></tr></tbody></table></div></div>\\\\n  </section>\\\\n</div>\\\" }} />\\n<div class=\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\">\\n  <section class=\\\"gap-2.5\\\">\\n    <h2 class=\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\">Last Updated</h2>\\n    <div class=\\\"text-sm md:text-base mb-3 opacity-90\\\"><p class=\\\"text-sm md:text-base mb-3 opacity-90\\\">This page was last updated on 2026-09-20.</p></div>\\n  </section>\\n</div>\" }} />\n<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">About the Author</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">By the Admizz Education Team</p></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}

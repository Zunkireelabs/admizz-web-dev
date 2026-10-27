"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CTAForm from "@/components/ui/CTAForm";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
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

const destinations = [
  { name: "Australia", href: "/study-in-australia", image: "/images/destinations/aus1.webp" },
  { name: "Canada", href: "/study-in-canada", image: "/images/destinations/canada1.webp" },
  { name: "Denmark", href: "/study-in-denmark", image: "/images/destinations/denmark1.webp" },
  { name: "Finland", href: "/study-in-finland", image: "/images/destinations/finland1.webp" },
  { name: "France", href: "/study-in-france", image: "/images/destinations/france1.webp" },
  { name: "Germany", href: "/study-in-germany", image: "/images/destinations/germany1.webp" },
  { name: "India", href: "/study-in-india", image: "/images/destinations/india1.webp" },
  { name: "Nepal", href: "/study-in-nepal", image: "/images/hero/nepal-hero.webp" },
  { name: "New Zealand", href: "/study-in-newzealand", image: "/images/destinations/newzealand1.webp" },
  { name: "South Korea", href: "/study-in-south-korea", image: "/images/hero/south-korea-hero.webp" },
  { name: "the UAE", href: "/study-in-dubai", image: "/images/destinations/uae1.webp" },
  { name: "the UK", href: "/study-in-the-uk", image: "/images/destinations/uk1.webp" },
  { name: "the USA", href: "/study-in-the-usa", image: "/images/destinations/usa1.webp" },
];

const ctaPerks = [
  {
    title: "24hr Response",
    subtitle: "Average reply time",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    title: "Free Consultation",
    subtitle: "No commitment",
    icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    title: "Expert Team",
    subtitle: "10+ years experience",
    icon: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
  },
];

const costIconPath =
  "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z";

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-blue-royal mb-3">
      {children}
    </p>
  );
}

function Photo({
  src,
  alt,
  className = "",
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#E8ECFB] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/** Heading + intro on one side, a photo collage on the other. Sides flip with `flip`. */
function SplitHeader({
  eyebrow,
  title,
  intro,
  photo,
  photo2,
  alt,
  flip = false,
  aspectClass = "aspect-[4/3]",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  photo: string;
  photo2?: string;
  alt: string;
  flip?: boolean;
  aspectClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
      <div className={`relative ${flip ? "md:order-2" : ""}`}>
        <Photo src={photo} alt={alt} className={aspectClass} />
        {photo2 && (
          <div
            className={`hidden sm:block absolute -bottom-6 w-[42%] ${flip ? "-left-6" : "-right-6"}`}
          >
            <Photo src={photo2} alt="" className="aspect-square border-4 border-white shadow-lg" />
          </div>
        )}
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className="text-2xl md:text-[32px] font-bold text-navy leading-tight mb-4"
          style={rubikFont}
        >
          {title}
        </h2>
        {intro && (
          <p className="text-[15px] text-gray-dark leading-relaxed">{intro}</p>
        )}
        {children}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#31429C"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4.243 4.243 8.484-8.486" />
    </svg>
  );
}

function UniCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      className="cpt-uni-card bg-white rounded-2xl px-6 py-5 flex flex-col items-center justify-center gap-3 flex-shrink-0 border border-[#eef1f6] w-[160px] sm:w-[200px]"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      <div className="w-full flex items-center justify-center" style={{ height: 52 }}>
        <Image src={logo} alt={name} width={140} height={48} style={{ maxHeight: 48, objectFit: "contain" }} />
      </div>
      <p className="text-[13px] font-medium text-center leading-snug tracking-wide" style={{ color: "#6b7280" }}>
        {name}
      </p>
    </div>
  );
}

function MarqueeRow({
  items,
  animation,
  duration,
  className = "",
}: {
  items: { name: string; logo: string }[];
  animation: string;
  duration: number;
  className?: string;
}) {
  return (
    <div className={`cpt-marquee-row relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 z-10" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
      <div className="flex w-max gap-5" style={{ animation: `${animation} ${duration}s linear infinite` }}>
        {items.map((uni, i) => (
          <UniCard key={i} name={uni.name} logo={uni.logo} />
        ))}
      </div>
    </div>
  );
}

export default function CountryPageTemplate({ data, blogPosts }: CountryPageTemplateProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("why");
  const [visaStep, setVisaStep] = useState(0);
  const [showFade, setShowFade] = useState(true);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const heroPhoto = data.heroBackground ?? "/images/about/2-1-763x1024.webp";
  const shortCountry = data.countryName.replace(/^the /, "");

  // Highlight the country name inside the hero heading (case-insensitive)
  const headingIdx = data.heroHeading.toLowerCase().indexOf(data.countryName.toLowerCase());
  const headingBefore = headingIdx === -1 ? data.heroHeading : data.heroHeading.slice(0, headingIdx);
  const headingHighlight =
    headingIdx === -1 ? "" : data.heroHeading.slice(headingIdx, headingIdx + data.countryName.length);
  const headingAfter =
    headingIdx === -1 ? "" : data.heroHeading.slice(headingIdx + data.countryName.length);

  const otherDestinations = destinations.filter(
    (d) => !pathname || !pathname.replace(/\/$/, "").endsWith(d.href)
  );

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

  // University marquee: fill each row to cover the viewport, then double for a seamless loop
  const MIN_CARDS = 8;
  const fillRow = (row: typeof data.universities) => {
    if (row.length === 0) return [];
    const repeats = Math.ceil(MIN_CARDS / row.length);
    const set: typeof row = [];
    for (let r = 0; r < repeats; r++) set.push(...row);
    return [...set, ...set];
  };
  const useSingleRow = data.universities.length <= 8;
  const row1 = useSingleRow
    ? data.universities
    : data.universities.slice(0, Math.ceil(data.universities.length / 2));
  const row2 = useSingleRow ? [] : data.universities.slice(Math.ceil(data.universities.length / 2));
  const filled1 = fillRow(row1);
  const filled2 = fillRow(row2);
  const row1Duration = Math.max((filled1.length / 2) * 10, 30);
  const row2Duration = Math.max((filled2.length / 2) * 10, 35);

  return (
    <main>
      {data.heroBackground && (
        <link rel="preload" as="image" href={data.heroBackground} fetchPriority="high" />
      )}
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-10 md:py-14">
        {data.heroBackground ? (
          <>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${data.heroBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 z-0 bg-white/90 md:hidden" />
            <div
              className="absolute inset-0 z-0 hidden md:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.86) 40%, rgba(238,242,255,0.4) 100%)",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)" }}
          />
        )}
        <div className={`relative z-10 ${containerClass}`}>
          <div className="grid lg:grid-cols-[1fr_472px] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-sm md:text-lg font-semibold text-blue-royal mb-3">
                {data.heroSubheading}
              </p>
              <h1
                className="text-[34px] sm:text-5xl md:text-[60px] font-bold leading-[1.08] text-navy"
                style={rubikFont}
              >
                {headingBefore}
                {headingHighlight && <span className="text-blue-royal">{headingHighlight}</span>}
                {headingAfter}
              </h1>
              {data.heroDescription && (
                <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed text-slate max-w-xl">
                  {data.heroDescription}
                </p>
              )}
              <a
                href="#admission"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("admission");
                }}
                className="inline-flex items-center mt-8 bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-8 py-3 rounded-full transition-colors cursor-pointer"
              >
                Learn More
              </a>
            </div>
            <div className="w-full lg:w-[472px] lg:ml-auto">
              <CTAForm defaultDestination={data.countryName} colorScheme="light" embedHeight={556} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK FACTS ===== */}
      <section className="bg-white py-6">
        <div className={containerClass}>
          <div className="rounded-3xl border border-border-light bg-white shadow-sm px-4 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-y-5 gap-x-4">
              {data.quickFacts.map((fact) => (
                <div key={fact.label} className="text-center">
                  <p className="text-sm font-bold text-navy">{fact.value}</p>
                  <p className="text-[13px] text-gray-dark mt-0.5">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <nav className="sticky top-[70px] z-40 bg-white/95 backdrop-blur py-3">
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="rounded-full border border-border-light bg-white shadow-sm">
            <div
              ref={tabScrollRef}
              className="overflow-x-auto scrollbar-hide rounded-full p-1.5"
            >
              <div className="flex gap-1 min-w-max md:justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    data-tab={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-4 py-2 text-[13px] sm:text-sm font-medium whitespace-nowrap rounded-full transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#E8ECFB] text-blue-royal font-semibold"
                        : "text-gray-dark hover:text-navy"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Fade hint — mobile only */}
          {showFade && (
            <div
              className="absolute right-4 top-0 bottom-0 w-10 rounded-r-full pointer-events-none md:hidden"
              style={{ background: "linear-gradient(to right, transparent, white)" }}
            />
          )}
        </div>
      </nav>

      {/* ===== STATS ===== */}
      <section className="bg-white pt-6 pb-4">
        <div className={containerClass}>
          <div className="rounded-3xl bg-[#F4F6FF] px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-navy" style={rubikFont}>1500+</p>
              <p className="text-[13px] text-gray-dark mt-1">Students successfully enrolled worldwide</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-navy" style={rubikFont}>95%</p>
              <p className="text-[13px] text-gray-dark mt-1">Student Visa Approval Rate with Expert Guidance</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-navy" style={rubikFont}>$2M+</p>
              <p className="text-[13px] text-gray-dark mt-1">In Scholarships Awarded to Our Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY STUDY HERE ===== */}
      <section id="why" className="py-16 md:py-20 scroll-mt-32">
        <div className={containerClass}>
          <SplitHeader
            eyebrow="Why Study Here"
            title={data.whyStudyTitle}
            intro={data.whyStudyIntro}
            photo={heroPhoto}
            alt={`Studying in ${shortCountry}`}
          />
          <div className="mt-14 rounded-3xl bg-[#F4F6FF] p-5 md:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {benefit.icon && (
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={128}
                      height={128}
                      className="w-14 h-14 object-contain mb-4"
                    />
                  )}
                  <h3 className="font-bold text-navy text-[16px]" style={rubikFont}>
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-dark leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADMISSION REQUIREMENTS ===== */}
      <section id="admission" className="pb-16 md:pb-20 scroll-mt-32">
        <div className={containerClass}>
          <SplitHeader
            eyebrow="Admission"
            title={data.admissionTitle}
            intro={data.admissionIntro}
            photo="/images/about/2-3-763x1024.webp"
            alt="Graduates celebrating"
            flip
          />

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {data.documentSections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-2xl p-6 border border-border-light"
              >
                <h3 className="text-[16px] font-bold text-navy mb-2" style={rubikFont}>
                  {section.title}
                </h3>
                <p className="text-[13px] text-gray-dark mb-4 leading-relaxed">{section.intro}</p>
                <ul className="space-y-2.5">
                  {section.documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-dark">
                      <CheckIcon />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {data.intakes && (
            <div className="mt-12 rounded-3xl bg-[#F4F6FF] p-5 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-navy mb-2" style={rubikFont}>
                {data.intakes.title}
              </h3>
              <p className="text-sm text-gray-dark mb-6 leading-relaxed max-w-3xl">{data.intakes.intro}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.intakes.items.map((intake) => (
                  <div key={intake.name} className="bg-white rounded-2xl p-5 shadow-sm">
                    <Image
                      src="/images/icons/school-1.webp"
                      alt={intake.name}
                      width={128}
                      height={128}
                      className="w-12 h-12 object-contain mb-3"
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
      <section id="universities" className="pb-16 md:pb-20 overflow-hidden scroll-mt-32">
        <div className={containerClass}>
          <div className="rounded-3xl bg-white border border-border-light py-10 overflow-hidden">
            <div className="px-4 mb-8 text-center">
              <Eyebrow>Top Universities</Eyebrow>
              <h2 className="text-2xl md:text-[32px] font-bold text-navy" style={rubikFont}>
                Popular {shortCountry} Universities
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

            <MarqueeRow
              items={filled1}
              animation="cpt-marquee-left"
              duration={row1Duration}
              className={row2.length > 0 ? "mb-5" : ""}
            />
            {row2.length > 0 && (
              <MarqueeRow items={filled2} animation="cpt-marquee-right" duration={row2Duration} />
            )}
          </div>
        </div>
      </section>

      {/* ===== COST ===== */}
      <section id="cost" className="pb-16 md:pb-20 scroll-mt-32">
        <div className={containerClass}>
          <SplitHeader
            eyebrow="Cost & Financial"
            title={data.costTitle}
            intro={data.costIntro}
            photo="/images/course-covers/finance.webp"
            alt={`Cost of studying in ${shortCountry}`}
            aspectClass="aspect-[16/9]"
          />

          <div className="mt-14 flex flex-wrap justify-center gap-5">
            {data.costTable.map((row) => (
              <div
                key={row.program}
                className="group w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] bg-white rounded-2xl p-6 border border-border-light hover:border-blue-royal hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E8ECFB] text-blue-royal flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={costIconPath} />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-gray-dark">{row.program}</p>
                </div>
                <p className="text-xl md:text-2xl font-bold text-navy" style={rubikFont}>
                  {row.fee}
                </p>
              </div>
            ))}
          </div>

          {data.costNote && (
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-blue-royal text-white px-5 py-4 md:px-7 md:py-5">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-golden" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              </span>
              <p className="text-[14px] md:text-[15px] leading-relaxed">{data.costNote}</p>
            </div>
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

          {/* Interactive step guide */}
          <style>{`
            @keyframes cpt-step-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .cpt-step-in { animation: cpt-step-in 0.35s ease both; }
          `}</style>

          {/* Mobile: swipeable step chips */}
          <div className="md:hidden -mx-4 px-4 mb-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-1">
              {data.visaSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setVisaStep(index)}
                  aria-label={`Step ${index + 1}: ${step.title}`}
                  aria-current={index === visaStep ? "step" : undefined}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                    index === visaStep
                      ? "bg-blue-royal text-white"
                      : index < visaStep
                        ? "bg-[#E8ECFB] text-blue-royal"
                        : "bg-white text-gray-dark border border-border-light"
                  }`}
                  style={rubikFont}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-6 md:gap-8 items-start">
            {/* Desktop: step list */}
            <ol className="hidden md:flex flex-col gap-1.5">
              {data.visaSteps.map((step, index) => {
                const isActive = index === visaStep;
                const isDone = index < visaStep;
                return (
                  <li key={index}>
                    <button
                      onClick={() => setVisaStep(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                        isActive
                          ? "bg-white shadow-md border-l-4 border-golden"
                          : "border-l-4 border-transparent hover:bg-white/70"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full text-[13px] font-bold flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-blue-royal text-white"
                            : isDone
                              ? "bg-[#E8ECFB] text-blue-royal"
                              : "bg-white text-gray-dark border border-border-light"
                        }`}
                        style={rubikFont}
                      >
                        {isDone ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span
                        className={`text-[14px] leading-snug ${
                          isActive ? "font-semibold text-navy" : "font-medium text-gray-dark"
                        }`}
                        style={rubikFont}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Detail panel */}
            <div
              className="relative overflow-hidden rounded-3xl text-white p-6 md:p-10 md:sticky md:top-[160px]"
              style={{ background: "linear-gradient(135deg, #001353 0%, #0D1282 60%, #31429C 100%)" }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, rgba(252,183,48,0.6), transparent 70%)" }}
              />
              <div key={visaStep} className="cpt-step-in relative z-10 min-h-[220px] md:min-h-[260px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[13px] font-semibold tracking-[0.14em] uppercase text-golden">
                    Step {visaStep + 1} of {data.visaSteps.length}
                  </span>
                  <span
                    className="text-5xl md:text-7xl font-bold leading-none text-white/15"
                    style={rubikFont}
                    aria-hidden="true"
                  >
                    {String(visaStep + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl md:text-[32px] font-bold leading-tight mb-3" style={rubikFont}>
                  {data.visaSteps[visaStep].title}
                </h3>
                <p className="text-[15px] md:text-base leading-relaxed text-white/80 max-w-xl">
                  {data.visaSteps[visaStep].description}
                </p>
              </div>

              <div className="relative z-10 mt-8">
                <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-golden transition-all duration-500"
                    style={{ width: `${((visaStep + 1) / data.visaSteps.length) * 100}%` }}
                  />
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setVisaStep((v) => Math.max(0, v - 1))}
                    disabled={visaStep === 0}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button
                    onClick={() => setVisaStep((v) => Math.min(data.visaSteps.length - 1, v + 1))}
                    disabled={visaStep === data.visaSteps.length - 1}
                    className="inline-flex items-center gap-2 rounded-full bg-golden hover:bg-golden-hover text-black px-6 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-golden"
                  >
                    Next Step
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-32">
        <FAQ
          items={data.faqItems}
          sidebar
          sidebarTitle="Everything You Need to Know"
          sidebarTopClass="md:top-[160px]"
        />
      </div>

      {/* ===== STUDY ABROAD INSIGHTS (Blog) ===== */}
      {blogPosts && blogPosts.length > 0 && (
        <StudyAbroadInsights
          posts={blogPosts}
          countryName={data.countryName}
          categorySlug={data.countryCategorySlug}
        />
      )}

      {/* ===== CTA BANNER ===== */}
      <section className="py-14 md:py-20">
        <div className={containerClass}>
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-10 md:px-14 md:py-14 text-white"
            style={{ background: "linear-gradient(120deg, #001353 0%, #0D1282 55%, #31429C 100%)" }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 w-[380px] h-[380px] rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, rgba(252,183,48,0.6), transparent 70%)" }}
            />
            <div className="relative z-10 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-center">
              <div>
                <h2
                  className="text-[28px] md:text-[40px] font-bold leading-tight mb-4"
                  style={rubikFont}
                >
                  Ready to Build Your
                  <br className="hidden md:block" />{" "}
                  <span className="text-golden">Global Career?</span>
                </h2>
                <p className="text-[15px] md:text-base leading-relaxed text-white/80 max-w-xl mb-8">
                  Let our expert counselors guide you through university selection, applications, visas, and everything in between.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-8 py-3.5 rounded-full transition-colors"
                  >
                    Schedule a Free Consultation
                  </Link>
                  <a
                    href="mailto:hello@admizz.com"
                    className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold text-[15px] px-6 py-3.5 rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    hello@admizz.com
                  </a>
                </div>
              </div>

              <ul className="grid gap-3">
                {ctaPerks.map((perk) => (
                  <li
                    key={perk.title}
                    className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm"
                  >
                    <span className="flex-shrink-0 w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
                      <svg className="w-5 h-5 text-golden" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={perk.icon} />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold">{perk.title}</span>
                      <span className="block text-[13px] text-white/70">{perk.subtitle}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MORE STUDY DESTINATIONS ===== */}
      <section className="pb-16 md:pb-20">
        <div className={containerClass}>
          <div className="text-center mb-8">
            <Eyebrow>Study Destinations</Eyebrow>
            <h2 className="text-2xl md:text-[32px] font-bold text-navy" style={rubikFont}>
              More Study Destinations to Explore
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {otherDestinations.map((dest) => (
              <Link
                key={dest.href}
                href={dest.href}
                className="group flex items-center gap-3 rounded-full border border-border-light bg-white px-4 py-3 hover:border-blue-royal hover:shadow-md transition-all"
              >
                <span className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-[#E8ECFB]">
                  <Image src={dest.image} alt="" fill sizes="36px" className="object-cover" />
                </span>
                <span className="text-sm font-semibold text-navy group-hover:text-blue-royal transition-colors">
                  Study in {dest.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

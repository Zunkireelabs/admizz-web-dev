"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ConsultationPopup from "@/components/ui/consultation/ConsultationPopup";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import type { SanityPost } from "@/types";
import { ADMIZZ_STATS, ADMIZZ_STATS_BASIS } from "@/lib/admizz-stats";

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
  /** Flag colors (left to right) used as a gradient on the country name in the hero heading */
  flagColors?: string[];
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

// Every country page lists its document sections in this order: admission, documents, visa
const docTabLabels = ["Admission", "Documents", "Visa"];
const docTabIcons = [
  "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5",
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
  "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z",
];

// Hero card perks: wording only, no figures (all numbers must come from docs/FACTS.md)
const heroPerks = [
  { title: "Personal university shortlist", subtitle: "Matched to your grades and budget", icon: docTabIcons[0] },
  { title: "Scholarship and visa guidance", subtitle: "Support from application to arrival", icon: docTabIcons[2] },
  { title: "Free, no-commitment advice", subtitle: "Talk through your options with a counselor", icon: ctaPerks[1].icon },
];

/** Splits "Valid Passport (min. 6 months)" into the item name and a lighter qualifier */
function splitDocNote(doc: string): { main: string; note: string } {
  const match = doc.match(/^([\s\S]*?)\s+((?:\(|–)[\s\S]*)$/);
  return match ? { main: match[1], note: match[2] } : { main: doc, note: "" };
}

const costIconPath =
  "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z";

const rubikFont = { fontFamily: "var(--font-rubik), sans-serif" };

const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold tracking-[0.14em] uppercase text-blue-royal mb-3">
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
          <p className="text-base md:text-[17px] text-body leading-relaxed">{intro}</p>
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
      <p className="text-sm font-medium text-center leading-snug tracking-wide" style={{ color: "#6b7280" }}>
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
  const [docTab, setDocTab] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = () => setPopupOpen(true);
  const closePopup = useCallback(() => setPopupOpen(false), []);
  const [visaAutoScroll, setVisaAutoScroll] = useState(true);
  const visaTrackRef = useRef<HTMLDivElement>(null);
  const visaStickyRef = useRef<HTMLDivElement>(null);
  const visaListRef = useRef<HTMLOListElement>(null);
  const [showFade, setShowFade] = useState(true);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const docIndex = Math.min(docTab, Math.max(data.documentSections.length - 1, 0));
  const activeDoc = { index: docIndex, section: data.documentSections[docIndex] };

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

  // Visa steps follow the page scroll: the guide is pinned while a tall track scrolls past it.
  // Visitors who prefer reduced motion get the plain click-through guide instead.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setVisaAutoScroll(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const total = data.visaSteps.length;
    if (!visaAutoScroll || total < 2) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = visaTrackRef.current;
      const sticky = visaStickyRef.current;
      if (!track || !sticky) return;
      const range = track.offsetHeight - sticky.offsetHeight;
      if (range <= 0) return;
      const pinTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const scrolled = pinTop - track.getBoundingClientRect().top;
      const idx = Math.min(total - 1, Math.max(0, Math.floor((scrolled / range) * total)));
      setVisaStep(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [visaAutoScroll, data.visaSteps.length]);

  // Keep the active step visible when the step list is taller than the viewport
  useEffect(() => {
    const list = visaListRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-step="${visaStep}"]`);
    if (!list || !item) return;
    list.scrollTo({
      top: item.offsetTop - list.clientHeight / 2 + item.offsetHeight / 2,
      behavior: "smooth",
    });
  }, [visaStep]);

  const goToVisaStep = (index: number) => {
    const total = data.visaSteps.length;
    const next = Math.min(total - 1, Math.max(0, index));
    setVisaStep(next);
    const track = visaTrackRef.current;
    const sticky = visaStickyRef.current;
    if (!visaAutoScroll || !track || !sticky) return;
    const range = track.offsetHeight - sticky.offsetHeight;
    const pinTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const target =
      window.scrollY + track.getBoundingClientRect().top - pinTop + ((next + 0.5) / total) * range;
    window.scrollTo({ top: target, behavior: "instant" });
  };

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
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-10 md:py-14">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)" }}
        />
        <div className={`relative z-10 ${containerClass}`}>
          <div className="grid lg:grid-cols-[1fr_472px] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-base md:text-lg font-semibold text-blue-royal mb-3">
                {data.heroSubheading}
              </p>
              <h1
                className="text-[34px] sm:text-5xl md:text-[60px] font-bold leading-[1.08] text-navy"
                style={rubikFont}
              >
                {headingBefore}
                {headingHighlight &&
                  (data.flagColors && data.flagColors.length > 0 ? (
                    <span
                      className="text-blue-royal box-decoration-clone"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${data.flagColors.join(", ")})`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {headingHighlight}
                    </span>
                  ) : (
                    <span className="text-blue-royal">{headingHighlight}</span>
                  ))}
                {headingAfter}
              </h1>
              {data.heroDescription && (
                <p className="mt-6 text-base md:text-lg leading-relaxed text-slate max-w-xl">
                  {data.heroDescription}
                </p>
              )}
              <div className="mt-8">
                <a
                  href="#admission"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("admission");
                  }}
                  className="inline-flex items-center border border-blue-royal/30 hover:bg-white text-blue-royal font-semibold text-[15px] px-8 py-3 rounded-full transition-colors cursor-pointer"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="w-full lg:w-[472px] lg:ml-auto">
              <div className="rounded-3xl border border-border-light bg-white p-6 md:p-8 shadow-lg">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-blue-royal mb-2">
                  Free Counselling
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-navy leading-tight" style={rubikFont}>
                  Planning to study in {data.countryName}?
                </h2>
                <p className="mt-2 text-base text-body leading-relaxed">
                  Get a personal plan for universities, scholarships and your visa from our counselors.
                </p>
                <ul className="mt-6 grid gap-3">
                  {heroPerks.map((perk) => (
                    <li key={perk.title} className="flex items-center gap-4 rounded-2xl bg-[#F4F6FF] px-4 py-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-blue-royal flex items-center justify-center shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={perk.icon} />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-navy">{perk.title}</span>
                        <span className="block text-sm text-gray-dark">{perk.subtitle}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={openPopup}
                  className="mt-6 w-full inline-flex items-center justify-center bg-golden hover:bg-golden-hover text-black font-semibold text-base px-8 py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  Start Your Journey
                </button>
                <p className="mt-3 text-center text-[13px] text-gray-dark">
                  Takes under a minute · No spam
                </p>
              </div>
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
                  <p className="text-[15px] font-bold text-navy">{fact.value}</p>
                  <p className="text-sm text-gray-dark mt-0.5">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <nav className="sticky top-[70px] z-40 py-3">
        <div className="max-w-4xl mx-auto relative px-4">
          <div className="w-fit max-w-full mx-auto rounded-full border border-white/70 bg-gradient-to-b from-white/75 to-white/45 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_32px_rgba(0,19,83,0.12)]">
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
          {/* Fade hint — mobile only */}
          {showFade && (
            <div
              className="absolute right-4 top-0 bottom-0 w-10 rounded-r-full pointer-events-none md:hidden"
              style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.7))" }}
            />
          )}
        </div>
      </nav>

      {/* ===== STATS ===== */}
      <section className="bg-white pt-6 pb-4">
        <div className={containerClass}>
          <div className="rounded-3xl bg-[#F4F6FF] px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-navy" style={rubikFont}>{ADMIZZ_STATS.studentsPlaced}</p>
              <p className="text-[15px] text-body mt-1">Students successfully enrolled worldwide</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-navy" style={rubikFont}>Free</p>
              <p className="text-[15px] text-body mt-1">First consultation with an expert counsellor</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-navy" style={rubikFont}>ICEF</p>
              <p className="text-[15px] text-body mt-1">Accredited study abroad agency</p>
            </div>
          </div>
          {ADMIZZ_STATS_BASIS && (
            <p className="text-[12px] text-body/70 text-center mt-2">{ADMIZZ_STATS_BASIS}</p>
          )}
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
                  <p className="mt-2 text-[15px] text-body leading-relaxed">{benefit.description}</p>
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

          {data.documentSections.length > 0 && (
            <div className="mt-14 rounded-3xl bg-[#F4F6FF] p-4 md:p-8">
              <div role="tablist" className="flex flex-wrap gap-2 mb-6 md:mb-8">
                {data.documentSections.map((section, i) => (
                  <button
                    key={section.title}
                    role="tab"
                    aria-selected={i === activeDoc.index}
                    onClick={() => setDocTab(i)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                      i === activeDoc.index
                        ? "bg-blue-royal text-white shadow-md"
                        : "bg-white text-navy border border-border-light hover:border-blue-royal"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={docTabIcons[i] ?? docTabIcons[1]} />
                    </svg>
                    {docTabLabels[i] ?? section.title}
                  </button>
                ))}
              </div>

              <div
                key={activeDoc.index}
                className="cpt-step-in grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 lg:gap-10 items-center"
              >
                <div>
                  <h3
                    className="text-xl md:text-[26px] font-bold text-navy leading-tight mb-3"
                    style={rubikFont}
                  >
                    {activeDoc.section.title}
                  </h3>
                  <p className="text-base text-body leading-relaxed">{activeDoc.section.intro}</p>
                  <Link
                    href="/register"
                    className="inline-flex items-center mt-6 bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-7 py-3 rounded-full transition-colors"
                  >
                    Get Help With Your Documents
                  </Link>
                </div>

                <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm">
                  <p className="text-[13px] font-semibold tracking-[0.14em] uppercase text-blue-royal mb-5">
                    {activeDoc.section.documents.length} items to prepare
                  </p>
                  <ul className="-mb-4 sm:columns-2 sm:gap-x-8">
                    {activeDoc.section.documents.map((doc, i) => {
                      const { main, note } = splitDocNote(doc);
                      return (
                        <li key={i} className="flex items-start gap-3 break-inside-avoid mb-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E8ECFB] flex items-center justify-center mt-0.5">
                            <CheckIcon />
                          </span>
                          <span className="text-[15px] leading-snug text-navy font-medium">
                            {main}
                            {note && (
                              <span className="block mt-0.5 text-sm font-normal text-gray-dark">{note}</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {data.intakes && (
            <div className="mt-12 rounded-3xl bg-[#F4F6FF] p-5 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-navy mb-2" style={rubikFont}>
                {data.intakes.title}
              </h3>
              <p className="text-base text-body mb-6 leading-relaxed max-w-3xl">{data.intakes.intro}</p>
              <div
                className={`grid sm:grid-cols-2 gap-5 ${
                  data.intakes.items.length === 2
                    ? ""
                    : data.intakes.items.length === 4
                      ? "lg:grid-cols-4"
                      : "lg:grid-cols-3"
                }`}
              >
                {data.intakes.items.map((intake) => (
                  <div key={intake.name} className="bg-white rounded-2xl p-5 shadow-sm">
                    <Image
                      src="/images/icons/school-1.webp"
                      alt={intake.name}
                      width={128}
                      height={128}
                      className="w-12 h-12 object-contain mb-3"
                    />
                    <h4 className="font-bold text-navy text-base" style={rubikFont}>
                      {intake.name}
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {intake.details.map((detail, i) => (
                        <li key={i} className="text-[15px] text-body">
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
                  <p className="text-[15px] font-semibold text-body">{row.program}</p>
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
              <p className="text-[15px] md:text-base leading-relaxed">{data.costNote}</p>
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
          <p className="text-base md:text-[17px] text-body mb-12 leading-relaxed max-w-3xl">
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

          <div
            ref={visaTrackRef}
            style={
              visaAutoScroll && data.visaSteps.length > 1
                ? { height: `calc(100vh + ${data.visaSteps.length * 45}vh)` }
                : undefined
            }
          >
            <div
              ref={visaStickyRef}
              className={visaAutoScroll ? "sticky top-[150px] md:top-[160px]" : ""}
            >
              {/* Mobile: swipeable step chips */}
              <div className="md:hidden -mx-4 px-4 mb-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 min-w-max pb-1">
                  {data.visaSteps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => goToVisaStep(index)}
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
                <ol
                    ref={visaListRef}
                    className="relative hidden md:flex flex-col gap-1.5 md:max-h-[calc(100vh-190px)] md:overflow-y-auto scrollbar-hide"
                  >
                  {data.visaSteps.map((step, index) => {
                    const isActive = index === visaStep;
                    const isDone = index < visaStep;
                    return (
                      <li key={index} data-step={index}>
                        <button
                          onClick={() => goToVisaStep(index)}
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
                            className={`text-[15px] leading-snug ${
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
                  className="relative overflow-hidden rounded-3xl text-white p-6 md:p-10"
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
                    <p className="text-base md:text-lg leading-relaxed text-white/80 max-w-xl">
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
                        onClick={() => goToVisaStep(visaStep - 1)}
                        disabled={visaStep === 0}
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button
                        onClick={() => goToVisaStep(visaStep + 1)}
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
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-32">
        <FAQ
          items={data.faqItems}
          sidebar
          comfortableText
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
                <p className="text-base md:text-lg leading-relaxed text-white/80 max-w-xl mb-8">
                  Let our expert counselors guide you through university selection, applications, visas, and everything in between.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={openPopup}
                    className="inline-flex items-center justify-center bg-golden hover:bg-golden-hover text-black font-semibold text-[15px] px-8 py-3.5 rounded-full transition-colors cursor-pointer"
                  >
                    Talk to an Expert
                  </button>
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
                      <span className="block text-base font-semibold">{perk.title}</span>
                      <span className="block text-sm text-white/70">{perk.subtitle}</span>
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
                <span className="text-[15px] font-semibold text-navy group-hover:text-blue-royal transition-colors">
                  Study in {dest.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationPopup
        open={popupOpen}
        onClose={closePopup}
        countryName={data.countryName}
        formSource={`country-${shortCountry.toLowerCase().replace(/\s+/g, "-")}`}
      />
    </main>
  );
}

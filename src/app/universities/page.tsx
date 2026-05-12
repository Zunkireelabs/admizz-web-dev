import Image from "next/image";
import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import TrustedPartners from "@/components/ui/TrustedPartners";
import { allUniversities } from "@/lib/universities";

export const metadata: Metadata = {
  title: "University & College Partnerships - Admizz Education",
  description:
    "Partner with Admizz Education to grow international enrollments. Trusted by 100+ universities across 11 countries. Ethical, data-driven recruitment with 24-48 hour application turnaround.",
  alternates: {
    canonical: "https://admizzeducation.com/universities",
  },
  openGraph: {
    title: "University & College Partnerships - Admizz Education",
    description:
      "Partner with Admizz Education to grow international enrollments. Trusted by 100+ universities across 11 countries.",
    url: "https://admizzeducation.com/universities",
    siteName: "Admizz Education",
    images: ["/images/og/soHeroImg-scaled.webp"],
    type: "website",
  },
};

const PARTNER_FORM_URL = "https://forms.gle/dtVz3E4TucVFfWTq8";

const heroStats = [
  { value: "25,000+", label: "Students Placed" },
  { value: "100+", label: "Partner Universities" },
  { value: "11", label: "Partner Countries" },
  { value: "7+", label: "Years Operating" },
];

const whyPartnerFeatures = [
  {
    icon: "/images/universities-page/icon-endtoend.webp",
    title: "Global Recruitment Network",
    description:
      "Connect with academically qualified international students from diverse regions through our trusted recruitment ecosystem.",
  },
  {
    icon: "/images/universities-page/icon-consultation.webp",
    title: "Quality-Screened Admissions",
    description:
      "Every student is counseled and screened to meet university eligibility criteria and academic expectations.",
  },
  {
    icon: "/images/universities-page/icon-transparency.webp",
    title: "Market-Driven Strategy",
    description:
      "We analyze regional demand to promote the right programs in the right markets for better enrollment outcomes.",
  },
  {
    icon: "/images/universities-page/icon-visa.webp",
    title: "End-to-End Application Support",
    description:
      "From counseling to enrollment confirmation, we simplify and manage the complete admissions process.",
  },
  {
    icon: "/images/universities-page/icon-knowledge.webp",
    title: "Ethical & Transparent Recruitment",
    description:
      "We follow globally accepted ethical recruitment practices, ensuring trust and long-term collaboration.",
  },
  {
    icon: "/images/universities-page/icon-school.webp",
    title: "Global Brand Visibility",
    description:
      "Increase your institution’s visibility through digital campaigns, webinars, and international outreach programs.",
  },
];

// Source markets (origin) — left column of the network diagram
const sourceMarkets = [
  {
    country: "India",
    flag: "\u{1F1EE}\u{1F1F3}",
    percent: 42,
    students: "10,500",
    yoy: "24",
  },
  {
    country: "Nepal",
    flag: "\u{1F1F3}\u{1F1F5}",
    percent: 28,
    students: "7,000",
    yoy: "31",
  },
  {
    country: "Bangladesh",
    flag: "\u{1F1E7}\u{1F1E9}",
    percent: 14,
    students: "3,500",
    yoy: "18",
  },
  {
    country: "Vietnam",
    flag: "\u{1F1FB}\u{1F1F3}",
    percent: 8,
    students: "2,000",
    yoy: "42",
  },
  {
    country: "Sri Lanka",
    flag: "\u{1F1F1}\u{1F1F0}",
    percent: 5,
    students: "1,250",
    yoy: "12",
  },
  {
    country: "Pakistan",
    flag: "\u{1F1F5}\u{1F1F0}",
    percent: 3,
    students: "750",
    yoy: "9",
  },
];

// Partner regions — right column of the network diagram
const partnerRegions = [
  { name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "United States", flag: "\u{1F1FA}\u{1F1F8}" },
  { name: "Canada", flag: "\u{1F1E8}\u{1F1E6}" },
  { name: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
  { name: "Germany", flag: "\u{1F1E9}\u{1F1EA}" },
  { name: "France", flag: "\u{1F1EB}\u{1F1F7}" },
];

const partnershipSteps = [
  {
    num: "1",
    title: "Discovery Call",
    description:
      "Understand your intake goals, program mix, and target markets.",
  },
  {
    num: "2",
    title: "Agreement & Compliance",
    description: "Sign MoU, complete due diligence, onboard onto our portal.",
  },
  {
    num: "3",
    title: "Onboarding & Training",
    description: "Brief our counsellors, finalize materials, build market plan.",
  },
  {
    num: "4",
    title: "Live Recruitment",
    description: "Applications start flowing in 24-48 hours, offers in 7-14 days.",
  },
];

const benefitsList = [
  "Increased international student enrollments",
  "Reduced admissions workload",
  "Access to emerging student markets",
  "Improved student quality and retention",
  "Long-term global brand growth",
];

const programs = [
  {
    icon: "\u{1F393}",
    title: "Undergraduate",
    description: "BA, BSc, BBA, BTech and more",
  },
  {
    icon: "\u{1F4DA}",
    title: "Postgraduate",
    description: "MA, MSc, MBA, MTech programs",
  },
  {
    icon: "\u{1F52C}",
    title: "PhD & Research",
    description: "Doctoral and research programs",
  },
  {
    icon: "\u{1F331}",
    title: "Foundation",
    description: "Pre-degree preparatory pathways",
  },
  {
    icon: "\u{1F6E4}\u{FE0F}",
    title: "Pathway",
    description: "Articulation to UG and PG",
  },
  {
    icon: "\u{1F4DC}",
    title: "Diploma",
    description: "Specialized diploma certifications",
  },
];

// NOTE: All testimonials below are SAMPLES written from a university partner POV.
// Replace with real partner quotes when available.
const testimonials = [
  {
    quote:
      "Admizz Education has consistently delivered well-prepared, qualified students who fit our programs. Their counsellors understand our admissions criteria and the partnership has been seamless.",
    source: "International Admissions Lead, UK Partner University",
    isSample: true,
  },
  {
    quote:
      "Their market insights helped us shape our outreach in South Asia. Application turnaround is fast, document quality is high, and conversion to enrollment has been strong.",
    source: "Director of Recruitment, North American Partner",
    isSample: true,
  },
  {
    quote:
      "Working with Admizz has been refreshingly transparent. Compliance is taken seriously, communication is clear, and they treat student outcomes as the priority — which is exactly what we want from a recruitment partner.",
    source: "Partnerships Office, European Partner Institution",
    isSample: true,
  },
  {
    quote:
      "Reliable pipeline, ethical practices, and a team that responds quickly. Admizz has become one of our top-performing recruitment partners across the region.",
    source: "Global Engagement Office, Oceania Partner",
    isSample: true,
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What is Admizz Education?",
    answer:
      "Admizz Education is a global study abroad platform connecting universities and colleges with international students through ethical recruitment and expert counseling.",
  },
  {
    question: "How does Admizz Education support universities?",
    answer:
      "Admizz supports institutions with student recruitment, application management, market insights, and global brand visibility.",
  },
  {
    question: "Does Admizz Education screen students before applying?",
    answer:
      "Yes, all students are counseled and screened to ensure they meet academic and eligibility requirements.",
  },
  {
    question: "Can private colleges partner with Admizz Education?",
    answer:
      "Yes, Admizz Education partners with both public universities and private colleges worldwide.",
  },
  {
    question: "Is Admizz Education an ethical recruitment platform?",
    answer:
      "Absolutely. Ethical, transparent, and student-first recruitment is central to our partnership model.",
  },
  {
    question: "How does Admizz Education improve international enrollments?",
    answer:
      "By targeting the right student markets, promoting suitable programs, and guiding applicants end-to-end, Admizz helps institutions achieve consistent and quality enrollments.",
  },
  {
    question:
      "Does Admizz Education support both undergraduate and postgraduate recruitment?",
    answer:
      "Yes. Admizz Education recruits students for undergraduate, postgraduate, diploma, foundation, and pathway programs across multiple disciplines.",
  },
  {
    question: "How does Admizz Education support the admissions process?",
    answer:
      "Admizz assists with counseling, document verification, application submission, offer follow-ups, and enrollment coordination, reducing the workload for institutions.",
  },
  {
    question:
      "Can emerging or new universities partner with Admizz Education?",
    answer:
      "Absolutely. Admizz Education works with both established and emerging institutions to build global visibility and sustainable international student pipelines.",
  },
  {
    question:
      "How can a university or college start a partnership with Admizz Education?",
    answer:
      "Institutions can initiate a partnership by submitting a collaboration inquiry to Admizz Education to explore recruitment goals and partnership opportunities.",
  },
];

// Donut chart data — auto-grouped from allUniversities
const REGION_MAP: Record<string, string> = {
  UK: "Europe",
  France: "Europe",
  Germany: "Europe",
  Denmark: "Europe",
  Finland: "Europe",
  USA: "North America",
  Canada: "North America",
  Australia: "Oceania",
  "New Zealand": "Oceania",
  UAE: "Middle East",
  India: "Asia",
};

const REGION_COLORS: Record<string, string> = {
  Europe: "#FDED22",
  "North America": "#31429C",
  Oceania: "#FCB730",
  "Middle East": "#7B8FE3",
  Asia: "#FFFFFF",
};

function buildDonutData() {
  const counts: Record<string, number> = {};
  for (const u of allUniversities) {
    const region = REGION_MAP[u.country] || "Other";
    counts[region] = (counts[region] || 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const order = ["Europe", "North America", "Oceania", "Middle East", "Asia"];
  let cursor = 0;
  const slices = order
    .filter((r) => counts[r])
    .map((region) => {
      const fraction = counts[region] / total;
      const startAngle = cursor;
      const endAngle = cursor + fraction * 360;
      cursor = endAngle;
      return {
        region,
        count: counts[region],
        percent: Math.round(fraction * 100),
        color: REGION_COLORS[region],
        startAngle,
        endAngle,
      };
    });
  return { total, slices };
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export default function UniversitiesPage() {
  const donut = buildDonutData();

  return (
    <main style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}>
      {/* ===== HERO ===== */}
      <section className="py-20" style={{ background: "#E8EEFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[2px] mb-4" style={{ color: "#5a6275" }}>
            For Universities &amp; Colleges
          </p>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[42px] font-bold leading-[1.15] tracking-tight max-w-4xl mx-auto" style={{ color: "#0D1282" }}>
            Grow Your International Enrollments
            <br className="hidden sm:block" />
            <span className="sm:inline"> Globally &amp; Ethically</span>
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] max-w-2xl mx-auto leading-relaxed" style={{ color: "#3d4663" }}>
            Admizz Education connects universities and colleges with high-quality
            international students through ethical, data-driven recruitment.
            Trusted by 100+ institutions across 11 countries.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={PARTNER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[15px] px-8 py-3 rounded-full text-white transition-all hover:scale-[1.02]"
              style={{ background: "#0D1282" }}
            >
              Partner With Admizz Education
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l4 4m0 0l-4 4m4-4H8" />
              </svg>
            </a>
          </div>
        </div>
        {/* Hero Image with floating chips */}
        <div className="max-w-5xl mx-auto mt-12 relative px-4">
          <Image
            src="/images/universities-page/hero.webp"
            alt="Admizz Education global university partnerships"
            width={1024}
            height={383}
            className="w-full h-auto"
            priority
          />
          {/* Floating chip 1 */}
          <div
            className="hidden md:flex absolute top-6 left-8 items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg"
            style={{ border: "1.5px solid #c8daf8" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
            <span className="text-[13px] font-semibold text-navy">100+ Partner Universities</span>
          </div>
          {/* Floating chip 2 */}
          <div
            className="hidden md:flex absolute bottom-8 right-8 items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg"
            style={{ border: "1.5px solid #c8daf8" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#FCB730" }} />
            <span className="text-[13px] font-semibold text-navy">11 Markets Served</span>
          </div>
        </div>
        {/* Hero stat strip */}
        <div className="max-w-5xl mx-auto mt-10 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl py-5 px-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ border: "1.5px solid #c8daf8" }}
              >
                <div className="text-2xl md:text-3xl font-extrabold" style={{ color: "#0D1282" }}>
                  {s.value}
                </div>
                <div className="text-[12px] md:text-[13px] mt-1 font-medium" style={{ color: "#5a6275" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED PARTNERS — REAL UNIVERSITY LOGO WALL ===== */}
      <TrustedPartners />

      {/* Section divider */}
      <div className="h-px max-w-7xl mx-auto bg-gradient-to-r from-transparent via-blue-royal/20 to-transparent" />

      {/* ===== ABOUT / GLOBAL PLATFORM ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src="/images/universities-page/feature5.webp"
              alt="Global study abroad platform"
              width={1024}
              height={887}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-6">
              A Global Study Abroad Platform
            </h2>
            <div className="space-y-4">
              <p className="text-[15px] text-gray-dark leading-relaxed">
                Admizz Education works closely with universities and colleges
                worldwide to support international student recruitment and
                long-term academic collaboration. Through expert counseling,
                market insights, and streamlined admissions support, we help
                institutions expand their global reach while maintaining academic
                quality and compliance.
              </p>
              <p className="text-[15px] text-gray-dark leading-relaxed">
                Our partnership model focuses on sustainability, transparency,
                and student success&mdash;ensuring institutions connect with
                motivated students who align with their programs and values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY PARTNER ===== */}
      <section className="py-16" style={{ background: "#fafbff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Strategic Value
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy text-center mb-10">
            Why Partner With Admizz Education
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPartnerFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-border-light rounded-[10px] p-8 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-blue-royal/40"
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-dark leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARKETS WE SERVE — WORLD MAP + STAT CARDS ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Source Markets
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy text-center mb-3">
            Markets We Serve &mdash; Where Your Students Come From
          </h2>
          <p className="text-[15px] text-gray-dark text-center max-w-2xl mx-auto mb-10">
            Our recruitment network spans the highest-volume international
            student source markets, with deep on-the-ground presence in South
            and Southeast Asia.
          </p>

          {/* Network / flow diagram visualization */}
          <div
            className="relative rounded-3xl p-4 md:p-10 mb-6 overflow-hidden shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #dfe6f8 100%)",
              border: "1.5px solid #d7dae8",
            }}
          >
            <style>{`
              @keyframes uniNetPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.5; }
              }
              @keyframes uniNetDash {
                to { stroke-dashoffset: -28; }
              }
              .uni-net-pulse {
                transform-origin: center;
                transform-box: fill-box;
                animation: uniNetPulse 2.4s ease-in-out infinite;
              }
              .uni-net-flow {
                stroke-dasharray: 6 8;
                animation: uniNetDash 2.2s linear infinite;
              }
              .uni-net-hub-glow {
                animation: uniNetPulse 3s ease-in-out infinite;
                transform-origin: center;
                transform-box: fill-box;
              }
            `}</style>

            <svg
              viewBox="0 0 1000 540"
              className="w-full h-auto"
              role="img"
              aria-label="Network diagram showing source markets connecting through Admizz to partner regions"
            >
              <defs>
                {/* Subtle background dot pattern */}
                <pattern
                  id="uni-net-dots"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#c8d4ee" opacity="0.45" />
                </pattern>
                {/* Source node gradient */}
                <radialGradient id="uni-net-source">
                  <stop offset="0%" stopColor="#0D1282" />
                  <stop offset="100%" stopColor="#31429C" />
                </radialGradient>
                {/* Partner node gradient */}
                <radialGradient id="uni-net-partner">
                  <stop offset="0%" stopColor="#FCB730" />
                  <stop offset="100%" stopColor="#FAA117" />
                </radialGradient>
                {/* Hub gradient */}
                <radialGradient id="uni-net-hub">
                  <stop offset="0%" stopColor="#FDED22" />
                  <stop offset="100%" stopColor="#FCB730" />
                </radialGradient>
                {/* Flow gradient (left side: source → hub) */}
                <linearGradient id="uni-net-flow-l" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0D1282" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#31429C" stopOpacity="0.85" />
                </linearGradient>
                {/* Flow gradient (right side: hub → partner) */}
                <linearGradient id="uni-net-flow-r" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#31429C" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FCB730" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Background dot pattern */}
              <rect width="1000" height="540" fill="url(#uni-net-dots)" />

              {/* Column headers */}
              <g fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="12" letterSpacing="2">
                <text x="135" y="36" fill="#5a6275">SOURCE MARKETS</text>
                <text x="500" y="36" fill="#5a6275" textAnchor="middle">ADMIZZ NETWORK</text>
                <text x="868" y="36" fill="#5a6275" textAnchor="end">PARTNER REGIONS</text>
              </g>

              {/* ---- Flow paths: source → hub ---- */}
              <g fill="none" stroke="url(#uni-net-flow-l)" strokeWidth="1.5" strokeLinecap="round">
                {sourceMarkets.map((_, i) => {
                  const sy = 90 + i * 70;
                  return (
                    <path
                      key={`l-${i}`}
                      className="uni-net-flow"
                      d={`M 215,${sy} C 340,${sy} 380,270 490,270`}
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  );
                })}
              </g>

              {/* ---- Flow paths: hub → partner ---- */}
              <g fill="none" stroke="url(#uni-net-flow-r)" strokeWidth="1.5" strokeLinecap="round">
                {partnerRegions.map((_, i) => {
                  const py = 90 + i * 70;
                  return (
                    <path
                      key={`r-${i}`}
                      className="uni-net-flow"
                      d={`M 510,270 C 620,270 660,${py} 785,${py}`}
                      style={{ animationDelay: `${i * 0.18 + 0.4}s` }}
                    />
                  );
                })}
              </g>

              {/* ---- Source nodes (left column) ---- */}
              <g fontFamily="Montserrat, sans-serif">
                {sourceMarkets.map((s, i) => {
                  const cy = 90 + i * 70;
                  return (
                    <g key={s.country}>
                      {/* Pill background */}
                      <rect
                        x="40"
                        y={cy - 22}
                        width="170"
                        height="44"
                        rx="22"
                        fill="white"
                        stroke="#c8d4ee"
                        strokeWidth="1.5"
                      />
                      {/* Flag */}
                      <text
                        x="60"
                        y={cy + 8}
                        fontSize="22"
                      >
                        {s.flag}
                      </text>
                      {/* Country name */}
                      <text
                        x="92"
                        y={cy - 1}
                        fontSize="13"
                        fontWeight="700"
                        fill="#0D1282"
                      >
                        {s.country}
                      </text>
                      {/* Percentage */}
                      <text
                        x="92"
                        y={cy + 14}
                        fontSize="11"
                        fontWeight="600"
                        fill="#5a6275"
                      >
                        {s.percent}% &middot; {s.students}
                      </text>
                      {/* Connecting node (right edge of pill) */}
                      <circle
                        cx="215"
                        cy={cy}
                        r="9"
                        fill="#0D1282"
                        opacity="0.2"
                        className="uni-net-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                      <circle
                        cx="215"
                        cy={cy}
                        r="5"
                        fill="url(#uni-net-source)"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </g>

              {/* ---- Center hub: ADMIZZ ---- */}
              <g>
                {/* Outer glow ring */}
                <circle
                  cx="500"
                  cy="270"
                  r="60"
                  fill="#FDED22"
                  opacity="0.18"
                  className="uni-net-hub-glow"
                />
                {/* Solid hub */}
                <circle
                  cx="500"
                  cy="270"
                  r="46"
                  fill="url(#uni-net-hub)"
                  stroke="white"
                  strokeWidth="4"
                />
                {/* Logo */}
                <image
                  href="/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
                  x="464"
                  y="258"
                  width="72"
                  height="24"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>

              {/* ---- Partner nodes (right column) ---- */}
              <g fontFamily="Montserrat, sans-serif">
                {partnerRegions.map((p, i) => {
                  const cy = 90 + i * 70;
                  return (
                    <g key={p.name}>
                      {/* Pill background */}
                      <rect
                        x="790"
                        y={cy - 22}
                        width="170"
                        height="44"
                        rx="22"
                        fill="white"
                        stroke="#c8d4ee"
                        strokeWidth="1.5"
                      />
                      {/* Connecting node (left edge of pill) */}
                      <circle
                        cx="785"
                        cy={cy}
                        r="5"
                        fill="url(#uni-net-partner)"
                        stroke="white"
                        strokeWidth="2"
                      />
                      {/* Flag */}
                      <text x="810" y={cy + 8} fontSize="22">
                        {p.flag}
                      </text>
                      {/* Country name */}
                      <text
                        x="842"
                        y={cy + 5}
                        fontSize="13"
                        fontWeight="700"
                        fill="#0D1282"
                      >
                        {p.name}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Bottom caption */}
              <g fontFamily="Montserrat, sans-serif">
                <text
                  x="500"
                  y="510"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="#5a6275"
                  letterSpacing="1"
                >
                  6 SOURCE COUNTRIES &middot; 1 PLATFORM &middot; 11 PARTNER NATIONS
                </text>
              </g>
            </svg>
          </div>

          {/* Source market stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {sourceMarkets.map((m) => (
              <div
                key={m.country}
                className="bg-white border border-border-light rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-blue-royal/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl" aria-hidden>
                    {m.flag}
                  </span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "#dcfce7", color: "#15803d" }}
                  >
                    &#9650; {m.yoy}%
                  </span>
                </div>
                <div className="text-[13px] font-bold text-navy mb-1 leading-tight">
                  {m.country}
                </div>
                <div className="text-2xl font-extrabold leading-none mb-1" style={{ color: "#0D1282" }}>
                  {m.percent}%
                </div>
                <div className="text-[11px] text-gray-dark">
                  {m.students} students
                </div>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-gray-dark text-center mt-6 italic">
            Indicative figures based on recruitment volume across primary
            source markets &middot; YoY = year-over-year growth
          </p>
        </div>
      </section>

      {/* ===== BENEFITS OF PARTNERING ===== */}
      <section className="py-16" style={{ background: "#E8EEFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-6">
            Benefits of Partnering With Admizz Education
          </h2>
          <p className="text-[15px] text-gray-dark leading-relaxed text-center mb-10 max-w-3xl mx-auto">
            We have successfully placed{" "}
            <span className="font-semibold text-navy">25,000+ students</span> at
            their dream universities across{" "}
            <span className="font-semibold text-navy">11 countries</span>, and
            continue to be the platform of choice for institutions seeking
            quality international enrollments.
          </p>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <ul className="space-y-4">
              {benefitsList.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-royal flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[15px] text-gray-dark">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <Image
                src="/images/universities-page/notifications-feature.webp"
                alt="Benefits of partnering with Admizz Education"
                width={1024}
                height={425}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW PARTNERSHIP WORKS — TIMELINE ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Process
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy text-center mb-3">
            How Partnership Works
          </h2>
          <p className="text-[15px] text-gray-dark text-center max-w-2xl mx-auto mb-12">
            From first conversation to live recruitment in a matter of weeks &mdash;
            here&rsquo;s how onboarding looks.
          </p>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block relative">
            {/* Connector line */}
            <div
              className="absolute top-8 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #31429C 15%, #0D1282 50%, #31429C 85%, transparent 100%)",
              }}
            />
            <div className="grid grid-cols-4 gap-4 relative">
              {partnershipSteps.map((step) => (
                <div key={step.num} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10"
                    style={{
                      background:
                        "linear-gradient(135deg, #0D1282 0%, #31429C 100%)",
                      border: "4px solid white",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-navy mt-5 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-dark leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-6">
            {partnershipSteps.map((step, i) => (
              <div key={step.num} className="flex gap-4 relative">
                {/* Vertical connector */}
                {i < partnershipSteps.length - 1 && (
                  <div
                    className="absolute left-7 top-14 bottom-[-1.5rem] w-0.5"
                    style={{
                      background:
                        "linear-gradient(180deg, #31429C 0%, #0D1282 100%)",
                    }}
                  />
                )}
                <div
                  className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md relative z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, #0D1282 0%, #31429C 100%)",
                    border: "3px solid white",
                  }}
                >
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-base font-bold text-navy mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-gray-dark leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPEED WINS / USPs ===== */}
      <section className="py-16" style={{ background: "#fafbff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Speed Wins
          </p>
          <h2 className="text-[28px] md:text-[40px] font-bold text-center mb-2" style={{ color: "#0D1282" }}>
            Succeed With Our Seamless Process
          </h2>
          <p className="text-[15px] text-center mb-12" style={{ color: "#8892a8" }}>
            Operational differentiators that move your enrollments faster
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 — Blue */}
            <div className="rounded-2xl p-8 relative transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: "#EEF4FF", border: "1.5px solid #a8c8f8" }}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#dbe8ff" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#4a7cdb" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
                  </svg>
                </div>
                <span className="text-[64px] font-bold leading-none" style={{ color: "#c8d8f0" }}>1</span>
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0D1282" }}>Fast Application Submission</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
                Submit applications in a record-time of 24-48 hours.
              </p>
            </div>
            {/* Card 2 — Yellow */}
            <div className="rounded-2xl p-8 relative transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: "#FFFBE6", border: "1.5px solid #e8d870" }}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#fff3c4" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#b8960a" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </div>
                <span className="text-[64px] font-bold leading-none" style={{ color: "#ece0a0" }}>2</span>
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0D1282" }}>Quick Offers</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
                With direct university partnerships, receive offers in 7-14 days.
              </p>
            </div>
            {/* Card 3 — Green */}
            <div className="rounded-2xl p-8 relative transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: "#EDFFF2", border: "1.5px solid #80d8a0" }}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#d0f5dc" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#3da868" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <span className="text-[64px] font-bold leading-none" style={{ color: "#b0e8c0" }}>3</span>
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0D1282" }}>Transparent Commission</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
                Simplified commission structure with access to your personalised wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS WE RECRUIT FOR ===== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Coverage
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy text-center mb-3">
            Programs We Recruit For
          </h2>
          <p className="text-[15px] text-gray-dark text-center max-w-2xl mx-auto mb-10">
            We support institutions across the full academic spectrum &mdash; from
            foundation pathways to doctoral research.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-border-light rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-royal/50 flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: "#EEF4FF" }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy mb-0.5">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-gray-dark leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST METRICS + CTA + DONUT CHART ===== */}
      <section className="bg-gradient-to-r from-navy to-blue-dark text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Donut chart */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm opacity-80 mb-2 uppercase tracking-wider">
                Network at a Glance
              </p>
              <div className="relative">
                <svg width="240" height="240" viewBox="0 0 240 240" aria-label="University partner distribution by region">
                  {donut.slices.map((slice) => {
                    const safeEnd =
                      slice.endAngle - slice.startAngle >= 360
                        ? slice.endAngle - 0.01
                        : slice.endAngle;
                    return (
                      <path
                        key={slice.region}
                        d={describeArc(120, 120, 95, slice.startAngle, safeEnd)}
                        fill="none"
                        stroke={slice.color}
                        strokeWidth="32"
                        strokeLinecap="butt"
                      />
                    );
                  })}
                  <text
                    x="120"
                    y="115"
                    textAnchor="middle"
                    fill="white"
                    fontSize="36"
                    fontWeight="800"
                    fontFamily="Montserrat, sans-serif"
                  >
                    {donut.total}
                  </text>
                  <text
                    x="120"
                    y="138"
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    opacity="0.8"
                    fontFamily="Montserrat, sans-serif"
                    letterSpacing="2"
                  >
                    PARTNERS
                  </text>
                </svg>
              </div>
              {/* Legend */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-5 text-[13px]">
                {donut.slices.map((s) => (
                  <div key={s.region} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ background: s.color }}
                    />
                    <span className="opacity-90">
                      {s.region} <span className="opacity-60">({s.count})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA copy */}
            <div className="text-center md:text-left">
              <p className="text-sm opacity-80 mb-4">
                Trusted by 100+ universities across 11 countries
              </p>
              <h2 className="text-2xl md:text-[32px] font-bold leading-tight mb-4">
                Let&rsquo;s Build Global Education Together
              </h2>
              <p className="text-[15px] leading-relaxed opacity-90 mb-8">
                Whether you are a university aiming to expand your international
                footprint or a college looking for a reliable recruitment
                partner, Admizz Education is your gateway to global student
                success.
              </p>
              <a
                href={PARTNER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Partner with us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16" style={{ background: "#E8EEFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[32px] text-center mb-3"
            style={{ color: "#0D1282", fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            What our partner institutions are saying
          </h2>
          <p className="text-center text-[13px] text-gray-dark mb-10 italic">
            Sample quotes shown below &mdash; will be replaced with verified partner statements.
          </p>
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Card 1 — Video + featured italic quote (spans 2 rows) */}
            <div
              className="bg-white rounded-xl p-5 flex flex-col lg:row-span-2"
              style={{ border: "1.5px solid #c8daf8" }}
            >
              <a
                href="https://www.youtube.com/watch?v=VrIVEimhnFs"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full rounded-lg overflow-hidden mb-5 flex-shrink-0"
                style={{ aspectRatio: "16/9" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.youtube.com/vi/VrIVEimhnFs/hqdefault.jpg"
                  alt="Welcome to Admizz Education"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
              <svg className="w-10 h-10 mb-2 flex-shrink-0" viewBox="0 0 40 40" fill="none">
                <text x="0" y="32" fontSize="38" fontWeight="bold" fill="#b0c4e8" fontFamily="Georgia, serif">&ldquo;</text>
              </svg>
              <p
                className="text-[15px] text-center leading-relaxed flex-grow flex items-center"
                style={{ color: "#0D1282", fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <p className="text-[12px] font-bold uppercase tracking-wider text-center mt-4" style={{ color: "#0D1282" }}>
                {testimonials[0].source}
              </p>
            </div>

            {/* Cards 2-4 — Regular quote cards */}
            {testimonials.slice(1, 4).map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-7 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ border: "1.5px solid #c8daf8" }}
              >
                <svg className="w-10 h-10 mb-4 flex-shrink-0" viewBox="0 0 40 40" fill="none">
                  <text x="0" y="32" fontSize="38" fontWeight="bold" fill="#b0c4e8" fontFamily="Georgia, serif">&ldquo;</text>
                </svg>
                <p className="text-[14px] leading-relaxed mb-6 flex-grow" style={{ color: "#3d4663" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[12px] font-bold text-navy uppercase tracking-wider">
                  {t.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ items={faqItems} title="Everything You Need to Know" twoColumn />

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[15px] text-gray-dark leading-relaxed mb-6">
            <span className="font-bold text-navy text-xl">100+ universities</span>{" "}
            already working with us to connect with motivated international
            students from emerging markets.
          </p>
          <a
            href={PARTNER_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
          >
            Partner with us
          </a>
        </div>
      </section>
    </main>
  );
}

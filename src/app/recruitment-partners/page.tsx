import Image from "next/image";
import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import TrustedPartners from "@/components/ui/TrustedPartners";
import { allUniversities } from "@/lib/universities";

export const metadata: Metadata = {
  title: "Recruitment Partners - Admizz Education",
  description:
    "Partner with Admizz Education as an education consultant or recruitment agency. Refer students to 100+ partner universities with 24-48 hour application turnaround.",
  alternates: {
    canonical: "https://admizzeducation.com/recruitment-partners",
  },
  openGraph: {
    title: "Recruitment Partners - Admizz Education",
    description:
      "Refer students to 100+ partner universities with 24-48 hour application turnaround. Become an Admizz Education recruitment partner.",
    url: "https://admizzeducation.com/recruitment-partners",
    siteName: "Admizz Education",
    images: ["/images/recruitment-partners/billboard.webp"],
    type: "website",
  },
};

const PARTNER_FORM_URL = "https://forms.gle/E8CdsJp2y4rHbm9c6";

const heroStats = [
  { value: "1,000+", label: "Partners Enrolled" },
  { value: "25,000+", label: "Students Placed" },
  { value: "100+", label: "Partner Universities" },
  { value: "24-48h", label: "App Turnaround" },
];

const whyPartnerFeatures = [
  {
    icon: "🌍",
    title: "100+ Partner Universities",
    description:
      "Refer to a global network of universities across UK, USA, Canada, Australia, Europe, and more — through direct partnerships.",
  },
  {
    icon: "⚡",
    title: "Fast Application Turnaround",
    description:
      "Skip the bottleneck — student applications submitted to universities in 24-48 hours, with offers commonly received in 7-14 days.",
  },
  {
    icon: "📊",
    title: "Application Status Visibility",
    description:
      "Track student applications through a dedicated partner workflow — submission, document checks, university follow-ups, and offer status.",
  },
  {
    icon: "🤝",
    title: "Back-Office Handled For You",
    description:
      "We take care of application processing, document verification, university follow-up, and visa-stage coordination — you focus on counselling.",
  },
  {
    icon: "🎓",
    title: "Training & Marketing Support",
    description:
      "Country briefings, university briefings, and co-branded marketing collateral to help you guide students with confidence.",
  },
  {
    icon: "✅",
    title: "Ethical, Transparent Recruitment",
    description:
      "Student-first practices and clear partnership terms — built on long-term relationships rather than aggressive volume targets.",
  },
];

// Split-list: division of responsibilities between partner and Admizz
const partnerBrings = [
  {
    icon: "🤝",
    title: "Student Relationships",
    description: "You know your students, families, and local market.",
  },
  {
    icon: "🎯",
    title: "Counselling Expertise",
    description: "You guide students on country, course, and university fit.",
  },
  {
    icon: "📍",
    title: "Local Presence",
    description: "On-the-ground reach in your source market.",
  },
  {
    icon: "🤲",
    title: "Trust & Recommendation",
    description: "The personal endorsement no platform can replicate.",
  },
];

const admizzHandles = [
  {
    icon: "📝",
    title: "Application Processing",
    description: "Submission to 100+ partner universities, end-to-end.",
  },
  {
    icon: "🔍",
    title: "Document Verification",
    description: "Compliance and accuracy checks before submission.",
  },
  {
    icon: "📞",
    title: "University Follow-Up",
    description: "Chasing offers, conditional clarifications, deferrals.",
  },
  {
    icon: "✈️",
    title: "Visa-Stage Coordination",
    description: "Visa documentation guidance and embassy coordination.",
  },
];

const partnershipSteps = [
  {
    num: "1",
    title: "Apply Online",
    description: "Quick 2-minute form. We'll respond within one business day.",
  },
  {
    num: "2",
    title: "KYC & Verify",
    description: "Document & compliance check to keep recruitment ethical.",
  },
  {
    num: "3",
    title: "Onboarding & Training",
    description: "Portal access, counsellor training, and country playbooks.",
  },
  {
    num: "4",
    title: "Live & Earn",
    description: "Start referring students and earn commission from day one.",
  },
];

const agentTools = [
  {
    icon: "📋",
    title: "Application Workflow",
    description: "A guided submission process from student onboarding to offer",
  },
  {
    icon: "🎓",
    title: "Onboarding & Training",
    description: "Country, visa, and university briefings to ramp up quickly",
  },
  {
    icon: "🎨",
    title: "Marketing Support",
    description: "Co-branded collateral and content to support outreach",
  },
  {
    icon: "🤝",
    title: "Dedicated Partnership Team",
    description: "A named point of contact for queries, escalations, and reviews",
  },
];

// NOTE: All testimonials below are SAMPLES written from a partner-agent POV.
// Replace with real partner agent quotes when available.
const testimonials = [
  {
    quote:
      "Admizz transformed how we run our consultancy. The 24-48 hour turnaround means we can quote students realistic timelines, and the back-office support takes a huge load off our team.",
    source: "Founder, Education Consultancy (India)",
    isSample: true,
  },
  {
    quote:
      "The application visibility alone is worth it. We track students across UK, Canada, and Australia without chasing email threads, and the partnership team is genuinely responsive when it matters.",
    source: "Director, Study Abroad Agency (Nepal)",
    isSample: true,
  },
  {
    quote:
      "Admizz onboarded our team in under two weeks. Their training portal is genuinely useful — visa, country, and university briefings — and the named manager picks up the phone when it matters.",
    source: "Owner, Career Counselling Firm (Bangladesh)",
    isSample: true,
  },
  {
    quote:
      "We've doubled our placements year-on-year since partnering. Direct university access plus transparent commission is rare in this industry — Admizz delivers both.",
    source: "Managing Partner, Overseas Education (Sri Lanka)",
    isSample: true,
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What is the Admizz recruitment partner program?",
    answer:
      "It is a structured collaboration for independent counsellors, study-abroad consultancies, and education agencies who refer students to universities through the Admizz network. Commercial terms are agreed during onboarding.",
  },
  {
    question: "Who can become a recruitment partner?",
    answer:
      "Established education consultancies, independent overseas-education counsellors, and study-abroad agencies are typically a good fit. Specific eligibility is reviewed during the discovery call.",
  },
  {
    question: "How does the commission structure work?",
    answer:
      "Commission is paid against successful student enrollments at partner universities. Specific rates and payout schedules are shared and agreed during the partnership onboarding, based on your operating model and reach.",
  },
  {
    question: "What countries and programs can I refer students to?",
    answer:
      "Our network includes 100+ partner universities across the UK, USA, Canada, Australia, New Zealand, Germany, France, Finland, and India. Programs supported include undergraduate, postgraduate, PhD, foundation, pathway, and diploma courses.",
  },
  {
    question: "Do I need to handle the application or visa process myself?",
    answer:
      "No. Admizz handles application processing, document verification, university follow-up, and visa-stage coordination. You stay focused on counselling students; we run the operational back office.",
  },
  {
    question: "How long does onboarding usually take?",
    answer:
      "Onboarding pace depends on your readiness and documentation. Most partners move from initial conversation to live within a few weeks, including verification, agreement, training, and briefings.",
  },
  {
    question: "Is there any cost to join the program?",
    answer:
      "There are no upfront platform fees to join the recruitment partner program. Admizz earns through the partnership economics agreed with each university.",
  },
  {
    question: "Can I refer students from multiple source countries?",
    answer:
      "Yes. Many partners operate across South Asia and Southeast Asia, and the partnership supports multi-country student pipelines.",
  },
  {
    question: "What support do partners receive after onboarding?",
    answer:
      "Partners receive a named point of contact, country and university briefings, marketing collateral, and ongoing operational support throughout the application and visa journey.",
  },
  {
    question: "How do I get started?",
    answer:
      "Submit the partnership inquiry form on this page. Our team will reach out to schedule a discovery call and walk you through the next steps in detail.",
  },
];

// Donut chart data — auto-grouped from allUniversities
const REGION_MAP: Record<string, string> = {
  UK: "Europe",
  France: "Europe",
  Germany: "Europe",
  Finland: "Europe",
  USA: "North America",
  Canada: "North America",
  Australia: "Oceania",
  "New Zealand": "Oceania",
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

export default function RecruitmentPartnersPage() {
  const donut = buildDonutData();

  return (
    <main style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}>
      {/* ===== HERO ===== */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(180deg, #fde8d8 0%, #f5e6f0 50%, #fdf2eb 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[2px] mb-4" style={{ color: "#5a6275" }}>
            For Recruitment Agents &amp; Consultancies
          </p>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[42px] font-bold leading-[1.15] tracking-tight max-w-3xl mx-auto" style={{ color: "#0D1282" }}>
            Grow Your Counselling Business with Admizz
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] max-w-2xl mx-auto leading-relaxed" style={{ color: "#3d4663" }}>
            Refer students to 100+ partner universities with 24-48 hour
            application turnaround. Built for independent counsellors,
            education consultants, and study-abroad agencies.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={PARTNER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[15px] px-8 py-3 rounded-full text-white transition-all hover:scale-[1.02]"
              style={{ background: "#0D1282" }}
            >
              Become a Partner Agent
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
            src="/images/recruitment-partners/billboard.webp"
            alt="Admizz Education recruitment partner dashboard"
            width={2304}
            height={1296}
            className="w-full h-auto rounded-xl"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
            priority
          />
          {/* Floating chip */}
          <div
            className="hidden md:flex absolute bottom-8 right-8 items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg"
            style={{ border: "1.5px solid #c8daf8" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#FCB730" }} />
            <span className="text-[13px] font-semibold text-navy">100+ Partner Universities</span>
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

      {/* ===== ABOUT / HOW ADMIZZ WORKS FOR AGENTS ===== */}
      <section className="py-16" style={{ background: "#fdf2eb" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            How It Works
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy mb-6">
            A Smarter Way to Run Your Counselling Business
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-[15px] text-gray-dark leading-relaxed">
              Admizz Education partners with independent counsellors,
              education consultants, and study-abroad agencies to place
              students at universities across our global network. The
              partnership is built around speed, transparency, and ethical
              recruitment &mdash; so you can spend more time guiding students
              and less time chasing applications.
            </p>
            <p className="text-[15px] text-gray-dark leading-relaxed">
              You bring the student relationships, counselling expertise, and
              local presence. Admizz handles the operational back office:
              application processing, document verification, university
              follow-up, and visa-stage coordination &mdash; so every
              partnership scales without overhead.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY PARTNER ===== */}
      <section className="py-16" style={{ background: "#fbf3f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Why Admizz
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
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4"
                  style={{ background: "#EEF4FF" }}
                >
                  {feature.icon}
                </div>
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

      {/* ===== HOW WE WORK TOGETHER ===== */}
      <section className="py-16" style={{ background: "#fdf2eb" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Partnership
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy text-center mb-3">
            How We Work Together
          </h2>
          <p className="text-[15px] text-gray-dark text-center max-w-2xl mx-auto mb-10">
            Clear division of work between you and Admizz &mdash; you stay
            focused on counselling students, we run the operational back office.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* What You Bring */}
            <div
              className="rounded-2xl p-7 md:p-8"
              style={{ background: "#EEF4FF", border: "1.5px solid #c8daf8" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ background: "#0D1282", color: "white" }}
                >
                  🎯
                </div>
                <h3 className="text-xl font-bold" style={{ color: "#0D1282" }}>
                  What You Bring
                </h3>
              </div>
              <ul className="space-y-4">
                {partnerBrings.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-bold text-navy text-[15px] mb-0.5">
                        {item.title}
                      </div>
                      <div className="text-[13px] text-gray-dark leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Admizz Handles */}
            <div
              className="rounded-2xl p-7 md:p-8"
              style={{ background: "#FFFBE6", border: "1.5px solid #e8d870" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ background: "#0D1282", color: "white" }}
                >
                  🛠️
                </div>
                <h3 className="text-xl font-bold" style={{ color: "#0D1282" }}>
                  What Admizz Handles
                </h3>
              </div>
              <ul className="space-y-4">
                {admizzHandles.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-bold text-navy text-[15px] mb-0.5">
                        {item.title}
                      </div>
                      <div className="text-[13px] text-gray-dark leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-[13px] text-gray-dark text-center mt-8 italic">
            Commercial terms, including commission structure and payout
            schedule, are discussed during the partnership onboarding call.
          </p>
        </div>
      </section>

      {/* ===== HOW PARTNERSHIP WORKS — TIMELINE ===== */}
      <section className="py-16" style={{ background: "#fbf3f8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Process
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy text-center mb-3">
            From Application to Live Partner in Two Weeks
          </h2>
          <p className="text-[15px] text-gray-dark text-center max-w-2xl mx-auto mb-12">
            A streamlined four-step onboarding that gets you earning quickly,
            without compromising on training or compliance.
          </p>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block relative">
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
      <section className="py-16" style={{ background: "#fdf2eb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Speed Wins
          </p>
          <h2 className="text-[28px] md:text-[40px] font-bold text-center mb-2" style={{ color: "#0D1282" }}>
            Operational Speed That Closes Deals
          </h2>
          <p className="text-[15px] text-center mb-12" style={{ color: "#8892a8" }}>
            Faster turnarounds win more students. Here&rsquo;s where we deliver.
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
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0D1282" }}>24-48 Hour Application Submission</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
                Skip the bottleneck. We submit student applications to universities within 1-2 working days.
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
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0D1282" }}>7-14 Day Offer Turnaround</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
                Direct university partnerships mean offers in 7-14 days &mdash; not the industry-standard month-long wait.
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
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0D1282" }}>Transparent Partnership</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "#5a6275" }}>
                Clear commercial terms, predictable communication, and a dedicated point of contact &mdash; from onboarding onwards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AGENT TOOLKIT ===== */}
      <section className="py-16" style={{ background: "#fbf3f8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[13px] font-bold uppercase tracking-[2px] text-blue-royal mb-3">
            Partner Toolkit
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold text-navy text-center mb-3">
            What You Get When You Partner With Admizz
          </h2>
          <p className="text-[15px] text-gray-dark text-center max-w-2xl mx-auto mb-10">
            Operational support that helps partners run a smoother overseas-education
            practice &mdash; available to every recruitment partner.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {agentTools.map((t) => (
              <div
                key={t.title}
                className="bg-white border border-border-light rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-royal/50 flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: "#EEF4FF" }}
                >
                  {t.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy mb-0.5">
                    {t.title}
                  </h3>
                  <p className="text-[13px] text-gray-dark leading-relaxed">
                    {t.description}
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
                    UNIVERSITIES
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
                Refer to 100+ partner universities across 11 countries
              </p>
              <h2 className="text-2xl md:text-[32px] font-bold leading-tight mb-4">
                Sell Confidence to Your Students
              </h2>
              <p className="text-[15px] leading-relaxed opacity-90 mb-8">
                Whether you&rsquo;re an established consultancy or starting out,
                you get instant access to a global network of universities
                &mdash; backed by 24-48 hour application turnaround and
                industry-leading commission.
              </p>
              <a
                href={PARTNER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16" style={{ background: "#fdf2eb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-[32px] text-center mb-3"
            style={{ color: "#0D1282", fontStyle: "italic", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            What our partner agencies are saying
          </h2>
          <p className="text-center text-[13px] text-gray-dark mb-10 italic">
            Sample quotes shown below &mdash; will be replaced with verified partner agent statements.
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
      <FAQ items={faqItems} title="Frequently Asked Questions" twoColumn />

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16" style={{ background: "#fbf3f8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[15px] text-gray-dark leading-relaxed mb-6">
            <span className="font-bold text-navy text-xl">1,000+ partners</span>{" "}
            already growing their counselling practice with Admizz Education.
          </p>
          <a
            href={PARTNER_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
          >
            Become a Partner Agent
          </a>
        </div>
      </section>
    </main>
  );
}

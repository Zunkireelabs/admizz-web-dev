import Link from "next/link";
import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Universities - Admizz Education",
  description:
    "Admizz Education is a global study abroad platform helping universities and colleges grow international enrollments through ethical partnerships.",
  alternates: {
    canonical: "https://admizzeducation.com/universities/",
  },
  openGraph: {
    title: "Universities - Admizz Education",
    description:
      "Admizz Education is a global study abroad platform helping universities and colleges grow international enrollments through ethical partnerships.",
    url: "https://admizzeducation.com/universities/",
    siteName: "Admizz Education",
    images: ["/images/og/soHeroImg-scaled.png"],
    type: "website",
  },
};

const whyPartnerFeatures = [
  {
    title: "Global Student Recruitment Network",
    description:
      "Connect with academically qualified international students from diverse regions through our trusted recruitment ecosystem.",
  },
  {
    title: "Quality-Focused Admissions",
    description:
      "Every student is counseled and screened to meet university eligibility criteria and academic expectations.",
  },
  {
    title: "Market-Driven Enrollment Strategy",
    description:
      "We analyze regional demand to promote the right programs in the right markets for better enrollment outcomes.",
  },
  {
    title: "End-to-End Application Support",
    description:
      "From counseling to enrollment confirmation, we simplify and manage the complete admissions process.",
  },
  {
    title: "Ethical & Transparent Recruitment",
    description:
      "We follow globally accepted ethical recruitment practices, ensuring trust and long-term collaboration.",
  },
  {
    title: "Global Brand Visibility",
    description:
      "Increase your institution\u2019s visibility through digital campaigns, webinars, and international outreach programs.",
  },
];

const partnerExperienceFeatures = [
  {
    number: "01",
    title: "Access a Centralized Platform",
    description: "Manage student applications & university offers",
  },
  {
    number: "02",
    title: "Increase Enrollment Success Rates",
    description: "Leverage AI-powered matching & real-time tracking",
  },
  {
    number: "03",
    title: "Earn Competitive Incentives",
    description: "Transparent commissions structures with instant payouts",
  },
  {
    number: "04",
    title: "Marketing & Lead Generation Support",
    description: "Expand your reach with digital tools & events",
  },
  {
    number: "05",
    title: "Exclusive Training & Webinars",
    description: "Stay ahead with industry insights and trends",
  },
];

const benefitsList = [
  "Increased international student enrollments",
  "Reduced admissions workload",
  "Access to emerging student markets",
  "Improved student quality and retention",
  "Long-term global brand growth",
];

const uspCards = [
  {
    title: "Fast application submission",
    description:
      "With Admizz Education you get to submit application in a record-time of 24-48 hours!",
  },
  {
    title: "Quick offers",
    description:
      "No more month-long waiting! With our direct university partnerships, receive offers in 7-14 days",
  },
  {
    title: "Simplified commission structure",
    description:
      "Receive transparent commission with access to your personalised wallet",
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

export default function UniversitiesPage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-wider mb-3">
            Global University &amp; College Partnerships
          </p>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Looking for the Global Students?
          </h1>
          <p className="mt-4 text-[15px] max-w-2xl mx-auto leading-relaxed opacity-90">
            Admizz Education is a global platform for study abroad, connecting
            universities and colleges with high-quality international students
            through ethical, data-driven recruitment strategies.
          </p>
          <p className="mt-6 text-2xl font-bold">
            100+ <span className="text-sm font-normal opacity-80">partners around the world</span>
          </p>
          <Link
            href="/contact/"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Partner With Admizz Education
          </Link>
        </div>
      </section>

      {/* ===== ABOUT / GLOBAL PLATFORM ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-8">
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
              Our partnership model focuses on sustainability, transparency, and
              student success&mdash;ensuring institutions connect with motivated
              students who align with their programs and values.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY PARTNER ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Why Partner With Admizz Education?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPartnerFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-border-light rounded-[10px] p-8"
              >
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

      {/* ===== SMOOTH PARTNER EXPERIENCE ===== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Designed for a Smooth Partner Experience
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerExperienceFeatures.map((feature) => (
              <div
                key={feature.number}
                className="flex gap-4 items-start bg-white border border-border-light rounded-[10px] p-6"
              >
                <span className="text-2xl font-bold text-blue-royal flex-shrink-0">
                  {feature.number}
                </span>
                <div>
                  <h3 className="font-bold text-navy">{feature.title}</h3>
                  <p className="mt-1 text-sm text-gray-dark leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS OF PARTNERING ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-6">
            Benefits of Partnering With Admizz Education
          </h2>
          <p className="text-[15px] text-gray-dark leading-relaxed text-center mb-8">
            Global Study Abroad Platform that helps students land higher
            education opportunities abroad. We have successfully placed{" "}
            <span className="font-semibold text-navy">25,000+ students</span>{" "}
            at their dream universities and are currently the platform of choice
            of 120Mn+ student visitors every year.
          </p>
          <ul className="space-y-3 max-w-xl mx-auto">
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
                <span className="text-[15px] text-gray-dark">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SEAMLESS PROCESSES / USPs ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Succeed with Our Seamless Processes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {uspCards.map((usp) => (
              <div
                key={usp.title}
                className="bg-white border border-border-light rounded-[10px] p-8 text-center"
              >
                <h3 className="text-lg font-bold text-navy mb-3">
                  {usp.title}
                </h3>
                <p className="text-sm text-gray-dark leading-relaxed">
                  {usp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST METRICS + CTA ===== */}
      <section className="bg-gradient-to-r from-navy to-blue-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm opacity-80 mb-4">
            Trusted by 10,000+ partners across 200+ cities
          </p>
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight mb-4">
            Let&rsquo;s Build Global Education Together
          </h2>
          <p className="text-[15px] leading-relaxed opacity-90 max-w-2xl mx-auto mb-8">
            Whether you are a university aiming to expand your international
            footprint or a college looking for a reliable recruitment partner,
            Admizz Education is your gateway to global student success.
          </p>
          <Link
            href="/contact/"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Partner with us
          </Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ items={faqItems} title="Everything You Need to Know" />

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[15px] text-gray-dark leading-relaxed mb-6">
            <span className="font-bold text-navy text-xl">10,000+</span>{" "}
            partners already working with us to help their students realise
            their study abroad dreams
          </p>
          <Link
            href="/contact/"
            className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
          >
            Partner with us
          </Link>
        </div>
      </section>
    </main>
  );
}

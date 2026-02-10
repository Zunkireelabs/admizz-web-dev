import Link from "next/link";
import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Recruitment Partners - Admizz Education",
  description:
    "Admizz Education helps students study abroad with expert guidance, university admissions, visa support, and career counselling for global success.",
  alternates: {
    canonical: "https://admizzeducation.com/recruitment-partners/",
  },
  openGraph: {
    title: "Recruitment Partners - Admizz Education",
    description:
      "Admizz Education helps students study abroad with expert guidance, university admissions, visa support, and career counselling for global success.",
    url: "https://admizzeducation.com/recruitment-partners/",
    siteName: "Admizz Education",
    images: ["/images/og/billboard.webp"],
    type: "website",
  },
};

const features = [
  {
    title: "Expand Global Student Outreach",
    description: "Target the right student with AI-driven insights.",
  },
  {
    title: "Data-Driven Admissions Strategy",
    description: "Leverage analytics to improve recruitment outcomes.",
  },
  {
    title: "Streamlined Application Processing",
    description: "Faster decisions with a digitized workflow.",
  },
  {
    title: "Verified Student Application",
    description: "Pre-screened applicants to ensure quality enrollments.",
  },
  {
    title: "Multi-Country Recruitment Support",
    description: "Strengthening your presence in key markets.",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "How do I know which test is right for me?",
    answer:
      "Our experts guide you based on your destination and university requirements.",
  },
  {
    question: "Can I switch from online to offline batch?",
    answer:
      "Yes, we offer complete flexibility based on your preference.",
  },
  {
    question: "What if I miss a class?",
    answer: "We provide class recordings and revision sessions.",
  },
  {
    question: "How long is each course?",
    answer:
      "It depends on your test date — typically between 4 to 8 weeks.",
  },
  {
    question: "Is the demo class really free?",
    answer:
      "Absolutely. No commitments — just try before you enroll.",
  },
];

export default function RecruitmentPartnersPage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight">
            Grow your business with Admizz Education
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium">
            A Smarter Way To Enroll Students
          </p>
          <Link
            href="/contact/"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Partner with us
          </Link>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div>
              <p className="text-3xl font-bold">1000+</p>
              <p className="mt-1 text-sm">partners enrolled</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div>
              <p className="text-[15px] font-medium">
                Trusted by 10,000+ partners across 200+ cities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE GRID ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Why Partner with Admizz Education?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-border-light rounded-[10px] p-6"
              >
                <h3 className="text-lg font-bold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[15px] text-gray-dark leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-10">
            What Our Partners Say
          </h2>
          <blockquote className="border-l-4 border-golden pl-6 text-left">
            <p className="text-[15px] md:text-lg text-gray-dark leading-relaxed italic">
              &ldquo;From university selection to visa approval, Admizz
              Education provided exceptional support and made my journey to the
              UK effortless.&rdquo;
            </p>
            <footer className="mt-4 text-sm font-semibold text-navy">
              &mdash; Niraj Bhattarai
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ items={faqItems} title="Frequently Asked Questions" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            10,000+ partners already working with us to help their students
            realise their study abroad dreams
          </p>
          <Link
            href="/contact/"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Partner with us
          </Link>
        </div>
      </section>
    </main>
  );
}

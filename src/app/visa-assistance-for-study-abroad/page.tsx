import Link from "next/link";
import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";
import CTAForm from "@/components/ui/CTAForm";
import CountryCard from "@/components/ui/CountryCard";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";
import StudyAbroadInsights from "@/components/ui/StudyAbroadInsights";
import TestimonialsBento from "@/components/ui/TestimonialsBento";

export const metadata: Metadata = {
  title: "Visa Assistance for Study Abroad - Admizz Education",
  description:
    "Admizz Education provides end-to-end student visa assistance for the USA, UK, Canada, Australia & more — documents, mock interviews, and application review.",
  alternates: {
    canonical: "https://admizzeducation.com/visa-assistance-for-study-abroad",
  },
  openGraph: {
    title: "Visa Assistance for Study Abroad - Admizz Education",
    description:
      "Admizz Education provides end-to-end student visa assistance for the USA, UK, Canada, Australia & more — documents, mock interviews, and application review.",
    url: "https://admizzeducation.com/visa-assistance-for-study-abroad",
    siteName: "Admizz Education",
    images: ["/images/og/admizzn.webp"],
    type: "website",
  },
};

const stats = [
  { value: "1500+", label: "Students Successfully Enrolled Worldwide" },
  { value: "100+", label: "Prestigious Institutions in Our Global Network" },
  { value: "95%", label: "Student Visa Approval Rate with Expert Guidance" },
  { value: "$2M+", label: "in Scholarships Awarded to Our Students" },
];

const benefits = [
  {
    title: "Document Checklist & Review",
    description:
      "We give you a country-specific document checklist and review every file before submission, catching missing or inconsistent paperwork before an embassy does.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Mock Visa Interviews",
    description:
      "For countries that require an in-person or video interview, our counselors run practice sessions so you know what to expect and how to answer confidently.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    title: "Financial Documentation Guidance",
    description:
      "Proof-of-funds requirements are one of the most common reasons a student visa is refused. We help you prepare financial documents the correct, verifiable way.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Appointment Scheduling Support",
    description:
      "We help you book your visa appointment at the right time relative to your intake, and track processing timelines so you know what to expect.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Country-Specific Visa Expertise",
    description:
      "Student visa rules differ significantly by country and change often. Our counselors stay current on requirements for every destination we support.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Support Through Visa Decision",
    description:
      "We stay with you from your first document to your final visa decision — including guidance if additional information is requested during processing.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const destinations = [
  { name: "Study in Australia", image: "/images/destinations/aus1.webp", href: "/study-in-australia", description: "Globally ranked universities, excellent research facilities, and post-study work opportunities." },
  { name: "Study in Canada", image: "/images/destinations/canada1.webp", href: "/study-in-canada", description: "Affordable education, multicultural communities, and permanent residency pathways." },
  { name: "Study in France", image: "/images/destinations/france1.webp", href: "/study-in-france", description: "Famous for arts, fashion, business, and technology programs." },
  { name: "Study in India", image: "/images/destinations/india1.webp", href: "/study-in-india", description: "Affordable education options in a culturally diverse environment for international students." },
  { name: "Study in New Zealand", image: "/images/destinations/newzealand1.webp", href: "/study-in-newzealand", description: "Safe, welcoming, and focused on hands-on, career-oriented education." },
  { name: "Study in South Korea", image: "/images/destinations/usa1.webp", href: "/study-in-south-korea", description: "Advanced technology-driven education paired with cultural richness." },
  { name: "Study in the UK", image: "/images/destinations/uk1.webp", href: "/study-in-the-uk", description: "Home to prestigious, centuries-old institutions and globally recognized degrees." },
  { name: "Study in the USA", image: "/images/destinations/usa1.webp", href: "/study-in-the-usa", description: "The top destination for research, innovation, and global careers." },
];

const testimonialData = [
  {
    name: "Niraj Bhattarai",
    initial: "N",
    color: "#1E6DEB",
    university: "University of West of Scotland",
    originFlag: "NP",
    destFlag: "GB",
    route: "Nepal → UK",
    text: "From university selection to visa approval, Admizz Education provided exceptional support and made my journey to the UK effortless. I highly recommend them to anyone looking for a trustworthy study abroad partner.",
  },
  {
    name: "Yousuf Abdirahman Mohamed",
    initial: "Y",
    color: "#E8430C",
    university: "Kalinga Institute of Industrial Technology",
    originFlag: "SO",
    destFlag: "IN",
    route: "Somalia → India",
    text: "I appreciated your unlimited help for my MBA career. It was very tough but I gained a very solid educational background. Thanks Admizz!",
  },
  {
    name: "Basant Khadka",
    initial: "B",
    color: "#34A853",
    university: "Weber State University",
    originFlag: "NP",
    destFlag: "US",
    route: "Nepal → USA",
    text: "The journey to college can be overwhelming, but Admizz Education made applying to Weber State University effortless. Thanks to their guidance.",
  },
  {
    name: "Satyam Jaiswal",
    initial: "S",
    color: "#7C3AED",
    university: "University of Greenwich",
    originFlag: "NP",
    destFlag: "GB",
    route: "Nepal → UK",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support. Their team ensured every step of my application visa process was smooth and stress-free.",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What visa assistance does Admizz Education offer?",
    answer:
      "We provide end-to-end student visa support: document checklists, financial documentation guidance, application review, appointment scheduling, and mock visa interviews for the USA, UK, Canada, Australia, New Zealand, and more.",
  },
  {
    question: "How do overseas education consultants help with student visas?",
    answer:
      "Consultants help students prepare accurate visa applications, provide document checklists, schedule visa appointments, and conduct mock visa interviews to increase the chances of approval.",
  },
  {
    question: "What is Admizz Education's visa approval rate?",
    answer:
      "Our student visa approval rate is 95%, built on thorough document review and preparation before every application is submitted.",
  },
  {
    question: "Do I need visa help even if I already have my university offer?",
    answer:
      "Yes — a university offer is separate from your student visa. The visa application has its own documentation, financial proof, and (for some countries) interview requirements, which we help you prepare after your offer is confirmed.",
  },
  {
    question: "What documents are typically required for a student visa?",
    answer:
      "Requirements vary by country, but commonly include your university offer letter, proof of funds, academic transcripts, English proficiency scores, and a valid passport. We give you the exact checklist for your destination country.",
  },
  {
    question: "Do you help with visa interviews?",
    answer:
      "Yes, for countries that require one. We run mock interview sessions so you know what to expect and can answer confidently and honestly.",
  },
  {
    question: "How long does student visa processing take?",
    answer:
      "Processing times vary by country and time of year. We track current timelines for each destination and help you apply with enough buffer before your intake.",
  },
  {
    question: "How can I book a free visa consultation with Admizz Education?",
    answer:
      "You can reach out through our website, visit our office in Kathmandu or Birgunj, or call +977-9802728444 to book a free counseling session.",
  },
];

export default async function VisaAssistanceForStudyAbroadPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "visa-guides" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Visa Assistance
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Visa Assistance for Study Abroad
              </h1>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed opacity-85">
                Document review, mock interviews, and a 95% approval rate —
                end-to-end visa support from Admizz Education
              </p>
              <Link
                href="/register"
                className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-10 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Book Free Counseling
              </Link>
            </div>
            <div className="hidden md:block lg:w-[472px] ml-auto">
              <CTAForm title="Book Your Free Consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-14 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6"
              >
                <p className="text-3xl md:text-4xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-dark">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            End-to-End Student Visa Support
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            A student visa refusal can derail an otherwise strong application.
            Admizz Education's counselors guide you through every document and
            step, from your first checklist to your final decision.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border border-border-light rounded-[10px] p-7 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-royal/10 rounded-[10px] flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-dark leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Student Visa Support by Destination
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-3xl mx-auto mb-12">
            Visa requirements and timelines differ by country. Explore your
            options for each of the destinations Admizz Education supports.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ
        items={faqItems}
        sidebar
      />

      <TestimonialsBento
        testimonials={testimonialData}
        videoId="AW3Zmubc-tU"
        featuredStudent={{ name: "Ashok Upreti", subtitle: "Bachelor in Computer Science" }}
      />

      <StudyAbroadInsights posts={blogPosts} countryName="Visa Guides" categorySlug="visa-guides" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">
            Ready to Start Your Visa Application?
          </h2>
          <p className="mt-4 text-[15px] text-white/90 leading-relaxed">
            Our expert consultants are here to guide you every step of the way.
          </p>
          <Link
            href="/register"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-10 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    </main>
  );
}

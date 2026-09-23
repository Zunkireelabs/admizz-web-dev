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
  title: "Scholarship Assistance in Nepal - Admizz Education",
  description:
    "Admizz Education helps Nepali students find and apply for merit-based and need-based scholarships to study in the USA, UK, Canada, Australia & more.",
  alternates: {
    canonical: "https://admizzeducation.com/scholarship-assistance-in-nepal",
  },
  openGraph: {
    title: "Scholarship Assistance in Nepal - Admizz Education",
    description:
      "Admizz Education helps Nepali students find and apply for merit-based and need-based scholarships to study in the USA, UK, Canada, Australia & more.",
    url: "https://admizzeducation.com/scholarship-assistance-in-nepal",
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
    title: "Merit-Based Scholarship Matching",
    description:
      "We assess your academic record and match you against real merit-based scholarships offered directly by universities in your target country, so you only apply where you have a genuine chance.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Need-Based Financial Aid Guidance",
    description:
      "For students who qualify, we help you document financial need correctly and apply for need-based aid and grants offered by universities and government schemes.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Scholarship Application & Essay Support",
    description:
      "Our counselors review your scholarship essays and application forms line by line, helping you present your achievements clearly and honestly to selection committees.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Deadline & Document Tracking",
    description:
      "Scholarship deadlines often fall earlier than the university's own application deadline. We track every deadline for you so nothing is missed.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Country-Specific Scholarship Knowledge",
    description:
      "Scholarship availability and eligibility rules differ widely by country. Our counselors keep up with current offerings across every destination we work with.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Combined with Visa & Application Support",
    description:
      "Scholarship guidance isn't separate from your application — our team coordinates it alongside your university applications and visa documentation, in one place.",
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
    question: "What scholarship assistance does Admizz Education offer in Nepal?",
    answer:
      "Admizz Education helps Nepali students identify merit-based and need-based scholarships they're genuinely eligible for, then supports the full application — essays, documents, and deadlines — for universities in the USA, UK, Canada, Australia, New Zealand, and more.",
  },
  {
    question: "Is scholarship assistance included in Admizz's counseling, or a separate service?",
    answer:
      "Scholarship guidance is part of our standard study abroad counseling — it's coordinated together with your university applications and visa documentation, not offered as a separate, isolated service.",
  },
  {
    question: "Can I get a scholarship to study abroad from Nepal?",
    answer:
      "Yes. There are merit-based, need-based, and country-specific scholarships available to Nepali students. Eligibility depends on your academic record, chosen country, and course — our counselors help match you to real, applicable options.",
  },
  {
    question: "Do I need to pay for scholarship application help?",
    answer:
      "Initial counseling, including an assessment of your scholarship options, is free. Book a session with our team to find out what applies to your profile.",
  },
  {
    question: "Which countries offer the most scholarship opportunities for Nepali students?",
    answer:
      "Availability varies by year and university, but the USA, UK, Canada, Australia, and New Zealand each have active merit- and need-based scholarship programs for international students. Our counselors track current offerings across all of these destinations.",
  },
  {
    question: "Do I need IELTS or PTE to qualify for a scholarship?",
    answer:
      "Most scholarship-eligible programs require an English proficiency score (IELTS, PTE, or TOEFL) as part of the university application itself. Admizz Education also offers test preparation support.",
  },
  {
    question: "How early should I start my scholarship application?",
    answer:
      "Scholarship deadlines often fall earlier than a university's general application deadline, so we recommend starting 12-18 months before your intended intake — the same timeline we recommend for the overall study abroad process.",
  },
  {
    question: "How can I book a free scholarship consultation with Admizz Education?",
    answer:
      "You can reach out through our website, visit our office in Kathmandu or Birgunj, or call +977-9802728444 to book a free counseling session.",
  },
];

export default async function ScholarshipAssistanceInNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "scholarships" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Scholarship Assistance
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Scholarship Assistance in Nepal
              </h1>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed opacity-85">
                Find and apply for the right scholarship, with expert guidance
                from Admizz Education
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
            How We Help You Find & Win Scholarships
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Scholarship applications can be confusing and time-sensitive. As a
            trusted study abroad consultancy in Nepal, Admizz Education guides
            you through every step, from matching to a real opportunity to
            submitting a strong application.
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
            Scholarship Opportunities by Destination
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-3xl mx-auto mb-12">
            Scholarship availability and eligibility differ by country. Explore
            your options for each of the destinations Admizz Education
            supports.
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

      <StudyAbroadInsights posts={blogPosts} countryName="Scholarships" categorySlug="scholarships" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">
            Ready to Apply for a Scholarship?
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

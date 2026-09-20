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
  title: "Best Education Consultancy in Nepal - Admizz Education",
  description:
    "Admizz Education is the best education consultancy in Nepal – offering personalized counselling, university partnerships, scholarship assistance & visa support for studying abroad.",
  alternates: {
    canonical: "https://admizzeducation.com/best-education-consultancy-in-nepal",
  },
  openGraph: {
    title: "Best Education Consultancy in Nepal - Admizz Education",
    description:
      "Admizz Education is the best education consultancy in Nepal – offering personalized counselling, university partnerships, scholarship assistance & visa support for studying abroad.",
    url: "https://admizzeducation.com/best-education-consultancy-in-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/study.webp"],
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "1500+", label: "Students Successfully Enrolled" },
  { value: "100+", label: "Partner Institutions Worldwide" },
  { value: "95%", label: "Visa Approval Rate" },
  { value: "$2M+", label: "Scholarships Awarded" },
];

const features = [
  {
    title: "Expert and Personalized Career Counseling",
    description:
      "Admizz Education offers one-to-one career counseling based on each student's academic profile, goals, and budget. This ensures students choose the right course, country, and university with confidence.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Strong International University Partnerships",
    description:
      "Admizz Education collaborates with top universities across Australia, Canada, the UK, the USA, Europe, and Asia. As a result, students in Nepal gain access to globally recognized institutions.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    title: "Scholarship Assistance & Financial Guidance",
    description:
      "Admizz Education provides dedicated scholarship assistance, helping eligible students apply for merit-based and need-based scholarships. This support significantly reduces the financial burden of studying abroad.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "High Visa Success Rate",
    description:
      "Our experienced visa experts handle documentation, financial statements, and interview preparation, leading to a high student visa approval rate.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: "Transparent and Honest Guidance",
    description:
      "Admizz Education follows a transparent process with no hidden charges. Students and parents receive honest advice at every stage of the study abroad journey.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "End-to-End Student Support",
    description:
      "From admissions and test preparation to visa filing, pre-departure briefing, and post-arrival assistance, Admizz Education provides complete support, making us the Best Education Consultancy in Nepal.",
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

const services = [
  "Career & academic counseling",
  "Course and university selection",
  "Application & admission processing",
  "Scholarship guidance",
  "Student visa documentation & interview prep",
  "Test preparation support",
  "Pre-departure briefing",
  "Post-arrival assistance",
];

const courses = [
  "Computer Science and IT",
  "Data Science and Artificial Intelligence",
  "Engineering and STEM programs",
  "Business, MBA, and Management",
  "Finance and Accounting",
  "Health Sciences and Nursing",
  "Hospitality and Tourism",
  "Public Health and Social Sciences",
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
    question: "Why is Admizz Education the best education consultancy in Nepal?",
    answer:
      "Because it offers personalised counselling, reliable guidance, and a high visa success rate for Nepali students.",
  },
  {
    question: "What services does Admizz Education provide?",
    answer:
      "Counselling, university selection, applications, scholarships, visa support, and pre-departure assistance.",
  },
  {
    question: "Which countries can I apply to through Admizz Education?",
    answer:
      "USA, UK, Australia, Canada, Japan, Korea, Europe, and more.",
  },
  {
    question: "Does Admizz help with scholarships?",
    answer:
      "Yes. Admizz guides you to university, merit-based, and need-based scholarships.",
  },
  {
    question: "How does Admizz support visa processing?",
    answer:
      "They help prepare documents, financials, SOPs, and provide visa interview training.",
  },
  {
    question: "What documents do I need to start?",
    answer:
      "Transcripts, passport, English scores (IELTS/PTE), SOP, CV, and financial papers.",
  },
  {
    question: "Can students with low grades apply?",
    answer:
      "Yes. Admizz suggests suitable universities and pathway programs for low-score students.",
  },
  {
    question: "How long does the study-abroad process take?",
    answer:
      "Typically 4–12 weeks, depending on country and intake.",
  },
  {
    question: "Do I need IELTS or PTE?",
    answer:
      "Not always. Admizz helps you find universities that accept MOI or offer test waivers.",
  },
  {
    question: "Is counselling free at Admizz Education?",
    answer:
      "Yes. Admizz offers free counselling and profile evaluation for all students.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function BestEducationConsultancyInNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "nepal" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Study Abroad Experts You Can Trust
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Best Education Consultancy in Nepal
              </h1>
              <p className="mt-4 text-[15px] md:text-base text-white/90 leading-relaxed">
                Choosing the right education consultancy can shape your entire
                academic and career journey. At Admizz Education, we proudly stand
                as the Best Education Consultancy in Nepal, helping students turn
                their international education dreams into reality with clarity,
                confidence, and complete support.
              </p>
              <Link
                href="/register"
                className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
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

      {/* ===== WHY ADMIZZ ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Why Admizz Education Is the Best Education Consultancy in Nepal
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            When it comes to overseas education, guidance matters. That is why
            thousands of students choose Admizz Education. Not only do we
            provide accurate information, but we also ensure personalized
            counseling at every step.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-border-light rounded-[10px] p-8 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-navy mb-2">
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

      {/* ===== DESTINATIONS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Top Study Abroad Destinations
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Studying abroad opens doors to global exposure, quality education,
            and better career prospects. At Admizz Education, we guide Nepalese
            students toward countries known for academic excellence and
            post-study opportunities.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Our Services at a Glance
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-8">
            As the Best Education Consultancy in Nepal, Admizz Education offers
            end-to-end services, ensuring nothing is missed.
          </p>
          <ul className="space-y-3">
            {services.map((service) => (
              <li
                key={service}
                className="flex items-center gap-3 bg-white border border-border-light rounded-[10px] px-6 py-4"
              >
                <svg className="w-5 h-5 text-blue-royal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[15px] text-gray-dark">{service}</span>
              </li>
            ))}
          </ul>
          <p className="text-[15px] text-gray-dark leading-relaxed mt-6 text-center">
            Students feel supported not only during admission but even after
            reaching their destination country.
          </p>
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Courses We Help You Apply For
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Your course selection defines your future. Hence, we focus on
            career-driven and high-demand programs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div
                key={course}
                className="bg-white border border-border-light rounded-[10px] p-6 text-center hover:border-blue-royal hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-royal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold text-navy">{course}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEST PREP & VISA ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Test Prep */}
            <div className="bg-white border border-border-light rounded-[10px] p-8">
              <h2 className="text-xl font-bold text-navy mb-4">
                Score Higher with Expert Guidance
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-4">
                Test preparation plays a vital role in achieving your study
                abroad goals. At Admizz Education, we offer expert-led test
                preparation services designed to help students improve scores
                with confidence and clarity.
              </p>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-6">
                We provide comprehensive coaching for IELTS, PTE, TOEFL, and
                other required exams. Students benefit from regular mock tests,
                detailed performance analysis, and personalized feedback,
                ensuring steady improvement at every stage.
              </p>
              <Link
                href="/test-prep"
                className="inline-block bg-yellow text-black font-semibold text-[15px] px-6 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Book your free test assessment today
              </Link>
            </div>

            {/* Visa Assistance */}
            <div className="bg-white border border-border-light rounded-[10px] p-8">
              <h2 className="text-xl font-bold text-navy mb-4">
                Study Abroad Visa Assistance from Nepal
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-4">
                Study abroad visa assistance is a critical step in turning your
                overseas education dream into reality. At Admizz Education, we
                provide reliable and professional visa assistance from Nepal,
                ensuring a smooth and stress-free process.
              </p>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-6">
                Our experienced visa experts guide you through every
                requirement, including documentation, financial statements, and
                application accuracy. We also offer interview preparation and
                pre-departure guidance, so you feel confident at every stage.
              </p>
              <Link
                href="/register"
                className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-6 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
              >
                Contact Admizz for expert visa guidance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ items={faqItems} sidebar />

      <TestimonialsBento
        testimonials={testimonialData}
        videoId="AW3Zmubc-tU"
        featuredStudent={{ name: "Ashok Upreti", subtitle: "Bachelor in Computer Science" }}
      />

      <StudyAbroadInsights posts={blogPosts} countryName="Nepal" categorySlug="nepal" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-br from-navy via-blue-dark to-blue-royal text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold mb-4">
            Start Your Study Abroad Journey with Admizz Education
          </h2>
          <p className="text-[15px] text-white/90 leading-relaxed mb-8">
            Your future deserves expert guidance. Therefore, take the first step
            today. Let Admizz Education, the best education consultancy in
            Nepal, be your trusted partner on this exciting journey.
          </p>
          <Link
            href="/register"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \"<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \\\"<div class=\\\\\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\\\\\">\\\\n  <section class=\\\\\\\"gap-2.5\\\\\\\">\\\\n    <h2 class=\\\\\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\\\\\">Admizz Education vs Competitors</h2>\\\\n    <div class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\"><p class=\\\\\\\"text-sm md:text-base mb-3 opacity-90\\\\\\\">When exploring education consultancy options in Nepal, it's crucial to understand how Admizz Education stands apart. Here we compare Admizz Education with two notable competitors to highlight unique strengths and services.</p><div class=\\\\\\\"overflow-x-auto\\\\\\\"><table class=\\\\\\\"w-full border-collapse\\\\\\\"><thead><tr><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Feature</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">Alternative</th><th class=\\\\\\\"text-left px-4 py-3 text-sm font-semibold text-navy border border-[#ddd]\\\\\\\">This Option</th></tr></thead><tbody><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Personalized Career Counseling</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Generic assessments lacking personalized consideration.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">One-to-one guidance tailored to academic profiles and goals</td></tr><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">International Partnerships</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Limited partnerships with few international universities.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Strong collaborations with over 100 partner institutions worldwide</td></tr><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Visa Success Rate</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Lower success rates with minimal guidance on visa processes.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">High visa approval rate due to expert documentation support</td></tr><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Scholarship Assistance</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Basic information about scholarships without application assistance.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Comprehensive support for various scholarships to ease financial burdens</td></tr><tr><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Transparency in Guidance</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">Lacks transparency, potentially leading to unexpected costs.</td><td class=\\\\\\\"px-4 py-3 text-sm text-navy font-medium border border-[#ddd]\\\\\\\">No hidden charges and honest advice throughout the process</td></tr></tbody></table></div></div>\\\\n  </section>\\\\n</div>\\\" }} />\\n<div class=\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\\\">\\n  <section class=\\\"gap-2.5\\\">\\n    <h2 class=\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\">Last Updated</h2>\\n    <div class=\\\"text-sm md:text-base mb-3 opacity-90\\\"><p class=\\\"text-sm md:text-base mb-3 opacity-90\\\">This page was last updated on 2026-09-20.</p></div>\\n  </section>\\n</div>\" }} />\n<div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">About the Author</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">By the Admizz Education Team</p></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}

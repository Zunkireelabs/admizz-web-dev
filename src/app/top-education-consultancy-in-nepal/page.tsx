import Image from "next/image";
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
  title: "Top Education Consultancy in Nepal - Admizz Education",
  description:
    "Admizz Education, the top education consultancy in Nepal, offers study abroad guidance, test prep, scholarships & visa support",
  alternates: {
    canonical: "https://admizzeducation.com/top-education-consultancy-in-nepal",
  },
  openGraph: {
    title: "Top Education Consultancy in Nepal - Admizz Education",
    description:
      "Admizz Education, the top education consultancy in Nepal, offers study abroad guidance, test prep, scholarships & visa support",
    url: "https://admizzeducation.com/top-education-consultancy-in-nepal",
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
    title: "End-to-End Assistance",
    description:
      "From admission applications to scholarship assistance and visa interviews, we cover everything so you can focus on your goals.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Personalized Counselling",
    description:
      "Every student receives tailored counselling based on strengths, career goals, and financial background for the best-fit pathway.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "University Partnerships",
    description:
      "Our strong connections with top universities worldwide open doors to endless opportunities for your academic journey.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    title: "Transparent Process",
    description:
      "We maintain complete honesty, offering ethical guidance without hidden charges so you always know where you stand.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Experienced Visa Experts",
    description:
      "With a strong record of successful visas, our experts review documentation and guide you through every step of the process.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: "Scholarship Guidance",
    description:
      "We help you identify scholarships and prepare strong applications to reduce your financial burden and maximize opportunities.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const testPreps = [
  {
    name: "IELTS",
    description: "International English Language Testing System for university admissions and immigration.",
  },
  {
    name: "GRE",
    description: "Graduate Record Examination for postgraduate program admissions worldwide.",
  },
  {
    name: "TOEFL",
    description: "Test of English as a Foreign Language accepted by thousands of universities globally.",
  },
  {
    name: "PTE",
    description: "Pearson Test of English Academic for study abroad and immigration purposes.",
  },
  {
    name: "SAT",
    description: "Standardized test for undergraduate college admissions in the United States.",
  },
  {
    name: "Duolingo",
    description: "Convenient, affordable English proficiency test accepted by many institutions worldwide.",
  },
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
    question: "How long does the study abroad process usually take?",
    answer:
      "Depending on the country and university, the process usually takes 4-12 weeks. Our counsellors help you plan ahead to meet all deadlines comfortably.",
  },
  {
    question: "Can I apply for scholarships with your guidance?",
    answer:
      "Yes, we guide you in identifying scholarships and preparing strong applications. Our team has helped students secure over $2M in scholarships to date.",
  },
  {
    question: "What happens if my visa application is refused?",
    answer:
      "We review the feedback, improve your documentation, and assist with re-application. Our 95% visa approval rate reflects our thorough preparation process.",
  },
  {
    question: "Do you provide guidance after reaching my destination?",
    answer:
      "Absolutely. We conduct pre-departure sessions and assist with travel and settlement advice so you feel confident from day one.",
  },
  {
    question: "Which countries are most popular for Nepali students?",
    answer:
      "USA, UK, Canada, Australia, and India are among the top choices. We help you evaluate each destination based on your goals and budget.",
  },
  {
    question: "Do I need to take an English proficiency test?",
    answer:
      "Most universities require IELTS, TOEFL, or PTE. We provide complete preparation support including personalized coaching and practice tests.",
  },
  {
    question: "How do I know which course is right for me?",
    answer:
      "Our counsellors assess your academic background, career goals, and budget to recommend the best fit. We consider multiple factors to find your ideal program.",
  },
  {
    question: "Is there an age limit for studying abroad?",
    answer:
      "Generally, there is no strict limit, but requirements vary by country and program. Our team can advise you based on your specific circumstances.",
  },
  {
    question: "How much does studying abroad typically cost?",
    answer:
      "Costs vary depending on the destination, program, and university. We also guide you on scholarships and financial aid to reduce expenses significantly.",
  },
  {
    question: "Do you help with part-time job information abroad?",
    answer:
      "Yes, we provide guidance on work opportunities and regulations in your chosen destination, helping you plan your finances while studying.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function TopEducationConsultancyInNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "nepal" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Nepal&apos;s Trusted Study Abroad Partner
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Top Education Consultancy in Nepal
              </h1>
              <p className="mt-4 text-[15px] md:text-base text-white/90 leading-relaxed">
                Admizz Education provides expert guidance for studying abroad &mdash;
                from university selection and application support to visa assistance
                and scholarship counselling.
              </p>
              <Link
                href="/register"
                className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Talk to an Expert Counsellor for FREE
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

      {/* ===== INTRO CONTENT ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="hidden md:flex justify-center">
              <Image
                src="/images/seo-pages/student-hero.webp"
                alt="Study abroad with Admizz Education"
                width={450}
                height={500}
                className="rounded-2xl"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-6">
                Turn Your Study Abroad Dreams into Reality
              </h2>
              <div className="space-y-4 text-[15px] text-gray-dark leading-relaxed">
                <p>
                  If you are dreaming of pursuing higher studies abroad,{" "}
                  <strong className="text-navy">Admizz Education</strong> is here to
                  guide you every step of the way. Recognized as the{" "}
                  <strong className="text-navy">
                    top education consultancy in Nepal
                  </strong>
                  , we specialize in helping students unlock international
                  opportunities by providing professional counselling, university
                  selection, application support, visa guidance, and pre-departure
                  briefings.
                </p>
                <p>
                  Unlike many agencies, our approach is not limited to paperwork. We
                  focus on understanding your academic background, career goals, and
                  personal preferences to create a pathway that matches your
                  ambitions. From choosing the right study destination to settling
                  into a new country, we make the process smoother and more
                  achievable.
                </p>
                <p>
                  With Admizz Education, your journey is not just about studying
                  abroad &mdash; it is about shaping a brighter future with
                  confidence and clarity.
                </p>
              </div>
              <Link
                href="/register"
                className="inline-block mt-8 bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
              >
                Get a Free Counselling Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Why Choose Admizz Education?
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Choosing the right consultancy can make all the difference in your
            study abroad journey. Here&apos;s why thousands of students trust
            Admizz Education, Nepal&apos;s top education consultancy.
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
            Study Abroad Destinations
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Studying abroad is more than just academics &mdash; it&apos;s about
            experiencing new cultures, building global networks, and expanding
            your horizons. We proudly guide students to leading study
            destinations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEST PREP ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Go Global with Your Test Preparation
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Strong exam results play a crucial role in securing admission
            abroad. Admizz Education offers specialized test preparation
            programs designed to build your confidence and improve your scores.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testPreps.map((test) => (
              <div
                key={test.name}
                className="bg-white border border-border-light rounded-[10px] p-6 text-center"
              >
                <div className="w-14 h-14 bg-blue-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-blue-royal">
                    {test.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {test.name}
                </h3>
                <p className="text-sm text-gray-dark leading-relaxed">
                  {test.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/test-prep"
              className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
            >
              Explore Test Preparation Programs
            </Link>
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
            Begin Your Journey with Admizz
          </h2>
          <p className="text-[15px] text-white/90 leading-relaxed mb-4">
            At Admizz Education, we believe that every student deserves the
            right guidance to achieve their international education goals.
            Whether you need help selecting the right university, preparing for
            exams, applying for scholarships, or navigating visa requirements,
            our experienced counsellors are just a call away.
          </p>
          <p className="text-[15px] text-white/90 leading-relaxed mb-8">
            Your dream of studying abroad is closer than you think. Let Admizz
            Education, the top education consultancy in Nepal, be your trusted
            partner on this exciting journey.
          </p>
          <Link
            href="/register"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    
{/* SEOAI:EXPANDEDCONTENT:START */}<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \"<!-- SEOAI:FOCUS:author-byline --><div class=\\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0 seoai-content-section--compact\\\">\\n  <section class=\\\"gap-2.5\\\">\\n    <h2 class=\\\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\\\">About the Author</h2>\\n    <div class=\\\"text-sm md:text-base mb-3 opacity-90\\\"><p class=\\\"text-sm md:text-base mb-3 opacity-90\\\">By the Admizz Education Team</p></div>\\n  </section>\\n</div>\" }} />\n<!-- SEOAI:FOCUS:comparison-content --><div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-0\">\n  <section class=\"gap-2.5\">\n    <h2 class=\"text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight uppercase\">Admizz Education vs. Competitors in Study Abroad Consultancy</h2>\n    <div class=\"text-sm md:text-base mb-3 opacity-90\"><p class=\"text-sm md:text-base mb-3 opacity-90\">While Admizz Education is recognized as the top education consultancy in Nepal, it's vital to see how it stacks up against other players in the market. This comparison highlights the unique strengths of Admizz compared to its competitors, focusing on essential services that prospective students should consider.</p></div>\n  </section>\n</div>" }} />{/* SEOAI:EXPANDEDCONTENT:END */}
</main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import FAQ from "@/components/ui/FAQ";
import type { FAQItem } from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Best Education Consultancy for Study Abroad - Admizz Education",
  description:
    "Admizz Education \u2013 Best Education Consultancy for Study Abroad. Expert guidance, test prep & visa support for USA, UK, Canada & more.",
  alternates: {
    canonical: "https://admizzeducation.com/best-education-consultancy-for-study-abroad/",
  },
  openGraph: {
    title: "Best Education Consultancy for Study Abroad - Admizz Education",
    description:
      "Admizz Education \u2013 Best Education Consultancy for Study Abroad. Expert guidance, test prep & visa support for USA, UK, Canada & more.",
    url: "https://admizzeducation.com/best-education-consultancy-for-study-abroad/",
    siteName: "Admizz Education",
    images: ["/images/og/flag-of-australia.png"],
    type: "website",
  },
};

const stats = [
  { value: "1500+", label: "Students Successfully Enrolled" },
  { value: "95%", label: "Visa Approval Rate" },
  { value: "$2M+", label: "Scholarships Secured" },
];

const services = [
  {
    title: "Tailored Career Guidance",
    description:
      "Personalized advice matching your aspirations with the right courses and destinations based on your academic background and career goals.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Strong University Partnerships",
    description:
      "Direct access to leading global institutions through established relationships with universities across the USA, UK, Canada, Australia, and more.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    title: "Transparent & Honest Process",
    description:
      "Clear step-by-step procedures with no hidden costs or misleading promises. We believe in building trust through complete transparency.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Visa & Documentation Expertise",
    description:
      "Specialized support navigating complex visa processes and required paperwork, ensuring timely and successful applications every time.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Comprehensive Support System",
    description:
      "Full-spectrum assistance from university selection and application through scholarship guidance, test prep, and pre-departure arrangements.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Proven Success Stories",
    description:
      "With over 1,500 students placed in top universities worldwide and a 95% visa approval rate, our track record speaks for itself.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const destinations = [
  {
    country: "Australia",
    href: "/study-in-australia",
    description: "Globally ranked universities, research facilities, and post-study work opportunities.",
    flag: "AU",
  },
  {
    country: "Canada",
    href: "/study-in-canada",
    description: "Affordable education, multicultural communities, and permanent residency pathways.",
    flag: "CA",
  },
  {
    country: "Denmark",
    href: "/study-in-denmark",
    description: "Innovation-driven education with cutting-edge research and Scandinavian quality of life.",
    flag: "DK",
  },
  {
    country: "Dubai",
    href: "/study-in-dubai",
    description: "A modern education hub in a rapidly growing global economy.",
    flag: "AE",
  },
  {
    country: "France",
    href: "/study-in-france",
    description: "World-renowned programs in arts, fashion, business, and technology.",
    flag: "FR",
  },
  {
    country: "India",
    href: "/study-in-india",
    description: "Affordable education options in a diverse and culturally rich environment.",
    flag: "IN",
  },
  {
    country: "New Zealand",
    href: "/study-in-newzealand",
    description: "Safe, welcoming campuses with career-oriented education and stunning natural beauty.",
    flag: "NZ",
  },
  {
    country: "South Korea",
    href: "/study-in-south-korea",
    description: "Technology-driven education system with cultural richness and innovation.",
    flag: "KR",
  },
  {
    country: "United Kingdom",
    href: "/study-in-the-uk",
    description: "Prestigious centuries-old institutions with globally recognized qualifications.",
    flag: "GB",
  },
  {
    country: "United States",
    href: "/study-in-the-usa",
    description: "Top research universities, unmatched innovation, and global career opportunities.",
    flag: "US",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What services does Admizz Education provide?",
    answer:
      "Admizz Education provides end-to-end study abroad support including career counselling, course and country selection, university applications, documentation assistance, scholarship guidance, visa support, and pre-departure orientation to ensure a smooth transition to your chosen destination.",
  },
  {
    question: "How do I know which country is best suited for my goals?",
    answer:
      "Our expert counsellors conduct a thorough assessment of your academic background, budget, career aspirations, and personal preferences to recommend the most suitable study destinations. We consider factors such as program availability, scholarship opportunities, post-study work options, and immigration pathways.",
  },
  {
    question: "Is the initial counselling session free of charge?",
    answer:
      "Yes, the initial counselling session at Admizz Education is completely complimentary. During this session, our advisors will understand your goals, answer your questions, and outline a personalized roadmap. Certain specialized services may involve fees, which are communicated transparently upfront.",
  },
  {
    question: "Which countries can I study in through Admizz Education?",
    answer:
      "We support students looking to study in the USA, UK, Canada, Australia, New Zealand, France, Denmark, Dubai, South Korea, India, and several other destinations. Our partnerships with 100+ institutions worldwide ensure you have access to a wide range of programs and universities.",
  },
  {
    question: "What documents are typically required for a study abroad application?",
    answer:
      "Common documents include academic transcripts, a valid passport, Statement of Purpose (SOP), Letters of Recommendation (LORs), proof of financial support, and standardized test scores such as IELTS or TOEFL. Exact requirements vary by institution and country, and our team guides you through every step.",
  },
  {
    question: "Does Admizz Education help with scholarship applications?",
    answer:
      "Absolutely. We actively match students with scholarship opportunities based on their profile, academic achievements, and chosen programs. Our team assists with identifying suitable scholarships, preparing applications, and crafting compelling essays to maximize your chances of receiving financial aid.",
  },
  {
    question: "How long does the study abroad application process take?",
    answer:
      "The typical processing timeline ranges from 2 to 6 months depending on the destination country, the university intake period, and the complexity of your application. We recommend starting at least 6-8 months before your intended intake to allow ample time for test preparation, applications, and visa processing.",
  },
  {
    question: "What kind of visa support does Admizz Education offer?",
    answer:
      "We provide comprehensive visa assistance including document preparation, financial verification guidance, application form review, and mock interview sessions to prepare you for consular interviews. Our 95% visa approval rate reflects the thoroughness and expertise of our visa support team.",
  },
  {
    question: "Can I work part-time while studying abroad?",
    answer:
      "Most popular study destinations such as the USA, UK, Canada, Australia, and New Zealand permit international students to work part-time during their studies, typically up to 20 hours per week during term and full-time during breaks. Our counsellors provide country-specific guidance on work regulations and opportunities.",
  },
  {
    question: "How do I get started with Admizz Education?",
    answer:
      "Getting started is simple. Book a free counselling session through our website or contact us directly. Share your academic details and aspirations, and our experts will create a personalized step-by-step plan covering university selection, test preparation, applications, visa processing, and pre-departure support.",
  },
];

export default function BestEducationConsultancyPage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-navy to-blue-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-wider mb-3 text-yellow">
            Your Trusted Study Abroad Partner
          </p>
          <h1 className="text-3xl md:text-[42px] font-bold leading-tight max-w-4xl mx-auto">
            Best Education Consultancy for Study Abroad
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium text-white/90 max-w-2xl mx-auto">
            Trusted Guidance for Global Education, Admissions, and Career Success
          </p>
          <Link
            href="/register/"
            className="inline-block mt-8 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-blue-royal py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-yellow">{stat.value}</p>
              <p className="mt-1 text-sm text-white/90 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-6">
            Turn Your Study Abroad Dreams into Reality
          </h2>
          <p className="text-[15px] text-gray-dark leading-relaxed max-w-3xl mx-auto">
            Admizz Education is a premier overseas education consultancy specializing in guiding
            students through every step of the study abroad journey. Whether you are seeking
            world-class learning, global exposure, or career-defining opportunities, we are here to
            make it happen. From program selection and document preparation to visa assistance and
            scholarship guidance, our experienced counsellors have helped thousands of students
            secure placements in top universities across the globe. We believe in transparency,
            integrity, and personalized support -- because your future deserves nothing less.
          </p>
          <Link
            href="/register/"
            className="inline-block mt-8 bg-blue-royal text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
          >
            Start Your Application with Admizz
          </Link>
        </div>
      </section>

      {/* ===== SERVICES / WHAT MAKES US THE BEST ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            What Makes Admizz Education the Best Consultancy?
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            We combine deep industry expertise with a student-first approach to deliver results
            that truly matter.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-border-light rounded-[10px] p-8 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-navy mb-2">{service.title}</h3>
                <p className="text-sm text-gray-dark leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STUDY DESTINATIONS ===== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Study Abroad Destinations with Admizz Education
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Explore top study destinations across the globe. Each country offers unique academic
            programs, cultural experiences, and career pathways tailored to your goals.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {destinations.map((dest) => (
              <Link
                key={dest.country}
                href={dest.href}
                className="group bg-white border border-border-light rounded-[10px] p-6 hover:border-blue-royal hover:shadow-md transition-all"
              >
                <span className="text-3xl mb-3 block" role="img" aria-label={`${dest.country} flag`}>
                  {dest.flag === "AU" && "\uD83C\uDDE6\uD83C\uDDFA"}
                  {dest.flag === "CA" && "\uD83C\uDDE8\uD83C\uDDE6"}
                  {dest.flag === "DK" && "\uD83C\uDDE9\uD83C\uDDF0"}
                  {dest.flag === "AE" && "\uD83C\uDDE6\uD83C\uDDEA"}
                  {dest.flag === "FR" && "\uD83C\uDDEB\uD83C\uDDF7"}
                  {dest.flag === "IN" && "\uD83C\uDDEE\uD83C\uDDF3"}
                  {dest.flag === "NZ" && "\uD83C\uDDF3\uD83C\uDDFF"}
                  {dest.flag === "KR" && "\uD83C\uDDF0\uD83C\uDDF7"}
                  {dest.flag === "GB" && "\uD83C\uDDEC\uD83C\uDDE7"}
                  {dest.flag === "US" && "\uD83C\uDDFA\uD83C\uDDF8"}
                </span>
                <h3 className="text-[15px] font-bold text-navy group-hover:text-blue-royal transition-colors">
                  Study in {dest.country}
                </h3>
                <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                  {dest.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="bg-off-white">
        <FAQ items={faqItems} title="Everything You Need to Know" />
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-navy to-blue-dark text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">
            Ready to Begin Your Study Abroad Journey?
          </h2>
          <p className="mt-4 text-[15px] text-white/90 leading-relaxed max-w-xl mx-auto">
            Join over 1,500 students who have achieved their dream of studying at top universities
            worldwide. Book your free counselling session today and take the first step toward a
            brighter future.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register/"
              className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
            >
              Talk to Our Study Abroad Experts
            </Link>
            <Link
              href="/contact/"
              className="inline-block bg-white/10 text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] border border-white/30 hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

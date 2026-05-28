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
  title: "Education Consultancy in Kathmandu - Admizz Education",
  description:
    "Admizz Education is a leading education consultancy in Kathmandu – trusted study abroad experts with proven results for UK, USA, Australia, Canada & Europe.",
  alternates: {
    canonical: "https://admizzeducation.com/education-consultancy-in-kathmandu",
  },
  openGraph: {
    title: "Education Consultancy in Kathmandu - Admizz Education",
    description:
      "Admizz Education is a leading education consultancy in Kathmandu – trusted study abroad experts with proven results for UK, USA, Australia, Canada & Europe.",
    url: "https://admizzeducation.com/education-consultancy-in-kathmandu",
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

const whatWeOffer = [
  "Personalised counselling based on academic background",
  "Country-specific university shortlisting",
  "Clear explanation of visa and financial requirements",
  "Honest advice on success probability",
];

const ourExperience = [
  "Admission criteria of international universities",
  "Visa officer expectations",
  "Common rejection reasons",
  "Scholarship eligibility frameworks",
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

const testPreps = [
  "IELTS, TOEFL, and Duolingo",
  "GRE and GMAT",
  "PTE and other English tests",
];

const visaSupport = [
  "Financial documentation verification",
  "Sponsor and fund explanation",
  "SOP alignment with visa intent",
  "Mock visa interview sessions",
  "Country-specific visa checklists",
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
    question: "Which is the best education consultancy in Kathmandu for studying abroad?",
    answer:
      "Admizz Education is one of the best education consultancies in Kathmandu, known for transparent guidance, high visa success rates, and expert counselling for the UK, USA, Australia, Canada, and Europe. Their team provides end-to-end support, from course selection to visa approval.",
  },
  {
    question: "What services does Admizz Education provide?",
    answer:
      "Admizz Education offers study abroad counselling, university admissions, visa processing, test preparation (IELTS, PTE, SAT, GRE), SOP guidance, and scholarship assistance. Additionally, students receive pre-departure and post-visa support.",
  },
  {
    question: "Does Admizz Education help with UK, USA, and Australia study visas?",
    answer:
      "Yes. Admizz Education specializes in UK, USA, Australia, Canada, and European student visas. Each application is handled by experienced counsellors who ensure compliance with embassy requirements and university guidelines.",
  },
  {
    question: "What are the IELTS requirements to study abroad?",
    answer:
      "IELTS requirements vary by country and university. Generally: UK: 6.0–6.5 overall, USA: 6.5–7.0 overall, Australia: 6.0–6.5 overall. Admizz Education also helps assess IELTS waivers, alternative tests, and retake strategies.",
  },
  {
    question: "Can I study abroad without IELTS?",
    answer:
      "Yes, in some cases. Several universities offer IELTS waivers based on prior English-medium education or accept alternatives like Duolingo or PTE. Admizz Education evaluates your profile and recommends the best pathway.",
  },
  {
    question: "How much does an education consultancy charge in Kathmandu?",
    answer:
      "Most reputed consultancies, including Admizz Education, offer free counselling. Service fees may apply only for optional test preparation or premium support, which is always explained transparently.",
  },
  {
    question: "What documents are required for a student visa from Nepal?",
    answer:
      "Common student visa documents include: Academic transcripts, Offer letter (CAS / I-20), IELTS or test score (if applicable), Financial proof, SOP and recommendation letters. Admizz Education ensures accurate documentation to minimize visa rejections.",
  },
  {
    question: "How long does the study abroad application process take?",
    answer:
      "The process typically takes 3 to 6 months, depending on intake deadlines, visa processing time, and document readiness. Starting early improves admission and scholarship chances.",
  },
  {
    question: "Why should I choose Admizz Education over other consultancies?",
    answer:
      "Admizz Education stands out due to certified counsellors, ethical practices, university tie-ups, personalized guidance, and proven student success stories. Their student-first approach aligns with global education standards.",
  },
  {
    question: "How can I book a free consultation with Admizz Education in Kathmandu?",
    answer:
      "You can easily book a free one-on-one counselling session by visiting Admizz Education's website, calling the Kathmandu office, or submitting the online enquiry form. Expert counsellors will guide you step by step.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function EducationConsultancyInKathmanduPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "nepal" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Trusted Study Abroad Experts with Proven Results
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Education Consultancy in Kathmandu
              </h1>
              <p className="mt-4 text-[15px] md:text-base text-white/90 leading-relaxed">
                If you are searching for a reliable education consultancy in
                Kathmandu, it&apos;s important to choose a team with real
                experience, verified expertise, and transparent guidance. Admizz
                Education is a leading study abroad consultancy in Kathmandu,
                helping Nepali students successfully study in the USA, UK, Canada,
                Australia, Germany, and Europe through ethical counselling and
                structured processes.
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

      {/* ===== WHY TRUST ADMIZZ ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Why Students in Kathmandu Trust Admizz Education
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Studying abroad is not just about admissions&mdash;it&apos;s about
            long-term academic and career success. Therefore, students choose
            Admizz Education for clarity and consistency.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* What We Offer */}
            <div className="bg-white border border-border-light rounded-[10px] p-8">
              <h3 className="text-lg font-bold text-navy mb-4">What We Offer</h3>
              <ul className="space-y-3">
                {whatWeOffer.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-royal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[15px] text-gray-dark">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/about"
                  className="text-[15px] text-blue-royal font-semibold hover:underline"
                >
                  About Admizz Education &rarr;
                </Link>
              </div>
            </div>

            {/* Our Experience */}
            <div className="bg-white border border-border-light rounded-[10px] p-8">
              <p className="text-sm font-medium uppercase tracking-wider mb-2 text-blue-royal">
                Our Experience
              </p>
              <h3 className="text-lg font-bold text-navy mb-4">
                Supporting Nepali Students End-to-End
              </h3>
              <p className="text-[15px] text-gray-dark mb-4">
                With years of hands-on counselling experience, Admizz Education
                understands:
              </p>
              <ul className="space-y-3">
                {ourExperience.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-royal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[15px] text-gray-dark">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[15px] text-gray-dark mt-4">
                As a result, our students benefit from practical, outcome-driven
                guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Study Abroad Destinations We Specialise In
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Each country has unique admission rules, visa pathways, and work
            opportunities. Hence, our counsellors are trained country-wise.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Courses We Recommend Based on Career Outcomes
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Rather than promoting random programs, we guide students toward
            future-ready, in-demand courses.
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
                Test Preparation and Waiver Guidance
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-4">
                Many students ask whether IELTS, TOEFL, GRE, or GMAT are
                mandatory. The answer depends on the university and country.
                Admizz Education evaluates test requirements, waiver
                eligibility, and retake strategies based on your profile.
              </p>
              <p className="text-[15px] font-semibold text-navy mb-3">
                Exams We Support:
              </p>
              <ul className="space-y-2 mb-6">
                {testPreps.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-royal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[15px] text-gray-dark">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/test-prep"
                className="inline-block bg-yellow text-black font-semibold text-[15px] px-6 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                IELTS Preparation in Kathmandu
              </Link>
            </div>

            {/* Visa Assistance */}
            <div className="bg-white border border-border-light rounded-[10px] p-8">
              <h2 className="text-xl font-bold text-navy mb-4">
                Visa Assistance from Kathmandu
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-4">
                Visa approval is one of the most critical steps. Therefore, we
                focus heavily on compliance and preparation.
              </p>
              <p className="text-[15px] font-semibold text-navy mb-3">
                Our Visa Support Includes:
              </p>
              <ul className="space-y-2 mb-6">
                {visaSupport.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-royal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[15px] text-gray-dark">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="inline-block bg-blue-royal text-white font-semibold text-[15px] px-6 py-3 rounded-[10px] hover:bg-blue-dark transition-colors"
              >
                Student Visa Assistance from Nepal
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
            Start Your Global Education Journey Today with Admizz Education
          </h2>
          <p className="text-[15px] text-white/90 leading-relaxed mb-8">
            If you value experience, expertise, and transparency, Admizz
            Education is your trusted partner in Kathmandu.
          </p>
          <Link
            href="/register"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Book Free Counseling
          </Link>
        </div>
      </section>
    </main>
  );
}

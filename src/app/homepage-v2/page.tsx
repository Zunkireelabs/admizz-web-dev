import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CountryCard from "@/components/ui/CountryCard";
import HomepageReviews from "./HomepageReviews";
import HomepageFAQ from "./HomepageFAQ";
import UniversityPartners from "./UniversityPartners";

export const metadata: Metadata = {
  title: "Your Partner in Study Abroad - Admizz Education",
  description:
    "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success- all through one global portal.",
  robots: { index: false, follow: false },
};

/* This is the v2 preview page. The main homepage now uses the same design. */

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: "/images/icons/consult-108.webp",
    title: "Career Counselling",
    accent: "#1E6DEB",
    description:
      "Get personalized guidance from experienced counselors who understand global education opportunities and can help align your career goals.",
  },
  {
    icon: "/images/icons/scholarship-108.webp",
    title: "Scholarship Assistance",
    accent: "#3FB5A0",
    description:
      "Unlock financial aid opportunities with expert support in identifying and applying for scholarships tailored to your profile.",
  },
  {
    icon: "/images/icons/visa-108.webp",
    title: "Visa Support",
    accent: "#E86F3C",
    description:
      "Navigate the student visa application process with confidence through step-by-step guidance and documentation support.",
  },
  {
    icon: "/images/icons/accomodation-108.webp",
    title: "Post-Arrival Support",
    accent: "#BB5FEC",
    description:
      "Settle into your new country with ease — from accommodation to local orientation, we're with you beyond admission.",
  },
];

const destinations = [
  { name: "Study in the USA", image: "/images/destinations/usa1.webp", href: "/study-in-the-usa/" },
  { name: "Study in the UK", image: "/images/destinations/uk1.webp", href: "/study-in-the-uk/" },
  { name: "Study in Australia", image: "/images/destinations/aus1.webp", href: "/study-in-australia/" },
  { name: "Study in Canada", image: "/images/destinations/canada1.webp", href: "/study-in-canada/" },
  { name: "Study in India", image: "/images/destinations/india1.webp", href: "/study-in-india/" },
];

const testLogos = [
  { name: "IELTS", src: "/images/test-prep/IELTS_LOGO.webp" },
  { name: "GRE", src: "/images/test-prep/Untitled-design.webp" },
  { name: "TOEFL", src: "/images/test-prep/TOFEL_LOGO.webp" },
  { name: "PTE", src: "/images/test-prep/PTE_LOGO.webp" },
  { name: "SAT", src: "/images/test-prep/SAT.webp" },
  { name: "Duolingo", src: "/images/test-prep/duolingo-2.webp" },
];

const googleReviews = [
  {
    name: "Umesh Yadav",
    initial: "U",
    color: "#4285F4",
    text: "(1) Professional and supportive education consultancy services\n(2) Helpful guidance in study abroad applications\n(3) Strong support with test prep and admissions\n(4) Friendly and responsive staff",
  },
  {
    name: "ABADUL HAKIM",
    initial: "A",
    color: "#7B6B43",
    text: "Best consultancy experience with Admiz Education. Honest guidance and quick support. Thank you!",
  },
  {
    name: "Eddie Baum",
    initial: "E",
    color: "#0D9488",
    text: "Excellent consultancy with good staff ..!",
  },
  {
    name: "Surya Narayan Sah",
    initial: "S",
    color: "#6B7280",
    text: "Admizz Consultancy \u2013 Highly Recommended!\n\nAdmizz Consultancy in Kathmandu is professional, reliable, and truly student-focused. The team provides clear guidance, quick responses, and genuine support throughout the entire application and visa process.",
  },
  {
    name: "Dipchand Kalwar",
    initial: "D",
    color: "#7C3AED",
    text: "I had a great experience with Admizz. The team is very supportive, knowledgeable, and genuinely cares about guiding students in the right direction.",
  },
  {
    name: "Nabin Thagunna",
    initial: "N",
    color: "#DC2626",
    text: "Admizz Consultancy appears to be a well-presented education consultancy with an office in Putalisadak and a professional-looking website.",
  },
  {
    name: "Purnima Lama",
    initial: "P",
    color: "#059669",
    text: "Highly satisfied with Admizz Education! The counsellors are supportive, knowledgeable, and genuinely care about students.",
  },
  {
    name: "Sagar Acharya",
    initial: "S",
    color: "#D97706",
    text: "Admizz Education is truly one of the most reliable and student-friendly education consultancies. Their team is supportive, well-experienced, and always ready to guide you clearly at every step.",
  },
];

const faqItems = [
  {
    question: "1. What is Admizz Education and how does it help students study abroad?",
    answer:
      "Admizz Education is a global study-abroad platform that helps students find, apply, and secure admissions to top universities worldwide. From course shortlisting to application guidance, scholarships, SOP support, and visa processing, Admizz simplifies every step of the international education journey.",
  },
  {
    question: "2. Which countries can I apply to through Admizz Education?",
    answer:
      "You can apply to leading study-abroad destinations such as the USA, UK, Canada, Australia, New Zealand, India, Dubai, and other top European countries. Admizz provides end-to-end admission support for undergraduate, postgraduate, diploma, and pathway programs.",
  },
  {
    question: "3. Does Admizz Education help with university shortlisting?",
    answer:
      "Yes. Admizz uses expert counsellors and AI-assisted tools to shortlist universities that match your academic profile, preferred country, career goals, and budget. You receive a personalized list of universities with high acceptance chances.",
  },
  {
    question: "4. Can Admizz assist with SOP, LOR, and application documents?",
    answer:
      "Absolutely. Admizz provides professional guidance for SOPs, LORs, resumes, essays, and application forms. The team ensures your documents meet global university standards and increase your chances of admission.",
  },
  {
    question: "5. Does Admizz help students with scholarships and fee waivers?",
    answer:
      "Yes. Admizz identifies eligible scholarship opportunities based on your academic performance, program selection, and country preferences. You also receive support for university fee waivers and financial documentation for visa applications.",
  },
  {
    question: "6. What is the process to apply for a study-abroad program through Admizz Education?",
    answer:
      "The process includes: 1. Profile evaluation 2. Course and country selection 3. University shortlisting 4. Application submission 5. Document preparation 6. Offer letter guidance 7. Visa application support 8. Pre-departure assistance. Admizz makes the entire process fast, transparent, and stress-free.",
  },
  {
    question: "7. Does Admizz provide visa guidance for international students?",
    answer:
      "Yes. Admizz offers end-to-end visa support including document preparation, financial planning, interview training, and step-by-step guidance to ensure a smooth and successful student visa application.",
  },
  {
    question: "8. Is Admizz Education free for students?",
    answer:
      "Admizz offers free counselling and guidance for many services. Some specialized services—like premium documentation, fast-track applications, and certain country-specific processing—may involve additional charges. Students are always informed upfront.",
  },
  {
    question: "9. How long does it take to get admission through Admizz Education?",
    answer:
      "The timeline depends on the country, intake, university, and program. Typically, the entire admission cycle—shortlisting, application submission, and receiving an offer—takes 2 to 12 weeks. Early applicants usually receive faster decisions.",
  },
  {
    question: "10. Why should I choose Admizz Education over other study-abroad consultancies?",
    answer:
      "Admizz combines expert counsellors with advanced technology to offer accurate university matches, faster processing, transparent workflows, and a higher visa success rate. Students benefit from personalized support, global partner universities, and a seamless digital platform.",
  },
];

const allUniversities = [
  // UK
  { name: "Buckinghamshire New University", logo: "/images/universities/uk/Buckinghamshire-New-University.webp" },
  { name: "BPP University", logo: "/images/universities/uk/BPP-University.webp" },
  { name: "Coventry University", logo: "/images/universities/uk/Coventry-University.webp" },
  { name: "Health Sciences University", logo: "/images/universities/uk/Health-Sciences-University.webp" },
  { name: "Ravensbourne University London", logo: "/images/universities/uk/Ravensbourne-University-London.webp" },
  { name: "University of Sunderland", logo: "/images/universities/uk/University-of-Sunderland.webp" },
  { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.webp" },
  { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.webp" },
  { name: "University of Greenwich", logo: "/images/universities/uk/University-of-Greenwich.webp" },
  { name: "The University of Law", logo: "/images/universities/uk/The-University-of-Law.webp" },
  { name: "University of Roehampton", logo: "/images/universities/uk/University-of-Roehampton.webp" },
  { name: "University of Worcester", logo: "/images/universities/uk/University-of-Worcester.webp" },
  { name: "University of West London", logo: "/images/universities/uk/University-of-West-London.webp" },
  { name: "University of the West of Scotland", logo: "/images/universities/uk/University-of-the-West-of-Scotland.webp" },
  { name: "York St John University", logo: "/images/universities/uk/York-St-John-University.webp" },
  // USA
  { name: "Colorado State University", logo: "/images/universities/usa/COLORADO.webp" },
  { name: "Webster University", logo: "/images/universities/usa/webster-1.webp" },
  { name: "Avila University", logo: "/images/universities/usa/AVILA.webp" },
  { name: "Concordia University", logo: "/images/universities/usa/CONCORDIA.webp" },
  { name: "Southeast Missouri State", logo: "/images/universities/usa/SOUTHEAST-MISSOURI.webp" },
  { name: "Herzing University", logo: "/images/universities/usa/HERZING.webp" },
  { name: "Wright State University", logo: "/images/universities/usa/WRIGHT-STATE.webp" },
  { name: "Washington University", logo: "/images/universities/usa/WASHINGTON.webp" },
  { name: "Texas State University", logo: "/images/universities/usa/TEXAS.webp" },
  { name: "Murray State University", logo: "/images/universities/usa/MURRAY.webp" },
  { name: "Youngstown State University", logo: "/images/universities/usa/YOUNGSTOWN.webp" },
  { name: "University of Central Arkansas", logo: "/images/universities/usa/CENTRAL-ARKANSAS.webp" },
  { name: "Dakota State University", logo: "/images/universities/usa/DAKOTA-STATE.webp" },
  { name: "University of South Dakota", logo: "/images/universities/usa/UNIVERSITY-F-SOUTH-DAKOTA.webp" },
  { name: "Pacific Oaks College", logo: "/images/universities/usa/PACIFIC.webp" },
  { name: "Bethesda University", logo: "/images/universities/usa/BETHESDA.webp" },
  { name: "St. Cloud State University", logo: "/images/universities/usa/ST-CLOUD.webp" },
  { name: "South Dakota State University", logo: "/images/universities/usa/South.webp" },
  { name: "Post University", logo: "/images/universities/usa/POST.webp" },
  { name: "Northwest Missouri State", logo: "/images/universities/usa/NORTHWEST.webp" },
  { name: "University of Central Missouri", logo: "/images/universities/usa/university-f.webp" },
  { name: "Minnesota State University", logo: "/images/universities/usa/MINNESOTA-STATE.webp" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function HomepageV2() {
  return (
    <main style={{ fontFamily: "'Open Sans', var(--font-opensans), sans-serif" }}>
      {/* Scoped: headings use Montserrat, body uses Open Sans */}
      <style>{`
        main h1, main h2, main h3 {
          font-family: 'Montserrat', var(--font-montserrat), sans-serif;
        }
      `}</style>

      {/* ===== 1. HERO — Diamond photo collage ===== */}
      <section className="py-6 md:py-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[32px] px-6 sm:px-10 lg:px-12 py-14 md:py-20 overflow-hidden"
            style={{ background: "#EEF2FF" }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left — Text */}
            <div className="relative z-10">
              <p className="text-[15px] mb-5" style={{ color: "#5a6275" }}>
                Your Vision, Our Fulfillment – Helping You Achieve Your Dreams
              </p>
              <h1 className="text-[36px] md:text-[50px] font-bold leading-[1.1] mb-6" style={{ color: "#0D1282" }}>
                Start Your Study Abroad{" "}
                <span style={{ color: "#1E6DEB" }}>Journey With Admizz!</span>
              </h1>
              <p className="text-[16px] leading-[1.75] mb-10 max-w-[460px]" style={{ color: "#5a6275" }}>
                Explore 100+ global universities and colleges.
                Submit your best possible application with a 95%
                visa success rate. Unlock your full potential with
                Admizz Education!
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 font-semibold text-[16px] px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#FCB730", color: "#0D1282" }}
              >
                Register as a Student
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right — Hero composite image */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/hero/web-ad.webp"
                alt="Study abroad with Admizz — student surrounded by world landmarks"
                width={580}
                height={580}
                priority
                className="w-full max-w-[520px] h-auto"
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. SERVICES — Premium feature cards ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            Our Services
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-4" style={{ color: "#0D1282" }}>
            Plan Your Study Abroad Journey
          </h2>
          <p className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "#5a6275" }}>
            End-to-end support from career counselling to post-arrival — we guide
            you through every step.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
                style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
              >
                {/* Colored top accent bar */}
                <div className="h-[4px]" style={{ background: service.accent }} />
                <div className="p-8">
                  <div
                    className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                    style={{ background: `${service.accent}14` }}
                  >
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-[18px] font-bold mb-3"
                    style={{ color: service.accent }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[14px] leading-[1.7]" style={{ color: "#5a6275" }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. STUDY DESTINATIONS ===== */}
      <section className="py-16 md:py-20" style={{ background: "#F8F9FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            Explore Destinations
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-4" style={{ color: "#0D1282" }}>
            Find Your Perfect Study Country
          </h2>
          <p className="text-center text-[15px] max-w-2xl mx-auto mb-12" style={{ color: "#5a6275" }}>
            Discover top international study destinations and take confident steps
            toward a successful education abroad.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} {...dest} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. TURNING DREAMS INTO REALITY ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3"
            style={{ color: "#1E6DEB" }}
          >
            Our Ecosystem
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-4" style={{ color: "#0D1282" }}>
            Turning Study Abroad Dreams Into Reality
          </h2>
          <p className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "#5a6275" }}>
            With innovative tech-powered admission solutions, Admizz Education
            is reshaping how students, colleges, and recruitment partners
            connect for smarter outcomes.
          </p>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Students */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#1E6DEB" }} />
              <div className="p-8">
                <div
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ background: "#1E6DEB12" }}
                >
                  <svg className="w-7 h-7" style={{ color: "#1E6DEB" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <h3 className="text-[20px] font-bold mb-3" style={{ color: "#0D1282" }}>
                  Students
                </h3>
                <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#5a6275" }}>
                  Get personalized guidance from experienced counselors at
                  Admizz Education for hassle-free university admissions abroad.
                  From course selection to visa processing — we&apos;re with you
                  at every step.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] transition-colors duration-200 hover:opacity-80"
                  style={{ color: "#1E6DEB" }}
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Colleges & Universities */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#3FB5A0" }} />
              <div className="p-8">
                <div
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ background: "#3FB5A012" }}
                >
                  <svg className="w-7 h-7" style={{ color: "#3FB5A0" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                  </svg>
                </div>
                <h3 className="text-[20px] font-bold mb-3" style={{ color: "#0D1282" }}>
                  Colleges &amp; Universities
                </h3>
                <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#5a6275" }}>
                  We bring the right people together to challenge conventional
                  thinking and drive transformation in international education
                  recruitment and enrollment.
                </p>
                <Link
                  href="/universities"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] transition-colors duration-200 hover:opacity-80"
                  style={{ color: "#3FB5A0" }}
                >
                  Explore Institutions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Recruitment Partners */}
            <div
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[4px]" style={{ background: "#E86F3C" }} />
              <div className="p-8">
                <div
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                  style={{ background: "#E86F3C12" }}
                >
                  <svg className="w-7 h-7" style={{ color: "#E86F3C" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h3 className="text-[20px] font-bold mb-3" style={{ color: "#0D1282" }}>
                  Recruitment Partners
                </h3>
                <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#5a6275" }}>
                  With powerful platforms for education consultants, Admizz
                  Education ensures students find the right institutions
                  easily and partners grow their network.
                </p>
                <Link
                  href="/recruitment-partners"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] transition-colors duration-200 hover:opacity-80"
                  style={{ color: "#E86F3C" }}
                >
                  Partner With Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Video + Accent Banner — 2-column row */}
          <div className="mt-12 grid md:grid-cols-[1.1fr_0.9fr] gap-7 items-stretch">
            {/* Left — Video */}
            <div
              className="rounded-2xl overflow-hidden aspect-video"
              style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
            >
              <iframe
                src="https://www.youtube.com/embed/VrIVEimhnFs"
                title="Welcome to Admizz Education"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Right — Accent card */}
            <div
              className="rounded-2xl px-8 py-8 md:py-10 flex flex-col justify-center"
              style={{ background: "linear-gradient(135deg, #1E6DEB 0%, #0D1282 100%)" }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ color: "#FCB730" }}>
                Why Admizz?
              </p>
              <h3 className="text-white font-bold text-[22px] md:text-[26px] leading-tight mb-4">
                We Are Not Just An Education Consultancy
              </h3>
              <p className="text-white/80 text-[15px] leading-[1.7] mb-8">
                We Are the Future of International Student Recruitment.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 font-bold text-[15px] px-7 py-3.5 rounded-lg self-start transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#FCB730", color: "#0D1282" }}
              >
                Start Your Journey
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. STATS — Trust banner ===== */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)" }}
      >
        {/* Subtle decorative orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #1E6DEB, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #3FB5A0, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.14em] text-center mb-3"
            style={{ color: "#FCB730" }}
          >
            Why Choose Us
          </p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-center text-white mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-center text-[15px] text-white/50 max-w-xl mx-auto mb-12">
            Our numbers speak for themselves — proven results that families and students trust.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "2,000+", label: "Students Successfully Enrolled", icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5", accent: "#1E6DEB" },
              { value: "100+", label: "Partner Universities & Colleges", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z", accent: "#3FB5A0" },
              { value: "95%", label: "Visa Approval Rate", icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#E86F3C" },
              { value: "$2M+", label: "Scholarships Awarded", icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#BB5FEC" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center rounded-2xl px-4 py-8 md:py-10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: `${stat.accent}20` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={stat.accent} strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <p className="text-[34px] md:text-[42px] font-bold text-white mb-2 leading-none">
                  {stat.value}
                </p>
                <p className="text-[12px] md:text-[13px] font-medium text-white/50 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TEST PREPARATION — 2-column ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-center">
            {/* Left — text + feature cards + CTA */}
            <div>
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-3"
                style={{ color: "#1E6DEB" }}
              >
                Test Preparation
              </p>
              <h2 className="text-[28px] md:text-[36px] font-bold leading-tight mb-5" style={{ color: "#0D1282" }}>
                Go Global with Your Test Preparation
              </h2>
              <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#5a6275" }}>
                Performing exceptionally in standardized exams is essential
                for securing admission to leading universities worldwide.
                Our personalized training programs equip students with the
                skills, strategies, and confidence to excel.
              </p>

              {/* Feature mini-cards */}
              <div className="space-y-3 mb-8">
                {[
                  {
                    title: "Personalized Coaching",
                    desc: "Expert 1-on-1 tutoring tailored to your learning style and target score.",
                    accent: "#1E6DEB",
                    icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
                  },
                  {
                    title: "Flexible Online Learning",
                    desc: "Study anytime, anywhere with live and recorded sessions.",
                    accent: "#3FB5A0",
                    icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25",
                  },
                  {
                    title: "Proven Score Improvement",
                    desc: "Data-driven strategies that consistently deliver higher scores.",
                    accent: "#E86F3C",
                    icon: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-4 bg-white rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[8px_13px_24px_8px_rgba(0,0,0,0.07)]"
                    style={{ boxShadow: "4px 6px 12px 4px rgba(0,0,0,0.04)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: `${f.accent}14` }}
                    >
                      <svg className="w-5 h-5" style={{ color: f.accent }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold mb-0.5" style={{ color: "#0D1282" }}>{f.title}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color: "#5a6275" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/test-prep"
                className="inline-flex items-center gap-2 font-semibold text-[15px] px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#FCB730", color: "#0D1282" }}
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Right — test logos grid (premium shadow cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {testLogos.map((test, i) => {
                const accents = ["#1E6DEB", "#3FB5A0", "#E86F3C", "#BB5FEC", "#1E6DEB", "#3FB5A0"];
                return (
                  <div
                    key={test.name}
                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]"
                    style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}
                  >
                    <div className="h-[3px]" style={{ background: accents[i] }} />
                    <div className="px-5 py-6 flex flex-col items-center gap-3">
                      <Image
                        src={test.src}
                        alt={test.name}
                        width={120}
                        height={70}
                        className="object-contain h-14 w-auto"
                      />
                      <p className="text-[13px] font-semibold" style={{ color: "#0D1282" }}>
                        {test.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. UNIVERSITY PARTNERS ===== */}
      <UniversityPartners universities={allUniversities} />

      {/* ===== 8. GOOGLE REVIEWS ===== */}
      <HomepageReviews reviews={googleReviews} />

      {/* ===== 9. FAQ ===== */}
      <HomepageFAQ items={faqItems} />

      {/* ===== 10. CTA BANNER — Clean blue ===== */}
      <section
        className="py-10 md:py-14"
        style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white leading-tight mb-3">
            Get Started with Admizz
          </h2>
          <p className="text-[15px] text-white/85 leading-relaxed max-w-xl mx-auto mb-7">
            Take the first step towards your dream education. Our expert counselors
            are ready to guide you through every step.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 font-bold text-[16px] px-10 py-4 rounded-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: "#FCB730", color: "#0D1282" }}
          >
            Start Your Journey
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

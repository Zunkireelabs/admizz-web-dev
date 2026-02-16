import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CountryCard from "@/components/ui/CountryCard";
import GoogleReviews from "@/components/ui/GoogleReviews";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "Your Partner in Study Abroad - Admizz Education",
  description:
    "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success- all through one global portal.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: "/images/icons/consult-108.png",
    title: "Career Counselling",
    color: "#FA3E70",
    description:
      "Get personalized guidance from experienced counselors who understand global education opportunities and can help align your career goals.",
  },
  {
    icon: "/images/icons/scholarship-108.png",
    title: "Scholarship Assistance",
    color: "#3FB5A0",
    description:
      "Unlock financial aid opportunities with expert support in identifying and applying for scholarships tailored to your profile.",
  },
  {
    icon: "/images/icons/visa-108.png",
    title: "Visa Support",
    color: "#E86F3C",
    description:
      "Navigate the student visa application process with confidence through step-by-step guidance and documentation support.",
  },
  {
    icon: "/images/icons/accomodation-108.png",
    title: "Post-Arrival Support",
    color: "#BB5FEC",
    description:
      "Settle into your new country with ease — from accommodation to local orientation, we're with you beyond admission.",
  },
];

const destinations = [
  { name: "Study in the USA", image: "/images/destinations/usa1.jpg", href: "/study-in-the-usa/" },
  { name: "Study in the UK", image: "/images/destinations/uk1.jpg", href: "/study-in-the-uk/" },
  { name: "Study in Australia", image: "/images/destinations/aus1.jpg", href: "/study-in-australia/" },
  { name: "Study in Canada", image: "/images/destinations/canada1.jpg", href: "/study-in-canada/" },
  { name: "Study in India", image: "/images/destinations/india1.jpg", href: "/study-in-india/" },
];

const testLogos = [
  { name: "IELTS", src: "/images/test-prep/IELTS_LOGO.png" },
  { name: "GRE", src: "/images/test-prep/Untitled-design.jpg" },
  { name: "TOEFL", src: "/images/test-prep/TOFEL_LOGO.png" },
  { name: "PTE", src: "/images/test-prep/PTE_LOGO.webp" },
  { name: "SAT", src: "/images/test-prep/SAT.webp" },
  { name: "Duolingo", src: "/images/test-prep/duolingo-2.png" },
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

const ukUniversities = [
  { name: "Buckinghamshire New University", logo: "/images/universities/uk/Buckinghamshire-New-University.jpg" },
  { name: "BPP University", logo: "/images/universities/uk/BPP-University.jpg" },
  { name: "Coventry University", logo: "/images/universities/uk/Coventry-University.jpg" },
  { name: "Health Sciences University", logo: "/images/universities/uk/Health-Sciences-University.jpg" },
  { name: "Ravensbourne University London", logo: "/images/universities/uk/Ravensbourne-University-London.jpg" },
  { name: "University of Sunderland", logo: "/images/universities/uk/University-of-Sunderland.jpg" },
  { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.jpg" },
  { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.jpg" },
  { name: "University of Greenwich", logo: "/images/universities/uk/University-of-Greenwich.jpg" },
  { name: "The University of Law", logo: "/images/universities/uk/The-University-of-Law.jpg" },
  { name: "University of Roehampton", logo: "/images/universities/uk/University-of-Roehampton.jpg" },
  { name: "University of Worcester", logo: "/images/universities/uk/University-of-Worcester.jpg" },
  { name: "University of West London", logo: "/images/universities/uk/University-of-West-London.jpg" },
  { name: "University of the West of Scotland", logo: "/images/universities/uk/University-of-the-West-of-Scotland.jpg" },
  { name: "York St John University", logo: "/images/universities/uk/York-St-John-University.jpg" },
];

const usaUniversities = [
  { name: "Colorado State University", logo: "/images/universities/usa/COLORADO.jpeg" },
  { name: "Webster University", logo: "/images/universities/usa/webster-1.jpeg" },
  { name: "Avila University", logo: "/images/universities/usa/AVILA.jpeg" },
  { name: "Concordia University", logo: "/images/universities/usa/CONCORDIA.jpeg" },
  { name: "Southeast Missouri State", logo: "/images/universities/usa/SOUTHEAST-MISSOURI.jpeg" },
  { name: "Herzing University", logo: "/images/universities/usa/HERZING.jpeg" },
  { name: "Wright State University", logo: "/images/universities/usa/WRIGHT-STATE.jpeg" },
  { name: "Washington University", logo: "/images/universities/usa/WASHINGTON.jpeg" },
  { name: "Texas State University", logo: "/images/universities/usa/TEXAS.jpeg" },
  { name: "Murray State University", logo: "/images/universities/usa/MURRAY.jpeg" },
  { name: "Youngstown State University", logo: "/images/universities/usa/YOUNGSTOWN.jpeg" },
  { name: "University of Central Arkansas", logo: "/images/universities/usa/CENTRAL-ARKANSAS.jpeg" },
  { name: "Dakota State University", logo: "/images/universities/usa/DAKOTA-STATE.jpeg" },
  { name: "University of South Dakota", logo: "/images/universities/usa/UNIVERSITY-F-SOUTH-DAKOTA.jpeg" },
  { name: "Pacific Oaks College", logo: "/images/universities/usa/PACIFIC.jpeg" },
  { name: "Bethesda University", logo: "/images/universities/usa/BETHESDA.jpeg" },
  { name: "St. Cloud State University", logo: "/images/universities/usa/ST-CLOUD.jpeg" },
  { name: "South Dakota State University", logo: "/images/universities/usa/South.jpeg" },
  { name: "Post University", logo: "/images/universities/usa/POST.jpeg" },
  { name: "Northwest Missouri State", logo: "/images/universities/usa/NORTHWEST.jpeg" },
  { name: "University of Central Missouri", logo: "/images/universities/usa/university-f.jpeg" },
  { name: "Minnesota State University", logo: "/images/universities/usa/MINNESOTA-STATE.jpeg" },
];

/* ------------------------------------------------------------------ */
/*  SHARED STYLES                                                      */
/* ------------------------------------------------------------------ */

const CARD_SHADOW = "shadow-[8px_13px_18px_11px_rgba(0,0,0,0.05)]";
const CARD_HOVER = "hover:shadow-[8px_13px_24px_14px_rgba(0,0,0,0.10)]";

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function HomepageV2() {
  return (
    <main style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}>

      {/* ===== 1. HERO — full-bleed background image ===== */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-center">
        {/* Background image */}
        <Image
          src="/images/hero/canada-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Navy gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(10,15,60,0.92) 0%, rgba(10,15,60,0.70) 50%, rgba(10,15,60,0.35) 100%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 w-full">
          <div className="max-w-[620px]">
            <p className="text-[15px] text-white/80 mb-4 tracking-wide">
              Your Vision, Our Fulfillment — Helping You Achieve Your Dreams
            </p>
            <h1 className="text-[36px] md:text-[50px] font-bold text-white leading-[1.15] mb-6">
              Start Your Study Abroad Journey With Admizz!
            </h1>
            <p className="text-[16px] text-white/85 leading-relaxed max-w-[540px] mb-8">
              From university shortlisting to visa success — Admizz Education
              simplifies every step of your study abroad journey with advanced
              technology and expert-led support.
            </p>
            <Link
              href="/register/"
              className="inline-flex items-center gap-2 text-white font-semibold text-[15px] px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: "#1E6DEB" }}
            >
              Take the First Step to Study Abroad
              <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
                <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 2. FEATURE / SERVICE CARDS ===== */}
      <section className="py-20 md:py-24 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-bold text-navy text-center mb-3">
            End-to-End Support for Your Study Abroad Journey
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            We are not just an education consultancy. Not Just Advice, Real
            Paths to Study Abroad Success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {services.map((service) => (
              <div
                key={service.title}
                className={`bg-white rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${CARD_SHADOW} ${CARD_HOVER}`}
              >
                <div className="w-16 h-16 mb-5 flex items-center justify-center">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-[18px] font-bold mb-3"
                  style={{ color: service.color }}
                >
                  {service.title}
                </h3>
                <p className="text-[14px] text-gray-dark leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. THREE PILLARS ===== */}
      <section className="py-20 md:py-24 px-4" style={{ background: "#F5F8FF" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-bold text-navy text-center mb-3">
            The Team Behind Your Study Abroad Dream
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-14">
            We bring the right people together to challenge conventional
            thinking and drive transformation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/about/2-1-763x1024.png",
                alt: "Students",
                title: "Students",
                desc: "Get personalized guidance from experienced counselors who understand your goals and aspirations for studying abroad.",
                href: "/register/",
                cta: "Register Now",
              },
              {
                img: "/images/about/2-2-763x1024.png",
                alt: "Recruitment Partners",
                title: "Recruitment Partners",
                desc: "Join our global network of recruitment partners and help students find the right educational opportunities worldwide.",
                href: "/recruitment-partners/",
                cta: "Learn more about recruitment partners",
              },
              {
                img: "/images/about/2-3-763x1024.png",
                alt: "Colleges & Universities",
                title: "Colleges & Universities",
                desc: "Partner with Admizz to reach qualified international students and grow your global enrollment pipeline.",
                href: "/universities/",
                cta: "Learn more about partner universities",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 ${CARD_SHADOW} ${CARD_HOVER}`}
              >
                <Image
                  src={card.img}
                  alt={card.alt}
                  width={200}
                  height={268}
                  className="mx-auto h-48 w-auto object-contain"
                />
                <h3 className="mt-6 text-xl font-bold text-navy">{card.title}</h3>
                <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                  {card.desc}
                </p>
                <Link
                  href={card.href}
                  className="inline-block mt-5 text-white font-semibold text-[15px] px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ background: "#1E6DEB" }}
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. STUDY DESTINATIONS ===== */}
      <section className="py-20 md:py-24 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-bold text-navy text-center mb-3">
            Discover Your Perfect Study Country
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Discover top international study destinations, select programs that
            suit your aspirations, and take confident steps toward a successful
            education abroad.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} {...dest} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. STATS / TRUST — navy gradient ===== */}
      <section
        className="py-20 md:py-24 px-4"
        style={{ background: "linear-gradient(135deg, #0A0F3C 0%, #0D1282 50%, #162280 100%)" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[28px] md:text-[34px] font-bold text-white mb-4">
            Why Students Trust Us?
          </h2>
          <p className="text-[15px] text-white/80 max-w-2xl mx-auto mb-14 leading-relaxed">
            Admizz Education helps international students get into top colleges and
            universities worldwide. We guide you through every step — choosing
            the right course, applying to universities, and getting your visa approved.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,000+", label: "Students Successfully Enrolled Worldwide" },
              { value: "100+", label: "Prestigious Institutions in Our Global Network" },
              { value: "95%", label: "Student Visa Approval Rate with Expert Guidance" },
              { value: "$2M+", label: "In Scholarships Awarded to Our Students" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <p
                  className="text-[40px] md:text-[52px] font-bold mb-2"
                  style={{ color: "#FCB730" }}
                >
                  {stat.value}
                </p>
                <p className="text-[14px] text-white/75 leading-snug max-w-[200px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TEST PREPARATION ===== */}
      <section className="py-20 md:py-24 px-4" style={{ background: "#F5F8FF" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left — text */}
            <div>
              <h2 className="text-[28px] md:text-[34px] font-bold text-navy leading-tight mb-6">
                Go Global with Your Test Preparation
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-4">
                As the global demand for higher education continues to grow,
                performing exceptionally in standardized exams has become essential
                for securing admission to leading colleges and universities worldwide.
              </p>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-8">
                At Admizz Education, we understand the critical role of competitive
                exams such as IELTS, TOEFL, GRE, GMAT, SAT, and others in shaping
                your study abroad journey. Our personalized training programs equip
                students with the necessary skills, strategies, and confidence to
                excel&mdash;helping them surpass expectations and achieve top scores.
              </p>
              <Link
                href="/test-prep/"
                className="inline-block text-white font-semibold text-[15px] px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity"
                style={{ background: "#1E6DEB" }}
              >
                Learn More
              </Link>
            </div>

            {/* Right — cards + logos */}
            <div>
              {/* Feature cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "/images/icons/user.png", label: "Personalized Coaching", bg: "linear-gradient(180deg, #dbeafe 0%, #ecfdf5 100%)" },
                  { icon: "/images/icons/online-learning.png", label: "Flexible Online Learning", bg: "linear-gradient(180deg, #d1fae5 0%, #ecfdf5 100%)" },
                  { icon: "/images/icons/excellence.png", label: "Guaranteed Score Improvement", bg: "linear-gradient(180deg, #fef9c3 0%, #fef3c7 100%)" },
                ].map((f) => (
                  <div
                    key={f.label}
                    className={`rounded-2xl p-5 pb-4 flex flex-col items-start transition-all duration-300 hover:-translate-y-1 ${CARD_SHADOW} ${CARD_HOVER}`}
                    style={{ background: f.bg }}
                  >
                    <Image src={f.icon} alt={f.label} width={40} height={40} className="mb-3" />
                    <p className="text-[13px] font-medium text-[#1a1a2e] leading-tight">{f.label}</p>
                  </div>
                ))}
              </div>

              {/* Featured test logos */}
              <p className="text-[15px] font-semibold text-navy mb-4">Featured Tests</p>
              <div className="grid grid-cols-3 gap-4">
                {testLogos.map((test) => (
                  <div
                    key={test.name}
                    className={`bg-white rounded-2xl p-3 flex items-center justify-center aspect-[3/2] transition-all duration-300 hover:-translate-y-1 ${CARD_SHADOW} ${CARD_HOVER}`}
                  >
                    <Image
                      src={test.src}
                      alt={test.name}
                      width={100}
                      height={60}
                      className="object-contain max-h-10"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. GOOGLE REVIEWS ===== */}
      <GoogleReviews reviews={googleReviews} />

      {/* ===== 8. FAQ ===== */}
      <FAQ items={faqItems} twoColumn />

      {/* ===== 9. UNIVERSITY PARTNERS ===== */}
      <section className="py-20 md:py-24 px-4" style={{ background: "#F5F8FF" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-bold text-navy text-center mb-12">
            Global Top Universities
          </h2>

          {/* UK Universities */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-navy mb-6 text-center">
              UK Institutions
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-5">
              {ukUniversities.map((uni) => (
                <div
                  key={uni.name}
                  className={`bg-white rounded-2xl p-4 flex items-center justify-center aspect-[3/2] transition-all duration-300 hover:-translate-y-1 ${CARD_SHADOW} ${CARD_HOVER}`}
                >
                  <Image
                    src={uni.logo}
                    alt={uni.name}
                    width={120}
                    height={80}
                    className="object-contain max-h-16"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* USA Universities */}
          <div>
            <h3 className="text-lg font-semibold text-navy mb-6 text-center">
              USA Institutions
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
              {usaUniversities.map((uni) => (
                <div
                  key={uni.name}
                  className={`bg-white rounded-2xl p-4 flex items-center justify-center aspect-[3/2] transition-all duration-300 hover:-translate-y-1 ${CARD_SHADOW} ${CARD_HOVER}`}
                >
                  <Image
                    src={uni.logo}
                    alt={uni.name}
                    width={120}
                    height={80}
                    className="object-contain max-h-16"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. CTA BANNER ===== */}
      <section
        className="py-20 md:py-24 px-4"
        style={{ background: "linear-gradient(135deg, #1E6DEB 0%, #0D1282 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[28px] md:text-[38px] font-bold text-white leading-tight mb-5">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-[16px] text-white/85 leading-relaxed max-w-2xl mx-auto mb-10">
            Take the first step towards your dream education. Our expert counselors
            are ready to guide you through every step of the process.
          </p>
          <Link
            href="/register/"
            className="inline-flex items-center gap-2 font-bold text-[16px] px-10 py-4 rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: "#FCB730", color: "#0A0F3C" }}
          >
            Get Started Today
            <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";
import CountryCard from "@/components/ui/CountryCard";
import GoogleReviews from "@/components/ui/GoogleReviews";
import FAQ from "@/components/ui/FAQ";
import UniversityGrid from "@/components/ui/UniversityGrid";

export const metadata: Metadata = {
  title: "Homepage (Old) | Admizz Education",
  description:
    "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success- all through one global portal.",
  robots: { index: false, follow: false },
};

const services = [
  {
    icon: "/images/icons/consult-108.webp",
    title: "Career Counselling",
    description:
      "Get personalized guidance from experienced counselors who understand global education opportunities and can help align your career goals.",
  },
  {
    icon: "/images/icons/scholarship-108.webp",
    title: "Scholarship Assistance",
    description:
      "Unlock financial aid opportunities with expert support in identifying and applying for scholarships tailored to your profile.",
  },
  {
    icon: "/images/icons/visa-108.webp",
    title: "Visa Support",
    description:
      "Navigate the student visa application process with confidence through step-by-step guidance and documentation support.",
  },
  {
    icon: "/images/icons/accomodation-108.webp",
    title: "Post-Arrival Support",
    description:
      "Settle into your new country with ease — from accommodation to local orientation, we're with you beyond admission.",
  },
];

const destinations = [
  { name: "Study in the USA", image: "/images/destinations/usa1.webp", href: "/study-in-the-usa" },
  { name: "Study in the UK", image: "/images/destinations/uk1.webp", href: "/study-in-the-uk" },
  { name: "Study in Australia", image: "/images/destinations/aus1.webp", href: "/study-in-australia" },
  { name: "Study in Canada", image: "/images/destinations/canada1.webp", href: "/study-in-canada" },
  { name: "Study in India", image: "/images/destinations/india1.webp", href: "/study-in-india" },
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

const ukUniversities = [
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
];

const usaUniversities = [
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

export default function HomepageOld() {
  return (
    <main>
      {/* ===== 1. HERO SECTION ===== */}
      <section style={{ background: "#e3f1fc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[15px] text-gray-dark mb-4" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>
                Your Vision, Our Fulfillment – Helping You Achieve Your Dreams
              </p>
              <h1
                className="text-3xl md:text-[42px] font-bold text-navy leading-tight"
                style={{ fontFamily: "var(--font-rubik), sans-serif" }}
              >
                Start Your Study Abroad Journey With Admizz!
              </h1>
              <p className="mt-4 text-[15px] text-gray-dark leading-relaxed max-w-[520px]">
                From university shortlisting to visa success — Admizz Education
                simplifies every step of your study abroad journey with advanced
                technology and expert-led support.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 mt-6 text-white font-semibold text-[15px] px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: "#0D1282" }}
              >
                Take the First Step to Study Abroad
                <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z" />
                </svg>
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/hero/web-ad.webp"
                alt="Study Abroad"
                width={550}
                height={506}
                priority
                className="w-full max-w-[550px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. WHY STUDENTS TRUST US ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <Image
              src="/images/hero/sudy-abroad-f-e1763551074605-1024x942.webp"
              alt="Why Students Trust Admizz Education"
              width={1024}
              height={942}
              className="w-full max-w-[520px] h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-[34px] font-bold text-navy leading-tight mb-5">
              Why Students Trust Us?
            </h2>
            <p className="text-[15px] text-gray-dark leading-relaxed mb-8">
              Admizz Education helps international students get into top colleges and universities worldwide. We guide you through every step — choosing the right course, applying to universities, and getting your visa approved. With the right support and smart tools, we make the study-abroad journey easy, clear, and stress-free.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2,000 +", label: "students successfully enrolled worldwide", bg: "#FCB730" },
                { value: "100 +", label: "Prestigious Institutions in Our Global Network", bg: "#5C7189" },
                { value: "95 %", label: "Student Visa Approval Rate with Expert Guidance", bg: "#5C7189" },
                { value: "$ 2 M+", label: "In Scholarships Awarded to Our Students", bg: "#FCB730" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: stat.bg }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-[13px] text-white leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. SERVICES ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            End-to-End Support for Your Study Abroad Journey
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-10">
            We are not just an education consultancy. Not Just Advice, Real
            Paths to Study Abroad Success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. THREE PILLARS ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            The Team Behind Your Study Abroad Dream
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            We bring the right people together to challenge conventional
            thinking and drive transformation
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[10px] p-8 text-center border border-border-light">
              <Image src="/images/about/2-1-763x1024.webp" alt="Students" width={200} height={268} className="mx-auto h-48 w-auto object-contain" />
              <h3 className="mt-6 text-xl font-bold text-navy">Students</h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">Get personalized guidance from experienced counselors who understand your goals and aspirations for studying abroad.</p>
              <Link href="/register" className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors">Register Now</Link>
            </div>
            <div className="bg-white rounded-[10px] p-8 text-center border border-border-light">
              <Image src="/images/about/2-2-763x1024.webp" alt="Recruitment Partners" width={200} height={268} className="mx-auto h-48 w-auto object-contain" />
              <h3 className="mt-6 text-xl font-bold text-navy">Recruitment Partners</h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">Join our global network of recruitment partners and help students find the right educational opportunities worldwide.</p>
              <Link href="/recruitment-partners" className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors">Learn more about recruitment partners</Link>
            </div>
            <div className="bg-white rounded-[10px] p-8 text-center border border-border-light">
              <Image src="/images/about/2-3-763x1024.webp" alt="Colleges & Universities" width={200} height={268} className="mx-auto h-48 w-auto object-contain" />
              <h3 className="mt-6 text-xl font-bold text-navy">Colleges & Universities</h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">Partner with Admizz to reach qualified international students and grow your global enrollment pipeline.</p>
              <Link href="/universities" className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors">Learn more about partner universities</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. STUDY DESTINATIONS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">Discover Your Perfect Study Country</h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-10">Discover top international study destinations, select programs that suit your aspirations, and take confident steps toward a successful education abroad.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} {...dest} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TEST PREPARATION ===== */}
      <section className="relative py-16 overflow-hidden" style={{ background: "#0D1282" }}>
        <div className="absolute top-[-60px] left-[-60px] w-[200px] h-[200px] rounded-full opacity-10 bg-white" />
        <div className="absolute bottom-[-80px] left-[30%] w-[250px] h-[250px] rounded-full opacity-[0.07] bg-white" />
        <div className="absolute top-[20%] right-[-40px] w-[150px] h-[150px] rounded-full opacity-[0.06] bg-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-[36px] font-bold text-yellow leading-tight mb-6">Go global with your Test Preparation</h2>
              <p className="text-[15px] text-white/90 leading-relaxed mb-4">As the global demand for higher education continues to grow, performing exceptionally in standardized exams has become essential for securing admission to leading colleges and universities worldwide. Additionally, strong English proficiency remains a key requirement for accessing prestigious institutions across the globe.</p>
              <p className="text-[15px] text-white/90 leading-relaxed mb-10">At Admizz Education, we understand the critical role of competitive exams such as IELTS, TOEFL, GRE, GMAT, SAT, and others in shaping your study abroad journey. Our personalized training programs equip students with the necessary skills, strategies, and confidence to excel&mdash;helping them surpass expectations and achieve top scores.</p>
              <Link href="/test-prep" className="inline-block bg-[#f4d03f] text-[#0D1282] font-semibold text-[15px] px-8 py-3 rounded-full hover:bg-yellow-bright transition-colors">Learn More</Link>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "/images/icons/user.webp", label: "Personalized Coaching", bg: "linear-gradient(180deg, #dbeafe 0%, #ecfdf5 100%)" },
                  { icon: "/images/icons/online-learning.webp", label: "Flexible Online Learning", bg: "linear-gradient(180deg, #d1fae5 0%, #ecfdf5 100%)" },
                  { icon: "/images/icons/excellence.webp", label: "Guaranteed Score Improvement", bg: "linear-gradient(180deg, #fef9c3 0%, #fef3c7 100%)" },
                ].map((f) => (
                  <div key={f.label} className="rounded-[12px] p-5 pb-4 flex flex-col items-start" style={{ background: f.bg }}>
                    <Image src={f.icon} alt={f.label} width={40} height={40} className="mb-3" />
                    <p className="text-[13px] font-medium text-[#1a1a2e] leading-tight">{f.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[15px] font-semibold text-white mt-8 mb-4">Featured Tests</p>
              <div className="grid grid-cols-3 gap-4">
                {testLogos.map((test) => (
                  <div key={test.name} className="bg-white rounded-[10px] p-3 flex items-center justify-center aspect-[3/2]" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                    <Image src={test.src} alt={test.name} width={100} height={60} className="object-contain max-h-10" />
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
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">Global Top Universities</h2>
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-navy mb-6 text-center">UK Institutions</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
              {ukUniversities.map((uni) => (
                <div key={uni.name} className="bg-white border border-border-light rounded-[10px] p-4 flex items-center justify-center aspect-[3/2] hover:shadow-md transition-shadow">
                  <Image src={uni.logo} alt={uni.name} width={120} height={80} className="object-contain max-h-16" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-navy mb-6 text-center">USA Institutions</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {usaUniversities.map((uni) => (
                <div key={uni.name} className="bg-white border border-border-light rounded-[10px] p-4 flex items-center justify-center aspect-[3/2] hover:shadow-md transition-shadow">
                  <Image src={uni.logo} alt={uni.name} width={120} height={80} className="object-contain max-h-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

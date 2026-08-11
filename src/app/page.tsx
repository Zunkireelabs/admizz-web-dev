import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CountryCard from "@/components/ui/CountryCard";
import HomepageReviews from "./HomepageReviews";
import HomepageFAQ from "./HomepageFAQ";
import UniversityPartners from "./UniversityPartners";
import CommunityReels from "./CommunityReels";
import LazyMount from "@/components/LazyMount";
import PredictWinPromoOverlay from "@/components/ui/PredictWinPromoOverlay";

export const metadata: Metadata = {
  title: "Your Partner in Study Abroad - Admizz Education",
  description:
    "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success- all through one global portal.",
  alternates: {
    canonical: "https://admizzeducation.com/",
  },
  openGraph: {
    title: "Your Partner in Study Abroad - Admizz Education",
    description:
      "Dreaming of studying abroad? Admizz Education helps you explore top destinations, apply to global universities, and prepare for success- all through one global portal.",
    url: "https://admizzeducation.com/",
    siteName: "Admizz Education",
    images: ["/images/hero/web-ad.webp"],
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: "/images/icons/consult-108.webp",
    title: "Test Preparation",
    accent: "#1E6DEB",
    description:
      "Ace your IELTS, TOEFL, GRE, PTE, SAT and other exams with expert-led coaching, practice tests, and personalized study plans designed to maximize your score.",
  },
  {
    icon: "/images/icons/scholarship-108.webp",
    title: "Career Counseling",
    accent: "#3FB5A0",
    description:
      "Get personalized guidance from experienced counselors who understand global education opportunities and can help align your academic path with your career goals.",
  },
  {
    icon: "/images/icons/visa-108.webp",
    title: "Scholarships Support",
    accent: "#E86F3C",
    description:
      "Unlock financial aid opportunities with expert support in identifying and applying for scholarships, grants, and fee waivers tailored to your profile.",
  },
  {
    icon: "/images/icons/accomodation-108.webp",
    title: "Visa Assistance",
    accent: "#BB5FEC",
    description:
      "Navigate the student visa application process with confidence through step-by-step guidance, documentation support, and interview preparation.",
  },
];

const destinations = [
  { name: "Study in the USA", image: "/images/destinations/usa1.webp", href: "/study-in-the-usa/" },
  { name: "Study in the UK", image: "/images/destinations/uk1.webp", href: "/study-in-the-uk/" },
  { name: "Study in Australia", image: "/images/destinations/aus1.webp", href: "/study-in-australia/" },
  { name: "Study in Canada", image: "/images/destinations/canada1.webp", href: "/study-in-canada/" },
  { name: "Study in India", image: "/images/destinations/india1.webp", href: "/study-in-india/" },
  { name: "Study in New Zealand", image: "/images/destinations/newzealand1.webp", href: "/study-in-newzealand/" },
  { name: "Study in Finland", image: "/images/destinations/finland1.webp", href: "/study-in-finland/" },
  { name: "Study in Germany", image: "/images/destinations/germany1.webp", href: "/study-in-germany/" },
  { name: "Study in France", image: "/images/destinations/france1.webp", href: "/study-in-france/" },
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
    name: "Niraj Bhattarai",
    initial: "N",
    color: "#4285F4",
    text: "From university selection to visa approval, Admizz Education provided exceptional support and made my journey to the UK effortless. I highly recommend them to anyone looking for a trustworthy study abroad partner.",
    university: "University of West of Scotland",
    originFlag: "np",
    destFlag: "gb",
    route: "Nepal → UK",
  },
  {
    name: "Basant Khadka",
    initial: "B",
    color: "#E86F3C",
    text: "The journey to college can be overwhelming, but Admizz Education made applying to Weber State University effortless. Thanks to their guidance.",
    university: "Weber State University",
    originFlag: "np",
    destFlag: "us",
    route: "Nepal → USA",
  },
  {
    name: "Yousuf Abdirahman Mohamed",
    initial: "Y",
    color: "#3FB5A0",
    text: "I appreciated your unlimited help for my MBA career. It was very tough but I gained a very solid educational background. Thanks Admizz!",
    university: "Kalinga Institute of Industrial Technology",
    originFlag: "so",
    destFlag: "in",
    route: "Somalia → India",
  },
  {
    name: "Satyam Jaiswal",
    initial: "S",
    color: "#7C3AED",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support. Their team ensured every step of my application visa process was smooth and stress-free.",
    university: "University of Greenwich",
    originFlag: "np",
    destFlag: "gb",
    route: "Nepal → UK",
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
      "You can apply to leading study-abroad destinations such as the USA, UK, Canada, Australia, New Zealand, India, and other top European countries. Admizz provides end-to-end admission support for undergraduate, postgraduate, diploma, and pathway programs.",
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
  { name: "Buckinghamshire New University", logo: "/images/universities/uk/Buckinghamshire-New-University.webp", country: "UK" },
  { name: "BPP University", logo: "/images/universities/uk/BPP-University.webp", country: "UK" },
  { name: "Coventry University", logo: "/images/universities/uk/Coventry-University.webp", country: "UK" },
  { name: "Health Sciences University", logo: "/images/universities/uk/Health-Sciences-University.webp", country: "UK" },
  { name: "Ravensbourne University London", logo: "/images/universities/uk/Ravensbourne-University-London.webp", country: "UK" },
  { name: "University of Sunderland", logo: "/images/universities/uk/University-of-Sunderland.webp", country: "UK" },
  { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.webp", country: "UK" },
  { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.webp", country: "UK" },
  { name: "University of Greenwich", logo: "/images/universities/uk/University-of-Greenwich.webp", country: "UK" },
  { name: "The University of Law", logo: "/images/universities/uk/The-University-of-Law.webp", country: "UK" },
  { name: "University of Roehampton", logo: "/images/universities/uk/University-of-Roehampton.webp", country: "UK" },
  { name: "University of Worcester", logo: "/images/universities/uk/University-of-Worcester.webp", country: "UK" },
  { name: "University of West London", logo: "/images/universities/uk/University-of-West-London.webp", country: "UK" },
  { name: "University of the West of Scotland", logo: "/images/universities/uk/University-of-the-West-of-Scotland.webp", country: "UK" },
  { name: "York St John University", logo: "/images/universities/uk/York-St-John-University.webp", country: "UK" },
  // USA
  { name: "Colorado State University", logo: "/images/universities/usa/COLORADO.webp", country: "USA" },
  { name: "Webster University", logo: "/images/universities/usa/webster-1.webp", country: "USA" },
  { name: "Avila University", logo: "/images/universities/usa/AVILA.webp", country: "USA" },
  { name: "Concordia University", logo: "/images/universities/usa/CONCORDIA.webp", country: "USA" },
  { name: "Southeast Missouri State", logo: "/images/universities/usa/SOUTHEAST-MISSOURI.webp", country: "USA" },
  { name: "Herzing University", logo: "/images/universities/usa/HERZING.webp", country: "USA" },
  { name: "Wright State University", logo: "/images/universities/usa/WRIGHT-STATE.webp", country: "USA" },
  { name: "Washington University", logo: "/images/universities/usa/WASHINGTON.webp", country: "USA" },
  { name: "Texas State University", logo: "/images/universities/usa/TEXAS.webp", country: "USA" },
  { name: "Murray State University", logo: "/images/universities/usa/MURRAY.webp", country: "USA" },
  { name: "Youngstown State University", logo: "/images/universities/usa/YOUNGSTOWN.webp", country: "USA" },
  { name: "University of Central Arkansas", logo: "/images/universities/usa/CENTRAL-ARKANSAS.webp", country: "USA" },
  { name: "Dakota State University", logo: "/images/universities/usa/DAKOTA-STATE.webp", country: "USA" },
  { name: "University of South Dakota", logo: "/images/universities/usa/UNIVERSITY-F-SOUTH-DAKOTA.webp", country: "USA" },
  { name: "Pacific Oaks College", logo: "/images/universities/usa/PACIFIC.webp", country: "USA" },
  { name: "Bethesda University", logo: "/images/universities/usa/BETHESDA.webp", country: "USA" },
  { name: "St. Cloud State University", logo: "/images/universities/usa/ST-CLOUD.webp", country: "USA" },
  { name: "South Dakota State University", logo: "/images/universities/usa/South.webp", country: "USA" },
  { name: "Post University", logo: "/images/universities/usa/POST.webp", country: "USA" },
  { name: "Northwest Missouri State", logo: "/images/universities/usa/NORTHWEST.webp", country: "USA" },
  { name: "University of Central Missouri", logo: "/images/universities/usa/university-f.webp", country: "USA" },
  { name: "Minnesota State University", logo: "/images/universities/usa/MINNESOTA-STATE.webp", country: "USA" },
  // Australia
  { name: "Western Sydney University", logo: "/images/universities/australia/western-sydney-university.webp", country: "Australia" },
  { name: "La Trobe University", logo: "/images/universities/australia/la-trobe-university.webp", country: "Australia" },
  { name: "Victoria University", logo: "/images/universities/australia/victoria-university.webp", country: "Australia" },
  { name: "University of Queensland", logo: "/images/universities/australia/university-of-queensland.webp", country: "Australia" },
  { name: "Monash University", logo: "/images/universities/australia/monash-university.webp", country: "Australia" },
  { name: "Kaplan Business School", logo: "/images/universities/australia/kaplan-business-school.webp", country: "Australia" },
  { name: "Southern Cross University", logo: "/images/universities/australia/southern-cross-university.webp", country: "Australia" },
  { name: "RMIT University", logo: "/images/universities/australia/rmit-university.webp", country: "Australia" },
  { name: "Macquarie University", logo: "/images/universities/australia/macquarie-university.webp", country: "Australia" },
  { name: "University of Tasmania", logo: "/images/universities/australia/university-of-tasmania.webp", country: "Australia" },
  // Canada
  { name: "University of Toronto", logo: "/images/universities/canada/university-of-toronto.webp", country: "Canada" },
  { name: "University of British Columbia", logo: "/images/universities/canada/university-of-british-columbia.webp", country: "Canada" },
  { name: "McGill University", logo: "/images/universities/canada/mcgill-university.webp", country: "Canada" },
  { name: "University of Alberta", logo: "/images/universities/canada/university-of-alberta.webp", country: "Canada" },
  { name: "McMaster University", logo: "/images/universities/canada/mcmaster-university.webp", country: "Canada" },
  { name: "University of Waterloo", logo: "/images/universities/canada/university-of-waterloo.webp", country: "Canada" },
  { name: "Western University", logo: "/images/universities/canada/western-university.webp", country: "Canada" },
  { name: "Queen's University", logo: "/images/universities/canada/queens-university.webp", country: "Canada" },
  { name: "Simon Fraser University", logo: "/images/universities/canada/simon-fraser-university.webp", country: "Canada" },
  { name: "Dalhousie University", logo: "/images/universities/canada/dalhousie-university.webp", country: "Canada" },
  // France
  { name: "Sorbonne University", logo: "/images/universities/france/sorbonne-university.webp", country: "France" },
  { name: "Universite PSL", logo: "/images/universities/france/universite-psl.svg", country: "France" },
  { name: "Universite Grenoble Alpes", logo: "/images/universities/france/universite-grenoble-alpes.webp", country: "France" },
  { name: "Aix-Marseille University", logo: "/images/universities/france/aix-marseille-university.webp", country: "France" },
  { name: "Universite de Strasbourg", logo: "/images/universities/france/universite-de-strasbourg.webp", country: "France" },
  { name: "Universite de Bordeaux", logo: "/images/universities/france/universite-de-bordeaux.webp", country: "France" },
  { name: "Sciences Po", logo: "/images/universities/france/sciences-po.webp", country: "France" },
  { name: "Ecole Polytechnique", logo: "/images/universities/france/ecole-polytechnique.webp", country: "France" },
  { name: "Universite de Lille", logo: "/images/universities/france/universite-de-lille.webp", country: "France" },
  { name: "University of Paris-Saclay", logo: "/images/universities/france/university-of-paris-saclay.webp", country: "France" },
  // Finland
  { name: "Haaga-Helia University of Applied Science", logo: "/images/universities/finland/haaga-helia.webp", country: "Finland" },
  { name: "South-Eastern Finland University of Applied Science", logo: "/images/universities/finland/south-eastern-finland.webp", country: "Finland" },
  { name: "Lab University of Applied Science", logo: "/images/universities/finland/lab-university.webp", country: "Finland" },
  { name: "Satakunta University of Applied Science", logo: "/images/universities/finland/satakunta-university.webp", country: "Finland" },
  { name: "Vaasa University of Applied Science", logo: "/images/universities/finland/vaasa-university.webp", country: "Finland" },
  { name: "Karelia University of Applied Science", logo: "/images/universities/finland/karelia-university.webp", country: "Finland" },
  // New Zealand
  { name: "University of Auckland", logo: "/images/universities/newzealand/university-of-auckland.webp", country: "New Zealand" },
  { name: "University of Otago", logo: "/images/universities/newzealand/university-of-otago.webp", country: "New Zealand" },
  { name: "Victoria University of Wellington", logo: "/images/universities/newzealand/victoria-university-of-wellington.webp", country: "New Zealand" },
  { name: "University of Canterbury", logo: "/images/universities/newzealand/university-of-canterbury.webp", country: "New Zealand" },
  { name: "Massey University", logo: "/images/universities/newzealand/massey-university.webp", country: "New Zealand" },
  { name: "Auckland University of Technology", logo: "/images/universities/newzealand/auckland-university-of-technology.webp", country: "New Zealand" },
  { name: "Lincoln University", logo: "/images/universities/newzealand/lincoln-university.webp", country: "New Zealand" },
  { name: "Unitec Institute of Technology", logo: "/images/universities/newzealand/unitec-institute-of-technology.webp", country: "New Zealand" },
  { name: "Eastern Institute of Technology", logo: "/images/universities/newzealand/eastern-institute-of-technology.webp", country: "New Zealand" },
  { name: "Southern Institute of Technology", logo: "/images/universities/newzealand/southern-institute-of-technology.webp", country: "New Zealand" },
  // India
  { name: "Vellore Institute of Technology (VIT)", logo: "/images/universities/india/vit.webp", country: "India" },
  { name: "University of Delhi", logo: "/images/universities/india/university-of-delhi.webp", country: "India" },
  { name: "Jawaharlal Nehru University", logo: "/images/universities/india/jawaharlal-nehru-university.webp", country: "India" },
  { name: "Banaras Hindu University", logo: "/images/universities/india/banaras-hindu-university.webp", country: "India" },
  { name: "Anna University", logo: "/images/universities/india/anna-university.webp", country: "India" },
  { name: "Manipal Academy of Higher Education", logo: "/images/universities/india/manipal-academy.webp", country: "India" },
  { name: "Kalinga Institute of Technology", logo: "/images/universities/india/kalinga-institute.webp", country: "India" },
  { name: "RK University", logo: "/images/universities/india/rk-university.webp", country: "India" },
  { name: "IISc Bangalore", logo: "/images/universities/india/iisc-bangalore.webp", country: "India" },
  { name: "Delhi Technological University (DTU)", logo: "/images/universities/india/delhi-technological-university.webp", country: "India" },
  { name: "Symbiosis International University", logo: "/images/universities/india/symbiosis-international-university.webp", country: "India" },
  // Germany
  { name: "Technical University of Munich", logo: "/images/universities/germany/technical-university-of-munich.webp", country: "Germany" },
  { name: "Ludwig-Maximilians-Universität München", logo: "/images/universities/germany/ludwig-maximilians-universitat.webp", country: "Germany" },
  { name: "Heidelberg University", logo: "/images/universities/germany/heidelberg-university.webp", country: "Germany" },
  { name: "Freie Universität Berlin", logo: "/images/universities/germany/freie-universitat-berlin.webp", country: "Germany" },
  { name: "Karlsruhe Institute of Technology", logo: "/images/universities/germany/karlsruhe-institute-of-technology.webp", country: "Germany" },
  { name: "RWTH Aachen University", logo: "/images/universities/germany/rwth-aachen-university.webp", country: "Germany" },
  { name: "Technische Universität Berlin", logo: "/images/universities/germany/technische-universitat-berlin.webp", country: "Germany" },
  { name: "University of Hamburg", logo: "/images/universities/germany/university-of-hamburg.webp", country: "Germany" },
  { name: "University of Freiburg", logo: "/images/universities/germany/university-of-freiburg.webp", country: "Germany" },
  { name: "Humboldt-Universität zu Berlin", logo: "/images/universities/germany/humboldt-universitat-berlin.webp", country: "Germany" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main style={{ fontFamily: "'Open Sans', var(--font-opensans), sans-serif" }}>
      <link
        rel="preload"
        as="image"
        href="/images/hero/web-ad-1040.webp"
        imageSrcSet="/images/hero/web-ad-720.webp 720w, /images/hero/web-ad-1040.webp 1040w"
        imageSizes="(max-width: 768px) 90vw, 520px"
        fetchPriority="high"
      />
      {/* Scoped: headings use Montserrat, body uses Open Sans */}
      <style>{`
        main h1, main h2, main h3 {
          font-family: 'Montserrat', var(--font-montserrat), sans-serif;
        }
      `}</style>

      {/* Promotional overlay — appears 3.5s after page load */}
      <PredictWinPromoOverlay
        id="wc2026-predict-win"
        imageSrc="/images/university-choose-copy.webp"
        imageAlt="Study in UK from Nepal — Admizz Education"
        ctaText="Your UK Education Starts Here →"
        ctaHref="https://admizzeducation.com/study-in-uk-from-nepal"
        delayMs={3500}
      />

      {/* ===== 1. HERO — Diamond photo collage ===== */}
      <section className="pt-0 pb-2 sm:pt-1 md:py-3 bg-[#EEF2FF] sm:bg-white">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div
            className="rounded-none sm:rounded-[32px] px-5 sm:px-10 lg:px-12 py-4 md:py-6 overflow-hidden"
            style={{ background: "#EEF2FF" }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left — Text */}
            <div className="relative z-10 md:self-center">
              <p className="text-[15px] mb-5" style={{ color: "#5a6275" }}>
                Your Vision, Our Fulfillment – Helping You Achieve Your Dreams
              </p>
              <h1 className="text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6" style={{ color: "#0D1282" }}>
                Start Your Study Abroad{" "}
                <span style={{ color: "#1E6DEB" }}>Journey With Admizz!</span>
              </h1>
              <p className="text-[16px] leading-[1.75] mb-6 md:mb-10 max-w-[460px]" style={{ color: "#5a6275" }}>
                Explore 100+ global universities and colleges.
                Submit your best possible application with a 95%
                visa success rate. Unlock your full potential with
                Admizz Education!
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 font-semibold text-[16px] px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#FFD800", color: "#0D1282" }}
              >
                Start Your Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right — Hero composite image */}
            <div className="flex items-start justify-center">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/hero/web-ad-720.webp 720w, /images/hero/web-ad-1040.webp 1040w"
                  sizes="(max-width: 768px) 90vw, 520px"
                />
                <img
                  src="/images/hero/web-ad-1040.webp"
                  alt="Study abroad with Admizz — student surrounded by world landmarks"
                  width={1040}
                  height={1114}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full max-w-[520px] h-auto"
                />
              </picture>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ===== 2. SERVICES — Premium feature cards ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3" style={{ color: "#1E6DEB" }}>Our Services</p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-4" style={{ color: "#0D1282" }}>Plan Your Study Abroad Journey</h2>
          <p className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "#5a6275" }}>End-to-end support from career counselling to post-arrival — we guide you through every step.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]" style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}>
                <div className="h-[4px]" style={{ background: service.accent }} />
                <div className="p-5 sm:p-8">
                  <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${service.accent}14` }}>
                    <Image src={service.icon} alt={service.title} width={36} height={36} className="object-contain" />
                  </div>
                  <h3 className="text-[18px] font-bold mb-3" style={{ color: service.accent }}>{service.title}</h3>
                  <p className="text-[14px] leading-[1.7]" style={{ color: "#5a6275" }}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY REELS ===== */}
      <LazyMount minHeight={500}>
        <CommunityReels />
      </LazyMount>

      {/* ===== 3. STUDY DESTINATIONS ===== */}
      <section className="py-16 md:py-20 cv-auto" style={{ background: "#F8F9FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-center mb-3" style={{ color: "#1E6DEB" }}>Explore Destinations</p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-4" style={{ color: "#0D1282" }}>Find Your Perfect Study Country</h2>
          <p className="text-center text-[15px] max-w-2xl mx-auto mb-12" style={{ color: "#5a6275" }}>Discover top international study destinations and take confident steps toward a successful education abroad.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-4 sm:gap-5">
            {destinations.slice(0, 5).map((dest, i) => (
              <div key={dest.name} className={`lg:col-span-2 ${i === 0 ? "lg:col-start-2" : ""}`}>
                <CountryCard {...dest} />
              </div>
            ))}
            {destinations.slice(5).map((dest, i) => (
              <div key={dest.name} className={`lg:col-span-2 ${i === 0 ? "lg:col-start-3" : ""}`}>
                <CountryCard {...dest} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. TURNING DREAMS INTO REALITY ===== */}
      <section className="py-16 md:py-20 bg-white cv-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-center mb-3" style={{ color: "#1E6DEB" }}>Our Ecosystem</p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-4" style={{ color: "#0D1282" }}>Turning Study Abroad Dreams Into Reality</h2>
          <p className="text-center text-[15px] leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "#5a6275" }}>With innovative tech-powered admission solutions, Admizz Education is reshaping how students, colleges, and recruitment partners connect for smarter outcomes.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Students */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]" style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}>
              <div className="h-[4px]" style={{ background: "#1E6DEB" }} />
              <div className="p-5 sm:p-8">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: "#1E6DEB12" }}>
                  <svg className="w-7 h-7" style={{ color: "#1E6DEB" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
                </div>
                <h3 className="text-[20px] font-bold mb-3" style={{ color: "#0D1282" }}>Students</h3>
                <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#5a6275" }}>Get personalized guidance from experienced counselors at Admizz Education for hassle-free university admissions abroad. From course selection to visa processing — we&apos;re with you at every step.</p>
                <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[14px] py-3 -my-3 transition-colors duration-200 hover:opacity-80" style={{ color: "#1E6DEB" }}>Get Started <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></Link>
              </div>
            </div>

            {/* Colleges & Universities */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]" style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}>
              <div className="h-[4px]" style={{ background: "#3FB5A0" }} />
              <div className="p-5 sm:p-8">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: "#3FB5A012" }}>
                  <svg className="w-7 h-7" style={{ color: "#3FB5A0" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>
                </div>
                <h3 className="text-[20px] font-bold mb-3" style={{ color: "#0D1282" }}>Colleges &amp; Universities</h3>
                <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#5a6275" }}>We bring the right people together to challenge conventional thinking and drive transformation in international education recruitment and enrollment.</p>
                <Link href="/universities" className="inline-flex items-center gap-2 font-semibold text-[14px] py-3 -my-3 transition-colors duration-200 hover:opacity-80" style={{ color: "#3FB5A0" }}>Partner With Us <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></Link>
              </div>
            </div>

            {/* Recruitment Partners */}
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]" style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}>
              <div className="h-[4px]" style={{ background: "#E86F3C" }} />
              <div className="p-5 sm:p-8">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: "#E86F3C12" }}>
                  <svg className="w-7 h-7" style={{ color: "#E86F3C" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
                </div>
                <h3 className="text-[20px] font-bold mb-3" style={{ color: "#0D1282" }}>Recruitment Partners</h3>
                <p className="text-[14px] leading-[1.7] mb-6" style={{ color: "#5a6275" }}>With powerful platforms for education consultants, Admizz Education ensures students find the right institutions easily and partners grow their network.</p>
                <Link href="/recruitment-partners" className="inline-flex items-center gap-2 font-semibold text-[14px] py-3 -my-3 transition-colors duration-200 hover:opacity-80" style={{ color: "#E86F3C" }}>Partner With Us <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></Link>
              </div>
            </div>
          </div>

          {/* Video + Accent Banner */}
          <div className="mt-12 grid md:grid-cols-[1.1fr_0.9fr] gap-7 items-stretch">
            <div className="rounded-2xl overflow-hidden aspect-video" style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}>
              <iframe src="https://www.youtube.com/embed/VrIVEimhnFs" title="Welcome to Admizz Education" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full border-0" />
            </div>
            <div className="rounded-2xl px-5 sm:px-8 py-8 md:py-10 flex flex-col justify-center" style={{ background: "linear-gradient(135deg, #1E6DEB 0%, #0D1282 100%)" }}>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ color: "#FCB730" }}>Why Admizz?</p>
              <h3 className="text-white font-bold text-[22px] md:text-[26px] leading-tight mb-4">We Are Not Just An Education Consultancy</h3>
              <p className="text-white/80 text-[15px] leading-[1.7] mb-8">We Are the Future of International Student Recruitment.</p>
              <Link href="/register" className="inline-flex items-center gap-2 font-bold text-[15px] px-7 py-3.5 rounded-lg self-start transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" style={{ background: "#FFD800", color: "#0D1282" }}>Book a Free Counseling <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. STATS — Trust banner ===== */}
      <section className="relative py-16 md:py-20 overflow-hidden cv-auto" style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)" }}>
        <div className="hidden sm:block absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #1E6DEB, transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #3FB5A0, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-center mb-3" style={{ color: "#FCB730" }}>Why Choose Us</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-center text-white mb-4">Trusted by Students Worldwide</h2>
          <p className="text-center text-[15px] text-white/50 max-w-xl mx-auto mb-12">Our numbers speak for themselves — proven results that families and students trust.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "2,000+", label: "Students Successfully Enrolled", icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5", accent: "#1E6DEB" },
              { value: "100+", label: "Partner Universities & Colleges", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z", accent: "#3FB5A0" },
              { value: "95%", label: "Visa Approval Rate", icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#E86F3C" },
              { value: "$2M+", label: "Scholarships Awarded", icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#BB5FEC" },
            ].map((stat) => (
              <div key={stat.label} className="text-center rounded-2xl px-3 py-6 md:px-4 md:py-10 transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-5 flex items-center justify-center" style={{ background: `${stat.accent}20` }}>
                  <svg className="w-5 h-5" fill="none" stroke={stat.accent} strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} /></svg>
                </div>
                <p className="text-[26px] sm:text-[34px] md:text-[42px] font-bold text-white mb-2 leading-none">{stat.value}</p>
                <p className="text-[13px] font-medium text-white/50 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TEST PREPARATION ===== */}
      <section className="py-16 md:py-20 bg-white cv-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "#1E6DEB" }}>Test Preparation</p>
              <h2 className="text-[28px] md:text-[36px] font-bold leading-tight mb-5" style={{ color: "#0D1282" }}>Go Global with Your Test Preparation</h2>
              <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#5a6275" }}>Performing exceptionally in standardized exams is essential for securing admission to leading universities worldwide. Our personalized training programs equip students with the skills, strategies, and confidence to excel.</p>
              <div className="space-y-3 mb-8">
                {[
                  { title: "Personalized Coaching", desc: "Expert 1-on-1 tutoring tailored to your learning style and target score.", accent: "#1E6DEB", icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" },
                  { title: "Flexible Online Learning", desc: "Study anytime, anywhere with live and recorded sessions.", accent: "#3FB5A0", icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" },
                  { title: "Proven Score Improvement", desc: "Data-driven strategies that consistently deliver higher scores.", accent: "#E86F3C", icon: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-4 bg-white rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[8px_13px_24px_8px_rgba(0,0,0,0.07)]" style={{ boxShadow: "4px 6px 12px 4px rgba(0,0,0,0.04)" }}>
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: `${f.accent}14` }}>
                      <svg className="w-5 h-5" style={{ color: f.accent }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold mb-0.5" style={{ color: "#0D1282" }}>{f.title}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color: "#5a6275" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/test-prep" className="inline-flex items-center gap-2 font-semibold text-[15px] px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" style={{ background: "#FFD800", color: "#0D1282" }}>Learn More <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></Link>
            </div>
            <div className="flex flex-col items-center">
              {/* Tagline badge — centered */}
              <div className="flex items-center gap-2 mb-5 rounded-full px-5 py-2" style={{ background: "#EEF2FF" }}>
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#3FB5A0" }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                <p className="text-[13px] font-semibold" style={{ color: "#0D1282" }}>Preparing students for every major global exam</p>
              </div>

              {/* Test logo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {testLogos.map((test, i) => {
                  const accents = ["#1E6DEB", "#3FB5A0", "#E86F3C", "#BB5FEC", "#1E6DEB", "#3FB5A0"];
                  return (
                    <div key={test.name} className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[12px_18px_28px_14px_rgba(0,0,0,0.08)]" style={{ boxShadow: "8px 13px 18px 11px rgba(0,0,0,0.05)" }}>
                      <div className="h-[3px]" style={{ background: accents[i] }} />
                      <div className="px-5 py-6 flex flex-col items-center gap-3">
                        <Image src={test.src} alt={test.name} width={120} height={70} className="object-contain h-14 w-auto" />
                        <p className="text-[13px] font-semibold" style={{ color: "#0D1282" }}>{test.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Score highlights — single unified strip */}
              <div className="w-full mt-5 rounded-xl flex flex-row items-stretch overflow-hidden" style={{ background: "#F8F9FF", border: "1px solid #E8ECF4" }}>
                {/* IELTS — Trophy */}
                <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3.5 px-1.5 sm:px-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "#1E6DEB12" }}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#1E6DEB" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .982-3.172M8.25 8.25a4.5 4.5 0 0 0 0-3H6.75a2.25 2.25 0 0 0-2.25 2.25v.75a2.25 2.25 0 0 0 2.25 2.25h.338M15.75 8.25a4.5 4.5 0 0 1 0-3h1.5a2.25 2.25 0 0 1 2.25 2.25v.75a2.25 2.25 0 0 1-2.25 2.25h-.338M12 1.5a4.5 4.5 0 0 0-4.5 4.5c0 1.875 1.125 3.75 4.5 5.25 3.375-1.5 4.5-3.375 4.5-5.25A4.5 4.5 0 0 0 12 1.5Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-[14px] font-bold leading-none whitespace-nowrap" style={{ color: "#1E6DEB" }}>Band 7+</p>
                    <p className="text-[9px] sm:text-[13px] font-medium mt-0.5" style={{ color: "#8892a6" }}>IELTS Avg. Score</p>
                  </div>
                </div>
                {/* Divider */}
                <div className="w-px self-stretch my-2.5" style={{ background: "#E0E4ED" }} />
                {/* GRE — Target */}
                <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3.5 px-1.5 sm:px-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "#3FB5A012" }}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#3FB5A0" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-[14px] font-bold leading-none" style={{ color: "#3FB5A0" }}>320+</p>
                    <p className="text-[9px] sm:text-[13px] font-medium mt-0.5" style={{ color: "#8892a6" }}>GRE Avg. Score</p>
                  </div>
                </div>
                {/* Divider */}
                <div className="w-px self-stretch my-2.5" style={{ background: "#E0E4ED" }} />
                {/* TOEFL — Trending Up */}
                <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3.5 px-1.5 sm:px-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "#E86F3C12" }}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#E86F3C" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-[14px] font-bold leading-none" style={{ color: "#E86F3C" }}>100+</p>
                    <p className="text-[9px] sm:text-[13px] font-medium mt-0.5" style={{ color: "#8892a6" }}>TOEFL Avg. Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. UNIVERSITY PARTNERS ===== */}
      <LazyMount minHeight={600}>
        <UniversityPartners universities={allUniversities} />
      </LazyMount>

      {/* ===== 8. GOOGLE REVIEWS ===== */}
      <LazyMount minHeight={500}>
        <HomepageReviews reviews={googleReviews} />
      </LazyMount>

      {/* ===== 9. FAQ ===== */}
      <LazyMount minHeight={400}>
        <HomepageFAQ items={faqItems} />
      </LazyMount>

      {/* ===== 10. CTA BANNER ===== */}
      <section className="relative py-14 md:py-20 overflow-hidden cv-auto" style={{ background: "#FFFAED" }}>
        {/* Glassy overlay */}
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)", backdropFilter: "blur(2px)" }} />
        {/* Subtle radial glow */}
        <div className="hidden sm:block absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-40 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[13px] font-semibold tracking-wide" style={{ color: "#0D1282" }}>Accepting Applications</span>
              </div>
              <h2 className="text-[28px] md:text-[40px] font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-rubik), sans-serif", color: "#0D1282" }}>
                Ready to Build Your <span style={{ color: "#E8430C" }}>Global Career?</span>
              </h2>
              <p className="text-[15px] leading-relaxed max-w-md mb-8" style={{ color: "rgba(13,18,130,0.7)" }}>
                Let our expert counselors guide you through university selection, applications, visas, and everything in between.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>24hr Response</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>Average reply time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Free Consultation</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>No commitment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(13,18,130,0.1)" }}>
                    <svg className="w-5 h-5" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Expert Team</p>
                    <p className="text-[13px] sm:text-[11px]" style={{ color: "rgba(13,18,130,0.5)" }}>10+ years experience</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col gap-3">
              {/* Schedule Card */}
              <Link href="/register" className="group block bg-white rounded-2xl p-6 md:p-7 transition-shadow hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#EEF2FF" }}>
                    <svg className="w-6 h-6" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  </div>
                  <svg className="w-5 h-5 text-[#0D1282] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>Schedule a Free Consultation</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">Book a free 30-minute call to discuss your study abroad goals and get expert recommendations.</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: "#0D1282" }}>
                  Book your slot
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
              {/* Email Card */}
              <a href="mailto:hello@admizz.com" className="flex items-center justify-center gap-3 rounded-2xl px-5 py-3 w-full transition-colors hover:opacity-90" style={{ background: "rgba(13,18,130,0.1)", border: "1px solid rgba(13,18,130,0.2)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(13,18,130,0.1)" }}>
                  <svg className="w-4 h-4" style={{ color: "#0D1282" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "#0D1282" }}>Email Us</p>
                  <p className="text-[13px] sm:text-[11px] truncate" style={{ color: "rgba(13,18,130,0.5)" }}>hello@admizz.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

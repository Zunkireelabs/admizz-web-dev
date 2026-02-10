import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ServiceCard from "@/components/ui/ServiceCard";
import CountryCard from "@/components/ui/CountryCard";
import Testimonials from "@/components/ui/Testimonials";
import FAQ from "@/components/ui/FAQ";
import UniversityGrid from "@/components/ui/UniversityGrid";

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
    images: ["/images/hero/web-ad.png"],
    type: "website",
  },
};

const stats = [
  {
    icon: "/images/icons/user.png",
    value: "1500+",
    label: "students successfully enrolled worldwide",
  },
  {
    icon: "/images/icons/online-learning.png",
    value: "100+",
    label: "Prestigious Institutions in Our Global Network",
  },
  {
    icon: "/images/icons/excellence.png",
    value: "95%",
    label: "Student Visa Approval Rate with Expert Guidance",
  },
  {
    icon: "/images/icons/scholarship-108.png",
    value: "$2M+",
    label: "In Scholarships Awarded to Our Students",
  },
];

const services = [
  {
    icon: "/images/icons/consult-108.png",
    title: "Career Counselling",
    description:
      "Get personalized guidance from experienced counselors who understand global education opportunities and can help align your career goals.",
  },
  {
    icon: "/images/icons/scholarship-108.png",
    title: "Scholarship Assistance",
    description:
      "Unlock financial aid opportunities with expert support in identifying and applying for scholarships tailored to your profile.",
  },
  {
    icon: "/images/icons/visa-108.png",
    title: "Visa Support",
    description:
      "Navigate the student visa application process with confidence through step-by-step guidance and documentation support.",
  },
  {
    icon: "/images/icons/accomodation-108.png",
    title: "Post-Arrival Support",
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

const testPrepFeatures = [
  "Personalized Coaching",
  "Flexible Online Learning",
  "Guaranteed Score Improvement",
];

const testLogos = [
  { name: "IELTS", src: "/images/test-prep/IELTS_LOGO.png" },
  { name: "GRE", src: "/images/test-prep/Untitled-design.jpg" },
  { name: "TOEFL", src: "/images/test-prep/TOFEL_LOGO.png" },
  { name: "PTE", src: "/images/test-prep/PTE_LOGO.webp" },
  { name: "SAT", src: "/images/test-prep/SAT.webp" },
  { name: "Duolingo", src: "/images/test-prep/duolingo-2.png" },
];

const testimonials = [
  {
    name: "Niraj Bhattarai",
    text: "From university selection to visa approval, Admizz Education provided exceptional support and made my journey to the UK effortless. I highly recommend them to anyone looking for a trustworthy study abroad partner.",
    rating: 5,
  },
  {
    name: "Yousuf Abdirahman Mohamed",
    text: "I appreciated your unlimited help for my MBA career. It was very tough but I gained a very solid educational background. Thanks Admizz!",
    rating: 5,
  },
  {
    name: "Basant Khadka",
    text: "The journey to college can be overwhelming, but Admizz Education made applying to Weber State University effortless. Thanks to their guidance.",
    rating: 5,
  },
  {
    name: "Satyam Jaiswal",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support. Their team ensured every step of my application visa process was smooth and stress-free.",
    rating: 5,
  },
];

const faqItems = [
  {
    question: "What is Admizz Education and how does it help students study abroad?",
    answer:
      "Admizz Education is a global study-abroad platform that helps students find, apply, and secure admissions to top universities worldwide. From course shortlisting to application guidance, scholarships, SOP support, and visa processing, Admizz simplifies every step of the international education journey.",
  },
  {
    question: "Which countries can I apply to through Admizz Education?",
    answer:
      "You can apply to leading study-abroad destinations such as the USA, UK, Canada, Australia, New Zealand, India, Dubai, and other top European countries. Admizz provides end-to-end admission support for undergraduate, postgraduate, diploma, and pathway programs.",
  },
  {
    question: "Does Admizz Education help with university shortlisting?",
    answer:
      "Yes. Admizz uses expert counsellors and AI-assisted tools to shortlist universities that match your academic profile, preferred country, career goals, and budget. You receive a personalized list of universities with high acceptance chances.",
  },
  {
    question: "Can Admizz assist with SOP, LOR, and application documents?",
    answer:
      "Absolutely. Admizz provides professional guidance for SOPs, LORs, resumes, essays, and application forms. The team ensures your documents meet global university standards and increase your chances of admission.",
  },
  {
    question: "Does Admizz help students with scholarships and fee waivers?",
    answer:
      "Yes. Admizz identifies eligible scholarship opportunities based on your academic performance, program selection, and country preferences. You also receive support for university fee waivers and financial documentation for visa applications.",
  },
  {
    question: "What is the process to apply for a study-abroad program through Admizz Education?",
    answer:
      "The process includes: 1. Profile evaluation 2. Course and country selection 3. University shortlisting 4. Application submission 5. Document preparation 6. Offer letter guidance 7. Visa application support 8. Pre-departure assistance. Admizz makes the entire process fast, transparent, and stress-free.",
  },
  {
    question: "Does Admizz provide visa guidance for international students?",
    answer:
      "Yes. Admizz offers end-to-end visa support including document preparation, financial planning, interview training, and step-by-step guidance to ensure a smooth and successful student visa application.",
  },
  {
    question: "Is Admizz Education free for students?",
    answer:
      "Admizz offers free counselling and guidance for many services. Some specialized services—like premium documentation, fast-track applications, and certain country-specific processing—may involve additional charges. Students are always informed upfront.",
  },
  {
    question: "How long does it take to get admission through Admizz Education?",
    answer:
      "The timeline depends on the country, intake, university, and program. Typically, the entire admission cycle—shortlisting, application submission, and receiving an offer—takes 2 to 12 weeks. Early applicants usually receive faster decisions.",
  },
  {
    question: "Why should I choose Admizz Education over other study-abroad consultancies?",
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

export default function Home() {
  return (
    <main>
      {/* ===== 1. HERO SECTION ===== */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-[42px] font-bold text-navy leading-tight">
                Start Your Study Abroad Journey With{" "}
                <span className="text-yellow">Admizz!</span>
              </h1>
              <p className="mt-4 text-[15px] text-gray-dark leading-relaxed">
                Dreaming of studying abroad? Admizz Education helps you explore
                top destinations, apply to global universities, and prepare for
                success — all through one global portal.
              </p>
              <Link
                href="/register/"
                className="inline-block mt-6 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                Take the First Step to Study Abroad
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/hero/web-ad.png"
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

      {/* ===== 2. TRUST INDICATORS / STATS ===== */}
      <section className="bg-off-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Why Students Trust Us?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-6"
              >
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={64}
                  height={64}
                />
                <p className="mt-4 text-3xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-dark">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. SERVICES ===== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
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
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            The Team Behind Your Study Abroad Dream
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            We bring the right people together to challenge conventional
            thinking and drive transformation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-white rounded-[10px] p-8 text-center border border-border-light">
              <Image
                src="/images/about/2-1-763x1024.png"
                alt="Students"
                width={200}
                height={268}
                className="mx-auto h-48 w-auto object-contain"
              />
              <h3 className="mt-6 text-xl font-bold text-navy">Students</h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                Get personalized guidance from experienced counselors who
                understand your goals and aspirations for studying abroad.
              </p>
              <Link
                href="/register/"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Register Now
              </Link>
            </div>

            {/* Recruitment Partners */}
            <div className="bg-white rounded-[10px] p-8 text-center border border-border-light">
              <Image
                src="/images/about/2-2-763x1024.png"
                alt="Recruitment Partners"
                width={200}
                height={268}
                className="mx-auto h-48 w-auto object-contain"
              />
              <h3 className="mt-6 text-xl font-bold text-navy">
                Recruitment Partners
              </h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                Join our global network of recruitment partners and help
                students find the right educational opportunities worldwide.
              </p>
              <Link
                href="/recruitment-partners/"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Learn more
              </Link>
            </div>

            {/* Colleges & Universities */}
            <div className="bg-white rounded-[10px] p-8 text-center border border-border-light">
              <Image
                src="/images/about/2-3-763x1024.png"
                alt="Colleges & Universities"
                width={200}
                height={268}
                className="mx-auto h-48 w-auto object-contain"
              />
              <h3 className="mt-6 text-xl font-bold text-navy">
                Colleges & Universities
              </h3>
              <p className="mt-3 text-sm text-gray-dark leading-relaxed">
                Partner with Admizz to reach qualified international students
                and grow your global enrollment pipeline.
              </p>
              <Link
                href="/universities/"
                className="inline-block mt-5 bg-blue-dark text-white font-semibold text-[15px] px-6 py-2.5 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. STUDY DESTINATIONS ===== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-4">
            Discover Your Perfect Study Country
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-10">
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

      {/* ===== 6. TEST PREPARATION ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-[28px] font-bold text-navy mb-4">
                Go global with your Test Preparation
              </h2>
              <p className="text-[15px] text-gray-dark leading-relaxed mb-6">
                As the global demand for higher education continues to grow,
                performing exceptionally in standardized exams has become
                essential for securing admission to leading colleges and
                universities worldwide. At Admizz Education, we understand the
                critical role of competitive exams such as IELTS, TOEFL, GRE,
                GMAT, SAT, and others in shaping your study abroad journey.
              </p>
              <ul className="space-y-3 mb-6">
                {testPrepFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-[15px] text-navy font-medium"
                  >
                    <svg
                      className="w-5 h-5 text-golden flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/test-prep/"
                className="inline-block bg-blue-dark text-white font-semibold text-[15px] px-8 py-3 rounded-[10px] hover:bg-blue-royal transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div>
              <Image
                src="/images/hero/sudy-abroad-f-e1763551074605-1024x942.webp"
                alt="Test Preparation"
                width={500}
                height={460}
                className="w-full h-auto"
              />
              <div className="grid grid-cols-3 gap-4 mt-6">
                {testLogos.map((test) => (
                  <div
                    key={test.name}
                    className="bg-white border border-border-light rounded-[10px] p-3 flex items-center justify-center aspect-[3/2]"
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

      {/* ===== 7. TESTIMONIALS ===== */}
      <Testimonials
        title="What Our Students Say"
        testimonials={testimonials}
      />

      {/* ===== 8. FAQ ===== */}
      <FAQ items={faqItems} />

      {/* ===== 9. UNIVERSITY PARTNERS ===== */}
      <section className="bg-off-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            Global Top Universities
          </h2>

          {/* UK Universities */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-navy mb-6 text-center">
              UK Institutions
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
              {ukUniversities.map((uni) => (
                <div
                  key={uni.name}
                  className="bg-white border border-border-light rounded-[10px] p-4 flex items-center justify-center aspect-[3/2] hover:shadow-md transition-shadow"
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {usaUniversities.map((uni) => (
                <div
                  key={uni.name}
                  className="bg-white border border-border-light rounded-[10px] p-4 flex items-center justify-center aspect-[3/2] hover:shadow-md transition-shadow"
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
    </main>
  );
}

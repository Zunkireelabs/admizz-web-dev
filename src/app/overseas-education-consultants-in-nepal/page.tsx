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
  title: "Overseas Education Consultants in Nepal - Admizz Education",
  description:
    "Admizz Education is one of Nepal\u2019s top overseas education consultants offering expert counselling, visa help & scholarship support.",
  alternates: {
    canonical: "https://admizzeducation.com/overseas-education-consultants-in-nepal",
  },
  openGraph: {
    title: "Overseas Education Consultants in Nepal - Admizz Education",
    description:
      "Admizz Education is one of Nepal\u2019s top overseas education consultants offering expert counselling, visa help & scholarship support.",
    url: "https://admizzeducation.com/overseas-education-consultants-in-nepal",
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
    title: "World-class Education & Faculty",
    description:
      "Gain access to globally recognized universities with world-renowned faculty, cutting-edge curriculum, and accredited programs that set you apart in the job market.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    title: "Better Global Career Prospects",
    description:
      "An international degree opens doors to global career opportunities, higher earning potential, and professional networks that span across continents.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "International Research & Innovation Access",
    description:
      "Collaborate with leading researchers and access state-of-the-art laboratories, innovation hubs, and funding opportunities at top global institutions.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Exposure to Multicultural Environments",
    description:
      "Immerse yourself in diverse cultures, build a global perspective, and develop interpersonal skills that are highly valued by employers worldwide.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Language & Communication Skill Development",
    description:
      "Studying abroad naturally sharpens your English proficiency, communication abilities, and presentation skills -- critical assets for any global career.",
    icon: (
      <svg className="w-8 h-8 text-blue-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    title: "Opportunities for Scholarships & Internships",
    description:
      "Access merit-based and need-based scholarships, paid internships, and work-study programs that can significantly reduce your education costs abroad.",
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
  { name: "Study in Denmark", image: "/images/destinations/denmark1.webp", href: "/study-in-denmark", description: "Known for innovation and cutting-edge research programs." },
  { name: "Study in Dubai", image: "/images/destinations/uae1.webp", href: "/study-in-dubai", description: "A modern hub offering global education and career opportunities in one of the fastest-growing economies." },
  { name: "Study in France", image: "/images/destinations/france1.webp", href: "/study-in-france", description: "Famous for arts, fashion, business, and technology programs." },
  { name: "Study in India", image: "/images/destinations/india1.webp", href: "/study-in-india", description: "Affordable education options in a culturally diverse environment for international students." },
  { name: "Study in New Zealand", image: "/images/destinations/newzealand1.webp", href: "/study-in-newzealand", description: "Safe, welcoming, and focused on hands-on, career-oriented education." },
  { name: "Study in South Korea", image: "/images/destinations/usa1.webp", href: "/study-in-south-korea", description: "Advanced technology-driven education paired with cultural richness." },
  { name: "Study in the UK", image: "/images/destinations/uk1.webp", href: "/study-in-the-uk", description: "Home to prestigious, centuries-old institutions and globally recognized degrees." },
  { name: "Study in the USA", image: "/images/destinations/usa1.webp", href: "/study-in-the-usa", description: "The top destination for research, innovation, and global careers." },
];

const tips = [
  {
    title: "Start Early",
    description:
      "Begin planning 12-18 months before your intended intake. This gives you ample time for test preparation, documentation, and application submission.",
    icon: (
      <svg className="w-7 h-7 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Focus on Language Proficiency",
    description:
      "Prepare thoroughly for IELTS or PTE with practice tests and mock exams. Strong language scores significantly boost your university and visa applications.",
    icon: (
      <svg className="w-7 h-7 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Choose the Right Course",
    description:
      "Align your course selection with long-term career goals. Research job market trends and post-study work visa options in your chosen destination.",
    icon: (
      <svg className="w-7 h-7 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Apply for Scholarships",
    description:
      "Leverage both need-based and merit-based scholarship options. Many universities offer generous funding for international students from Nepal.",
    icon: (
      <svg className="w-7 h-7 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Prepare Strong SOP & Documents",
    description:
      "Your Statement of Purpose should clearly articulate your academic journey, career aspirations, and reasons for choosing a specific university and country.",
    icon: (
      <svg className="w-7 h-7 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Understand Visa Requirements",
    description:
      "Each country has unique visa requirements and timelines. Our expert consultants guide you step by step through document preparation and interview readiness.",
    icon: (
      <svg className="w-7 h-7 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
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
    question: "What does an overseas education consultant in Nepal do?",
    answer:
      "An overseas education consultant in Nepal helps students plan and pursue higher education abroad by offering services such as career counseling, course and university selection, application guidance, scholarship assistance, visa documentation, and pre-departure orientation.",
  },
  {
    question: "Why should I choose a study abroad consultant in Nepal?",
    answer:
      "Choosing a reliable consultant ensures expert guidance at every stage -- from selecting the right country and course to preparing a strong visa file. Consultants help reduce errors, increase acceptance rates, and simplify the entire process.",
  },
  {
    question: "Which countries do overseas education consultants in Nepal support?",
    answer:
      "Top education consultants in Nepal like Admizz Education assist students in applying to countries such as the USA, UK, Canada, Australia, New Zealand, Germany, Japan, and across Europe.",
  },
  {
    question: "Is studying abroad expensive for Nepali students?",
    answer:
      "The cost of studying abroad varies by country, university, and course. However, many students manage their expenses through scholarships, grants, and part-time work opportunities available in most countries.",
  },
  {
    question: "Do I need IELTS or PTE to study abroad from Nepal?",
    answer:
      "Yes, most universities abroad require IELTS, PTE, or TOEFL scores to assess your English proficiency. Overseas education consultants in Nepal also offer training and preparation support for these exams.",
  },
  {
    question: "Can I get a scholarship to study abroad from Nepal?",
    answer:
      "Yes, there are numerous merit-based, need-based, and country-specific scholarships available for Nepali students. A good education consultant will guide you in applying for the right ones and meeting eligibility criteria.",
  },
  {
    question: "How early should I start my study abroad process?",
    answer:
      "It's best to start your study abroad journey 12-18 months before your intended intake. This allows ample time for test preparation, documentation, application submission, and visa processing.",
  },
  {
    question: "How do overseas education consultants help with student visas?",
    answer:
      "Consultants help students prepare accurate visa applications, provide document checklists, schedule visa appointments, and conduct mock visa interviews to increase the chances of approval.",
  },
  {
    question: "Is the initial counseling with Admizz Education free?",
    answer:
      "Yes, Admizz Education offers free initial counseling sessions for students interested in studying abroad. This includes profile evaluation, country options, and course suggestions.",
  },
  {
    question: "How can I contact a trusted overseas education consultant in Nepal?",
    answer:
      "You can reach out to Admizz Education through their website, visit one of their branches in Kathmandu or Birgunj, or call at +977-1-5328444 / +977-9856100444 to book a free counseling session.",
  },
];

export default async function OverseasEducationConsultantsNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "study-abroad" });

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-3 text-yellow">
                Trusted Education Consultants
              </p>
              <h1 className="text-[28px] sm:text-4xl md:text-[48px] font-bold leading-tight">
                Overseas Education Consultants in Nepal
              </h1>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed opacity-85">
                Study in USA, UK, Canada, Australia &amp; More with Expert Guidance
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
            Why Choose Overseas Education?
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Studying abroad extends beyond degree attainment -- it encompasses
            personal, academic, and professional growth. As premier study abroad
            consultants in Nepal, Admizz Education facilitates access to
            transformative international opportunities.
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

      {/* ===== WHY ADMIZZ ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Why Admizz Education is Among the Best Overseas Education
            Consultants in Nepal
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-3xl mx-auto mb-10">
            With extensive experience and dedication to quality, Admizz
            Education has established itself as a reliable choice within
            Nepal&apos;s study abroad marketplace. The organization tailors each
            student&apos;s path to facilitate achievement of academic aspirations
            internationally.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-border-light rounded-[10px] p-7">
              <h3 className="text-lg font-bold text-navy mb-2">
                Personalized Counseling
              </h3>
              <p className="text-sm text-gray-dark leading-relaxed">
                Every student receives one-on-one guidance tailored to their
                academic background, financial situation, and career goals. Our
                expert counselors map the best pathway for your international
                education journey.
              </p>
            </div>
            <div className="bg-white border border-border-light rounded-[10px] p-7">
              <h3 className="text-lg font-bold text-navy mb-2">
                End-to-End Visa Support
              </h3>
              <p className="text-sm text-gray-dark leading-relaxed">
                From document preparation to mock interviews, we provide
                comprehensive visa assistance with a 95% approval rate. Our team
                ensures your application is accurate and complete.
              </p>
            </div>
            <div className="bg-white border border-border-light rounded-[10px] p-7">
              <h3 className="text-lg font-bold text-navy mb-2">
                Scholarship Assistance
              </h3>
              <p className="text-sm text-gray-dark leading-relaxed">
                We have helped students secure over $2M in scholarships. Our
                team identifies the best scholarship opportunities based on your
                profile and helps you craft winning applications.
              </p>
            </div>
            <div className="bg-white border border-border-light rounded-[10px] p-7">
              <h3 className="text-lg font-bold text-navy mb-2">
                Global University Network
              </h3>
              <p className="text-sm text-gray-dark leading-relaxed">
                With partnerships across 100+ prestigious institutions
                worldwide, we connect you directly with universities that match
                your academic goals and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Where Can You Study With Admizz?
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-3xl mx-auto mb-12">
            Admizz Education provides pathways to world-leading study
            destinations. Whether pursuing high-caliber instruction, post-study
            employment options, or permanent residency routes, Admizz assists in
            selecting appropriate countries aligned with academic objectives,
            financial capacity, and professional aspirations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <CountryCard key={dest.name} name={dest.name} image={dest.image} href={dest.href} description={dest.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIPS ===== */}
      <section className="bg-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-3">
            Study Abroad Tips for Nepali Students
          </h2>
          <p className="text-center text-[15px] text-gray-dark max-w-2xl mx-auto mb-12">
            Initiating study abroad preparation well in advance proves
            essential. Admizz provides comprehensive guidance spanning test
            preparation through pre-departure readiness, ensuring students
            commence international education confidently.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white border border-border-light rounded-[10px] p-7"
              >
                <div className="w-12 h-12 bg-navy rounded-[10px] flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-dark leading-relaxed">
                  {tip.description}
                </p>
              </div>
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

      <StudyAbroadInsights posts={blogPosts} countryName="Study Abroad" categorySlug="study-abroad" />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-navy via-blue-dark to-blue-royal text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">
            Ready to Begin Your Study Abroad Journey?
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

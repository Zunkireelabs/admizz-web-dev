import type { Metadata } from "next";
import JobCard from "./JobCard";

export const metadata: Metadata = {
  title: "Careers | Admizz Education",
  description:
    "Join Admizz Education and be part of a mission to democratize access to global education opportunities. Explore open positions.",
  alternates: {
    canonical: "https://admizzeducation.com/careers",
  },
  openGraph: {
    title: "Careers | Admizz Education",
    description:
      "Join Admizz Education and be part of a mission to democratize access to global education opportunities. Explore open positions.",
    url: "https://admizzeducation.com/careers",
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "10+", label: "Years of Expertise" },
  { value: "12+", label: "Study Destinations" },
  { value: "1000+", label: "Students Guided" },
  { value: "200+", label: "University Partners" },
];

const perks = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.727-3.56" />
      </svg>
    ),
    title: "Global Exposure",
    description: "Work with students and universities across 12+ countries worldwide.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Learning & Growth",
    description: "Regular training, mentorship, and clear career advancement paths.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Team Culture",
    description: "Collaborative, supportive environment where every voice matters.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Meaningful Work",
    description: "Every day, you help someone take a life-changing step toward their dream.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Festival & Team Events",
    description: "Celebrate together with team outings, festivals, and fun activities.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Competitive Pay",
    description: "Fair compensation with performance bonuses and salary reviews.",
  },
];

const testimonials = [
  {
    name: "Srijana Sharma",
    role: "Senior Counsellor",
    tenure: "3 years at Admizz",
    quote:
      "Working at Admizz has been incredibly rewarding. Every student I help get into their dream university reminds me why I chose this career. The team feels like family.",
  },
  {
    name: "Rajesh Adhikari",
    role: "Marketing Lead",
    tenure: "2 years at Admizz",
    quote:
      "The growth I've experienced here is unmatched. From day one, I was trusted with real responsibilities and given the freedom to innovate. It's a place where your ideas matter.",
  },
  {
    name: "Anisha Poudel",
    role: "Operations Coordinator",
    tenure: "1.5 years at Admizz",
    quote:
      "What I love most is our team culture. Everyone is approachable, collaborative, and genuinely invested in each other's success. It never feels like just a job.",
  },
];

const hiringSteps = [
  {
    step: "01",
    title: "Apply",
    description: "Submit your resume and cover letter via email.",
  },
  {
    step: "02",
    title: "Screening",
    description: "Our HR team reviews your application within 3-5 business days.",
  },
  {
    step: "03",
    title: "Interview",
    description: "A conversation with the team to understand your skills and fit.",
  },
  {
    step: "04",
    title: "Offer",
    description: "If it's a match, you'll receive an offer and onboarding details.",
  },
];

const openPositions = [
  {
    id: "multi-destination-counsellor",
    title: "Multi-Destination Counsellor",
    level: "Mid-level",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    mode: "On-site",
    description:
      "Conduct counselling sessions, support university applications, and collaborate with students and parents to guide them through their study abroad journey across multiple destinations.",
    responsibilities: [
      "Conduct one-on-one counselling sessions with prospective students",
      "Guide students through university selection, application, and visa processes",
      "Stay updated on admission requirements for USA, UK, Australia, and Europe",
      "Collaborate with the marketing and operations team for student outreach",
      "Maintain accurate student records and follow up on application progress",
    ],
    requirements: [
      "Bachelor's degree in Counselling, Education, or related field",
      "Minimum 1 year of experience in study abroad counselling",
      "Knowledge of admissions processes for USA, UK, Australia, or Europe",
      "Excellent communication and interpersonal skills",
      "Fluency in English and Nepali",
    ],
    screeningQuestions: [
      {
        id: "experience",
        question: "How many years of relevant experience do you have?",
        type: "radio" as const,
        options: ["1 year", "2 years", "3+ years"],
        required: true,
      },
      {
        id: "destinations",
        question: "Which study destinations do you have expertise in?",
        type: "select" as const,
        options: ["USA", "UK", "Australia", "Canada", "Multi-Destination"],
        required: true,
      },
      {
        id: "onsite",
        question: "Are you comfortable working on-site in Kathmandu?",
        type: "radio" as const,
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function CareersPage() {
  return (
    <main style={{ fontFamily: "'Montserrat', var(--font-montserrat), sans-serif" }}>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-blue-dark via-blue-royal to-navy text-white py-20 md:py-32 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-yellow mb-4">
              Careers at Admizz
            </span>
            <h1 className="text-4xl md:text-[56px] font-bold leading-[1.1] mb-6">
              Shape the Future of
              <br />
              <span className="text-yellow">Global Education</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-10">
              Join a passionate team that helps students across Nepal, India, and
              beyond access world-class education in 12+ countries.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#open-positions"
                className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
              >
                View Open Positions
              </a>
              <a
                href="#life-at-admizz"
                className="inline-block border-2 border-white/30 text-white font-semibold text-[15px] px-8 py-3.5 rounded-[10px] hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                Life at Admizz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-navy text-white py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-bold text-yellow">{stat.value}</p>
                <p className="text-sm text-white/60 mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PERKS & BENEFITS ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-royal mb-3">
              Why Join Us
            </span>
            <h2 className="text-2xl md:text-[40px] font-bold text-navy mb-4 leading-tight">
              Perks & Benefits
            </h2>
            <p className="text-[15px] text-gray-dark max-w-2xl mx-auto leading-relaxed">
              We invest in our people because great teams build great outcomes.
              Here&apos;s what you can expect when you join Admizz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="group relative bg-off-white rounded-[10px] p-7 hover:bg-white hover:shadow-lg border border-transparent hover:border-border-light transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-[10px] bg-blue-royal/10 group-hover:bg-blue-royal/15 flex items-center justify-center mb-5 text-blue-royal transition-colors">
                  {perk.icon}
                </div>
                <h3 className="text-base font-bold text-navy mb-2">{perk.title}</h3>
                <p className="text-[14px] text-gray-dark leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OPEN POSITIONS ===== */}
      <section id="open-positions" className="py-16 md:py-24 bg-off-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-royal mb-3">
              Join the Team
            </span>
            <h2 className="text-2xl md:text-[40px] font-bold text-navy mb-4 leading-tight">
              Open Positions
            </h2>
            <p className="text-[15px] text-gray-dark max-w-xl mx-auto leading-relaxed">
              Explore our current openings and find the role that fits you best.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIFE AT ADMIZZ (Testimonials) ===== */}
      <section id="life-at-admizz" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-royal mb-3">
              Our People
            </span>
            <h2 className="text-2xl md:text-[40px] font-bold text-navy mb-4 leading-tight">
              Life at Admizz
            </h2>
            <p className="text-[15px] text-gray-dark max-w-2xl mx-auto leading-relaxed">
              Hear from our team members about what it&apos;s really like to work here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-off-white rounded-[10px] p-7 flex flex-col"
              >
                {/* Quote icon */}
                <svg className="w-8 h-8 text-blue-royal/20 mb-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                </svg>
                <p className="text-[14px] text-gray-dark leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-border-light pt-4">
                  <p className="text-sm font-bold text-navy">{t.name}</p>
                  <p className="text-xs text-gray-dark mt-0.5">{t.role}</p>
                  <p className="text-xs text-gray-medium mt-0.5">{t.tenure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HIRING PROCESS ===== */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-royal mb-3">
              What to Expect
            </span>
            <h2 className="text-2xl md:text-[40px] font-bold text-navy mb-4 leading-tight">
              Our Hiring Process
            </h2>
            <p className="text-[15px] text-gray-dark max-w-xl mx-auto leading-relaxed">
              Simple, transparent, and respectful of your time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringSteps.map((step, i) => (
              <div key={step.step} className="relative">
                {/* Connector line (desktop only) */}
                {i < hiringSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-border-light" />
                )}
                <div className="bg-white rounded-[10px] p-6 text-center border border-border-light relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-royal to-blue-dark text-white flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-[13px] text-gray-dark leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-dark via-blue-royal to-navy text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-[40px] font-bold mb-4 leading-tight">
            Don&apos;t See the Right Role?
          </h2>
          <p className="text-base md:text-lg text-white/75 leading-relaxed mb-8 max-w-xl mx-auto">
            We&apos;re always looking for talented individuals who share our
            passion for education. Send us your resume and we&apos;ll keep you in
            mind for future opportunities.
          </p>
          <a
            href="mailto:hr@admizz.com?subject=General Application — Admizz Education"
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3.5 rounded-[10px] hover:bg-yellow-bright transition-colors"
          >
            Send Your Resume
          </a>
          <p className="text-sm text-white/50 mt-5">
            Or email us directly at{" "}
            <a href="mailto:hr@admizz.com" className="text-yellow hover:underline">
              hr@admizz.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

"use client";

import CRMFormEmbed from "@/components/ui/CRMFormEmbed";
import UniversityPartners from "@/app/UniversityPartners";
import { allUniversities } from "@/lib/universities";
import GlobalPresence from "@/components/ui/GlobalPresence";
import AlumniSection from "@/components/ui/AlumniSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const offices = [
  {
    country: "USA",
    flag: "us",
    bg: "#EEF6FF",
    city: "Denver, Colorado, USA",
    address: "",
    phone: "",
    email: "hello@admizz.com",
  },
  {
    country: "India",
    flag: "in",
    bg: "#F5F2FF",
    city: "",
    address: "2nd Floor, Jayaram Building, Kanakapura Main Road, Bengaluru, Karnataka 560062, India",
    phone: "",
    email: "hello@admizz.com",
  },
  {
    country: "Zambia",
    flag: "zm",
    bg: "#FFFBEA",
    city: "",
    address: "Plot number 12A, Lusaka, Zambia",
    phone: "",
    email: "hello@admizz.com",
  },
  {
    country: "Nepal",
    flag: "np",
    bg: "#FFFBEA",
    cities: [
      {
        name: "Kathmandu",
        address: "Sita Ram Square (4th Floor), Putalisadak, Kathmandu 44600, Nepal (Opp. to Nabil Bank)",
        phone: "+977-01-5328444, +977-9856100444",
      },
      {
        name: "Birgunj",
        address: "4th Floor, Link Road, Birgunj, Parsa, Nepal",
        phone: "+977-9856100444",
      },
    ],
    email: "hello@admizz.com",
  },
  {
    country: "Bangladesh",
    flag: "bd",
    bg: "#EEF6FF",
    city: "",
    address: "Rajagalli, Bogra, Bangladesh",
    phone: "",
    email: "hello@admizz.com",
  },
];

const stats = [
  { value: "2,000+", label: "Students Successfully Enrolled", icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5", accent: "#1E6DEB" },
  { value: "100+", label: "Partner Universities & Colleges", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z", accent: "#3FB5A0" },
  { value: "95%", label: "Visa Approval Rate", icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#E86F3C" },
  { value: "$2M+", label: "Scholarships Awarded", icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", accent: "#BB5FEC" },
];


/* ------------------------------------------------------------------ */
/*  Stars component                                                    */
/* ------------------------------------------------------------------ */

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function RegisterPage() {
  return (
    <main className="pb-20 md:pb-0">
      <meta name="robots" content="noindex, nofollow" />
      {/* ===== HERO STRIP (compact, refined) ===== */}
      <section
        className="py-4 md:py-6 relative"
        style={{ background: "linear-gradient(180deg, #F4F7FF 0%, #EEF2FF 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
            <h1
              className="text-[17px] sm:text-[20px] md:text-[22px] font-bold leading-snug md:leading-tight"
              style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}
            >
              Get one-on-one help with your study abroad journey
            </h1>

            <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 md:flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <Stars count={5} />
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#0D1282]">4.8</span>
              </div>
              <span className="text-[#9CA3B5]">·</span>
              <span className="text-[12px] sm:text-[13px] text-[#5C7189]">
                Trusted by <strong className="text-[#0D1282]">2,000+</strong> students
              </span>
            </div>
          </div>
        </div>
        {/* Gold accent line at bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent 0%, #FCB730 30%, #FCB730 70%, transparent 100%)" }} />
      </section>

      {/* ===== FORM + CONVERSION STACK (side by side) ===== */}
      <section id="enquiry-form" className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* --- LEFT: Enquiry Form (iframe) --- */}
          <div>
            <h2
              className="text-xl md:text-[26px] font-semibold text-[#0D1282] mb-2"
              style={{ fontFamily: 'var(--font-rubik), sans-serif' }}
            >
              Enquiry Form
            </h2>
            <p className="text-sm text-gray-dark mb-6 leading-relaxed">
              Share your details and our expert team will guide you step-by-step
              toward your dream university abroad.
            </p>

            <div
              className="p-3 sm:p-5"
              style={{
                border: "1px solid #D4955A",
                borderRadius: 24,
                background: "linear-gradient(to bottom, #F0ECF9, #FFFFFF)",
                maxWidth: 600,
              }}
            >
              <CRMFormEmbed formSource="registration" />
            </div>
          </div>

          {/* --- RIGHT: What Happens Next — 3 steps vertically, full height --- */}
          <div className="flex flex-col h-full gap-5">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] mb-1" style={{ color: "#1E6DEB" }}>What happens next</p>
              <h2 className="text-[20px] md:text-[24px] font-bold leading-tight" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}>
                From form to roadmap in 3 simple steps
              </h2>
            </div>

            {[
              { step: "Step 1", emoji: "📝", title: "Share your details", desc: "Tell us your target country, field of study, and budget. Takes under 2 minutes.", accent: "#1E6DEB", bg: "#EBF3FF" },
              { step: "Step 2", emoji: "📞", title: "Your counsellor calls within 24 hours", desc: "They'll map out your options, answer your questions, and explain exactly what comes next — no pressure.", accent: "#3FB5A0", bg: "#EDFAF7" },
              { step: "Step 3", emoji: "🎯", title: "Receive your personalized roadmap", desc: "A curated university shortlist with deadlines, scholarship options, and a clear action plan.", accent: "#E86F3C", bg: "#FFF4EE" },
            ].map((s) => (
              <div key={s.step} className="flex-1 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col" style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(13,18,130,0.04)" }}>
                <div className="h-[3px]" style={{ background: s.accent }} />
                <div className="p-5 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] flex-shrink-0" style={{ background: s.bg }}>{s.emoji}</div>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: `${s.accent}14`, color: s.accent }}>{s.step}</span>
                  </div>
                  <h3 className="text-[15px] font-bold mb-1" style={{ color: "#0D1282" }}>{s.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#5C7189" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST CARDS (horizontal, below form) ===== */}
      <section className="py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Card 1: Trust — BLUE */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ border: "1px solid #F0F0F0" }}>
              <div className="h-[3px]" style={{ backgroundColor: "#1E6DEB" }} />
              <div className="p-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#EBF3FF" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#1E6DEB" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: "#1E6DEB" }}>Why Students Trust Us?</h3>
                <p className="text-[13px] text-gray-dark leading-relaxed">
                  <strong className="text-[#0D1282]">ICEF-Accredited Agency</strong> | <strong className="text-[#0D1282]">10+ Years of Excellence</strong> | <strong className="text-[#0D1282]">2,000+ Students Enrolled</strong>
                </p>
              </div>
            </div>

            {/* Card 2: Testimonial — GREEN */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ border: "1px solid #F0F0F0" }}>
              <div className="h-[3px]" style={{ backgroundColor: "#3FB5A0" }} />
              <div className="p-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#EDFAF7" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#3FB5A0" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: "#3FB5A0" }}>What Students Say?</h3>
                <p className="text-[13px] text-gray-dark leading-relaxed italic mb-4">
                  &ldquo;Admizz helped me figure out the right country, the right course, and got me there. Best decision I made.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: "#F0F0F0" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold flex-shrink-0" style={{ background: "rgba(30,109,235,0.12)", color: "#1E6DEB" }}>N</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold leading-tight" style={{ color: "#0D1282" }}>Neharika Gurung</p>
                    <p className="text-[11px] mt-0.5 leading-tight" style={{ color: "#5C7189" }}>Coventry University · 🇳🇵 → 🇬🇧</p>
                  </div>
                  <div className="flex-shrink-0"><Stars count={5} /></div>
                </div>
              </div>
            </div>

            {/* Card 3: Chat — GOLD */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ border: "1px solid #F0F0F0" }}>
              <div className="h-[3px]" style={{ backgroundColor: "#FCB730" }} />
              <div className="p-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#FFF8E5" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#FCB730" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: "#FCB730" }}>Prefer to Chat Instead?</h3>
                <p className="text-[13px] text-gray-dark leading-relaxed mb-4">
                  Talk to one of our counselor directly on WhatsApp. Real people, real answers.
                </p>
                <a
                  href="https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%27m%20interested%20in%20studying%20abroad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "#25D366", color: "#FFFFFF", minHeight: 44 }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Alumni Section ===== */}
      <AlumniSection />

      {/* ===== COUNSELLOR FACES BAND (NEW — preview only) ===== */}
      <section className="py-10 md:py-16" style={{ background: "#F8F9FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: "#1E6DEB" }}>
              Real people, real expertise
            </p>
            <h2 className="text-[22px] md:text-[32px] font-bold leading-tight mb-3" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}>
              Meet your counsellors
            </h2>
            <p className="text-[14px] md:text-[15px] max-w-xl mx-auto" style={{ color: "#5C7189" }}>
              Speak with the right counsellor for your goal — they&rsquo;ll guide you personally through every step.
            </p>
          </div>

          {/* Mobile: horizontal swipe carousel. md+: 5-col grid */}
          <div className="md:hidden -mx-4 px-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 w-max">
              {[
                { initial: "A", name: "Aarav Sharma", role: "Senior Counsellor", langs: "EN · NE · HI", color: "#1E6DEB", bg: "#EBF3FF" },
                { initial: "P", name: "Priya Gurung", role: "UK Programs Lead", langs: "EN · NE", color: "#3FB5A0", bg: "#EDFAF7" },
                { initial: "S", name: "Sita Tamang", role: "USA Programs Lead", langs: "EN · NE", color: "#E86F3C", bg: "#FFF4EE" },
                { initial: "R", name: "Rajesh KC", role: "Visa Specialist", langs: "EN · NE · HI", color: "#BB5FEC", bg: "#F8F0FF" },
                { initial: "M", name: "Manish Adhikari", role: "Test Prep Lead", langs: "EN · NE", color: "#E04562", bg: "#FFF0F4" },
              ].map((c) => (
                <div key={c.name} className="bg-white rounded-2xl p-5 text-center flex-shrink-0 w-[150px]" style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(13,18,130,0.04)" }}>
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-3 text-[28px] font-bold" style={{ background: c.bg, color: c.color }}>
                    {c.initial}
                  </div>
                  <p className="text-[13px] font-bold leading-tight" style={{ color: "#0D1282" }}>{c.name}</p>
                  <p className="text-[11px] mt-1 leading-tight" style={{ color: "#5C7189" }}>{c.role}</p>
                  <p className="text-[10px] mt-2 font-medium" style={{ color: "#8892A6" }}>{c.langs}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-5 gap-4 md:gap-6">
            {[
              { initial: "A", name: "Aarav Sharma", role: "Senior Counsellor", langs: "EN · NE · HI", color: "#1E6DEB", bg: "#EBF3FF" },
              { initial: "P", name: "Priya Gurung", role: "UK Programs Lead", langs: "EN · NE", color: "#3FB5A0", bg: "#EDFAF7" },
              { initial: "S", name: "Sita Tamang", role: "USA Programs Lead", langs: "EN · NE", color: "#E86F3C", bg: "#FFF4EE" },
              { initial: "R", name: "Rajesh KC", role: "Visa Specialist", langs: "EN · NE · HI", color: "#BB5FEC", bg: "#F8F0FF" },
              { initial: "M", name: "Manish Adhikari", role: "Test Prep Lead", langs: "EN · NE", color: "#E04562", bg: "#FFF0F4" },
            ].map((c) => (
              <div key={c.name} className="bg-white rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(13,18,130,0.04)" }}>
                <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-3 text-[32px] font-bold" style={{ background: c.bg, color: c.color }}>
                  {c.initial}
                </div>
                <p className="text-[14px] font-bold leading-tight" style={{ color: "#0D1282" }}>{c.name}</p>
                <p className="text-[12px] mt-1" style={{ color: "#5C7189" }}>{c.role}</p>
                <p className="text-[11px] mt-2 font-medium" style={{ color: "#8892A6" }}>{c.langs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION (NEW — preview only) ===== */}
      <section className="py-10 md:py-16" style={{ background: "#F8F9FF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: "#1E6DEB" }}>
              Common questions
            </p>
            <h2 className="text-[24px] md:text-[32px] font-bold leading-tight" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}>
              Quick answers to what you might be wondering
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              {
                q: "Is this really free? Are there any hidden costs?",
                a: "Yes, completely free for students. Admizz earns from our university partners — never from you. No fees, deposits, or commission charged to your side, ever.",
              },
              {
                q: "How long is the counselling call?",
                a: "Typically 15–30 minutes. Just enough time to understand your goals, answer your questions, and recommend next steps — no pressure or sales pitch.",
              },
              {
                q: "Will my data be sold or used for spam?",
                a: "Never. Your information is used only by our team to guide your application. We don't sell or share your data with third parties. You can opt out of any communication at any time.",
              },
              {
                q: "What if I'm not sure where I want to study yet?",
                a: "That's exactly why most students reach out — to figure it out. Our counsellors help you compare destinations based on your budget, goals, and preferred field of study.",
              },
              {
                q: "Can I change my mind after registering?",
                a: "Of course. Registering is just to start a conversation. You're under no obligation to proceed, and there's nothing to cancel. Take your time.",
              },
              {
                q: "Do you have an office I can visit instead?",
                a: "Yes — offices in Kathmandu (Putalisadak), Birgunj, plus partner offices in India, Bangladesh, USA, and Zambia. Walk in any time during business hours, no appointment needed.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-white rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-md"
                style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 10px rgba(13,18,130,0.04)" }}
              >
                <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-3 text-[15px] font-semibold leading-snug" style={{ color: "#0D1282" }}>
                  <span>{item.q}</span>
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="#1E6DEB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-[14px] leading-relaxed" style={{ color: "#5C7189" }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. STATS — Trust banner ===== */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)" }}>
        <div className="hidden sm:block absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #1E6DEB, transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #3FB5A0, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-center mb-3" style={{ color: "#FCB730" }}>Why Choose Us</p>
          <h2 className="text-[26px] md:text-[34px] font-bold text-center text-white mb-4">Trusted by Students Worldwide</h2>
          <p className="text-center text-[15px] text-white/50 max-w-xl mx-auto mb-12">Our numbers speak for themselves — proven results that families and students trust.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
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

      {/* ===== TRUSTED PARTNERS ===== */}
      <UniversityPartners universities={allUniversities} />

      {/* ===== 4. TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== 5. GLOBAL PRESENCE (Tab-based) ===== */}
      <GlobalPresence />

      {/* ===== MOBILE STICKY CTA BAR (mobile only) ===== */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderTop: "1px solid #E0E6F2",
          boxShadow: "0 -4px 16px rgba(13,18,130,0.08)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
        }}
      >
        <a
          href="https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%27m%20interested%20in%20studying%20abroad"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold"
          style={{ background: "#25D366", color: "#FFFFFF", minHeight: 44 }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          WhatsApp Us
        </a>
      </div>
    </main>
  );
}


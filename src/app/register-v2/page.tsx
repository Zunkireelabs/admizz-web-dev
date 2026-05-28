"use client";

import { useEffect, useRef, useState } from "react";
import UniversityPartners from "@/app/UniversityPartners";
import { allUniversities } from "@/lib/universities";
import GlobalPresence from "@/components/ui/GlobalPresence";
import AlumniSection from "@/components/ui/AlumniSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import RegisterJourneyHero from "@/components/ui/journey/RegisterJourneyHero";
import { journeySteps } from "@/components/ui/journey/journey.data";

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
  const [showSticky, setShowSticky] = useState(false);
  const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile carousel auto-slide
  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const CARD_WIDTH = 270 + 16; // card width + gap-4
    const TOTAL = journeySteps.length;

    const tick = () => {
      const currentIndex = Math.round(el.scrollLeft / CARD_WIDTH);
      const next = (currentIndex + 1) % TOTAL;
      el.scrollTo({ left: next * CARD_WIDTH, behavior: "smooth" });
    };

    const start = () => {
      slideIntervalRef.current = setInterval(tick, 3000);
    };

    const pause = () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(start, 5000);
    };

    const onCarouselScroll = () => {
      setMobileCarouselIndex(Math.min(TOTAL - 1, Math.max(0, Math.round(el.scrollLeft / CARD_WIDTH))));
    };

    start();
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("scroll", onCarouselScroll, { passive: true });

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("scroll", onCarouselScroll);
    };
  }, []);

  return (
    <main className={`${showSticky ? "pb-20" : "pb-0"} md:pb-0`}>
      {/* ===== JOURNEY-SYNCED HERO (donut + form live state-bound) ===== */}
      <RegisterJourneyHero />

      {/* ===== "WHAT HAPPENS NEXT" — 3-step process panel ===== */}
      <section id="enquiry-form" className="py-12 md:py-16 relative overflow-hidden bg-white">
        <div className="hidden md:block absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.08] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #1E6DEB 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#1E6DEB" }}>What happens next</p>
            <h2 className="text-[22px] md:text-[32px] font-bold leading-tight" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}>
              Your complete journey in 5 steps
            </h2>
          </div>

          {/* ── Mobile: auto-sliding carousel ── */}
          <div ref={mobileScrollRef} className="md:hidden -mx-4 px-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 w-max">
              {journeySteps.map((step) => (
                <div key={step.id} className="w-[270px] flex-shrink-0 relative rounded-2xl p-4" style={{ background: "#F8F9FF", border: "1px solid #E0E6F2" }}>
                  <span aria-hidden className="absolute -top-3 right-0 font-extrabold leading-none select-none pointer-events-none" style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "72px", background: "linear-gradient(180deg, rgba(13,18,130,0.07) 0%, rgba(13,18,130,0) 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{String(step.id).padStart(2, "0")}</span>
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: step.colorDeep }}>Step {step.id} of 5</p>
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: `${step.bgTint}`, border: `1px solid ${step.color}40` }}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={step.colorDeep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={step.iconPath} /></svg>
                    </div>
                    <span className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: `${step.bgTint}`, color: step.colorDeep, border: `1px solid ${step.color}40` }}>{step.duration.toUpperCase()}</span>
                  </div>
                  <h3 className="relative text-[17px] font-bold mb-2" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}>{step.title}</h3>
                  <p className="relative text-[13px] leading-relaxed" style={{ color: "#5C7189" }}>{step.description}</p>
                  <div className="relative mt-5 h-[2px] w-14 rounded-full" style={{ background: `linear-gradient(90deg, ${step.color} 0%, ${step.colorDeep} 100%)` }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Mobile: scroll dot indicator ── */}
          <div className="md:hidden flex items-center justify-center gap-2 mt-4">
            {journeySteps.map((step, i) => {
              const isActive = i === mobileCarouselIndex;
              return (
                <button
                  key={step.id}
                  aria-label={`Go to step ${step.id}`}
                  onClick={() => {
                    const el = mobileScrollRef.current;
                    if (!el) return;
                    el.scrollTo({ left: i * (270 + 16), behavior: "smooth" });
                  }}
                  style={{
                    height: 8,
                    width: isActive ? 24 : 8,
                    borderRadius: 99,
                    background: isActive ? step.colorDeep : "#D7DAE8",
                    transition: "width 0.3s ease, background 0.3s ease",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>

          {/* ── Desktop: horizontal stepper with connectors ── */}
          <div className="hidden md:flex items-stretch gap-2">
            {journeySteps.flatMap((step, i) => {
              const card = (
                <div key={`card-${step.id}`} className="flex-1 min-w-0 relative rounded-2xl p-4 lg:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: "#F8F9FF", border: "1px solid #E0E6F2" }}>
                  <span aria-hidden className="absolute -top-2 right-1 font-extrabold leading-none select-none pointer-events-none" style={{ fontFamily: "var(--font-rubik), sans-serif", fontSize: "clamp(44px, 4.5vw, 68px)", background: "linear-gradient(180deg, rgba(13,18,130,0.07) 0%, rgba(13,18,130,0) 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{String(step.id).padStart(2, "0")}</span>
                  <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: step.colorDeep }}>Step {step.id} of 5</p>
                  <div className="relative flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: step.bgTint, border: `1px solid ${step.color}40` }}>
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke={step.colorDeep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={step.iconPath} /></svg>
                    </div>
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]" style={{ background: step.bgTint, color: step.colorDeep, border: `1px solid ${step.color}40` }}>{step.duration.toUpperCase()}</span>
                  </div>
                  <h3 className="relative text-[14px] lg:text-[15px] font-bold mb-1.5 leading-snug" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}>{step.title}</h3>
                  <p className="relative text-[12px] leading-relaxed" style={{ color: "#5C7189" }}>{step.description}</p>
                  <div className="relative mt-4 h-[2px] w-10 rounded-full" style={{ background: `linear-gradient(90deg, ${step.color} 0%, ${step.colorDeep} 100%)` }} />
                </div>
              );
              const connector = i < journeySteps.length - 1 ? (
                <div key={`conn-${step.id}`} className="flex items-center justify-center flex-shrink-0 w-5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "#D0D5E8" }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              ) : null;
              return connector ? [card, connector] : [card];
            })}
          </div>
        </div>
      </section>

      {/* ===== TRUST CARDS (horizontal, below form) ===== */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#1E6DEB" }}>
              Why Admizz
            </p>
            <h2 className="text-[24px] md:text-[34px] font-bold leading-tight" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}>
              Three reasons families choose us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {/* Card 1: Trust — DEEP BLUE */}
            <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 12px rgba(13,18,130,0.04)" }}>
              <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #2954C7, #4F7DEB)" }} />
              <div className="p-4 md:p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#EBF3FF" }}>
                  <svg className="w-6 h-6" fill="none" stroke="#2954C7" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#2954C7" }}>Trust</p>
                <h3 className="text-[18px] font-bold mb-3" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}>A decade of getting it right</h3>
                <ul className="space-y-2 text-[13px]" style={{ color: "#5C7189" }}>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#4F7DEB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong style={{ color: "#0D1282" }}>ICEF-Accredited</strong> agency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#4F7DEB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong style={{ color: "#0D1282" }}>10+ years</strong> of excellence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#4F7DEB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12" /></svg>
                    <span><strong style={{ color: "#0D1282" }}>2,000+ students</strong> enrolled</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: Testimonial — TEAL */}
            <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 12px rgba(13,18,130,0.04)" }}>
              <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #2F9D85, #4FBFA8)" }} />
              <div className="p-4 md:p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#EDFAF7" }}>
                  <svg className="w-6 h-6" fill="none" stroke="#2F9D85" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#2F9D85" }}>Real stories</p>
                <p className="text-[14px] leading-relaxed italic mb-5" style={{ color: "#0D1282" }}>
                  &ldquo;Admizz helped me figure out the right country, the right course, and got me there. Best decision I made.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "#F0F0F0" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #4FBFA8, #2F9D85)", color: "#FFFFFF" }}>N</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold leading-tight" style={{ color: "#0D1282" }}>Neharika Gurung</p>
                    <p className="text-[11px] mt-0.5 leading-tight" style={{ color: "#5C7189" }}>Coventry University · 🇳🇵 → 🇬🇧</p>
                  </div>
                  <div className="flex-shrink-0"><Stars count={5} /></div>
                </div>
              </div>
            </div>

            {/* Card 3: Chat */}
            <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 12px rgba(13,18,130,0.04)" }}>
              <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #D89218, #F5B544)" }} />
              <div className="p-4 md:p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#FFF8E5" }}>
                  <svg className="w-6 h-6" fill="none" stroke="#D89218" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "#D89218" }}>Prefer to chat?</p>
                <h3 className="text-[18px] font-bold mb-3" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}>Talk to a real human</h3>
                <p className="text-[13px] leading-relaxed mb-5 flex-1" style={{ color: "#5C7189" }}>
                  Skip the form — message a counsellor directly on WhatsApp. Real people, real answers, no bots.
                </p>
                <a
                  href="https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%27m%20interested%20in%20studying%20abroad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-md"
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

      {/* ===== COUNSELLOR FACES BAND ===== */}
      <section className="py-10 md:py-20 relative overflow-hidden" style={{ background: "#F8F9FF" }}>
        <div className="hidden md:block absolute top-20 right-0 w-[360px] h-[360px] rounded-full opacity-[0.12] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #4F7DEB 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 md:mb-14">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#1E6DEB" }}>
              Real people, real expertise
            </p>
            <h2 className="text-[26px] md:text-[36px] font-bold leading-tight mb-3" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}>
              Meet your counsellors
            </h2>
            <p className="text-[14px] md:text-[16px] max-w-xl mx-auto" style={{ color: "#5C7189" }}>
              Speak with the right counsellor for your goal — they&rsquo;ll guide you personally through every step.
            </p>
          </div>

          {(() => {
            const counsellors = [
              { initial: "A", name: "Aarav Sharma", role: "Senior Counsellor", langs: ["EN", "NE", "HI"], color: "#4F7DEB", deep: "#2954C7" },
              { initial: "P", name: "Priya Gurung", role: "UK Programs Lead", langs: ["EN", "NE"], color: "#4FBFA8", deep: "#2F9D85" },
              { initial: "S", name: "Sita Tamang", role: "USA Programs Lead", langs: ["EN", "NE"], color: "#F08A5F", deep: "#D76A3D" },
              { initial: "R", name: "Rajesh KC", role: "Visa Specialist", langs: ["EN", "NE", "HI"], color: "#B373E5", deep: "#8B47C2" },
              { initial: "M", name: "Manish Adhikari", role: "Test Prep Lead", langs: ["EN", "NE"], color: "#E04562", deep: "#B72D47" },
            ];
            const Card = ({ c, size = "lg" }: { c: typeof counsellors[number]; size?: "sm" | "lg" }) => (
              <div className="bg-white rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex-shrink-0" style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 12px rgba(13,18,130,0.05)", width: size === "sm" ? 168 : undefined }}>
                <div className="mx-auto mb-4 rounded-full flex items-center justify-center font-bold" style={{
                  width: size === "sm" ? 72 : 92,
                  height: size === "sm" ? 72 : 92,
                  padding: 3,
                  background: `linear-gradient(135deg, ${c.color}, ${c.deep})`,
                }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-white">
                    <span className="font-extrabold" style={{ color: c.deep, fontSize: size === "sm" ? 28 : 36, fontFamily: "var(--font-rubik), sans-serif" }}>{c.initial}</span>
                  </div>
                </div>
                <p className="text-[14px] font-bold leading-tight" style={{ color: "#0D1282" }}>{c.name}</p>
                <p className="text-[12px] mt-1" style={{ color: "#5C7189" }}>{c.role}</p>
                <div className="flex justify-center flex-wrap gap-1 mt-3">
                  {c.langs.map((l) => (
                    <span key={l} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${c.color}14`, color: c.deep, letterSpacing: "0.08em" }}>{l}</span>
                  ))}
                </div>
              </div>
            );
            return (
              <>
                <div className="md:hidden -mx-4 px-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex gap-4 w-max">
                    {counsellors.map((c) => <Card key={c.name} c={c} size="sm" />)}
                  </div>
                </div>
                <div className="hidden md:grid md:grid-cols-5 gap-5 lg:gap-6">
                  {counsellors.map((c) => <Card key={c.name} c={c} />)}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ===== FAQ ACCORDION ===== */}
      <section className="py-10 md:py-20 relative overflow-hidden bg-white">
        <div className="hidden md:block absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.08] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #B373E5 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 md:mb-14">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#1E6DEB" }}>
              Common questions
            </p>
            <h2 className="text-[26px] md:text-[36px] font-bold leading-tight" style={{ color: "#0D1282", fontFamily: "var(--font-rubik), 'Montserrat', sans-serif" }}>
              Everything you might be wondering
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
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg"
                style={{ border: "1px solid #F0F0F0", boxShadow: "0 2px 12px rgba(13,18,130,0.04)" }}
              >
                <summary className="cursor-pointer list-none p-4 md:p-6 flex items-start justify-between gap-4 text-[15px] md:text-[16px] font-semibold leading-snug select-none" style={{ color: "#0D1282" }}>
                  <span className="pt-0.5">{item.q}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-open:rotate-45" style={{ background: "#EBF3FF", color: "#2954C7" }}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 -mt-1 text-[14px] leading-relaxed" style={{ color: "#5C7189" }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS — Trust banner ===== */}
      <section className="relative py-12 md:py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0f5c 0%, #0D1282 40%, #1a3aad 100%)" }}>
        <div className="hidden sm:block absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full opacity-[0.08] blur-3xl" style={{ background: "radial-gradient(circle, #4F7DEB, transparent 70%)" }} />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full opacity-[0.08] blur-3xl" style={{ background: "radial-gradient(circle, #4FBFA8, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "#FCB730" }}>Proven results</p>
            <h2 className="text-[22px] md:text-[40px] font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>
              Trusted by students worldwide
            </h2>
            <p className="text-[15px] md:text-[16px] text-white/55 max-w-xl mx-auto">
              Our numbers speak for themselves — proven outcomes families and students trust.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="relative text-center rounded-2xl px-3 py-5 md:px-5 md:py-12 transition-all duration-300 hover:-translate-y-1 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }} />
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl mx-auto mb-3 md:mb-5 flex items-center justify-center" style={{ background: `${stat.accent}22`, border: `1px solid ${stat.accent}40` }}>
                  <svg className="w-5 h-5" fill="none" stroke={stat.accent} strokeWidth={1.9} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} /></svg>
                </div>
                <p className="text-[22px] sm:text-[36px] md:text-[46px] font-extrabold text-white mb-2 leading-none" style={{ fontFamily: "var(--font-rubik), sans-serif" }}>{stat.value}</p>
                <p className="text-[12px] md:text-[13px] font-medium text-white/55 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-[14px] md:text-[15px] text-white/70">Ready to be the next success story?</p>
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#FDED22", color: "#0D1282", minHeight: 48 }}
            >
              Book free consultation
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED PARTNERS ===== */}
      <UniversityPartners universities={allUniversities} />

      {/* ===== 4. TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== 5. GLOBAL PRESENCE (Tab-based) ===== */}
      <GlobalPresence />

      {/* ===== MOBILE STICKY CTA BAR (mobile only, appears after scrolling past hero) ===== */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 grid grid-cols-2 gap-2"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "1px solid #E0E6F2",
          boxShadow: "0 -6px 20px rgba(13,18,130,0.1)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          transform: showSticky ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <a
          href="tel:+9779856100444"
          className="inline-flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold"
          style={{ background: "#FDED22", color: "#0D1282", minHeight: 48 }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call us
        </a>
        <a
          href="https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%27m%20interested%20in%20studying%20abroad"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold"
          style={{ background: "#25D366", color: "#FFFFFF", minHeight: 48 }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </main>
  );
}


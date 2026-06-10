"use client";

import { useEffect, useRef } from "react";

/**
 * Closing handoff section — editorial calm + practical next steps.
 * Replaces the previous illustrated sunset / landmarks composition with
 * substance: a 3-step roadmap, a counsellor card, and a clear CTA.
 */
export default function IndiaSignatureClosing({
  ctaText = "Book Your Free Counselling",
  ctaHref = "/register",
}: {
  ctaText?: string;
  ctaHref?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.from(el.querySelectorAll("[data-close-fade]"), {
            opacity: 0,
            y: 24,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });
        }, el);
        (el as unknown as { __ctx?: gsap.Context }).__ctx = ctx;
      }
    );
    return () => {
      cancelled = true;
      const ctx = (el as unknown as { __ctx?: { revert: () => void } }).__ctx;
      if (ctx) ctx.revert();
    };
  }, []);

  const steps = [
    {
      num: "01",
      title: "Book a 15-min call",
      body: "Tell us your stream, scores, and budget. No commitment.",
    },
    {
      num: "02",
      title: "Get 5 shortlisted universities",
      body: "Tailored to your profile — costs, scholarships, and intakes laid out clearly.",
    },
    {
      num: "03",
      title: "Walk in & start studying",
      body: "We handle applications, documentation, and arrival support end-to-end.",
    },
  ];

  return (
    <section
      ref={ref}
      id="closing"
      className="relative overflow-hidden"
      style={{ background: "#FFF8F1" }}
    >
      {/* Thin tricolour ribbon at top */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] flex"
        aria-hidden="true"
        data-close-fade
      >
        <div className="flex-1" style={{ background: "#FF9933" }} />
        <div className="flex-1" style={{ background: "#FFFFFF" }} />
        <div className="flex-1" style={{ background: "#138808" }} />
      </div>

      {/* Soft decorative wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 15% 0%, rgba(28,93,63,0.06) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(255,107,26,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <p
            className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-4"
            style={{ color: "#FF6B1A" }}
            data-close-fade
          >
            One last thing
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-5"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: "#0B3D2E",
            }}
            data-close-fade
          >
            Your story starts here.
          </h2>
          <p
            className="text-base md:text-lg text-gray-700 leading-relaxed"
            data-close-fade
          >
            From Kathmandu to your Indian campus — it begins with a 15-minute call.
            No pressure, no commitment, just a clear next step.
          </p>
        </div>

        {/* 3-step roadmap */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-14 md:mb-16">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="relative bg-white rounded-2xl p-7 border border-[#E8DECE]"
              style={{ boxShadow: "0 6px 30px rgba(11,61,46,0.06)" }}
              data-close-fade
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[13px] font-bold"
                  style={{ background: "#0B3D2E", color: "#FDED22" }}
                >
                  {s.num}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className="hidden md:block flex-1 h-px"
                    style={{ background: "linear-gradient(90deg, #C9A961, transparent)" }}
                    aria-hidden="true"
                  />
                )}
              </div>

              <h3
                className="text-lg md:text-xl font-bold mb-2 leading-tight"
                style={{ color: "#0B3D2E", fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {s.title}
              </h3>
              <p className="text-[14px] text-gray-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Counsellor card + CTA */}
        <div
          className="rounded-2xl p-6 md:p-8 grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-8"
          style={{
            background: "linear-gradient(135deg, #0B3D2E 0%, #1C5D3F 100%)",
            color: "#fff",
            boxShadow: "0 20px 50px rgba(11,61,46,0.18)",
          }}
          data-close-fade
        >
          {/* Avatar */}
          <div className="flex items-center gap-4 md:gap-5">
            <div
              className="relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FF9933 0%, #C9A961 100%)",
                color: "#0B3D2E",
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: 22,
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
              aria-hidden="true"
            >
              A
              <span
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2"
                style={{ background: "#3FB55F", borderColor: "#0B3D2E" }}
              />
            </div>
            <div className="md:hidden">
              <p className="text-[12px] uppercase tracking-[0.22em] font-semibold opacity-75 mb-0.5">
                Your dedicated India counsellor
              </p>
              <p className="text-[15px] font-semibold">
                Avg reply: <span style={{ color: "#FDED22" }}>under 2 hours</span>
              </p>
            </div>
          </div>

          {/* Counsellor text — desktop */}
          <div className="hidden md:block">
            <p
              className="text-[11px] uppercase tracking-[0.28em] font-semibold opacity-75 mb-1.5"
              style={{ color: "#FF9933" }}
            >
              Talk to your dedicated India counsellor
            </p>
            <p className="text-[17px] font-semibold leading-tight">
              You&apos;ll get a real person, not a chatbot.{" "}
              <span style={{ color: "#FDED22" }}>Average reply under 2 hours.</span>
            </p>
          </div>

          {/* CTA stack */}
          <div className="flex flex-col items-stretch md:items-end gap-2.5 w-full md:w-auto">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-all hover:scale-[1.02] hover:shadow-2xl whitespace-nowrap"
              style={{
                background: "#FDED22",
                color: "#0B3D2E",
                boxShadow: "0 10px 30px rgba(253,237,34,0.35)",
              }}
            >
              {ctaText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold opacity-70 text-center md:text-right">
              Free · No commitment · 24h response
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

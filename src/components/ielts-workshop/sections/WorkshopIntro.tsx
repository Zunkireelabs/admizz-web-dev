"use client";

import { event } from "../content";
import Reveal from "../Reveal";
import WordReveal from "../WordReveal";
import { useRegistrationModal } from "../RegistrationModal";

export default function WorkshopIntro() {
  const { open } = useRegistrationModal();

  return (
    <section className="relative bg-white border-t border-border-light py-20 md:py-24 overflow-hidden">
      {/* Subtle depth behind the headline */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(49,66,156,0.06) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-blue-royal/40" />
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-blue-royal">
              The Solution
            </p>
            <span className="h-px w-6 bg-blue-royal/40" />
          </div>
        </Reveal>

        <h2
          className="text-3xl sm:text-4xl font-bold text-navy mb-6"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          <WordReveal text={event.sessionTitle} delay={0.3} highlightWords={["2-Hour"]} />
        </h2>

        <Reveal delay={1.1}>
          <p className="text-base sm:text-lg text-gray-dark leading-relaxed mb-8">{event.intro}</p>
          <button
            type="button"
            onClick={open}
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]"
          >
            GRAB YOUR SEAT
          </button>
        </Reveal>
      </div>
    </section>
  );
}

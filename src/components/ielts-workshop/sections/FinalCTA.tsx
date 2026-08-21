"use client";

import { event } from "../content";
import Reveal from "../Reveal";
import { useRegistrationModal } from "../RegistrationModal";

export default function FinalCTA() {
  const { open } = useRegistrationModal();

  return (
    <section
      className="text-white border-t border-white/10 py-20 md:py-24 text-center"
      style={{ background: "linear-gradient(135deg, #001353 0%, #0D1282 60%, #31429C 100%)" }}
    >
      <div className="max-w-2xl mx-auto px-4">
        <Reveal>
          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Your next band starts with the right strategy.
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-2">
            {event.durationLabel}. Practical guidance. A clearer IELTS strategy.
          </p>
          <p className="text-white/80 text-base sm:text-lg mb-8">
            {event.dateLabel} · {event.timeLabel}
          </p>
          <p className="text-yellow font-semibold mb-8">Only {event.capacity} students.</p>
          <button
            type="button"
            onClick={open}
            className="inline-block bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]"
          >
            {event.finalCtaText.toUpperCase()}
          </button>
        </Reveal>
      </div>
    </section>
  );
}

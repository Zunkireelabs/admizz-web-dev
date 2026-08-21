"use client";

import { event } from "../content";
import Reveal from "../Reveal";
import { useRegistrationModal } from "../RegistrationModal";

export default function UrgencySection() {
  const { open } = useRegistrationModal();

  return (
    <section className="bg-navy text-white border-t border-white/10 py-20 md:py-24 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <Reveal>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {event.urgencyLine}
          </h2>
          <p className="text-yellow font-semibold">{event.scarcityLine}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={open}
            className="inline-block mt-10 bg-yellow text-black font-semibold text-[15px] px-8 py-3 rounded-[10px]"
          >
            {event.ctaText.toUpperCase()}
          </button>
        </Reveal>
      </div>
    </section>
  );
}

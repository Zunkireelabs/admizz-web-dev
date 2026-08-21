import { event } from "../content";
import Reveal from "../Reveal";

export default function WorkshopIntro() {
  return (
    <section className="bg-white border-t border-border-light py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-blue-royal/40" />
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-blue-royal">
              The Solution
            </p>
            <span className="h-px w-6 bg-blue-royal/40" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-6"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {event.sessionTitle}
          </h2>
          <p className="text-base sm:text-lg text-gray-dark leading-relaxed">{event.intro}</p>
        </Reveal>
      </div>
    </section>
  );
}

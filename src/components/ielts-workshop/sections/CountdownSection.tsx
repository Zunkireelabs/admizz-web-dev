import { event } from "../content";
import Countdown from "../Countdown";
import Reveal from "../Reveal";

export default function CountdownSection() {
  return (
    <section className="bg-off-white border-t border-border-light py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-royal mb-6">
            Workshop Starts In
          </p>
          <div className="rounded-[16px] bg-navy shadow-lg p-6 sm:p-8">
            <Countdown targetISO={event.startISO} />
          </div>
          <p className="text-sm text-gray-dark mt-6">
            {event.scarcityLine} — {event.dateLabel} · {event.timeLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

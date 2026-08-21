import { problem } from "../content";
import Reveal from "../Reveal";

export default function ProblemSection() {
  return (
    <section className="bg-navy text-white border-t border-white/10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
        {/* Quiet list of pain points */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-6">
            Sound familiar?
          </p>
          <ul className="space-y-4">
            {problem.painPoints.map((point, i) => (
              <Reveal key={point} delay={i * 0.08}>
                <li className="text-white/70 text-[15px] sm:text-base border-l-2 border-white/15 pl-4">
                  {point}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* The bold reframe */}
        <Reveal delay={problem.painPoints.length * 0.08 + 0.1}>
          <div className="text-left">
            <p
              className="text-3xl sm:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              {problem.pivotLineTop}
            </p>
            <p className="text-4xl sm:text-6xl font-bold leading-tight text-yellow mt-4">
              {problem.pivotLineBottom}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

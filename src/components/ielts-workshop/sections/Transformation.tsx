import { transformation } from "../content";
import Reveal from "../Reveal";

export default function Transformation() {
  return (
    <section className="bg-off-white border-t border-border-light py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <h2
            className="text-3xl sm:text-4xl font-bold text-navy mb-12 text-center"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            The Transformation
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          <Reveal>
            <div className="rounded-[10px] bg-white border border-border-light p-6 sm:p-8 h-full">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-medium mb-4">
                Before
              </p>
              <ul className="space-y-3">
                {transformation.before.map((item) => (
                  <li key={item} className="text-gray-dark text-[15px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[10px] bg-navy text-white p-6 sm:p-8 h-full">
              <p className="text-xs font-semibold tracking-widest uppercase text-yellow mb-4">
                After
              </p>
              <ul className="space-y-3">
                {transformation.after.map((item) => (
                  <li key={item} className="text-white/85 text-[15px] font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

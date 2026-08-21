import { BarChart3, TriangleAlert, Sparkles, ClipboardList, MessageCircleQuestion, type LucideIcon } from "lucide-react";
import { valueStack } from "../content";
import Reveal from "../Reveal";

// Order matches valueStack in content.ts.
const ICONS: LucideIcon[] = [BarChart3, TriangleAlert, Sparkles, ClipboardList, MessageCircleQuestion];

export default function BenefitsSection() {
  const featured = valueStack[0];
  const FeaturedIcon = ICONS[0];
  const rest = valueStack.slice(1);

  return (
    <section className="bg-navy text-white border-t border-white/10 py-14 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-yellow mb-2">
              Plus, You&apos;ll Get
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "var(--font-rubik), sans-serif" }}
            >
              More Than Just Strategy
            </h2>
          </div>
        </Reveal>

        {/* Featured item — visual hierarchy over the rest, centered as its own compact block */}
        <Reveal>
          <div className="flex justify-center mb-10 pb-8 border-b border-white/10">
            <div className="flex items-start gap-5 max-w-md">
              <div className="w-14 h-14 rounded-full bg-yellow/15 flex items-center justify-center flex-shrink-0">
                <FeaturedIcon className="w-7 h-7 text-yellow" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{featured.title}</h3>
                <p className="text-white/60">{featured.description}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Remaining items — 2-column grid, no cards */}
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
          {rest.map((item, i) => {
            const Icon = ICONS[i + 1];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-yellow" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-0.5">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Target, BarChart3, ClipboardList, Clock, TriangleAlert, CircleCheckBig } from "lucide-react";
import { beyondSkills } from "../content";
import Reveal from "../Reveal";

// Order matches beyondSkills.points in content.ts
const ICONS = [Target, BarChart3, ClipboardList, Clock, TriangleAlert, CircleCheckBig];

export default function BeyondSkills() {
  return (
    <section className="bg-navy text-white border-t border-white/10 py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-rubik), sans-serif" }}
          >
            {beyondSkills.heading}
          </h2>
        </Reveal>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
          {beyondSkills.points.map((point, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={point} delay={i * 0.06}>
                <li className="flex items-center gap-3 text-white/80 text-[15px]">
                  <div className="w-9 h-9 rounded-full bg-golden/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-golden" />
                  </div>
                  {point}
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

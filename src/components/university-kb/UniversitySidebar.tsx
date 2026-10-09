import { EnquireButton } from "./EnquiryForm";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import type { CourseLevel, UniversityProfile } from "@/lib/university-kb";
import { upcomingIntakes } from "@/lib/university-kb";

export const WHATSAPP_NUMBER = "9779802728444";

const LEVEL_LABEL: Record<CourseLevel, string> = {
  foundation: "Foundation",
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  research: "Research",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function durationRange(u: UniversityProfile) {
  const months = u.courses.map((c) => c.durationMonths);
  if (!months.length) return undefined;
  const fmt = (m: number) => (m % 12 === 0 ? `${m / 12} yr` : `${m} mo`);
  const min = Math.min(...months);
  const max = Math.max(...months);
  return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

export default function UniversitySidebar({ university: u }: { university: UniversityProfile }) {
  const levels = Array.from(new Set(u.courses.map((c) => LEVEL_LABEL[c.level])));
  const english = [u.english.ielts && `IELTS ${u.english.ielts}`, u.english.pte && `PTE ${u.english.pte}`]
    .filter(Boolean)
    .join(" · ");

  const rows = [
    { label: "Campuses", value: u.cities.join(", ") },
    { label: "Study level", value: levels.join(", ") },
    { label: "Course duration", value: durationRange(u) },
    { label: "Courses listed", value: u.courses.length ? String(u.courses.length) : undefined },
    { label: "Intake months", value: Array.from(new Set(upcomingIntakes(u).map((i) => i.month))).join(", ") },
    { label: "English test", value: english || "Ask a counsellor" },
  ].filter((r): r is { label: string; value: string } => Boolean(r.value));

  return (
    <aside className="space-y-5 lg:sticky lg:top-[90px]">
      <section className="rounded-2xl border border-border-light bg-white p-6">
        <h2 className="text-[16px] font-semibold text-navy">At a glance</h2>
        <dl className="mt-4 divide-y divide-border-light text-[14px]">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4 py-2.5">
              <dt className="text-gray-dark">{r.label}</dt>
              <dd className="text-right font-semibold text-navy">{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-blue-royal to-blue-dark p-6 text-white">
        <h2 className="text-[18px] font-bold leading-snug">Interested in {u.name}?</h2>
        <p className="mt-2 text-[14px] text-white/80">
          Get free, one-to-one guidance on courses, scholarships and your application from an Admizz counsellor.
        </p>
        <div className="mt-5 space-y-3">
          <EnquireButton className="w-full flex items-center justify-center gap-2 bg-yellow text-black font-semibold text-[15px] px-5 py-3 rounded-[10px] hover:bg-yellow-bright hover:-translate-y-px transition-all">
            <Phone className="w-4 h-4" aria-hidden />
            Book free counselling
          </EnquireButton>
          <a
            href={whatsappLink(`Hi Admizz, I'd like to know more about studying at ${u.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-white/60 text-white font-semibold text-[15px] px-5 py-3 rounded-[10px] hover:bg-white hover:text-blue-dark transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            Chat on WhatsApp
          </a>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[12px] text-white/70">
          <ShieldCheck className="w-4 h-4" aria-hidden />
          ICEF-accredited agency · free service for students
        </p>
      </section>
    </aside>
  );
}

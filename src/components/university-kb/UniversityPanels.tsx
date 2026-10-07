import Link from "next/link";
import { Clock, Wallet, CalendarDays, CheckCircle2, Circle, MapPin, ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { EnquireButton } from "./EnquiryForm";
import type { CountryInfo, CourseLevel, UniversityProfile } from "@/lib/university-kb";
import { formatMoney } from "@/lib/university-kb/countries";
import { upcomingIntakes } from "@/lib/university-kb";
import type { TabId } from "./UniversityTabs";
import type { ReactNode } from "react";

// UI rule for this page:
//  • Clickable  → solid/outlined buttons, or blue text links with an arrow/icon that underline on hover.
//  • Info only  → plain text and thin dividers. No pills, tinted boxes or hover effects.

const LEVEL_LABEL: Record<CourseLevel, string> = {
  foundation: "Foundation",
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  research: "Research",
};

const textLink =
  "inline-flex items-center gap-1 font-semibold text-blue-royal hover:text-blue-dark hover:underline underline-offset-4";

function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-[20px] font-bold text-navy">{children}</h2>
      {sub && <p className="mt-1 text-[14px] text-gray-dark">{sub}</p>}
    </div>
  );
}

function durationLabel(months: number) {
  if (months % 12 === 0) return `${months / 12} year${months === 12 ? "" : "s"}`;
  return `${months} months`;
}

export function buildUniversityPanels(u: UniversityProfile, country: CountryInfo): Record<TabId, ReactNode> {
  const levels = Array.from(new Set(u.courses.map((c) => c.level)));

  return {
    courses: (
      <div className="space-y-12">
        {levels.length === 0 && (
          <section className="rounded-2xl border border-dashed border-border-light p-8 text-center">
            <h2 className="text-[18px] font-bold text-navy">Course list coming soon</h2>
            <p className="mt-2 text-[15px] text-gray-dark">
              We&apos;re adding this university&apos;s courses and fees. A counsellor can share the full list with you today.
            </p>
            <EnquireButton
              className="mt-5 inline-flex items-center gap-2 rounded-[10px] border border-blue-royal px-4 py-2 text-[14px] font-semibold text-blue-royal hover:bg-blue-royal hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden />
              Request the course list
            </EnquireButton>
          </section>
        )}
        {levels.map((level) => (
          <section key={level}>
            <SectionTitle sub="Tuition shown is the published fee for international students.">
              {LEVEL_LABEL[level]} courses
            </SectionTitle>
            <div className="grid gap-5 md:grid-cols-2">
              {u.courses
                .filter((c) => c.level === level)
                .map((c) => (
                  <article key={c.slug} className="flex flex-col rounded-2xl border border-border-light bg-white p-6">
                    {c.withPlacement && (
                      <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-amber-700">{c.placementOptional ? "Placement year available" : "Includes placement year"}</p>
                    )}
                    <h3 className="text-[17px] font-semibold leading-snug text-navy">{c.name}</h3>
                    <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-border-light pt-5 text-[14px]">
                      <div>
                        <dt className="flex items-center gap-1.5 text-gray-dark"><Clock className="w-4 h-4" aria-hidden />Duration</dt>
                        <dd className="mt-1 font-semibold text-navy">{durationLabel(c.durationMonths)}</dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-gray-dark"><Wallet className="w-4 h-4" aria-hidden />Tuition</dt>
                        <dd className="mt-1 font-semibold text-navy">
                          {c.fees[0]?.from && <span className="mr-1 text-[12px] font-normal text-gray-dark">from</span>}
                          {c.fees.map((f) => formatMoney(f.amount, country.currency)).join(" / ")}
                          <span className="block text-[12px] font-normal text-gray-dark">
                            {c.fees[0]?.per === "year" ? "per year" : "total"}
                            {c.fees[0]?.note ? ` · ${c.fees[0].note}` : ""}
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-gray-dark"><CalendarDays className="w-4 h-4" aria-hidden />Intake</dt>
                        <dd className="mt-1 font-semibold text-navy">{c.intakes.join(", ")}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto pt-6">
                      <EnquireButton
                        course={c.name}
                        className="inline-flex items-center gap-2 rounded-[10px] border border-blue-royal px-4 py-2 text-[14px] font-semibold text-blue-royal hover:bg-blue-royal hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden />
                        Enquire about this course
                      </EnquireButton>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}

        {u.scholarships.length > 0 && (
          <section>
            <SectionTitle>Scholarships</SectionTitle>
            <ul className="divide-y divide-border-light border-y border-border-light">
              {u.scholarships.map((s) => (
                <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4 text-[15px]">
                  <span className="text-slate">
                    {s.name}
                    {s.eligibility && <span className="block text-[13px] text-gray-dark">{s.eligibility}</span>}
                  </span>
                  <span className="font-semibold text-green-700">{s.value}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    ),

    entry: (
      <div className="space-y-10">
        <section>
          <SectionTitle sub="Admission criteria for Nepali students, by study level.">Academic requirements</SectionTitle>
          {u.entryRequirements && u.entryRequirements.length > 0 ? (
            <div className="space-y-6">
              {u.entryRequirements.map((g) => (
                <div key={g.level} className="rounded-2xl border border-border-light p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <h3 className="text-[16px] font-semibold text-navy">{g.level}</h3>
                    {g.gapAccepted !== undefined && (
                      <span className="text-[13px] text-gray-dark">
                        Gap {g.gapAccepted ? "accepted" : "not accepted"}
                        {g.gapAccepted && g.gapYearsAllowed ? ` · up to ${g.gapYearsAllowed.trim()}` : ""}
                      </span>
                    )}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-slate">
                    {g.criteria.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-royal" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[15px] text-gray-dark">Entry requirements vary by course — ask a counsellor for your eligibility.</p>
          )}
        </section>

        {u.languageTests && u.languageTests.length > 0 && (
          <section>
            <SectionTitle sub="Accepted English tests and minimum scores.">English language</SectionTitle>
            <div className="space-y-6">
              {u.languageTests.map((g) => (
                <div key={g.level} className="rounded-2xl border border-border-light overflow-hidden">
                  <h3 className="bg-off-white px-5 py-3 text-[15px] font-semibold text-navy">{g.level}</h3>
                  <ul className="divide-y divide-border-light">
                    {g.tests.map((t, i) => (
                      <li key={i} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3 text-[14px]">
                        <span className="font-medium text-navy">{t.test}</span>
                        <span className="text-right text-gray-dark">{t.score}</span>
                      </li>
                    ))}
                  </ul>
                  {g.waiver && g.waiver.length > 0 && (
                    <div className="border-t border-border-light bg-green-50/50 px-5 py-4">
                      <p className="text-[13px] font-semibold text-green-800">English test may be waived (MOI) if:</p>
                      <ul className="mt-1.5 space-y-1 text-[13px] text-slate">
                        {g.waiver.map((w, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-600" aria-hidden />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    ),

    apply: (
      <section>
        <SectionTitle sub="The typical steps from application to visa. Your counsellor manages each one with you.">
          Application journey
        </SectionTitle>
        <ol>
          {u.applicationStages.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 pb-7 last:pb-0">
              {i < u.applicationStages.length - 1 && (
                <span className="absolute left-[15px] top-9 bottom-1 w-px bg-border-light" aria-hidden />
              )}
              <span className="relative z-10 shrink-0 w-8 h-8 rounded-full border-2 border-blue-royal bg-white text-[13px] font-bold text-blue-royal flex items-center justify-center">
                {i + 1}
              </span>
              <div className="pt-1">
                <p className="text-[16px] font-semibold text-navy">{s.title}</p>
                <p className="mt-0.5 text-[14px] text-gray-dark">{s.document ? `You receive: ${s.document}` : "No document required"}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    ),

    documents: (
      <section>
        <SectionTitle sub="Prepare these before you apply. Optional items can strengthen your application.">
          Required documents
        </SectionTitle>
        <ul className="grid gap-x-10 md:grid-cols-2 border-t border-border-light">
          {u.requiredDocuments.map((d) => (
            <li key={d.name} className="flex items-center gap-3 border-b border-border-light py-3.5 text-[15px]">
              {d.optional ? (
                <Circle className="w-5 h-5 shrink-0 text-gray-medium" aria-hidden />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" aria-hidden />
              )}
              <span className={d.optional ? "text-gray-dark" : "text-navy font-medium"}>{d.name}</span>
              {d.optional && <span className="ml-auto text-[12px] text-gray-medium">Optional</span>}
            </li>
          ))}
        </ul>
      </section>
    ),

    intakes: (
      <section>
        <SectionTitle sub="Apply early — popular courses can close before the deadline.">Intakes &amp; deadlines</SectionTitle>
        <table className="w-full text-left text-[15px] border-t border-border-light">
          <thead className="text-[13px] text-gray-dark">
            <tr className="border-b border-border-light">
              <th className="py-3 font-medium">Intake</th>
              <th className="py-3 font-medium">Application deadline</th>
            </tr>
          </thead>
          <tbody>
            {upcomingIntakes(u).map((i) => (
              <tr key={`${i.month}-${i.year}`} className="border-b border-border-light">
                <td className="py-4 font-semibold text-navy">{i.month} {i.year}</td>
                <td className="py-4 text-gray-dark">{i.applicationDeadline ?? "Ask a counsellor"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    ),

    location: (
      <section>
        <SectionTitle>Campus locations</SectionTitle>
        <ul className="border-t border-border-light">
          {u.cities.map((city) => (
            <li key={city} className="flex items-center gap-3 border-b border-border-light py-4 text-[15px]">
              <MapPin className="w-5 h-5 shrink-0 text-gray-dark" aria-hidden />
              <span className="font-medium text-navy">{city}, {country.name}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${u.name} ${city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-auto text-[14px] ${textLink}`}
              >
                View on map <ExternalLink className="w-3.5 h-3.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        {u.livingCostPerYear && (
          <p className="mt-6 text-[15px] text-gray-dark">
            Estimated living cost: <strong className="text-navy">{formatMoney(u.livingCostPerYear.amount, country.currency)}</strong> per year
          </p>
        )}
      </section>
    ),

    "more-info": (
      <div className="space-y-10">
        <section>
          <SectionTitle>About {u.name}</SectionTitle>
          <p className="text-[15px] leading-relaxed text-slate">{u.overview}</p>
        </section>
        {u.deposits && u.deposits.length > 0 && (
          <section>
            <SectionTitle>Deposits</SectionTitle>
            <ul className="divide-y divide-border-light border-y border-border-light text-[15px]">
              {u.deposits.map((d) => (
                <li key={d.label} className="flex justify-between gap-3 py-3.5">
                  <span className="text-gray-dark">{d.label}</span>
                  <span className="font-semibold text-navy">{formatMoney(d.amount, country.currency)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        <p className="text-[13px] text-gray-dark">
          Information last verified on {u.lastVerified}. Fees and intakes can change — confirm with an Admizz counsellor before applying.{" "}
          <Link href="/register" className={textLink}>
            Ask a counsellor <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
        </p>
      </div>
    ),
  };
}

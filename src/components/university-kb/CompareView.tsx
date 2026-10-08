"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, MessageCircle, Plus, Trophy, X } from "lucide-react";
import type { CountryInfo, CountrySlug, UniversityProfile } from "@/lib/university-kb";
import { compareId, LEVEL_LABEL, lowestFee, upcomingIntakes, universityPath, EXPLORE_BASE_PATH } from "@/lib/university-kb";
import { approxNpr, formatMoney, NPR_RATES, NPR_RATES_DATE } from "@/lib/university-kb/countries";
import { COMPARE_MAX, setCompareList, useCompareList } from "@/lib/university-kb/compare-store";
import BackButton from "./BackButton";
import { EnquireButton, EnquiryProvider } from "./EnquiryForm";

interface Props {
  universities: UniversityProfile[];
  countries: Record<CountrySlug, CountryInfo>;
}

interface Row {
  label: string;
  /** Plain value used for "show differences only". */
  raw: (u: UniversityProfile) => string;
  render: (u: UniversityProfile) => ReactNode;
  /** Index (within the compared list) of the best value, if this row has one. */
  best?: (list: UniversityProfile[]) => number | undefined;
  bestLabel?: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const muted = <span className="text-gray-medium">Ask a counsellor</span>;

function durationRange(u: UniversityProfile) {
  const m = u.courses.map((c) => c.durationMonths);
  if (!m.length) return "";
  const fmt = (x: number) => (x % 12 === 0 ? `${x / 12} year${x === 12 ? "" : "s"}` : `${x} months`);
  const min = Math.min(...m);
  const max = Math.max(...m);
  return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

function uniqueScholarships(u: UniversityProfile) {
  return Array.from(new Set(u.scholarships.map((s) => s.value)));
}

function englishText(u: UniversityProfile) {
  return [u.english.ielts && `IELTS ${u.english.ielts}`, u.english.pte && `PTE ${u.english.pte}`, u.english.toefl && `TOEFL ${u.english.toefl}`]
    .filter(Boolean)
    .join(" · ");
}

function intakeIndex(u: UniversityProfile) {
  const i = upcomingIntakes(u)[0];
  return i ? i.year * 12 + MONTHS.indexOf(i.month) : undefined;
}

function indexOfMin(values: (number | undefined)[]) {
  const defined = values.filter((v): v is number => v !== undefined);
  if (defined.length < 2) return undefined; // nothing to compare against
  const min = Math.min(...defined);
  if (defined.filter((v) => v === min).length > 1) return undefined; // tie
  return values.indexOf(min);
}

export default function CompareView({ universities, countries }: Props) {
  const searchParams = useSearchParams();
  const { list, remove } = useCompareList();
  const [diffOnly, setDiffOnly] = useState(false);
  const syncedFromUrl = useRef(false);

  // A shared link (?u=uk/a,uk/b) wins over whatever this browser had selected.
  useEffect(() => {
    if (syncedFromUrl.current) return;
    syncedFromUrl.current = true;
    const fromUrl = searchParams.get("u");
    if (fromUrl) setCompareList(fromUrl.split(",").filter((id) => universities.some((u) => compareId(u.country, u.slug) === id)));
  }, [searchParams, universities]);

  // Keep the address bar shareable as the selection changes.
  useEffect(() => {
    if (!syncedFromUrl.current) return;
    const url = list.length ? `?u=${list.join(",")}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [list]);

  const selected = useMemo(
    () =>
      list
        .map((id) => universities.find((u) => compareId(u.country, u.slug) === id))
        .filter((u): u is UniversityProfile => Boolean(u)),
    [list, universities],
  );
  const available = universities.filter((u) => !list.includes(compareId(u.country, u.slug)));

  const rows: Row[] = [
    {
      label: "Location",
      raw: (u) => `${u.cities.join(",")}|${u.country}`,
      render: (u) => `${u.cities.join(", ")}, ${countries[u.country].name}`,
    },
    {
      label: "Tuition from",
      raw: (u) => String(lowestFee(u) ?? ""),
      render: (u) => {
        const fee = lowestFee(u);
        if (fee === undefined) return muted;
        const cur = countries[u.country].currency;
        return (
          <>
            <span className="font-semibold text-navy">{formatMoney(fee, cur)}</span>
            <span className="block text-[13px] text-gray-dark">{approxNpr(fee, cur)}</span>
          </>
        );
      },
      // Converted to NPR so universities in different currencies compare fairly.
      best: (l) =>
        indexOfMin(
          l.map((u) => {
            const fee = lowestFee(u);
            return fee === undefined ? undefined : fee * NPR_RATES[countries[u.country].currency];
          }),
        ),
      bestLabel: "Lowest fee",
    },
    {
      label: "Scholarship",
      raw: (u) => uniqueScholarships(u).join(","),
      render: (u) =>
        u.scholarships.length ? <span className="font-semibold text-green-700">{uniqueScholarships(u).join(", ")}</span> : <span className="text-gray-medium">None listed</span>,
    },
    {
      label: "Next intake",
      raw: (u) => String(intakeIndex(u) ?? ""),
      render: (u) => {
        const i = upcomingIntakes(u)[0];
        return i ? <span className="font-semibold text-navy">{i.month} {i.year}</span> : muted;
      },
      best: (l) => indexOfMin(l.map(intakeIndex)),
      bestLabel: "Starts soonest",
    },
    {
      label: "Intake months",
      raw: (u) => Array.from(new Set(upcomingIntakes(u).map((i) => i.month))).join(","),
      render: (u) => Array.from(new Set(upcomingIntakes(u).map((i) => i.month))).join(", ") || muted,
    },
    {
      label: "Study levels",
      raw: (u) => Array.from(new Set(u.courses.map((c) => c.level))).sort().join(","),
      render: (u) => Array.from(new Set(u.courses.map((c) => LEVEL_LABEL[c.level]))).join(", ") || muted,
    },
    { label: "Course length", raw: durationRange, render: (u) => durationRange(u) || muted },
    {
      label: "Courses listed",
      raw: (u) => String(u.courses.length),
      render: (u) => (u.courses.length ? String(u.courses.length) : <span className="text-gray-medium">Coming soon</span>),
    },
    { label: "English test", raw: englishText, render: (u) => englishText(u) || muted },
    {
      label: "Post-study work",
      raw: (u) => countries[u.country].postStudyWork ?? "",
      render: (u) => countries[u.country].postStudyWork ?? muted,
    },
    {
      label: "Placement year option",
      raw: (u) => String(u.courses.some((c) => c.withPlacement)),
      render: (u) => (u.courses.some((c) => c.withPlacement) ? "Yes" : <span className="text-gray-medium">Not listed</span>),
    },
    {
      label: "Documents required",
      raw: (u) => String(u.requiredDocuments.filter((d) => !d.optional).length),
      render: (u) => `${u.requiredDocuments.filter((d) => !d.optional).length} required, ${u.requiredDocuments.filter((d) => d.optional).length} optional`,
    },
    {
      label: "Established",
      raw: (u) => String(u.established ?? ""),
      render: (u) => (u.established ? String(u.established) : <span className="text-gray-medium">—</span>),
    },
  ];

  const visibleRows = diffOnly && selected.length > 1 ? rows.filter((r) => new Set(selected.map(r.raw)).size > 1) : rows;
  const emptySlots = Math.max(0, Math.min(COMPARE_MAX, Math.max(2, selected.length + 1)) - selected.length);
  const enquiryLabel = selected.map((u) => u.name).join(" vs ") || "choosing a university";

  return (
    <EnquiryProvider university={enquiryLabel} universitySlug="compare" intakes={[]}>
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark px-4 pt-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <BackButton fallbackHref={EXPLORE_BASE_PATH} label="Back" />
            <nav aria-label="Breadcrumb" className="text-[13px] text-white/75">
              <Link href="/" className="hover:text-white hover:underline underline-offset-2">Home</Link>
              <span className="mx-1.5" aria-hidden>/</span>
              <Link href={EXPLORE_BASE_PATH} className="hover:text-white hover:underline underline-offset-2">Find College</Link>
              <span className="mx-1.5" aria-hidden>/</span>
              <span className="text-white font-medium">Compare</span>
            </nav>
          </div>
          <h1 className="mt-4 text-3xl md:text-[38px] font-bold leading-tight text-white">Compare universities</h1>
          <p className="mt-2 max-w-2xl text-[16px] text-white/80">
            Put up to {COMPARE_MAX} universities side by side — fees, scholarships, intakes and requirements.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] text-gray-dark">
            Comparing <strong className="text-navy">{selected.length}</strong> of {COMPARE_MAX}
          </p>
          {selected.length > 1 && (
            <label className="flex cursor-pointer select-none items-center gap-3 text-[14px] font-medium text-navy">
              <span>Show differences only</span>
              <button
                type="button"
                role="switch"
                aria-checked={diffOnly}
                onClick={() => setDiffOnly(!diffOnly)}
                className={`relative h-6 w-11 rounded-full transition-colors ${diffOnly ? "bg-blue-royal" : "bg-border-light"}`}
              >
                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${diffOnly ? "translate-x-5" : ""}`} />
              </button>
            </label>
          )}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border-light">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 w-[112px] md:w-[180px] bg-off-white px-3 md:px-5 py-5 align-bottom text-[13px] font-semibold text-gray-dark">
                  University
                </th>
                {selected.map((u) => (
                  <th key={u.slug} scope="col" className="border-l border-border-light px-5 py-5 align-top font-normal">
                    <div className="flex items-start justify-between gap-2">
                      <Image src={u.logo} alt="" width={160} height={64} className="h-16 w-40 object-contain object-left" />
                      <button
                        type="button"
                        onClick={() => remove(compareId(u.country, u.slug))}
                        aria-label={`Remove ${u.name}`}
                        className="rounded-full p-1.5 text-gray-dark hover:bg-off-white hover:text-navy"
                      >
                        <X className="w-4 h-4" aria-hidden />
                      </button>
                    </div>
                    <p className="mt-3 text-[16px] font-bold leading-snug text-navy">{u.name}</p>
                    <Link
                      href={universityPath(u)}
                      className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-blue-royal hover:text-blue-dark hover:underline underline-offset-4"
                    >
                      View details <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                    </Link>
                  </th>
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <th key={`slot-${i}`} scope="col" className="border-l border-border-light px-5 py-5 align-top font-normal">
                    <div className="flex h-full min-h-[120px] flex-col justify-center gap-2 rounded-xl border border-dashed border-border-light p-4">
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-navy">
                        <Plus className="w-4 h-4" aria-hidden />
                        Add a university
                      </span>
                      <select
                        aria-label="Add a university to compare"
                        value=""
                        onChange={(e) => e.target.value && setCompareList([...list, e.target.value])}
                        className="w-full cursor-pointer rounded-[10px] border border-border-light bg-white px-3 py-2 text-[14px] text-navy focus:outline-none focus:border-blue-royal"
                      >
                        <option value="">Choose…</option>
                        {available.map((u) => (
                          <option key={u.slug} value={compareId(u.country, u.slug)}>{u.name}</option>
                        ))}
                      </select>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selected.length === 0 ? (
                <tr>
                  <td colSpan={1 + emptySlots} className="border-t border-border-light px-5 py-10 text-center text-[15px] text-gray-dark">
                    Choose universities above, or{" "}
                    <Link href={EXPLORE_BASE_PATH} className="font-semibold text-blue-royal hover:underline underline-offset-4">
                      browse all universities
                    </Link>{" "}
                    and tap &ldquo;Compare&rdquo;.
                  </td>
                </tr>
              ) : (
                visibleRows.map((row) => {
                  const bestIdx = row.best?.(selected);
                  return (
                    <tr key={row.label} className="border-t border-border-light">
                      <th scope="row" className="sticky left-0 z-10 bg-off-white px-3 md:px-5 py-4 align-top text-[13px] font-semibold text-gray-dark">
                        {row.label}
                      </th>
                      {selected.map((u, i) => (
                        <td key={u.slug} className={`border-l border-border-light px-5 py-4 align-top text-slate ${bestIdx === i ? "bg-green-50/70" : ""}`}>
                          {row.render(u)}
                          {bestIdx === i && row.bestLabel && (
                            <span className="mt-1.5 flex items-center gap-1 text-[12px] font-semibold text-green-700">
                              <Trophy className="w-3.5 h-3.5" aria-hidden />
                              {row.bestLabel}
                            </span>
                          )}
                        </td>
                      ))}
                      {Array.from({ length: emptySlots }).map((_, i) => (
                        <td key={`e-${i}`} className="border-l border-border-light px-5 py-4" />
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[12px] text-gray-dark">
          ≈ NPR amounts are approximate conversions (rates as of {NPR_RATES_DATE}) to help you compare — always confirm the exact fee with a counsellor.
        </p>

        {selected.length > 0 && (
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border-light bg-off-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="text-[20px] font-bold text-navy">Need help choosing?</h2>
              <p className="mt-1 text-[15px] text-gray-dark">A counsellor can check your eligibility for each of these universities — free.</p>
            </div>
            <EnquireButton className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-yellow px-6 py-3 text-[15px] font-semibold text-black whitespace-nowrap hover:bg-yellow-bright transition-colors">
              <MessageCircle className="w-4 h-4" aria-hidden />
              Talk to a Counsellor
            </EnquireButton>
          </div>
        )}
      </section>
    </EnquiryProvider>
  );
}

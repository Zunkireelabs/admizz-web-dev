"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, MapPin, ArrowRight, TrendingUp } from "lucide-react";
import Pagination from "./Pagination";
import type { CourseCard, CourseCatalog, CourseLevel, IntakeMonth } from "@/lib/university-kb";
import { formatMoney } from "@/lib/university-kb/countries";

const LEVEL_LABEL: Record<CourseLevel, string> = {
  foundation: "Foundation",
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  research: "Research",
};
const LEVEL_SHORT: Record<CourseLevel, string> = { foundation: "Foundation", undergraduate: "UG", postgraduate: "PG", research: "Research" };

type SortKey = "recommended" | "fee-asc" | "name";

const PAGE_SIZE = 9;
const ROWS_SHOWN = 3;

const select =
  "w-full cursor-pointer rounded-[10px] border border-border-light bg-white px-3 py-2.5 text-[14px] text-navy focus:outline-none focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/15";

function durationLabel(months: number) {
  if (months % 12 === 0) return `${months / 12} year${months === 12 ? "" : "s"}`;
  return `${months} months`;
}

interface Props {
  catalog: CourseCatalog;
  findCollegeHref: string;
}

export default function CourseExplorer({ catalog, findCollegeHref }: Props) {
  const { universities, courses } = catalog;
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<CourseLevel | "">("");
  const [intake, setIntake] = useState<IntakeMonth | "">("");
  const [city, setCity] = useState("");
  const [maxFee, setMaxFee] = useState<number | "">("");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [page, setPage] = useState(1);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const words = useMemo(() => query.trim().toLowerCase().split(/\s+/).filter(Boolean), [query]);
  const searching = words.length > 0 || subject !== "";

  // UK is the only country with courses today; add a country filter here when more arrive.
  const scoped = courses;
  const currency = universities[0]?.currency;

  // Popular picks come from the data, so a tap never leads to an empty list.
  const popularSubjects = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of scoped) if (c.subject !== "General") counts.set(c.subject, (counts.get(c.subject) ?? 0) + 1);
    return Array.from(counts).sort((a, b) => b[1] - a[1]).map(([s]) => s);
  }, [scoped]);

  // Course names offered by the most universities (case-insensitive), for chips and suggestions.
  const courseNames = useMemo(() => {
    const map = new Map<string, { name: string; unis: Set<number> }>();
    for (const c of scoped) {
      const key = c.name.toLowerCase();
      const entry = map.get(key) ?? { name: c.name, unis: new Set<number>() };
      entry.unis.add(c.u);
      map.set(key, entry);
    }
    return Array.from(map.values()).map((e) => ({ name: e.name, count: e.unis.size })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [scoped]);

  const popularCourses = useMemo(() => courseNames.filter((c) => c.count > 1).slice(0, 8), [courseNames]);

  const suggestions = useMemo(() => {
    if (!words.length) return [];
    const subjects = popularSubjects.filter((s) => words.every((w) => s.toLowerCase().includes(w))).slice(0, 3).map((s) => ({ label: s, hint: "Subject", count: 0 }));
    const names = courseNames.filter((c) => words.every((w) => c.name.toLowerCase().includes(w))).slice(0, 6).map((c) => ({ label: c.name, hint: `${c.count} ${c.count === 1 ? "university" : "universities"}`, count: c.count }));
    return [...names, ...subjects];
  }, [words, courseNames, popularSubjects]);

  // Courses matching the search and filters, grouped by university.
  const groups = useMemo(() => {
    if (!searching) return [];
    const byUni = new Map<number, CourseCard[]>();
    for (const c of scoped) {
      if (words.length) {
        const hay = `${c.name} ${c.subject}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) continue;
      }
      if (subject && c.subject !== subject) continue;
      if (level && c.level !== level) continue;
      if (intake && !c.intakes.includes(intake)) continue;
      if (city && !universities[c.u].cities.includes(city)) continue;
      if (maxFee !== "" && (c.fee === undefined || c.fee > maxFee)) continue;
      const list = byUni.get(c.u) ?? [];
      list.push(c);
      byUni.set(c.u, list);
    }
    const list = Array.from(byUni, ([u, cs]) => ({
      u,
      courses: [...cs].sort((a, b) => (a.fee ?? Infinity) - (b.fee ?? Infinity)),
      minFee: Math.min(...cs.map((c) => c.fee ?? Infinity)),
    }));
    if (sort === "name") return list.sort((a, b) => universities[a.u].name.localeCompare(universities[b.u].name));
    if (sort === "fee-asc") return list.sort((a, b) => a.minFee - b.minFee);
    return list.sort((a, b) => b.courses.length - a.courses.length || universities[a.u].name.localeCompare(universities[b.u].name));
  }, [searching, scoped, universities, words, subject, level, intake, city, maxFee, sort]);

  // Filter options only list values that exist for the current search.
  const baseMatches = useMemo(
    () =>
      searching
        ? scoped.filter((c) => (!words.length || words.every((w) => `${c.name} ${c.subject}`.toLowerCase().includes(w))) && (!subject || c.subject === subject))
        : [],
    [searching, scoped, words, subject],
  );
  const levelOptions = useMemo(() => Array.from(new Set(baseMatches.map((c) => c.level))), [baseMatches]);
  const intakeOptions = useMemo(() => Array.from(new Set(baseMatches.flatMap((c) => c.intakes))), [baseMatches]);
  const cityOptions = useMemo(() => Array.from(new Set(baseMatches.flatMap((c) => universities[c.u].cities))).sort(), [baseMatches, universities]);
  const feeOptions = useMemo(() => {
    const fees = baseMatches.map((c) => c.fee).filter((f): f is number => f !== undefined);
    if (!fees.length) return [];
    const max = Math.max(...fees);
    const step = max > 20000 ? 5000 : 2500;
    const steps: number[] = [];
    for (let v = step * 2; v < max + step; v += step) steps.push(v);
    return steps;
  }, [baseMatches]);

  // Back to page 1 whenever the search, filters or sort change.
  const listKey = JSON.stringify([query, subject, level, intake, city, maxFee, sort]);
  const [prevListKey, setPrevListKey] = useState(listKey);
  if (listKey !== prevListKey) {
    setPrevListKey(listKey);
    setPage(1);
  }
  const totalPages = Math.max(1, Math.ceil(groups.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageGroups = groups.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const goToPage = (p: number) => {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const run = (q: string) => {
    setQuery(q);
    setSubject("");
    setSuggestOpen(false);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const pickSubject = (s: string) => {
    setSubject(subject === s ? "" : s);
    setQuery("");
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chips: { key: string; label: string; clear: () => void }[] = [
    ...(subject ? [{ key: "subject", label: subject, clear: () => setSubject("") }] : []),
    ...(level ? [{ key: "level", label: LEVEL_LABEL[level], clear: () => setLevel("") }] : []),
    ...(intake ? [{ key: "intake", label: `${intake} intake`, clear: () => setIntake("") }] : []),
    ...(city ? [{ key: "city", label: city, clear: () => setCity("") }] : []),
    ...(maxFee !== "" && currency ? [{ key: "fee", label: `Up to ${formatMoney(maxFee, currency)}`, clear: () => setMaxFee("") }] : []),
  ];
  const resetAll = () => {
    setQuery("");
    setSubject("");
    setLevel("");
    setIntake("");
    setCity("");
    setMaxFee("");
  };

  const heading = query.trim() ? `Universities offering “${query.trim()}”` : subject ? `Universities offering ${subject} courses` : "";
  const feeCurrency = (u: number) => universities[u].currency;

  return (
    <>
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark px-4 pt-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/75">
            <Link href="/" className="hover:text-white hover:underline underline-offset-2">Home</Link>
            <span className="mx-1.5" aria-hidden>/</span>
            <span className="text-white font-medium">Find Course</span>
          </nav>
          <h1 className="mt-4 text-3xl md:text-[38px] font-bold leading-tight text-white">Find your course abroad</h1>
          <p className="mt-2 max-w-2xl text-[16px] text-white/80">
            Type a course and see every Admizz partner university that offers it, with the fee, duration and intake.{" "}
            <Link href={findCollegeHref} className="font-semibold text-white underline underline-offset-4">Looking for a university instead?</Link>
          </p>

          <div className="relative mt-7">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                run(query);
                (document.activeElement as HTMLElement | null)?.blur();
              }}
              className="flex overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
            >
              <label className="group flex flex-1 cursor-text items-center gap-3 px-5 py-3">
                <Search className="w-5 h-5 shrink-0 text-gray-medium group-focus-within:text-blue-royal" aria-hidden />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[12px] font-bold uppercase tracking-wide text-navy">Course</span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSubject("");
                      setSuggestOpen(true);
                    }}
                    onFocus={() => setSuggestOpen(true)}
                    onBlur={() => setTimeout(() => setSuggestOpen(false), 150)}
                    placeholder="e.g. MBA, Nursing, Computer Science"
                    autoComplete="off"
                    className="w-full bg-transparent text-[15px] text-navy placeholder:text-gray-medium focus:outline-none"
                  />
                </span>
                {query && (
                  <button type="button" onClick={() => setQuery("")} aria-label="Clear course search" className="shrink-0 rounded-full p-1.5 text-gray-dark hover:bg-border-light hover:text-navy">
                    <X className="w-4 h-4" aria-hidden />
                  </button>
                )}
              </label>
              <button type="submit" className="m-2 inline-flex items-center gap-2 rounded-xl bg-yellow px-5 py-3 text-[15px] font-semibold text-black hover:bg-yellow-bright transition-colors md:px-7">
                <Search className="w-[18px] h-[18px]" aria-hidden />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>

            {suggestOpen && suggestions.length > 0 && (
              <ul className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border-light bg-white py-2 shadow-[0_12px_40px_rgba(0,19,83,0.18)]" role="listbox" aria-label="Course suggestions">
                {suggestions.map((s) => (
                  <li key={`${s.hint}-${s.label}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => (s.hint === "Subject" ? (pickSubject(s.label), setSuggestOpen(false)) : run(s.label))}
                      className="flex w-full items-center justify-between gap-3 px-5 py-2.5 text-left text-[15px] text-navy hover:bg-off-white"
                    >
                      <span className="truncate">{s.label}</span>
                      <span className="shrink-0 text-[12px] text-gray-dark">{s.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {popularSubjects.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-white/70">
                <TrendingUp className="h-4 w-4" aria-hidden />
                Popular
              </span>
              <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Popular subjects">
                {popularSubjects.slice(0, 7).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={subject === s}
                    onClick={() => pickSubject(s)}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                      subject === s ? "border-white bg-white text-blue-dark shadow-sm" : "border-white/30 bg-white/5 text-white hover:border-white/70 hover:bg-white/15"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={resultsRef} className="max-w-7xl mx-auto px-4 pt-8 scroll-mt-[90px]">
        {!searching ? (
          <div className="mx-auto max-w-3xl py-10 text-center">
            <h2 className="text-[22px] font-bold text-navy">Which course are you looking for?</h2>
            <p className="mt-2 text-[15px] text-gray-dark">Search above, or tap a popular course to see the universities that offer it.</p>
            {popularCourses.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {popularCourses.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => run(c.name)}
                    className="rounded-full border border-border-light bg-white px-4 py-2 text-[14px] font-semibold text-navy transition-colors hover:border-blue-royal hover:text-blue-royal"
                  >
                    {c.name}
                    <span className="ml-2 text-[12px] font-normal text-gray-dark">{c.count} universities</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-[22px] font-bold text-navy">{heading}</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Filters">
              <select className={select} value={level} onChange={(e) => setLevel(e.target.value as CourseLevel | "")} aria-label="Study level">
                <option value="">All levels</option>
                {levelOptions.map((l) => <option key={l} value={l}>{LEVEL_LABEL[l]}</option>)}
              </select>
              <select className={select} value={intake} onChange={(e) => setIntake(e.target.value as IntakeMonth | "")} aria-label="Intake">
                <option value="">Any intake</option>
                {intakeOptions.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select className={select} value={city} onChange={(e) => setCity(e.target.value)} aria-label="City">
                <option value="">Any city</option>
                {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {feeOptions.length > 0 && (
                <select
                  className={select}
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value === "" ? "" : Number(e.target.value))}
                  aria-label="Maximum tuition fee"
                >
                  <option value="">Any tuition fee</option>
                  {feeOptions.map((f) => <option key={f} value={f}>Up to {formatMoney(f, universities[baseMatches[0].u].currency)}</option>)}
                </select>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-border-light pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="mr-2 text-[15px] text-gray-dark" aria-live="polite">
                  <strong className="text-navy">{groups.length}</strong> {groups.length === 1 ? "university" : "universities"} found
                </p>
                {chips.map((chip) => (
                  <button key={chip.key} type="button" onClick={chip.clear} aria-label={`Remove filter: ${chip.label}`} className="inline-flex items-center gap-1.5 rounded-[10px] border border-blue-royal/30 bg-blue-royal/[0.06] px-3 py-1.5 text-[13px] font-semibold text-blue-royal hover:border-blue-royal hover:bg-blue-royal/10 transition-colors">
                    {chip.label}
                    <X className="w-3.5 h-3.5" aria-hidden />
                  </button>
                ))}
                <button type="button" onClick={resetAll} className="text-[13px] font-semibold text-gray-dark hover:text-navy hover:underline underline-offset-4">
                  New search
                </button>
              </div>
              <label className="flex items-center gap-2 text-[14px] text-gray-dark">
                Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="cursor-pointer rounded-[10px] border border-border-light bg-white px-3 py-2 text-[14px] font-semibold text-navy focus:outline-none focus:border-blue-royal">
                  <option value="recommended">Most matching courses</option>
                  <option value="fee-asc">Lowest fees</option>
                  <option value="name">University (A–Z)</option>
                </select>
              </label>
            </div>

            {groups.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-border-light p-10 text-center">
                <p className="text-[18px] font-bold text-navy">No universities match your search</p>
                <p className="mt-2 text-[15px] text-gray-dark">Try a shorter word, remove a filter, or ask a counsellor to find options for you.</p>
                <button type="button" onClick={resetAll} className="mt-5 rounded-[10px] border border-blue-royal px-5 py-2.5 text-[14px] font-semibold text-blue-royal hover:bg-blue-royal hover:text-white transition-colors">
                  Start a new search
                </button>
              </div>
            ) : (
              <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pageGroups.map((g) => {
                  const uni = universities[g.u];
                  return (
                    <li key={g.u} className="flex flex-col rounded-2xl border border-border-light bg-white transition-shadow hover:shadow-[0_12px_32px_rgba(0,19,83,0.12)]">
                      <Link href={uni.href} className="group flex items-center gap-4 p-5 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-royal rounded-t-2xl">
                        <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-border-light bg-white p-1.5">
                          <Image src={uni.logo} alt="" width={120} height={56} className="max-h-full w-full object-contain" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[16px] font-bold leading-snug text-navy group-hover:text-blue-royal">{uni.name}</span>
                          <span className="mt-0.5 flex items-center gap-1 text-[13px] text-gray-dark">
                            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            <span className="truncate">{uni.cities.slice(0, 2).join(", ")}</span>
                          </span>
                        </span>
                      </Link>
                      <p className="px-5 text-[12px] font-semibold uppercase tracking-wide text-gray-dark">
                        {g.courses.length} matching {g.courses.length === 1 ? "course" : "courses"}
                      </p>
                      <ul className="mt-2 divide-y divide-border-light border-t border-border-light">
                        {g.courses.slice(0, ROWS_SHOWN).map((c) => (
                          <li key={c.slug}>
                            <Link href={`${uni.href}#course-${c.slug}`} className="group block px-5 py-3 hover:bg-off-white focus-visible:outline-none focus-visible:bg-off-white">
                              <span className="flex items-start justify-between gap-3">
                                <span className="text-[14px] font-semibold leading-snug text-navy group-hover:text-blue-royal">{c.name}</span>
                                <span className="shrink-0 rounded-full bg-blue-royal/[0.08] px-2 py-0.5 text-[11px] font-semibold text-blue-royal">{LEVEL_SHORT[c.level]}</span>
                              </span>
                              <span className="mt-1 block text-[13px] text-gray-dark">
                                {durationLabel(c.durationMonths)}
                                {" · "}
                                {c.fee !== undefined ? (
                                  <span className="font-semibold text-navy">
                                    {c.feeFrom ? "from " : ""}
                                    {formatMoney(c.fee, feeCurrency(g.u))}
                                    {c.per === "year" ? " / year" : ""}
                                  </span>
                                ) : (
                                  "Ask a counsellor"
                                )}
                                {c.intakes.length > 0 && ` · ${c.intakes.join(", ")}`}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={uni.href}
                        className="mt-auto inline-flex items-center gap-1 border-t border-border-light px-5 py-3.5 text-[14px] font-semibold text-blue-royal hover:underline underline-offset-4"
                      >
                        {g.courses.length > ROWS_SHOWN ? `+${g.courses.length - ROWS_SHOWN} more · ` : ""}View university <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            <Pagination page={currentPage} totalPages={totalPages} totalItems={groups.length} pageSize={PAGE_SIZE} onChange={goToPage} noun="universities" />
          </>
        )}
      </section>
    </>
  );
}

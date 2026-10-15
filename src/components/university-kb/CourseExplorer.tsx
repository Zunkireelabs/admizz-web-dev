"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, MapPin, ArrowRight, TrendingUp } from "lucide-react";
import Pagination from "./Pagination";
import Dropdown from "./Dropdown";
import CourseCover from "./CourseCover";
import { FEATURED_COURSES, TRENDING_CARDS, TRENDING_CHIPS } from "@/lib/university-kb/trending";
import type { CourseCatalog, CourseLevel, IntakeMonth } from "@/lib/university-kb";
import { groupCourses, searchGroups, minFee, type CourseGroup } from "@/lib/university-kb/course-groups";
import { formatMoney } from "@/lib/university-kb/countries";

const LEVEL_LABEL: Record<CourseLevel, string> = {
  foundation: "Foundation",
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  research: "Research",
};
const LEVEL_SHORT: Record<CourseLevel, string> = { foundation: "Foundation", undergraduate: "UG", postgraduate: "PG", research: "Research" };

type SortKey = "recommended" | "fee-asc" | "name";

const PAGE_SIZE = 6;
const TRENDING_ROWS = 3;
const RESULT_ROWS = 5;

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

  // Every course name with the universities that offer it. All counts on this page come from here.
  const allGroups = useMemo(() => groupCourses(catalog), [catalog]);

  // Trending: featured names first, then the courses offered by the most universities.
  const trending = useMemo(() => {
    const byKey = new Map(allGroups.map((g) => [g.name.toLowerCase(), g]));
    const featured = FEATURED_COURSES.map((f) => byKey.get(f.toLowerCase())).filter((g): g is CourseGroup => Boolean(g));
    const featuredKeys = new Set(featured.map((g) => g.key));
    const rest = allGroups
      .filter((g) => !featuredKeys.has(g.key) && g.offers.length > 1)
      .sort((a, b) => b.offers.length - a.offers.length || a.name.localeCompare(b.name));
    return [...featured, ...rest];
  }, [allGroups]);
  const trendingCards = trending.slice(0, TRENDING_CARDS);
  const popularCourses = trending.slice(TRENDING_CARDS, TRENDING_CARDS + TRENDING_CHIPS);

  const suggestions = useMemo(() => {
    if (!words.length) return [];
    const phrase = words.join(" ");
    const subjects = popularSubjects.filter((s) => words.every((w) => s.toLowerCase().includes(w))).slice(0, 3).map((s) => ({ label: s, hint: "Subject" }));
    const names = searchGroups(allGroups, phrase)
      .sort((a, b) => a.tier - b.tier || b.group.offers.length - a.group.offers.length)
      .slice(0, 6)
      .map((x) => ({ label: x.group.name, hint: `${x.group.offers.length} ${x.group.offers.length === 1 ? "university" : "universities"}` }));
    return [...names, ...subjects];
  }, [words, allGroups, popularSubjects]);

  // Course groups matching the typed phrase / subject (before level, intake, city and fee filters).
  const baseGroups = useMemo(() => {
    if (!searching) return [];
    const found = words.length ? searchGroups(allGroups, words.join(" ")) : allGroups.map((group) => ({ group, tier: 0 }));
    return found
      .map(({ group, tier }) => ({
        tier,
        group: subject ? { ...group, offers: group.offers.filter((o) => o.course.subject === subject) } : group,
      }))
      .filter((x) => x.group.offers.length > 0);
  }, [searching, words, subject, allGroups]);

  // Apply the filters to each course's university list; a course stays if any university is left.
  const groups = useMemo(() => {
    const kept = baseGroups
      .map(({ group, tier }) => ({
        tier,
        group: {
          ...group,
          offers: group.offers.filter(
            (o) =>
              (!level || o.course.level === level) &&
              (!intake || o.course.intakes.includes(intake)) &&
              (!city || universities[o.u].cities.includes(city)) &&
              (maxFee === "" || (o.course.fee !== undefined && o.course.fee <= maxFee)),
          ),
        },
      }))
      .filter((x) => x.group.offers.length > 0);
    if (sort === "name") return kept.sort((a, b) => a.group.name.localeCompare(b.group.name));
    if (sort === "fee-asc") return kept.sort((a, b) => (minFee(a.group) ?? Infinity) - (minFee(b.group) ?? Infinity));
    return kept.sort((a, b) => a.tier - b.tier || b.group.offers.length - a.group.offers.length || a.group.name.localeCompare(b.group.name));
  }, [baseGroups, universities, level, intake, city, maxFee, sort]);

  // Filter options only list values that exist for the current search.
  const baseOffers = useMemo(() => baseGroups.flatMap((x) => x.group.offers), [baseGroups]);
  const levelOptions = useMemo(() => Array.from(new Set(baseOffers.map((o) => o.course.level))), [baseOffers]);
  const intakeOptions = useMemo(() => Array.from(new Set(baseOffers.flatMap((o) => o.course.intakes))), [baseOffers]);
  const cityOptions = useMemo(() => Array.from(new Set(baseOffers.flatMap((o) => universities[o.u].cities))).sort(), [baseOffers, universities]);
  const feeOptions = useMemo(() => {
    const fees = baseOffers.map((o) => o.course.fee).filter((f): f is number => f !== undefined);
    if (!fees.length) return [];
    const max = Math.max(...fees);
    const step = max > 20000 ? 5000 : 2500;
    const steps: number[] = [];
    for (let v = step * 2; v < max + step; v += step) steps.push(v);
    return steps;
  }, [baseOffers]);

  // Back to page 1 whenever the search, filters or sort change.
  const listKey = JSON.stringify([query, subject, level, intake, city, maxFee, sort]);
  const [prevListKey, setPrevListKey] = useState(listKey);
  if (listKey !== prevListKey) {
    setPrevListKey(listKey);
    setPage(1);
  }
  const totalPages = Math.max(1, Math.ceil(groups.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageGroups = groups.map((x) => x.group).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
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

  const heading = query.trim() ? `Courses matching “${query.trim()}”` : subject ? `${subject} courses` : "";

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
            Search a course and see every Admizz partner university that offers it, with the fee, duration and intake.{" "}
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

      <section ref={resultsRef} className={`max-w-7xl mx-auto px-4 pt-8 scroll-mt-[90px] ${searching ? "pb-20" : ""}`}>
        {!searching ? (
          <div className="mx-auto py-10 text-center">
            <h2 className="text-[22px] font-bold text-navy">Which course are you looking for?</h2>
            <p className="mt-2 text-[15px] text-gray-dark">Search above, or tap a popular course to see the universities that offer it.</p>
            {popularCourses.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {popularCourses.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => run(c.name)}
                    className="rounded-full border border-border-light bg-white px-4 py-2 text-[14px] font-semibold text-navy transition-colors hover:border-blue-royal hover:text-blue-royal"
                  >
                    {c.name}
                    <span className="ml-2 text-[12px] font-normal text-gray-dark">{c.offers.length} universities</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-[22px] font-bold text-navy">{heading}</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Filters">
              <Dropdown
                label="Study level"
                value={level}
                onChange={setLevel}
                options={[{ value: "", label: "All levels" }, ...levelOptions.map((l) => ({ value: l, label: LEVEL_LABEL[l] }))]}
              />
              <Dropdown
                label="Intake"
                value={intake}
                onChange={setIntake}
                options={[{ value: "", label: "Any intake" }, ...intakeOptions.map((m) => ({ value: m, label: m }))]}
              />
              <Dropdown
                label="City"
                value={city}
                onChange={setCity}
                options={[{ value: "", label: "Any city" }, ...cityOptions.map((c) => ({ value: c, label: c }))]}
              />
              {feeOptions.length > 0 && currency && (
                <Dropdown
                  label="Maximum tuition fee"
                  value={maxFee}
                  onChange={setMaxFee}
                  options={[{ value: "", label: "Any tuition fee" }, ...feeOptions.map((f) => ({ value: f, label: `Up to ${formatMoney(f, currency)}` }))]}
                />
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-border-light pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="mr-2 text-[15px] text-gray-dark" aria-live="polite">
                  <strong className="text-navy">{groups.length}</strong> {groups.length === 1 ? "course" : "courses"} found
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
              <div className="flex items-center gap-2 text-[14px] text-gray-dark">
                Sort by
                <Dropdown
                  variant="compact"
                  label="Sort by"
                  value={sort}
                  onChange={(v) => setSort((v || "recommended") as SortKey)}
                  options={[
                    { value: "recommended", label: "Best match" },
                    { value: "fee-asc", label: "Lowest fees" },
                    { value: "name", label: "Course (A–Z)" },
                  ]}
                />
              </div>
            </div>

            {groups.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-border-light p-10 text-center">
                <p className="text-[18px] font-bold text-navy">No courses match your search</p>
                <p className="mt-2 text-[15px] text-gray-dark">Try a shorter word, remove a filter, or ask a counsellor to find options for you.</p>
                <button type="button" onClick={resetAll} className="mt-5 rounded-[10px] border border-blue-royal px-5 py-2.5 text-[14px] font-semibold text-blue-royal hover:bg-blue-royal hover:text-white transition-colors">
                  Start a new search
                </button>
              </div>
            ) : (
              <ul className="mt-6 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pageGroups.map((g) => (
                  <li key={g.key}>
                    <CourseGroupCard group={g} universities={universities} currency={currency} rows={RESULT_ROWS} />
                  </li>
                ))}
              </ul>
            )}

            <Pagination page={currentPage} totalPages={totalPages} totalItems={groups.length} pageSize={PAGE_SIZE} onChange={goToPage} noun="courses" />
          </>
        )}
      </section>

      {!searching && trendingCards.length > 0 && (
        <section aria-labelledby="trending-heading" className="pb-20 pt-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-royal/[0.08] px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider text-blue-royal">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                Trending now
              </span>
              <h2 id="trending-heading" className="mt-3 text-[26px] font-bold text-navy md:text-[30px]">Trending courses</h2>
              <p className="mx-auto mt-2 max-w-xl text-[15px] text-gray-dark">Popular courses and the universities that offer them. Pick one to see every option.</p>
            </div>
            <ul className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trendingCards.map((g) => (
                <li key={g.key}>
                  <CourseGroupCard group={g} universities={universities} currency={currency} rows={TRENDING_ROWS} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

// One course, with the universities that offer it. Used for trending and for search results.
function CourseGroupCard({
  group,
  universities,
  currency,
  rows,
}: {
  group: CourseGroup;
  universities: CourseCatalog["universities"];
  currency: CourseCatalog["universities"][number]["currency"];
  rows: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const total = group.offers.length;
  const subject = (() => {
    const counts = new Map<string, number>();
    for (const o of group.offers) if (o.course.subject !== "General") counts.set(o.course.subject, (counts.get(o.course.subject) ?? 0) + 1);
    return Array.from(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  })();
  const shown = expanded ? group.offers : group.offers.slice(0, rows);
  const from = minFee(group);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border-light bg-white transition-shadow hover:shadow-[0_12px_32px_rgba(0,19,83,0.12)]">
      <CourseCover subject={subject} name={group.name} label={subject} />
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-bold leading-snug text-navy">{group.name}</h3>
          <span className="shrink-0 rounded-full bg-blue-royal/[0.08] px-2.5 py-0.5 text-[12px] font-semibold text-blue-royal">{LEVEL_SHORT[group.level]}</span>
        </div>
        <p className="mt-1 text-[14px] text-gray-dark">
          {total} {total === 1 ? "university" : "universities"}
          {from !== undefined && (
            <>
              {" · from "}
              <span className="font-semibold text-navy">{formatMoney(from, currency)}</span>
            </>
          )}
        </p>
      </div>

      <ul className="divide-y divide-border-light border-t border-border-light">
        {shown.map(({ u, course: c }) => {
          const uni = universities[u];
          return (
            <li key={u}>
              <Link href={`${uni.href}#course-${c.slug}`} className="group flex items-center gap-3 px-5 py-3 hover:bg-off-white focus-visible:outline-none focus-visible:bg-off-white">
                <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md border border-border-light bg-white p-1">
                  <Image src={uni.logo} alt="" width={72} height={40} className="max-h-full w-full object-contain" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-navy group-hover:text-blue-royal">{uni.name}</span>
                  <span className="flex items-center gap-1 text-[12px] text-gray-dark">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                    <span className="truncate">{uni.cities.slice(0, 2).join(", ")}</span>
                  </span>
                  <span className="mt-0.5 block text-[12px] text-gray-dark">
                    {durationLabel(c.durationMonths)}
                    {" · "}
                    {c.fee !== undefined ? (
                      <span className="font-semibold text-navy">
                        {c.feeFrom ? "from " : ""}
                        {formatMoney(c.fee, uni.currency)}
                        {c.per === "year" ? " / year" : ""}
                      </span>
                    ) : (
                      "Ask a counsellor"
                    )}
                    {c.intakes.length > 0 && ` · ${c.intakes.join(", ")}`}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-medium transition-transform group-hover:translate-x-0.5 group-hover:text-blue-royal" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>

      {total > rows && (
        group.hasPage ? (
          <Link
            href={`/find-course/${group.slug}`}
            className="mt-auto inline-flex items-center gap-1 border-t border-border-light px-5 py-3.5 text-[14px] font-semibold text-blue-royal hover:underline underline-offset-4"
          >
            +{total - rows} more · See all universities <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="mt-auto inline-flex items-center gap-1 border-t border-border-light px-5 py-3.5 text-left text-[14px] font-semibold text-blue-royal hover:underline underline-offset-4"
          >
            {expanded ? "Show fewer" : `Show all ${total} universities`}
          </button>
        )
      )}
    </div>
  );
}

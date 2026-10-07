"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, X, MapPin, ArrowRight, Wallet, Award, CalendarDays, TrendingUp } from "lucide-react";
import Pagination from "./Pagination";
import type { CountrySlug, CourseLevel, CurrencyCode, IntakeMonth, UniversityCard } from "@/lib/university-kb";
import { formatMoney } from "@/lib/university-kb/countries";
import CompareToggle from "./CompareToggle";

const LEVEL_LABEL: Record<CourseLevel, string> = {
  foundation: "Foundation",
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  research: "Research",
};

type SortKey = "recommended" | "fee-asc" | "name";

interface Props {
  universities: UniversityCard[];
  countries: { slug: CountrySlug; name: string; currency: CurrencyCode }[];
  /** Locks the explorer to one country (country pages). */
  fixedCountry?: CountrySlug;
  /** Hero content rendered above the search bar. */
  breadcrumb: ReactNode;
  title: string;
  subtitle?: ReactNode;
}

const field =
  "w-full rounded-[10px] border border-border-light bg-white text-[15px] text-navy placeholder:text-gray-medium focus:outline-none focus:border-blue-royal focus:ring-2 focus:ring-blue-royal/15";

// Round fee caps to friendly steps, e.g. 10,000 / 12,500 / 15,000.
function feeSteps(max: number) {
  const step = max > 20000 ? 5000 : 2500;
  const steps: number[] = [];
  for (let v = step * 2; v < max + step; v += step) steps.push(v);
  return steps;
}

const PAGE_SIZE = 10;

export default function UniversityExplorer({ universities, countries, fixedCountry, breadcrumb, title, subtitle }: Props) {
  const [nameQuery, setNameQuery] = useState("");
  const [courseQuery, setCourseQuery] = useState("");
  const [country, setCountry] = useState<CountrySlug | "">(fixedCountry ?? "");
  const [level, setLevel] = useState<CourseLevel | "">("");
  const [intake, setIntake] = useState<IntakeMonth | "">("");
  const [city, setCity] = useState("");
  const [maxFee, setMaxFee] = useState<number | "">("");
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLElement>(null);

  // Lock page scroll and close on Escape while the filter panel is open.
  useEffect(() => {
    if (!filtersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFiltersOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen]);

  const scoped = useMemo(
    () => (country ? universities.filter((u) => u.country === country) : universities),
    [universities, country],
  );

  // Filter options only list values that exist in the data.
  const levelOptions = useMemo(() => Array.from(new Set(scoped.flatMap((u) => u.levels))), [scoped]);
  const intakeOptions = useMemo(() => Array.from(new Set(scoped.flatMap((u) => u.intakeMonths))), [scoped]);
  const cityOptions = useMemo(() => Array.from(new Set(scoped.flatMap((u) => u.cities))).sort(), [scoped]);
  // Fees are in different currencies, so the fee filter only appears once one country is chosen.
  const currency = countries.find((c) => c.slug === country)?.currency;
  const feeOptions = useMemo(() => {
    const fees = scoped.map((u) => u.feeFrom).filter((f): f is number => f !== undefined);
    return fees.length ? feeSteps(Math.max(...fees)) : [];
  }, [scoped]);

  const results = useMemo(() => {
    const n = nameQuery.trim().toLowerCase();
    const c = courseQuery.trim().toLowerCase();
    const list = scoped.filter(
      (u) =>
        (!n || u.name.toLowerCase().includes(n)) &&
        (!c || u.courseNames.some((name) => name.toLowerCase().includes(c))) &&
        (!level || u.levels.includes(level)) &&
        (!intake || u.intakeMonths.includes(intake)) &&
        (!city || u.cities.includes(city)) &&
        (maxFee === "" || (u.feeFrom !== undefined && u.feeFrom <= maxFee)) &&
        (!scholarshipOnly || Boolean(u.scholarship)),
    );
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "fee-asc") return [...list].sort((a, b) => (a.feeFrom ?? Infinity) - (b.feeFrom ?? Infinity));
    return list;
  }, [scoped, nameQuery, courseQuery, level, intake, city, maxFee, scholarshipOnly, sort]);

  // Back to page 1 whenever the search, filters or sort change (state adjusted during render).
  const listKey = JSON.stringify([nameQuery, courseQuery, country, level, intake, city, maxFee, scholarshipOnly, sort]);
  const [prevListKey, setPrevListKey] = useState(listKey);
  if (listKey !== prevListKey) {
    setPrevListKey(listKey);
    setPage(1);
  }
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageResults = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const goToPage = (p: number) => {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changeCountry = (c: CountrySlug | "") => {
    setCountry(c);
    setCity("");
    setMaxFee("");
  };

  // Removable chips for every active filter.
  const chips: { key: string; label: string; clear: () => void }[] = [
    ...(!fixedCountry && country
      ? [{ key: "country", label: countries.find((c) => c.slug === country)?.name ?? country, clear: () => changeCountry("") }]
      : []),
    ...(level ? [{ key: "level", label: LEVEL_LABEL[level], clear: () => setLevel("") }] : []),
    ...(intake ? [{ key: "intake", label: `${intake} intake`, clear: () => setIntake("") }] : []),
    ...(city ? [{ key: "city", label: city, clear: () => setCity("") }] : []),
    ...(maxFee !== "" && currency
      ? [{ key: "fee", label: `Up to ${formatMoney(maxFee, currency)}`, clear: () => setMaxFee("") }]
      : []),
    ...(scholarshipOnly ? [{ key: "sch", label: "Scholarship available", clear: () => setScholarshipOnly(false) }] : []),
  ];

  const resetFilters = () => {
    if (!fixedCountry) changeCountry("");
    setLevel("");
    setIntake("");
    setCity("");
    setMaxFee("");
    setScholarshipOnly(false);
  };

  const clearEverything = () => {
    resetFilters();
    setNameQuery("");
    setCourseQuery("");
  };

  // Popular searches are built from the data, so a pick never leads to an empty list.
  const quickPicks = useMemo(() => {
    const picks: { label: string; active: boolean; toggle: () => void }[] = [];
    const subjects = Array.from(new Set(scoped.flatMap((u) => u.subjects))).slice(0, 3);
    for (const sub of subjects) {
      picks.push({ label: sub, active: courseQuery === sub, toggle: () => setCourseQuery(courseQuery === sub ? "" : sub) });
    }
    if (scoped.some((u) => u.scholarship)) {
      picks.push({ label: "Scholarships", active: scholarshipOnly, toggle: () => setScholarshipOnly(!scholarshipOnly) });
    }
    const soonest = scoped.map((u) => u.nextIntake).find(Boolean)?.split(" ")[0] as IntakeMonth | undefined;
    if (soonest) {
      picks.push({ label: `${soonest} intake`, active: intake === soonest, toggle: () => setIntake(intake === soonest ? "" : soonest) });
    }
    if (levelOptions.includes("postgraduate")) {
      picks.push({ label: "Postgraduate", active: level === "postgraduate", toggle: () => setLevel(level === "postgraduate" ? "" : "postgraduate") });
    }
    if (levelOptions.includes("undergraduate")) {
      picks.push({ label: "Undergraduate", active: level === "undergraduate", toggle: () => setLevel(level === "undergraduate" ? "" : "undergraduate") });
    }
    // The city with the most universities, so the chip is a real "popular" pick.
    const topCity = [...cityOptions]
      .map((c) => ({ c, n: scoped.filter((u) => u.cities.includes(c)).length }))
      .filter((x) => x.n > 1)
      .sort((a, b) => b.n - a.n)[0]?.c;
    if (topCity) {
      picks.push({ label: topCity, active: city === topCity, toggle: () => setCity(city === topCity ? "" : topCity) });
    }
    return picks;
  }, [scoped, courseQuery, scholarshipOnly, intake, level, city, levelOptions, cityOptions]);

  const select = `${field} px-3 py-3 cursor-pointer`;
  const label = "mb-2 block text-[14px] font-semibold text-navy";
  const resultLabel = `${results.length} ${results.length === 1 ? "university" : "universities"}`;

  return (
    <>
      {/* Hero + search */}
      <section className="bg-gradient-to-r from-blue-royal to-blue-dark px-4 pt-6 pb-10">
        <div className="max-w-7xl mx-auto">
          {breadcrumb}
          <h1 className="mt-4 text-3xl md:text-[38px] font-bold leading-tight text-white">{title}</h1>
          {subtitle && <div className="mt-2 max-w-2xl text-[16px] text-white/80">{subtitle}</div>}

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              (document.activeElement as HTMLElement | null)?.blur();
              resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-7 flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] md:flex-row md:items-stretch"
          >
            <SearchField
              label="University"
              placeholder="Search university name"
              value={nameQuery}
              onChange={setNameQuery}
            />
            <div className="mx-5 h-px bg-border-light md:mx-0 md:my-3 md:h-auto md:w-px" aria-hidden />
            <SearchField
              label="Course"
              placeholder="e.g. MBA, Nursing, Computer Science"
              value={courseQuery}
              onChange={setCourseQuery}
            />
            <div className="flex items-center gap-2 border-t border-border-light p-2 md:border-t-0 md:pl-0">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                aria-haspopup="dialog"
                className="relative inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-[15px] font-semibold text-navy hover:bg-off-white transition-colors md:flex-none"
              >
                <SlidersHorizontal className="w-[18px] h-[18px]" aria-hidden />
                Filters
                {chips.length > 0 && (
                  <span className="rounded-full bg-blue-royal px-2 text-[12px] font-bold text-white">{chips.length}</span>
                )}
              </button>
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow px-7 py-3.5 text-[15px] font-semibold text-black hover:bg-yellow-bright transition-colors md:flex-none"
              >
                <Search className="w-[18px] h-[18px]" aria-hidden />
                Search
              </button>
            </div>
          </form>

          {quickPicks.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-white/70">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                Popular
              </span>
              <div
                className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="group"
                aria-label="Popular searches"
              >
                {quickPicks.map((pick) => (
                  <button
                    key={pick.label}
                    type="button"
                    aria-pressed={pick.active}
                    onClick={() => {
                      pick.toggle();
                      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                      pick.active
                        ? "border-white bg-white text-blue-dark shadow-sm"
                        : "border-white/30 bg-white/5 text-white hover:border-white/70 hover:bg-white/15"
                    }`}
                  >
                    {pick.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section ref={resultsRef} className="max-w-7xl mx-auto px-4 pt-8 scroll-mt-[90px]">
        {/* Country quick picks */}
        {!fixedCountry && countries.length > 1 && (
          <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by country">
            {[{ slug: "" as const, name: "All countries" }, ...countries].map((c) => {
              const active = country === c.slug;
              return (
                <button
                  key={c.slug || "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => changeCountry(c.slug)}
                  className={`rounded-[10px] border px-4 py-2 text-[14px] font-semibold transition-colors ${
                    active
                      ? "border-blue-royal bg-blue-royal text-white"
                      : "border-border-light bg-white text-navy hover:border-blue-royal hover:text-blue-royal"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 text-[15px] text-gray-dark" aria-live="polite">
              <strong className="text-navy">{results.length}</strong> {results.length === 1 ? "university" : "universities"} found
            </p>
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.clear}
                aria-label={`Remove filter: ${chip.label}`}
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-blue-royal/30 bg-blue-royal/[0.06] px-3 py-1.5 text-[13px] font-semibold text-blue-royal hover:border-blue-royal hover:bg-blue-royal/10 transition-colors"
              >
                {chip.label}
                <X className="w-3.5 h-3.5" aria-hidden />
              </button>
            ))}
            {chips.length > 1 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[13px] font-semibold text-gray-dark hover:text-navy hover:underline underline-offset-4"
              >
                Clear all
              </button>
            )}
          </div>
          <label className="flex items-center gap-2 text-[14px] text-gray-dark">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer rounded-[10px] border border-border-light bg-white px-3 py-2 text-[14px] font-semibold text-navy focus:outline-none focus:border-blue-royal"
            >
              <option value="recommended">Recommended</option>
              <option value="fee-asc">Lowest fees</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border-light p-10 text-center">
            <p className="text-[18px] font-bold text-navy">No universities match your search</p>
            <p className="mt-2 text-[15px] text-gray-dark">Try removing a filter, or ask a counsellor to find options for you.</p>
            <button
              type="button"
              onClick={clearEverything}
              className="mt-5 rounded-[10px] border border-blue-royal px-5 py-2.5 text-[14px] font-semibold text-blue-royal hover:bg-blue-royal hover:text-white transition-colors"
            >
              Clear search &amp; filters
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageResults.map((u) => (
              <li key={u.href} className="relative">
                <div className="absolute right-3 top-3 z-10">
                  <CompareToggle id={u.id} name={u.name} />
                </div>
                {/* The whole card is one link, so it reacts on hover like other clickable elements. */}
                <Link
                  href={u.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-white transition-all hover:-translate-y-0.5 hover:border-blue-royal/50 hover:shadow-[0_12px_32px_rgba(0,19,83,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-royal"
                >
                  <div className="flex h-36 items-end justify-center border-b border-border-light px-6 pb-4">
                    <Image src={u.logo} alt="" width={240} height={96} className="h-20 w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-[16px] font-bold leading-snug text-navy group-hover:text-blue-royal">{u.name}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-gray-dark">
                      <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden />
                      {u.cities.join(", ")}, {u.countryName}
                    </p>
                    <dl className="mt-4 space-y-2.5 border-t border-border-light pt-4 text-[13px]">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="flex items-center gap-1.5 text-gray-dark"><Wallet className="w-4 h-4" aria-hidden />Fees from</dt>
                        <dd className="text-right font-semibold text-navy">
                          {u.feeFrom !== undefined ? formatMoney(u.feeFrom, u.currency) : "Ask a counsellor"}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="flex items-center gap-1.5 text-gray-dark"><Award className="w-4 h-4" aria-hidden />Scholarship</dt>
                        <dd className={`text-right font-semibold ${u.scholarship ? "text-green-700" : "text-gray-dark"}`}>
                          {u.scholarship ?? "—"}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="flex items-center gap-1.5 text-gray-dark"><CalendarDays className="w-4 h-4" aria-hidden />Next intake</dt>
                        <dd className="text-right font-semibold text-navy">{u.nextIntake ?? "Ask a counsellor"}</dd>
                      </div>
                    </dl>
                    <span className="mt-auto pt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-blue-royal group-hover:underline underline-offset-4">
                      View university <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Pagination page={currentPage} totalPages={totalPages} totalItems={results.length} pageSize={PAGE_SIZE} onChange={goToPage} />
      </section>

      {/* Filter panel: slides in from the right on desktop, up from the bottom on mobile */}
      <div
        className={`fixed inset-0 z-[60] ${filtersOpen ? "" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        inert={!filtersOpen}
      >
        <button
          type="button"
          tabIndex={filtersOpen ? 0 : -1}
          aria-label="Close filters"
          onClick={() => setFiltersOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${filtersOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-out
            inset-x-0 bottom-0 max-h-[88dvh] rounded-t-2xl
            md:inset-y-0 md:right-0 md:left-auto md:bottom-auto md:max-h-none md:w-[420px] md:rounded-none
            ${filtersOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-border-light px-6 py-5">
            <h2 className="flex items-center gap-2 text-[18px] font-bold text-navy">
              <SlidersHorizontal className="w-5 h-5" aria-hidden />
              Filters
            </h2>
            <button
              type="button"
              tabIndex={filtersOpen ? 0 : -1}
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
              className="rounded-full p-2 text-gray-dark hover:bg-off-white hover:text-navy"
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {!fixedCountry && (
              <label className="block">
                <span className={label}>Country</span>
                <select className={select} value={country} onChange={(e) => changeCountry(e.target.value as CountrySlug | "")}>
                  <option value="">All countries</option>
                  {countries.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="block">
              <span className={label}>Study level</span>
              <select className={select} value={level} onChange={(e) => setLevel(e.target.value as CourseLevel | "")}>
                <option value="">All levels</option>
                {levelOptions.map((l) => (
                  <option key={l} value={l}>{LEVEL_LABEL[l]}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={label}>Intake month</span>
              <select className={select} value={intake} onChange={(e) => setIntake(e.target.value as IntakeMonth | "")}>
                <option value="">All intakes</option>
                {intakeOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={label}>City</span>
              <select className={select} value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">All cities</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <div>
              <label className="block">
                <span className={label}>Maximum tuition</span>
                <select
                  className={`${select} disabled:cursor-not-allowed disabled:bg-off-white disabled:text-gray-medium`}
                  value={maxFee}
                  disabled={!currency || feeOptions.length === 0}
                  onChange={(e) => setMaxFee(e.target.value === "" ? "" : Number(e.target.value))}
                >
                  <option value="">Any fee</option>
                  {currency &&
                    feeOptions.map((f) => (
                      <option key={f} value={f}>Up to {formatMoney(f, currency)}</option>
                    ))}
                </select>
              </label>
              {!currency && <p className="mt-1.5 text-[13px] text-gray-dark">Choose a country first to filter by fee.</p>}
            </div>
            <label className="flex cursor-pointer select-none items-center gap-3 rounded-[10px] border border-border-light px-4 py-3.5 hover:border-blue-royal">
              <input
                type="checkbox"
                checked={scholarshipOnly}
                onChange={(e) => setScholarshipOnly(e.target.checked)}
                className="h-[18px] w-[18px] cursor-pointer accent-blue-royal"
              />
              <span className="text-[15px] font-medium text-navy">Only show universities with scholarships</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-border-light px-6 py-4">
            <button
              type="button"
              tabIndex={filtersOpen ? 0 : -1}
              onClick={resetFilters}
              className="rounded-[10px] border border-border-light py-3 text-[15px] font-semibold text-navy hover:border-navy transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              tabIndex={filtersOpen ? 0 : -1}
              onClick={() => setFiltersOpen(false)}
              className="rounded-[10px] bg-yellow py-3 text-[15px] font-semibold text-black hover:bg-yellow-bright transition-colors"
            >
              Show {resultLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SearchField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="group relative flex flex-1 cursor-text items-center gap-3 px-5 py-3 hover:bg-off-white/60 focus-within:bg-off-white/60 transition-colors">
      <Search className="w-5 h-5 shrink-0 text-gray-medium group-focus-within:text-blue-royal" aria-hidden />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[12px] font-bold uppercase tracking-wide text-navy">{label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[15px] text-navy placeholder:text-gray-medium focus:outline-none"
        />
      </span>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={`Clear ${label.toLowerCase()} search`}
          className="shrink-0 rounded-full p-1.5 text-gray-dark hover:bg-border-light hover:text-navy"
        >
          <X className="w-4 h-4" aria-hidden />
        </button>
      )}
    </label>
  );
}

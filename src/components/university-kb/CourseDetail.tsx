"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";
import { locationLines } from "@/lib/university-kb/locations";
import { MapPin, ArrowRight, Clock, Wallet, CalendarDays, MessageCircle } from "lucide-react";
import Dropdown from "./Dropdown";
import Pagination from "./Pagination";
import { EnquiryProvider, EnquireButton } from "./EnquiryForm";
import { photoFor } from "./CourseCover";
import { labelForCourse } from "./courseTopic";
import { formatMoney } from "@/lib/university-kb/countries";
import type { CountrySlug, CourseLevel, CurrencyCode, IntakeMonth } from "@/lib/university-kb";

export interface CourseDetailData {
  name: string;
  level: CourseLevel;
  subject?: string;
  currency: CurrencyCode;
  /** e.g. ["January 2027"], for the enquiry form */
  intakes: string[];
  offers: {
    university: { name: string; logo: string; href: string; cities: string[]; country: CountrySlug; currency: CurrencyCode };
    course: { slug: string; fee?: number; per?: "year" | "total"; feeFrom?: boolean; durationMonths: number; intakes: IntakeMonth[]; placement?: boolean };
  }[];
  related: { name: string; count: number; href: string }[];
}

const LEVEL_LABEL: Record<CourseLevel, string> = { foundation: "Foundation", undergraduate: "Undergraduate", postgraduate: "Postgraduate", research: "Research" };

type SortKey = "fee-asc" | "name";

const PAGE_SIZE = 8;

function durationLabel(months: number) {
  if (months % 12 === 0) return `${months / 12} year${months === 12 ? "" : "s"}`;
  return `${months} months`;
}

function range(values: number[], fmt: (n: number) => string) {
  if (!values.length) return undefined;
  const min = Math.min(...values), max = Math.max(...values);
  return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

export default function CourseDetail({ data }: { data: CourseDetailData }) {
  return (
    <EnquiryProvider university="Multiple universities" universitySlug="multiple" intakes={data.intakes} adviceAbout={`${data.name} and the universities that offer it`}>
      <Content data={data} />
    </EnquiryProvider>
  );
}

function Content({ data }: { data: CourseDetailData }) {
  const { offers, currency } = data;
  const [intake, setIntake] = useState<IntakeMonth | "">("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState<SortKey>("fee-asc");
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);

  const intakeOptions = useMemo(() => Array.from(new Set(offers.flatMap((o) => o.course.intakes))), [offers]);
  const cityOptions = useMemo(() => Array.from(new Set(offers.flatMap((o) => o.university.cities))).sort(), [offers]);

  const shown = useMemo(() => {
    const list = offers.filter((o) => (!intake || o.course.intakes.includes(intake)) && (!city || o.university.cities.includes(city)));
    return sort === "name"
      ? [...list].sort((a, b) => a.university.name.localeCompare(b.university.name))
      : [...list].sort((a, b) => (a.course.fee ?? Infinity) - (b.course.fee ?? Infinity));
  }, [offers, intake, city, sort]);

  // Back to page 1 whenever a filter or the sort changes.
  const listKey = JSON.stringify([intake, city, sort]);
  const [prevListKey, setPrevListKey] = useState(listKey);
  if (listKey !== prevListKey) {
    setPrevListKey(listKey);
    setPage(1);
  }
  const totalPages = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = shown.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const goToPage = (p: number) => {
    setPage(p);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fees = offers.map((o) => o.course.fee).filter((f): f is number => f !== undefined);
  const from = fees.length ? Math.min(...fees) : undefined;
  const durations = offers.map((o) => o.course.durationMonths);
  const allIntakes = Array.from(new Set(offers.flatMap((o) => o.course.intakes)));

  return (
    <>
      <section className="relative overflow-hidden bg-navy pb-10 pt-6 text-white">
        <Image src={`/images/course-covers/${photoFor(data.subject, data.name)}.webp`} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-blue-dark/70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-y-1 text-[13px] text-white/75">
            <span className="mr-3">
              <BackButton fallbackHref="/course-finder" label="Back" />
            </span>
            <Link href="/" className="hover:text-white hover:underline underline-offset-2">Home</Link>
            <span className="mx-1.5" aria-hidden>/</span>
            <Link href="/course-finder" className="hover:text-white hover:underline underline-offset-2">Find Course</Link>
            <span className="mx-1.5" aria-hidden>/</span>
            <span className="font-medium text-white">{data.name}</span>
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-navy">{LEVEL_LABEL[data.level]}</span>
            {labelForCourse(data.name, data.subject) && <span className="rounded-full border border-white/40 px-3 py-1 text-[12px] font-semibold text-white">{labelForCourse(data.name, data.subject)}</span>}
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-[40px]">{data.name}</h1>
          <p className="mt-2 text-[16px] text-white/85">
            Offered by <strong className="text-white">{offers.length} partner universities</strong>
            {from !== undefined && <> · from <strong className="text-white">{formatMoney(from, currency)}</strong></>}
          </p>

          <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-white/20 pt-6 sm:grid-cols-3">
            <div>
              <dt className="flex items-center gap-1.5 text-[13px] text-white/70"><Wallet className="h-4 w-4" aria-hidden />Tuition</dt>
              <dd className="mt-1 text-[17px] font-semibold">{range(fees, (n) => formatMoney(n, currency)) ?? "Ask a counsellor"}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[13px] text-white/70"><Clock className="h-4 w-4" aria-hidden />Duration</dt>
              <dd className="mt-1 text-[17px] font-semibold">{range(durations, durationLabel) ?? "—"}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[13px] text-white/70"><CalendarDays className="h-4 w-4" aria-hidden />Intakes</dt>
              <dd className="mt-1 text-[17px] font-semibold">{allIntakes.length ? allIntakes.join(", ") : "Ask a counsellor"}</dd>
            </div>
          </dl>

          <EnquireButton
            course={data.name}
            className="mt-7 inline-flex items-center gap-2 rounded-[10px] bg-yellow px-6 py-3 text-[15px] font-semibold text-black transition-colors hover:bg-yellow-bright"
          >
            <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
            Enquire about this course
          </EnquireButton>
        </div>
      </section>

      <section ref={listRef} className="mx-auto max-w-7xl scroll-mt-[90px] px-4 sm:px-6 lg:px-8 pb-20 pt-10">
        <h2 className="text-[24px] font-bold text-navy">Universities offering {data.name}</h2>
        <p className="mt-1 text-[15px] text-gray-dark">Compare the fee, duration and intake at each university, then open the one you like.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="w-full sm:w-52">
            <Dropdown label="Intake" value={intake} onChange={setIntake} options={[{ value: "", label: "Any intake" }, ...intakeOptions.map((m) => ({ value: m, label: m }))]} />
          </div>
          <div className="w-full sm:w-52">
            <Dropdown label="City" value={city} onChange={setCity} options={[{ value: "", label: "Any city" }, ...cityOptions.map((c) => ({ value: c, label: c }))]} />
          </div>
          <div className="flex items-center gap-2 text-[14px] text-gray-dark sm:ml-auto">
            Sort by
            <Dropdown
              variant="compact"
              label="Sort by"
              value={sort}
              onChange={(v) => setSort((v || "fee-asc") as SortKey)}
              options={[{ value: "fee-asc", label: "Lowest fees" }, { value: "name", label: "University (A–Z)" }]}
            />
          </div>
        </div>

        <p className="mt-5 text-[15px] text-gray-dark" aria-live="polite">
          <strong className="text-navy">{shown.length}</strong> {shown.length === 1 ? "university" : "universities"}
          {(intake || city) && (
            <button type="button" onClick={() => { setIntake(""); setCity(""); }} className="ml-3 text-[13px] font-semibold text-blue-royal hover:underline underline-offset-4">
              Clear filters
            </button>
          )}
        </p>

        {shown.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border-light p-10 text-center">
            <p className="text-[18px] font-bold text-navy">No universities match these filters</p>
            <button type="button" onClick={() => { setIntake(""); setCity(""); }} className="mt-4 rounded-[10px] border border-blue-royal px-5 py-2.5 text-[14px] font-semibold text-blue-royal hover:bg-blue-royal hover:text-white transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border-light overflow-hidden rounded-2xl border border-border-light bg-white">
            {pageItems.map(({ university: uni, course: c }) => (
              <li key={uni.href}>
                <Link href={`${uni.href}#course-${c.slug}`} className="group flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4 hover:bg-off-white focus-visible:bg-off-white focus-visible:outline-none">
                  <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-border-light bg-white p-1.5">
                    <Image src={uni.logo} alt="" width={120} height={56} className="max-h-full w-full object-contain" />
                  </span>
                  <span className="min-w-0 flex-1 basis-56">
                    <span className="block text-[16px] font-bold text-navy group-hover:text-blue-royal">{uni.name}</span>
                    {locationLines(uni.cities, uni.country).map((line) => (
                      <span key={line} className="mt-0.5 flex items-center gap-1 text-[13px] text-gray-dark">
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {line}
                      </span>
                    ))}
                    {c.placement && <span className="mt-1 block text-[12px] font-semibold text-amber-700">Placement year included</span>}
                  </span>
                  <dl className="flex flex-wrap gap-x-8 gap-y-2 text-[14px]">
                    <div>
                      <dt className="text-[12px] text-gray-dark">Tuition</dt>
                      <dd className="font-semibold text-navy">
                        {c.fee !== undefined ? (
                          <>
                            {c.feeFrom ? "from " : ""}
                            {formatMoney(c.fee, uni.currency)}
                            <span className="ml-1 text-[12px] font-normal text-gray-dark">{c.per === "year" ? "per year" : "total"}</span>
                          </>
                        ) : (
                          <span className="font-normal text-gray-dark">Ask a counsellor</span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] text-gray-dark">Duration</dt>
                      <dd className="font-semibold text-navy">{durationLabel(c.durationMonths)}</dd>
                    </div>
                    <div>
                      <dt className="text-[12px] text-gray-dark">Intake</dt>
                      <dd className="font-semibold text-navy">{c.intakes.length ? c.intakes.join(", ") : "Ask a counsellor"}</dd>
                    </div>
                  </dl>
                  <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-blue-royal group-hover:underline underline-offset-4">
                    View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Pagination page={currentPage} totalPages={totalPages} totalItems={shown.length} pageSize={PAGE_SIZE} onChange={goToPage} noun="universities" />

        {data.related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-[20px] font-bold text-navy">Other versions of this course</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {data.related.map((r) => (
                <li key={r.name}>
                  <Link href={r.href} className="inline-flex items-center gap-2 rounded-full border border-border-light bg-white px-4 py-2 text-[14px] font-semibold text-navy transition-colors hover:border-blue-royal hover:text-blue-royal">
                    {r.name}
                    <span className="text-[12px] font-normal text-gray-dark">{r.count} {r.count === 1 ? "university" : "universities"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-12 text-[13px] text-gray-dark">
          Fees and intakes can change. Confirm with an Admizz counsellor before applying.
        </p>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Landmark,
  Wallet,
  Award,
  CalendarDays,
  MessageCircle,
  Check,
} from "lucide-react";
import type { CountryInfo, UniversityProfile } from "@/lib/university-kb";
import { EXPLORE_BASE_PATH, compareId, lowestFee, nextIntake, topScholarship } from "@/lib/university-kb";
import CompareToggle from "./CompareToggle";
import { formatMoney } from "@/lib/university-kb/countries";
import { EnquireButton } from "./EnquiryForm";
import BackButton from "./BackButton";

interface Props {
  university: UniversityProfile;
  country: CountryInfo;
}

export default function UniversityHeader({ university: u, country }: Props) {
  const fee = lowestFee(u);
  const intake = nextIntake(u);
  const LEVELS = {
    foundation: "Foundation",
    undergraduate: "Undergraduate",
    postgraduate: "Postgraduate",
    research: "Research",
  } as const;
  const tags = [
    ...Array.from(new Set(u.courses.map((c) => LEVELS[c.level]))),
    u.scholarships.length > 0 && "Scholarships available",
    u.courses.some((c) => c.withPlacement) && "Placement year option",
  ].filter((t): t is string => Boolean(t));

  const facts = [
    fee !== undefined && {
      icon: Wallet,
      label: "Fees from",
      value: formatMoney(fee, country.currency),
    },
    topScholarship(u) && {
      icon: Award,
      label: "Scholarship",
      value: topScholarship(u)!.value,
    },
    intake && { icon: CalendarDays, label: "Next intake", value: intake },
    u.established && {
      icon: Landmark,
      label: "Established",
      value: String(u.established),
    },
  ].filter(Boolean) as { icon: typeof Wallet; label: string; value: string }[];

  return (
    <section className="relative">
      {/* Brand band */}
      <div className="bg-gradient-to-r from-blue-royal to-blue-dark pt-5 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          <BackButton
            fallbackHref={`${EXPLORE_BASE_PATH}/${country.slug}`}
            label="Back"
          />
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/75">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:underline underline-offset-2"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={EXPLORE_BASE_PATH}
                  className="hover:text-white hover:underline underline-offset-2"
                >
                  Find College
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={`${EXPLORE_BASE_PATH}/${country.slug}`}
                  className="hover:text-white hover:underline underline-offset-2"
                >
                  {country.name}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white font-medium">{u.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Overlapping profile card */}
      <div className="px-4 -mt-12">
        <div className="max-w-7xl mx-auto rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,19,83,0.12)] border border-border-light p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="shrink-0 w-36 h-20 md:w-44 md:h-24 rounded-xl border border-border-light bg-white flex items-center justify-center p-2">
              <Image
                src={u.logo}
                alt={`${u.name} logo`}
                width={176}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-[28px] leading-tight font-bold text-navy">
                {u.name}
              </h1>
              <p className="mt-1.5 flex items-center gap-1.5 text-[15px] text-gray-dark">
                <MapPin className="w-4 h-4 text-gray-dark" aria-hidden />
                {u.cities.join(" · ")}, {country.name}
              </p>
              {tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-slate">
                  {tags.map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-green-600" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-3 self-start md:self-center">
            <CompareToggle id={compareId(u.country, u.slug)} name={u.name} variant="header" />
            <EnquireButton className=" inline-flex items-center justify-center gap-2 bg-yellow text-black font-semibold text-[15px] px-6 py-3 rounded-[10px] whitespace-nowrap shadow-[0_2px_0_rgba(0,0,0,0.08)] hover:bg-yellow-bright hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(253,237,34,0.45)] transition-all">
              <MessageCircle className="w-4 h-4" aria-hidden />
              Talk to a Counsellor
            </EnquireButton>
            </div>
          </div>

          {facts.length > 0 && (
            <dl className="mt-6 pt-5 border-t border-border-light grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:divide-x divide-border-light">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 lg:px-6 lg:first:pl-0"
                >
                  <Icon
                    className="mt-0.5 w-5 h-5 shrink-0 text-gray-dark"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <dt className="text-[13px] text-gray-dark">{label}</dt>
                    <dd className="text-[16px] font-semibold text-navy">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/ui/BreadcrumbSchema";
import ArticleInfoBox from "@/components/ArticleInfoBox";
import PostSummary from "@/components/PostSummary";
import BlogCtaBanner from "@/components/BlogCtaBanner";
import CTAForm from "@/components/ui/CTAForm";
import { blogH2, blogP } from "@/components/lib/blog-typography";
import RuleTimeline, { type TimelineItem } from "./RuleTimeline";

const TITLE = "Study Abroad Rule Changes for Nepali Students 2026: UK, Australia, Canada";
const DESCRIPTION =
  "A dated list of the visa, funds and work-rule changes that affect Nepali students applying to the UK, Australia and Canada in 2026 and 2027, each checked against an official government page.";
const URL = "https://admizzeducation.com/study-abroad-rule-changes";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Admizz Education",
    images: ["/images/og/stuyabroad.webp"],
    type: "article",
  },
};

interface RuleChange {
  country: string;
  effective: string;
  title: string;
  summary: string;
  affects: string;
  source: { label: string; url: string };
  guide: { label: string; href: string };
  explainer?: { label: string; href: string };
}

// Every entry was checked against the official page named in `source` in October 2026.
// Add a new entry only after reading the official page; never copy a figure from a news article.
const changes: RuleChange[] = [
  {
    country: "Australia",
    effective: "October 2, 2026",
    title: "Family members and onshore applications under the Student visa",
    summary:
      "Student visa applicants can no longer include a partner or dependent children in their application unless an exemption applies (for example PhD students, DFAT or Defence-sponsored students, foreign government scholarship recipients, and eligible students from Pacific and ASEAN countries). Current visa holders can no longer add family members after the visa is granted. Most temporary visa holders must also be outside Australia when they lodge a Student visa application and when it is granted.",
    affects:
      "Nepali students planning to bring family, and anyone planning to switch to a Student visa from inside Australia.",
    source: {
      label: "Home Affairs: Changes to Student visa application rules (subclasses 500 and 590)",
      url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/changes-to-student-visa-application-rules-500-590",
    },
    guide: { label: "Study in Australia from Nepal", href: "/study-in-australia-from-nepal" },
    explainer: { label: "Read the full explainer", href: "/australia-student-visa-changes-october-2026-nepali-students" },
  },
  {
    country: "Australia",
    effective: "July 1, 2026",
    title: "Student visa application charge rises to AUD 2,500",
    summary:
      "From July 1, 2026 Student visa fees start from AUD 2,500 per application unless you are exempt.",
    affects: "Every new Student visa applicant.",
    source: {
      label: "Study Australia: Student visa (subclass 500)",
      url: "https://www.studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/student-visa-subclass-500",
    },
    guide: { label: "Study in Australia from Nepal", href: "/study-in-australia-from-nepal" },
  },
  {
    country: "Australia",
    effective: "January 21, 2026",
    title: "TOEFL candidates must select 'Taking TOEFL for Australia'",
    summary:
      "From January 21, 2026 TOEFL iBT applicants must select 'Taking TOEFL for Australia' when they register so the test is valid for an Australian visa. Tests taken entirely online or at home are not accepted. For tests taken on or after August 7, 2025 the minimums are IELTS Academic 6.0, PTE Academic 47 and TOEFL iBT 67.",
    affects: "Nepali students who still need to book an English test.",
    source: {
      label: "Home Affairs: Student visa (subclass 500), English language requirements",
      url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    },
    guide: { label: "English requirements for Australia", href: "/study-in-australia-from-nepal#australia-requirements" },
  },
  {
    country: "United Kingdom",
    effective: "January 1, 2027",
    title: "Graduate visa shortens from 2 years to 18 months",
    summary:
      "A Graduate visa lasts 2 years if you apply on or before December 31, 2026 and 18 months if you apply on or after January 1, 2027. PhD graduates still get 3 years. Most students who start a UK degree in 2027 will graduate after the change.",
    affects: "Nepali students starting a UK bachelor's or master's from 2027.",
    source: { label: "GOV.UK: Graduate visa", url: "https://www.gov.uk/graduate-visa" },
    guide: { label: "Study in the UK from Nepal", href: "/study-in-uk-from-nepal" },
    explainer: { label: "Read the full explainer", href: "/uk-graduate-visa-18-months-from-2027-nepali-students" },
  },
  {
    country: "Canada",
    effective: "September 1, 2026",
    title: "Living-cost proof rises to CAD 23,448 for a single applicant",
    summary:
      "For study permit applications made from September 1, 2026, a single applicant must show CAD 23,448 for living costs (CAD 6,318 for each additional family member), on top of tuition and travel. Between January 1, 2025 and August 31, 2026 the amount was CAD 22,895.",
    affects: "Every Nepali student applying for a Canadian study permit.",
    source: {
      label: "IRCC: Proof of financial support",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html",
    },
    guide: { label: "Study in Canada from Nepal", href: "/study-in-canada-from-nepal" },
  },
  {
    country: "Canada",
    effective: "2026",
    title: "Some master's and PhD students exempt from the attestation letter",
    summary:
      "Canada has exempted certain master's and doctoral-level students from the provincial or territorial attestation letter requirement, and introduced faster processing for eligible PhD students and their families. Most other applicants still need an attestation letter, and Quebec uses a CAQ instead.",
    affects: "Nepali students applying for graduate study in Canada.",
    source: {
      label: "IRCC: Study permit, get the right documents",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html",
    },
    guide: { label: "Study in Canada from Nepal", href: "/study-in-canada-from-nepal" },
  },
  {
    country: "Canada",
    effective: "November 1, 2024",
    title: "Language proof required for most post-graduation work permits",
    summary:
      "Since November 1, 2024 most PGWP applicants must give proof of language test results when they apply. A PGWP can be valid from 8 months to 3 years, and a master's degree of at least 8 months can get up to 3 years.",
    affects: "Nepali students planning to work in Canada after study.",
    source: {
      label: "IRCC: About the post-graduation work permit",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/about.html",
    },
    guide: { label: "Study in Canada from Nepal", href: "/study-in-canada-from-nepal" },
  },
  {
    country: "Canada",
    effective: "November 8, 2024",
    title: "Student Direct Stream ended",
    summary:
      "The Student Direct Stream and Nigeria Student Express ended on November 8, 2024. All applicants now apply through the regular study permit process.",
    affects: "Students who expected a fast-track Canadian visa.",
    source: {
      label: "IRCC: End of the Student Direct Stream",
      url: "https://www.canada.ca/en/immigration-refugees-citizenship/news/notices/end-student-direct-stream-nigeria-student-express.html",
    },
    guide: { label: "Study in Canada from Nepal", href: "/study-in-canada-from-nepal" },
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "October 2, 2026" -> sortable timestamp. A year alone ("2026") has no exact date, so it sorts to the start of that year and is never marked Upcoming.
function effectiveTime(effective: string): number {
  const full = effective.match(/^([A-Za-z]+) (\d{1,2}), (\d{4})$/);
  if (full) return new Date(Number(full[3]), MONTHS.indexOf(full[1]), Number(full[2])).getTime();
  const year = effective.match(/^(\d{4})$/);
  return year ? new Date(Number(year[1]), 0, 1).getTime() : 0;
}

export default function StudyAbroadRuleChangesPage() {
  const now = Date.now();
  const items: TimelineItem[] = [...changes]
    .sort((a, b) => effectiveTime(b.effective) - effectiveTime(a.effective))
    .map((c, i) => ({
      ...c,
      id: `change-${i + 1}`,
      year: c.effective.match(/(\d{4})$/)?.[1] ?? "",
      upcoming: /,/.test(c.effective) && effectiveTime(c.effective) > now,
    }));
  const countries = Array.from(new Set(changes.map((c) => c.country)));

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://admizzeducation.com" },
          { name: "Study Abroad Rule Changes", url: URL },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: TITLE,
            description: DESCRIPTION,
            url: URL,
            dateModified: "2026-10-13",
            publisher: { "@id": "https://admizzeducation.com/#organization" },
            isPartOf: { "@id": "https://admizzeducation.com/#website" },
          }),
        }}
      />

      <section className="bg-gradient-to-r from-blue-royal to-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-5">
            {countries.map((c) => (
              <a
                key={c}
                href={`#${c.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[13px] font-semibold bg-white/20 px-3 py-2 rounded-full hover:bg-white/30 transition-colors"
              >
                {c}
              </a>
            ))}
          </div>
          <h1 className="text-[22px] sm:text-2xl md:text-[36px] font-bold leading-tight max-w-3xl">
            Study Abroad Rule Changes for Nepali Students
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/90 max-w-3xl">
            The visa, funds and work-rule changes affecting Nepali students applying to the UK,
            Australia and Canada. Each entry names its effective date and links to the official
            government page it was checked against.
          </p>
          <p className="mt-3 text-sm text-white/80">Last reviewed: October 2026</p>
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-1 min-w-0 max-w-3xl">
            <ArticleInfoBox
              items={[
                { label: "Countries", value: "UK, Australia, Canada" },
                { label: "Changes listed", value: String(changes.length) },
                { label: "Last reviewed", value: "October 2026" },
                { label: "Sources", value: "Official government pages" },
              ]}
            />
            <PostSummary text="The changes that matter most for a Nepali student starting in 2027 are: the UK Graduate visa becoming 18 months for applications from January 1, 2027, Australia stopping most family members being included in Student visa applications from October 2, 2026, and Canada raising the living-cost proof to CAD 23,448 for applications from September 1, 2026." />

            <h2 className={blogH2.className} style={blogH2.style}>Key dates at a glance</h2>
            <div className="overflow-x-auto mb-10">
              <table className="w-full bg-white border border-border-light rounded-[10px] overflow-hidden">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left px-3 sm:px-5 py-3 text-sm font-semibold whitespace-nowrap">Effective</th>
                    <th className="hidden sm:table-cell text-left px-3 sm:px-5 py-3 text-sm font-semibold">Country</th>
                    <th className="text-left px-3 sm:px-5 py-3 text-sm font-semibold">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((c, r) => (
                    <tr key={c.id} className={r % 2 === 0 ? "bg-white" : "bg-off-white"}>
                      <td className="px-3 sm:px-5 py-3 text-sm text-navy font-medium align-top sm:whitespace-nowrap">{c.effective}</td>
                      <td className="hidden sm:table-cell px-3 sm:px-5 py-3 text-sm text-gray-dark align-top whitespace-nowrap">{c.country}</td>
                      <td className="px-3 sm:px-5 py-3 text-sm align-top">
                        <span className="sm:hidden block text-[12px] font-semibold text-gray-500 mb-0.5">{c.country}</span>
                        <a href={`#${c.id}`} className="text-blue-royal hover:text-blue-dark underline">
                          {c.title}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className={blogH2.className} style={{ ...blogH2.style, marginTop: 0 }}>Every change, newest first</h2>
            <RuleTimeline items={items} countries={countries} />

            <div className="mt-12 border-t-4 border-[#001353] bg-white rounded-b-lg shadow-sm px-5 py-5">
              <h2 style={{ ...blogH2.style, borderColor: undefined }} className="mb-2">How we keep this page accurate</h2>
              <p className={blogP.className} style={blogP.style}>
                We add a change only after reading the official government page, and we link to it.
                Rules can change again, so confirm the current position on the official site before
                you apply. If you spot something out of date, tell us through the{" "}
                <Link href="/contact" className="text-blue-royal hover:text-blue-dark underline">
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>

          <aside className="hidden lg:block w-[472px] shrink-0">
            <div className="sticky top-[90px]">
              <CTAForm title="Book a Free Counseling Session" colorScheme="light" formSource="blog-post" />
            </div>
          </aside>
        </div>
      </article>

      <BlogCtaBanner />
    </main>
  );
}

// Official sources and a "checked in" line for Sanity-backed posts. Keyed by post slug. Shipped with the
// site code (no Sanity publish needed), same idea as post-faqs.ts / post-summaries.ts.
//
// Rules: every source must be an official or primary page that was actually opened and read; add
// `checked` only when the post's key facts were compared with those sources in that month. If the
// post has outdated facts, do NOT add an entry until the text is corrected (see post-content-patches.ts).
export interface PostSource {
  label: string;
  url: string;
}

export interface PostSourcesEntry {
  /** e.g. "November 2026". Shown as "Checked in November 2026". */
  checked?: string;
  sources: PostSource[];
}

export const postSources: Record<string, PostSourcesEntry> = {
  "phd-in-uk-for-international-students-fees-funding-2027": {
    checked: "November 2026",
    sources: [
      { label: "UK Government: Student visa money you need and financial evidence", url: "https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants" },
      { label: "UKCISA: Immigration Rules changes, September 2026 (maintenance rising November 30, 2026)", url: "https://www.ukcisa.org.uk/news/student-update-changes-to-the-immigration-rules-september-2026/" },
      { label: "UK Government: Graduate visa length", url: "https://www.gov.uk/graduate-visa" },
      { label: "UK Government: Student visa family members and dependants", url: "https://www.gov.uk/student-visa/family-members" },
      { label: "UK Government: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
      { label: "UK Government: Academic Technology Approval Scheme (ATAS)", url: "https://www.gov.uk/guidance/academic-technology-approval-scheme" },
    ],
  },
  "study-in-scotland-international-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa - money you need (maintenance funds, 28 days)", url: "https://www.gov.uk/student-visa/money" },
      { label: "UKCISA: Immigration Rules changes, maintenance funds from November 30, 2026", url: "https://www.ukcisa.org.uk/news/student-update-changes-to-the-immigration-rules-september-2026/" },
      { label: "GOV.UK: Graduate visa (18 months from January 1, 2027)", url: "https://www.gov.uk/graduate-visa" },
      { label: "GOV.UK: Student and Child Student route guidance (work hours, dependants)", url: "https://www.gov.uk/government/publications/student-route-caseworker-guidance/student-and-child-student" },
      { label: "University of Glasgow: international tuition fees 2026/27", url: "https://www.gla.ac.uk/undergraduate/fees/intlfees/" },
    ],
  },
  "master-by-research-uk-international-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa - money you need (maintenance funds, 28 days)", url: "https://www.gov.uk/student-visa/money" },
      { label: "UKCISA: Immigration Rules changes, maintenance funds from November 30, 2026", url: "https://www.ukcisa.org.uk/news/student-update-changes-to-the-immigration-rules-september-2026/" },
      { label: "GOV.UK: Student visa (fee, when to apply, decision time)", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Immigration Health Surcharge costs", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
      { label: "GOV.UK: Graduate visa (18 months from January 1, 2027)", url: "https://www.gov.uk/graduate-visa" },
      { label: "GOV.UK: Student and Child Student route guidance (work hours, dependants)", url: "https://www.gov.uk/government/publications/student-route-caseworker-guidance/student-and-child-student" },
    ],
  },
  "university-of-bradford-international-scholarships-2027": {
    checked: "November 2026",
    sources: [
      { label: "University of Bradford: 60th Anniversary Scholarship (2026/27)", url: "https://www.bradford.ac.uk/scholarships/university-of-bradford-60th-anniversary-scholarship-2026-27/" },
      { label: "GOV.UK: Student visa - money you need (maintenance funds, 28 days)", url: "https://www.gov.uk/student-visa/money" },
      { label: "UKCISA: Immigration Rules changes, maintenance funds from November 30, 2026", url: "https://www.ukcisa.org.uk/news/student-update-changes-to-the-immigration-rules-september-2026/" },
      { label: "GOV.UK: Student and Child Student route guidance (work hours, dependants)", url: "https://www.gov.uk/government/publications/student-route-caseworker-guidance/student-and-child-student" },
    ],
  },
  "adult-nursing-uk-international-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa - money you need (maintenance funds, 28 days)", url: "https://www.gov.uk/student-visa/money" },
      { label: "UKCISA: Immigration Rules changes, maintenance funds from November 30, 2026", url: "https://www.ukcisa.org.uk/news/student-update-changes-to-the-immigration-rules-september-2026/" },
      { label: "GOV.UK: Graduate visa (18 months from January 1, 2027)", url: "https://www.gov.uk/graduate-visa" },
      { label: "GOV.UK: Health and Care Worker visa", url: "https://www.gov.uk/health-care-worker-visa" },
      { label: "GOV.UK: Student and Child Student route guidance (work hours, dependants)", url: "https://www.gov.uk/government/publications/student-route-caseworker-guidance/student-and-child-student" },
    ],
  },
  "uk-intake-timeline-nepalese-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa - money you need (maintenance funds, 28 days)", url: "https://www.gov.uk/student-visa/money" },
      { label: "UKCISA: Immigration Rules changes, maintenance funds from November 30, 2026", url: "https://www.ukcisa.org.uk/news/student-update-changes-to-the-immigration-rules-september-2026/" },
      { label: "GOV.UK: Student visa (fee, when to apply, decision time)", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Secure English Language Test results valid for 2 years", url: "https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt" },
      { label: "GOV.UK: Countries where you need a TB test (Nepal listed)", url: "https://www.gov.uk/tb-test-visa/countries-where-you-need-a-tb-test-to-enter-the-uk" },
    ],
  },
  "gpa-required-study-uk-from-nepal-2027": {
    checked: "November 2026",
    sources: [
      { label: "University of Portsmouth: entry requirements for Nepal", url: "https://www.port.ac.uk/study/international-students/your-country/nepal" },
      { label: "University of Chester: entry requirements for Nepal", url: "https://www.chester.ac.uk/international/countries/nepal/" },
      { label: "Northumbria University: entry requirements for Nepal", url: "https://www.northumbria.ac.uk/international/northumbria-and-your-country/asia/nepal/" },
    ],
  },
  "uk-january-2027-intake-nepalese-students": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview (fee and processing time)", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa money you need (28-day rule)", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Statement of changes HC 584 (new maintenance amounts from November 30, 2026)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-584-3-september-2026/statement-of-changes-to-the-immigration-rules-hc-584-3-september-2026-accessible" },
      { label: "GOV.UK: Do you need a tuberculosis test for a UK visa", url: "https://www.gov.uk/tb-test-visa" },
    ],
  },
  "us-f1-september-15-deadline-2026": {
    checked: "November 2026",
    sources: [
      { label: "Study in the States: DHS publishes final rule on elimination of duration of status", url: "https://studyinthestates.dhs.gov/2026/07/dhs-publishes-final-rule-on-elimination-of-duration-of-status" },
      { label: "Study in the States: Elimination of duration of status FAQ", url: "https://studyinthestates.dhs.gov/elimination-of-duration-of-status-frequently-asked-questions" },
      { label: "GOV.UK: Graduate visa (18 months from January 1, 2027)", url: "https://www.gov.uk/graduate-visa" },
    ],
  },
  "new-zealand-short-term-graduate-work-visa-2026": {
    checked: "November 2026",
    sources: [
      { label: "Immigration New Zealand: New Short-Term Graduate Work Visa launching November 16, 2026", url: "https://www.immigration.govt.nz/about-us/news-centre/new-short-term-graduate-work-visa-launching-on-16-november-2026/" },
      { label: "Immigration New Zealand: Post-Study Work Visa eligibility extended from November 16, 2026", url: "https://www.immigration.govt.nz/about-us/news-centre/post-study-work-visa-eligibility-extended-from-16-november-2026/" },
      { label: "Immigration New Zealand: Staying to work after finishing your study", url: "https://www.immigration.govt.nz/study/after-you-finish-your-study/staying-to-work-after-finishing-your-study/" },
    ],
  },
};

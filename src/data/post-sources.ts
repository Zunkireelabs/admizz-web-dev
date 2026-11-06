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
  "uk-graduate-route-visa-2026": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Graduate visa (length, fee and how to apply)", url: "https://www.gov.uk/graduate-visa" },
      { label: "GOV.UK: Student visa, knowledge of English (CEFR B2 at degree level)", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Skilled Worker visa, your job (£41,700 or the going rate)", url: "https://www.gov.uk/skilled-worker-visa/your-job" },
      { label: "GOV.UK: Apply for a Graduate visa", url: "https://www.gov.uk/graduate-visa/apply" },
    ],
  },
  "uk-graduate-visa-18-months-january-2027-deadline": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Graduate visa (length, fee and how to apply)", url: "https://www.gov.uk/graduate-visa" },
      { label: "GOV.UK: Apply for a Graduate visa", url: "https://www.gov.uk/graduate-visa/apply" },
    ],
  },
  "us-f1-duration-of-status-ended-2026": {
    checked: "November 2026",
    sources: [
      { label: "Federal Register: Establishing a Fixed Time Period of Admission and an Extension of Stay Procedure for Nonimmigrant Academic Students (published July 17, 2026; effective September 15, 2026)", url: "https://www.federalregister.gov/documents/2026/07/17/2026-14439/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant" },
    ],
  },
  "uk-education-nepal-growth": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "5-reasons-why-uk-is-an-ideal-study-destination": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "university-of-west-london-courses-international-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "affordable-universities-london-international-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "bpp-university-london-international-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "abertay-university-courses-fees-international-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "london-metropolitan-university-fees-courses-international-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "uk-student-visa-success-rate-nepali-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "uk-study-gap-acceptable-international-students-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "uk-international-education-policy-2026": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "study-in-uk-without-ielts-english-requirement-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "university-of-east-london-courses-fees-international-2027": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "ielts-requirement-for-studying-in-the-uk-from-nepal": {
    checked: "November 2026",
    sources: [
      { label: "GOV.UK: Student visa overview", url: "https://www.gov.uk/student-visa" },
      { label: "GOV.UK: Student visa, money you need", url: "https://www.gov.uk/student-visa/money" },
      { label: "GOV.UK: Student visa, knowledge of English", url: "https://www.gov.uk/student-visa/knowledge-of-english" },
      { label: "GOV.UK: Immigration Health Surcharge cost", url: "https://www.gov.uk/healthcare-immigration-application/how-much-pay" },
    ],
  },
  "student-visa-for-canada": {
    checked: "November 2026",
    sources: [
      { label: "IRCC: Study permit (fee and how to apply)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
      { label: "IRCC: Proof of financial support (living-cost chart)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html" },
      { label: "IRCC: Provincial attestation letter (PAL/TAL)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html" },
      { label: "IRCC: Work off campus", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html" },
    ],
  },
  "minimum-ielts-requirement-for-canadian-universities": {
    checked: "November 2026",
    sources: [
      { label: "IRCC: PGWP eligibility (language requirement)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility.html" },
      { label: "IRCC: About the Post-Graduation Work Permit", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/about.html" },
    ],
  },
  "five-reasons-why-you-should-study-in-australia": {
    checked: "November 2026",
    sources: [
      { label: "Study Australia: Student visa (subclass 500), work rights", url: "https://www.studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/student-visa-subclass-500" },
      { label: "Study Australia: Temporary Graduate visa (subclass 485)", url: "https://www.studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/temporary-graduate-visa-subclass-485" },
    ],
  },
  "study-in-australia": {
    checked: "November 2026",
    sources: [
      { label: "Study Australia: Visa application process (Genuine Student)", url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process" },
      { label: "Home Affairs: Visa Prices table (Student visa subclass 500 charges)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/fees-and-charges/current-visa-pricing" },
      { label: "Home Affairs: Student visa (subclass 500) overview, including the October 2, 2026 rule changes", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
      { label: "Home Affairs: Changes to Student visa application rules (subclasses 500 & 590), from October 2, 2026", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/changes-to-student-visa-application-rules-500-590" },
    ],
  },
  "australia-streamlines-student-visas-focus-on-genuine-students": {
    checked: "November 2026",
    sources: [
      { label: "Study Australia: Visa application process (Genuine Student)", url: "https://www.studyaustralia.gov.au/en/plan-your-move/visa-application-process" },
    ],
  },
  "4-major-difference-between-ielts-pte": {
    checked: "November 2026",
    sources: [
      { label: "IELTS: Scoring in detail and validity", url: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail" },
      { label: "Pearson: PTE Academic scoring explained", url: "https://www.pearsonpte.com/scoring-explained/" },
    ],
  },
  "ielts-preparation-in-nepal": {
    checked: "November 2026",
    sources: [
      { label: "IELTS: Scoring in detail and validity", url: "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail" },
    ],
  },
  "isic-explained-why-every-international-student-should-have-one": {
    checked: "November 2026",
    sources: [
      { label: "ISIC: The ISIC card, eligibility and cost", url: "https://www.isic.org/cards/isic/" },
    ],
  },
  "top-5-reasons-to-study-in-the-usa": {
    checked: "November 2026",
    sources: [
      { label: "Study in the States: F-1 Optional Practical Training (OPT)", url: "https://studyinthestates.dhs.gov/sevis-help-hub/student-records/fm-student-employment/f-1-optional-practical-training-opt" },
      { label: "Study in the States: STEM OPT extension overview", url: "https://studyinthestates.dhs.gov/stem-opt-hub/additional-resources/stem-opt-extension-overview" },
    ],
  },
  "top-5-best-universities-in-the-u-s-a": {
    checked: "November 2026",
    sources: [
      { label: "ICE: I-901 SEVIS fee amounts", url: "https://www.ice.gov/sevis/i901" },
      { label: "ICE: I-901 SEVIS fee FAQ", url: "https://www.ice.gov/sevis/i901/faq" },
      { label: "Study in the States: Students and the Form I-20", url: "https://studyinthestates.dhs.gov/students/prepare/students-and-the-form-i-20" },
    ],
  },
  "foreign-university-admission-from-nepal": {
    checked: "November 2026",
    sources: [
      { label: "ETS: GRE General Test scoring", url: "https://www.ets.org/gre/score-users/about/general-test/scoring.html" },
      { label: "ETS: Getting your GRE General Test scores", url: "https://www.ets.org/gre/test-takers/general-test/scores/get-scores.html" },
    ],
  },
  "step-by-step-guide-to-australia-student-visa-from-nepal": {
    checked: "November 2026",
    sources: [
      { label: "Home Affairs: Visa Prices table (Student visa subclass 500 charges)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/fees-and-charges/current-visa-pricing" },
      { label: "Home Affairs: Student visa (subclass 500) overview, including the October 2, 2026 rule changes", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
      { label: "Home Affairs: Changes to Student visa application rules (subclasses 500 & 590), from October 2, 2026", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/changes-to-student-visa-application-rules-500-590" },
    ],
  },
  "australia-student-visa-subclass-500": {
    checked: "November 2026",
    sources: [
      { label: "Home Affairs: Student visa (subclass 500) overview, including the October 2, 2026 rule changes", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" },
      { label: "Home Affairs: Changes to Student visa application rules (subclasses 500 & 590), from October 2, 2026", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/changes-to-student-visa-application-rules-500-590" },
    ],
  },
};

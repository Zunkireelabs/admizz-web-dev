// Text corrections for existing Sanity posts, keyed by post slug. Applied at
// render time by src/lib/content-patches.ts, so an outdated fact is fixed in
// this repo without editing the post in Sanity.
//
// Facts used (checked October 2026):
//  - UK Graduate visa: 18 months for applications submitted from 1 January 2027
//    (2 years before that date, 3 years for PhD graduates).
//  - UK Student visa fee GBP 558 and Immigration Health Surcharge GBP 776 a year
//    (GOV.UK).
//  - Living-cost funds GBP 1,529 a month in London and GBP 1,171 a month outside
//    London, up to 9 months (GOV.UK).
//  - "Tier 4" is the old name for the Student route.
import type { PostPatchSet } from "@/lib/content-patches";

export const postContentPatches: Record<string, PostPatchSet> = {
  "student-to-pr-steps-timeline-costs-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<td>Graduate Route — 2 years</td>",
        replace: "<td>Graduate Route — 18 months from Jan 1, 2027 (2 years before)</td>",
      },
      {
        find: "Apply for the Graduate Route visa — 2 years open work rights",
        replace: "Apply for the Graduate Route visa — 18 months open work rights (from January 1, 2027)",
      },
      {
        find: "The Graduate Route gives you 2 years (3 for PhD) to work",
        replace: "The Graduate Route gives you 18 months for applications from January 1, 2027 (2 years before that date, 3 years for PhD) to work",
      },
    ],
  },
  "us-f1-vs-uk-student-visa-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<span class=\"fact-value\">2 Years (Graduate Route)</span>",
        replace: "<span class=\"fact-value\">18 Months from Jan 1, 2027 (Graduate Route)</span>",
      },
      {
        find: "2 years open work rights for all graduates (3 for PhD).",
        replace: "18 months of open work rights for applications from January 1, 2027 (2 years before that date, 3 for PhD).",
      },
      {
        find: "£1,334/month for living costs (up to 9 months, or £1,023/month outside London)",
        replace: "£1,529/month in London for living costs (up to 9 months), or £1,171/month outside London (rising to £1,570 and £1,203 for applications from November 30, 2026)",
      },
    ],
  },
  "best-courses-study-abroad-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "eligible for the 2-year Graduate Route immediately",
        replace: "eligible for the Graduate Route (18 months for applications from January 1, 2027) immediately",
      },
      {
        find: "followed by the 2-year Graduate Route —",
        replace: "followed by the Graduate Route (18 months for applications from January 1, 2027) —",
      },
      {
        find: "The 2-year Graduate Route gives you time",
        replace: "The Graduate Route (18 months for applications from January 1, 2027) gives you time",
      },
      {
        find: "still deliver the full 2-year Graduate Route visa after graduation",
        replace: "still lead to the Graduate Route visa after graduation (18 months for applications from January 1, 2027)",
      },
      {
        find: "followed by 2 years on the Graduate Route. The total UK commitment — 1 year study + 2 years work — is just 3 years from start to finish.",
        replace: "followed by the Graduate Route (18 months for applications from January 1, 2027). The total UK commitment — 1 year study + 18 months work — is about 2.5 years from start to finish.",
      },
    ],
  },
  "us-f1-duration-of-status-ended-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<td>Graduate Route — 2 years (guaranteed)</td>",
        replace: "<td>Graduate Route — 18 months from Jan 1, 2027 (2 years before)</td>",
      },
      {
        find: "The UK's Graduate Route gives 2 years of guaranteed open work rights",
        replace: "The UK's Graduate Route gives guaranteed open work rights (18 months for applications from January 1, 2027, 2 years before that date)",
      },
    ],
  },
  "university-rankings-vs-graduate-outcomes-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "only universities on the Tier 4 Sponsor Register can issue",
        replace: "only universities licensed as Student sponsors by the Home Office can issue",
      },
    ],
  },
  "is-usa-worth-it-international-students-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "1-year Masters + 2-year Graduate Route.",
        replace: "1-year Master's + Graduate Route (18 months for applications from January 1, 2027).",
      },
      {
        find: "1-year Masters plus 2-year Graduate Route with no restriction",
        replace: "1-year Master's plus the Graduate Route (18 months for applications from January 1, 2027) with no restriction",
      },
    ],
  },
  "uk-it-graduate-jobs-visa-careers-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<span class=\"fact-value\">2 Years (3 for PhD)</span>",
        replace: "<span class=\"fact-value\">18 Months from Jan 1, 2027 (2 Years before; 3 for PhD)</span>",
      },
      {
        find: "— 2 years of open work rights (3 years for PhD graduates)",
        replace: "— 18 months of open work rights for applications from January 1, 2027, or 2 years before that date (3 years for PhD graduates),",
      },
      {
        find: "so use the full 2 years strategically",
        replace: "so use the full period (18 months for applications from January 1, 2027) strategically",
      },
      {
        find: "The 2-year entitlement (3 years for PhD) applies equally",
        replace: "The entitlement (18 months from January 1, 2027, 2 years before that date, 3 years for PhD) applies equally",
      },
    ],
  },
  "ai-cybersecurity-data-science-courses-jobs-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "Qualifies for the 2-year Graduate Route immediately.",
        replace: "Qualifies for the Graduate Route immediately (18 months for applications from January 1, 2027).",
      },
      {
        find: "followed by two years on the Graduate Route,",
        replace: "followed by the Graduate Route (18 months for applications from January 1, 2027),",
      },
      {
        find: "access 2 years of Graduate Route work rights",
        replace: "access Graduate Route work rights (18 months for applications from January 1, 2027)",
      },
    ],
  },
  "studying-in-the-uk-from-nepal-2025": {
    updated: "2026-10-05",
    patches: [
      {
        find: "lets you work up to 2 years after study, or 3 years for PhD graduates",
        replace: "lets you work for 18 months after study for applications from January 1, 2027 (2 years before that date), or 3 years for PhD graduates",
      },
      {
        find: "UK Student Visa (Tier 4)",
        replace: "UK Student visa",
      },
      {
        find: "Living costs: £1,334/month in London or £1,023/month outside London (for up to 9 months)",
        replace: "Living costs: £1,529/month in London or £1,171/month outside London (for up to 9 months), rising to £1,570 and £1,203 for applications from November 30, 2026",
      },
      {
        find: "stay and work for up to 2 years after completing a degree.",
        replace: "stay and work for 18 months after completing a degree (for applications from January 1, 2027; 2 years before that date).",
      },
    ],
  },
  "why-choose-the-uk-for-higher-education-a-complete-guide-for-nepalese-students": {
    updated: "2026-10-05",
    patches: [
      {
        find: "stay and work in the UK for 2 years after completing their degree.",
        replace: "stay and work in the UK for 18 months after completing their degree (for applications from January 1, 2027; 2 years before that date).",
      },
      {
        find: "stay and work in the UK for two years after graduation",
        replace: "stay and work in the UK for 18 months after graduation (two years for applications before January 1, 2027)",
      },
    ],
  },
  "checklist-for-2025-26-uk-student-visa-applicants": {
    updated: "2026-10-05",
    patches: [
      {
        find: "£1,334 per month × 9 months = £12,006",
        replace: "£1,529 per month × 9 months = £13,761 (£1,570 × 9 = £14,130 for applications from November 30, 2026)",
      },
      {
        find: "£1,023 per month × 9 months = £9,207",
        replace: "£1,171 per month × 9 months = £10,539 (£1,203 × 9 = £10,827 for applications from November 30, 2026)",
      },
    ],
  },
  "study-in-the-uk-complete-guide-for-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "2 years for Bachelor’s and Master’s graduates",
        replace: "18 months for Bachelor’s and Master’s graduates applying from January 1, 2027 (2 years before that date)",
      },
    ],
  },
  "uk-international-education-policy-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "2 years post-study work for graduates",
        replace: "18 months post-study work for graduates applying from January 1, 2027 (2 years before that date)",
      },
    ],
  },
  "study-in-the-uk-from-nepal-2026-complete-guide": {
    updated: "2026-10-05",
    patches: [
      {
        find: "stay for two years (three years for PhD graduates)",
        replace: "stay for 18 months for applications from January 1, 2027, or two years before that date (three years for PhD graduates)",
      },
      {
        find: "Tier 4 (General) Student Visa Requirements",
        replace: "Student Visa Requirements",
      },
      {
        find: "(£1,334 per month for areas outside London, £1,483 for London)",
        replace: "(£1,171 per month outside London, £1,529 for London; rising to £1,203 and £1,570 for applications from November 30, 2026)",
      },
      {
        find: "(approximately £490)",
        replace: "(£558)",
      },
      {
        find: "(£470 per year)",
        replace: "(£776 per year)",
      },
      {
        find: "Yes, Tier 4 visa holders can work",
        replace: "Yes, Student visa holders can work",
      },
      {
        find: "stay for 2 years (3 years for a PhD)",
        replace: "stay for 18 months for applications from January 1, 2027 (2 years before that date; 3 years for a PhD)",
      },
    ],
  },
  "uk-graduate-route-visa-reduced-2025": {
    updated: "2026-10-05",
    patches: [
      {
        find: "That period is now reduced to 18 months.",
        replace: "That period is reduced to 18 months for Graduate visa applications submitted from January 1, 2027.",
      },
    ],
  },
  "how-to-choose-the-right-country-for-your-higher-studies": {
    updated: "2026-10-05",
    patches: [
      {
        find: "the UK offers a two-year Graduate Route for international students.",
        replace: "the UK offers a Graduate Route (18 months for applications from January 1, 2027) for international students.",
      },
    ],
  },
  "ielts-requirement-for-studying-in-the-uk-from-nepal": {
    updated: "2026-10-05",
    patches: [
      {
        find: "(Tier 4 – Student Route)",
        replace: "(Student Route)",
      },
    ],
  },
  "guide-to-studying-in-the-uk": {
    updated: "2026-10-05",
    patches: [
      {
        find: "applying for the UK Student Visa (Tier 4).",
        replace: "applying for the UK Student Visa.",
      },
      {
        find: "stay and work for up to 2 years (3 years for PhD graduates)",
        replace: "stay and work for 18 months for applications from January 1, 2027, or up to 2 years before that date (3 years for PhD graduates)",
      },
    ],
  },
  "uk-student-visa-process-for-nepalese-students": {
    updated: "2026-10-05",
    patches: [
      {
        find: "At least £1,334 per month for London and £1,023 per month for other cities",
        replace: "At least £1,529 per month for London and £1,171 per month for other cities (rising to £1,570 and £1,203 for applications from November 30, 2026)",
      },
      {
        find: "UK Student Visa (Tier 4) online",
        replace: "UK Student Visa online",
      },
      {
        find: "(around £490)",
        replace: "(£558)",
      },
      {
        find: "£490 (approx. NPR 82,000)",
        replace: "£558",
      },
    ],
  },
  "top-courses-and-universities-in-the-uk": {
    updated: "2026-10-05",
    patches: [
      {
        find: "stay back for 2 years (3 years for PhD students)",
        replace: "stay back for 18 months for applications from January 1, 2027, or 2 years before that date (3 years for PhD students)",
      },
    ],
  },
  "cost-of-studying-and-living-in-the-uk": {
    updated: "2026-10-05",
    patches: [
      {
        find: "approximately £363 for the visa, plus a healthcare surcharge of around £470 per year",
        replace: "£558 for the visa, plus a healthcare surcharge of £776 per year",
      },
    ],
  },
  "choosing-study-destinations-australia-or-the-united-kingdom": {
    updated: "2026-10-05",
    patches: [
      {
        find: "allowing 2 years (3 years for PhD) of post-study work",
        replace: "allowing 18 months for applications from January 1, 2027, or 2 years before that date (3 years for PhD), of post-study work",
      },
    ],
  },
  "which-country-is-best-for-nepalese-students-in-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "remain in the UK to work for 2 years after a bachelor's or master's, and 3 years after a PhD.",
        replace: "remain in the UK to work for 18 months after a bachelor's or master's for applications from January 1, 2027 (2 years before that date), and 3 years after a PhD.",
      },
      {
        find: "{\"@type\":\"Question\",\"name\":\"Is Australia still good for Nepali students after Assessment Level 3?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Level 3 means stricter documentation requirements, not closure. Genuine students with clean financials, strong GS statements, and valid English scores continue to receive approvals.\"}},",
        replace: "",
      },
    ],
  },
  "study-in-the-uk-after-2-from-nepal-complete-2025-guide": {
    updated: "2026-10-05",
    patches: [
      {
        find: "a 2-year Graduate Route visa allows students",
        replace: "a Graduate Route visa (18 months for applications from January 1, 2027, 2 years before) allows students",
      },
      {
        find: "remain in the UK for two years after graduation (three years for PhD graduates)",
        replace: "remain in the UK for 18 months after graduation for applications from January 1, 2027, or two years before that date (three years for PhD graduates)",
      },
      {
        find: "stay and work in the UK for <strong>two years</strong> without",
        replace: "stay and work in the UK for <strong>18 months</strong> (for applications from January 1, 2027; <strong>two years</strong> before that date) without",
      },
    ],
  },
  "five-reasons-why-you-should-study-in-australia": {
    updated: "2026-10-05",
    patches: [
      {
        find: "the top three reasons why you should consider studying in Australia",
        replace: "the top five reasons why you should consider studying in Australia",
      },
    ],
  },
  "compex-scholarship-for-nepali-students-by-the-indian-embassy": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<strong>Tentative Opening Months</strong>",
        replace: "<strong>2026-27 round</strong>",
      },
      {
        find: "<td>April / May</td>",
        replace: "<td>Opened August 27, 2026, registration closed September 10, 2026</td>",
      },
      {
        find: "Applicants\u00a0must have passed\u00a0Class XII (10+2). Students\u00a0awaiting results\u00a0are\u00a0not eligible.",
        replace: "Candidates who have already passed Class XII may apply. Candidates appearing in the 2026 10+2 examination may also apply in anticipation of results, but their results must reach the Embassy within three days of publication or the candidature is likely to be cancelled.",
      },
      {
        find: "Select\u00a0four preferred institutes\u00a0from the list provided.",
        replace: "Select five institutes in order of preference, as provided in the online form.",
      },
      {
        find: "Written Exam/Test:\u00a0All eligible applicants will be invited for a qualifying test conducted by the\u00a0Embassy of India.",
        replace: "Computer-Based Test (CBT): selection is based on a qualifying or competitive computer-based test conducted by the Embassy of India.",
      },
      {
        find: "An\u00a0Equivalence Certificate from the Association of Indian Universities (AIU)\u00a0is mandatory at the time of admission.",
        replace: "An equivalence certificate from UGC New Delhi must be produced at the time of admission, according to the 2026-27 notice.",
      },
    ],
  },
  "complete-guide-to-the-indian-embassy-compex-scholarship-2024": {
    updated: "2026-10-05",
    patches: [
      {
        find: "\u00a0Look no further! The Embassy of India in Kathmandu is offering exciting scholarships through the COMPEX Scholarship Scheme 2024-25.",
        replace: "\u00a0This guide covers the 2024-25 round of the COMPEX Scholarship Scheme from the Embassy of India in Kathmandu. For the latest round, see our updated COMPEX 2026-27 guide at admizzeducation.com/compex-scholarship-2026-complete-guide-for-nepalese-students-to-study-in-india.",
      },
      {
        find: "Admizz Education is here to help! We understand that filling out scholarship applications can be overwhelming. If you encounter any issues during the application process, feel free to reach out to our team of experts for guidance.",
        replace: "The Embassy of India accepts applications directly from students only and does not accept applications made through consultants or agencies, so you must submit your own application. Our team can explain the notice and help you prepare.",
      },
      {
        find: "Filling out the online application form",
        replace: "Understanding the online application form",
      },
      {
        find: "Uploading documents",
        replace: "Checking your documents meet the format rules",
      },
    ],
  },
  "uk-faq-study-guide-for-international-students": {
    updated: "2026-10-05",
    patches: [
      {
        find: "As of 2026, the monthly living expense requirement is:",
        replace: "For applications made before November 30, 2026, the monthly living expense requirement is shown below. From November 30, 2026, it rises to £1,570 a month in London and £1,203 a month outside London:",
      },
    ],
  },
};

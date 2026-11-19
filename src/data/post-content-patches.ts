// Text corrections for existing content posts, keyed by post slug. Applied at
// render time by src/lib/content-patches.ts, so an outdated fact is fixed in
// this repo without editing the post file.
//
// Facts used (checked October 2026; New Zealand launch date checked November 19, 2026):
//  - New Zealand Short-term Graduate Work Visa and expanded Post-Study Work Visa:
//    launch postponed from November 16 to November 23, 2026 (INZ Amendment Circular 2026-36).
//  - UK Graduate visa: 18 months for applications submitted from 1 January 2027
//    (3 years for PhD graduates).
//  - UK Student visa fee GBP 558 and Immigration Health Surcharge GBP 776 a year
//    (GOV.UK).
//  - Living-cost funds GBP 1,529 a month in London and GBP 1,171 a month outside
//    London, up to 9 months (GOV.UK).
//  - "Tier 4" is the old name for the Student route.
//  - ICCR 2026-27 (Nepal): portal opened February 27, 2026; the Embassy of India extended the
//    deadline from April 15 to April 22, 2026 (Embassy of India, Kathmandu notice).
import type { PostPatchSet } from "@/lib/content-patches";

export const postContentPatches: Record<string, PostPatchSet> = {
  "student-to-pr-steps-timeline-costs-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<td>Graduate Route — 2 years</td>",
        replace: "<td>Graduate Route — 18 months</td>",
      },
      {
        find: "Apply for the Graduate Route visa — 2 years open work rights",
        replace: "Apply for the Graduate Route visa — 18 months open work rights",
      },
      {
        find: "The Graduate Route gives you 2 years (3 for PhD) to work",
        replace: "The Graduate Route gives you 18 months (3 years for PhD) to work",
      },
    ],
  },
  "us-f1-vs-uk-student-visa-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<span class=\"fact-value\">2 Years (Graduate Route)</span>",
        replace: "<span class=\"fact-value\">18 Months (Graduate Route)</span>",
      },
      {
        find: "2 years open work rights for all graduates (3 for PhD).",
        replace: "18 months of open work rights (3 for PhD).",
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
        replace: "eligible for the Graduate Route (18 months) immediately",
      },
      {
        find: "followed by the 2-year Graduate Route —",
        replace: "followed by the Graduate Route (18 months) —",
      },
      {
        find: "The 2-year Graduate Route gives you time",
        replace: "The Graduate Route (18 months) gives you time",
      },
      {
        find: "still deliver the full 2-year Graduate Route visa after graduation",
        replace: "still lead to the Graduate Route visa after graduation (18 months)",
      },
      {
        find: "followed by 2 years on the Graduate Route. The total UK commitment — 1 year study + 2 years work — is just 3 years from start to finish.",
        replace: "followed by the Graduate Route (18 months). The total UK commitment — 1 year study + 18 months work — is about 2.5 years from start to finish.",
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
        replace: "1-year Master's + Graduate Route (18 months).",
      },
      {
        find: "1-year Masters plus 2-year Graduate Route with no restriction",
        replace: "1-year Master's plus the Graduate Route (18 months) with no restriction",
      },
    ],
  },
  "uk-it-graduate-jobs-visa-careers-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "<span class=\"fact-value\">2 Years (3 for PhD)</span>",
        replace: "<span class=\"fact-value\">18 Months from Jan 1, 2027 (3 for PhD)</span>",
      },
      {
        find: "— 2 years of open work rights (3 years for PhD graduates)",
        replace: "— 18 months of open work rights (3 years for PhD graduates),",
      },
      {
        find: "so use the full 2 years strategically",
        replace: "so use the full period (18 months) strategically",
      },
      {
        find: "The 2-year entitlement (3 years for PhD) applies equally",
        replace: "The entitlement (18 months, 3 years for PhD) applies equally",
      },
    ],
  },
  "ai-cybersecurity-data-science-courses-jobs-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "Qualifies for the 2-year Graduate Route immediately.",
        replace: "Qualifies for the Graduate Route immediately (18 months).",
      },
      {
        find: "followed by two years on the Graduate Route,",
        replace: "followed by the Graduate Route (18 months),",
      },
      {
        find: "access 2 years of Graduate Route work rights",
        replace: "access Graduate Route work rights (18 months)",
      },
    ],
  },
  "studying-in-the-uk-from-nepal-2025": {
    updated: "2026-10-05",
    patches: [
      {
        find: "lets you work up to 2 years after study, or 3 years for PhD graduates",
        replace: "lets you work for 18 months after study, or 3 years for PhD graduates",
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
        replace: "stay and work for 18 months after completing a degree.",
      },
    ],
  },
  "why-choose-the-uk-for-higher-education-a-complete-guide-for-nepalese-students": {
    updated: "2026-10-05",
    patches: [
      {
        find: "stay and work in the UK for 2 years after completing their degree.",
        replace: "stay and work in the UK for 18 months after completing their degree.",
      },
      {
        find: "stay and work in the UK for two years after graduation",
        replace: "stay and work in the UK for 18 months after graduation",
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
        replace: "18 months for Bachelor’s and Master’s graduates",
      },
    ],
  },
  "uk-international-education-policy-2026": {
    updated: "2026-10-05",
    patches: [
      {
        find: "2 years post-study work for graduates",
        replace: "18 months post-study work for graduates",
      },
    ],
  },
  "study-in-the-uk-from-nepal-2026-complete-guide": {
    updated: "2026-10-05",
    patches: [
      {
        find: "stay for two years (three years for PhD graduates)",
        replace: "stay for 18 months (three years for PhD graduates)",
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
        replace: "stay for 18 months (3 years for a PhD)",
      },
    ],
  },
  "uk-graduate-route-visa-reduced-2025": {
    updated: "2026-10-05",
    patches: [
      {
        find: "That period is now reduced to 18 months.",
        replace: "That period is reduced to 18 months.",
      },
    ],
  },
  "how-to-choose-the-right-country-for-your-higher-studies": {
    updated: "2026-10-05",
    patches: [
      {
        find: "the UK offers a two-year Graduate Route for international students.",
        replace: "the UK offers a Graduate Route (18 months) for international students.",
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
        replace: "stay and work for 18 months (3 years for PhD graduates)",
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
        replace: "stay back for 18 months (3 years for PhD students)",
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
        replace: "allowing 18 months (3 years for PhD), of post-study work",
      },
    ],
  },
  "which-country-is-best-for-nepalese-students-in-2026": {
    updated: "2026-11-19",
    patches: [
      {
        find: "<main id=\"main-content\">",
        replace: "<main>",
      },
      {
        find: "remain in the UK to work for 2 years after a bachelor's or master's, and 3 years after a PhD.",
        replace: "remain in the UK to work for 18 months after a bachelor's or master's, and 3 years after a PhD.",
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
        replace: "a Graduate Route visa (18 months) allows students",
      },
      {
        find: "remain in the UK for two years after graduation (three years for PhD graduates)",
        replace: "remain in the UK for 18 months after graduation (three years for PhD graduates)",
      },
      {
        find: "stay and work in the UK for <strong>two years</strong> without",
        replace: "stay and work in the UK for <strong>18 months</strong> without",
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
  "new-zealand-short-term-graduate-work-visa-2026": {
    updated: "2026-11-19",
    patches: [
      {
        find: "Work Visa on November 16, 2026 —",
        replace: "Work Visa on November 23, 2026 (postponed from November 16) —",
      },
      {
        find: "<span class=\"fact-value\">November 16, 2026</span>",
        replace: "<span class=\"fact-value\">November 23, 2026 (postponed from November 16)</span>",
      },
      {
        find: "will open for applications on <strong>November 16, 2026</strong>",
        replace: "opens for applications from <strong>November 23, 2026</strong> (a week later than first announced)",
      },
      {
        find: "also from November 16, 2026. Together",
        replace: "also from November 23, 2026. Together",
      },
      {
        find: "Eligibility Is Also Expanding from November 16, 2026",
        replace: "Eligibility Is Also Expanding from November 23, 2026",
      },
      {
        find: "From November 16, 2026, graduates who completed a",
        replace: "From November 23, 2026, graduates who completed a",
      },
      {
        find: "<td>Available from</td><td>November 16, 2026</td><td>Already available (expanded Nov 2026)</td>",
        replace: "<td>Available from</td><td>November 23, 2026 (postponed from November 16)</td><td>Expanded eligibility also from November 23, 2026</td>",
      },
      {
        find: "The November 16, 2026 launch date was confirmed on May 29, 2026",
        replace: "The original November 16, 2026 launch date was confirmed on May 29, 2026, and Immigration New Zealand has since postponed the launch by a week to November 23, 2026",
      },
      {
        find: "<div class=\"timeline-date\">November 16, 2026</div>",
        replace: "<div class=\"timeline-date\">November 23, 2026 (postponed from November 16)</div>",
      },
      {
        find: "Apply at the earliest opportunity after November 16, 2026",
        replace: "Apply at the earliest opportunity after the visa opens on November 23, 2026",
      },
      {
        find: "has already expired before November 16, 2026",
        replace: "ended more than 3 months ago",
      },
      {
        find: "The Short-Term Graduate Work Visa launches on November 16, 2026.",
        replace: "The Short-Term Graduate Work Visa launches on November 23, 2026.",
      },
      {
        find: "Applications open on November 16, 2026, as confirmed by Immigration New Zealand on May 29, 2026.",
        replace: "Applications were due to open on November 16, 2026, but Immigration New Zealand postponed the launch by a week to November 23, 2026, because of the global Microsoft outage on November 13, 2026 (see <a href=\"https://www.immigration.govt.nz/assets/inz/documents/amendment-circulars/Amendment-Circular-2026-36.pdf\" rel=\"noopener\">Amendment Circular 2026-36</a>). Check the official Short-term Graduate Work Visa page before you apply.",
      },
    ],
  },
  "iccr-scholarship-2026-study-in-india": {
    updated: "2026-11-19",
    patches: [
      {
        find: "and closed them on April 15, 2026.",
        replace: "and closed them on April 22, 2026, after the Embassy of India in Kathmandu extended the original April 15, 2026 deadline.",
      },
      {
        find: "<div class=\"date-val\">April 15, 2026</div>",
        replace: "<div class=\"date-val\">April 22, 2026 (extended from April 15)</div>",
      },
    ],
  },
  "why-study-in-the-usa-from-nepal-benefits-opportunities-and-global-exposure": {
    updated: "2026-11-19",
    patches: [
      {
        find: "USA Ends Duration of Status — F-1 Visa Guide 2026",
        replace: "US F-1 Duration of Status: Court Vacates Fixed-Period Rule",
      },
    ],
  },
  "top-5-reasons-to-study-in-the-usa": {
    updated: "2026-11-19",
    patches: [
      {
        find: "USA Ends Duration of Status — F-1 Visa Guide 2026",
        replace: "US F-1 Duration of Status: Court Vacates Fixed-Period Rule",
      },
    ],
  },
  "form-i-20-your-essential-guide-to-studying-in-the-usa": {
    updated: "2026-11-19",
    patches: [
      {
        find: "USA Ends Duration of Status — F-1 Visa Guide 2026",
        replace: "US F-1 Duration of Status: Court Vacates Fixed-Period Rule",
      },
    ],
  },
  "international-student-work-hours-2026-comparison": {
    updated: "2026-11-19",
    patches: [
      {
        find: "Following the July 2026 end of Duration of Status, the DHS regulatory agenda confirms OPT reform proposals will be published in August 2026.",
        replace: "DHS published a proposed rule on October 8, 2026 that would add OPT fees of $70,000 for initial OPT and $30,000 for later OPT. It is only a proposal, and we found no final rule. A separate DHS rule that would have replaced Duration of Status with fixed admission periods was vacated by a federal court on November 16, 2026.",
      },
    ],
  },
  "london-metropolitan-university-fees-courses-international-2027": {
    updated: "2026-11-19",
    patches: [
      {
        find: "<span class=\"fact-label\">Fees (Approx.)</span><span class=\"fact-value\">About £13,000–£20,000 / Year*</span>",
        replace: "<span class=\"fact-label\">Overseas fees (2026–27)</span><span class=\"fact-value\">From £19,500 (UG) and £20,000 (PG) a year</span>",
      },
      {
        find: "London Met does not publish one flat fee. Tuition depends on the course and level. Third-party guides put international fees <strong>at roughly £13,000 to £16,000 for undergraduate courses and £14,000 to £20,000 for postgraduate courses</strong>. Treat this as an estimate and confirm the exact fee on the course page.",
        replace: "London Met does not publish one flat fee, and tuition depends on the course. On its <a href=\"https://www.londonmet.ac.uk/international/applying/countries/students-from-nepal/\" rel=\"noopener\">page for students from Nepal</a>, London Met says that for 2026–27 undergraduate tuition fees start from <strong>£19,500 a year</strong> and postgraduate tuition fees start from <strong>£20,000 a year</strong>. Overseas fees listed on individual course pages in November 2026, per year, include: Computer Science BSc £19,500, Business Management BA £19,500, Nursing (Adult) BSc £21,000, Data Analytics MSc £20,000, Cyber Security MSc £20,000, International Business Management MSc £20,500 and Project Management MSc £20,500. These are listed for September 2027 or January 2027 entry, and the £5,000 Bright Futures reduction comes off the fee. Part-time study is not available on a student visa. Confirm the exact fee on your course page.",
      },
      {
        find: "<div class=\"faq-item\"><div class=\"faq-q\">Are the fee figures exact?</div><div class=\"faq-a\">No. The ranges are estimates from third-party guides. Use the course page for the exact fee.</div></div>",
        replace: "<div class=\"faq-item\"><div class=\"faq-q\">Are the fee figures exact?</div><div class=\"faq-a\">The \"from\" figures come from London Met's page for students from Nepal, and the course examples come from individual course pages checked in November 2026. Fees vary by course and entry date, so use your course page for the exact fee.</div></div><div class=\"faq-item\"><div class=\"faq-q\">What are the entry requirements for Nepali students?</div><div class=\"faq-a\">London Met's page for students from Nepal lists, for undergraduate study, a Higher Secondary School Certificate with grades over 55% in year 12 or a CTEVT diploma with a minimum grade of 55%. For postgraduate study it lists a minimum 3.0 GPA on a 4-point scale, or grade B, in a bachelor's degree studied for at least four years. Standard degrees ask for IELTS 6.0 overall with 5.5 in each component, and some courses ask for more.</div></div><div class=\"faq-item\"><div class=\"faq-q\">What deposit do I need for a student visa CAS?</div><div class=\"faq-a\">London Met says students applying for a Student visa need a £4,000 deposit to request a CAS, followed by up to 50% of the yearly tuition fee on or before the enrollment deadline. The remaining 50% is due three months after the course starts.</div></div><div class=\"faq-item\"><div class=\"faq-q\">Is there a scholarship for Nepali students?</div><div class=\"faq-a\">London Met's South Asia scholarship page lists a £5,000 tuition fee reduction for citizens of Nepal and other South Asian countries who pay a deposit of £4,000 or more, applied automatically with no separate application. The university's pages differ on how long it lasts, so confirm the terms with London Met.</div></div>",
      },
    ],
  },
  "total-cost-studying-uk-from-nepal-2027": {
    updated: "2026-11-19",
    patches: [
      {
        find: "<section class=\"section\" id=\"faq\">",
        replace: "<section class=\"section\" id=\"visa-costs\">\n    <h2>UK Visa and Health Costs on Top of Tuition (checked November 2026)</h2>\n    <p>These come from GOV.UK and the Home Office fees table. Add them to your tuition and living costs:</p>\n    <ul>\n      <li><strong>Student visa fee:</strong> £558 to apply from outside the UK.</li>\n      <li><strong>Immigration Health Surcharge:</strong> £776 per year for students. No charge if you apply from outside the UK for 6 months or less; more than 6 months but under a year counts as a full year.</li>\n      <li><strong>Funds to show:</strong> your first year of tuition as shown on the CAS, plus living costs of £1,529 a month in London or £1,171 a month outside London for up to 9 months. These rise to £1,570 and £1,203 for applications from November 30, 2026. You must hold the money for at least 28 days in a row.</li>\n      <li><strong>Dependants:</strong> only research degree and government-sponsored students can bring them. GOV.UK lists £845 a month in London and £680 outside London in funds for dependants, and £558 each plus £776 a year for the health surcharge.</li>\n    </ul>\n    <p>Source: <a href=\"https://www.gov.uk/student-visa\" rel=\"noopener\">GOV.UK Student visa</a>. Fees change, so confirm them on GOV.UK before you pay.</p>\n  </section>\n\n  <section class=\"section\" id=\"faq\">",
      },
      {
        find: "<h2>Frequently Asked Questions</h2>\n\n    ",
        replace: "<h2>Frequently Asked Questions</h2>\n\n    <div class=\"faq-item\">\n      <div class=\"faq-q\">How much are the UK student visa fee and health surcharge?</div>\n      <div class=\"faq-a\">GOV.UK lists £558 for a Student visa from outside the UK and £776 per year for the Immigration Health Surcharge for students. There is no surcharge if you apply from outside the UK for a course of 6 months or less. Confirm both on GOV.UK before you pay.</div>\n    </div>\n\n    ",
      },
    ],
  },
};

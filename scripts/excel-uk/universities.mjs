// Structured data for the new UK universities (Jan 2027 intake), transcribed from the partner
// sheet's "Jan 2027 Intake" tab. Course lists are parsed from the sheet (parse-courses.mjs);
// everything else — fees, scholarships, requirements — is free text in the sheet, so it lives here.
//
// `match` is the exact name in the sheet's University column.

const yr = (label, amount, extra = {}) => ({ label, amount, per: "year", ...extra });
const tot = (label, amount, extra = {}) => ({ label, amount, per: "total", ...extra });

const isUgRoute = (r) => !["pg", "pre"].includes(r);

const test = (name, score) => ({ test: name, score });
const ielts = (overall, each) => test("IELTS", `${overall} overall (${each} in each component)`);
const pte = (overall, each) => test("PTE", `${overall} overall (${each} in each component)`);
const duolingo = (overall, each) => test("Duolingo", `${overall} overall (${each} in each component)`);

const ug = "Undergraduate";
const pg = "Postgraduate";

// The course card shows one tuition figure, so each course gets a single fee: the cost to start
// (pathway year, or Pre-Master's). Later university-year fees are stated in the profile highlights.
const pathwayFees = ({ ug, pre }) => (c) => (isUgRoute(c.route) ? [ug(c)] : [pre]).filter(Boolean);

export const UNIVERSITIES = [
  {
    match: "Abertay University",
    slug: "abertay-university",
    name: "Abertay University",
    cities: ["Dundee"],
    website: "https://www.abertay.ac.uk",
    overview:
      "Abertay University in Dundee, Scotland offers postgraduate programmes with direct entry for the January 2027 intake, including a Global MBA and MSc courses in business, engineering and environmental subjects.",
    highlights: ["Course duration: 1 year", "CAS deposit: 50% of tuition"],
    fee: (c) => [tot("Tuition fee", /Global MBA/.test(c.name) ? 19950 : 18950)],
    scholarships: [
      { name: "Postgraduate scholarship", value: "£5,000", eligibility: "Net fee after scholarship: Global MBA £14,950; MSc £13,950" },
    ],
    deposits: [{ label: "PCI deposit", amount: 500 }],
    english: { ielts: 6, pte: 59, duolingo: 105 },
    entryRequirements: [{ level: pg, criteria: ["2.6 GPA or 60% (4-year degree)"] }],
    languageTests: [
      {
        level: pg,
        tests: [ielts("6.0", "5.5"), pte(59, 59), duolingo(105, 95)],
        waiver: ["MOI accepted from Tribhuvan, Pokhara, Purbanchal and Kathmandu universities", "UK degree (within a 5-year gap)"],
      },
    ],
  },
  {
    match: "Anglia Ruskin University (ARU)",
    slug: "anglia-ruskin-university",
    name: "Anglia Ruskin University (ARU)",
    cities: ["Cambridge", "Chelmsford"],
    website: "https://www.aru.ac.uk",
    overview:
      "Anglia Ruskin University offers pathway routes for the January 2027 intake: Foundation and International Year One into ARU degrees, plus a Pre-Master's leading to MSc, MBA, MA and LLM programmes.",
    highlights: ["Campus (Cambridge or Chelmsford) is not stated on the partner flyer — confirm with your counsellor"],
    fee: (c) => {
      if (c.route === "foundation") return [yr("Foundation year", 16000, { note: "£13,000 after £3,000 scholarship" })];
      if (c.route === "y1") return [yr("International Year One", 16200, { note: "£14,000 after £2,200 scholarship (business courses)" })];
      return [tot("Pre-Master's (1 semester)", 9100, { note: `Then Master's year ${/MBA/.test(c.name) ? "£21,200" : "£17,500–£21,200"}` })];
    },
    scholarships: [
      { name: "Foundation scholarship", value: "£3,000", eligibility: "All foundation courses; plus a £1,000 progression scholarship" },
      { name: "International Year One scholarship", value: "£2,200", eligibility: "Stated for business courses — check for other courses; plus a £1,000 progression scholarship" },
    ],
    english: { ielts: 5.5, pte: 59, duolingo: 100 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 3 years", criteria: ["Foundation: 50% or 2.0 GPA", "International Year One: 2.4 GPA"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 4–5 years", criteria: ["Bachelor's degree pass (4-year degree only)"] },
    ],
    languageTests: [
      {
        level: ug,
        tests: [ielts("5.5", "5.5"), pte(59, 59), duolingo(100, 100)],
        waiver: ["Grade B / 55% in Grade 12 English, followed by an ELPT test"],
      },
      { level: pg, tests: [ielts("5.5", "5.5"), pte(59, 59), duolingo(100, 100)] },
    ],
  },
  {
    match: "Bangor University",
    slug: "bangor-university",
    name: "Bangor University",
    cities: ["Bangor"],
    website: "https://www.bangor.ac.uk",
    overview:
      "Bangor University in Wales offers direct-entry undergraduate and postgraduate programmes for the January 2027 intake across business, computing, law, history and social sciences.",
    highlights: ["CAS deposit: 50% of tuition", "Net fee after scholarship: UG £12,500–£15,000; PG £14,500–£16,500"],
    fee: (c) =>
      isUgRoute(c.route)
        ? [yr("Tuition fee", 19000)]
        : [tot("Tuition fee", c.headingFee ?? 20500)],
    scholarships: [
      { name: "Bangor scholarship", value: "Up to £6,000", eligibility: "£4,000 for eligible students; £6,000 for GPA 3.00 / 75%+ (every year). UG and PG" },
      { name: "Early payment discount", value: "£500", eligibility: "Full payment before enrolment" },
    ],
    english: { ielts: 6, pte: 56, duolingo: 105 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["2.6 GPA; 60% overall"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["4-year degree: 50%", "3-year degree: 65%"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("6.0", "5.5"), pte(56, 51)], waiver: ["Grade B in Grade 12 English"] },
      {
        level: pg,
        tests: [ielts("6.0", "5.5"), pte(59, 59), test("Duolingo", "105 (100)"), test("Oxford ELLT", "Accepted")],
        waiver: ["Grade B in Grade 12 English"],
      },
    ],
  },
  {
    match: "Bangor University International College (BUIC)",
    slug: "bangor-university-international-college",
    name: "Bangor University International College (BUIC)",
    cities: ["Bangor"],
    overview:
      "Bangor University International College is a pathway route into Bangor University for the January 2027 intake: International Year Zero or Year One into undergraduate degrees, and a two-term Pre-Master's into MBA, MA and MSc programmes.",
    highlights: [
      "University years after the pathway: UG £18,000–£21,000 per year; PG £19,000–£20,500",
      "Standard application process shared with the other international colleges (see the How to Apply tab)",
    ],
    fee: pathwayFees({
      ug: () => yr("Pathway year", 17845, { note: "£12,845 after £5,000 pathway scholarship" }),
      pre: tot("Pre-Master's – Term 1 entry", 11755, { from: true, note: "Term 2 entry £15,195" }),
    }),
    scholarships: [
      { name: "Pathway scholarship", value: "£5,000", eligibility: "Undergraduate pathway year" },
      { name: "Pre-Master's scholarship", value: "Up to £6,000", eligibility: "£5,500 (Term 1 entry); £6,000 (Term 2 entry)" },
      { name: "Progression scholarship", value: "£4,000 per year", eligibility: "University years. The maximum total is being confirmed — ask your counsellor" },
    ],
    english: { ielts: 5.5, pte: 43, duolingo: 100 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["Year Zero: Grade 12, 50% overall", "Year One: Grade 12, 50–59% overall, or a 3-year diploma"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 7 years", criteria: ["Term 1: Bachelor's degree (minimum 3 years), 50%+", "Term 2: Level 5 / HND equivalent"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("5.5", "5.5"), pte(43, 43), duolingo(100, 100)], waiver: ["English waiver available (subject to eligibility)"] },
      {
        level: pg,
        tests: [test("IELTS (Term 1)", "6.0 overall (5.5 in each component)"), test("PTE (Term 1)", "56 overall (51 in each component)"), test("IELTS (Term 2)", "5.5 overall (5.5 in each component)"), test("PTE (Term 2)", "43 overall (43 in each component)")],
        waiver: ["English waiver available (subject to eligibility)"],
      },
    ],
    stages: "shared",
  },
  {
    match: "BPP University",
    slug: "bpp-university",
    name: "BPP University",
    cities: ["London"],
    website: "https://www.bpp.com",
    logoOverride: "/images/universities/uk/BPP-University.webp",
    overview:
      "BPP University offers postgraduate programmes for students already in the UK (UK-to-UK / onshore applicants), including MSc programmes in management, AI, accounting and healthcare leadership.",
    highlights: [
      "For UK-to-UK (onshore) students only",
      "CAS issued within a day; financial and medical documents and the credibility interview are not required as standard",
      "No third Master's degree is accepted",
    ],
    fee: () => [tot("12-month programme", 10000, { note: "18-month with PDP £12,500 · Alumni £9,000 / £11,500" })],
    scholarships: [],
    deposits: [{ label: "Initial deposit", amount: 3000, note: "Balance paid in instalments" }],
    english: {},
    entryRequirements: [
      { level: pg, criteria: ["Level 6 to Level 7: simple progression, no extra documents", "Level 7 to Level 7: progression form required", "A third Master's is not accepted"] },
    ],
    requiredDocuments: [
      { name: "Passport" },
      { name: "Degree certificate" },
      { name: "Consolidated mark sheet / original degree (CMM / OD)" },
      { name: "Statement of purpose" },
      { name: "CV" },
      { name: "MOI" },
      { name: "UK visa copy, BRP card, eVisa and share code" },
      { name: "UK degree certificate and transcript" },
      { name: "Previous UK Master's CAS letter" },
      { name: "PSW eVisa" },
      { name: "Experience letter", optional: true },
      { name: "Gap explanation", optional: true },
      { name: "Immigration history (visa copies, stamps, entry and exit)", optional: true },
    ],
    intakeNote: "Onshore (UK-to-UK) students. The intake month isn't printed on the partner flyer — confirm with your counsellor.",
    stages: "bpp",
  },
  {
    match: "Canterbury Christ Church University (CCCU)",
    slug: "canterbury-christ-church-university",
    name: "Canterbury Christ Church University (CCCU)",
    cities: ["Canterbury"],
    website: "https://www.canterbury.ac.uk",
    overview:
      "Canterbury Christ Church University offers postgraduate programmes for the January 2027 intake, including an international MBA and MSc courses in business, global security and public health.",
    highlights: ["Net fee after scholarship: £15,500 (£14,500 with the early bird discount)"],
    fee: () => [tot("Tuition fee", 17000)],
    scholarships: [
      { name: "Postgraduate scholarship", value: "£1,500" },
      { name: "Early bird discount", value: "£1,000", eligibility: "On paying a £10,000 tuition deposit" },
    ],
    deposits: [{ label: "CAS deposit", amount: 5000 }],
    english: { ielts: 6, pte: 59 },
    entryRequirements: [{ level: pg, gapAccepted: true, criteria: ["60% / 2.50 GPA in Bachelor's degree"] }],
    languageTests: [{ level: pg, tests: [ielts("6.0", "5.5"), pte(59, 59)] }],
  },
  {
    match: "Edinburgh Napier University International College (ENUIC)",
    slug: "edinburgh-napier-university-international-college",
    name: "Edinburgh Napier University International College (ENUIC)",
    cities: ["Edinburgh"],
    overview:
      "Edinburgh Napier University International College is a pathway route into Edinburgh Napier University for the January 2027 intake: International Foundation Year, Stage 1 or Stage 2 into undergraduate degrees, and a Pre-Master's into postgraduate programmes.",
    highlights: [
      "University years after the pathway: £17,520–£21,430 per year (UG and PG)",
      "Standard application process shared with the other international colleges (see the How to Apply tab)",
    ],
    fee: pathwayFees({
      ug: (c) =>
        c.route === "s1"
          ? yr("Pathway – Stage 1", 15785, { from: true, note: "£15,785–£17,955 depending on course" })
          : c.route === "s2"
            ? yr("Pathway – Stage 2", 16475, { from: true, note: "£16,475–£16,875 depending on course" })
            : undefined,
      pre: tot("Pre-Master's – Term 1 entry", 9445, { from: true, note: "£9,445–£10,075 depending on course; Term 2 entry £12,385–£12,670" }),
    }),
    scholarships: [
      { name: "Undergraduate pathway scholarship", value: "£4,500", eligibility: "Stage 1 and Stage 2" },
      { name: "Pre-Master's scholarship", value: "Up to £6,000", eligibility: "£5,500 (Term 1 entry); £6,000 (Term 2 entry)" },
    ],
    deposits: [{ label: "CAS deposit", amount: 4000, note: "Full fees payable after the visa is granted" }],
    english: { ielts: 5.5 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 3 years", criteria: ["Stage 1: Grade 12, 50% or 2.0 GPA overall", "Stage 2: Grade 12, 55% or 2.2 GPA overall"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["Term 1 and Term 2: pass in Bachelor's degree (minimum 3 years)"] },
    ],
    languageTests: [
      { level: ug, tests: [test("IELTS", "5.5 overall (5.5 in each component)")] },
      {
        level: pg,
        tests: [test("IELTS (Term 1)", "6.0 overall (no band below 5.5)"), test("IELTS (Term 2)", "5.5 overall (no band below 5.5)")],
      },
    ],
    stages: "shared",
  },
  {
    match: "London South Bank University (LSBU)",
    slug: "london-south-bank-university",
    name: "London South Bank University (LSBU)",
    cities: ["London"],
    website: "https://www.lsbu.ac.uk",
    overview:
      "London South Bank University offers the LSBU OnCampus pathway for the January 2027 intake: International Year One or the Undergraduate Foundation Programme into degrees in business, engineering, computing, health and design.",
    highlights: [
      "Placement year available — students can earn up to £20,000",
      "After International Year One: Year 2 £12,500 (after £5,000 scholarship); Year 3 £17,500",
    ],
    fee: (c) => (c.route === "y1" ? [yr("International Year One", 12400, { note: "After £5,500 scholarship + £450 registration" })] : []),
    scholarships: [
      { name: "International Year One scholarship", value: "£5,500" },
      { name: "Year 2 scholarship", value: "£5,000" },
    ],
    deposits: [{ label: "Deposit before CAS (60% of fee)", amount: 7440 }],
    english: { ielts: 5.5, pte: 59, duolingo: 105 },
    entryRequirements: [
      {
        level: ug,
        gapAccepted: true,
        gapYearsAllowed: "Up to 3 years (2023 pass-outs onwards)",
        criteria: ["International Year One: 2.3 GPA", "4-year degree (Foundation route): 2.0 GPA", "Maths is not required in Class 11/12 for Computer Science"],
      },
    ],
    languageTests: [
      {
        level: ug,
        tests: [ielts("5.5", "5.5"), pte(59, 59), test("Duolingo", "105 (no section below 105)")],
        waiver: ["CBSE: 65 in English", "Other Indian boards: 70 in English"],
      },
    ],
  },
  {
    match: "University of Bradford International College",
    slug: "university-of-bradford-international-college",
    name: "University of Bradford International College",
    cities: ["Bradford"],
    overview:
      "University of Bradford International College is a pathway route into the University of Bradford for the January 2027 intake: International Foundation, Year Zero, Year One or Year Two into undergraduate degrees, and a Pre-Master's into postgraduate programmes.",
    highlights: [
      "University years after the pathway: UG £16,100–£16,890 per year; PG £15,700–£19,500",
      "Standard application process shared with the other international colleges (see the How to Apply tab)",
    ],
    fee: pathwayFees({
      ug: () => yr("Pathway year", 15955, { from: true, note: "£15,955–£16,475 depending on course" }),
      pre: tot("Pre-Master's – Term 1 entry", 9025, { from: true, note: "Term 2 entry £12,280" }),
    }),
    scholarships: [
      { name: "Undergraduate pathway scholarship", value: "£5,000", eligibility: "Progression scholarship to be confirmed" },
      { name: "Pre-Master's scholarship", value: "Up to £6,000", eligibility: "£5,500 (Term 1 entry); £6,000 (Term 2 entry)" },
    ],
    english: { ielts: 5.5, pte: 59, duolingo: 100 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 3 years", criteria: ["Year Zero: Grade 12, 50% or 2.0 GPA", "Year One: Grade 12, 55% or 2.2 GPA"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["Term 1 and Term 2: pass in Bachelor's degree (minimum 3 years)"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("5.5", "5.5"), pte(59, 59), duolingo(100, 100)] },
      {
        level: pg,
        tests: [test("IELTS (Term 1)", "6.0 overall (5.5 in each component)"), test("PTE (Term 1)", "62 overall (59 in each component)"), test("IELTS (Term 2)", "5.5 overall (5.5 in each component)"), test("PTE (Term 2)", "59 overall (59 in each component)")],
      },
    ],
    stages: "shared",
  },
  {
    match: "University of Dundee – International College of Dundee (ICD)",
    slug: "university-of-dundee-international-college",
    name: "University of Dundee – International College of Dundee (ICD)",
    cities: ["Dundee", "Kirkcaldy"],
    overview:
      "The International College of Dundee is a pathway route into the University of Dundee for the January 2027 intake: International Stage One or Stage Two into undergraduate degrees, and a Pre-Master's into postgraduate programmes. Nursing is also taught at Kirkcaldy.",
    highlights: [
      "University years after the pathway: UG £23,150–£25,750 per year; PG £23,000",
      "Standard application process shared with the other international colleges (see the How to Apply tab)",
    ],
    fee: pathwayFees({
      ug: (c) =>
        c.route === "s2"
          ? yr("Pathway – Stage Two", 20195)
          : yr("Pathway – Stage One", 18995, { from: true, note: "£18,995–£19,895 depending on course" }),
      pre: tot("Pre-Master's – Term 1 entry", 11195, { from: true, note: "Term 2 entry £15,195" }),
    }),
    scholarships: [
      { name: "Undergraduate pathway scholarship", value: "£6,000" },
      { name: "Pre-Master's scholarship", value: "Up to £6,000", eligibility: "£5,500 (Term 1 entry); £6,000 (Term 2 entry)" },
      { name: "Progression scholarship", value: "£6,500 first year", eligibility: "Plus £4,000 for each remaining year. UG and PG progressing to Dundee" },
    ],
    deposits: [{ label: "CAS deposit", amount: 4000, note: "Full fees payable after the visa is granted" }],
    english: { ielts: 5.5, pte: 59 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["Stage One: Grade 12, 50%, with 2.0 GPA in each subject", "Stage Two: Grade 12, 50% / 2.0 GPA overall"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 7 years (evidence and SOP required)", criteria: ["Term 1: Bachelor's degree (4 years or more), 45%", "Term 2: Bachelor's degree (3 years), 60%"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("5.5", "5.5"), pte(59, 59)], waiver: ["IELTS waiver if Grade 12 English is B or above"] },
      {
        level: pg,
        tests: [test("IELTS (Term 1)", "6.0 overall (5.5 in each component)"), test("PTE (Term 1)", "59 overall (59 in each component)"), test("IELTS (Term 2)", "5.5 overall (5.5 in each component)"), test("PTE (Term 2)", "59 overall (59 in each component)")],
        waiver: ["IELTS waiver if Grade 12 English is B or above"],
      },
    ],
    stages: "shared",
  },
  {
    match: "University of Greenwich International College",
    slug: "university-of-greenwich-international-college",
    name: "University of Greenwich International College",
    cities: ["London"],
    overview:
      "University of Greenwich International College is a pathway route into the University of Greenwich for the January 2027 intake: International Year Zero or Year One into undergraduate degrees, and a Pre-Master's into postgraduate programmes.",
    highlights: ["University years after the pathway: UG £17,975 per year; PG £19,450"],
    fee: pathwayFees({
      ug: (c) => (c.route === "y1" ? yr("Pathway – Year One", 17715) : yr("Pathway – Year Zero", 16995)),
      pre: tot("Pre-Master's – Term 1 entry", 10390, { from: true, note: "Term 2 entry £12,995" }),
    }),
    scholarships: [
      { name: "Undergraduate pathway scholarship", value: "£4,500", eligibility: "Plus a £3,500 progression scholarship" },
      { name: "Pre-Master's scholarship", value: "Up to £6,000", eligibility: "£5,500 (Term 1 entry); £6,000 (Term 2 entry). Plus a £3,500 progression scholarship" },
    ],
    deposits: [{ label: "CAS deposit", amount: 4000 }],
    english: { ielts: 5.5, pte: 51, duolingo: 95 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["Year Zero: 1.8 GPA in Year 11 and 12, 35% in Grade 12", "Year One: 2.2 GPA in Year 11 and 12"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["Term 1: Bachelor's degree, 50%+", "Term 2: Bachelor's degree, 35%+"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("5.5", "5.5"), pte(51, 51), duolingo(95, 95)] },
      { level: pg, tests: [ielts("5.5", "5.5"), pte(51, 51), duolingo(95, 95)] },
    ],
  },
  {
    match: "University of Huddersfield",
    slug: "university-of-huddersfield",
    name: "University of Huddersfield",
    cities: ["London"],
    website: "https://www.hud.ac.uk",
    overview:
      "The University of Huddersfield offers postgraduate programmes at its London campus for the January 2027 intake, including MSc courses in management, international business, computing, accounting and finance, and fintech.",
    highlights: ["No interview", "Net fee after scholarship: £17,200"],
    fee: () => [tot("Tuition fee", 18700)],
    scholarships: [{ name: "Postgraduate scholarship", value: "£1,500" }],
    deposits: [{ label: "CAS deposit", amount: 4260 }],
    english: { ielts: 6, pte: 59 },
    entryRequirements: [{ level: pg, criteria: ["55%+ in a 3- or 4-year Bachelor's degree"] }],
    languageTests: [
      {
        level: pg,
        tests: [test("IELTS", "6.0 overall (5.5 minimum)"), test("ELLT", "6 overall (5 minimum)"), test("PTE", "59 in all components")],
        waiver: ["Grade B in Grade 12 English (2022 pass-outs) with 2.8 GPA / 60% / B overall"],
      },
    ],
  },
  {
    match: "University of Kent International College",
    slug: "university-of-kent-international-college",
    name: "University of Kent International College",
    cities: ["Canterbury"],
    overview:
      "University of Kent International College is a pathway route into the University of Kent for the January 2027 intake: International Foundation, Year Zero or Year One into undergraduate degrees, and a Pre-Master's into postgraduate programmes.",
    highlights: [
      "University years after the pathway: £20,700–£24,700 per year",
      "Standard application process shared with the other international colleges (see the How to Apply tab)",
    ],
    fee: pathwayFees({
      ug: () => yr("Pathway year", 18595),
      pre: tot("Pre-Master's – Term 1 entry", 10395, { from: true, note: "Term 2 entry £12,995" }),
    }),
    scholarships: [
      { name: "Undergraduate pathway scholarship", value: "£6,000" },
      { name: "Pre-Master's scholarship", value: "Up to £6,000", eligibility: "£5,500 (Term 1 entry); £6,000 (Term 2 entry)" },
    ],
    deposits: [{ label: "CAS deposit", amount: 5500, note: "Full fees payable after the visa is granted" }],
    english: { ielts: 5.5, pte: 59, duolingo: 100 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 3 years", criteria: ["Year Zero: 1.8 GPA in Grade 12 (Nepal Education Board)", "Year One: Grade 12 pass with 60% in best 4 subjects"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 5 years", criteria: ["Term 1: Bachelor's degree pass (minimum 4 years)", "Term 2: Bachelor's degree pass (minimum 3 years)"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("5.5", "5.5"), pte(59, 59), test("Duolingo", "100 overall (95 in each component)")] },
      {
        level: pg,
        tests: [
          test("IELTS (Term 1)", "6.0 overall (5.5 in each component)"),
          test("PTE (Term 1)", "63 overall (59 in each component)"),
          test("Duolingo (Term 1)", "110 overall (110 in each component)"),
          test("IELTS (Term 2)", "5.5 overall (5.5 in each component)"),
          test("PTE (Term 2)", "59 overall (59 in each component)"),
        ],
      },
    ],
    stages: "shared",
  },
  {
    match: "University of the West of England (UWE Bristol)",
    slug: "university-of-the-west-of-england",
    name: "University of the West of England (UWE Bristol)",
    cities: ["Bristol"],
    website: "https://www.uwe.ac.uk",
    overview:
      "UWE Bristol offers a direct-entry undergraduate business degree and postgraduate programmes in business, law, engineering, computing and data science for the January 2027 intake.",
    highlights: ["Internal English test available", "Net fee after scholarship: UG £14,500; PG £14,500–£15,500"],
    fee: (c) => (isUgRoute(c.route) ? [yr("Tuition fee", 17000)] : [tot("Tuition fee", c.headingFee ?? 17000)]),
    scholarships: [{ name: "UWE scholarship", value: "£2,500", eligibility: "Apply by email" }],
    deposits: [{ label: "CAS deposit", amount: 8500 }],
    english: { ielts: 6, pte: 59, duolingo: 105 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "3 years", criteria: ["2.6 GPA or 60% in Grade 12"] },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 10 years", criteria: ["55% in a 3- or 4-year Bachelor's degree"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("6.0", "5.5"), pte(59, 59), test("Duolingo", "105 overall (100 in each component)")], waiver: ["CBSE / ICSE: 70% in English"] },
      {
        level: pg,
        tests: [ielts("6.5", "5.5"), pte(62, 59), test("Duolingo", "120 overall (105 in each component)")],
        waiver: ["MOI accepted from Tribhuvan University (within a 5-year gap, 2022 onwards)"],
      },
    ],
    stages: "uwe",
  },
  {
    match: "Aston University – OnCampus (UG pathway)",
    slug: "aston-university-oncampus",
    name: "Aston University – OnCampus (UG pathway)",
    cities: ["Birmingham"],
    overview:
      "Aston OnCampus is a pathway route into Aston University for the January 2027 intake: International Year One (with integrated CAS) into undergraduate degrees in business, computing, law and engineering. Direct-entry Aston University postgraduate courses are a separate profile.",
    highlights: [
      "After International Year One: Year 2 £18,000–£19,000 (after £4,500 scholarship); Year 3 £22,500–£23,500 (Computer / Business)",
      "Optional placement year after Year 2 — students can earn up to £20,000",
      "No pre-CAS interview",
      "Triple Crown university; 5 years of career support after graduation",
      "Fees for the engineering and law courses are not stated in the sheet — ask a counsellor",
    ],
    fee: (c) => {
      if (/Engineering/i.test(c.name)) return [];
      if (/Computer|Cyber/i.test(c.name)) return [yr("International Year One", 17000, { note: "After £6,500 scholarship + £450 registration (total £17,450)" })];
      if (/Accounting|Business|Marketing/i.test(c.name)) return [yr("International Year One", 13460, { note: "After £6,500 scholarship + £450 registration (total £13,910)" })];
      return [];
    },
    scholarships: [
      { name: "International Year One scholarship", value: "£6,500" },
      { name: "Year 2 scholarship", value: "£4,500" },
    ],
    english: { ielts: 5.5, pte: 59, duolingo: 100 },
    entryRequirements: [
      {
        level: ug,
        gapAccepted: true,
        gapYearsAllowed: "Up to 3 years (2023 pass-outs onwards)",
        criteria: [
          "International Year One: 2.4 GPA (2.2–2.3 may be considered with case approval and full fees)",
          "4-year degree: 2.0 GPA",
          "Accounting & Finance, Computer Science and Cybersecurity: maths C/4 in Year 12 or 60% in Year 11",
        ],
      },
    ],
    languageTests: [
      {
        level: ug,
        tests: [test("IELTS", "5.5"), test("PTE", "59"), test("Duolingo", "100")],
        waiver: ["Nepal: overall B in Class 12", "Indian boards: 70 in English"],
      },
    ],
  },
  {
    match: "University of Hull – OnCampus (UG pathway)",
    slug: "university-of-hull-oncampus",
    name: "University of Hull – OnCampus (UG pathway)",
    cities: ["Hull"],
    overview:
      "Hull OnCampus is a pathway route into the University of Hull for the January 2027 intake: International Year One (with integrated CAS) into undergraduate degrees in business, economics, accounting and engineering. Direct-entry University of Hull postgraduate courses are a separate profile.",
    highlights: [
      "After International Year One: Year 2 and Year 3 £16,945 (Arts) / £19,520 (Science); £2,000 Year 2 scholarship applies",
      "Placement year available for selected courses (for example BSc Biomedical Science)",
    ],
    fee: () => [yr("International Year One", 11450, { note: "After £5,980 scholarship + £450 registration" })],
    scholarships: [
      { name: "Year 1 scholarship", value: "£5,980", eligibility: "Extra £1,000 if the full first-year fee is paid" },
      { name: "Year 2 scholarship", value: "£2,000" },
    ],
    deposits: [{ label: "Deposit before CAS (60% of fee)", amount: 6870, note: "Remaining fee paid after enrolment, before the 2nd semester" }],
    english: { ielts: 5.5, pte: 59 },
    entryRequirements: [
      { level: ug, gapAccepted: true, gapYearsAllowed: "Up to 3 years (2023 pass-outs onwards)", criteria: ["International Year One: 2.8 GPA", "4-year degree: 2.0 GPA"] },
    ],
    languageTests: [
      {
        level: ug,
        tests: [ielts("5.5", "5.5"), pte(59, 59)],
        waiver: ["A Level General English: grade C", "Indian boards: 70 in English"],
      },
    ],
  },
  {
    match: "University of Portsmouth – International College Portsmouth (ICP)",
    slug: "university-of-portsmouth-international-college-portsmouth",
    name: "University of Portsmouth – International College Portsmouth (ICP)",
    cities: ["Portsmouth"],
    overview:
      "International College Portsmouth is a pathway route into the University of Portsmouth for the January 2027 intake: Foundation or International Year One into undergraduate degrees, and a Pre-Master's into postgraduate programmes. Direct-entry University of Portsmouth courses are a separate profile.",
    highlights: [
      "Portsmouth is about 1 hr 30 min by train from London",
      "Pre-Master's fees are available on request; Pre-Master's can be paid in 6 instalments each year",
      "Free PVT English test available; a free Duolingo code for deserving students",
    ],
    fee: (c) =>
      c.route === "foundation"
        ? [yr("Foundation year", 9400, { from: true, note: "£9,400–£17,700 depending on course" })]
        : c.route === "y1"
          ? [yr("International Year One", 16500, { from: true, note: "£16,500–£18,200 depending on course" })]
          : [],
    scholarships: [
      { name: "Foundation scholarship", value: "£3,000" },
      { name: "Pre-Master's progression scholarship", value: "£2,500", eligibility: "One-time, after progressing to the University" },
    ],
    english: { ielts: 5.5, pte: 59, duolingo: 100 },
    entryRequirements: [
      {
        level: ug,
        gapAccepted: true,
        gapYearsAllowed: "Up to 5–10 years (case by case)",
        criteria: [
          "Foundation: 2.0 GPA",
          "International Year One (Business, Accounting & Law): 2.4 GPA, or CTEVT Diploma 50% (CTEVT 65%)",
          "International Year One (Science, Engineering & Computing): 2.6 GPA, or CTEVT Diploma 65%",
        ],
      },
      { level: pg, gapAccepted: true, gapYearsAllowed: "Up to 5–10 years (case by case)", criteria: ["3-year Bachelor's degree: 50%", "4-year Bachelor's degree: pass"] },
    ],
    languageTests: [
      { level: ug, tests: [ielts("5.5", "5.5"), pte(59, 59), test("Duolingo", "100 overall (95 in each component)")] },
      { level: pg, tests: [ielts("6.0", "5.5"), pte(62, 59), test("Duolingo", "100 overall (95 in each component)")] },
    ],
  },
];

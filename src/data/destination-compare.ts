// Student-visa costs and rules compared across destinations. Every figure is taken from an official
// source already cited in our guides (GOV.UK, US State Department / ICE, IRCC, Study Australia, DAAD),
// checked in October 2026. Update the rows and CHECKED together, and re-check the sources first.
export const DESTINATION_COMPARE_CHECKED = "October 2026";

export const DESTINATION_COMPARE_HEADERS = ["Destination", "Student visa fee", "Funds you must show", "After study"];

export const DESTINATION_COMPARE_ROWS: string[][] = [
  [
    "UK",
    "£558, plus £776 a year health surcharge",
    "£1,171 a month outside London (£1,529 in London) for up to 9 months, held 28 days. £1,203 and £1,570 for applications from November 30, 2026",
    "Graduate visa: 18 months for applications from January 1, 2027 (2 years before that date)",
  ],
  [
    "USA",
    "US$185 visa fee, plus US$350 SEVIS fee",
    "Proof of how you will pay for your studies",
    "OPT, and STEM OPT adds 24 months for eligible STEM graduates",
  ],
  [
    "Canada",
    "CAN$150 study permit, plus CAN$85 biometrics",
    "CAN$23,448 for living costs for applications from September 1, 2026, plus first-year tuition and travel",
    "Post-Graduation Work Permit if your program and school are eligible",
  ],
  [
    "Australia",
    "AUD 2,500 application charge from July 1, 2026",
    "At least AUD 29,710, plus compulsory health cover (OSHC)",
    "Check Home Affairs for current post-study options",
  ],
  [
    "Germany",
    "See our Germany guide",
    "€11,904 a year in a blocked account",
    "See our Germany guide",
  ],
];

export const DESTINATION_COMPARE_SOURCES = [
  { label: "GOV.UK: Student visa", href: "https://www.gov.uk/student-visa" },
  { label: "US Department of State: Student visa", href: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" },
  { label: "ICE: I-901 SEVIS fee", href: "https://www.ice.gov/sevis/i901" },
  { label: "IRCC: Proof of financial support", href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html" },
  { label: "IRCC: Fee list", href: "https://ircc.canada.ca/english/information/fees/fees.asp" },
  { label: "Study Australia: Student visa (subclass 500)", href: "https://www.studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/student-visa-subclass-500" },
];

import type { UniversityProfile } from "../types";

// SAMPLE PROFILE — fees, scholarship, intake, cities, documents and stages
// are taken from the partner-portal reference screenshots (Oct 2026).
// Fields marked TODO still need confirming by the Admizz team.
export const yorkStJohnUniversity: UniversityProfile = {
  slug: "york-st-john-university",
  name: "York St John University",
  country: "uk",
  logo: "/images/universities/uk/York-St-John-University.webp",
  established: 1841,
  cities: ["York", "London"],
  // TODO: replace with a fuller overview confirmed by the team.
  overview:
    "York St John University was founded in 1841 and teaches from its main campus in the historic city of York and a campus in London. It offers postgraduate programmes with an optional placement year.",
  courses: [
    {
      slug: "postgraduate-1-year",
      name: "Postgraduate programmes (1 year)",
      level: "postgraduate",
      subject: "General",
      durationMonths: 12,
      fees: [{ label: "1-year fee", amount: 11800, per: "total" }],
      intakes: ["January"],
    },
    {
      slug: "postgraduate-with-placement",
      name: "Postgraduate programmes with placement year (2 years)",
      level: "postgraduate",
      subject: "General",
      durationMonths: 24,
      fees: [{ label: "2-year fee (with placement year)", amount: 15400, per: "total" }],
      intakes: ["January"],
      withPlacement: true,
    },
  ],
  // TODO: confirm early-payment discount conditions and the IELTS / PTE requirement.
  scholarships: [{ name: "Early payment discount", value: "5% off tuition" }],
  english: {},
  requiredDocuments: [
    { name: "All academic documents" },
    { name: "CV" },
    { name: "Letters of recommendation (LOR)" },
    { name: "Passport" },
    { name: "Statement of purpose" },
    { name: "English language certificate", optional: true },
    { name: "Medium of instruction (MOI) letter", optional: true },
  ],
  // Stages 1–3 are from the reference; 4–7 are the standard UK flow — TODO: confirm.
  applicationStages: [
    { title: "Application initiated" },
    { title: "Application submitted", document: "Acknowledgement / reference number" },
    { title: "Conditional offer received", document: "Conditional offer letter" },
    { title: "Unconditional offer received", document: "Unconditional offer letter" },
    { title: "Deposit paid", document: "Payment receipt" },
    { title: "CAS issued", document: "CAS letter" },
    { title: "Visa applied", document: "Visa application confirmation" },
  ],
  intakes: [{ month: "January", year: 2027 }],
  lastVerified: "2026-10-06",
};

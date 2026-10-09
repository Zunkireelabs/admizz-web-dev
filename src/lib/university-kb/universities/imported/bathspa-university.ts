import type { UniversityProfile } from "../../types";

// Generated from Route2Uni export (id 100044). Edit via scripts/import-route2uni.mjs.
export const bathspaUniversity: UniversityProfile = {
  slug: "bathspa-university",
  name: "Bathspa University",
  country: "uk",
  logo: "/images/universities/imported/bathspa-university.png",
  cities: [
    "London",
    "Bath"
  ],
  website: "https://www.bathspa.ac.uk/",
  overview: "Bathspa University is a partner university in United Kingdom. Talk to an Admizz counsellor for full course and admission details.",
  courses: [
    {
      slug: "mba-100001",
      name: "MBA",
      level: "postgraduate",
      subject: "Business & Management",
      durationMonths: 12,
      fees: [
        {
          label: "Band 3 Gross Fee (Bath School of Art, Film and Media, and Bath School of Design)",
          amount: 18560,
          per: "total"
        }
      ],
      intakes: [
        "January"
      ]
    }
  ],
  scholarships: [
    {
      name: "Undergraduate scholarship",
      value: "£2,000"
    },
    {
      name: "Postgraduate scholarship",
      value: "£2,000"
    }
  ],
  english: {
    ielts: 6
  },
  entryRequirements: [
    {
      level: "Undergraduate",
      gapAccepted: false,
      criteria: [
        "12th Grade: 60% or above / GPA 2.8 or above , plus a recognized foundation year."
      ]
    },
    {
      level: "Postgraduate",
      gapAccepted: false,
      criteria: [
        "4-year bachelor degree with a final GPA or 3.0 or above."
      ]
    }
  ],
  languageTests: [
    {
      level: "Postgraduate",
      tests: [
        {
          test: "IELTS",
          score: "6.5-7.0 in each component (depending upon course)"
        },
        {
          test: "PTE",
          score: "59-67 in each component (depending upon course)"
        },
        {
          test: "TOEFL",
          score: "75"
        }
      ]
    },
    {
      level: "Undergraduate",
      tests: [
        {
          test: "IELTS",
          score: "6.0 overall / 5.5 in each band"
        },
        {
          test: "PTE",
          score: "59 overall / 59 in each band"
        },
        {
          test: "TOEFL",
          score: "72"
        }
      ]
    }
  ],
  requiredDocuments: [
    {
      name: "All Academics"
    },
    {
      name: "CV"
    },
    {
      name: "Passport"
    },
    {
      name: "Statement of Purpose"
    },
    {
      name: "English Language Certificate",
      optional: true
    },
    {
      name: "LOR",
      optional: true
    }
  ],
  feeSummary: [
    {
      level: "Postgraduate",
      min: 16625,
      max: 18560
    },
    {
      level: "Undergraduate",
      min: 16460,
      max: 18380
    }
  ],
  applicationStages: [
    {
      title: "Application initiated"
    },
    {
      title: "Application submitted",
      document: "Acknowledgement / reference number"
    },
    {
      title: "Conditional offer received",
      document: "Conditional offer letter"
    },
    {
      title: "Unconditional offer received",
      document: "Unconditional offer letter"
    },
    {
      title: "Deposit paid",
      document: "Payment receipt"
    },
    {
      title: "CAS issued",
      document: "CAS letter"
    },
    {
      title: "Visa applied",
      document: "Visa application confirmation"
    }
  ],
  intakes: [
    {
      month: "January",
      year: 2027
    }
  ],
  lastVerified: "2026-10-07"
};

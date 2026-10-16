import type { UniversityProfile } from "../../types";

// Generated from Route2Uni export (id 100022). Edit via scripts/import-route2uni.mjs.
export const coventryUniversity: UniversityProfile = {
  slug: "coventry-university",
  name: "Coventry University",
  country: "uk",
  logo: "/images/universities/imported/coventry-university.png",
  cities: [
    "London",
    "Coventry",
    "Dagenham"
  ],
  overview: "Coventry University is a partner university in United Kingdom. Talk to an Admizz counsellor for full course and admission details.",
  courses: [],
  scholarships: [
    {
      name: "Undergraduate scholarship",
      value: "Up to £4,000",
      eligibility: "Vice Chancellor Undergraduate Scholarship of £4000 in 3 year Year 1 - £2000 Year 2 - £1000 Year 3 - £1000"
    },
    {
      name: "Postgraduate scholarship",
      value: "£2,500",
      eligibility: "Vice-Chancellor Postgraduate Scholarship – Sep/Nov £2500"
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
        "12th Standard with 65% overall and 65% in Maths and Physics."
      ]
    },
    {
      level: "Postgraduate",
      gapAccepted: false,
      criteria: [
        "3 years BA with an overall score of 60% 4 years BE/Btech with 55% overall or higher."
      ]
    }
  ],
  languageTests: [
    {
      level: "Postgraduate",
      tests: [
        {
          test: "IELTS",
          score: "6.5/5.5"
        },
        {
          test: "TOEFL",
          score: "iBT: 88 and a minimum component score of 19."
        }
      ]
    },
    {
      level: "Undergraduate",
      tests: [
        {
          test: "IELTS",
          score: "6.0/5.5"
        },
        {
          test: "TOEFL",
          score: "TOEFL iBT: 79 and a minimum component score of 18."
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
      name: "LOR"
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
      name: "MOI",
      optional: true
    }
  ],
  feeSummary: [
    {
      level: "Postgraduate",
      min: 18600,
      max: 20350
    },
    {
      level: "Undergraduate",
      min: 16800,
      max: 19850
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
  intakes: [],
  lastVerified: "2026-10-07"
};

import type { UniversityProfile } from "../../types";

// Generated from Route2Uni export (id 100046). Edit via scripts/import-route2uni.mjs.
export const healthScienceUniversity: UniversityProfile = {
  slug: "health-science-university",
  name: "Health Science University",
  country: "uk",
  logo: "/images/universities/imported/health-science-university.png",
  cities: [
    "London"
  ],
  website: "https://www.hsu.ac.uk/",
  overview: "Health Science University is a partner university in United Kingdom. Talk to an Admizz counsellor for full course and admission details.",
  courses: [
    {
      slug: "msc-global-healthcare-management-101617",
      name: "MSc Global Healthcare Management",
      level: "postgraduate",
      subject: "Business & Management",
      durationMonths: 12,
      fees: [
        {
          label: "Gross Fee",
          amount: 15000,
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
      name: "Postgraduate scholarship",
      value: "£2,000"
    }
  ],
  english: {
    ielts: 6,
    note: "MOI accepted for some programmes"
  },
  entryRequirements: [
    {
      level: "Postgraduate",
      gapAccepted: true,
      gapYearsAllowed: "Upto 9 Years of GAP Accepted (Need to provide evidence & SOP)",
      criteria: [
        "3 years Bachelor degree: 60 % or above",
        "4 years Bachelor degree: 55% or above"
      ]
    }
  ],
  languageTests: [
    {
      level: "Postgraduate",
      tests: [
        {
          test: "IELTS",
          score: "6.0 overall (5.5 in each component)"
        },
        {
          test: "PTE",
          score: "59 overall (59 in each component)"
        }
      ],
      waiver: [
        "Waiver with MOI from Nepal & India"
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
    }
  ],
  feeSummary: [
    {
      level: "Postgraduate",
      min: 15000,
      max: 15000
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

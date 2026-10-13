import type { UniversityProfile } from "../../types";

// Generated from the Admizz UK partner sheet (Jan 2027 intake). Edit via scripts/import-excel-uk.mjs.
export const canterburyChristChurchUniversity: UniversityProfile = {
  slug: "canterbury-christ-church-university",
  name: "Canterbury Christ Church University (CCCU)",
  country: "uk",
  logo: "/images/universities/imported/canterbury-christ-church-university.png",
  cities: [
    "Canterbury"
  ],
  website: "https://www.canterbury.ac.uk",
  overview: "Canterbury Christ Church University offers postgraduate programmes for the January 2027 intake, including an international MBA and MSc courses in business, global security and public health.",
  highlights: [
    "Net fee after scholarship: £15,500 (£14,500 with the early bird discount)"
  ],
  courses: [
    {
      slug: "mba-international",
      name: "MBA International",
      level: "postgraduate",
      subject: "Business & Management",
      durationMonths: 12,
      fees: [
        {
          label: "Tuition fee",
          amount: 17000,
          per: "total"
        }
      ],
      intakes: [
        "January"
      ]
    },
    {
      slug: "msc-international-business-management",
      name: "MSc International Business Management",
      level: "postgraduate",
      subject: "Business & Management",
      durationMonths: 12,
      fees: [
        {
          label: "Tuition fee",
          amount: 17000,
          per: "total"
        }
      ],
      intakes: [
        "January"
      ]
    },
    {
      slug: "msc-global-security",
      name: "MSc Global Security",
      level: "postgraduate",
      subject: "Arts & Humanities",
      durationMonths: 12,
      fees: [
        {
          label: "Tuition fee",
          amount: 17000,
          per: "total"
        }
      ],
      intakes: [
        "January"
      ]
    },
    {
      slug: "msc-global-public-health",
      name: "MSc Global Public Health",
      level: "postgraduate",
      subject: "Health & Medicine",
      durationMonths: 12,
      fees: [
        {
          label: "Tuition fee",
          amount: 17000,
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
      value: "£1,500"
    },
    {
      name: "Early bird discount",
      value: "£1,000",
      eligibility: "On paying a £10,000 tuition deposit"
    }
  ],
  english: {
    ielts: 6,
    pte: 59
  },
  entryRequirements: [
    {
      level: "Postgraduate",
      gapAccepted: true,
      criteria: [
        "60% / 2.50 GPA in Bachelor's degree"
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
      ]
    }
  ],
  requiredDocuments: [
    {
      name: "All academic documents"
    },
    {
      name: "CV"
    },
    {
      name: "Letters of recommendation (LOR)"
    },
    {
      name: "Passport"
    },
    {
      name: "Statement of purpose"
    },
    {
      name: "English language certificate",
      optional: true
    },
    {
      name: "Medium of instruction (MOI) letter",
      optional: true
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
  deposits: [
    {
      label: "CAS deposit",
      amount: 5000
    }
  ],
  lastVerified: "2026-10-12"
};

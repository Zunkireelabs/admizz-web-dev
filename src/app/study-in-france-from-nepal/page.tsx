// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import { DESTINATION_COMPARE_HEADERS, DESTINATION_COMPARE_ROWS, DESTINATION_COMPARE_SOURCES } from "@/data/destination-compare";
import type { NepalVariantData } from "@/components/ui/NepalVariantTemplate";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in France from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in France from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-france-from-nepal",
  },
  openGraph: {
    title: "Study in France from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in France from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-france-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/france.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "France",
  countryCategorySlug: "france",
  heroHeading: "Build a Bright Future in One of the World's Top Study Destinations",
  heroSubheading: "Study in France from Nepal with world-class universities, affordable tuition, scholarships, cultural exposure, and excellent career opportunities abroad.",

  introTitle: "Your Pathway to a Premier Education in France",
  introContent: "France has emerged as a preferred destination for Nepalese students seeking quality education and European career prospects. The country features globally recognized universities, reasonably priced public institution tuition, and numerous programs taught in English across Business, Engineering, Arts, Science, and Hospitality disciplines. Admizz Education provides comprehensive support including university selection, scholarship guidance, visa assistance, and pre-departure preparation for students planning to study in France.",

  // Last edit of this page in the repo (git). Update when the content is next changed or reviewed.
  dateModified: "2026-10-08",
  guideTabLabel: "Compare",
  guideSections: [
    {
      id: "compare",
      title: "Compare France with Other Study Destinations",
      intro:
        "If you are still deciding, here is how the main alternatives compare on visa fees, the funds you must show and work after study, using official figures as checked in October 2026.",
      table: { headers: DESTINATION_COMPARE_HEADERS, rows: DESTINATION_COMPARE_ROWS },
      links: [
        { label: "UK", href: "/study-in-uk-from-nepal" },
        { label: "USA", href: "/study-in-usa-from-nepal" },
        { label: "Canada", href: "/study-in-canada-from-nepal" },
        { label: "Australia", href: "/study-in-australia" },
        { label: "Study abroad checklist", href: "/study-abroad-from-nepal" },
      ],
    },
  ],
  sourcesTitle: "Official sources",

  whyStudyTitle: "Why Study in France from Nepal?",
  benefits: [
    {
      title: "Top-Ranked Universities",
      description: "France is home to prestigious institutions and Grandes Écoles that offer globally respected degrees."
    },
    {
      title: "Affordable Tuition",
      description: "Public universities offer some of the lowest tuition fees in Europe, even for international students."
    },
    {
      title: "English-Taught Programs",
      description: "Thousands of bachelor's and master's courses are available in English — especially in business, engineering, and tech."
    },
    {
      title: "Multicultural Environment",
      description: "France offers a vibrant student life, with many services and discounts for international students."
    },
    {
      title: "Post-Study Work Rights",
      description: "Graduates with a master's-level degree may be able to apply for a 12-month temporary residence permit (APS) to look for work, subject to eligibility."
    },
    {
      title: "Scholarships for Nepalese Students",
      description: "The Eiffel Excellence Scholarship, Erasmus Mundus joint master's scholarships and other awards listed on Campus Bourses can reduce costs."
    }
  ],

  visaTitle: "France Student Visa Requirements for Nepalese Students",
  visaIntro: "Nepalese students pursuing studies longer than 3 months require a Long-Stay Student Visa (VLS-TS).",
  visaRequirements: [
    {
      category: "Valid Passport",
      details: "Valid for the whole period of your visa application and stay"
    },
    {
      category: "Campus France Registration",
      details: "Mandatory: apply through the Etudes en France platform and attend the Campus France Nepal interview"
    },
    {
      category: "University Acceptance Letter",
      details: "From recognized French institution"
    },
    {
      category: "Proof of Accommodation",
      details: "Booking confirmation or housing letter"
    },
    {
      category: "Financial Proof",
      details: "At least €877.50 per month for visa applications from 1 August 2026 (€615 before that date)"
    },
    {
      category: "Insurance",
      details: "Insurance proof as listed on france-visas.gouv.fr; you then join French social security free of charge after arrival"
    },
    {
      category: "Academic Documents",
      details: "Transcripts, certificates, CV, SOP"
    },
    {
      category: "Passport-Size Photos",
      details: "Recent, per visa guidelines"
    },
    {
      category: "Visa Fee Receipt",
      details: "Visa fee as shown on france-visas.gouv.fr for your application"
    },
    {
      category: "Visa Application Form",
      details: "Available at france-visas.gouv.fr"
    }
  ],
  visaNote: "Campus France Nepal directs students to complete the application on france-visas.gouv.fr and then book an appointment with VFS to submit it. Within 3 months of arriving in France you must validate your VLS-TS online.",

  intakesTitle: "France Intakes for Nepalese Students",
  intakes: [
    {
      intake: "Fall",
      months: "September (main start for most programs)"
    },
    {
      intake: "Spring",
      months: "Other start dates exist for some programs; check each institution"
    }
  ],
  intakesNote: "Apply early. Campus France lists 15 December as the closing date for the DAP (preliminary admission request) registration for the following September, and other routes have their own deadlines.",

  testTitle: "Language & IELTS Requirements",
  testRequirements: [
    {
      test: "IELTS",
      score: "Set by each institution; check your programme page"
    },
    {
      test: "Other Accepted Tests",
      score: "Accepted tests and scores vary by institution"
    }
  ],
  testNote: "French is not needed for English-taught programs, but French-taught programs ask for French certificates (DELF/DALF/TCF) at the level the institution sets. On the Etudes en France platform you enter your French certificate if you have one.",

  costTitle: "Cost of Studying in France from Nepal",
  costIntro: "France ranks among Europe's most economical study destinations. Public institution tuition is government-subsidised, which keeps costs well below many other destinations.",
  costTables: [
    {
      title: "Estimated Costs for Nepalese Students",
      rows: [
        {
          category: "Public university tuition, bachelor's (2026-27, non-EU rate)",
          cost: "About €2,900/year"
        },
        {
          category: "Public university tuition, master's (2026-27, non-EU rate)",
          cost: "About €3,950/year"
        },
        {
          category: "Public university tuition, doctorate",
          cost: "About €398/year"
        },
        {
          category: "Private institutions",
          cost: "€6,000 – €18,000+/year"
        },
        {
          category: "Average monthly student budget",
          cost: "About €800 outside Paris, about €1,000 in Paris"
        },
        {
          category: "Student housing (CROUS)",
          cost: "€150 – €600/month"
        },
        {
          category: "Student and Campus Life Contribution (CVEC), 2026-27",
          cost: "€105"
        },
        {
          category: "Health cover (French social security)",
          cost: "Affiliation is free for students"
        }
      ]
    }
  ],
  costNote: "Tuition figures are Campus France's 2026-27 rates for non-EU students in public institutions; Campus France sources show small differences (about €2,895-€2,902 and €3,941-€3,950), so confirm with your institution. French government scholarship holders can be exempt from the higher rate. Housing aid (CAF) may be available; check your eligibility.",

  scholarshipsTitle: "Scholarships for Nepalese Students",
  scholarshipsIntro: "France provides several scholarship opportunities:",
  scholarships: [
    {
      name: "Eiffel Excellence Scholarship",
      details: "French government programme for master's (applicants up to 25 from developing countries) and PhD (up to 30) students; your institution nominates you, you do not apply directly"
    },
    {
      name: "Erasmus Mundus Joint Masters",
      details: "EU scholarships for joint master's programmes taught in at least two participating countries"
    },
    {
      name: "Campus Bourses",
      details: "Campus France's search engine for scholarships from states, regions, foundations and institutions"
    },
    {
      name: "French government scholarship exemption",
      details: "Holders of a French government scholarship can be exempt from the higher non-EU tuition rate"
    }
  ],

  universities: [
    { name: "Sorbonne University", logo: "/images/universities/france/sorbonne-university.webp" },
    { name: "Universit\u00E9 PSL", logo: "/images/universities/france/universite-psl.svg" },
    { name: "\u00C9cole Polytechnique", logo: "/images/universities/france/ecole-polytechnique.webp" },
    { name: "Sciences Po", logo: "/images/universities/france/sciences-po.webp" },
    { name: "University of Paris-Saclay", logo: "/images/universities/france/university-of-paris-saclay.webp" },
    { name: "Universit\u00E9 Grenoble Alpes", logo: "/images/universities/france/universite-grenoble-alpes.webp" },
    { name: "Aix-Marseille University", logo: "/images/universities/france/aix-marseille-university.webp" },
    { name: "Universit\u00E9 de Strasbourg", logo: "/images/universities/france/universite-de-strasbourg.webp" },
    { name: "Universit\u00E9 de Bordeaux", logo: "/images/universities/france/universite-de-bordeaux.webp" },
    { name: "Universit\u00E9 de Lille", logo: "/images/universities/france/universite-de-lille.webp" },
  ],

  quickAnswer:
    "To study in France from Nepal you apply through the Etudes en France platform, pay the Campus France fee and attend the Campus France Nepal interview before applying for a long-stay student visa (VLS-TS) on france-visas.gouv.fr. For visa applications from 1 August 2026 you must show at least €877.50 a month (it was €615). Non-EU tuition at public institutions in 2026-27 is about €2,900 a year for a bachelor's and €3,950 for a master's. The visa lets you work 964 hours a year, and you must validate it online within 3 months of arriving.",
  lastUpdated: "October 2026",
  sources: [
    { label: "Campus France Nepal: How to apply", url: "https://www.nepal.campusfrance.org/how-to-apply" },
    { label: "Campus France: Student long-stay visa (VLS-TS)", url: "https://www.campusfrance.org/en/student-long-stay-visa" },
    { label: "Campus France: Validate your long-stay visa on arrival", url: "https://www.campusfrance.org/en/how-to-validate-your-long-stay-visa-visa-long-sejour-upon-your-arrival-in-france" },
    { label: "Campus France: Tuition fees in France", url: "https://www.campusfrance.org/en/tuition-fees-France" },
    { label: "Campus France: Temporary resident permit (APS)", url: "https://www.campusfrance.org/en/temporary-resident-permit-aps" },
    { label: "France-Visas", url: "https://france-visas.gouv.fr/en/" },
    ...DESTINATION_COMPARE_SOURCES,
  ],
  relatedLinks: [
    { label: "Study in France", href: "/study-in-france", description: "universities, admission and visa overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "Visa assistance for study abroad", href: "/visa-assistance-for-study-abroad" },
    { label: "Test preparation", href: "/test-prep", description: "IELTS, PTE and TOEFL coaching" },
  ],
  extraSections: [
    {
      id: "france-campus-france-nepal",
      title: "Campus France Nepal and the Etudes en France Procedure",
      bullets: [
        "Nepal uses the Etudes en France (EEF) platform. Campus France states it is mandatory for all students applying for a student visa.",
        "The main steps are: create an account, enter your personal and academic details and upload documents, pay, then book and attend your interview at Campus France Nepal (Pulchowk, Lalitpur).",
        "Bring your interview appointment letter, the pre-registration certificate and payment receipts from the platform, your passport, original academic documents, language certificates if you have them, proof of tuition payment, and proof of accommodation (booking, rental agreement or an explanatory letter).",
        "After that you complete the visa application on france-visas.gouv.fr and book an appointment with VFS to submit it.",
      ],
      note: "Source: Campus France Nepal, How to apply and required documents for the interview. Fees and dates change, so confirm on the Campus France Nepal website.",
    },
    {
      id: "france-money-needed",
      title: "How Much Money You Must Show for a France Student Visa",
      table: {
        headers: ["Item", "Amount"],
        rows: [
          ["Monthly resources, visa applications from 1 August 2026", "At least €877.50 a month (about €10,530 for 12 months)"],
          ["Monthly resources, applications up to 31 July 2026", "€615 a month"],
          ["Public tuition, bachelor's (2026-27, non-EU)", "About €2,900 a year"],
          ["Public tuition, master's (2026-27, non-EU)", "About €3,950 a year"],
          ["CVEC student contribution (2026-27)", "€105"],
        ],
      },
      note: "The new threshold was set by decree on 22 June 2026. Holders of a French government scholarship paying 900 euros a month are not affected. Sources: Campus France, Student visa changes effective 1 August 2026, and Tuition fees in France.",
    },
    {
      id: "france-work-rights",
      title: "Working in France During and After Your Studies",
      bullets: [
        "During study: the VLS-TS student visa allows you to work 964 hours a year, which Campus France describes as about 20 hours a week.",
        "Validation: you must validate your VLS-TS online within 3 months of arriving in France, using a bank card or an electronic stamp for the fee.",
        "After study: the APS temporary residence permit lasts 12 months and is not renewable. It is for holders of a licence professionnelle, a master's-level degree or equivalent, and Campus France says access depends on a bilateral agreement between France and your country, so ask Campus France Nepal or Admizz whether it applies to you.",
        "During the APS you can work under the same conditions as a student until you sign a work contract.",
        "Health cover: affiliation to French social security is free and compulsory for students, done on etudiant-etranger.ameli.fr after you arrive.",
      ],
      note: "Sources: Campus France, Student long-stay visa and Temporary resident permit (APS).",
    },
  ],

  faqItems: [
    {
      question: "Do I need Campus France to study in France from Nepal?",
      answer: "Yes. Nepal uses the Etudes en France platform, which Campus France says is mandatory for all students applying for a student visa. You create an account, upload documents, pay, and attend an interview at Campus France Nepal in Pulchowk, Lalitpur. Only after that do you complete the visa application on france-visas.gouv.fr and submit it through VFS."
    },
    {
      question: "How much money do I need to show for a France student visa?",
      answer: "For visa applications from 1 August 2026 you must show at least €877.50 per month, about €10,530 for 12 months. Applications up to 31 July 2026 used €615. Holders of a French government scholarship are not affected by the change. Check france-visas.gouv.fr for the documents accepted as proof."
    },
    {
      question: "Can I study in France without knowing French?",
      answer: "Yes. Campus France lists more than 1,650 programs taught in English, mainly in business, engineering, sciences and arts. French-taught programs need French certificates such as DELF, DALF or TCF at the level each institution sets. Knowing some French still helps with daily life and finding work."
    },
    {
      question: "Do I need IELTS to study in France from Nepal?",
      answer: "It depends on the institution. English-taught programs usually ask for proof of English, and the accepted tests and minimum scores are set by each university or school, so check the programme page. French-taught programs ask for French certificates instead. Admizz can confirm the requirement for your shortlisted programs."
    },
    {
      question: "How long can I stay in France after graduation?",
      answer: "The APS temporary residence permit lasts 12 months and is not renewable, for graduates with a licence professionnelle, a master's-level degree or equivalent. Campus France says it is open to students from countries with a bilateral agreement with France, so check whether it applies to Nepali graduates before relying on it."
    },
    {
      question: "What is the average cost of studying in France?",
      answer: "For 2026-27, public institutions charge non-EU students about €2,900 a year for a bachelor's and €3,950 for a master's, and about €398 for a doctorate. Private institutions charge €6,000 to €18,000 or more. Campus France puts an average monthly student budget at about €800 outside Paris and €1,000 in Paris."
    },
    {
      question: "Are scholarships available for Nepalese students?",
      answer: "Yes. The Eiffel Excellence Scholarship covers master's and PhD students, and your institution nominates you. Erasmus Mundus Joint Masters also award scholarships, and Campus Bourses lists others. French government scholarship holders can be exempt from the higher non-EU tuition rate."
    },
    {
      question: "Can I work part-time while studying in France?",
      answer: "Yes. The VLS-TS student visa allows 964 hours of work a year, which Campus France describes as about 20 hours a week. The limit is calculated over the year, so you can work more hours in holidays and fewer in term time. Internship hours are not counted toward this limit."
    },
    {
      question: "When should I start the application process?",
      answer: "Start early. Campus France lists 15 December as the closing date for DAP registration on Etudes en France for the following September, and deadlines for other routes differ by institution. Allow time for the Campus France interview, the visa application and document preparation before your course start date."
    },
    {
      question: "Do I need health insurance in France as a Nepali student?",
      answer: "Affiliation to French social security is free and compulsory for students. After arriving you register on etudiant-etranger.ameli.fr and download your affiliation certificate. The CVEC student contribution is a separate payment, €105 for 2026-27. For the visa itself, follow the insurance proof listed on france-visas.gouv.fr."
    },
    {
      question: "What do I do after I arrive in France with a VLS-TS visa?",
      answer: "Validate your visa online at administration-etrangers-en-france.interieur.gouv.fr within 3 months of arriving. You need an email address, your visa details, arrival date, French address and a bank card or electronic stamp to pay the residence permit fee. Campus France lists the fee as €100 for most nationalities."
    },
    {
      question: "Does Admizz help with French student visa applications?",
      answer: "Yes. Admizz helps with university selection, SOP writing, the Etudes en France account, Campus France interview preparation, visa documentation and pre-departure guidance."
    }
  ],

  ctaTitle: "Start Your France Journey with Admizz Today",
  ctaContent: "France offers unmatched advantages for Nepalese students including academic prestige, innovation, lifestyle, and career opportunities across business, science, fashion, hospitality, and arts fields. Admizz specializes in comprehensive support covering university selection, SOP writing, Campus France procedures, visa interview preparation, and accommodation arrangement. With Admizz, you're not just applying — you're preparing to succeed."
};

export default async function StudyInFranceFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "france" });
  return <NepalVariantTemplate data={pageData} blogPosts={blogPosts} />;
}

// Visa, fee and funds facts checked against official sources in October 2026. Re-check before editing.
import type { Metadata } from "next";
import NepalVariantTemplate from "@/components/ui/NepalVariantTemplate";
import type { NepalVariantData, CountryTheme } from "@/components/ui/NepalVariantTemplate";
import IndiaAnimations from "@/components/india/IndiaAnimations";
import IndiaCinematicHero from "@/components/india/IndiaCinematicHero";
import IndiaCostViz from "@/components/india/IndiaCostViz";
import IndiaCityMap from "@/components/india/IndiaCityMap";
import IndiaWhyNarrative from "@/components/india/IndiaWhyNarrative";
import IndiaStickyMobileCTA from "@/components/india/IndiaStickyMobileCTA";
import { client } from "@/lib/sanity";
import { postsByCategoryQuery } from "@/lib/queries";
import type { SanityPost } from "@/types";

export const metadata: Metadata = {
  title: "Study in India from Nepal 2026: Cost, Visa & Scholarships",
  description:
    "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
  alternates: {
    canonical: "https://admizzeducation.com/study-in-india-from-nepal",
  },
  openGraph: {
    title: "Study in India from Nepal 2026: Cost, Visa & Scholarships",
    description:
      "Study in India from Nepal: costs, student visa, intakes, scholarships and partner universities for Nepali students. Admission support from Admizz.",
    url: "https://admizzeducation.com/study-in-india-from-nepal",
    siteName: "Admizz Education",
    images: ["/images/og/nepali-2.webp"],
    type: "website",
  },
};

const pageData: NepalVariantData = {
  countryName: "India",
  countryCategorySlug: "india",
  heroHeading: "Study in India from Nepal",
  heroSubheading: "Build a Bright Future in One of the World's Top Study Destinations",

  introTitle: "Your Path to Quality Education",
  introContent: "Study in India from Nepal has become one of the most popular choices for students seeking quality education with convenience. India's open border with Nepal, cultural similarities, and proximity make it an easy destination to reach. Institutions like the IITs, IIMs, and AIIMS, alongside UGC-recognized universities and AICTE-approved colleges, offer programs in Engineering, Medicine, Management, IT, and Humanities. Admizz provides guidance from college selection through entrance exam preparation, accommodation, and documentation. For the Embassy of India's scholarships, including COMPEX, you must apply yourself, and we explain how.",

  whyStudyTitle: "Why Study in India from Nepal",
  benefits: [
    {
      title: "Wide Choice of Institutions",
      description: "Choose from central universities, national institutes, and private universities across the country."
    },
    {
      title: "Scholarships for Nepali Nationals",
      description: "The Embassy of India in Kathmandu says around 1,500 scholarships and seats are provided to Nepali nationals every year."
    },
    {
      title: "Cultural & Linguistic Familiarity",
      description: "Easy adjustment due to shared culture, food, festivals, and in many cases, language (Hindi/English)."
    },
    {
      title: "Medical & Engineering Colleges",
      description: "India is home to well-known institutes in medicine, engineering, pharmacy, and IT."
    },
    {
      title: "Many Courses",
      description: "Pick from AI, data science, hotel management, fashion design, business, arts, or traditional subjects."
    },
    {
      title: "Easy Travel & Entry Process",
      description: "Nepali citizens are exempt from the Indian visa requirement, according to India's Bureau of Immigration, and the two countries share an open border."
    }
  ],

  visaTitle: "Indian Visa Requirements",
  visaIntro: "Nepali citizens do not need an Indian visa, and the Bureau of Immigration lists them as exempt from registration too. You still need an accepted admission and the right ID at the border.",
  visaRequirements: [
    {
      category: "Visa Needed",
      details: "No. Citizens of Nepal are exempt from the requirement of an Indian visa (Bureau of Immigration)"
    },
    {
      category: "Entry from Nepal",
      details: "By land or air, a government-approved photo ID that shows your nationality, photograph, date of birth and validity"
    },
    {
      category: "Entry from elsewhere",
      details: "A valid passport if you enter India from any place other than Nepal. A passport and visa are needed if you arrive from China, Macau, Hong Kong or Pakistan"
    },
    {
      category: "FRRO/FRO Registration",
      details: "Not required. Citizens of Nepal and Bhutan are exempt from the requirement of visa and registration"
    },
    {
      category: "Study in India ID",
      details: "Registering on studyinindia.gov.in gives you an SII ID, which the COMPEX 2026 application required"
    },
    {
      category: "Class 12 Equivalence",
      details: "Embassy schemes ask for a UGC (or AIU) equivalence certificate for your 10+2, from equivalence.ugc.ac.in"
    }
  ],

  intakesTitle: "Admission Intakes & Dates",
  intakes: [
    {
      intake: "Embassy Scholarship Cycle",
      months: "Set by the Embassy each year",
      details: "ICCR schemes (ABVGSS, SJSS) are usually advertised in February-March and AYUSH in May-June. COMPEX 2026 opened on 27 August"
    },
    {
      intake: "Institution Intakes",
      months: "Set by each institution",
      details: "Direct applications follow each college's or university's own admission calendar"
    }
  ],
  intakesNote: "Dates change every year. Check the Embassy of India, Kathmandu website for scholarship schemes and the admissions page of each institution for direct applications.",

  testTitle: "Eligibility & Entrance Exams",
  testIntro: "Entry requirements depend on the route. These are the ones published by the Embassy of India in Kathmandu.",
  testRequirements: [
    {
      test: "COMPEX (BE/B.Tech, B.Pharmacy, B.Sc. Agriculture, Food Technology, Nursing)",
      score: "Computer-based test run by the Embassy",
      notes: "2026 papers: English, Physics, Chemistry (EPC), Mathematics and Biology. Class XII: 60% aggregate and 50% in English"
    },
    {
      test: "IITs, NITs and IIITs via COMPEX",
      score: "JEE (Main) and JEE (Advanced) as applicable",
      notes: "Needed in addition to selection in COMPEX"
    },
    {
      test: "Medical (MBBS/BDS) via Embassy Self-Financing Scheme",
      score: "NEET-UG, at least the 50th percentile",
      notes: "Also 50% in Physics, Chemistry and Biology and 50% in English"
    },
    {
      test: "Other courses and direct applications",
      score: "Set by each institution",
      notes: "Check the admission page of your institution for exams such as CUET or its own test"
    }
  ],

  costTitle: "Cost of Studying",
  costIntro: "Tuition differs by institution and course, so check the fee page of the college you are applying to. These are the fixed figures the Embassy of India publishes.",
  costTables: [
    {
      title: "Embassy of India, Kathmandu: Fees and Funding",
      rows: [
        {
          category: "COMPEX 2026 application fee",
          cost: "NPR 400, paid at Nepal SBI Bank"
        },
        {
          category: "Law Scholarship Scheme (announced September 2026)",
          cost: "Reimbursement up to NPR 6.4 lakh per student per year for tuition, admission and hostel fees"
        },
        {
          category: "Self-Financing Scheme (MBBS, BDS, BE/B.Tech, B.Arch, B.Pharmacy)",
          cost: "No scholarship or financial aid; proof of financial capacity is required"
        }
      ]
    }
  ],

  lastChecked: "October 2026",
  dateModified: "2026-10-13",
  sourcesTitle: "Official sources",
  sources: [
    { label: "Embassy of India, Kathmandu: scholarship notices", url: "https://www.indembkathmandu.gov.in/education/news/scholarship" },
    { label: "Study in India", url: "https://studyinindia.gov.in" },
    { label: "Bureau of Immigration: Visa free regime", url: "https://www.boi.gov.in/boi/contents/travelling-to-india/foreigners/visa-free-regime-visa-on-arrival" },
    { label: "Bureau of Immigration: Registration requirements", url: "https://www.boi.gov.in/boi/contents/registration-authority/registration-of-foreign-nationals/registration-requirements" },
    { label: "Embassy of India, Kathmandu: About scholarships", url: "https://www.indembkathmandu.gov.in/about-education-and-scholarship" },
    { label: "Embassy of India, Kathmandu: COMPEX-2026 notification", url: "https://www.indembkathmandu.gov.in/storage/press-release/7569148.pdf" },
    { label: "Study in India portal", url: "https://studyinindia.gov.in/" },
  ],

  scholarshipsTitle: "Scholarships",
  scholarshipsIntro: "The Embassy accepts applications only from the student. Admizz can explain these schemes, but you submit the application yourself.",
  scholarships: [
    {
      name: "COMPEX Scholarship Scheme",
      details: "Embassy of India scheme for BE/B.Tech, B.Pharmacy, B.Sc. Agriculture, B.Sc. Food Technology and B.Sc. Nursing, chosen by a computer-based test"
    },
    {
      name: "ICCR Scholarships",
      details: "ABVGSS for undergraduate and SJSS for postgraduate study, plus the AYUSH scheme for traditional medicine, applied for on the ICCR A2A portal"
    },
    {
      name: "Law Scholarship Scheme",
      details: "New in September 2026: reimbursement up to NPR 6.4 lakh a year for BA LLB, LLB or LLM at a top-20 NIRF-ranked law college"
    },
    {
      name: "Other Embassy Schemes",
      details: "2026-27 notices included SAARC (B.Sc. Hospitality and Hotel Management), HJBSS (ME/M.Tech) and Nepal Aid Fund (M.Sc. Agriculture)"
    }
  ],

  universities: [
    { name: "IISc Bangalore", logo: "/images/universities/india/iisc-bangalore.webp" },
    { name: "University of Delhi", logo: "/images/universities/india/university-of-delhi.webp" },
    { name: "Jawaharlal Nehru University", logo: "/images/universities/india/jawaharlal-nehru-university.webp" },
    { name: "Banaras Hindu University", logo: "/images/universities/india/banaras-hindu-university.webp" },
    { name: "Anna University", logo: "/images/universities/india/anna-university.webp" },
    { name: "VIT", logo: "/images/universities/india/vit.webp" },
    { name: "Manipal Academy", logo: "/images/universities/india/manipal-academy.webp" },
    { name: "Symbiosis International University", logo: "/images/universities/india/symbiosis-international-university.webp" },
    { name: "Delhi Technological University", logo: "/images/universities/india/delhi-technological-university.webp" },
    { name: "KIIT University", logo: "/images/universities/india/kalinga-institute.webp" },
    { name: "RK University", logo: "/images/universities/india/rk-university.webp" },
  ],

  quickAnswer:
    "Nepali citizens do not need an Indian visa or FRRO registration to study in India, according to India's Bureau of Immigration. The main scholarship route is COMPEX, run by the Embassy of India in Kathmandu for BE/B.Tech, B.Pharmacy, Agriculture, Food Technology and Nursing, with selection by a computer-based test. The 2026-27 window ran from 27 August to 16 September 2026, with exams from 28 September to 3 October. Applicants register on Study in India, pay NPR 400, and must apply directly because the Embassy does not accept applications through consultants.",
  lastUpdated: "October 2026",
  relatedLinks: [
    { label: "Study in India", href: "/study-in-india", description: "universities, admission and entry overview" },
    { label: "Study abroad rule changes for Nepali students", href: "/study-abroad-rule-changes", description: "dated visa, funds and work-rule changes" },
    { label: "Scholarship assistance in Nepal", href: "/scholarship-assistance-in-nepal" },
    { label: "COMPEX scholarship guide", href: "/compex-scholarship-2026-complete-guide-for-nepalese-students-to-study-in-india", description: "step-by-step guide for Nepali students" },
    { label: "Test preparation", href: "/test-prep", description: "entrance exam coaching" },
    { label: "ICCR scholarship guide", href: "/iccr-scholarship-2026-study-in-india", description: "study in India on an ICCR scholarship" },
    { label: "Scholarships for Nepali students to study in India", href: "/scholarships-for-nepali-students-to-study-in-india", description: "every route compared" },
  ],
  extraSections: [
    {
      id: "india-entry-registration",
      title: "Entering India and Registering as a Nepali Student",
      table: {
        headers: ["Topic", "What to know"],
        rows: [
          ["Indian visa", "No Indian visa: the Bureau of Immigration says citizens of Nepal are exempt from the requirement of an Indian visa."],
          ["Coming from Nepal", "By land or air, carry a government-approved photo ID that shows your nationality, photograph, date of birth and validity."],
          ["Coming from elsewhere", "You need a valid passport. From China, Macau, Hong Kong or Pakistan you need a passport and an Indian visa."],
          ["FRRO/FRO registration", "Citizens of Nepal and Bhutan are exempt from the requirement of visa and registration. The 14-day registration rule applies to foreign nationals on student visas valid for more than 180 days."],
          ["Study in India (SII) ID", "Register on studyinindia.gov.in to get an ID. The COMPEX 2026 application required it."],
          ["Class 12 equivalence", "If your Class 12 is a Nepali board qualification, expect to need a UGC equivalence certificate (equivalence.ugc.ac.in). Embassy schemes ask for it."],
        ],
      },
      note: "Sources: Bureau of Immigration, Visa free regime and Registration requirements; Embassy of India, Kathmandu, COMPEX-2026 notification.",
    },
    {
      id: "india-admission-routes",
      title: "Admission Routes for Nepali Students",
      table: {
        headers: ["Route", "Courses", "What the official source says"],
        rows: [
          ["COMPEX (Embassy of India)", "BE/B.Tech, B.Pharmacy, B.Sc. Agriculture, B.Sc. Food Technology, B.Sc. Nursing", "Computer-based test. A nomination does not guarantee a seat. You cannot change college after placement."],
          ["ICCR scholarships (A2A portal)", "ABVGSS undergraduate, SJSS postgraduate, AYUSH", "ABVGSS and SJSS exclude medical, paramedical, fashion and law courses and integrated courses such as BA LLB."],
          ["Embassy Self-Financing Scheme", "MBBS, BDS, BE/B.Tech, B.Arch, B.Pharmacy", "No financial aid. MBBS/BDS needs NEET-UG at the 50th percentile or above. Applications are made in person at the Education Wing with a parent or guardian."],
          ["Direct to an institution", "Any course", "Each institution sets its own entry requirements. Check its admission page."],
        ],
      },
      note: "Source: Embassy of India, Kathmandu, scholarship pages and 2026 notifications. The 2026-27 Self-Financing Scheme deadline was 24 July 2026.",
    },
    {
      id: "india-compex",
      title: "COMPEX Scholarship: Eligibility, Dates and Exam",
      table: {
        headers: ["Topic", "Details"],
        rows: [
          ["Who runs it", "The Embassy of India in Kathmandu invites online applications from Nepali nationals. Preference goes to candidates who completed school in Nepal."],
          ["Eligibility, BE/B.Tech", "60% aggregate and 50% in English in Class XII, and at least 60% in each of Physics, Chemistry and Mathematics."],
          ["Eligibility, other courses", "B.Sc. Agriculture, B.Pharmacy, B.Sc. Food Technology and B.Sc. Nursing: 60% aggregate and 50% in English, and at least 55% in each of Physics, Chemistry and Biology."],
          ["Age", "16 to 23 years on 1 July 2026. You can apply for a maximum of two courses."],
          ["2026-27 dates", "Applications opened 27 August 2026 and the online application closed 16 September 2026. Exams ran 28 September to 3 October 2026 in Kathmandu."],
          ["Fee", "NPR 400, deposited at Nepal SBI Bank, then Step 3 completed online."],
          ["IIT, NIT and IIIT seats", "Also need a JEE (Main) and, as applicable, JEE (Advanced) result."],
          ["Apply yourself", "The Embassy does not recognise or receive applications through education consultants, middlemen or agencies, and such applications may be rejected."],
          ["Conditions", "The Embassy's general instructions say you cannot reject or withdraw the admission after placement without being debarred from future scholarships and having to refund the amount spent by the Government of India."],
        ],
      },
      note: "Sources: Embassy of India, Kathmandu, COMPEX-2026 notification and general instructions for scholarship schemes. The Embassy page lists April/May as a tentative month, but the 2026 round opened in August, so watch for the next notice.",
    },
    {
      id: "india-work-after-study",
      title: "Work, Internships and After Your Studies",
      table: {
        headers: ["Topic", "What to know"],
        rows: [
          ["Open border", "The Embassy of India describes India and Nepal as sharing an open border and deep-rooted people-to-people contacts."],
          ["Part-time work", "We found no official rule on part-time work for Nepali students, so confirm the rules for any job or internship with your institution and the employer before you start."],
          ["Scholarship holders", "The Embassy's conditions on placement and withdrawal apply, so read the notification of your scheme in full."],
        ],
      },
      note: "Source: Embassy of India, Kathmandu, About India-Nepal relations and scholarship pages.",
    },
  ],

  faqItems: [
    {
      question: "Can Nepali students study in India without a visa?",
      answer: "Yes. India's Bureau of Immigration says citizens of Nepal are exempt from the requirement of an Indian visa and registration. Coming from Nepal by land or air you need a government-approved photo ID showing your nationality. You need a valid passport if you enter from anywhere else, and a passport and visa if you arrive from China, Macau, Hong Kong or Pakistan."
    },
    {
      question: "What is the COMPEX scholarship and who can apply?",
      answer: "COMPEX is a scholarship scheme of the Embassy of India in Kathmandu for Nepali nationals taking BE/B.Tech, B.Pharmacy, B.Sc. Agriculture, B.Sc. Food Technology or B.Sc. Nursing in India. You need 60% aggregate and 50% in English in Class XII plus subject minimums, and you must be 16 to 23 on 1 July 2026. Selection is by a computer-based test."
    },
    {
      question: "When is the COMPEX application window and exam?",
      answer: "The 2026-27 round opened on 27 August 2026 and applications closed on 16 September 2026. The computer-based tests ran from 28 September to 3 October 2026. Dates change every year, and the Embassy page lists April/May as a tentative month, so watch indembkathmandu.gov.in for the next notice rather than relying on this page."
    },
    {
      question: "Can an education consultant apply for COMPEX for me?",
      answer: "No. The Embassy of India accepts applications only from the applicant and says it does not recognise or receive applications through education consultants, middlemen or agencies. Such applications may be rejected. Admizz can explain the process and help you choose institutions, but you must submit the application yourself."
    },
    {
      question: "Do Nepali students need to register with the FRRO in India?",
      answer: "No. The Bureau of Immigration states that citizens of Nepal and Bhutan are exempt from the requirement of visa and registration. The FRRO/FRO registration within 14 days applies to foreign nationals on student visas valid for more than 180 days, and Nepali citizens enter visa-free."
    },
    {
      question: "What entrance exams are required for Indian universities?",
      answer: "It depends on the route. COMPEX uses its own computer-based test, and IIT, NIT or IIIT seats through COMPEX also need a JEE result. MBBS or BDS through the Embassy's Self-Financing Scheme needs NEET-UG at the 50th percentile or above. For other courses, each institution sets its own entry requirements."
    },
    {
      question: "How much does it cost to study in India for a Nepali student?",
      answer: "Tuition depends on the institution and course, so check each college's fee page. Figures we can confirm are the COMPEX application fee of NPR 400 and the Embassy's Law Scholarship, which reimburses up to NPR 6.4 lakh a year for tuition, admission and hostel fees. Self-Financing Scheme seats get no financial aid."
    },
    {
      question: "Are there scholarships for Nepali students in India?",
      answer: "Yes. The Embassy of India says around 1,500 scholarships and seats are provided to Nepali nationals every year. Schemes include COMPEX, ICCR's ABVGSS and SJSS, the AYUSH scheme, SAARC, HJBSS and Nepal Aid Fund schemes, and a Law Scholarship Scheme announced in September 2026. Each has its own eligibility and dates."
    },
    {
      question: "When should I apply to Indian universities?",
      answer: "It depends on the route. Embassy schemes publish their own calendar: ICCR's ABVGSS and SJSS are usually advertised in February-March, AYUSH in May-June, and COMPEX 2026 opened in August. Direct applications follow each institution's own deadlines, so check its admission page early."
    },
    {
      question: "Does Admizz help with India study admissions?",
      answer: "Yes. Admizz provides guidance for Nepali students on university selection, documents and entrance exam preparation. For the Embassy's scholarships, including COMPEX, the Embassy accepts applications only from the student, so we explain the steps and you submit the application yourself."
    }
  ],

  ctaTitle: "Take the First Step – Start Your Education in India",
  ctaContent: "India offers a wide choice of institutions across medicine, engineering, business, IT, and humanities, with an open border and no visa needed for Nepali citizens. Since 2001 India's scholarship programme in Nepal has benefited around 40,000 students, according to the Embassy of India. Admizz helps you choose the right college or university, plan for entrance exams, and complete admission formalities."
};

const indiaTheme: CountryTheme = {
  primary: "#1C5D3F",
  primaryDeep: "#0B3D2E",
  accent: "#FF6B1A",
  accentSoft: "#FFB870",
  gold: "#C9A961",
  surfaceTint: "#FFF8F1",
  ink: "#1A1A1A",

  heroImage:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=80",
  heroGradient:
    "linear-gradient(115deg, rgba(11,61,46,0.92) 0%, rgba(11,61,46,0.7) 45%, rgba(255,107,26,0.55) 100%)",

  showChakraDividers: true,
  dividerStyle: "filigree",
  heritagePattern: true,
  serifHeadings: true,
  showFlagStripeOnCards: true,
  benefitLandmarks: [
    "taj-mahal",
    "lotus-temple",
    "hawa-mahal",
    "india-gate",
    "mysore-palace",
    "red-fort",
  ],
  universitiesBackdrop: "gateway-of-india",
  ctaLandmarks: { left: "charminar", right: "victoria-memorial" },
  journeyStrip: {
    stats: [
      { value: "1500+", label: "Students successfully enrolled worldwide" },
      { value: "95%", label: "Student Visa Approval Rate with Expert Guidance" },
      { value: "$2M+", label: "In Scholarships Awarded to Our Students" },
    ],
  },
};

export default async function StudyInIndiaFromNepalPage() {
  const blogPosts: SanityPost[] = await client.fetch(postsByCategoryQuery, { categorySlug: "india" });
  return (
    <>
      <NepalVariantTemplate
        data={pageData}
        blogPosts={blogPosts}
        theme={indiaTheme}
        customHero={
          <IndiaCinematicHero
            heading={pageData.heroHeading}
            subheading={pageData.heroSubheading}
            countryName={pageData.countryName}
          />
        }
        replaceWhySection={<IndiaWhyNarrative />}
        insertAfterIntakes={<IndiaCityMap />}
        replaceCostSection={
          <IndiaCostViz
            scholarshipsTitle={pageData.scholarshipsTitle}
            scholarshipsIntro={pageData.scholarshipsIntro}
            scholarships={pageData.scholarships}
          />
        }
      />
      <IndiaAnimations />
      <IndiaStickyMobileCTA />
    </>
  );
}

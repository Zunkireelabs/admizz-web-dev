// Visible FAQ + FAQPage schema for Sanity posts whose body has no FAQ section
// of its own. Keyed by post slug. Every answer restates facts already stated
// in that post's own body — nothing here is invented. [slug]/page.tsx renders
// these visibly AND emits the matching FAQPage schema (never schema alone),
// and skips both if the post already carries faqItems or its own FAQ heading.
export interface PostFaqItem {
  question: string;
  answer: string;
}

export const postFaqs: Record<string, PostFaqItem[]> = {
  "compex-scholarship-2026-complete-guide-for-nepalese-students-to-study-in-india": [
    {
      question: "Who is eligible for the COMPEX Scholarship 2026?",
      answer:
        "You must be a citizen of Nepal who has completed 10+2 (Class XII) or equivalent with a minimum of 60% aggregate marks (this may vary by course). English must be a mandatory subject in 10+2, and the age limit is generally 16 to 23 years as per Embassy guidelines. Required subjects depend on the course: Physics, Chemistry and Mathematics for Engineering; Physics, Chemistry and Biology/Mathematics for Pharmacy; and a Science background with Biology for Agriculture and Nursing.",
    },
    {
      question: "Which courses does the COMPEX Scholarship cover?",
      answer:
        "COMPEX primarily supports undergraduate professional programs at reputed Indian institutions: Engineering (BE / B.Tech), Pharmacy (B.Pharm), Agriculture (B.Sc. Agriculture), Food Technology (B.Sc. Food Technology) and Nursing (B.Sc. Nursing).",
    },
    {
      question: "When is the COMPEX Scholarship 2026 exam?",
      answer:
        "Official dates are announced later by the Embassy of India, Kathmandu. Based on previous years, the entrance exam is expected in late June or July, with the online application around May to June and results in July to August. Timelines may change, so check the official notification regularly.",
    },
    {
      question: "What is the COMPEX exam pattern?",
      answer:
        "Selection is through a competitive written examination conducted by the Indian Embassy in Nepal. It generally covers Physics, Chemistry, Mathematics or Biology (depending on the course) and basic English. The exam tests concept clarity, speed and accuracy.",
    },
    {
      question: "How do I apply for the COMPEX Scholarship?",
      answer:
        "Check the official notification released by the Embassy of India, Kathmandu, complete the online registration with your personal, academic and course details, upload the required documents (academic certificates, citizenship proof, passport if available, character certificate and a passport-size photograph), pay the application fee as instructed in the notice, then download your admit card and appear for the exam.",
    },
    {
      question: "Does COMPEX guarantee admission, and are agents officially appointed?",
      answer:
        "No. No agents are officially appointed for COMPEX, and scholarship nomination does not automatically guarantee admission. Some universities may have additional entrance or eligibility criteria, so early guidance significantly improves your chances.",
    },
  ],
};

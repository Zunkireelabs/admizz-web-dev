import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";

const post = {
  "title": "COMPEX Scholarship Selection Criteria Explained",
  "slug": "compex-scholarship-selection-criteria-explained",
  "sections": [
    {
      "heading": "The Short Answer",
      "body": "According to the Embassy of India in Kathmandu, applicants must be **between 16 and 23 years old on 1 July**, meet minimum Class XII marks, and then qualify in a test conducted by the Embassy. Nomination does not guarantee admission, which is confirmed only after the Indian institution responds. Read the current notice before relying on this summary, and see our [COMPEX scholarship 2026 complete guide for Nepalese students](https://admizzeducation.com/compex-scholarship-2026-complete-guide-for-nepalese-students-to-study-in-india)."
    },
    {
      "heading": "Eligibility Marks",
      "body": "For BE/B.Tech, the Embassy requires 60% aggregate and 50% in English in Class XII, with at least 60% in each of Physics, Chemistry and Mathematics. For B.Sc. (Food Technology), B.Pharmacy, B.Sc. (Agriculture) and B.Sc. (Nursing), it requires 60% aggregate and 50% in English, with at least 55% in each of Physics, Chemistry and Biology. Class XI marks are not included."
    },
    {
      "heading": "Selection Process",
      "body": "Selection is based on a qualifying or competitive test conducted by the Embassy. Applicants may choose up to two courses, and for BE/B.Tech they rank streams and institutes in order of preference; these cannot be changed after the form is filled. Institutes such as NITs, IITs and IIITs additionally need JEE (Main) and JEE (Advance) qualification as the institute requires, and an Association of Indian Universities equivalence certificate is needed at admission."
    },
    {
      "heading": "Plan With Admizz Education",
      "body": "Criteria are the Embassy's to set, but planning is where we help. At Admizz Education, our Scholarship Support service helps students identify scholarships, grants and fee waivers that fit their profile. As an ICEF-accredited agency that has helped 2,000+ students enrol successfully, we offer a free first consultation. When you are ready, [contact our team](https://admizzeducation.com/contact). See our [COMPEX scholarship for Nepali students by the Indian Embassy](https://admizzeducation.com/compex-scholarship-for-nepali-students-by-the-indian-embassy) for more."
    },
    {
      "heading": "About This Post",
      "body": "Website and content growth by [Zunkireelabs](https://zunkireelabs.com)."
    },
    {
      "heading": "Sources",
      "body": "- [Embassy of India](https://www.indembkathmandu.gov.in/complex)\n- [Embassy of India](https://indembkathmandu.gov.in/education/news/scholarship)"
    }
  ],
  "featuredImage": {
    "url": "/images/blog/compex-scholarship-2026-complete-guide-for-nepalese-students-to-study-in-india.webp",
    "alt": "COMPEX scholarship selection criteria"
  },
  "categories": [
    {
      "slug": "scholarships",
      "title": "Scholarships"
    },
    {
      "slug": "india",
      "title": "India"
    }
  ],
  "publishedAt": "2026-11-27T04:42:51.031Z",
  "path": "/compex-scholarship-selection-criteria-explained",
  "quickAnswer": "COMPEX applicants must be 16 to 23 (as of 1 July), meet Class XII mark minimums in the required subjects, and then qualify in the Embassy of India's test. Nomination does not guarantee admission.",
  "faqItems": [
    {
      "question": "What is the age limit?",
      "answer": "The Embassy states a minimum age of 16 and a maximum of 23, with 1 July of the current year as the crucial date."
    },
    {
      "question": "What marks do I need for BE/B.Tech?",
      "answer": "At least 60% aggregate and 50% in English in Class XII, with at least 60% in each of Physics, Chemistry and Mathematics."
    },
    {
      "question": "What about pharmacy, agriculture, food technology and nursing?",
      "answer": "At least 60% aggregate and 50% in English, with at least 55% in each of Physics, Chemistry and Biology."
    },
    {
      "question": "How many courses can I apply for?",
      "answer": "A maximum of two courses, subject to meeting eligibility. Always check the current notice, as terms can change."
    }
  ]
};

export const metadata: Metadata = {
  title: "COMPEX Scholarship Selection Criteria Explained",
  description: "COMPEX selection criteria from the Embassy of India: age limit, Class XII marks, subject minimums and the qualifying test.",
  alternates: { canonical: "https://admizzeducation.com/compex-scholarship-selection-criteria-explained" },
};

export default function Page() {
  return <GeneratedBlogPost {...post} />;
}

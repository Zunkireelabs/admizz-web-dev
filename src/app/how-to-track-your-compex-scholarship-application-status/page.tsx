import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";

const post = {
  "title": "How to Track Your COMPEX Scholarship Application Status",
  "slug": "how-to-track-your-compex-scholarship-application-status",
  "sections": [
    {
      "heading": "The Short Answer",
      "body": "The Embassy of India says candidates must keep a **valid personal email ID and mobile number active** until the process is complete, and it sends admit-card links to the registered email. Beyond that, follow the notices in the Embassy's news section for each stage. Applications cannot be edited after submission, so get the form right first time. Our [COMPEX scholarship for Nepali students by the Indian Embassy](https://admizzeducation.com/compex-scholarship-for-nepali-students-by-the-indian-embassy) explains the stages."
    },
    {
      "heading": "Stages You Will Move Through",
      "body": "According to the Embassy, you apply online, receive an admit card by email, sit the qualifying test, and, if nominated, wait for confirmation of admission from the Indian institution. Nomination alone does not guarantee a seat: the Embassy confirms admission only after hearing from the university or institution. Each stage has dated notices on the Embassy's website."
    },
    {
      "heading": "A Simple Tracking Routine",
      "body": "Check your inbox, including spam, every few days after you apply. Check the Embassy's news page whenever a stage is due. Keep a note of dates and a folder with your confirmation, admit card and uploaded documents. If something looks wrong, write to the contact address in the official notice quoting your application details."
    },
    {
      "heading": "Support From Admizz Education",
      "body": "We cannot see your Embassy account, but we can help you build the routine above and stay on schedule. At Admizz Education, our Scholarship Support service helps students identify scholarships, grants and fee waivers that fit their profile. As an ICEF-accredited agency that has helped 2,000+ students enrol successfully, we offer a free first consultation. When you are ready, [contact our team](https://admizzeducation.com/contact)."
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
    "url": "/images/blog/compex-scholarship-hub.webp",
    "alt": "Tracking a COMPEX scholarship application"
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
  "publishedAt": "2026-11-27T04:42:43.544Z",
  "path": "/how-to-track-your-compex-scholarship-application-status",
  "quickAnswer": "The Embassy of India communicates with COMPEX applicants through their registered email and its official notices. Keep that email and mobile number active, and check the Embassy's news page for each stage.",
  "faqItems": [
    {
      "question": "Is there a login to check my COMPEX status?",
      "answer": "Follow the portal link in the Embassy's notice for your cycle. The Embassy's page says admit-card links and updates go to your registered email."
    },
    {
      "question": "Can I edit my application after submitting?",
      "answer": "No. The Embassy says that once the application is submitted, no change or edit is allowed."
    },
    {
      "question": "Does nomination mean I have a seat?",
      "answer": "No. Nomination does not guarantee admission. Confirmation comes only after the Embassy receives it from the concerned Indian institution."
    },
    {
      "question": "What should I save?",
      "answer": "Keep your submission confirmation, admit card and every email from the Embassy, along with copies of the documents you uploaded."
    }
  ]
};

export const metadata: Metadata = {
  title: "How to Track Your COMPEX Scholarship Application Status",
  description: "How to follow your COMPEX scholarship application: keep your registered email active and watch the Embassy of India's official notices.",
  alternates: { canonical: "https://admizzeducation.com/how-to-track-your-compex-scholarship-application-status" },
};

export default function Page() {
  return <GeneratedBlogPost {...post} />;
}

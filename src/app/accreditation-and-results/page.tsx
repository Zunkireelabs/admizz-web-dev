import type { Metadata } from "next";
import GeneratedBlogPost from "@/components/GeneratedBlogPost";

const post = {
  "title": "Admizz Education: Accreditation, Experience and Results",
  "slug": "accreditation-and-results",
  "sections": [
    {
      "heading": "Who we are",
      "body": "Admizz Education helps students find, apply to and prepare for study abroad. Admizz was founded in 2015 and placed its first students in 2016, applying to universities in India, and it has grown to cover the UK, USA, Canada, Australia, New Zealand, Germany, France, Finland and more. Our team of counselors supports students and families in Nepal. Read more on our [About page](/about)."
    },
    {
      "heading": "Key facts",
      "body": "- **Experience:** helping students apply abroad since 2015.\n- **Accreditation:** Admizz Education is an ICEF-accredited agency. The ICEF badge is shown in our website footer.\n- **Students enrolled:** 2,000+ students enrolled worldwide.\n- **Partner institutions:** 100+ institutions across 12+ countries.\n- **Services:** course and university selection, test preparation, scholarships and visa preparation."
    },
    {
      "heading": "How we work with students",
      "body": "1. **Assessment:** we look at your marks, finances and goals.\n2. **Shortlist:** we suggest courses and countries that fit, and explain the trade-offs.\n3. **Applications:** we help you prepare applications and documents.\n4. **Visa preparation:** we check your documents and funds against the official rules and help you practice for any interview.\n5. **Before you fly:** we help you prepare for arrival.\n\nYou remain the applicant at every stage. We encourage students to keep their own logins and to read every form before it is submitted."
    },
    {
      "heading": "What we do not promise",
      "body": "No consultancy decides a visa, so we never guarantee one. We do not guarantee scholarships or admission either, and we never use documents that are not yours or not true. If a profile is weak, we say so and discuss realistic options. For the questions to ask any consultancy, read our [checklist for choosing a genuine education consultancy](/how-to-choose-genuine-education-consultancy-nepal-2026)."
    },
    {
      "heading": "How we keep our information accurate",
      "body": "- Visa fees, funds and deadlines are checked against official government pages, and each guide lists its sources.\n- Guides show when they were last checked.\n- When rules change, we update the guide. See our dated list of [study abroad rule updates](/study-abroad-rule-updates).\n- Short answers to common questions are in our [answers section](/answers/uk-student-visa-bank-balance-nepal)."
    },
    {
      "heading": "Start with a free conversation",
      "body": "You can [book a free consultation](/register), read our [step-by-step checklist for studying abroad from Nepal](/study-abroad-from-nepal), or learn about our [visa assistance](/visa-assistance-for-study-abroad) and [scholarship assistance](/scholarship-assistance-in-nepal)."
    }
  ],
  "featuredImage": {
    "url": "/images/blog/accreditation-and-results.webp",
    "alt": "Admizz Education: ICEF-accredited agency helping students since 2015"
  },
  "categories": [
    {
      "slug": "study-abroad",
      "title": "Study Abroad"
    },
    {
      "slug": "nepal",
      "title": "Nepal"
    }
  ],
  "infoBox": [
    {
      "label": "Helping students since",
      "value": "2015"
    },
    {
      "label": "Accreditation",
      "value": "ICEF-accredited agency"
    },
    {
      "label": "Students enrolled worldwide",
      "value": "2,000+"
    },
    {
      "label": "Partner institutions",
      "value": "100+ across 12+ countries"
    }
  ],
  "publishedAt": "2026-10-05T00:00:00.000Z",
  "updatedAt": "2026-10-05T00:00:00.000Z",
  "description": "Facts about Admizz Education: an ICEF-accredited agency helping students apply abroad since 2015, with 2,000+ students enrolled and 100+ partner institutions.",
  "quickAnswer": "Admizz Education is an ICEF-accredited study abroad agency that has helped students apply to universities abroad since 2015. It has enrolled 2,000+ students worldwide, works with 100+ partner institutions across 12+ countries, and publishes guides that are checked against official government sources and dated.",
  "faqItems": [
    {
      "question": "Is Admizz Education ICEF accredited?",
      "answer": "Yes. Admizz Education is an ICEF-accredited agency, and the ICEF badge is shown in the footer of our website."
    },
    {
      "question": "How many students has Admizz Education enrolled?",
      "answer": "Admizz Education has enrolled 2,000+ students worldwide."
    },
    {
      "question": "Does Admizz Education guarantee a visa?",
      "answer": "No. Only the immigration authority decides a visa, so we never guarantee approval. We help you prepare accurate documents and check them against the official rules."
    },
    {
      "question": "Which countries does Admizz Education cover?",
      "answer": "Admizz Education works with 100+ partner institutions across 12+ countries, including the UK, USA, Canada, Australia, New Zealand, Germany, France, Finland and India."
    }
  ],
  "path": "/accreditation-and-results"
};

export const metadata: Metadata = {
  title: "Admizz Education: Accreditation, Experience & Results",
  description: "Facts about Admizz Education: an ICEF-accredited agency helping students apply abroad since 2015, with 2,000+ students enrolled and 100+ partner institutions.",
  alternates: { canonical: "https://admizzeducation.com/accreditation-and-results" },
  openGraph: {
    title: "Admizz Education: Accreditation, Experience & Results",
    description: "Facts about Admizz Education: an ICEF-accredited agency helping students apply abroad since 2015, with 2,000+ students enrolled and 100+ partner institutions.",
    url: "https://admizzeducation.com/accreditation-and-results",
    siteName: "Admizz Education",
    type: "article",
    images: ["/images/blog/accreditation-and-results.webp"],
  },
};

export default function Page() {
  return <GeneratedBlogPost {...post} />;
}

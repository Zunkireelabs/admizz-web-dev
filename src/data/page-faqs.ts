// Visible FAQs (with matching FAQPage schema, via the shared <FAQ> component) for index-style pages:
// the blog index, the destination quiz and category pages. Every answer either describes how the page
// itself works or restates a fact that is already in one of our checked guides (official source linked
// in that guide). Facts that change are dated "as of" so they read correctly after the date passes.
// Checked in November 2026.
import type { FAQItem } from "@/components/ui/FAQ";

export const blogIndexFaqs: FAQItem[] = [
  {
    question: "What does the Admizz Education blog cover?",
    answer:
      "Guides for students from Nepal who want to study abroad: visa rules, costs and proof of funds, scholarships, English tests, the NOC and bank steps in Nepal, and country and university guides for the UK, USA, Canada, Australia, New Zealand and more.",
  },
  {
    question: "How do I find guides for one country or topic?",
    answer:
      "Use the category links on each post, such as UK, USA, Australia, Scholarships or Visa Guides, to see every guide on that topic.",
  },
  {
    question: "How current are the guides?",
    answer:
      "Newer guides link the official government or university pages they use and end with the month they were checked. Rules, fees and deadlines change, so confirm each one on the official website before you apply. Older posts may be out of date.",
  },
  {
    question: "Can I get advice on my own case?",
    answer:
      "Yes. Admizz Education offers a free consultation, and you can book it from the Register page.",
  },
];

export const destinationQuizFaqs: FAQItem[] = [
  {
    question: "How does the study abroad destination quiz work?",
    answer:
      "You answer three questions: what you want to study, what kind of place you want to live in, and your budget. You then enter your name, email and phone number to see the country that matches your answers, with a match score.",
  },
  {
    question: "Which countries can the quiz suggest?",
    answer:
      "The quiz matches you to one of six destinations: the United Kingdom, the United States, Canada, Australia, Germany or New Zealand.",
  },
  {
    question: "Is the quiz free?",
    answer: "Yes. It is free and takes about a minute.",
  },
  {
    question: "Why does the quiz ask for my contact details?",
    answer:
      "The quiz asks for your name, email and phone number before it shows your result, and the details are sent to Admizz Education along with your answers.",
  },
  {
    question: "How accurate is the match?",
    answer:
      "It is a starting point based on three answers. It does not check your grades, English score, funds or visa eligibility, so compare the countries in detail and confirm entry rules on official websites before you decide.",
  },
];

// Category pages. Keys are category slugs from src/content/blog/categories.json.
export const categoryFaqs: Record<string, FAQItem[]> = {
  "visa-guides": [
    {
      question: "Where do these visa guides get their information?",
      answer:
        "Newer guides link the official government pages they use and state the month they were checked. Visa rules change often, so confirm on the official website before you apply.",
    },
    {
      question: "Can I apply for an Australian student visa from inside Australia?",
      answer:
        "Only in limited cases. Home Affairs says that from October 2, 2026, most Student visa applications must be lodged outside Australia, and you can apply in Australia only if you hold an eligible visa and meet an exemption category.",
    },
    {
      question: "Did the US replace Duration of Status for F-1 students?",
      answer:
        "No. DHS published a rule to replace it with fixed admission periods, but a federal court postponed the rule on September 14, 2026 and vacated it on November 16, 2026, so it never took effect. An appeal of the earlier postponement is pending.",
    },
    {
      question: "Do I need an NOC to send tuition abroad from Nepal?",
      answer:
        "Yes. Nepal Rastra Bank's circular asks for the Ministry of Education's No Objection Letter, stamped as the bank copy for first-time exchange, before a bank provides foreign currency for study.",
    },
  ],
  "for-nepalese-students": [
    {
      question: "What can I find in the guides for Nepali students?",
      answer:
        "Country and visa guides, costs and proof of funds, scholarships, English tests, and the steps inside Nepal such as the NOC and sending tuition through a bank.",
    },
    {
      question: "How do I apply for the NOC to study abroad?",
      answer:
        "The Ministry of Education's notice from August 2026 says the whole NOC application is online, on the portal at noc.moest.gov.np, and that obtaining the NOC afterward can involve both online and physical steps. The portal lists Taiwan and Mauritius as restricted countries.",
    },
    {
      question: "Which scholarships are open to Nepali students?",
      answer:
        "Examples covered in our guides are the Global Korea Scholarship (4 Embassy Track graduate places for Nepal in 2026), Chevening (applications for 2027/28 are closed), the Embassy of India's COMPEX scheme for undergraduate study in India, and ICCR schemes. Each has its own dates, so check the official notice.",
    },
    {
      question: "Can I send tuition abroad through any bank?",
      answer:
        "The first exchange is arranged with your NOC bank copy. From the second exchange onward, the circular says it must come from the same bank that provided the first one.",
    },
  ],
  australia: [
    {
      question: "How much money do I need to show for an Australian student visa?",
      answer:
        "As of November 19, 2026, the Home Affairs Student visa page lists AUD 29,710 for 12 months of living costs for the student, AUD 10,394 for a partner and AUD 4,449 for a child.",
    },
    {
      question: "Is Australia changing its student visa funds rules?",
      answer:
        "Home Affairs has asked for feedback on possible changes to the Genuine Student assessment and to financial capacity rules, with a submission deadline of November 23, 2026. As of November 19, 2026, it says no decisions have been made.",
    },
    {
      question: "Can students bring family on an Australian student visa?",
      answer:
        "Home Affairs says that from October 2, 2026, most Student visa applicants can no longer include family members. Check the exemption groups on its page before you plan.",
    },
  ],
  scholarships: [
    {
      question: "When did COMPEX 2026-27 applications close?",
      answer:
        "The Embassy of India's notification opened the portal on August 27, 2026. Online registration closed on September 10 and the final application with the fee challan closed on September 16, 2026. The exam was held in Kathmandu from September 28 to October 3, 2026.",
    },
    {
      question: "Is the 2027 Global Korea Scholarship graduate round open for Nepal?",
      answer:
        "We found no 2027 graduate notice on the Korean Embassy in Nepal's notice board as of November 19, 2026. The 2026 round ran from February 12 to February 25, 2026.",
    },
    {
      question: "Are Chevening applications open for Nepal?",
      answer:
        "Chevening says applications for 2027/28 are closed and to watch its channels for the next round. Applicants need at least two years of work experience, equivalent to 2,800 hours.",
    },
    {
      question: "Do I need an agent to apply for a scholarship?",
      answer:
        "No. Chevening says you do not need to pay anyone to apply, and the Embassy of India says it does not receive applications through consultants or agencies. The Embassy's COMPEX scheme does charge a fee of NPR 400, paid by bank challan to the Embassy.",
    },
  ],
  "pr-and-migration": [
    {
      question: "What do the migration guides cover?",
      answer:
        "Pathways that start with study abroad, such as post-study work visas and the steps toward permanent residence in the UK and other countries. Rules change, so each guide points you to the official source.",
    },
    {
      question: "Where should I check migration rules?",
      answer:
        "Use the official government site of the country, such as GOV.UK for the UK or Immigration New Zealand for New Zealand, and treat our guides as a summary with a checked-in date.",
    },
  ],
  "new-zealand": [
    {
      question: "How many hours can international students work in New Zealand?",
      answer:
        "Immigration New Zealand says that from November 3, 2025, students on a 20-hour visa can apply for a variation of conditions to increase their work rights to 25 hours a week. The variation fee was listed as NZD 325.",
    },
    {
      question: "When does the New Zealand Short-term Graduate Work Visa open?",
      answer:
        "Immigration New Zealand postponed the launch from November 16 to November 23, 2026, because of the global Microsoft outage on November 13. The visa page still showed applications closed on November 19, so check it before you apply.",
    },
  ],
};

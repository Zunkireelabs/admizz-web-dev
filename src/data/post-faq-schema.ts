// FAQPage schema (schema only, no visible markup) for Sanity posts that already
// show the same questions in their body but carry no faqItems, so no FAQPage
// structured data was being emitted. Keyed by post slug. Each entry copies the
// question and answer text that is already visible in that post's own body —
// nothing here is invented. Never use this for a post whose body has no
// visible FAQ: schema must always match visible content.
export interface PostFaqSchemaItem {
  question: string;
  answer: string;
}

export const postFaqSchemaOnly: Record<string, PostFaqSchemaItem[]> = {
  "7-common-reasons-why-student-visas-get-rejected-for-nepali-students": [
    {
      question: "Can I reapply after a student visa rejection?",
      answer: "Yes, in most cases, you can reapply. However, it’s essential to understand the specific reason for the rejection and address it before submitting a new application.",
    },
    {
      question: "How long should I wait before reapplying?",
      answer: "This depends on the country and the reason for rejection. In some cases, you can reapply immediately; in others, you may need to wait a specified period. Consulting an education expert is strongly recommended before reapplying.",
    },
    {
      question: "Does a student visa rejection affect future visa applications?",
      answer: "A rejection itself doesn’t automatically disqualify you from future applications, but you must disclose it. Failing to disclose prior rejections can have serious consequences.",
    },
    {
      question: "How can Admizz Education help with my visa application?",
      answer: "Admizz Education provides end-to-end support — including course selection, university applications, SOP writing, document preparation, and visa application guidance — to maximise your chances of success.",
    },
  ],
  "gpa-required-study-uk-from-nepal-2027": [
    {
      question: "Can I study in the UK with a 2.0 GPA after +2?",
      answer: "Some universities accept lower grades, especially through foundation or pathway routes, but options narrow. Check each course page.",
    },
    {
      question: "Do backlogs affect a UK application?",
      answer: "They can. Many universities want backlogs cleared, so check requirements and explain them in your application.",
    },
    {
      question: "Is IELTS needed on top of good grades?",
      answer: "Usually yes, or an accepted alternative. See our guide on studying without IELTS.",
    },
  ],
  "total-cost-studying-uk-from-nepal-2027": [
    {
      question: "What is the Education Tax (3%) when sending money to UK for studies?",
      answer: "The Nepal government charges a 3% tax on foreign exchange remittances sent abroad for education. When you transfer your tuition fee through a Nepali bank, this tax is deducted at source. For a £14,000 annual tuition, the tax is £420 (approximately NPR 85,638). This applies each year tuition is remitted — so UG students pay it 3 times and PG students pay it once.",
    },
    {
      question: "Is the IHS (Insurance Payment) paid every year or once?",
      answer: "The IHS is paid as a single lump sum upfront at the time of your visa application — covering the entire duration of your visa. For a 1-year Master's (visa of about 16 months, charged as 1.5 years), you pay £1,164 once (NPR 2,37,339). For a 3-year Bachelor's (visa of about 40 months, charged as 3.5 years), you pay £2,716 once (NPR 5,54,064). You do not pay it again each year — just once before your visa is granted.",
    },
    {
      question: "How much money do I need to show in my bank account for the UK visa?",
      answer: "You must show your remaining first-year tuition fees (after your CAS deposit) plus living cost evidence — £10,539 (NPR ~21.5 Lakhs) if studying outside London, or £13,761 (NPR ~28.1 Lakhs) if studying in London. For applications from November 30, 2026, these rise to £10,827 (NPR ~22.1 Lakhs) and £14,130 (NPR ~28.8 Lakhs). These funds must be held for 28 consecutive days before your application date. An education loan sanctioned letter from your bank is accepted in place of personal savings.",
    },
    {
      question: "Is a 1-year Master's or a 3-year Bachelor's better value from Nepal?",
      answer: "For most Nepali students, the 1-year Master's is significantly better value. Fixed costs are NPR 33.6 Lakhs compared to NPR 95.6 Lakhs for a 3-year bachelor's — and living costs are one third as long. The UK's Graduate Route then provides 18 months of open work rights after your master's (for applications from January 1, 2027), making the total time in the UK roughly 2.5 years for a fraction of the cost. For students completing a bachelor's in Nepal first and then pursuing a UK Master's, this is by far the most cost-efficient pathway.",
    },
  ],
  "uk-graduate-route-visa-2026": [
    {
      question: "Can Nepali students apply for the Graduate Route visa?",
      answer: "Yes. The Graduate Route is open to all nationalities, including Nepali students, provided you completed an eligible degree at a Home Office-approved UK university while holding a valid Student visa and you are applying from inside the UK.",
    },
    {
      question: "Do I need a job offer to apply for the Graduate Route?",
      answer: "No. This is one of the biggest advantages of the Graduate Route for Nepali graduates. You do not need a job offer, employer sponsorship, or a minimum salary to apply. You can work in any role while searching for the right opportunity.",
    },
    {
      question: "What is the Graduate Route fee in Nepali Rupees?",
      answer: "From April 8, 2026, the fee is £937. Based on current exchange rates, this is approximately NPR 1,55,000–1,62,000, though you should check the latest rate at the time of your application. The Immigration Health Surcharge is paid separately.",
    },
    {
      question: "I am finishing my Master's in late 2026. Will I get 2 years or 18 months?",
      answer: "It depends on when your visa is granted — not when you apply. If it is granted on or before December 31, 2026, you receive two years. Since processing takes roughly 8 weeks, you should apply as soon as your university notifies the Home Office of your completion, ideally no later than October or early November 2026.",
    },
    {
      question: "Can I bring my family to the UK on the Graduate Route?",
      answer: "Your partner and children can apply to remain in the UK on the Graduate Route — but only if they are already in the UK as dependants on your Student visa. New dependants cannot join you once you are on the Graduate Route. Make sure your family members apply before your Student visa expires.",
    },
    {
      question: "Can I extend my Graduate Route visa?",
      answer: "No. The Graduate Route cannot be extended under any circumstances. Once it expires, you must switch to another visa — typically the Skilled Worker visa — or leave the UK. This is why planning your career transition from the very beginning of your post-study stay is so important.",
    },
    {
      question: "Does the Graduate Route lead to permanent residence (ILR)?",
      answer: "Not directly. However, it is a strong stepping stone to the Skilled Worker visa, which does count toward the qualifying period for Indefinite Leave to Remain (ILR). Most Nepali graduates who settle long-term in the UK follow the path: Graduate Route → Skilled Worker → ILR.",
    },
    {
      question: "What IELTS score do I need to study in the UK as a Nepali student?",
      answer: "Requirements vary by university and course level, but most UK universities require an IELTS Academic score of 6.0–6.5 overall for undergraduate programs and 6.5–7.0 for postgraduate. From 2026, the English standard for visa purposes is set at CEFR B2. Always check the specific requirements of your chosen university and course.",
    },
  ],
  "uk-intake-timeline-Nepalese-students-2027": [
    {
      question: "What is the best intake for the UK from Nepal?",
      answer: "September is usually best for choice and scholarships. January suits students who are ready sooner.",
    },
    {
      question: "How early can I apply for a UK student visa?",
      answer: "Up to 6 months before your course starts.",
    },
    {
      question: "Can I start in May?",
      answer: "Some universities start in May, but courses are limited. Check your chosen university.",
    },
  ],
  "us-f1-september-15-deadline-2026": [
    {
      question: "Does the September 15 rule affect students already studying in the US on D/S status?",
      answer: "Your existing D/S status is not cancelled on September 15. However, if you travel internationally and re-enter after September 15, you will receive a new I-94 with a fixed end date — not D/S. Contact your university's international student office for guidance specific to your situation before you travel.",
    },
    {
      question: "What happens if my program takes longer than 4 years?",
      answer: "You must apply to USCIS for an extension before your I-94 end date passes. This is a formal immigration application — unlike the old DSO approval, it involves fees, documentation, processing time, and is not guaranteed. PhD students should start planning this well in advance.",
    },
    {
      question: "Is it safe to travel internationally after September 15?",
      answer: "Travel is not banned — but re-entering the US after September 15 means your new I-94 will show a fixed end date, not D/S. Before booking any international flights for after September 15, speak to your DSO first to understand how re-entry affects your specific stay period.",
    },
    {
      question: "Should I still apply to study in the US given these changes?",
      answer: "For a 1–2 year master's or 4-year bachelor's, the new rules create no real problem. For PhD students, the 4-year limit adds genuine uncertainty. The US still offers the highest STEM salaries and most prestigious research universities — but the flexibility that made it work for many students has reduced significantly. Speak to an Admizz advisor to compare your options honestly.",
    },
  ],
  "study-in-europe-from-nepal": [
    {
      question: "Which European countries are best for Nepali students?",
      answer: "Germany, Netherlands, Sweden, Finland, and Ireland are ideal due to low tuition, quality education, and post-study work options.",
    },
    {
      question: "Can Nepali students get scholarships in Europe?",
      answer: "Yes. Scholarships like Erasmus Mundus, DAAD, KTH, and Radboud are available.",
    },
    {
      question: "How much does it cost to study in Europe from Nepal?",
      answer: "Tuition ranges from €0–€20,000/year. Living expenses are approximately €700–€1,500/month.",
    },
    {
      question: "Do I need IELTS to study in Europe?",
      answer: "Most universities require IELTS or TOEFL. Some accept a Medium of Instruction certificate if your prior education was in English.",
    },
    {
      question: "How long can Nepali students work in Europe after graduation?",
      answer: "Many countries allow 1–3 years of post-study work visas.",
    },
    {
      question: "Can I work part-time while studying in Europe?",
      answer: "Yes, most countries allow 20 hours/week during semesters and full-time during vacations.",
    },
  ],
  "study-in-the-uk-from-nepal-2026-complete-guide": [
    {
      question: "How much does it cost to study in the UK from Nepal?",
      answer: "Total annual costs range from £15,000 to £50,000, including tuition and living expenses, depending on the course and location.",
    },
    {
      question: "Do I need to show financial proof?",
      answer: "Yes, you must demonstrate the ability to pay the first year's tuition plus 9 months of living costs.",
    },
    {
      question: "Which intake is better – September or January?",
      answer: "The September (Fall) intake has more course options and scholarship opportunities, but the January intake offers faster enrollment.",
    },
    {
      question: "Can I bring my family?",
      answer: "Postgraduate students in courses lasting 9+ months can bring dependents, subject to financial requirements.",
    },
    {
      question: "Can I work while studying in the UK?",
      answer: "Yes, Student visa holders can work up to 20 hours per week during term and full-time during holidays.",
    },
  ],
  "why-choose-the-uk-for-higher-education-a-complete-guide-for-nepalese-students": [
    {
      question: "Why do Nepali students prefer the UK for higher education?",
      answer: "Nepali students choose the UK for its global degree recognition, quality education, scholarships, and post-study work visa opportunities.",
    },
    {
      question: "Is studying in the UK affordable for students from Nepal?",
      answer: "Yes. With one-year master’s programs, scholarships, and part-time work options, studying in the UK is affordable for many Nepali students.",
    },
    {
      question: "Can Nepali students work while studying in the UK?",
      answer: "Absolutely. Students can work up to 20 hours per week during semester time and full-time during holidays.",
    },
    {
      question: "What is the benefit of the UK PSW visa?",
      answer: "The PSW visa allows students to stay and work in the UK for two years after graduation, gaining valuable international experience.",
    },
  ],
  "form-i-20-your-essential-guide-to-studying-in-the-usa": [
    {
      question: "How long does it take to get an I-20?",
      answer: "Processing times vary by school and time of year, typically from a few days to several weeks after you submit all required documents.",
    },
    {
      question: "Can I apply for a visa with a copy of my I-20?",
      answer: "While some consulates might accept a digital copy in rare cases, always strive to have the original physical Form I-20 for your visa interview.",
    },
    {
      question: "What if I lose my Form I-20?",
      answer: "Contact your DSO immediately for a replacement. Do this before attempting to re-enter the U.S. if you are abroad.",
    },
    {
      question: "Is an I-20 the same as a visa?",
      answer: "No, the I-20 certifies your eligibility to study, while the visa allows you to request entry into the U.S.",
    },
    {
      question: "Do my dependents need to pay the SEVIS fee?",
      answer: "No, only the primary F-1 or M-1 student is required to pay the I-901 SEVIS fee.",
    },
  ],
  "uk-it-graduate-jobs-visa-careers-2026": [
    {
      question: "Can I apply for the Graduate Route visa if I studied outside London?",
      answer: "Yes — the Graduate Route visa is available to graduates of any registered UK university, regardless of location. The 2-year entitlement (3 years for PhD) applies equally whether you studied in London, Manchester, Edinburgh, or Birmingham. Your city of study does not affect your Graduate Route eligibility or duration.",
    },
    {
      question: "What is the graduate employment rate for IT students at UK universities?",
      answer: "According to the UK Graduate Outcomes survey, approximately 85–90% of computing and IT graduates are in employment or further study 15 months after graduating. Students who completed a placement year or internship during their degree consistently achieve higher employment rates and starting salaries than those without industry experience.",
    },
    {
      question: "Does a placement year extend my UK student visa?",
      answer: "Yes — if your course includes an integrated placement year, your CAS will reflect the full course duration including the placement year, and your student visa will be issued accordingly. Your placement is part of your degree program and your student visa covers you for the entire period. You do not need a separate work visa for an authorized placement year integrated into your degree.",
    },
  ],
  "study-in-the-uk-after-2-from-nepal-complete-2025-guide": [
    {
      question: "Can I study in the UK directly after completing +2 from Nepal?",
      answer: "Yes. Nepali students who have completed their +2 (NEB or A-Level equivalent) with a minimum of 50–60% marks are eligible to apply for UK undergraduate programs directly through UCAS. Some universities may ask for subject-specific prerequisites depending on your chosen course.",
    },
    {
      question: "What IELTS score do I need to study in the UK from Nepal?",
      answer: "Most UK universities require an overall IELTS Academic score of 6.0 to 6.5, with no individual band below 5.5 or 6.0. Top universities such as UCL, LSE, or Edinburgh may require 7.0 or higher. Always check the specific requirements of your chosen university and course.",
    },
    {
      question: "How much money do I need to show for a UK student visa from Nepal?",
      answer: "You must show proof of funds covering your full first-year tuition fee plus living costs — GBP 1,334 per month for up to 9 months if studying in London, or GBP 1,023 per month outside London. These funds must have been held in your bank account for at least 28 consecutive days before your visa application.",
    },
    {
      question: "Can Nepali students work while studying in the UK?",
      answer: "Yes. UK Student Visa holders are permitted to work up to 20 hours per week during term time and full-time during official university holidays. This can meaningfully contribute to living expenses, though it should not be relied upon to cover tuition costs.",
    },
    {
      question: "Is the Chevening Scholarship available for Nepali students?",
      answer: "Yes. Nepal is an eligible country for the Chevening Scholarship. However, it is postgraduate only (one-year master's programs), fully funded, and highly competitive. It also requires a minimum of two years of work or leadership experience. Applications typically open in August and close in November each year.",
    },
  ],
  "new-zealand-short-term-graduate-work-visa-2026": [
    {
      question: "When can I apply for the New Zealand Short-Term Graduate Work Visa?",
      answer: "Applications open on November 16, 2026, as confirmed by Immigration New Zealand on May 29, 2026. You must apply within 3 months of your New Zealand student visa expiring. If your student visa has already expired before November 16, 2026, you will not be able to apply retroactively — the visa is available only to graduates whose student visas are still valid or who are within the 3-month window after expiry on or after the launch date.",
    },
    {
      question: "What is the difference between the Short-Term Graduate Work Visa and the Post Study Work Visa?",
      answer: "The Post Study Work Visa (PSWV) provides 1–3 years of open work rights and is available to graduates of NZQCF Level 7 bachelor's degrees and above. It also allows holders to support partners and dependent children. The Short-Term Graduate Work Visa is a new, shorter visa — 6 months only, non-extendable — for graduates of NZQCF Level 5–7 qualifications that do not qualify for the PSWV. It cannot support partner or dependent child visas.",
    },
    {
      question: "Can I apply for a second Short-Term Graduate Work Visa if I study again?",
      answer: "No — the Short-Term Graduate Work Visa is a once-in-a-lifetime visa. You cannot apply for a second one under any circumstances. If you wish to study again in New Zealand after holding this visa, your new qualification must be a bachelor's degree or higher-level program that makes you eligible for a Post Study Work Visa — and you must not have previously held a Post Study Work Visa either.",
    },
    {
      question: "Does the Short-Term Graduate Work Visa lead to permanent residency in New Zealand?",
      answer: "Not directly — but it can be the first step. During your 6-month Short-Term Graduate Work Visa, your goal should be to secure employment with an accredited employer who can sponsor your Accredited Employer Work Visa (AEWV). Once on the AEWV, if your role is listed on New Zealand's Green List Tier 1, you may be able to apply for permanent residency through the Residence from Work pathway.",
    },
  ],
  "study-in-the-usa-for-nepali-students-f-1-visa-scholarships-work-opportunities": [
    {
      question: "Is IELTS mandatory to study in the USA from Nepal?",
      answer: "Not always. Some universities accept Duolingo or waive English tests based on academic background.",
    },
    {
      question: "What bank balance is required for a US student visa?",
      answer: "Typically, students must show one year of tuition + living expenses as per the I-20.",
    },
    {
      question: "Can Nepali students work in the USA while studying?",
      answer: "Yes, students can work part-time on-campus and apply for CPT and OPT.",
    },
    {
      question: "Is the USA good for PR after studies?",
      answer: "While the USA doesn’t offer direct PR, students can explore H-1B work visas and employer-sponsored pathways .",
    },
    {
      question: "How long does the US visa process take in Nepal?",
      answer: "Usually 4–8 weeks, depending on interview slots and documentation readiness.",
    },
  ],
  "what-to-expect-academically-the-uk-universities": [
    {
      question: "How many days per week do I attend university in the UK?",
      answer: "Most IT students attend university 3–4 days per week for scheduled classes, with the remaining time spent on independent study and assignments. Your specific timetable will be confirmed by your university before term begins. Some universities concentrate teaching on fewer days to give students flexibility for part-time work or extended project time.",
    },
    {
      question: "What happens if I miss too many classes?",
      answer: "UK universities are required to monitor international student attendance as a visa compliance obligation. If your attendance falls below the minimum threshold — usually 80–85% — your university may report this to UK Visas and Immigration, which can trigger a review of your visa status. Always inform your international student office if you are unwell or have a genuine reason for absence, and obtain formal authorization where possible.",
    },
    {
      question: "Are UK university rankings reliable for choosing an IT program?",
      answer: "Global rankings are a useful starting point but do not tell the whole story. For IT specifically, also check the National Student Survey satisfaction scores, graduate employment rates, industry placement records, and whether the university has partnerships with major technology employers. A well-connected university with strong industry links can be more valuable for your career than a higher-ranked institution with fewer placement opportunities.",
    },
  ],
  "australia-assessment-level-3-nepal-2026": [
    {
      question: "Does Assessment Level 3 mean my Australia visa will be rejected?",
      answer: "No — Assessment Level 3 does not mean automatic rejection. It means every document in your application will be manually reviewed by a case officer with maximum scrutiny. Genuine students with strong financial evidence, valid English scores, a logical course choice, and a well-written Genuine Student statement are still receiving visas in 2026.",
    },
    {
      question: "How much money do I need to show for an Australian student visa as a Nepali student in 2026?",
      answer: "You must demonstrate access to AUD 29,710 for one year of living costs, plus your full first-year tuition fees (typically AUD 20,000–45,000 depending on the course), plus approximately AUD 2,000–4,000 in travel costs. The total typically ranges from AUD 55,000 to AUD 65,000 — approximately NPR 60–70 lakhs. These funds must be held for at least 6 months in a recognized commercial bank and must have a clear, documented source.",
    },
    {
      question: "What is the Genuine Student (GS) requirement and how is it different from the old GTE?",
      answer: "The Genuine Student (GS) requirement replaced the old GTE (Genuine Temporary Entrant) test in 2025. While the GTE focused on proving you intended to leave Australia temporarily, the GS focuses specifically on whether you are a genuine student — meaning your course choice is logical, your academic background supports it, your career plan is realistic, and your ties to Nepal are credible.",
    },
    {
      question: "Does applying to a better-ranked university improve my visa chances under Level 3?",
      answer: "Yes — directly. Under Australia's Simplified Student Visa Framework, your total risk rating combines your country level (Nepal is Level 3) and your education provider's level (Level 1, 2, or 3). Applying to a Level 1 institution — which includes Group of Eight universities and most major public universities — reduces your combined risk rating and can result in smoother processing.",
    },
  ],
  "ielts-requirement-for-studying-in-the-uk-from-nepal": [
    {
      question: "1. Is IELTS mandatory for studying in the UK from Nepal?",
      answer: "Most UK universities require IELTS, but some may accept alternatives like PTE, TOEFL, or MOI. Check with our counselors at Admizz.",
    },
    {
      question: "2. What is the IELTS score for a UK student visa?",
      answer: "You need a minimum of 5.5 overall in IELTS (Academic) for a standard UK Student Visa (CEFR B2 level).",
    },
    {
      question: "3. Can I study in the UK without IELTS?",
      answer: "Yes, some universities offer IELTS waivers if you’ve studied in English or take internal language tests. Contact Admizz Education for updated options. Final Thoughts The IELTS test opens doors to top universities in the UK. With the right preparation and expert guidance from Admizz Education , you can meet the language requirements and start your academic journey in the UK with confidence.",
    },
  ],
  "step-by-step-guide-to-australia-student-visa-from-nepal": [
    {
      question: "What is Australia's Assessment Level 3, and how does it affect Nepali students?",
      answer: "Assessment Level 3 is the highest risk tier under Australia's Simplified Student Visa Framework (SSVF), effective January 8, 2026 for Nepali students. It now requires mandatory English proficiency scores for all applicants, 3–6 months of verifiable bank statements, a detailed and personalized Genuine Student (GS) statement, and in some cases a phone or in-person interview. Genuine, well-prepared applicants continue to be approved every day.",
    },
    {
      question: "How much bank balance do I need for Australia student visa from Nepal in 2026?",
      answer: "You must demonstrate access to a minimum of AUD 29,710 for living expenses, plus your full first-year tuition fees, plus return travel costs of approximately AUD 2,500–4,000. For most courses, this means a total of AUD 55,000–70,000. If your spouse is accompanying you, add AUD 10,394. For each child, add AUD 4,449.",
    },
    {
      question: "What is the Genuine Student (GS) statement and why is it so important in 2026?",
      answer: "The Genuine Student (GS) statement replaced the old Genuine Temporary Entrant (GTE) requirement in 2024. It is answered directly within the ImmiAccount visa application form using structured questions. Under Assessment Level 3, a weak, vague, or copied GS statement is one of the leading causes of visa refusal, even when finances and academic records are strong.",
    },
    {
      question: "How long does Australia student visa processing take from Nepal in 2026?",
      answer: "Under Assessment Level 3, processing times from Nepal typically range from 4 to 12 weeks after lodgement, though complex cases may take longer. To be safe, apply at least 4–6 months before your intended course start date. Applying fewer than 3 months before your intake under Level 3 is a significant risk.",
    },
    {
      question: "Can I work in Australia on a student visa?",
      answer: "Yes. The Subclass 500 student visa allows you to work up to 48 hours per fortnight (approximately 24 hours per week) during official semester periods, and unlimited hours during scheduled course breaks, such as summer vacation or semester breaks.",
    },
    {
      question: "What is CRICOS and why does my institution need to be registered on it?",
      answer: "CRICOS stands for the Commonwealth Register of Institutions and Courses for Overseas Students. It is the Australian government's database of every institution and course approved to enroll international students. Only courses and institutions listed on the CRICOS register are eligible for the Subclass 500 visa. You can search the register at cricos.education.gov.au.",
    },
  ],
  "cost-studying-london-vs-outside-london-2026": [
    {
      question: "Is studying outside London significantly cheaper?",
      answer: "Yes — meaningfully so. Living costs outside London are typically 30–40% lower, driven primarily by rent. A shared room in Manchester or Leeds costs £450–£700/month compared to £700–£1,200 in London. Over a three-year degree, the difference in living expenses alone can reach £15,000–£25,000.",
    },
    {
      question: "Do UK universities guarantee accommodation for first-year international students?",
      answer: "Most UK universities guarantee university-managed accommodation for first-year international students, provided you accept your offer and submit your accommodation application by the specified deadline. This guarantee does not extend beyond Year 1 at most universities.",
    },
    {
      question: "Can part-time work cover my living costs in the UK?",
      answer: "Partially. Working 20 hours per week at UK minimum wage generates around £880–£950 gross per month during term. Outside London this can cover 70–90% of monthly living costs. In London, part-time earnings cover a smaller proportion. Family financial support or savings are typically needed alongside part-time work.",
    },
  ],
  "ielts-vs-toefl-which-english-proficiency-test-is-right-for-you": [
    {
      question: "Are online classes available?",
      answer: "Yes, both online and offline training options are available.",
    },
    {
      question: "Can I retake the exam?",
      answer: "Yes, both exams can be retaken multiple times.",
    },
  ],
  "uk-faq-study-guide-for-international-students": [
    {
      question: "When should I start my UK university application?",
      answer: "Start as early as possible. Most postgraduate courses begin in September or October, with application deadlines in June or July — but intake windows can open as early as March. High-demand fields like health sciences and business fill up fast, so applying the moment the window opens is strongly recommended.",
    },
    {
      question: "What is a CAS and why do I need it?",
      answer: "CAS stands for Confirmation of Acceptance for Studies — a unique reference number issued by your university once you accept an unconditional offer. You must have a CAS before you can apply for your UK Student visa. Without it, your application cannot proceed.",
    },
    {
      question: "How many hours can I work while studying?",
      answer: "Students at degree level or above can work up to 20 hours per week during term time. Those studying below degree level are limited to 10 hours per week. During vacation periods, full-time work is permitted.",
    },
  ],
  "study-in-south-korea-from-nepal-your-complete-guide-to-gks-scholarship-tech-opportunities": [
    {
      question: "Can I work while studying in South Korea?",
      answer: "Yes, international students can work part-time up to 20 hours per week after completing six months of study.",
    },
    {
      question: "How competitive is the GKS Scholarship?",
      answer: "The acceptance rate is approximately 5-10%. However, with strong academics and proper guidance from Admizz Education, your chances improve significantly.",
    },
    {
      question: "Is IELTS mandatory for Korean universities?",
      answer: "For English-taught programs, yes. Most universities require IELTS 5.5-6.5 or equivalent TOEFL scores.",
    },
    {
      question: "Can I bring my family to South Korea?",
      answer: "Graduate students can apply for dependent visas for their spouse and children after arrival.",
    },
    {
      question: "What are job prospects after graduation?",
      answer: "Excellent, especially in technology sectors. Many graduates secure positions in Korean multinational companies or return to Nepal with enhanced career prospects.",
    },
  ],
  "ultimate-guide-australia-study": [
    {
      question: "Is Australia good for Nepali students?",
      answer: "Yes, Australia offers quality education, work rights, post-study visas, and PR opportunities, making it ideal for Nepali students.",
    },
    {
      question: "What are the requirements to study in Australia from Nepal?",
      answer: "You need academic qualifications, English proficiency (IELTS/PTE), financial proof, a CoE, and a student visa.",
    },
    {
      question: "How much does it cost to study in Australia from Nepal?",
      answer: "The total cost ranges from AUD 35,000 to 55,000 per year, including tuition and living expenses.",
    },
    {
      question: "Can Nepali students work while studying in Australia?",
      answer: "Yes, students can work 48 hours per fortnight during study and unlimited hours during holidays.",
    },
    {
      question: "What is the post-study work visa duration?",
      answer: "Depending on your qualification, you can stay and work in Australia for 2 to 6 years after graduation.",
    },
    {
      question: "How long does the student visa process take?",
      answer: "Visa processing usually takes 4–8 weeks, depending on documentation and case complexity.",
    },
  ],
  "survival-guide-international-students-uk-2026": [
    {
      question: "Does my university provide airport pickup when I arrive in the UK?",
      answer: "Many UK universities offer an airport welcome or pickup service for new international students during the main September and January intake periods. This is usually bookable through your university's international student office 4–6 weeks before your arrival. Spaces are limited, so book as soon as you confirm your travel dates.",
    },
    {
      question: "How cold does it get in the UK — what should I pack?",
      answer: "UK winters are cold and grey, with temperatures regularly dropping to 2–5°C from November through February. Pack a high-quality waterproof jacket, thermal underlayers, and waterproof shoes. The bigger adjustment is the limited winter daylight — as few as 8 hours per day. A daylight lamp (£25–£40) is genuinely helpful for maintaining energy and mood during the darker months.",
    },
    {
      question: "Is there a Nepali community at most UK universities?",
      answer: "Yes — the UK has one of the largest Nepali diaspora communities in the Western world, with over 13,000 Nepali students enrolled in UK universities in 2024/25. Most universities with significant South Asian student populations have an active Nepali or Himalayan student society. Cities with well-established Nepali communities include London, Reading, Aldershot, Portsmouth, and Manchester.",
    },
  ],
  "international-student-work-hours-2026-comparison": [
    {
      question: "Which country allows the most work hours for international students in 2026?",
      answer: "Australia allows the most hours during term time — 48 hours per fortnight, equivalent to roughly 24 hours per week. Combined with Australia's high casual minimum wage of AUD $31.19 per hour, this gives international students the highest part-time earning potential of any major study destination. During official semester breaks, Australian students can work unlimited hours, making holiday periods a strong window to save significantly.",
    },
    {
      question: "Can international students work full-time during university holidays?",
      answer: "Yes — in the UK, Australia, Canada, and New Zealand, international students are permitted to work full-time during officially scheduled university holiday periods, including summer, Christmas, and Easter breaks. In the USA, on-campus full-time work is permitted during official breaks, but off-campus full-time work generally remains restricted.",
    },
    {
      question: "What happens if an international student works more than the permitted hours?",
      answer: "Exceeding your permitted work hours is a breach of your student visa conditions and can have serious consequences — including cancellation of your visa, removal from the country, and a ban on applying for future visas. In Australia, the Department of Home Affairs actively monitors compliance through tax records and employer reporting. In the UK, HMRC and UKVI share data to identify students working beyond their permitted hours.",
    },
    {
      question: "Can international students work off-campus in the USA?",
      answer: "Generally, no. F-1 students are restricted to on-campus employment during term time — up to 20 hours per week. Off-campus work requires specific authorization through either Curricular Practical Training (CPT), which must be directly linked to your course curriculum, or Optional Practical Training (OPT), which is typically authorized after graduation. Working off-campus without this authorization is a serious visa violation.",
    },
  ],
  "best-courses-study-abroad-2026": [
    {
      question: "Is it better to do my undergraduate degree in India and then go abroad for postgraduate studies?",
      answer: "For many Nepali students, yes — especially in nursing, engineering, and IT. Completing your undergraduate degree in India is significantly cheaper than starting from scratch in Australia, the UK, or New Zealand.",
    },
    {
      question: "Which course gives the most PR points in Australia?",
      answer: "In terms of overall PR points strategy, Nursing, IT, and Accounting tend to perform best in Australia's General Skilled Migration system. Nursing and IT both appear on the Medium and Long-term Strategic Skills List. Accounting graduates who complete the Professional Year Program (PYP) gain an additional 5 points — often the deciding factor between receiving a PR invitation and waiting indefinitely.",
    },
    {
      question: "Can I switch courses after arriving abroad if I find my first choice is not working out?",
      answer: "It depends on the country and visa conditions. In Australia and New Zealand, switching courses during your studies is generally possible but must be reported to your institution and, in some cases, may affect your visa conditions. In the UK, switching programs within the same university is usually straightforward, while switching institutions requires updating your CAS (Confirmation of Acceptance for Studies).",
    },
    {
      question: "Does studying in a regional area of Australia really make a difference for PR?",
      answer: "Yes — meaningfully so. Studying at a regional campus adds 5 points to your General Skilled Migration score, which is the same as completing a full year of skilled work experience. It also opens access to the Subclass 491 Regional visa, which has lower point thresholds and faster processing times than the standard Subclass 189.",
    },
  ],
  "why-international-students-choosing-india-2026": [
    {
      question: "Are degrees from Indian universities accepted for postgraduate admission in Australia, UK, and New Zealand?",
      answer: "Yes — undergraduate degrees from recognized and NAAC-accredited Indian universities are accepted for postgraduate admission at universities in Australia, the UK, and New Zealand, provided the student meets the academic requirements of the target program. IIT and IIM graduates are particularly well regarded internationally.",
    },
    {
      question: "Do I need an IELTS score to study in India as an international student?",
      answer: "Most Indian universities do not require IELTS or TOEFL scores from international students applying for English-medium programs, as English is the primary medium of instruction in Indian higher education. Some institutions may request proof of English proficiency from students whose previous education was conducted in a different language, but this is assessed on a case-by-case basis.",
    },
    {
      question: "What is the ICCR scholarship and how do I apply?",
      answer: "The ICCR (Indian Council for Cultural Relations) scholarship is a fully funded scholarship program offered by the Government of India to students from selected Asian, African, and Latin American countries. It covers tuition fees, accommodation, and a monthly living allowance for undergraduate, postgraduate, and doctoral programs at Indian universities.",
    },
    {
      question: "Can an MBBS degree from India be used to practice medicine in other countries?",
      answer: "Yes — but with licensing requirements specific to each country. An MBBS from an NMC-recognized Indian medical college is accepted for the FMGE/NExT licensing examination required to practice medicine in India, the USMLE (United States Medical Licensing Examination) for the USA, and the PLAB examination for the UK.",
    },
  ],
  "uk-scholarships-financial-support-2026": [
    {
      question: "Do I need to apply separately for university merit scholarships?",
      answer: "For most UK universities, merit scholarships for international students are awarded automatically based on your academic grades at the point of enrollment — no separate application required. However, some universities require a short online scholarship form after receiving your offer. Always check your university's scholarship page after your offer is confirmed, as additional awards may be available with a simple application.",
    },
    {
      question: "Can I work full-time during university holidays?",
      answer: "Yes — UK Student Visa holders can work full-time (unlimited hours) during official university vacation periods, including the summer, Christmas, and Easter breaks. You must remain enrolled as a student and your visa must be valid. The 20-hour weekly limit applies strictly during term time from the first day of each term.",
    },
    {
      question: "Is the Chevening Scholarship realistic for IT students?",
      answer: "Yes — Chevening does not restrict applicants to specific subject areas. IT, computer science, data science, and cybersecurity graduates have all received Chevening awards. The selection criteria focus on leadership potential, networking ability, and a clear plan to contribute to your home country after graduating — not just academic performance.",
    },
  ],
  "top-15-scholarships-for-nepali-students-to-study-abroad-in-2026": [
    {
      question: "Can I apply for multiple scholarships simultaneously?",
      answer: "Yes, absolutely! In fact, applying to multiple scholarships increases your chances significantly. However, ensure you can manage the application workload and meet all deadlines. Q2:",
    },
    {
      question: "Do I need to pay back scholarship money?",
      answer: "Generally, no. Unlike loans, scholarships are grants that don’t require repayment. However, some scholarships require you to return to Nepal for a specified period after graduation. Q3:",
    },
    {
      question: "Can I apply for scholarships without IELTS?",
      answer: "Some scholarships accept TOEFL or other English proficiency tests. However, very few accept applications without any language test. Nevertheless, Germany and China sometimes waive this requirement. Q4:",
    },
    {
      question: "What GPA do I need for scholarships?",
      answer: "Most competitive scholarships require a minimum of 3.0/4.0 (75%) or First Division. However, requirements vary by scholarship, so always check specific criteria. Q5:",
    },
    {
      question: "Are there scholarships for undergraduate Nepali students?",
      answer: "Yes! Scholarships like Chinese Government Scholarship, Turkish Scholarships, and KGSP offer undergraduate opportunities. However, master’s scholarships are generally more numerous. Q6:",
    },
    {
      question: "How much gap is acceptable after completing my degree?",
      answer: "This varies by scholarship. Generally, 1-2 years is acceptable, especially if you’ve been working. However, some scholarships like DAAD prefer minimal gaps. Q7:",
    },
  ],
  "part-time-earnings-vs-living-costs-abroad-2026": [
    {
      question: "Can I fully pay for my studies through part-time work in Australia or New Zealand?",
      answer: "In regional areas of Australia or smaller New Zealand cities like Christchurch or Dunedin, consistent part-time work at minimum wage can cover most or all of your monthly living costs during term time. However, tuition fees — which typically range from AUD 25,000–40,000 per year in Australia and NZD 22,000–35,000 per year in New Zealand — cannot be covered through part-time work.",
    },
    {
      question: "Which country has the highest minimum wage for student workers?",
      answer: "Australia has the highest minimum wage of any major study destination — AUD 24.10 per hour in 2026. New Zealand is close behind at NZD 23.15 per hour. The UK is lower at GBP 11.44 per hour. However, because Australia also allows 48 hours of work per fortnight during term time (versus the UK's 20 hours per week), Australian students can earn significantly more during term time than UK-based students even at the same hourly rate.",
    },
    {
      question: "What happened to New Zealand's part-time work limit in 2026?",
      answer: "New Zealand increased its student work limit from 20 hours to 25 hours per week from 2026. This is a meaningful improvement — an extra 5 hours per week at NZD 23.15 per hour adds approximately NZD 460 to your monthly gross earnings. This change makes New Zealand noticeably more financially accessible for Nepali students who need to supplement their family support through part-time work.",
    },
    {
      question: "Is it possible to get a student loan in Nepal for studying abroad?",
      answer: "Yes — several Nepali banks and financial institutions offer education loans for overseas study, typically covering tuition fees and sometimes living costs up to a defined limit. The Nepal Rastra Bank and commercial banks including Rastriya Banijya Bank, Nepal Bank Limited, and various private banks offer education loan products. Interest rates, collateral requirements, and maximum loan amounts vary.",
    },
  ],
  "why-study-in-the-usa-from-nepal-benefits-opportunities-and-global-exposure": [
    {
      question: "How much does it cost to study in the USA from Nepal?",
      answer: "The cost varies significantly based on the university and location. Generally, tuition ranges from $20,000 to $60,000 annually, with living expenses adding another $12,000 to $20,000. However, scholarships and financial aid can substantially reduce these costs. Q2:",
    },
    {
      question: "Can I work while studying in the USA?",
      answer: "Yes, F-1 visa holders can work up to 20 hours per week on-campus during semesters and full-time during breaks. Additionally, CPT and OPT programs allow off-campus employment related to your field of study. Q3:",
    },
    {
      question: "What are my chances of getting a job after graduation?",
      answer: "International students with US degrees, especially in STEM fields, have excellent employment prospects. The OPT program allows you to work for 12-36 months, during which many secure H-1B sponsorship or choose to return home with valuable international experience. Q4:",
    },
    {
      question: "How long does the application process take?",
      answer: "Ideally, begin preparing 12-18 months before your intended start date. This timeline allows adequate time for test preparation, application completion, and visa processing. Q5:",
    },
    {
      question: "Is it difficult to adjust to American culture?",
      answer: "While any international move involves adjustment, American universities provide extensive support for international students. Additionally, the diverse campus communities mean you’ll find people from various backgrounds, making integration easier.",
    },
  ],
  "studying-in-the-uk-from-nepal-2025": [
    {
      question: "How Much Does It Cost to Study in the UK for Nepali Students?",
      answer: "The cost of studying in the UK varies by course and location. Tuition Fees: £10,000 – £25,000 per year. Living Expenses: £800 – £1,200 per month.",
    },
    {
      question: "Can Nepali Students Work While Studying in the UK?",
      answer: "Yes! Students can work up to 20 hours per week during semesters and full-time during vacations. Common part-time jobs include hospitality, retail, and administrative roles.",
    },
    {
      question: "Why Choose the UK for Higher Studies from Nepal?",
      answer: "The UK is a top choice for Nepali students due to its quality education, shorter course duration, and strong career prospects. Undergraduate: 3 years. Postgraduate: 1 year. The UK Graduate Route Visa lets you work for 18 months after study for applications from January 1, 2027 (2 years before that date), or 3 years for PhD graduates.",
    },
  ],
  "know-how-the-power-of-language-can-transform-your-study-abroad-experience": [
    {
      question: "Why is language training important for studying abroad?",
      answer: "Strong English communication skills help you adapt faster, excel academically, and connect confidently in a new environment abroad.",
    },
    {
      question: "How long does IELTS or TOEFL preparation take?",
      answer: "Typically 4–8 weeks, depending on your current English level. Admizz Education offers both intensive and flexible batch options in Kathmandu and Birgunj.",
    },
    {
      question: "Do you provide Duolingo and SAT training?",
      answer: "Yes! Admizz offers comprehensive training for SAT and Duolingo with adaptive practice tests and personalized mentoring.",
    },
    {
      question: "How can I register for classes?",
      answer: "You can visit Admizz Education offices in Kathmandu or Birgunj, or register online through our website for counseling and course details.",
    },
  ],
  "uk-student-visa-process-for-nepalese-students": [
    {
      question: "How long does it take to get a UK student visa from Nepal?",
      answer: "Usually 3–6 weeks, but priority services are available for faster decisions.",
    },
    {
      question: "Can I work on a UK student visa?",
      answer: "Yes, Nepali students can work 20 hours per week during term time and full-time during holidays.",
    },
    {
      question: "What is the visa success rate for Nepali students?",
      answer: "The success rate is high when documents are correct and financial requirements are met.",
    },
    {
      question: "Do I need IELTS for a UK student visa?",
      answer: "Most universities require IELTS or equivalent, but some may accept MOI (Medium of Instruction) proof.",
    },
    {
      question: "Can my dependents join me on a student visa?",
      answer: "Yes, postgraduate students can bring dependents if requirements are fulfilled.",
    },
  ],
  "documents-required-for-student-visa-from-nepal": [
    {
      question: "What documents are required for a student visa from Nepal?",
      answer: "A valid passport, offer letter, academic transcripts, English test scores, financial proof, SOP, police clearance, and medical reports are required.",
    },
    {
      question: "Is IELTS mandatory for a student visa from Nepal?",
      answer: "No, IELTS is not always mandatory. Some universities offer IELTS waivers based on academic background or medium of instruction.",
    },
    {
      question: "How much bank balance is required for a student visa from Nepal?",
      answer: "The required amount depends on the country, tuition fees, and living costs. Typically, 6 months of bank statements are required.",
    },
    {
      question: "Who can sponsor a student visa from Nepal?",
      answer: "Parents, legal guardians, or close blood relatives can sponsor a student visa, provided they submit valid financial proof.",
    },
    {
      question: "Is a Police Clearance Certificate compulsory?",
      answer: "Yes, most countries require a Police Clearance Certificate issued by Nepal Police to verify character and background.",
    },
    {
      question: "How long does the student visa process take from Nepal?",
      answer: "Processing time varies by country, usually ranging from 2 to 8 weeks after biometrics submission.",
    },
  ],
  "latest-changes-to-student-visa-work-rights-in-new-zealand": [
    {
      question: "How many hours can international students work in New Zealand now?",
      answer: "Eligible international students can work up to 25 hours per week during academic terms under the updated rules.",
    },
    {
      question: "When do the new student visa work rights come into effect?",
      answer: "The updated work rights apply to new student visas granted from late 2025 onwards. Existing students may need to apply for updated conditions.",
    },
    {
      question: "Can existing student visa holders increase their work hours?",
      answer: "Yes. Current students can apply for a variation of conditions or a new student visa to access increased work hours.",
    },
    {
      question: "Can exchange or short-term students work in New Zealand?",
      answer: "Yes. Students enrolled in approved exchange or study-abroad programs may now be eligible for work rights.",
    },
    {
      question: "Can students work full-time during holidays?",
      answer: "Yes. If your visa already allows full-time work during official academic breaks, this benefit remains unchanged.",
    },
    {
      question: "Do I need a new visa if I change my course or college?",
      answer: "In many cases, yes. Changing your education provider or moving to a lower qualification level may require a new student visa.",
    },
  ],
  "international-education-consultants": [
    {
      question: "What benefits does studying abroad provide?",
      answer: "Studying abroad enhances professional development, employability, global networking, and academic depth.",
    },
    {
      question: "Which study destination is best for Nepali students?",
      answer: "Australia, Canada, UK, USA, New Zealand, and South Korea continue to provide strong education and visa support.",
    },
    {
      question: "How much does it cost to study abroad?",
      answer: "Costs vary depending on country, university, course duration, and lifestyle preferences.",
    },
    {
      question: "Do I need English proficiency tests?",
      answer: "Yes. Most universities require IELTS, TOEFL, PTE, SAT, or Duolingo test scores.",
    },
    {
      question: "Can I work part-time while studying?",
      answer: "Most destinations allow 20–28 hours per week depending on visa conditions.",
    },
  ],
  "is-usa-worth-it-international-students-2026": [
    {
      question: "Is the USA safe for international students in 2026?",
      answer: "The vast majority of international students study and graduate without any issues. However, policy uncertainty around visa processing and OPT has created a more unpredictable environment. Students are advised to apply well in advance, maintain full-time enrollment, and stay closely informed about any changes affecting their visa category.",
    },
    {
      question: "Should I apply to the USA and another country at the same time?",
      answer: "Yes — and this is now standard practice in 2026. Applying to the USA alongside the UK, Australia, or New Zealand gives you a genuine choice and a safety net if your US visa is delayed. Many students who received their UK or Australian visa sooner made the switch and did not look back.",
    },
    {
      question: "What is the best alternative to the USA for STEM students?",
      answer: "Australia and the UK are the strongest alternatives. Australia offers a 2–3 year post-study visa and a clear PR pathway. The UK offers a 1-year Master's plus the Graduate Route (18 months for applications from January 1, 2027) with no restriction on employer or role. New Zealand's Green List makes it the fastest route to PR for IT and engineering graduates specifically.",
    },
  ],
  "best-study-abroad-consultants-in-nepal-how-to-choose-the-right-one-for-your-future": [
    {
      question: "How much does it cost to use a study abroad consultant in Nepal?",
      answer: "Fees vary depending on the destination country and the range of services. Generally, reputable consultants charge anywhere from NPR 10,000 to NPR 50,000 or more. Always ask for a detailed fee structure upfront.",
    },
    {
      question: "Can I apply to universities abroad without a consultant?",
      answer: "Technically, yes. However, the process involves a lot of paperwork, deadlines, and country-specific requirements. A trusted consultant significantly reduces the risk of errors and increases your chances of success.",
    },
    {
      question: "How long does the study abroad process take in Nepal?",
      answer: "It depends on the country and intake. On average, the process from initial counseling to visa approval takes 3 to 9 months. Starting early is always advisable.",
    },
  ],
  "uk-january-2027-intake-Nepalese-students": [
    {
      question: "Is it too late to apply for January 2027?",
      answer: "Not necessarily, but you need to move now. Confirm that your course still has places, then work back from a mid-November visa application.",
    },
    {
      question: "Do January intakes offer scholarships?",
      answer: "Some do, but there are usually fewer scholarship rounds than for September. Check your university's scholarship page after receiving your offer.",
    },
    {
      question: "What is the next intake after January 2027?",
      answer: "Some universities start in May, but September 2027 is the main intake. Applications for September 2027 are open now.",
    },
  ],
  "guide-to-studying-in-the-uk": [
    {
      question: "What are the English requirements for Nepali students?",
      answer: "Most UK universities require IELTS 6.0 – 6.5, but alternatives like PTE or TOEFL are also accepted.",
    },
    {
      question: "Can I study in the UK without IELTS?",
      answer: "Yes, some universities accept Nepali students with MOI (Medium of Instruction) proof.",
    },
    {
      question: "Can I take dependents with me?",
      answer: "Yes, postgraduate students can bring dependents if they meet visa requirements.",
    },
    {
      question: "Is studying in the UK expensive?",
      answer: "It depends on your course and city. With scholarships and part-time jobs, it becomes affordable.",
    },
    {
      question: "Can I stay in the UK after graduation?",
      answer: "Yes, with the Graduate Route Visa, you can stay for 2–3 years to gain work experience.",
    },
    {
      question: "How early should I apply for UK universities?",
      answer: "At least 6–12 months before your course start date.",
    },
    {
      question: "Do UK universities offer January intakes?",
      answer: "Yes, many UK universities have both September and January intakes.",
    },
  ],
  "neb-class-12-result-2083-published": [
    {
      question: "When was the NEB Class 12 Result 2083 published?",
      answer: "The National Examination Board officially published the Class 12 result on Friday, Ashadh 5, 2083 (June 19, 2026), following a board meeting held at 8:00 AM. This was 45 days after the examinations concluded, significantly faster than the roughly three-month wait for the 2082 result.",
    },
    {
      question: "What was the overall pass percentage for NEB Class 12 Result 2083?",
      answer: "The overall pass percentage was 64.13%. Within this, the regular category recorded a pass rate of 69.75%, while the partial category recorded 42.38%. A total of 4,18,170 students appeared for the examination, of which 2,68,190 students received grades in all subjects.",
    },
    {
      question: "How can I check my NEB Class 12 result online?",
      answer: "Visit neb.gov.np/result or neb.ntc.net.np and enter your symbol number and date of birth to view and download your marksheet. You can also check via SMS by texting NEB followed by a space and your symbol number to 1600, via IVR by dialling 1601, or via USSD by dialling *1600# on your NTC network.",
    },
    {
      question: "What happens if I get an NG (Not Graded) in a subject?",
      answer: "Receiving an NG means you scored below 35 marks in that subject's theory component. This is not the end of your academic year. NEB conducts a Grade Increment Examination a few months after the main result, giving you the opportunity to clear the subject.",
    },
    {
      question: "Can I apply for retotaling if I think there is an error in my marksheet?",
      answer: "Yes. NEB's Online Payment (Retotaling) service is open on neb.gov.np from 11:00 AM on Ashadh 6, 2083 to 5:00 PM on Ashadh 12, 2083, exactly 7 days from the result publication date. Applications submitted after the deadline will not be processed.",
    },
  ],
  "student-to-pr-steps-timeline-costs-2026": [
    {
      question: "Which country gives international students the fastest path to permanent residency?",
      answer: "New Zealand offers the fastest and most certain PR pathway for international graduates in 2026, specifically through its Tier 1 Green List. Graduates in qualifying occupations such as Registered Nursing, Civil Engineering, or IT Programming can apply directly through Residence from Work without a points test or lottery. For nursing graduates, the journey can be as short as 2–3 years.",
    },
    {
      question: "What happens if I fail the H-1B lottery in the USA?",
      answer: "If your H-1B application is not selected in the lottery, your employer can reapply in the following year's lottery. In the meantime, you must remain on a valid visa status. Options include extending OPT (if still within the STEM OPT period), switching to another visa category, or returning to your home country.",
    },
  ],
  "ielts-vs-pte": [
    {
      question: "What is the main difference between IELTS and PTE?",
      answer: "The main difference lies in test delivery and scoring. IELTS includes a face-to-face speaking test, while PTE is fully computer-based with AI scoring.",
    },
    {
      question: "Which is easier: IELTS or PTE?",
      answer: "Neither test is easier for everyone. IELTS suits conversational learners, while PTE suits tech-comfortable test-takers.",
    },
    {
      question: "Which test gives faster results?",
      answer: "PTE results are usually available within 24–48 hours, while IELTS results take 3–13 days.",
    },
    {
      question: "Is PTE accepted worldwide like IELTS?",
      answer: "IELTS has wider global acceptance, but PTE is widely accepted in major study destinations.",
    },
    {
      question: "Is IELTS better for UK student visas?",
      answer: "Yes, IELTS for UKVI is commonly required for UK visas, though some universities accept PTE.",
    },
    {
      question: "Can I switch from IELTS to PTE?",
      answer: "Yes. Many students improve results by switching tests with proper preparation.",
    },
  ],
  "how-uk-university-grading-system-works": [
    {
      question: "What percentage is a First Class degree in the UK?",
      answer: "A First Class Honours degree in the UK requires an overall average of 70% or above across your modules. It is the highest undergraduate degree classification. At postgraduate level, the equivalent grade is a Distinction, also awarded for 70% and above.",
    },
    {
      question: "What is the minimum passing mark at UK universities?",
      answer: "The minimum passing mark is 40% for undergraduate courses and 50% for postgraduate courses at most UK universities. Scoring below these thresholds in a module means failing that module.",
    },
    {
      question: "How does the UK grading system differ from the grading system in other countries?",
      answer: "Most countries grade on a percentage or GPA scale where 70% or above is considered very high. In the UK, 70% is the threshold for the highest classification, a First Class, and a strong 2:1 result of 65% is already considered an excellent academic outcome.",
    },
  ],
};

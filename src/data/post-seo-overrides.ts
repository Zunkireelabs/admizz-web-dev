// Search-result title and description for existing Sanity posts, keyed by
// post slug. [slug]/page.tsx uses these in preference to the post's own
// seo.metaTitle / seo.metaDescription, so a keyword or wording fix ships with
// the site code (reviewed in a PR) instead of needing a Sanity publish.
// Titles stay under ~60 characters and descriptions under ~160.
export const postSeoOverrides: Record<string, { title: string; description: string }> = {
  "best-study-abroad-consultants-in-nepal-how-to-choose-the-right-one-for-your-future": {
    title: "Best Study Abroad Consultants in Nepal: How to Choose",
    description: "How to choose a study abroad consultant in Nepal: what to look for, red flags to avoid and questions to ask before you sign. Guidance from Admizz Education.",
  },
  "how-student-visa-consultants-help-you-get-approved-faster": {
    title: "How Student Visa Consultants Help: Documents & Interviews",
    description: "What a student visa consultant does: document checks, financial evidence and interview preparation. Learn when expert help is worth it, from Admizz Education.",
  },
  "ielts-vs-pte": {
    title: "IELTS vs PTE: Differences in Format, Scoring & Acceptance",
    description: "IELTS or PTE? Compare exam format, scoring, difficulty, results and university acceptance to choose the right test. Preparation support from Admizz Education.",
  },
  "international-education-consultants": {
    title: "International Education Consultants for Study Abroad",
    description: "Admizz Education helps students apply to universities in the UK, USA, Australia, Canada and New Zealand, with guidance on admission, visas and scholarships.",
  },
  "international-scholarships-for-nepalese-students": {
    title: "Scholarships for Nepalese Students: Who Can Apply",
    description: "Who can apply for international scholarships from Nepal, why they matter and tips to strengthen your application. Support from Admizz Education.",
  },
  "online-application-vs-application-through-direct-consultancy": {
    title: "Online Application vs Using an Education Consultancy",
    description: "Compare applying online yourself with using an education consultancy: pros, cons and how to decide. Advice from Admizz Education.",
  },
  "study-abroad-from-nepal": {
    title: "Study Abroad from Nepal: Countries, Process & Support",
    description: "Planning to study abroad from Nepal? Compare top destinations, see how admission, scholarships and visa support work, and get guidance from Admizz Education.",
  },
  "uk-student-visa-from-nepal": {
    title: "UK Student Visa from Nepal: Process & Requirements",
    description: "How to apply for a UK student visa from Nepal. Requirements, documents and the steps from offer to visa, with guidance from Admizz Education.",
  },
  "uk-student-visa-process-for-nepalese-students": {
    title: "UK Student Visa Process for Nepalese Students: Steps & Costs",
    description: "Step-by-step UK student visa process for Nepalese students: requirements, costs, documents and tips, with expert guidance from Admizz Education.",
  },
  "study-in-europe-from-nepal": {
    title: "Study in Europe from Nepal: Costs, Visa, Scholarships",
    description: "Plan to study in Europe from Nepal: eligibility, step-by-step application, scholarships, costs and visa requirements, with guidance from Admizz Education.",
  },
  "why-europe-is-the-hottest-destination-for-asian-students": {
    title: "Why Europe Is a Top Study Destination for Asian Students",
    description: "See why students from Nepal, India, Bangladesh and Sri Lanka choose Europe: affordable tuition, scholarships, post-study work and a multicultural setting.",
  },
  "computer-engineering-vs-information-science-engineering": {
    title: "Computer Engineering vs Information Science Engineering",
    description: "Computer Engineering vs Information Science Engineering: see how the two differ in focus, subjects and careers, and how to choose the right course for you.",
  },
  "five-reasons-why-you-should-study-in-australia": {
    title: "5 Reasons to Study in Australia | Admizz Education",
    description: "Why study in Australia? Learn about globally ranked universities, work experience, internships, safety, quality of life and English skills for students.",
  },
  "what-makes-bangalore-a-favored-destination-for-student": {
    title: "Why Bangalore Is a Favored Destination for Students",
    description: "Why do students choose Bangalore? Read student stories on safety, weather, IT-city opportunities, family comforts and courses in Karnataka's study hub.",
  },
  "why-study-in-india-instead-of-us-australia": {
    title: "Why Study in India Instead of the US or Australia?",
    description: "Why Nepali students choose India over the US or Australia: similar culture, lower costs, easy travel with no visa requirement and quality education.",
  },
  "uk-admission-guidance-for-international-students": {
    title: "Common Mistakes When Applying to UK Universities",
    description: "Avoid common UK university application mistakes: weak personal statements, missed UCAS deadlines, incomplete documents and poor financial planning.",
  },
  "how-to-make-right-decisions-in-student-life": {
    title: "How to Make Right Decisions in Student Life",
    description: "Learn how students can make better decisions: identify the problem, research it, think creatively, weigh consequences and choose wisely in college life.",
  },
  "study-in-the-uk-from-nepal-2026-complete-guide": {
    title: "Study in the UK from Nepal: 2026 Guide",
    description: "Study in the UK from Nepal: universities, courses, admission and English requirements, visa steps, Graduate Route and costs, with Admizz Education support.",
  },
  "uk-education-nepal-growth": {
    title: "Why UK Education Is Gaining Ground in Nepal",
    description: "Why more Nepalese students choose the UK: simpler visa funding checks, affordable universities, scholarships, TNE pathways and MOI letters for English waivers.",
  },
  "choosing-study-destinations-australia-or-the-united-kingdom": {
    title: "Australia or UK for Nepali Students: Compare",
    description: "Compare studying in Australia vs the UK for Nepali students: tuition, living costs, visa work rules, post-study work and courses, with guidance from Admizz.",
  },
  "diwali-illuminating-education-and-celebrating-achievements": {
    title: "Diwali and Education: Meaning of the Festival of Lights",
    description: "Learn the history, traditions and customs of Diwali, the Festival of Lights, and how its spirit of knowledge connects with students and education.",
  },
  "twice-the-chance-half-the-wait-biannual-admissions-are-here": {
    title: "Biannual Admissions: July/August and January Intakes",
    description: "Biannual admissions let universities accept students in July/August and January. See the benefits and how Admizz Education helps you plan both cycles.",
  },
  "form-i-20-your-essential-guide-to-studying-in-the-usa": {
    title: "Form I-20 Guide for Studying in the USA",
    description: "Learn what Form I-20 is, who needs it, eligibility, the step-by-step process to get it, and answers to common questions for studying in the USA.",
  },
  "navigating-global-education-celebrating-international-students-day": {
    title: "International Students Day: Study Abroad Destinations",
    description: "Learn about International Students Day on November 17th and the study destinations of India, USA, Australia, France, Canada and the UK with Admizz Education.",
  },
  "which-is-better-computer-engineering-or-computer-science-engineering": {
    title: "Computer Engineering vs Computer Science Engineering",
    description: "Compare Computer Engineering (CE) and Computer Science Engineering (CSE): what each covers, the career paths they lead to, and how to choose.",
  },
  "tips-for-overall-development-of-your-child": {
    title: "Tips for Overall Development of Your Child",
    description: "Practical tips for parents on building a child's confidence, following a routine, knowing strengths and weaknesses, and personality development.",
  },
  "top-5-universities-to-study-in-uk-based-on-qs-rankings-2023": {
    title: "Top 5 UK Universities by QS Rankings 2023",
    description: "Read about five top UK universities from the QS Rankings 2023 list: Oxford, Cambridge, Imperial College London, UCL and Edinburgh, and what each is known for.",
  },
  "uk-it-graduate-jobs-visa-careers-2026": {
    title: "UK IT Graduate Jobs and Visa Options (2026)",
    description: "Find UK IT graduate salaries, employment rates, placement years and Graduate Route visa details, plus top UK universities for computing, in one 2026 guide.",
  },
  "study-in-the-uk-after-2-from-nepal-complete-2025-guide": {
    title: "Study in the UK After +2 from Nepal: 2025 Guide",
    description: "Guide to studying in the UK after +2 from Nepal: entry requirements, IELTS scores, tuition and living costs, visa funds, scholarships and Graduate Route.",
  },
  "australia-streamlines-student-visas-focus-on-genuine-students": {
    title: "Australia's Genuine Student Visa Requirement",
    description: "Australia replaces the Genuine Temporary Entrant test with a Genuine Student requirement for student visas. See what changes and how to prepare early.",
  },
  "navigating-your-future-the-importance-of-assessing-a-colleges-alumni-network": {
    title: "Why a College's Alumni Network Matters",
    description: "Learn why a college's alumni network matters for your career: lifelong connections, internships, mentorship, resources and support after graduation.",
  },
  "top-5-universities-of-india-based-on-nirf-rankings-2023": {
    title: "Top 5 Universities in India by NIRF Rankings 2023",
    description: "See the top 5 universities in India by NIRF Rankings 2023, including IISc, JNU, Jamia Millia Islamia, Jadavpur and BHU, and what each is known for.",
  },
  "ielts-requirement-for-studying-in-the-uk-from-nepal": {
    title: "IELTS Requirement for UK Study from Nepal",
    description: "IELTS requirements for studying in the UK from Nepal: minimum scores for the student visa, university examples, accepted alternatives and IELTS for UKVI.",
  },
  "5-reasons-why-uk-is-an-ideal-study-destination": {
    title: "5 Reasons to Study in the UK as an International Student",
    description: "Five reasons the UK suits international students: recognised academic excellence, career links, shorter courses, work rights and cultural diversity.",
  },
  "step-by-step-guide-to-australia-student-visa-from-nepal": {
    title: "Australia Student Visa from Nepal: Step-by-Step Guide",
    description: "Step-by-step guide to the Australia Subclass 500 student visa from Nepal: documents, funds, the Genuine Student statement, costs and timeline.",
  },
  "isic-explained-why-every-international-student-should-have-one": {
    title: "ISIC Card: Benefits and How to Apply for Students",
    description: "What the International Student Identity Card (ISIC) is, who can apply, which discounts it offers and how it differs from a regular student ID.",
  },
  "part-time-jobs-for-international-students-uk": {
    title: "Part-Time Jobs for International Students in the UK",
    description: "Rules for part-time work in the UK on a student visa, plus on-campus, off-campus and online job types and pay for international students.",
  },
  "effective-tips-for-using-technology-in-classroom": {
    title: "Tips for Using Technology in the Classroom",
    description: "Practical tips for teachers and parents on using technology in the classroom: put learning goals first, keep tasks challenging and encourage conversation.",
  },
  "uk-faq-study-guide-for-international-students": {
    title: "UK University Application Guide for International Students",
    description: "FAQ guide to studying in the UK: application timeline, CAS, student visa, financial requirements, work rights and the Graduate Route for 2026.",
  },
  "study-in-south-korea-from-nepal-your-complete-guide-to-gks-scholarship-tech-opportunities": {
    title: "Study in South Korea from Nepal: GKS Scholarship Guide",
    description: "Guide to studying in South Korea from Nepal: GKS scholarship coverage, eligibility, application steps, top universities and tech career options.",
  },
  "top-5-professional-courses-to-study-in-2024": {
    title: "Top 5 Courses to Study in 2024: AI, Data Science, More",
    description: "Five popular study programmes to consider: AI and machine learning, cybersecurity, data science, digital marketing and healthcare management.",
  },
  "four-documents-to-prepare-for-university-applications": {
    title: "4 Documents Needed for University Applications",
    description: "Transcripts, test scores, English proficiency results and recommendation letters: the four key documents to prepare before you apply to university.",
  },
  "scholarships-for-nepali-students-to-study-in-india": {
    title: "Scholarships for Nepali Students to Study in India",
    description: "Explore Government of India scholarship schemes for Nepali students, from school level to Ph.D., with opening months and how to apply, online or offline.",
  },
  "top-10-government-colleges-in-india-you-must-know": {
    title: "Top 10 Government Colleges in India for Admission",
    description: "See 10 top government colleges in India, including IITs, AIIMS Delhi, IIM Ahmedabad and NLSIU, with their programs and the entrance exams for admission.",
  },
  "minimum-ielts-requirement-for-canadian-universities": {
    title: "Minimum IELTS Score for Canadian Universities",
    description: "Most Canadian universities ask for an overall IELTS band of 6.5 with 6.0 in each skill. See top university requirements and what to do if you fall short.",
  },
  "uk-graduate-route-visa-reduced-2025": {
    title: "UK Graduate Route Cut to 18 Months: What Changes",
    description: "The UK Graduate Route is now 18 months instead of 2 years. See the new rules on university compliance, English levels, a proposed 6% levy and settlement.",
  },
  "top-15-scholarships-for-nepali-students-to-study-abroad-in-2026": {
    title: "Top 15 Scholarships for Nepali Students Abroad 2026",
    description: "Explore 15 scholarships for Nepali students to study abroad in 2026, with a 12-month application timeline, interview tips and answers to common questions.",
  },
  "part-time-earnings-vs-living-costs-abroad-2026": {
    title: "Part-Time Earnings vs Living Costs Abroad (2026)",
    description: "Can you pay for yourself while studying abroad? Compare 2026 work limits, part-time earnings and living costs in Australia, the UK, USA and New Zealand.",
  },
  "why-study-in-the-usa-from-nepal-benefits-opportunities-and-global-exposure": {
    title: "Why Study in the USA from Nepal: Benefits & Exposure",
    description: "Why Nepali students choose the USA: more than 4,000 accredited universities, flexible majors, work options, costs and the application timeline.",
  },
  "studying-in-the-uk-from-nepal-2025": {
    title: "Studying in the UK from Nepal: 2025 Guide",
    description: "Answers to common questions on studying in the UK from Nepal: requirements, costs, scholarships, visa funds, work rules and the Graduate Route.",
  },
  "explore-why-global-education-is-trending-in-2025": {
    title: "Why Study Abroad in 2025: Benefits and Destinations",
    description: "Why global education is trending in 2025: employability, life skills and networks, popular destinations by field, ways to afford it and the steps to apply.",
  },
  "know-how-the-power-of-language-can-transform-your-study-abroad-experience": {
    title: "IELTS, TOEFL, PTE Preparation in Kathmandu, Birgunj",
    description: "Prepare for IELTS, TOEFL, PTE, SAT or Duolingo with Admizz Education in Kathmandu and Birgunj. Build English skills for study abroad and exams.",
  },
  "are-nepalese-youth-going-abroad-coming-back-to-nepal-after-abroad-studies": {
    title: "Do Nepali Students Return After Studying Abroad?",
    description: "Do Nepali students return home after studying abroad? Read what is known about students in the US, Australia and India, and why many choose to stay.",
  },
  "google-for-india-an-event-for-the-country": {
    title: "Google for India Event: Investment and Education",
    description: "Read what Google announced at Google for India: a 10 billion dollar fund, education partnerships with CBSE and Prasar Bharti, and AI and language plans.",
  },
  "celebrating-the-colors-of-education-holi-festival-and-studying-abroad-with-admizz-education": {
    title: "Holi and Studying Abroad with Admizz Education",
    description: "How Admizz Education supports students studying abroad, from choosing a course and institution to admissions, visas and scholarships, told through Holi.",
  },
  "strategies-to-stay-motivated-during-online-class": {
    title: "How to Stay Motivated During Online Classes",
    description: "Tips to stay motivated in online classes: plan your schedule, take regular breaks, set up a comfortable workspace, connect with classmates and stay healthy.",
  },
  "documents-required-for-student-visa-from-nepal": {
    title: "Documents Required for a Student Visa from Nepal",
    description: "Full list of documents required for a student visa from Nepal: passport, offer letter, transcripts, English test proof, finances, SOP and more.",
  },
  "study-in-france-guide-for-nepali-students": {
    title: "Study in France: Guide for Nepali Students",
    description: "Study in France as a Nepali student: public university tuition, the Campus France application, student visa steps and cost of living, with Admizz Education.",
  },
  "latest-changes-to-student-visa-work-rights-in-new-zealand": {
    title: "New Zealand Student Visa Work Rights: 2026 Changes",
    description: "New Zealand student visa work rights have changed: up to 25 hours a week in term, wider eligibility and what to do if you change course or provider.",
  },
  "avoid-when-applying-to-uk-universities-from-nepal": {
    title: "Mistakes to Avoid When Applying to UK Universities",
    description: "Avoid common mistakes when applying to UK universities from Nepal: course choice, SOP, documents, funds, deadlines and visa interview. Tips by Admizz Education.",
  },
  "unlock-your-future-the-rising-trend-of-higher-education-abroad": {
    title: "Higher Education Abroad: Why Students Choose It",
    description: "Why study abroad? See the benefits, popular destinations, how to choose a program and tips for a smooth application and visa process with Admizz Education.",
  },
  "ielts-exam-preparation-guide-format-tips-scoring-explained-for-study-abroad": {
    title: "IELTS Preparation Guide: Format, Scoring and Tips",
    description: "Prepare for IELTS with the exam format, band scoring, section-wise tips and a 30-day study plan for students going abroad. Guidance from Admizz Education.",
  },
  "usa-reality-what-students-need-to-know-before-the-interview": {
    title: "USA F-1 Visa Interview: What Students Should Know",
    description: "What do visa officers check in the USA F-1 student visa interview? Learn the mistakes, red flags and how to prepare honestly with Admizz Education.",
  },
  "physical-vs-digital-vs-audio-books-which-is-better": {
    title: "Physical vs Digital vs Audio Books: Which Is Better?",
    description: "Compare the pros and cons of physical, digital and audio books, from portability and cost to distractions, to pick the reading format that suits you.",
  },
  "how-to-choose-the-right-country-for-your-higher-studies": {
    title: "How to Choose the Right Country for Higher Studies",
    description: "Not sure which country to study in? Compare career goals, costs, visa rules, post-study work, language and rankings, with guidance from Admizz Education.",
  },
  "chhath-puja-illuminating-cultural-diversity-in-the-admizz-education-community": {
    title: "Chhath Puja: Rituals and Four Days of Observance",
    description: "Learn about Chhath Puja, a Hindu festival celebrated across India and Nepal: its cultural significance and the four days of rituals and observances.",
  },
  "7-common-reasons-why-student-visas-get-rejected-for-nepali-students": {
    title: "7 Common Reasons Student Visas Get Rejected in Nepal",
    description: "Learn the 7 most common reasons Nepali students face student visa rejection, from weak SOPs to insufficient finances, and how to fix them before you apply.",
  },
  "checklist-for-2025-26-uk-student-visa-applicants": {
    title: "UK Student Visa Checklist 2025–26 for Nepali Students",
    description: "UK student visa checklist for 2025–26: documents, funds, English tests, eVisa steps and a timeline for Nepali students. Guidance from Admizz Education.",
  },
  "complete-guide-to-the-indian-embassy-compex-scholarship-2024": {
    title: "COMPEX Scholarship 2024 for Nepali Students in India",
    description: "COMPEX Scholarship 2024-25 from the Embassy of India, Kathmandu: eligibility, courses, important dates and how Nepali students can apply.",
  },
  "guide-to-studying-in-the-uk": {
    title: "Study in the UK from Nepal: Visa, Costs, Scholarships",
    description: "Plan to study in the UK from Nepal: admission steps, student visa requirements, tuition and living costs, scholarships and work rights, with Admizz Education.",
  },
  "australia-eases-visa-rules-nepal-upgraded-to-level-2": {
    title: "Australia Student Visa: Nepal Upgraded to Level 2",
    description: "Australia has upgraded Nepal to Assessment Level 2 for student visas. See what it means for Nepalese students, including reduced documentary requirements.",
  },
  "types-of-scholarships-in-2026-for-international-students": {
    title: "Types of Scholarships for International Students 2026",
    description: "Learn the main types of scholarships for international students in 2026: merit, need-based, government, university, fully funded and partial, and how to apply.",
  },
  "countries-with-the-easiest-student-visa-approval-in-2026": {
    title: "Countries with the Easiest Student Visa Approval 2026",
    description: "Compare countries known for easier student visa approval in 2026, including Germany, Australia, New Zealand, Ireland, France and the Netherlands.",
  },
  "how-much-to-spend-on-your-bachelors-degree-in-india": {
    title: "Bachelor's Degree Cost in India: Fees and Budget",
    description: "How much does a bachelor's degree in India cost? See average tuition, fees at KIIT, Manipal, VIT and R.K. University, scholarships and budgeting tips.",
  },
  "new-age-courses-that-can-help-you-build-a-great-career": {
    title: "New Age Courses for a Great Career: Top Options",
    description: "Explore new age courses such as animation, performing arts, golf coaching, fashion design, filmmaking and foreign languages for a career built on your passion.",
  },
  "us-f1-september-15-deadline-2026": {
    title: "F-1 Visa Rule Change: September 15, 2026 Deadline",
    description: "Duration of Status ends September 15, 2026 for F-1 students. See the fixed 4-year limit, travel warning, USCIS extensions and what to do before the deadline.",
  },
  "3-reasons-why-you-should-study-at-kiit-university": {
    title: "3 Reasons to Study at KIIT University",
    description: "Discover 3 compelling reasons to study at KIIT University – top-ranked education, global exposure & world-class campus life.",
  },
  "celebrating-eid-al-fitr-and-embracing-new-educational-journeys": {
    title: "Eid al-Fitr: Embracing New Educational Journeys",
    description: "Celebrate Eid al-Fitr—marking the end of Ramadan with joy, prayers, feasts, and togetherness in Muslim communities worldwide.",
  },
  "which-country-is-best-for-nepalese-students-in-2026": {
    title: "Which Country Is Best for Nepalese Students in 2026?",
    description: "Which country is best for Nepali students in 2026? Compare study destinations by tuition, post-study work visas, PR options and career opportunities.",
  },
};

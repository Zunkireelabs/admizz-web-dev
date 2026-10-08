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
  "why-europe-is-the-hottest-destination-for-asian-students": [
    {
      question: "Why do Asian students choose to study in Europe?",
      answer:
        "The page points to globally recognized degrees, affordable tuition and scholarships, a wide range of programs, many taught in English, post-study work visas in several countries, and a multicultural environment that builds global exposure and international networks.",
    },
    {
      question: "Is studying in Europe cheaper than the USA, Canada or Australia?",
      answer:
        "The page says Europe is more affordable than the USA, Canada or Australia. Countries such as Germany and Norway offer tuition-free education at public universities, while others provide scholarships and financial aid to international students, and many universities also have low tuition fees.",
    },
    {
      question: "Which European countries are popular for Asian students?",
      answer:
        "Germany, France, the Netherlands, Sweden, and Finland are named as hosts of some of the best universities in the world, with programs in engineering, medicine, business, and the humanities. Germany, France, and the Netherlands are also noted for favorable immigration policies and post-study work visas.",
    },
    {
      question: "Can international students work in Europe after graduating?",
      answer:
        "Several European countries provide post-study work visas, so international students can gain work experience after graduation. Germany, France, and the Netherlands are noted for favorable immigration policies, which make it easier to move from education into employment.",
    },
  ],
  "denmarks-new-rules-for-nepali-students": [
    {
      question: "Why is Denmark making student visa rules stricter for Nepali students?",
      answer:
        "Denmark has strengthened its immigration framework to prevent misuse of student visas. The stated aims are to ensure genuine academic intent, reduce visa overstays, control illegal employment and dropouts, and protect the integrity of Denmark's education system. Nepali applicants now face additional scrutiny.",
    },
    {
      question: "What do Danish authorities check for Nepali student visa applicants?",
      answer:
        "Danish authorities now carry out more detailed background checks, including academic consistency, gap justification, and previous visa or travel history. They also check financial documents more strongly: sufficient funds for tuition and living expenses, a legitimate source of income, and a stable financial background.",
    },
    {
      question: "Why are student visas for Denmark refused to Nepali students?",
      answer:
        "Common reasons include a weak Statement of Purpose (SOP), a mismatch between past education and the chosen course, and doubts about the intention to return to Nepal. Unexplained bank deposits or weak financial ties can also raise red flags.",
    },
    {
      question: "How can Nepali students improve their chances of a Denmark student visa?",
      answer:
        "Choose a course and university that logically connect with your academic background, write a strong and genuine SOP explaining why Denmark and why this course, keep transparent financial records, avoid last-minute fund arrangements, and apply with expert guidance.",
    },
  ],
  "computer-engineering-vs-information-science-engineering": [
    {
      question: "What is the difference between computer engineering and information science engineering?",
      answer:
        "Computer engineering covers many hardware and software aspects of computing, from microcontrollers and microprocessors to circuit design. Information science engineering focuses on collecting, categorizing, and storing information and using theories and innovations to solve complex problems in the IT sector.",
    },
    {
      question: "What does a computer engineer do?",
      answer:
        "Computer engineers design and develop computer systems and other technological devices. They write software and firmware for embedded microcontrollers, design VLSI chips, analog sensors, mixed signal circuit boards, and operating systems. They are also suited for robotics research, which relies on digital systems to control electrical systems.",
    },
    {
      question: "What does an information science engineer do?",
      answer:
        "Information science and engineering professionals contribute to IT and other sectors through the analysis, design, development, support, and testing of software along with embedded applications. They focus on designing technological information systems as solutions to business, research data, and communication support needs.",
    },
    {
      question: "Which is better, computer engineering or information science engineering?",
      answer:
        "The page says you cannot compare the courses, as each has its own value. Analyze program brochures and guidelines, and choose the field of your interest while weighing total cost, university location, and other factors, along with your talents and long-term professional and financial goals.",
    },
  ],
  "five-reasons-why-you-should-study-in-australia": [
    {
      question: "Why should international students study in Australia?",
      answer:
        "The page lists globally ranked institutions, work experience alongside education, a safe environment, a high quality of life, and the chance to improve English language skills. Australian universities consistently rank highly in independent global rankings such as Times Higher Education, QS, and Shanghai Rankings.",
    },
    {
      question: "Can I get work experience while studying in Australia?",
      answer:
        "Yes. Many Australian degrees and vocational courses include work experience programs and internships, so you can gain hands-on industry experience and grow your professional network while you study. This lets you apply the knowledge and skills from your course to real-world situations.",
    },
    {
      question: "Is Australia safe for international students?",
      answer:
        "According to the page, Australian cities have some of the lowest crime rates in the world, and streets and public spaces are open and safe. It describes Australia as a peaceful and welcoming country with a multicultural society, so students can study without worrying about their safety or wellbeing.",
    },
    {
      question: "Will studying in Australia improve my English?",
      answer:
        "Yes. English is the primary language of instruction, so you will have many opportunities to practice your language skills in a supportive and immersive environment. The page says this can give you a competitive edge in the global job market and open up new career opportunities.",
    },
  ],
  "what-makes-bangalore-a-favored-destination-for-student": [
    {
      question: "Why do students choose Bangalore for higher education?",
      answer:
        "Students in the page cite safety, good weather, Bangalore's reputation as India's IT city, better opportunities, good infrastructure, and the presence of family in the city. Some also mention that colleges are easier to get into than in Delhi and that people are more accepting of others.",
    },
    {
      question: "Is Bangalore safe for students?",
      answer:
        "Safety plays a big role in students choosing to travel across the country. One student says her parents wanted a city where they would not have to worry about her safety, which is why she came to Bangalore instead of a city closer to home. Another lists safety and good weather as benefits.",
    },
    {
      question: "Is Bangalore good for computer science students?",
      answer:
        "One student from Jammu and Kashmir who wanted to study computer science says Bangalore's IT city tag was a big draw. In his words, Bangalore is India's IT city, so he felt the opportunities would be better there. He also lists safety and the good weather as benefits.",
    },
    {
      question: "How many students come to Karnataka for higher education?",
      answer:
        "A recent survey found Karnataka is the top higher-study destination in the country, with around 1.8 lakh students coming to the state from across India. The page calls Manipal the education hub of the state, while Bangalore is also a preferred destination.",
    },
  ],
  "why-study-in-india-instead-of-us-australia": [
    {
      question: "Why do Nepali students choose to study in India?",
      answer:
        "The page gives four main reasons: cultural resemblance between India and Nepal, affordability, convenient travel, and quality of education. It adds that admission to Indian educational institutions is relatively easier, and that India lets students be independent while staying close to home.",
    },
    {
      question: "Is studying in India cheaper than in the US or Australia for Nepali students?",
      answer:
        "Yes. The page says studying in India is relatively cheaper for a Nepali student than in any other western country. For a middle-class Nepali family, affordability is vital when deciding whether to send children abroad, and the page calls India the perfect solution to this problem.",
    },
    {
      question: "Do Nepali students need a visa to study in India?",
      answer:
        "The page says there is no visa requirement to travel to India, and you can travel by airplane, train, or even bus in some places. This makes traveling back and forth extremely convenient, so students can easily visit home during festivals or family emergencies.",
    },
    {
      question: "Is it easy to get admission in Indian institutions?",
      answer:
        "The page says admission in any Indian educational institution is relatively easier. It also describes India as one of the most competitive countries when it comes to quality education, which is one of the major reasons Nepali students prefer to study there.",
    },
  ],
  "uk-admission-guidance-for-international-students": [
    {
      question: "What are the most common mistakes when applying to UK universities?",
      answer:
        "The page lists not researching universities and courses properly, missing UCAS deadlines, a weak personal statement, ignoring entry requirements, submitting incomplete documents, applying for similar courses only, not preparing for interviews, overlooking financial planning, weak English skills, and not seeking expert guidance.",
    },
    {
      question: "Why is a personal statement important for a UK university application?",
      answer:
        "A generic personal statement is one of the biggest reasons applications get rejected. The page advises highlighting your strengths, motivation, achievements, and why you want to study in the UK, and making it personal and authentic.",
    },
    {
      question: "What happens if I miss the UCAS deadline?",
      answer:
        "UCAS deadlines are strict, especially for competitive courses like medicine, law, and engineering, and late submissions are rarely accepted. The advice is to stay ahead of deadlines and submit your UCAS application early.",
    },
    {
      question: "Do I need IELTS or TOEFL scores to apply to UK universities?",
      answer:
        "Applying without meeting English language test scores (IELTS/TOEFL) or subject prerequisites leads to automatic rejection, so review the admission criteria for each program carefully. The page adds that even with good scores, weak communication skills may affect your success.",
    },
  ],
  "study-in-usa-with-scholarship-from-nepal-a-complete-guide": [
    {
      question: "What types of scholarships are available for Nepali students in the USA?",
      answer:
        "The page lists merit-based scholarships for students with excellent academic records, need-based scholarships for those who need financial assistance, university-specific scholarships offering partial or full tuition support, and government and private scholarships, with programs like Fulbright named as examples.",
    },
    {
      question: "How do Nepali students apply for scholarships in the USA?",
      answer:
        "Research universities and identify available scholarships, prepare documents such as transcripts, recommendation letters, and test scores, write a compelling personal statement highlighting your academic goals and financial need, apply early, and apply to multiple opportunities to maximize your chances.",
    },
    {
      question: "When should I apply for US scholarships?",
      answer:
        "Apply early, as the page says scholarship deadlines are often months before the admission deadline. It also advises staying consistent and applying to multiple opportunities to maximize your chances of receiving a scholarship.",
    },
    {
      question: "Why choose the USA for higher studies?",
      answer:
        "The page says the USA consistently ranks among the top destinations for international students. It offers globally recognized degrees, access to cutting-edge research and technology, a multicultural environment that fosters global networking, and flexible academic structures that let students design their own study paths.",
    },
  ],
  "conquer-your-see-exams-last-minute-tips-resources-from-admizz-education": [
    {
      question: "How can I stay calm before my SEE exams?",
      answer:
        "Take deep breaths, since feeling anxious is normal but panicking will not help. Take time to relax your mind and body before the exam, practice calming techniques like meditation or deep breathing, and trust your knowledge and abilities because you have prepared for this.",
    },
    {
      question: "How much sleep do I need before the SEE exam?",
      answer:
        "The page says a good night's sleep of 7-8 hours is crucial for focus and memory. Avoid late-night cramming that can leave you tired and drained, and eat healthy, nutritious meals through the day to maintain energy, avoiding heavy or sugary foods that can cause a crash.",
    },
    {
      question: "How should I manage time during the SEE exam?",
      answer:
        "Quickly skim through the entire paper first to understand the format and question distribution. Allocate time for each section based on weightage and difficulty, and do not spend too much time on a single question. If you are stuck, move on and come back later if time permits.",
    },
    {
      question: "What should I do in the last few minutes of the exam?",
      answer:
        "Proofread and revise. Double-check your answers for factual errors or calculation mistakes, and take a few minutes to review them for clarity and completeness. The page also recommends writing neatly, using proper punctuation and grammar, and organizing answers logically.",
    },
  ],
  "how-to-make-right-decisions-in-student-life": [
    {
      question: "What are the steps in the decision-making process for students?",
      answer:
        "The page lists identifying the problem, doing background study of the problem, being creative, clearly communicating your decisions, analyzing personality traits and consequences, and choosing wisely after weighing the pros and cons of each alternative until you find the best one for your situation.",
    },
    {
      question: "Why are decision-making skills important for students?",
      answer:
        "The page says good decision-making is essential in life, and that decisions made in college can influence a student's life forever. These skills also help students assess their strengths and weaknesses, giving them the chance to improve weaker areas, and they support goal setting and self-discipline.",
    },
    {
      question: "How can I improve my decision-making skills as a student?",
      answer:
        "The page suggests developing your general knowledge, considering multiple options instead of deciding on a few criteria, listening to the opinions of others before making up your own mind, and determining the consequences in advance by visualizing the results and effects beforehand.",
    },
    {
      question: "Why should students think creatively when making decisions?",
      answer:
        "Thinking creatively and out of the box helps in finding a solution and gives you a competitive edge in decision-making. The page says that without an open mind your choices will be limited, so keep it open to explore all the options in front of you and then decide which will work best.",
    },
  ],
  "big-changes-to-uk-student-visa-rules-what-you-need-to-know": [
    {
      question: "When do the new UK student visa changes take effect?",
      answer:
        "The UK Home Office announced the changes on March 12, 2025, and they roll out in stages starting April 2025. Several of the changes, including PhD transfers, the medical and dental changes, and the new error correction process, take effect from April 9, 2025.",
    },
    {
      question: "Do PhD students need to show academic progress when switching universities?",
      answer:
        "From April 9, 2025, PhD students who need to switch universities to continue working with their academic supervisor no longer need to demonstrate academic progress when applying for a new student visa. The page calls this a big win for doctoral students, as it reduces administrative barriers.",
    },
    {
      question: "Can medical and dental postgraduates still get a UK student visa for foundation programs?",
      answer:
        "No. From April 9, 2025, Health Education England will no longer act as a licensed student visa sponsor, so you cannot apply for a student visa for foundation programs in medicine or dentistry. These programs will no longer qualify for the Graduate Route, and you would need the Skilled Worker visa route to stay and work.",
    },
    {
      question: "How are UK student visa errors corrected now?",
      answer:
        "Starting April 9, 2025, the UK Home Office handles corrections for errors in visa conditions or duration through a newly expanded Error Correction team. This applies to visa applications made within the UK, and administrative reviews are no longer an option for these issues, so check your visa details on receipt.",
    },
  ],
  "uk-education-nepal-growth": [
    {
      question: "Why are more Nepali students choosing the UK over Australia?",
      answer:
        "The page cites a more straightforward UK student visa process, affordable universities and scholarships, TNE pathways with Nepali colleges, MOI letters accepted for English waivers, and post-study work opportunities. It also says Australia's tightened visa rules and immigration clampdown led many to reconsider their options.",
    },
    {
      question: "How much are tuition fees at UK universities for Nepali students?",
      answer:
        "The page says average tuition fees range from £11,500 to £13,500 per year, and several UK universities provide great value for money. Many institutions also offer partial scholarships or fee discounts, making UK education more accessible for Nepali students.",
    },
    {
      question: "Can I use an MOI letter instead of IELTS for UK universities?",
      answer:
        "Many UK universities accept a Medium of Instruction (MOI) letter in place of IELTS or other language exams. If your previous education was in English, that is often enough, which saves students both time and money.",
    },
    {
      question: "What is a TNE pathway to study in the UK?",
      answer:
        "Many UK universities collaborate with colleges in Nepal through transnational education (TNE) programs. Colleges like ISMT and Softwarica offer students a chance to begin studies in Nepal and complete them in the UK, which helps reduce costs and ease the transition abroad.",
    },
  ],
  "uk-international-education-policy-2026": [
    {
      question: "Who can bring dependants on a UK student visa under the 2026 policy?",
      answer:
        "Only postgraduate research students (PhD or equivalent) can bring dependants. Undergraduate and taught master's students are generally excluded, while existing dependant visas remain valid under prior approvals. The page advises early planning for finances, accommodation, and family arrangements.",
    },
    {
      question: "Is the Graduate Route still available in 2026?",
      answer:
        "Yes. The Graduate Route continues but with closer monitoring. It gives 2 years of post-study work for graduates and 3 years for PhD graduates, with increased scrutiny of job relevance and visa compliance.",
    },
    {
      question: "Why did the UK update its international education policy?",
      answer:
        "The UK government revised its education and immigration framework to control misuse of student visa routes, reduce pressure on housing and public services, protect genuine students and reputable institutions, and align education outcomes with workforce demands. The page says the objective is not to limit international education.",
    },
    {
      question: "What visa checks apply to international students in the UK in 2026?",
      answer:
        "Visa assessments now include stronger verification of proof of funds, English language proficiency, and genuine student intent during interviews. The page says these measures reduce future visa risks and protect legitimate applicants.",
    },
  ],
  "3-reasons-why-you-should-study-at-kiit-university": [
    {
      question: "How is KIIT University ranked?",
      answer:
        "KIIT University is ranked No. 1 among the Private Higher Education Indian Universities by the Atal Ranking of Institutions on Innovation Achievements (ARIIA). Times Higher Education places its Computer Science Engineering program in the 301-400 cohort and its overall Engineering ranking in the 401-500 cohort in the world.",
    },
    {
      question: "Is KIIT University internationally recognized?",
      answer:
        "Yes, the page says KIIT University has gained recognition from various international organizations for its teaching and research. In 2021 it became India's first QS 5 Stars Rated University, receiving 5 stars after an assessment of all the categories of QS criteria.",
    },
    {
      question: "What courses can I study at KIIT University?",
      answer:
        "KIIT University offers a wide range of undergraduate and postgraduate courses in disciplines such as engineering, law, medicine, management, fashion and film. The page says it combines highly experienced faculty with state-of-the-art infrastructure to prepare students for careers in their chosen fields.",
    },
  ],
  "top-5-reasons-to-study-in-the-usa": [
    {
      question: "Why should I study in the USA?",
      answer:
        "The page gives five reasons: high-quality education, diversity, career opportunities, flexibility and life experience. The United States is home to prestigious universities such as Harvard, Yale and Stanford, and offers a wide range of programs, cultures and chances to gain real-world experience.",
    },
    {
      question: "What are the career opportunities for students in the USA?",
      answer:
        "The US is home to some of the world's largest and most innovative companies, which gives students a wealth of career opportunities. Many universities have close ties with these companies, offering students the chance to gain real-world experience and connections in their chosen field.",
    },
    {
      question: "Can I choose my own subjects at a US university?",
      answer:
        "Yes. American universities offer a wide range of programs and courses, so you can tailor your education to your interests and career goals. You can choose from a variety of majors, minors and electives, and take advantage of internships, research opportunities and study abroad programs.",
    },
  ],
  "time-management-tips-for-students": [
    {
      question: "How do I manage my time as a student?",
      answer:
        "Start by making a proper schedule for each day: identify your work and prioritize the tasks you need to complete. You can keep a journal or use colorful markers to track your routine. The page says a schedule helps both in college life and in your professional life.",
    },
    {
      question: "How do I set study goals?",
      answer:
        "After listing what you need to do, set goals for the completion of your work, such as a goal for each study session. For example, you can aim to read six pages of your history book. You can also set a goal not to engage in any distracting behavior during dedicated study time.",
    },
    {
      question: "How can I avoid distractions while studying?",
      answer:
        "Notice what pulls your focus away, such as your cell phone or a neighbor playing loud music. When it is time to study, turn off your phone or ask your neighbor to lower the music. The page also advises avoiding excessive web surfing and not multitasking.",
    },
  ],
  "study-abroad-made-simple-your-global-journey-starts-with-admizz-education": [
    {
      question: "Which countries can I study in as an international student?",
      answer:
        "Admizz Education places students in top study destinations such as the USA, UK, Canada, Australia, Germany, France, Ireland, New Zealand, Dubai, Denmark and South Korea. Counselors give personalized mentoring based on your academic goals, financial requirements and career aspirations.",
    },
    {
      question: "What services does a study abroad consultancy provide?",
      answer:
        "According to the page, services include career counseling and course guidance, university shortlisting, SOP, LOR, CV and application assistance, scholarship guidance, education loan assistance, visa filing and mock interviews, and accommodation and pre-departure support.",
    },
    {
      question: "Which English and entrance tests can I prepare for?",
      answer:
        "Admizz Education offers test preparation support for exams like IELTS, TOEFL, PTE, SAT, GRE and GMAT, and more. The page says the training covers all major study abroad exams, to help students compete globally and perform their best.",
    },
  ],
  "choosing-study-destinations-australia-or-the-united-kingdom": [
    {
      question: "How much does it cost to study in Australia or the UK?",
      answer:
        "Australia typically has tuition fees of AUD 25,000 to 45,000 per year, with living costs around AUD 21,000 per year. The UK usually has tuition fees between £15,000 and £30,000 per year, with living expenses averaging around £12,000 per year. Scholarships and part-time work can reduce expenses.",
    },
    {
      question: "How many hours can international students work in Australia and the UK?",
      answer:
        "The Australian Student Visa (Subclass 500) allows work up to 48 hours per fortnight during semesters and full-time during breaks. The UK Student Visa allows 20 hours of work per week during term time and full-time during vacations.",
    },
    {
      question: "Which courses are popular with Nepali students in Australia and the UK?",
      answer:
        "Popular courses in both Australia and the UK, according to the page, include Business and Management, Information Technology (IT), Engineering and Construction, Health and Nursing, Hospitality and Tourism, and Accounting and Finance.",
    },
  ],
  "australias-new-md115-student-visa-rule-what-you-need-to-know": [
    {
      question: "What is the Australian MD115 student visa rule?",
      answer:
        "MD115 is Ministerial Direction 115, which Australia applies from November 14, 2025. It is part of the managed growth strategy for international education. Each institution has a set number of new international students it can take, and this affects how fast your Subclass 500 Student Visa is processed.",
    },
    {
      question: "How long will visa processing take under MD115?",
      answer:
        "It depends on how full your institution is. Priority 1 (under 80% capacity used) takes 1–4 weeks. Priority 2 (80–115%) takes 5–8 weeks. Priority 3 (over 115%) takes 8–12+ weeks, so a visa may take 2–3 months longer if your university already has too many students.",
    },
    {
      question: "How can I avoid visa delays under MD115?",
      answer:
        "Apply early, choose a university within its student allocation, and prepare complete documents, including financials, academic records and a statement of purpose. Ask your counselor about your chosen institution's status under MD115, and present your true study goals and intentions.",
    },
  ],
  "study-in-the-uk-complete-guide-for-2026": [
    {
      question: "How much does it cost to study in the UK?",
      answer:
        "Approximate tuition fees are £10,000 - £20,000 per year for undergraduate, £11,000 - £25,000 for postgraduate and £20,000 - £40,000 for MBA. Living expenses are £1,200 - £1,500 per month in London and £800 - £1,100 per month outside London.",
    },
    {
      question: "How many hours can international students work in the UK?",
      answer:
        "International students can work up to 20 hours per week during term and full-time during holidays. Popular part-time jobs include retail assistant, café or restaurant staff, library or campus jobs, and warehouse and logistics roles.",
    },
    {
      question: "What are the steps of the UK student visa process?",
      answer:
        "Receive an offer from a UK university, obtain your CAS (Confirmation of Acceptance for Studies), apply online for the UK Student Visa, submit biometrics, attend an interview if required, and receive the visa decision. Key requirements include a valid CAS, proof of funds, an English language test and academic documents.",
    },
    {
      question: "How long can I work in the UK after graduating?",
      answer:
        "After graduation, students can apply for the UK Graduate Route Visa. It lasts 2 years for Bachelor's and Master's graduates and 3 years for PhD graduates, giving international work exposure and a pathway toward long-term employment visas.",
    },
  ],
  "importance-of-research-for-students": [
    {
      question: "Why is research important for students?",
      answer:
        "Research is an essential part of education. It helps students become innovative and creative, develop a perspective on various subjects, and bring rigor to their thinking. The page says research skills can also lead students to cutting-edge teams and shape what a person is known for in the academic community.",
    },
    {
      question: "How does research improve critical thinking?",
      answer:
        "Critical thinking is an important skill for life beyond college and for success in any career field. It takes time to develop, especially when evaluating information sources, so doing research early helps build these skills while they are still fresh.",
    },
    {
      question: "How does research help with problem-solving?",
      answer:
        "Researching a problem can help you find the solution. If a personal or professional issue is giving you trouble, you can look at what others have done in similar situations. Studying what has worked for others gives valuable insights into how to address your problem creatively and effectively.",
    },
  ],
  "benefits-of-self-study-for-students": [
    {
      question: "What are the benefits of self-study for students?",
      answer:
        "Self-study helps you learn more effectively, encourages curiosity, lets you learn at your own pace and builds a sense of responsibility. It also increases your confidence as you are used to tackling problems on your own, and gives you freedom to learn without restriction.",
    },
    {
      question: "Does self-study help me learn at my own pace?",
      answer:
        "Yes. Self-study allows you to learn at your own speed and focus on the topics you want to understand better. The page says this helps reduce feelings of frustration, fear or boredom that you may experience in the classroom.",
    },
    {
      question: "Why does self-study make me more responsible?",
      answer:
        "When you study by yourself, you make your own notes and collect your own reading materials, which creates a sense of responsibility. It also gives you the ability to make decisions, solve problems and correct your own mistakes.",
    },
  ],
  "best-courses-for-studying-abroad-in-2026": [
    {
      question: "What are the best courses to study abroad in 2026?",
      answer:
        "The page lists technology, healthcare, engineering, business, and architecture and design among the future-ready fields, along with media, film, animation and digital arts. It says the global job market is shifting toward digital innovation, automation, environmental sustainability and advanced healthcare.",
    },
    {
      question: "Which countries are listed for Computer Science and IT courses?",
      answer:
        "The page lists the USA, UK, Canada, Australia and Ireland as destinations for Computer Science, Software Engineering and IT. Top specializations include Cybersecurity, Cloud Computing, DevOps, IT Management, and Web and App Development.",
    },
    {
      question: "Where can I study nursing and healthcare courses abroad?",
      answer:
        "For Healthcare, Nursing and Life Sciences, the page lists Canada, UK, Australia and Ireland as destinations. Programs include Nursing, Public Health, Biomedical Sciences, Pharmacy and Biotechnology, which the page says offer job security and strong PR routes.",
    },
  ],
  "what-are-tinkering-labs": [
    {
      question: "What are Atal Tinkering Labs?",
      answer:
        "Atal Tinkering Labs (ATLs) are advanced play workspaces for students between Class 6 to 12, strengthening innovation and combining science and technology. They are open-ended innovation workspaces set up to promote innovation and entrepreneurship in schools, colleges and industry.",
    },
    {
      question: "What equipment do Atal Tinkering Labs have?",
      answer:
        "The labs are equipped with technologies like 3D printers, robotics, sensor technology kits, Internet of Things and miniaturised devices. These help students learn and solve local community problems using emerging technologies.",
    },
    {
      question: "How many schools are covered by Atal Tinkering Labs?",
      answer:
        "The page says AIM has 2,441 schools to cover, chosen from more than 25,000 applications over two rounds. With the new schools, ATLs will reach more than 98% of smart cities and 93% or more of districts, with at least one ATL in 34 states and union territories.",
    },
  ],
  "4-major-difference-between-ielts-pte": [
    {
      question: "What is the main difference between IELTS and PTE?",
      answer:
        "The most noticeable difference is format. IELTS is a paper-based test where candidates fill in answers on a paper answer sheet, while PTE is a computer-based test where candidates interact with a computer interface to answer the questions.",
    },
    {
      question: "How is the speaking test different in IELTS and PTE?",
      answer:
        "The PTE speaking section involves recording your voice into a microphone, while IELTS requires a face-to-face interview with an examiner. PTE also includes a section on oral fluency, where you speak in response to a prompt for a short period of time.",
    },
    {
      question: "How are IELTS and PTE scored?",
      answer:
        "Both tests are scored on a scale from 0 to 9, but the scoring criteria and algorithms may differ. IELTS is scored by a human examiner using a standardized rubric, while PTE uses automated scoring technology to analyze responses.",
    },
    {
      question: "Where can I take IELTS or PTE?",
      answer:
        "IELTS is available in over 140 countries, with more than 1,600 test centers worldwide. PTE is available in fewer locations but is offered in over 50 countries, and its computer-based format allows greater flexibility and convenience.",
    },
  ],
  "top-ranked-mba-colleges-in-india-2021": [
    {
      question: "Which is the top MBA college in India according to this list?",
      answer:
        "IIM Ahmedabad was ranked 1 by NIRF 2020 and is considered the best institution for Management Education in India. Established in 1961, it is a public and autonomous institute with EQUIS accreditation, and offers admission based on a valid CAT score.",
    },
    {
      question: "What CAT percentile is needed for IIM Ahmedabad?",
      answer:
        "The page says the CAT percentile for IIM Ahmedabad reached up to 99.6 in the past years, which shows how rigorous it is for a student to get admission to this institute. Admission is based on a valid score in CAT.",
    },
    {
      question: "How is IIM Bangalore ranked?",
      answer:
        "IIM Bangalore was ranked 2 among the top 100 B-schools in India in NIRF 2020. Established in 1973, it admits over 1,200 students across several programs every year and has been accredited by EQUIS since 2019.",
    },
  ],
  "navigating-global-education-celebrating-international-students-day": [
    {
      question: "When is International Students Day celebrated?",
      answer:
        "International Students Day is celebrated globally every year on November 17th. It honors the remarkable contributions of students studying abroad, and the page marks it by looking at education and study opportunities in several countries.",
    },
    {
      question: "Which study abroad destinations does the page cover?",
      answer:
        "The page covers India, the USA, Australia, France, Canada and the UK. It describes India as a cultural hub with a rich history, the USA as the land of opportunities, Australia as known for quality education and a vibrant lifestyle, and Canada for its welcoming atmosphere.",
    },
    {
      question: "What fields can I study abroad?",
      answer:
        "Programs run from undergraduate to postgraduate studies and cover diverse fields such as technology, business, healthcare, arts, and more. Admizz Education's counselors work with students to understand their aspirations and guide them towards programs that align with their career goals.",
    },
  ],
  "tips-for-overall-development-of-your-child": [
    {
      question: "How can parents improve a child's confidence?",
      answer:
        "A single examination grade should not shatter your child's confidence. Parents should convince the child about his or her caliber and help boost confidence, so that an underperforming result does not define how the child sees themselves.",
    },
    {
      question: "Why is a daily routine important for a child?",
      answer:
        "The page suggests making a daily routine for the child and making sure it is followed. The routine should be balanced, including recreational activities and outdoor sports, and it should give attention to every subject in the syllabus.",
    },
    {
      question: "How can parents help a child with strong and weak subjects?",
      answer:
        "Parents should know the child's favorite subject, where he or she can excel as they grow up, and motivate the child more in that area. They should also identify weak subjects and help the child do well there, possibly with online tutors or other available materials.",
    },
  ],
  "top-5-universities-to-study-in-uk-based-on-qs-rankings-2023": [
    {
      question: "Which are the top 5 universities in the UK according to QS Rankings 2023?",
      answer:
        "The page lists the University of Oxford, the University of Cambridge, Imperial College London, University College London (UCL) and the University of Edinburgh as top UK universities known for their global reputation and academic excellence.",
    },
    {
      question: "What is Imperial College London known for?",
      answer:
        "Imperial College London is recognized for its emphasis on science, technology, engineering and medicine. The page describes it as renowned for cutting-edge research and a practical approach, with a diverse student body and close ties to industry.",
    },
    {
      question: "How should I choose between UK universities?",
      answer:
        "The page notes that each institution has its own unique strengths. Students should carefully consider their academic interests, career aspirations and personal preferences to select the university that aligns best with their goals.",
    },
  ],
  "10-interesting-facts-about-india": [
    {
      question: "Where is Lake Roopkund and why is it famous?",
      answer:
        "Lake Roopkund is a glacial lake in the Himalayas at about 16,470 feet. It is famous for the human skeletons found in the lake and the surrounding areas, believed to be the remains of people from the 9th century who perished during a severe hail storm.",
    },
    {
      question: "Which Indian village has no locks or doors?",
      answer:
        "The village of Shani Shingnapur is famous for having no door or lock on a single house. The page says there has not been a recorded criminal act there for almost 400 years, and residents believe Lord Shani is the guardian of the town.",
    },
    {
      question: "Where did the game Snakes and Ladders originate?",
      answer:
        "Snakes and Ladders originated in India. It was earlier known as Moksha Patamu and was first invented as a moral lesson about karma to be taught to children, before it was commercialized and became one of the most popular board games in the world.",
    },
    {
      question: "How much of the world's spices come from India?",
      answer:
        "Around 70% of the world's spices come from India, which the page describes as by far the largest producer of spices. Some of the best-known spices are turmeric, cumin, saffron and chili powders, shipped across continents to kitchens worldwide.",
    },
  ],
  "australia-streamlines-student-visas-focus-on-genuine-students": [
    {
      question: "What is the Genuine Student requirement for Australian student visas?",
      answer:
        "From March 23rd, 2024, a new Genuine Student (GS) requirement will replace the existing Genuine Temporary Entrant (GTE) for student visa applications. The assessment prioritizes your study plans, reasons for choosing Australia and ties to your home country.",
    },
    {
      question: "What new questions will Australian student visa applications include?",
      answer:
        "Application forms will have new questions designed to understand your study choices, your motivations for selecting Australia and your current life situation. Applicants will also confirm their understanding of visa conditions, including limited post-study migration options.",
    },
    {
      question: "How can I prepare for the Australian student visa changes?",
      answer:
        "The page advises early preparation: familiarize yourself with the upcoming changes to ensure a smooth application. The revised format aims to simplify the process for serious students, and the emphasis is on showing genuine interest in quality education in Australia.",
    },
  ],
  "ielts-preparation-in-nepal": [
    {
      question: "Which institutions accept IELTS?",
      answer:
        "IELTS is accepted by over 11,000 institutions worldwide, including universities in the USA, UK, Canada, Australia and New Zealand. The exam tests your English skills in four areas: Listening, Reading, Writing and Speaking.",
    },
    {
      question: "Why is a good IELTS score important for studying abroad?",
      answer:
        "A strong IELTS score can increase your chances of admission to prestigious universities, help you qualify for scholarships and financial aid, and fulfill the visa requirements for your desired study destination.",
    },
    {
      question: "Who should join IELTS classes in Nepal?",
      answer:
        "The IELTS preparation classes are suited to high school graduates applying for undergraduate programs abroad, university graduates seeking postgraduate admissions, and students aiming for scholarship opportunities. The page says the coaching covers test structure, vocabulary and grammar, listening, writing and simulated speaking tests.",
    },
  ],
  "foreign-university-admission-from-nepal": [
    {
      question: "Which exam do I need: GRE, GMAT or SAT?",
      answer:
        "The GRE is needed for most master's programs, especially in science, engineering and humanities. The GMAT is for students aiming for an MBA or business-related master's degree. The SAT is required by many universities abroad for undergraduate admissions.",
    },
    {
      question: "How long should I prepare for the GRE, GMAT or SAT?",
      answer:
        "The page suggests dedicating 3-6 months for serious preparation, breaking your schedule into daily study blocks for verbal, quantitative and writing, and sticking to the plan to avoid last-minute stress.",
    },
    {
      question: "How can I prepare for GRE, GMAT and SAT exams from Nepal?",
      answer:
        "Strengthen your basics in English and math, plan your study time, attempt regular full-length mock tests, analyze results to find weak areas, and consider expert coaching. Staying consistent matters: steady effort beats last-minute cramming.",
    },
  ],
  "navigating-your-future-the-importance-of-assessing-a-colleges-alumni-network": [
    {
      question: "Why should I check a college's alumni network?",
      answer:
        "A college's alumni network can open doors to new opportunities, both during your time at college and long after you graduate. It is a key part of building lifelong connections, and the page says it should be a priority when selecting the right college.",
    },
    {
      question: "How can an alumni network help with jobs and internships?",
      answer:
        "Whether you are seeking internships, job opportunities or mentorship, tapping into an active alumni network can give you a competitive edge in your field of study. These networks can also offer mentorship from graduates who have excelled in their fields.",
    },
    {
      question: "What resources do strong alumni networks provide?",
      answer:
        "The page says robust alumni networks provide valuable resources and support services, including career counseling, resume assistance and access to exclusive events. Admizz Education partners with colleges that offer such networks so students can use these resources in their academic and professional journey.",
    },
  ],
  "top-5-universities-of-india-based-on-nirf-rankings-2023": [
    {
      question: "What is NIRF?",
      answer:
        "The National Institutional Ranking Framework (NIRF) is an initiative by the Government of India to rank higher education institutions across the country. The rankings are based on several parameters, including teaching, research, perception and outreach.",
    },
    {
      question: "Which are the top 5 universities in India based on NIRF 2023?",
      answer:
        "The page lists the Indian Institute of Science, Jawaharlal Nehru University, Jamia Millia Islamia, Jadavpur University and Banaras Hindu University as the top 5 universities based on the NIRF rankings of 2023.",
    },
    {
      question: "Which university is ranked top in India under NIRF?",
      answer:
        "According to the page, the Indian Institute of Science (IISc) in Bangalore is consistently ranked as the top university in India in the NIRF rankings. It was established in 1909 and offers undergraduate, postgraduate and doctoral programs in science, engineering, design and management.",
    },
  ],
  "about-higher-education-in-india": [
    {
      question: "What is the gross enrollment ratio in higher education in India?",
      answer:
        "The government set a target to raise the gross enrollment ratio (GER) in higher education to 30% by 2020. The page says this goal was achieved, with a GER of 31.3% in 2019-20.",
    },
    {
      question: "What challenges does higher education in India face?",
      answer:
        "Quality remains a major concern, with many institutions facing inadequate infrastructure and a lack of qualified faculty. There is also a significant gap in access between urban and rural areas and between different socioeconomic groups.",
    },
    {
      question: "Is online education allowed in India?",
      answer:
        "Yes. The page notes a push towards online and distance education, and in 2020 the University Grants Commission (UGC) allowed online education to be a regular mode of teaching, as part of the idea of education on demand.",
    },
  ],
  "pros-and-cons-of-online-classes": [
    {
      question: "What are the pros of online classes?",
      answer:
        "The page lists flexibility, since you can study anywhere, convenience with notes and recorded lectures available, financial benefits from saving on transport, meals and hostel fees, and improved student attendance.",
    },
    {
      question: "What are the cons of online classes?",
      answer:
        "The page lists a sense of isolation, an easier tendency to procrastinate, the need for good time management with more screen time, and the risk that too much freedom turns into bad habits that hurt focus.",
    },
    {
      question: "How can I deal with isolation in online classes?",
      answer:
        "You can request your teacher for online messages, emails and video conferencing, which allow for face-to-face interaction. This helps reduce the sense of isolation, because in a virtual class your only company is your computer and you miss your friends.",
    },
    {
      question: "Do online classes save money?",
      answer:
        "Yes. The page says online classes eliminate the costs of student transportation, meals and hostel fees, and because study materials are available online, you do not have to buy copies and notebooks.",
    },
  ],
  "5-reasons-why-uk-is-an-ideal-study-destination": [
    {
      question: "How long are courses in the UK?",
      answer:
        "Most undergraduate courses in the UK are only three years long, and postgraduate courses are typically one year in duration. This reduces the overall cost of education and lets students enter the workforce or pursue further studies earlier than their counterparts in other countries.",
    },
    {
      question: "Can international students work while studying in the UK?",
      answer:
        "International students in the UK are allowed to work part-time during term-time and full-time during vacations. This gives them the chance to earn some extra money to support their studies and gain valuable work experience that can improve their employability after graduation.",
    },
    {
      question: "Are UK degrees recognized by employers?",
      answer:
        "UK universities are globally recognized for academic excellence and research output, and many are members of the Russell Group. UK degrees are highly regarded by employers worldwide, which makes them a valuable asset for students who want a successful career.",
    },
    {
      question: "Do UK universities help students find work experience?",
      answer:
        "Yes. UK universities have strong links with industry and offer internships, work placements and other industry-focused initiatives. Many universities also have dedicated career services that give students guidance and support to improve their employability after graduation.",
    },
  ],
  "mobile-apps-for-a-smooth-stay-in-india": [
    {
      question: "Which mobile apps are useful for students living in India?",
      answer:
        "The page lists Google Translate for language gaps, Google Maps Navigation for directions, PhonePe or Google Pay for payments, BookMyShow and Paytm Insider for events, Zomato and Swiggy for food delivery, and Spotify or Amazon Prime Music for listening to music.",
    },
    {
      question: "Which app helps if I do not speak Hindi in India?",
      answer:
        "English is common in various parts of India, but if you do not know Hindi or other state languages you might get in trouble. Google Translate helps you communicate, and it is especially useful in remote parts of the country because it translates into regional Indian languages.",
    },
    {
      question: "Which apps can I use to pay for things in India?",
      answer:
        "Google Pay can be used for bill payments, booking events and sending money to people in your contact list. Other apps widely used in India include PhonePe, PayTM, Freecharge and RazorPay. Google Pay also accepts payments in almost 100 currencies from around the world.",
    },
    {
      question: "How can I order food when I miss home-cooked meals in India?",
      answer:
        "Apps such as Zomato and Swiggy let you order from your favorite restaurants when you are tired of hostel food. They provide lists based on cuisine and budget preferences, and after you make your pick, they deliver it to you. With UberEats, you can even track your food.",
    },
  ],
  "top-5-adventurous-sport-in-india": [
    {
      question: "What are the top adventure sports to try in India?",
      answer:
        "The page lists mountain biking, paragliding, surfing, sky-diving and scuba diving as the top five adventure sports in India. India's varied geography, from dry desert to heavy rainfall regions, makes it one of the happy places for adventure sports lovers.",
    },
    {
      question: "Where can I go paragliding in India and when is the best time?",
      answer:
        "The best places to go paragliding in India are Bir Billing in Himachal Pradesh and Nandi Hills in Bangalore. Paragliding is open throughout the year except for the heavy monsoons in July-September, and January is the best time in Bir when the mountains around are covered in snow.",
    },
    {
      question: "How much does skydiving cost in India?",
      answer:
        "Skydiving is quite expensive compared to other adventurous sports. A single tandem jump will cost you upwards of 30k, while a solo jump course will be 2.5 lacs. Aamby Valley in Maharashtra, Mysore in Karnataka and Deesa in Gujarat are popular places for sky-diving in India.",
    },
    {
      question: "Where can I go surfing in India?",
      answer:
        "Covelong Point, Chennai is the first surfing village in India, and an international surf festival is organized there. Other places to enjoy surfing include Ramakrishna Beach in Andhra Pradesh, Kovalam Beach in Kerala and Gokarna in Karnataka. Make sure you are mentally and physically prepared to face the wave.",
    },
  ],
  "isic-explained-why-every-international-student-should-have-one": [
    {
      question: "What is an ISIC card?",
      answer:
        "The International Student Identity Card (ISIC) is described as the only internationally recognized proof of student status. It is accepted by educational institutions, travel partners, cultural centers and service providers worldwide, and it helps students access benefits that are otherwise unavailable with a regular student ID.",
    },
    {
      question: "Who can apply for an ISIC card?",
      answer:
        "ISIC is available to full-time international students, students enrolled in recognized educational institutions, and learners aged 12 years and above. Unlike regular student IDs, ISIC works across borders, which makes it suitable for globally mobile students who study outside their home country.",
    },
    {
      question: "What documents do I need to apply for ISIC?",
      answer:
        "Required documents typically include a recent photograph, valid identity proof, and proof of student enrollment or an offer letter. Once the application is approved, the ISIC card is issued with one-year validity. A digital version is also available, so students can use their benefits through a mobile device.",
    },
    {
      question: "What discounts does an ISIC card offer?",
      answer:
        "ISIC offers discounts on transportation, accommodation, travel-related services and student insurance plans. It also gives lifestyle savings on food and dining, shopping and retail, entertainment and leisure activities, and cultural and educational attractions, which helps students manage their budgets more effectively.",
    },
  ],
  "part-time-jobs-for-international-students-uk": [
    {
      question: "How many hours can international students work in the UK?",
      answer:
        "Full-time international students can work up to 20 hours per week during term time. Students enrolled in courses below degree level or language programs can work up to 10 hours per week. During official university holidays, students are allowed to work full-time. Always check your visa conditions carefully.",
    },
    {
      question: "Can part-time postgraduate international students work in the UK?",
      answer:
        "Part-time postgraduate international students cannot work in the UK. Some roles are also restricted for students: self-employment, freelance work, permanent roles, and jobs as a professional sportsperson, entertainer, or doctor or dentist in training are not allowed. Any violation of visa conditions could affect your studies and your stay.",
    },
    {
      question: "What types of part-time jobs are available for international students in the UK?",
      answer:
        "There are three main categories. On-campus jobs include library assistant, teaching or lab assistant, student ambassador and campus guide. Off-campus jobs are in retail, hospitality, customer service or delivery and often pay higher wages. Online jobs include tutoring, content writing, digital marketing and social media management, with flexible schedules.",
    },
    {
      question: "What are the highest paying part-time jobs for students in the UK?",
      answer:
        "The page lists accountant at an average of £15–£20 per hour, computer programmer at around £20,000 per year part-time, teaching assistant or tutor at around £23,000 per year, customer service representative at up to £10.35 per hour, and pet care services at an average of £24 per day.",
    },
  ],
  "cost-of-studying-and-living-in-the-uk": [
    {
      question: "How much are tuition fees in the UK for Nepali students?",
      answer:
        "Undergraduate programs cost £12,000 – £25,000 per year and postgraduate programs cost £13,000 – £30,000 per year. Tuition at prestigious institutions like Oxford, Cambridge or Imperial College may exceed £35,000 annually. Nepali students can also find scholarships, fee waivers and part-time work opportunities to manage expenses.",
    },
    {
      question: "How much does it cost to live in the UK per month?",
      answer:
        "Living in London costs £1,200 – £1,800 per month, while other cities such as Manchester, Birmingham and Glasgow cost £900 – £1,400 per month. Expenses typically include rent, utilities, food, transport and personal spending. Using student discounts and budgeting carefully can significantly reduce costs.",
    },
    {
      question: "How much do IELTS and TOEFL cost for UK study?",
      answer:
        "Most UK universities require English proficiency tests such as IELTS or TOEFL. IELTS costs £150 – £200 and TOEFL costs £180 – £250. Some programs may also require standardized tests like GMAT or GRE, depending on the course. Early preparation can improve your chances of acceptance.",
    },
    {
      question: "How much is the UK student visa fee for Nepali students?",
      answer:
        "The application costs £558 for the visa, plus a healthcare surcharge of £776 per year. Nepali students require a UK Student Visa to study in the country, and the guide links to a step-by-step article on the visa process.",
    },
  ],
  "top-universities-in-the-uk": [
    {
      question: "Which UK universities are popular with international students?",
      answer:
        "The page lists the University of Oxford, University of Cambridge, Imperial College London, London School of Economics, University College London, University of Edinburgh, King's College London, University of Manchester, University of Warwick and University of Glasgow as its top 10 universities in the UK for international students.",
    },
    {
      question: "What are the most popular courses for international students in the UK?",
      answer:
        "Popular choices include Business and Management Studies such as MBA, Finance and Marketing; Engineering and Technology; Medicine and Healthcare, including Nursing and Public Health; Law and Social Sciences; and Creative Arts and Humanities such as Literature, Fine Arts and Architecture.",
    },
    {
      question: "What scholarships are available for international students in the UK?",
      answer:
        "Options include Chevening Scholarships, which are the UK Government's global scholarship program, and Commonwealth Scholarships for students from Commonwealth nations. There are also university-specific scholarships such as Oxford Clarendon, Cambridge Gates and UCL Global, plus merit-based and need-based aid for outstanding students and those with financial need.",
    },
  ],
  "international-scholarships-for-nepalese-students": [
    {
      question: "Who can apply for international scholarships from Nepal?",
      answer:
        "International scholarships are available for a wide range of students from Nepal, regardless of academic background or study level. Eligibility varies by institution and program, but common requirements include strong academic performance, English language proficiency (IELTS/TOEFL), a well-written Statement of Purpose, extracurricular or leadership experience and letters of recommendation.",
    },
    {
      question: "What do international scholarships for Nepali students cover?",
      answer:
        "Scholarships can cover tuition fees, living expenses, travel costs and more. Beyond money, they let deserving students focus on academic and personal growth without financial stress. Key benefits listed include access to world-class education, exposure to global cultures and networks, boosted academic and professional credibility and increased career opportunities after graduation.",
    },
    {
      question: "How can I improve my scholarship application?",
      answer:
        "Start early, because many scholarships have deadlines months before the course begins. Customize your Statement of Purpose so it is personal, clear and aligned with your goals. Maintain academic consistency, since strong grades are often a key selection factor, and stay organized by tracking requirements, deadlines and submission formats. Professional guidance can also improve application quality.",
    },
  ],
  "four-documents-to-prepare-for-university-applications": [
    {
      question: "What documents are needed for a university application?",
      answer:
        "Four key documents are commonly required: transcripts, standardized test scores, English language proficiency scores and letters of recommendation. Exact requirements vary by institution and program, so check the specific requirements for each university and program to make sure you submit everything needed.",
    },
    {
      question: "Do international students need English proficiency scores?",
      answer:
        "If you are an international student or a non-native English speaker, you will likely need to provide English language proficiency scores. Common tests include the TOEFL or IELTS. These scores demonstrate your ability to communicate effectively in English and to participate fully in the academic program.",
    },
    {
      question: "Who should write my letter of recommendation?",
      answer:
        "Letters of recommendation may be written by teachers, professors, employers or other professionals who can attest to your academic abilities and personal qualities. It is important to choose individuals who know you well and can provide meaningful insights into your character and potential.",
    },
  ],
  "scholarships-for-nepali-students-to-study-in-india": [
    {
      question: "How many scholarships does India offer to Nepali students?",
      answer:
        "Each year, the Government of India offers around 1,500 scholarships to Nepali nationals, benefitting students studying both in India and within Nepal. Since 2006, more than 27,000 Nepali students have been supported through these programs, which span undergraduate, postgraduate and Ph.D. levels.",
    },
    {
      question: "Which Indian scholarships are available for undergraduate studies?",
      answer:
        "Undergraduate options include the Atal Bihari Vajpayee General Scholarship Scheme for non-medical bachelor programs like B.Tech, BBA, BCA and B.Sc., and the COMPEX Scholarship Scheme for engineering, agriculture, pharmacy, food technology and nursing. The Golden Jubilee Scheme supports MBBS, BDS, engineering and other 3-year bachelor's programs in Nepal.",
    },
    {
      question: "Is there an Indian scholarship for master's and Ph.D. students?",
      answer:
        "Yes. The Silver Jubilee Scholarship Scheme provides financial aid for master's programs like MBA, MCA, MA and M.Sc., and is also available for Ph.D. aspirants across non-medical disciplines. Applications open in Feb/March and are made online. The AYUSH scheme also supports doctoral studies in traditional medical systems.",
    },
    {
      question: "Are there Indian scholarships for school-level students from Nepal?",
      answer:
        "Yes. The Army Public School Scholarship Scheme is for students from Class VI to IX and XI studying in selected APS branches in India; it opens in Jan/Feb and is applied for offline. The Mahatma Gandhi Scholarship Scheme supports Class XI and XII students continuing in Nepal; it opens in Oct/Nov, with an online application.",
    },
  ],
  "top-10-government-colleges-in-india-you-must-know": [
    {
      question: "Which entrance exams are needed for IIT Bombay?",
      answer:
        "For undergraduate admission to IIT Bombay, you need JEE Main and JEE Advanced. For postgraduate programs, admission is through GATE for M.Tech and CAT for MBA. IIT Bombay offers B.Tech, M.Tech, MBA, Ph.D. and more programs, so the exam you need depends on the program and level you choose to apply for.",
    },
    {
      question: "How do I get admission to MBBS at AIIMS Delhi?",
      answer:
        "Admission to MBBS at All India Institute of Medical Sciences (AIIMS) New Delhi is through NEET UG. For postgraduate MD/MS programs, the admission process is INI-CET. AIIMS Delhi also offers Super Specialty Courses and Ph.D. programs.",
    },
    {
      question: "Which entrance exam is used for Delhi University, JNU and BHU?",
      answer:
        "Jawaharlal Nehru University, the University of Delhi and Banaras Hindu University all use CUET (Common University Entrance Test) for admissions, at both undergraduate and postgraduate level. Delhi University includes colleges such as St. Stephen's, Hindu College and Miranda House, while JNU is a hub for social sciences and humanities.",
    },
    {
      question: "Why choose a government college in India?",
      answer:
        "Government colleges in India offer lower tuition fees compared to private institutions, renowned professors and researchers, strong industry connections with high placement packages, and global recognition, as many of these colleges are ranked among the world's best institutions.",
    },
  ],
  "minimum-ielts-requirement-for-canadian-universities": [
    {
      question: "What is the minimum IELTS score for Canadian universities?",
      answer:
        "Most Canadian universities require an overall band score of 6.5, with a minimum of 6.0 in each of Listening, Reading, Writing and Speaking. Some institutions and programs may accept lower scores under special categories like the Student Direct Stream (SDS) or offer conditional admissions.",
    },
    {
      question: "What IELTS score does the University of Toronto require?",
      answer:
        "The University of Toronto asks for 6.5 overall for undergraduate programs and 7.0 overall for postgraduate programs. Requirements may vary depending on the program, and engineering, law and healthcare-related fields often have higher language score expectations.",
    },
    {
      question: "What can I do if I don't meet the minimum IELTS score?",
      answer:
        "You can retake the IELTS and aim for a higher score, accept a conditional offer by completing a university's English language program first, or choose the SDS route, where a minimum 6.0 in each band is often sufficient. Some universities also accept TOEFL, PTE Academic or the Duolingo English Test.",
    },
  ],
  "uk-graduate-route-visa-reduced-2025": [
    {
      question: "How long is the UK Graduate Route now?",
      answer:
        "The UK Graduate Route is now reduced to 18 months. Previously, international students could stay and work in the UK for 2 years after completing their degree. The visa still does not require a job offer right after graduation, though the government has hinted more conditions could be added in the future.",
    },
    {
      question: "What are the new English requirements in the UK?",
      answer:
        "Adult dependants of international students must now prove basic English skills (A1 level) when entering the UK, and over time must show improvement to A2 and B2 levels for visa extensions or permanent settlement. For the Skilled Worker Visa, the English requirement has increased from B1 to B2.",
    },
    {
      question: "Will the UK charge a levy on international student fees?",
      answer:
        "The UK government is considering a 6% levy on tuition income from international students. The money would be reinvested in the UK education and skills sector. It is not confirmed on this page; more details are expected in the Autumn 2025 budget.",
    },
    {
      question: "How have UK settlement rules changed?",
      answer:
        "There is no more automatic settlement after 5 years. Students or workers must now stay for 10 years or show a significant contribution to the UK economy and society to be eligible for permanent residency or citizenship.",
    },
  ],
  "explore-why-global-education-is-trending-in-2025": [
    {
      question: "Why should I study abroad?",
      answer:
        "Study abroad boosts employability by showing adaptability, cross-cultural communication and problem-solving skills. It also expands your worldview, builds independence and resilience, helps you learn or improve a language, lets you network globally and exposes you to different teaching styles and academic perspectives.",
    },
    {
      question: "How can I afford to study abroad?",
      answer:
        "The page suggests exploring scholarships from governments, universities and private organizations, choosing affordable programs such as Germany's public universities with low or no tuition fees, checking whether your home university offers financial aid, and doing part-time work where allowed to help with living expenses.",
    },
    {
      question: "What are the steps to apply to study abroad?",
      answer:
        "Research programs and destinations, check eligibility requirements such as GPA and language proficiency, and prepare application materials like transcripts, essays, letters of recommendation and language test scores. Then apply online by the deadlines, secure your visa once accepted, and plan finances, accommodation, insurance and travel.",
    },
  ],
  "study-abroad-from-nepal": [
    {
      question: "Which countries can Nepali students study in?",
      answer:
        "The page covers study destinations including Australia, Canada, Denmark, Dubai (UAE), France, India, New Zealand, South Korea, the USA and the UK. Each has its own benefits and popular courses, so the right choice depends on your career goals and budget.",
    },
    {
      question: "What services help Nepali students apply to foreign universities?",
      answer:
        "Services listed include admission counseling, scholarship assistance, visa guidance, application assistance, accommodation and pre-departure support, and test preparation. The aim is to help students at each step, from choosing a university and course to securing a student visa.",
    },
    {
      question: "Which tests can I prepare for before studying abroad?",
      answer:
        "Test preparation is offered for IELTS, TOEFL, GRE, GMAT and SAT, with coaching under expert trainers. Which test you need depends on the country, university and course you choose, so check the requirements for your chosen program.",
    },
  ],
  "iccr-scholarship-2026-study-in-india": [
    {
      question: "What is the ICCR Scholarship 2026 application deadline?",
      answer:
        "The ICCR Scholarship portal opened on February 27, 2026, and the application deadline is April 15, 2026. All documents must be submitted by then, and students are encouraged to apply early and read all instructions carefully before submitting.",
    },
    {
      question: "How much is the ICCR scholarship application fee in Nepal?",
      answer:
        "The application fee is NPR 400, deposited in favor of the Education Wing, Embassy of India, Kathmandu at any branch of Nepal SBI Bank. Write your online registration number and name on the receipt, then submit the original receipt with the printed application and documents.",
    },
    {
      question: "What documents are needed for the ICCR scholarship?",
      answer:
        "You need academic transcripts and certificates, a passport copy, a passport-size photograph, English translations if originals are not in English, and a 500-word essay in English on a topic given on the portal. Proof of English proficiency or an undertaking from your last institution is also required.",
    },
    {
      question: "What is the age limit for the ICCR scholarship?",
      answer:
        "Age is counted as of July 1, 2026. Undergraduate and postgraduate applicants must be between 18 and 35 years old, and PhD or doctoral applicants between 18 and 40 years. Cultural courses have a minimum age of 18 and may have no upper limit, depending on the institution.",
    },
  ],
  "student-visa-for-canada": [
    {
      question: "What documents do Nepali students need for a Canada student visa?",
      answer:
        "You need a Letter of Acceptance from a Designated Learning Institution, a valid passport covering your whole program, proof of funds, academic records, English test scores (IELTS, PTE or TOEFL), a GIC account for SDS applicants, medical examination and biometrics, and a Statement of Purpose.",
    },
    {
      question: "What is the step-by-step process to apply for a Canada study permit from Nepal?",
      answer:
        "Shortlist universities, apply for admission with transcripts, SOP and English scores, receive your Letter of Acceptance, open a GIC account and arrange tuition payments, submit the online visa application, complete biometrics and medical exam, then prepare for travel after the visa decision.",
    },
    {
      question: "Which English tests are accepted for studying in Canada?",
      answer:
        "The page lists IELTS, PTE and TOEFL as the English language proficiency tests used for Canadian university admission and visa approval. High scores can significantly improve your chances, and Admizz Education offers test preparation with mock tests and personalized feedback.",
    },
    {
      question: "What proof of funds is needed for a Canadian student visa?",
      answer:
        "You must show proof of funds covering tuition, living expenses, and return travel. Applicants under SDS use a GIC account as financial proof. Admizz Education also offers financial counseling on tuition, GIC accounts and proof of funds.",
    },
  ],
  "12-must-try-street-food-of-india": [
    {
      question: "What are the must-try street foods of India?",
      answer:
        "The page lists 12 street foods: Pav Bhaji, Poha Jalebi, Chhole Bhature, Gol Gappa, Dahi Puri, Daulat Ki Chaat, Kathi Rolls, Dabeli, Kanji Vada, Aloo Tikki, Momos, and Nagori Halwa with Bedmi Puri.",
    },
    {
      question: "What is Gol Gappa made of?",
      answer:
        "Gol Gappa, also called Pani Puri or Paani Ke Patashe, is made of crispy atta or sooji puris filled with tangy water, chickpeas, mashed potato and a mix of spices. Every state in India has its own signature specialty.",
    },
    {
      question: "Which Indian street food is only available in winter?",
      answer:
        "Daulat Ki Chaat appears only during the winter season. Its creamy, frothy texture comes from whisking sweetened milk for hours, then leaving it overnight in the open to soak in the dew. It is garnished with malai, khoya, pistachio and powdered sugar.",
    },
  ],
  "how-to-effectively-study-in-groups": [
    {
      question: "How many people should be in a study group?",
      answer:
        "The page suggests having at least 3 to 5 members in your study group, and choosing friends who are committed to achieving a good grade. Depending on the subject, it can help to select members with unique talents or knowledge.",
    },
    {
      question: "How long should a group study session last?",
      answer:
        "Meet up for two to three hours so that you can study well. Don't let the session run too long, as productivity tends to drop and members may lose focus. Taking breaks in between also helps everyone stay focused.",
    },
    {
      question: "How do you keep a study group focused?",
      answer:
        "Make a group leader who can bring everyone back on track, pick a meeting place without distractions, such as a home or the college library, and set a study agenda. Assign each member specific topics to teach the group so everyone participates.",
    },
  ],
  "google-for-india-an-event-for-the-country": [
    {
      question: "How much is Google investing in India?",
      answer:
        "The Google fund is set to invest 10 billion dollars in India over the next five to seven years, which amounts to Rs. 75,000 crores. The main aim is to bring the Internet to life for everyone in India.",
    },
    {
      question: "What are the four areas of Google's investment in India?",
      answer:
        "Google declared investment in four major areas: access to information in regional languages, manufacturing products and services according to the country's needs, empowering businesses through digital transformation, and using technology and AI for social good in health, education, and agriculture.",
    },
    {
      question: "What did Google announce for education in India?",
      answer:
        "Google will invest 1 million dollars in the education sector, with the Kaivalya Education Foundation training teachers and providing virtual education to students from low-income backgrounds. Google also partnered with CBSE so 1 million teachers in approximately 22,000 schools can deliver blended learning.",
    },
  ],
  "strategies-to-stay-motivated-during-online-class": [
    {
      question: "How often should I take breaks during online classes?",
      answer:
        "If you study for 90 minutes, take a break of at least 15 minutes. Use that time to get fresh air or take your dog for a walk. Strategic breaks can refresh your mind, restore motivation and increase productivity.",
    },
    {
      question: "How do I plan my schedule for online classes?",
      answer:
        "Create a schedule using a daily planner or an online calendar to track your routine. It helps you complete coursework while leaving time for things you enjoy. Set reminders for due dates on your calendar and rearrange your routine when changes come up.",
    },
    {
      question: "How can I set up a good workspace for online study?",
      answer:
        "Reserve a space solely for studying where you feel comfortable, with good ventilation and sufficient natural daylight to help reduce eye fatigue. You can also decorate it with plants, photos of loved ones or artwork, and separate studies from your social and home life.",
    },
  ],
  "how-to-prepare-well-for-exams": [
    {
      question: "How long should I study before taking a break?",
      answer:
        "The article suggests taking regular breaks between study hours. For example, take a 5-minute break if you study for half an hour. This helps you retain information for longer and freshens up your mind, and you can listen to music or walk around the house during the break.",
    },
    {
      question: "Should I stay up all night before an exam?",
      answer:
        "No. Students often stay awake all night before exams, but this only makes them more anxious and stressed. Instead, review what you have already studied and sleep early, so you feel refreshed on the day of your exam.",
    },
    {
      question: "How many hours should I sleep before an exam?",
      answer:
        "The article advises taking at least a minimum of seven hours of sleep before the exam. If you are sleep-deprived, you might not be able to complete your exam in time or justify your answers correctly. Also prepare your belongings and admit cards in advance.",
    },
  ],
  "gre-for-study-abroad-complete-guide-to-gre-exam-preparation-with-admizz-education": [
    {
      question: "How much does the GRE exam cost?",
      answer:
        "The GRE exam fee is approximately USD 220, according to the page. Before registering, it is important to understand both the cost and the score validity, because early planning can save time and money.",
    },
    {
      question: "What is the GRE score range?",
      answer:
        "Verbal Reasoning and Quantitative Reasoning are each scored from 130 to 170, and Analytical Writing is scored from 0 to 6. The total score range is 260 to 340. A good GRE score varies depending on your chosen course and university.",
    },
    {
      question: "How long is a GRE score valid, and how often can I retake it?",
      answer:
        "GRE scores are valid for 5 years. You can attempt the exam once every 21 days, up to 5 times per year. Because of these limits, planning your preparation early helps you avoid wasting time and money.",
    },
    {
      question: "How long should I prepare for the GRE?",
      answer:
        "The page recommends creating a 2-4 month study plan. Build vocabulary daily, practice full-length mock tests regularly, analyze your mistakes after every test and improve your essay structure for Analytical Writing.",
    },
  ],
  "avoid-when-applying-to-uk-universities-from-nepal": [
    {
      question: "When should I start preparing my UK university application?",
      answer:
        "Start preparing your application at least 6-8 months before your desired intake. UK universities usually have September (Autumn), January (Winter) and May (Summer) intakes, and missing deadlines can mean waiting months for the next intake or losing scholarships.",
    },
    {
      question: "What documents should I double-check before applying to UK universities?",
      answer:
        "Always double-check your passport validity, academic certificates, English test results, proof of funds, and offer letters and CAS. Incomplete or inconsistent documents, such as missing transcripts or unverified certificates, can delay your offer or even result in refusal.",
    },
    {
      question: "What should a strong SOP for a UK university include?",
      answer:
        "A strong Statement of Purpose should explain why you chose the UK and the specific university, how the course fits your career goals, and your achievements and relevant experiences. Generic SOPs copied from the internet fail to impress the admission committee.",
    },
    {
      question: "Why do UK visa applications get refused because of finances?",
      answer:
        "UK immigration authorities require clear proof that you can afford your tuition and living expenses. Mistakes such as unclear bank statements, insufficient funds or unverified sponsors can result in visa refusal, so even a small error in financial documents matters.",
    },
  ],
  "unlock-your-future-the-rising-trend-of-higher-education-abroad": [
    {
      question: "What are the benefits of studying abroad?",
      answer:
        "Studying abroad means access to world-class education, cultural immersion, networking opportunities and enhanced career prospects. Employers value skills such as independence, critical thinking and problem-solving, and many countries offer post-graduation work permits for international work experience.",
    },
    {
      question: "How early should I start my study abroad application?",
      answer:
        "The page advises beginning your preparations at least a year in advance, because application deadlines vary. Common requirements include academic transcripts, standardized test scores such as IELTS, TOEFL or GRE, and a Statement of Purpose (SOP).",
    },
    {
      question: "How do I choose the right program and university?",
      answer:
        "Identify your career goals and choose a program that aligns with them. Research university rankings using websites like QS World University Rankings and Times Higher Education, consider financial factors such as scholarships and part-time work, and seek expert guidance.",
    },
  ],
  "study-in-australia-without-ielts": [
    {
      question: "Can I study in Australia without IELTS?",
      answer:
        "Yes. Several Australian universities offer admission without IELTS, as long as you meet other English proficiency requirements. Accepted routes include tests like PTE Academic, TOEFL iBT and Duolingo, a Medium of Instruction (MOI) certificate, pathway programs, or a university's own English test.",
    },
    {
      question: "Which English tests can I take instead of IELTS for Australia?",
      answer:
        "Most Australian universities accept PTE Academic, TOEFL iBT, Duolingo English Test, Cambridge C1 Advanced (CAE) and OET for healthcare courses. Some also accept an MOI certificate. Duolingo is accepted if the university and course type allow it.",
    },
    {
      question: "What is an MOI certificate and who can use it?",
      answer:
        "A Medium of Instruction (MOI) certificate shows that your previous education was in English. Some universities allow students to study in Australia without IELTS with an MOI certificate. It is accepted for selected programs and institutions, mainly undergraduate and VET courses.",
    },
    {
      question: "Do I need IELTS for an Australian student visa?",
      answer:
        "Not necessarily. You can study in Australia without IELTS if your university accepts an alternative test and your CoE (Confirmation of Enrolment) reflects that you meet language requirements. Your visa depends on valid proof of English proficiency, not IELTS specifically.",
    },
  ],
  "ielts-exam-preparation-guide-format-tips-scoring-explained-for-study-abroad": [
    {
      question: "What is the IELTS exam format?",
      answer:
        "IELTS has four sections: Listening (30 minutes, 4 sections, 40 questions), Reading (60 minutes), Writing (60 minutes) and Speaking (11–14 minutes). Academic and General Training versions differ in the reading and writing tasks.",
    },
    {
      question: "How is IELTS scored?",
      answer:
        "Each section is scored 0–9, and your overall band score is the average of the four modules. Most universities and immigration authorities require a band score between 6.0–7.5, depending on the program or country.",
    },
    {
      question: "What is the difference between IELTS Academic and General Training?",
      answer:
        "IELTS Academic is for higher education and professional registration, while IELTS General Training is for migration and work purposes. The Reading and Writing sections differ between the two, while Listening and Speaking follow the same structure.",
    },
    {
      question: "Can I prepare for IELTS in 30 days?",
      answer:
        "The guide offers a 30-day plan: Week 1 covers grammar review, listening practice and vocabulary; Week 2 reading, writing and speaking; Week 3 full-length mock tests and time management; Week 4 revision and intensive speaking practice. Consistency and daily practice are key.",
    },
  ],
  "usa-reality-what-students-need-to-know-before-the-interview": [
    {
      question: "What do visa officers check during the USA student visa interview?",
      answer:
        "Visa officers judge you on a few solid points: program match, financial clarity, your confidence and your future plan. You do not need perfect English; you need clarity and honesty about why you chose your course and what you will do after your education.",
    },
    {
      question: "Why do USA student visas get rejected?",
      answer:
        "The page says most rejections happen because students follow bad advice or shortcuts. Common mistakes include memorising scripted answers, choosing random programs without reason, submitting fake or suspicious documents, and not knowing why they want to study in the USA.",
    },
    {
      question: "How can I build confidence for the F-1 visa interview?",
      answer:
        "Understand your program, know your sponsor's job, income source and financial capacity, be honest, and prepare with experts. Confidence comes from knowing who you are and what you are doing, not from memorizing a script.",
    },
    {
      question: "What red flags hurt my USA visa chances?",
      answer:
        "Red flags include weak academics without a clear explanation, unrealistic or unclear funds, changing programs too often, no clear reason for choosing the USA, and wrong or incomplete documents. These can be fixed, but only if addressed early.",
    },
  ],
  "top-5-best-universities-in-the-u-s-a": [
    {
      question: "Which are the top 5 universities in the USA?",
      answer:
        "The article lists the Massachusetts Institute of Technology (MIT), Stanford University, Harvard University, California Institute of Technology (Caltech) and the University of Chicago as the top 5 universities in the USA, recognized for academic excellence and research achievements.",
    },
    {
      question: "Which is the oldest university in the USA?",
      answer:
        "Harvard University, located in Cambridge, Massachusetts, was founded in 1636 and is described as the oldest institution of higher learning in the USA. It offers undergraduate, graduate and professional degree programs in fields including law, business, medicine and education.",
    },
    {
      question: "Where are MIT and Stanford located?",
      answer:
        "MIT is located in Cambridge, Massachusetts, and was founded in 1861; it is known for science, engineering and technology. Stanford University is located in the heart of Silicon Valley in California, was founded in 1885, and is known for pioneering STEM research.",
    },
  ],
  "physical-vs-digital-vs-audio-books-which-is-better": [
    {
      question: "What are the pros of digital books?",
      answer:
        "You can fit hundreds or even thousands of e-books on one device and read them anywhere. You can change the font size and style, use a built-in dictionary, and view all your highlights at a glance, and even a visually impaired person can read them without trouble.",
    },
    {
      question: "What are the cons of audiobooks?",
      answer:
        "You cannot highlight or mark your favorite part as in physical or digital books. Audiobooks take up a relatively large amount of space on your device, are comparatively more expensive than both the eBook and the physical edition, and need a well-charged device.",
    },
    {
      question: "Which is better: physical, digital or audio books?",
      answer:
        "The article says all three types come in handy according to a person's needs. For example, a visually impaired person relies on audiobooks, whereas a bookaholic can prefer physical books. Find the one most suitable for you and start reading.",
    },
  ],
  "5-strategies-for-standardized-tests": [
    {
      question: "How can I manage time better in standardized tests?",
      answer:
        "Know the test format, practice under timed conditions, develop a strategic approach that prioritizes high-value questions, master skipping difficult questions, and use time management techniques. The page also adds a bonus tip: stay calm and focused.",
    },
    {
      question: "Why should I practice under timed conditions?",
      answer:
        "Practicing answering questions under timed conditions helps you develop a sense of pace and identify areas where you need to improve your speed. Use official practice tests to simulate the real exam experience.",
    },
    {
      question: "What should I do if I get stuck on a question?",
      answer:
        "Do not get bogged down on a single question. Mark it for later review and move on, since you can always come back if you have time remaining. This prevents wasting precious minutes and lets you focus on questions you can answer confidently.",
    },
  ],
  "chhath-puja-illuminating-cultural-diversity-in-the-admizz-education-community": [
    {
      question: "What is Chhath Puja?",
      answer:
        "Chhath Puja is a cherished Hindu festival that connects communities across India and Nepal. Rooted in ancient scriptures, its practice since the Mahabharata era highlights the enduring connection between tradition and cultural significance across generations.",
    },
    {
      question: "What are the rituals of Chhath Puja day by day?",
      answer:
        "The festival begins with Nahay Khay on the first day, a cleansing ritual. The second day is Lohanda and Kharna, a disciplined fast. The third evening is Sandhya Arghya, and the fourth morning is Usha Arghya, worship of the first light of day.",
    },
    {
      question: "Why is Chhath Puja considered a community celebration?",
      answer:
        "Chhath Puja is community-centric. The gathering for Sandhya Arghya shows families and communities coming together, and the festival extends beyond regional boundaries, creating shared values and traditions among the people who celebrate it.",
    },
  ],
  "complete-guide-to-the-indian-embassy-compex-scholarship-2024": [
    {
      question: "Who is eligible for the COMPEX Scholarship?",
      answer:
        "Applicants must be Nepali nationals applying for undergraduate courses, with minimum 60% marks in aggregate and 50% marks in English in Class XII (10+2). The age limit is 16-23 years as of July 1, 2024, and specific subject-wise marks apply depending on the chosen course.",
    },
    {
      question: "Which courses does the COMPEX Scholarship cover?",
      answer:
        "The COMPEX Scholarship Scheme 2024-25, offered by the Embassy of India, Kathmandu, covers Engineering (BE/B.Tech), Pharmacy (B.Pharma), Agriculture (B.Sc. - Ag), Food Technology (B.Sc. - FT), and B.Sc. (Nursing) at the undergraduate level.",
    },
    {
      question: "How much is the COMPEX application fee?",
      answer:
        "The application fee is NPR 400, deposited at any branch of Nepal SBI Bank using the generated challan. Online registration is done through the Embassy of India, Kathmandu website, followed by the online application form and document uploads.",
    },
  ],
  "australia-eases-visa-rules-nepal-upgraded-to-level-2": [
    {
      question: "What does Assessment Level 2 mean for Australian student visas?",
      answer:
        "The Australian Department of Home Affairs uses assessment levels to evaluate the risk associated with student visa applicants from different countries. A lower level, like Level 2, means fewer documentary requirements for applicants, which makes the visa process more streamlined and efficient.",
    },
    {
      question: "Is it easier for Nepali students to get an Australian student visa now?",
      answer:
        "According to the page, upgrading Nepal to Assessment Level 2 simplifies the Australian Student Visa process for Nepali students. The application becomes less burdensome, including reduced requirements for proving financial capacity, so more students can access Australian education.",
    },
    {
      question: "How are assessment levels decided?",
      answer:
        "Assessment levels are used by the Australian Department of Home Affairs to evaluate risk for student visa applicants from different countries. They are determined by factors such as visa compliance and financial stability, and a lower level means fewer documentary requirements for applicants.",
    },
  ],
  "types-of-scholarships-in-2026-for-international-students": [
    {
      question: "What are the types of scholarships for international students in 2026?",
      answer:
        "The page lists merit-based, need-based, government-funded, university-specific, country-specific, subject-specific, sports and talent-based, research and PhD, fully funded and partial scholarships. Each rewards different things, such as academic excellence, financial need, a region or a subject area.",
    },
    {
      question: "Are fully funded scholarships available in 2026?",
      answer:
        "Yes, many countries and universities continue to offer fully funded scholarships covering tuition and living expenses. These scholarships cover tuition, accommodation, living expenses, insurance and travel costs, which makes them the most sought-after type of scholarship for international students.",
    },
    {
      question: "When should I apply for scholarships for the 2026 intake?",
      answer:
        "It is recommended to start applying 8–12 months before the intake to meet deadlines. Applying early also increases eligibility for university-specific scholarships, and tracking application deadlines carefully is an important part of securing funding.",
    },
    {
      question: "What documents are required for scholarship applications?",
      answer:
        "Common documents include academic transcripts, a Statement of Purpose (SOP), recommendation letters, financial proof and test scores. Need-based scholarships may also ask for income statements and family financial records to show genuine financial need.",
    },
  ],
  "countries-with-the-easiest-student-visa-approval-in-2026": [
    {
      question: "Which countries have the easiest student visa approval in 2026?",
      answer:
        "The page names Germany, Australia, New Zealand, Ireland, France and the Netherlands. These countries are described as having clear immigration rules, transparent documentation requirements and student-friendly visa systems that focus on genuine student intent.",
    },
    {
      question: "What makes a student visa easy to get?",
      answer:
        "Countries with smoother approvals typically offer clear and publicly available visa guidelines, predictable financial requirements, faster processing timelines, low rejection rates for genuine applicants, and supportive post-study stay or work policies.",
    },
    {
      question: "Why do student visas get rejected?",
      answer:
        "Common reasons include an unclear or weak Statement of Purpose (SOP), insufficient or poorly documented financial proof, gaps or inconsistencies in academic history, a mismatch between previous education and chosen course, and incomplete or inaccurate documentation.",
    },
  ],
  "top-courses-and-universities-in-the-uk": [
    {
      question: "What are the top courses to study in the UK for Nepali students?",
      answer:
        "The page lists Business and Management Studies, Computer Science and IT, Engineering, Healthcare and Medicine, Hospitality and Tourism Management, and Law and International Relations. Each covers several specializations, such as Data Science, Cybersecurity and AI under Computer Science and IT, or Nursing and Public Health under Healthcare.",
    },
    {
      question: "How much does it cost to study in the UK from Nepal?",
      answer:
        "On average, Nepali students spend £10,000 – £25,000 per year on tuition fees and £10,000 – £12,000 per year on living costs. Scholarships listed on the page include the Chevening Scholarship, the Commonwealth Scholarship and university-specific merit scholarships.",
    },
    {
      question: "Which UK universities are popular with Nepali students?",
      answer:
        "The page lists the University of Oxford, University of Cambridge, University College London (UCL), Imperial College London, University of Manchester, University of Edinburgh, Coventry University and University of Hertfordshire among the top choices for students from Nepal.",
    },
    {
      question: "Can I work in the UK after studying?",
      answer:
        "The UK's Graduate Route Visa allows Nepali students to stay back for 18 months for applications from January 1, 2027, or 2 years before that date (3 years for PhD students) to gain work experience. Top hiring sectors listed include IT and Software Development, Finance and Banking, Healthcare and Nursing, Engineering and Construction, and Marketing and Business Management.",
    },
  ],
  "6-ways-to-reduce-stress-in-college": [
    {
      question: "How much sleep do I need to reduce stress in college?",
      answer:
        "The page says an adult needs seven to nine hours of sleep. Sleep is important for staying healthy, and it matters even more when you are stressed. Insufficient sleep can put you at risk for serious illnesses such as diabetes, obesity and depression, so align your sleep schedule.",
    },
    {
      question: "How can exercise help reduce college stress?",
      answer:
        "When you exercise, your body releases endorphins, a feel-good chemical that acts as a natural painkiller and even improves sleep. The page suggests giving yourself 20 minutes a day of physical activity, such as swimming, yoga, walking or jogging, to help reduce your stress level.",
    },
    {
      question: "What should I eat to feel less stressed?",
      answer:
        "A healthy diet helps decrease stress. The page recommends a diet rich in vegetables, fruits and whole grains. When stressed you may crave junk food, but afterward you feel tired and look for the same food again, which creates an endless cycle that makes you feel worse.",
    },
    {
      question: "How can planning reduce stress in college?",
      answer:
        "Stress often comes from not having a proper schedule and too much work to do. The page suggests getting organized: write down your to-do list in a diary, prioritize your work and stick to it. This lessens your burden and leaves time for friends and family.",
    },
  ],
  "student-visa-and-permits-in-india": [
    {
      question: "How long is an Indian student visa valid?",
      answer:
        "A Student Visa is valid for the period of study approved by the educational institution in India. It is usually issued for up to five years, depending on the course duration, and it can be extended. The visa duration starts on the day of issuance, not the day of entry in India.",
    },
    {
      question: "How much does an Indian student visa cost?",
      answer:
        "Visa fees for Student visas are different for all countries. The page says the fee ranges from $13 to $118, so check the amount that applies to your own country before you apply for the visa.",
    },
    {
      question: "How early should I apply for an Indian student visa?",
      answer:
        "You should apply for a Student Visa at least 8 weeks in advance of your intended date of travel. However, people of Pakistani heritage should apply at least three months in advance.",
    },
    {
      question: "What is a provisional student visa for India?",
      answer:
        "A provisional visa can be issued when you do not yet have a firm admission letter, for example due to pending admission tests, based on a provisional admission certificate or letter of offer. It is valid for 3 months, and if admission is not confirmed within that period the student must leave India. It cannot be extended.",
    },
  ],
  "how-much-to-spend-on-your-bachelors-degree-in-india": [
    {
      question: "What is the average tuition fee for a bachelor's degree in India?",
      answer:
        "According to the page, the average cost of tuition fees in India is approximately $3000 USD per annum, though fees vary across private and public institutes. Government institutes are a lot cheaper than private ones, and medicine or engineering have higher annual fees than other courses.",
    },
    {
      question: "How long is a bachelor's degree in India?",
      answer:
        "In India, a bachelor's degree course duration is usually three to four years, depending on the course you choose. Popular bachelor's degrees include Bachelor in Technology, Bachelor of Science (BSc), Bachelor of Arts (BA), Bachelor of Law (LL.B.) and Bachelor of Business Administration (B.BA), among others.",
    },
    {
      question: "How much are the fees at KIIT University?",
      answer:
        "The fees of KIIT can cost around $6000 USD approx per annum depending on the subject. KIIT also offers the KIIT University International Scholarship Program (KUISP), under which Nepali students can get $1750 USD per semester or 1.5 lakhs INR per semester, depending on courses.",
    },
    {
      question: "Is there a cheaper university option in India?",
      answer:
        "The page suggests R.K University for a lower fee. The course fee is about $2000 USD per semester for Non-SAARC students. Under its Presidential Scholarship the fee is about $1500 USD per annum for Non-SAARC and 1 lakh INR per annum for SAARC students, depending on the courses.",
    },
  ],
  "top-courses-to-study-at-kiit-university": [
    {
      question: "What are the top courses at KIIT University?",
      answer:
        "The page highlights Bachelor of Technology (B.Tech), B.Sc Nursing, Bachelor of Business Administration (BBA), Bachelor's in Film and Television Production, and Bachelor of Architecture. B.Tech is described as KIIT's flagship course.",
    },
    {
      question: "Where is KIIT University located?",
      answer:
        "KIIT University is located in Bhubaneswar, Odisha. The page describes it as renowned for a diverse range of academic programs, with a strong emphasis on innovation, research and industry collaboration.",
    },
    {
      question: "Which engineering disciplines does KIIT offer in B.Tech?",
      answer:
        "The B.Tech program at KIIT covers a wide range of engineering disciplines, including Computer Science, Mechanical Engineering, Civil Engineering and Electrical Engineering, among many others. It provides theoretical foundations and practical skills, with laboratories, experienced faculty and industry collaborations.",
    },
  ],
  "visa-processing-for-students-in-nepal": [
    {
      question: "What are the steps in student visa processing in Nepal?",
      answer:
        "The page lists five steps: Profile Assessment, University Offer Letter, Document Preparation, Visa Application Filing, and Visa Interview Preparation. Counselors evaluate your academic background and financial documents first, then help you secure admission, gather documents, file a complete application and prepare for the interview.",
    },
    {
      question: "What documents do I need for a student visa?",
      answer:
        "The page mentions essential documents such as transcripts, bank statements and proof of funds. Visa requirements differ from country to country, so Admizz Education offers personalized checklists for every student and country-specific guidance for Australia, the UK, the USA, Canada, Europe and more.",
    },
    {
      question: "What challenges do students face with visa processing?",
      answer:
        "Many students struggle with incomplete financial documents, confusion about embassy guidelines, and nervousness during visa interviews. The page says tailored solutions, including mock sessions, tips and strategies for the interview, make these challenges manageable.",
    },
  ],
  "new-age-courses-that-can-help-you-build-a-great-career": [
    {
      question: "What are some new age courses for a great career?",
      answer:
        "The page lists animation, performing arts, golf coaching, fashion designing, film making and foreign language courses. These courses focus more on students' passion and creativity while still offering career opportunities.",
    },
    {
      question: "What does an animation course cover?",
      answer:
        "Animation is described as a combination of art and technology, widely used in the entertainment industry. The page says there are many animation colleges offering courses on 2D and 3D animations, and that drawing skills and creative thinking help you build a career in it.",
    },
    {
      question: "Why learn a foreign language for a career?",
      answer:
        "Knowledge of one or more foreign languages can be useful in a wide range of careers. For jobs such as translating, interpreting and language teaching, language skills are one of the main requirements. Local companies becoming global players also need professionals who can overcome language barriers.",
    },
  ],
  "the-new-uk-post-study-work-visa": [
    {
      question: "Who can apply for the UK Graduate Route?",
      answer:
        "You must have completed a degree at a recognized UK university whose institution holds a valid sponsor licence, and you must apply before your current student visa expires. You can work full-time, part-time or self-employed during your Graduate Route stay.",
    },
    {
      question: "Do I need a job offer or sponsorship for the Graduate Route?",
      answer:
        "No. The Graduate Route allows international students to stay and work after their studies, look for jobs, gain work experience or start a business without needing sponsorship right away. Before it ends, you can check whether you can switch to a sponsored Skilled Worker Visa.",
    },
  ],
  "how-to-choose-the-right-country-for-your-higher-studies": [
    {
      question: "How do I choose the right country for higher studies?",
      answer:
        "Consider your career goals, tuition fees and living costs, visa rules and post-study work options, language and cultural compatibility, and university rankings and recognition. Aligning your course with a country's academic strength can enhance your prospects.",
    },
    {
      question: "Which countries offer post-study work options?",
      answer:
        "Canada provides up to three years of post-study work permits, and the UK offers a Graduate Route (18 months for applications from January 1, 2027) for international students. Countries like Australia and the USA offer work opportunities through temporary or optional training visas, so compare each country's options before deciding.",
    },
    {
      question: "Which country is good for which field of study?",
      answer:
        "According to the article, Canada is known for programs in IT and healthcare, the UK for finance and law, and Australia for environmental sciences and nursing. If you are interested in engineering, the USA and Germany offer world-class programs.",
    },
  ],
};

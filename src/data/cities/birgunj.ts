import type { CityLandingData } from "./types";

// TODO(content): replace office address, phone, WhatsApp, photos, and student
// testimonials with verified Birgunj-specific content before launch.

export const birgunjData: CityLandingData = {
  city: "Birgunj",
  citySlug: "birgunj",

  meta: {
    title: "Study Abroad from Birgunj | Admizz Education",
    description:
      "Birgunj's trusted study abroad consultancy. Local counsellors, 95% visa success, scholarships to UK, USA, Australia, Canada and more. Book a free consultation today.",
    canonical: "https://admizzeducation.com/birgunj",
    ogImage: "/images/og/stuyabroad.webp",
  },

  hero: {
    eyebrow: "STUDY ABROAD FROM BIRGUNJ",
    heading: "Birgunj's gateway to the world's top universities",
    highlightedWord: "Birgunj's",
    subheading:
      "Personal guidance, transparent fees, and a team that speaks your language. From profile evaluation to pre-departure — handled locally, end to end.",
    trustBadge: "★ 4.9 · Trusted by 2,000+ students",
    primaryCta: { text: "Book Free Consultation", href: "#hero-form" },
    secondaryCta: {
      text: "Chat on WhatsApp",
      // TODO(content): replace with real Birgunj counsellor WhatsApp number
      href: "https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%27m%20interested%20in%20studying%20abroad",
    },

    // v2 hero
    landmarkKey: "ghantaghar",
    destinationRotator: [
      "the UK",
      "the USA",
      "Australia",
      "Canada",
      "Germany",
      "11+ countries",
    ],
    livePresence: {
      onlineLabel: "Counsellors online",
      offlineLabel: "Reply within 1 hour",
      timezone: "Asia/Kathmandu",
      workingHours: { startHour: 10, endHour: 18, days: [0, 1, 2, 3, 4, 5] },
    },
    inlineTrustBadges: [
      { iconKey: "star", value: "4.9", label: "Google rating" },
      { iconKey: "graduate", value: "2,000+", label: "Enrolled" },
      { iconKey: "shieldCheck", value: "95%", label: "Visa success" },
      { iconKey: "certified", value: "ICEF", label: "Certified" },
    ],
    activityFeed: [],
    microTrustLine: "🔒 No spam · ⏱️ 30 min · ✓ No commitment",
    partnerLogosStrip: [
      { name: "University of Greenwich", logo: "/images/universities/uk/University-of-Greenwich.webp" },
      { name: "Coventry University", logo: "/images/universities/uk/Coventry-University.webp" },
      { name: "BPP University", logo: "/images/universities/uk/BPP-University.webp" },
      { name: "Ulster University", logo: "/images/universities/uk/Ulster-University.webp" },
      { name: "University of East London", logo: "/images/universities/uk/University-of-East-London.webp" },
    ],
    formSteps: [
      { label: "About you" },
      { label: "We match" },
      { label: "You meet" },
    ],
  },

  whyChoose: {
    eyebrow: "WHY ADMIZZ",
    heading: "Why students from Birgunj choose Admizz?",
    subheading:
      "It's not magic. We just do the basics — locally, transparently, in your language.",
    points: [
      {
        iconKey: "pin",
        title: "Local presence in Birgunj",
        description:
          "Get one-on-one guidance from a dedicated local counsellor who knows Birgunj students inside out — your schools, your boards, your goals. Document collection, applications, and visa prep handled with personal attention, right here.",
        proofPoint: "No Kathmandu trip",
      },
      {
        iconKey: "language",
        title: "Counsellors who speak your language",
        description:
          "Explain your situation in Bhojpuri, Maithili, Hindi, Nepali or English — whatever's easiest. We'll translate visa rules into clear next steps.",
        proofPoint: "5 languages spoken",
      },
      {
        iconKey: "shield",
        title: "Transparent fees, zero surprises",
        description:
          "Every cost is on paper before you sign. No hidden processing charges, no last-minute add-ons. We win when you do.",
        proofPoint: "0 hidden fees",
      },
      {
        iconKey: "visa",
        title: "Visa-tested success record",
        description:
          "95% visa approval rate across UK, USA, Australia, Canada and Europe. We know what each embassy looks for — and prepare you for it.",
        proofPoint: "95% visa rate",
      },
    ],
  },

  destinations: {
    eyebrow: "POPULAR FROM BIRGUNJ",
    heading: "Where Birgunj students are going?",
    subheading:
      "Top destinations chosen by students who started their journey at our Birgunj office.",
    highlightStats: [
      { value: "11+", label: "Countries" },
      { value: "100+", label: "Partner universities" },
      { value: "$2M+", label: "Scholarships unlocked" },
    ],
    items: [
      {
        country: "United Kingdom",
        flagEmoji: "🇬🇧",
        image: "/images/destinations/uk1.webp",
        studentsPlaced: "120+ from Birgunj",
        topUniversity: "University of Greenwich",
        href: "/study-in-uk-from-nepal",
        scholarship: "Up to £5,000",
        intakes: "Sep · Jan",
        avgVisaTime: "3–4 mo",
        accentColor: "#C8102E",
        featured: true,
        topPrograms: [
          "MBA & Business Management",
          "Computer Science & AI",
          "Public Health & Nursing",
        ],
      },
      {
        country: "India",
        flagEmoji: "🇮🇳",
        image: "/images/destinations/india1.webp",
        studentsPlaced: "60+ from Birgunj",
        topUniversity: "Manipal University",
        href: "/study-in-india",
        scholarship: "Up to ₹1,00,000",
        intakes: "Jan · Jul",
        avgVisaTime: "1–2 mo",
        accentColor: "#FF9933",
      },
      {
        country: "Germany",
        flagEmoji: "🇩🇪",
        image: "/images/destinations/germany1.webp",
        studentsPlaced: "40+ from Birgunj",
        topUniversity: "TU Munich",
        href: "/study-in-germany",
        scholarship: "Tuition-free public unis",
        intakes: "Apr · Oct",
        avgVisaTime: "2–3 mo",
        accentColor: "#000000",
      },
      {
        country: "Australia",
        flagEmoji: "🇦🇺",
        image: "/images/destinations/aus1.webp",
        studentsPlaced: "95+ from Birgunj",
        topUniversity: "Federation University",
        href: "/study-in-australia",
        scholarship: "Up to AUD 6,000",
        intakes: "Feb · Jul",
        avgVisaTime: "2–3 mo",
        accentColor: "#00843D",
        topPrograms: [
          "Engineering & IT",
          "Nursing & Health Sciences",
          "Business & Accounting",
        ],
      },
    ],
  },

  successStories: {
    eyebrow: "STUDENT STORIES",
    heading: "From Birgunj classrooms to global campuses",
    subheading:
      "Real students. Real intakes. Real visas approved.",
    stories: [
      // TODO(content): replace with verified Birgunj student testimonials + photos.
      {
        name: "Priyanshu Gupta",
        photo: "/images/cities/student-priyanshu.jpg",
        schoolInCity: "Trinity International College, Birgunj",
        quote:
          "I walked into the Birgunj office unsure of where I'd even fit. Three weeks later I had a shortlist, an SOP, and a visa interview I actually felt ready for.",
        university: "University of Greenwich",
        country: "United Kingdom",
        countryFlag: "🇬🇧",
        intake: "September 2025",
        ieltsScore: "IELTS 7.0",
        scholarship: "£3,000 scholarship",
      },
      {
        name: "Aarya Singh",
        photo: "/images/cities/student-aarya.jpg",
        schoolInCity: "United Academy, Birgunj",
        quote:
          "My family didn't want me to go through middlemen. Admizz Birgunj felt different — every fee on paper, every document checked twice.",
        university: "Federation University",
        country: "Australia",
        countryFlag: "🇦🇺",
        intake: "February 2026",
        ieltsScore: "IELTS 6.5",
      },
      {
        name: "Rishav Sah",
        photo: "/images/cities/student-rishav.jpg",
        schoolInCity: "Birgunj Public College",
        quote:
          "The counsellor explained the visa process in Maithili. That sounds small, but it changed everything for my parents.",
        university: "Conestoga College",
        country: "Canada",
        countryFlag: "🇨🇦",
        intake: "January 2026",
        ieltsScore: "IELTS 6.5",
        scholarship: "CAD 2,500 entrance award",
      },
    ],
  },

  office: {
    name: "Admizz Education — Birgunj Office",
    address: "Admizz Education Birgunj, Ghanta Ghar, Link Rd, Birgunj 44300, Nepal",
    phone: "+977-9856100444",
    phoneDisplay: "+977-9856100444",
    whatsapp: "9779856100444",
    whatsappMessage: "Hi Admizz, I'm interested in studying abroad",
    email: "hello@admizz.com",
    hours: "Sun – Fri · 10:00 AM – 6:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14226!2d84.877!3d27.01!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39935501799012bf%3A0xb4f1f35c31f953d8!2sAdmizz%20Education%20Birgunj!5e0!3m2!1sen!2snp!4v1",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Admizz+Education+Birgunj,+Ghanta+Ghar,+Link+Rd,+Birgunj+44300,+Nepal",
    nearbyLandmarks: [
      "Near Ghanta Ghar (Clock Tower)",
      "On Link Road, Birgunj",
      "Free parking available",
    ],
    photos: [
      "/images/seo-pages/admizz-office.webp",
      "/images/seo-pages/admizzeducation.webp",
      "/images/seo-pages/study.webp",
    ],
  },

  process: {
    eyebrow: "HOW IT WORKS",
    heading: "Your roadmap from Birgunj to your dream campus",
    subheading: "Six clear steps. No jargon. No surprises.",
    steps: [
      {
        num: 1,
        title: "Free consultation",
        description:
          "Walk in, call, or jump on a video call. We get to know your goals, grades, and budget — no commitment.",
        iconKey: "chat",
        duration: "30 min",
      },
      {
        num: 2,
        title: "Profile evaluation",
        description:
          "Honest assessment of your academics, English scores, and finances against country-specific bars.",
        iconKey: "chart",
        duration: "1 – 2 days",
      },
      {
        num: 3,
        title: "University shortlist",
        description:
          "A handpicked list of 4–6 universities matching your goals, budget and visa profile — with scholarship signals.",
        iconKey: "list",
        duration: "3 – 5 days",
      },
      {
        num: 4,
        title: "Application + SOP",
        description:
          "We co-write your SOP, polish your LORs, and submit clean applications with every document indexed.",
        iconKey: "document",
        duration: "1 – 2 weeks",
      },
      {
        num: 5,
        title: "Visa preparation",
        description:
          "Mock interviews, financial documentation, and embassy-specific prep. We rehearse until you're ready.",
        iconKey: "shield",
        duration: "2 – 3 weeks",
      },
      {
        num: 6,
        title: "Pre-departure",
        description:
          "Forex, accommodation, SIM, airport pickup — we don't disappear after the visa stamp.",
        iconKey: "plane",
        duration: "1 week",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Birgunj questions, answered",
    subheading: "The things students from Birgunj ask us most.",
    items: [
      {
        q: "Do I need to travel to Kathmandu to apply?",
        a: "No. Our Birgunj office handles everything from initial consultation to visa preparation. The only time you'll need to travel is if your country requires a biometric appointment in Kathmandu — and we coordinate that for you.",
      },
      {
        q: "What languages do your Birgunj counsellors speak?",
        a: "Our team speaks Bhojpuri, Maithili, Hindi, Nepali, and English. Bring your parents — we'll explain everything in the language they're most comfortable with.",
      },
      {
        q: "Are there scholarships available for Birgunj students?",
        a: "Yes. We've helped Birgunj students unlock university scholarships, country-specific awards, and need-based grants. Bring your academic transcripts — we'll match you to what you qualify for.",
      },
      {
        q: "What if my IELTS score is low?",
        a: "We don't push students into wrong courses just to close a deal. If your score isn't ready, we'll connect you with vetted IELTS prep partners and reapply on the next intake — that honesty is why our visa rate stays at 95%.",
      },
      {
        q: "How long does the full process take from Birgunj?",
        a: "From first consultation to flying out: typically 4-6 months for UK and Australia, 3-4 months for Canada, 5-7 months for USA. Apply early — visa slots tighten close to intake dates.",
      },
    ],
  },

  finalCta: {
    eyebrow: "READY?",
    heading: "Ready to start, Birgunj?",
    subheading:
      "Book a free 30-minute consultation. Walk out with a clear plan — even if you don't choose us.",
    primaryCta: { text: "Book Free Consultation", href: "#hero-form" },
    whatsappCta: {
      number: "9779856100444",
      message: "Hi Admizz, I'm interested in studying abroad",
      display: "+977-9856100444",
    },
  },

  // TODO(content): swap with real campaigns/events when scheduled.
  // Top banner: leave as-is until a campaign is running, otherwise omit.
  topBanner: {
    id: "birgunj-counselling-week-may-2026-v2",
    variant: "campaign",
    eyebrow: "Limited time",
    title: "Free Counselling Week at our Birgunj office",
    subtitle: "Walk-in any day, no appointment needed",
    endsAt: "2026-05-12T18:00:00+05:45",
    cta: { text: "Reserve a slot", href: "#hero-form" },
    dismissible: true,
  },

  cityIdentity: {
    eyebrow: "YOUR CITY. YOUR DREAM. YOUR TIME.",
    heading: "Birgunj students are already studying abroad. You could be next.",
    subheading:
      "Hundreds of students from this city have walked through university gates in the UK, Australia, Canada and beyond. Your counsellor is right here in Birgunj — speaking your language, no Kathmandu trip needed.",
    landmarkImage: "/images/cities/birgunj-gateway.jpg",
    landmarkImageAlt: "Birgunj Gateway",
    landmarkLabel: "📍 Birgunj, Madhesh Province",
    facts: [
      { icon: "✅", text: "Licensed and Approved by Ministry of Education, Nepal" },
      { icon: "✅", text: "TITI Certified Counsellor" },
      { icon: "✅", text: "10Th Years of Excellence" },
    ],
    cta: { text: "Start Your Journey →", href: "#hero-form" },
    accentPhotos: [
      { src: "/images/cities/birgunj-ghantaghar-night.jpg", alt: "Ghantaghar at Night" },
      { src: "/images/cities/birgunj-ghantaghar-closeup.jpg", alt: "Ghantaghar Clock Tower" },
      { src: "/images/cities/birgunj-rangeli-pond.jpg", alt: "Rangeli Park, Birgunj" },
    ],
  },
};

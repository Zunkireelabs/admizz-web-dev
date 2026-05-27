import type { CityLandingData } from "./types";

// TODO(content): replace office address, phone, WhatsApp, photos, and student
// testimonials with verified Janakpur-specific content before launch.

export const janakpurData: CityLandingData = {
  city: "Janakpur",
  citySlug: "janakpur",

  meta: {
    title: "Study Abroad from Janakpur | Admizz Education",
    description:
      "Janakpur's trusted study abroad consultancy. Local Maithili-speaking counsellors, 95% visa success, scholarships to UK, USA, Australia, Canada and more.",
    canonical: "https://admizzeducation.com/janakpur",
    ogImage: "/images/og/stuyabroad.webp",
  },

  hero: {
    eyebrow: "STUDY ABROAD FROM JANAKPUR",
    heading: "Janakpur's gateway to the world's top universities",
    highlightedWord: "Janakpur's",
    subheading:
      "Hyperlocal guidance, transparent fees, and a Maithili-speaking team that gets your family. From profile evaluation to pre-departure — handled in Janakpur.",
    trustBadge: "★ 4.9 · Trusted by 2,000+ students",
    primaryCta: { text: "Book Free Consultation", href: "#hero-form" },
    secondaryCta: {
      text: "Chat on WhatsApp",
      // TODO(content): replace with real Janakpur counsellor WhatsApp number
      href: "https://wa.me/9779856100444?text=Hi%20Admizz%2C%20I%27m%20interested%20in%20studying%20abroad",
    },

    // v2 hero
    landmarkKey: "janaki-mandir",
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
    heading: "Why students from Janakpur choose Admizz?",
    subheading:
      "It's not magic. We just do the basics — locally, transparently, in your language.",
    points: [
      {
        iconKey: "pin",
        title: "Local presence in Janakpur",
        description:
          "Get one-on-one guidance from a dedicated local counsellor who knows Janakpur students inside out — your schools, your boards, your goals. Document collection, applications, and visa prep handled with personal attention, right here.",
        proofPoint: "No Kathmandu trip",
      },
      {
        iconKey: "language",
        title: "Counsellors who speak your language",
        description:
          "Explain your situation in Maithili, Hindi, Nepali or English — whatever's easiest. Bring your parents; we'll translate every visa rule clearly.",
        proofPoint: "4 languages spoken",
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
    eyebrow: "POPULAR FROM JANAKPUR",
    heading: "Where Janakpur students are going?",
    subheading:
      "Top destinations chosen by students who started their journey at our Janakpur office.",
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
        studentsPlaced: "100+ from Janakpur",
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
        studentsPlaced: "50+ from Janakpur",
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
        studentsPlaced: "30+ from Janakpur",
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
        studentsPlaced: "75+ from Janakpur",
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
    heading: "From Janakpur classrooms to global campuses",
    subheading: "Real students. Real intakes. Real visas approved.",
    stories: [
      // TODO(content): replace with verified Janakpur student testimonials + photos.
      {
        name: "Riya Mishra",
        photo: "/images/cities/test-riya.jpg",
        schoolInCity: "RRM Campus, Janakpur",
        quote:
          "I was the first in my family to apply abroad. The Janakpur team explained every step to my parents in Maithili — that built the trust we needed.",
        university: "University of Greenwich",
        country: "United Kingdom",
        countryFlag: "🇬🇧",
        intake: "September 2025",
        ieltsScore: "IELTS 7.0",
        scholarship: "£3,500 scholarship",
      },
      {
        name: "Suraj Yadav",
        photo: "/images/cities/test-suraj.jpg",
        schoolInCity: "Janaki Vidhya Mandir, Janakpur",
        quote:
          "I almost gave up after my first IELTS attempt. They didn't push me to apply — they helped me retake it, and now I'm in Sydney.",
        university: "Federation University",
        country: "Australia",
        countryFlag: "🇦🇺",
        intake: "February 2026",
        ieltsScore: "IELTS 6.5",
      },
      {
        name: "Anjali Thakur",
        photo: "/images/cities/test-anjali.jpg",
        schoolInCity: "Bidur Memorial College, Janakpur",
        quote:
          "Every fee was on paper, every document checked twice. After hearing horror stories from my cousins, this felt like a different planet.",
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
    name: "Admizz Education — Janakpur Office",
    address: "Vishwakarma Chowk-04, Janakpurdham (Near Sarhanchiya Kuti), Nepal",
    phone: "+977-9856100444",
    phoneDisplay: "+977-9856100444",
    whatsapp: "9779856100444",
    whatsappMessage: "Hi Admizz, I'm interested in studying abroad",
    email: "hello@admizz.com",
    hours: "Sun – Fri · 10:00 AM – 6:00 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14226!2d85.9232988!3d26.7227609!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec41402409ff31%3A0x9a87eb0e770c1954!2sAdmizz%20Education%20Janakpur!5e0!3m2!1sen!2snp!4v1",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Admizz+Education+Janakpur,+Vishwakarma+Chowk,+Janakpurdham,+Nepal",
    nearbyLandmarks: [
      "Vishwakarma Chowk-04, Janakpurdham",
      "Near Sarhanchiya Kuti",
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
    heading: "Your roadmap from Janakpur to your dream campus",
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
    heading: "Janakpur questions, answered",
    subheading: "The things students from Janakpur ask us most.",
    items: [
      {
        q: "Do I need to travel to Kathmandu to apply?",
        a: "No. Our Janakpur office handles everything from initial consultation to visa preparation. The only time you'll need to travel is if your country requires a biometric appointment in Kathmandu — and we coordinate that for you.",
      },
      {
        q: "What languages do your Janakpur counsellors speak?",
        a: "Our team speaks Maithili, Hindi, Nepali, and English. Bring your parents — we'll explain everything in the language they're most comfortable with.",
      },
      {
        q: "Are there scholarships available for Janakpur students?",
        a: "Yes. We've helped Janakpur students unlock university scholarships, country-specific awards, and need-based grants. Bring your academic transcripts — we'll match you to what you qualify for.",
      },
      {
        q: "What if my IELTS score is low?",
        a: "We don't push students into wrong courses just to close a deal. If your score isn't ready, we'll connect you with vetted IELTS prep partners and reapply on the next intake — that honesty is why our visa rate stays at 95%.",
      },
      {
        q: "How long does the full process take from Janakpur?",
        a: "From first consultation to flying out: typically 4-6 months for UK and Australia, 3-4 months for Canada, 5-7 months for USA. Apply early — visa slots tighten close to intake dates.",
      },
    ],
  },

  finalCta: {
    eyebrow: "READY?",
    heading: "Ready to start, Janakpur?",
    subheading:
      "Book a free 30-minute consultation. Walk out with a clear plan — even if you don't choose us.",
    primaryCta: { text: "Book Free Consultation", href: "#hero-form" },
    whatsappCta: {
      number: "9779856100444",
      message: "Hi Admizz, I'm interested in studying abroad",
      display: "+977-9856100444",
    },
  },

  topBanner: {
    id: "janakpur-counselling-week-jun-2026-v1",
    variant: "campaign",
    eyebrow: "Limited time",
    title: "Free Counselling Week at our Janakpur office",
    subtitle: "Walk-in any day, no appointment needed",
    endsAt: "2026-06-07T18:00:00+05:45",
    cta: { text: "Reserve a slot", href: "#hero-form" },
    dismissible: true,
  },

  cityIdentity: {
    eyebrow: "ROOTED IN JANAKPUR",
    heading: "We're not Kathmandu. We're yours.",
    subheading:
      "Our Janakpur office was built for students who shouldn't have to travel three hours just to ask a question. Walk in, sit down, and talk to a counsellor who speaks your language — literally.",
    landmarkImage: "/images/cities/janakpur-landmark.jpg",
    landmarkImageAlt: "Janaki Mandir reflected in still water at dusk — Janakpur, Nepal",
    landmarkLabel: "Janaki Mandir, Janakpur",
    accentPhotos: [
      { src: "/images/cities/janakpur-courtyard-sunset.jpg", alt: "Janaki Mandir courtyard at golden sunset" },
      { src: "/images/cities/janakpur-night-lights.jpg", alt: "Janaki Mandir illuminated with festival lights at night" },
    ],
    facts: [
      { icon: "✅", text: "Licensed and Approved by Ministry of Education, Nepal" },
      { icon: "✅", text: "TITI Certified Counsellor" },
      { icon: "✅", text: "10Th Years of Excellence" },
    ],
    cta: { text: "Book Free Consultation", href: "#hero-form" },
  },
};

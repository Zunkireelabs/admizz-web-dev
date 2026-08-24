// Single source of truth for "The 2-Hour IELTS Strategy Workshop" event page.
// Change the date, time, capacity, or copy here — no section component needs to change.

export interface SkillContent {
  key: "listening" | "reading" | "writing" | "speaking";
  name: string;
  statement: string;
  techniques: string[];
}

export const event = {
  slug: "ielts-workshop",
  campaign: "From Stuck to Strategy",
  eyebrow: "Admizz Education Presents",
  headline: "Stuck at the Same IELTS Band?",
  subhead: "It's time to change your preparation strategy.",
  sessionTitle: "The 2-Hour IELTS Strategy Workshop",
  intro:
    "A practical, live session built to show you how the test is actually scored, where students consistently lose marks, and how to prepare with a plan — not guesswork.",

  dateLabel: "Sunday, August 30, 2026",
  timeLabel: "11 AM – 1 PM",
  durationLabel: "2 Hours",
  startISO: "2026-08-30T11:00:00+05:45",
  endISO: "2026-08-30T13:00:00+05:45",

  venue: "Google Meet (Live Online)",
  accessNote: "Meeting link will be shared only with registered participants.",
  capacity: 40,

  urgencyLine: "Stop guessing. Start preparing smarter.",
  scarcityLine: "Limited to only 40 students.",

  ctaText: "Reserve Your Seat",
  finalCtaText: "Reserve Your Seat →",

  registrationFormSource: "ielts-workshop",
} as const;

export const problem = {
  painPoints: [
    "Studying without seeing the improvement you expect",
    "Losing time on techniques that don't move your score",
    "Losing marks through small, repeated mistakes",
    "Not knowing what examiners actually expect",
    "Preparing without a clear strategy",
  ],
  pivotLineTop: "Maybe you don't need to study harder.",
  pivotLineBottom: "You need to study smarter.",
};

export const skills: SkillContent[] = [
  {
    key: "listening",
    name: "Listening",
    statement: "Smart hacks & key strategies to catch answers before you lose them",
    techniques: [
      "Answer prediction",
      "Keyword spotting",
      "Following the recording",
      "Question types",
      "Paraphrasing",
      "Accuracy",
      "Common mistakes",
      "Staying focused",
    ],
  },
  {
    key: "reading",
    name: "Reading",
    statement: "Time-saving techniques to finish every section with time to check",
    techniques: [
      "Scanning",
      "Keyword spotting",
      "Paraphrasing",
      "Time management",
      "Question types",
      "Finding answers efficiently",
      "Common traps",
    ],
  },
  {
    key: "writing",
    name: "Writing",
    statement: "Techniques that lift Task 1 & Task 2 scores fast",
    techniques: [
      "Understanding task requirements",
      "Structure",
      "Idea development",
      "Organization",
      "Coherence",
      "Vocabulary",
      "Examiner expectations",
      "Common mistakes",
    ],
  },
  {
    key: "speaking",
    name: "Speaking",
    statement: "Tips, practice & confidence for the part students fear most",
    techniques: [
      "Organizing your thoughts",
      "Extending answers",
      "Fluency",
      "Handling questions",
      "Pronunciation",
      "Delivery",
      "Confidence",
      "Common mistakes",
    ],
  },
];

export const valueStack = [
  {
    title: "Band Score Explained",
    description: "How examiners actually score you.",
    featured: true,
  },
  {
    title: "Common IELTS Mistakes",
    description: "The small errors quietly costing you 0.5–1 band.",
    featured: false,
  },
  {
    title: "IELTS Myths Busted",
    description: "What really matters, and what doesn't.",
    featured: false,
  },
  {
    title: "Preparation Plan & Resources",
    description: "A study plan you take home.",
    featured: false,
  },
  {
    title: "Interactive Q&A",
    description: "Get your specific questions answered live.",
    featured: false,
  },
];

export const beyondSkills = {
  heading: "IELTS is more than just four sections.",
  points: [
    "How the overall test structure works",
    "How band scoring really adds up",
    "Building a preparation strategy, not just skill practice",
    "Time management across the whole test",
    "The mistakes students repeat across every section",
    "How to walk in on test day fully prepared",
  ],
};

export const transformation = {
  before: [
    "Guessing",
    "Unclear strategy",
    "Losing time",
    "Repeating mistakes",
    "Uncertain preparation",
  ],
  after: [
    "Clearer understanding",
    "Smarter strategies",
    "Better preparation",
    "Awareness of mistakes",
    "More confidence",
  ],
};

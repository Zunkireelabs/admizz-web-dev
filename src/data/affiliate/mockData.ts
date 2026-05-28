export type Tier = "Starter" | "Rising Star" | "Elite Partner" | "Admizz Legend";
export type ReferralStatus = "pending" | "converted" | "paid";
export type AppStatus = "pending" | "approved" | "rejected";
export type CommissionStage = "Consultation" | "Enrolled" | "University Confirmed" | "Visa Approved";

export interface MockAffiliate {
  id: string;
  fullName: string;
  email: string;
  code: string;
  city: string;
  platform: string;
  audienceSize: string;
  tier: Tier;
  referralCount: number;
  convertedCount: number;
  totalEarned: number;
  status: "active" | "suspended";
  joinedAt: string;
  monthlyClicks: number[];
  monthlyConversions: number[];
}

export interface MockReferral {
  id: string;
  affiliateId: string;
  studentDisplay: string;
  date: string;
  destination: string;
  flagEmoji: string;
  stage: CommissionStage;
  status: ReferralStatus;
  commission: number;
}

export interface MockApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  promotionMethod: string;
  platform: string;
  audienceSize: string;
  profileLink: string;
  hasReferred: boolean;
  motivation: string;
  appliedAt: string;
  status: AppStatus;
}

export const mockAffiliates: MockAffiliate[] = [
  {
    id: "aff_01",
    fullName: "Rohan Khadka",
    email: "rohan@demo.com",
    code: "ROHAN2026",
    city: "Kathmandu",
    platform: "YouTube",
    audienceSize: "10K+",
    tier: "Elite Partner",
    referralCount: 18,
    convertedCount: 13,
    totalEarned: 42500,
    status: "active",
    joinedAt: "2025-10-12",
    monthlyClicks: [42, 58, 71, 89, 104, 118],
    monthlyConversions: [5, 7, 9, 11, 13, 16],
  },
  {
    id: "aff_02",
    fullName: "Priya Sharma",
    email: "priya@demo.com",
    code: "PRIYA2026",
    city: "Kathmandu",
    platform: "Instagram",
    audienceSize: "2K-10K",
    tier: "Rising Star",
    referralCount: 12,
    convertedCount: 8,
    totalEarned: 24000,
    status: "active",
    joinedAt: "2025-11-03",
    monthlyClicks: [18, 24, 31, 38, 47, 55],
    monthlyConversions: [2, 3, 4, 5, 6, 8],
  },
  {
    id: "aff_03",
    fullName: "Sunita Gurung",
    email: "sunita@demo.com",
    code: "SUNITA2026",
    city: "Bhaktapur",
    platform: "WhatsApp Groups",
    audienceSize: "Under 500",
    tier: "Starter",
    referralCount: 4,
    convertedCount: 2,
    totalEarned: 6000,
    status: "active",
    joinedAt: "2026-01-18",
    monthlyClicks: [4, 6, 8, 10, 12, 14],
    monthlyConversions: [0, 1, 1, 2, 2, 2],
  },
  {
    id: "aff_04",
    fullName: "Aarya Maharjan",
    email: "aarya@demo.com",
    code: "AARYA2026",
    city: "Lalitpur",
    platform: "TikTok",
    audienceSize: "2K-10K",
    tier: "Rising Star",
    referralCount: 9,
    convertedCount: 6,
    totalEarned: 18000,
    status: "active",
    joinedAt: "2025-12-05",
    monthlyClicks: [14, 18, 22, 28, 33, 39],
    monthlyConversions: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "aff_05",
    fullName: "Bikash Rai",
    email: "bikash@demo.com",
    code: "BIKASH2026",
    city: "Pokhara",
    platform: "Facebook",
    audienceSize: "500-2K",
    tier: "Starter",
    referralCount: 3,
    convertedCount: 1,
    totalEarned: 3000,
    status: "active",
    joinedAt: "2026-02-20",
    monthlyClicks: [2, 4, 5, 7, 8, 9],
    monthlyConversions: [0, 0, 1, 1, 1, 1],
  },
  {
    id: "aff_06",
    fullName: "Sita Thapa",
    email: "sita@demo.com",
    code: "SITA2026",
    city: "Biratnagar",
    platform: "Instagram",
    audienceSize: "500-2K",
    tier: "Starter",
    referralCount: 1,
    convertedCount: 0,
    totalEarned: 0,
    status: "active",
    joinedAt: "2026-03-10",
    monthlyClicks: [0, 0, 2, 3, 4, 5],
    monthlyConversions: [0, 0, 0, 0, 0, 0],
  },
  {
    id: "aff_07",
    fullName: "Dipesh Adhikari",
    email: "dipesh@demo.com",
    code: "DIPESH2026",
    city: "Butwal",
    platform: "LinkedIn",
    audienceSize: "500-2K",
    tier: "Rising Star",
    referralCount: 7,
    convertedCount: 4,
    totalEarned: 12000,
    status: "active",
    joinedAt: "2025-12-28",
    monthlyClicks: [10, 13, 16, 20, 24, 28],
    monthlyConversions: [1, 1, 2, 3, 4, 4],
  },
  {
    id: "aff_08",
    fullName: "Kabita Lama",
    email: "kabita@demo.com",
    code: "KABITA2026",
    city: "Kathmandu",
    platform: "Instagram",
    audienceSize: "10K+",
    tier: "Admizz Legend",
    referralCount: 34,
    convertedCount: 27,
    totalEarned: 89000,
    status: "active",
    joinedAt: "2025-09-01",
    monthlyClicks: [88, 102, 118, 134, 149, 162],
    monthlyConversions: [12, 14, 16, 19, 22, 25],
  },
];

export const mockReferrals: MockReferral[] = [
  // Rohan (aff_01) — Elite Partner
  { id: "ref_001", affiliateId: "aff_01", studentDisplay: "Suraj Y.", date: "2026-05-12", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "Visa Approved", status: "paid", commission: 8000 },
  { id: "ref_002", affiliateId: "aff_01", studentDisplay: "Anjali T.", date: "2026-05-08", destination: "Canada", flagEmoji: "🇨🇦", stage: "University Confirmed", status: "converted", commission: 6000 },
  { id: "ref_003", affiliateId: "aff_01", studentDisplay: "Riya M.", date: "2026-05-01", destination: "Australia", flagEmoji: "🇦🇺", stage: "Enrolled", status: "converted", commission: 3000 },
  { id: "ref_004", affiliateId: "aff_01", studentDisplay: "Bimal K.", date: "2026-04-22", destination: "Germany", flagEmoji: "🇩🇪", stage: "Consultation", status: "pending", commission: 0 },
  { id: "ref_005", affiliateId: "aff_01", studentDisplay: "Pooja S.", date: "2026-04-15", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "Visa Approved", status: "paid", commission: 8000 },
  { id: "ref_006", affiliateId: "aff_01", studentDisplay: "Niraj B.", date: "2026-04-10", destination: "Canada", flagEmoji: "🇨🇦", stage: "Enrolled", status: "paid", commission: 3000 },
  // Priya (aff_02) — Rising Star
  { id: "ref_007", affiliateId: "aff_02", studentDisplay: "Suman R.", date: "2026-05-14", destination: "Australia", flagEmoji: "🇦🇺", stage: "University Confirmed", status: "converted", commission: 6000 },
  { id: "ref_008", affiliateId: "aff_02", studentDisplay: "Deepa G.", date: "2026-05-09", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "Consultation", status: "pending", commission: 0 },
  { id: "ref_009", affiliateId: "aff_02", studentDisplay: "Hari P.", date: "2026-04-28", destination: "Canada", flagEmoji: "🇨🇦", stage: "Visa Approved", status: "paid", commission: 8000 },
  { id: "ref_010", affiliateId: "aff_02", studentDisplay: "Mina T.", date: "2026-04-20", destination: "Germany", flagEmoji: "🇩🇪", stage: "Enrolled", status: "converted", commission: 3000 },
  { id: "ref_011", affiliateId: "aff_02", studentDisplay: "Arun S.", date: "2026-04-12", destination: "Australia", flagEmoji: "🇦🇺", stage: "University Confirmed", status: "paid", commission: 6000 },
  // Sunita (aff_03) — Starter
  { id: "ref_012", affiliateId: "aff_03", studentDisplay: "Gita K.", date: "2026-05-05", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "Enrolled", status: "converted", commission: 3000 },
  { id: "ref_013", affiliateId: "aff_03", studentDisplay: "Ram B.", date: "2026-04-18", destination: "Canada", flagEmoji: "🇨🇦", stage: "Consultation", status: "pending", commission: 0 },
  // Aarya (aff_04) — Rising Star
  { id: "ref_014", affiliateId: "aff_04", studentDisplay: "Kriti S.", date: "2026-05-13", destination: "Australia", flagEmoji: "🇦🇺", stage: "University Confirmed", status: "converted", commission: 6000 },
  { id: "ref_015", affiliateId: "aff_04", studentDisplay: "Dev R.", date: "2026-05-07", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "Enrolled", status: "converted", commission: 3000 },
  { id: "ref_016", affiliateId: "aff_04", studentDisplay: "Nisha M.", date: "2026-04-25", destination: "Germany", flagEmoji: "🇩🇪", stage: "Visa Approved", status: "paid", commission: 8000 },
  { id: "ref_017", affiliateId: "aff_04", studentDisplay: "Raj T.", date: "2026-04-14", destination: "Canada", flagEmoji: "🇨🇦", stage: "Consultation", status: "pending", commission: 0 },
  // Bikash (aff_05)
  { id: "ref_018", affiliateId: "aff_05", studentDisplay: "Laxmi G.", date: "2026-05-10", destination: "Australia", flagEmoji: "🇦🇺", stage: "Enrolled", status: "converted", commission: 3000 },
  // Dipesh (aff_07)
  { id: "ref_019", affiliateId: "aff_07", studentDisplay: "Sabin K.", date: "2026-05-11", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "University Confirmed", status: "converted", commission: 6000 },
  { id: "ref_020", affiliateId: "aff_07", studentDisplay: "Alisha R.", date: "2026-05-03", destination: "Canada", flagEmoji: "🇨🇦", stage: "Consultation", status: "pending", commission: 0 },
  { id: "ref_021", affiliateId: "aff_07", studentDisplay: "Prem B.", date: "2026-04-27", destination: "Australia", flagEmoji: "🇦🇺", stage: "Visa Approved", status: "paid", commission: 8000 },
  // Kabita (aff_08) — Legend
  { id: "ref_022", affiliateId: "aff_08", studentDisplay: "Maya S.", date: "2026-05-15", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "Visa Approved", status: "paid", commission: 8000 },
  { id: "ref_023", affiliateId: "aff_08", studentDisplay: "Binod T.", date: "2026-05-12", destination: "Canada", flagEmoji: "🇨🇦", stage: "University Confirmed", status: "converted", commission: 6000 },
  { id: "ref_024", affiliateId: "aff_08", studentDisplay: "Rekha G.", date: "2026-05-08", destination: "Australia", flagEmoji: "🇦🇺", stage: "Enrolled", status: "converted", commission: 3000 },
  { id: "ref_025", affiliateId: "aff_08", studentDisplay: "Santosh L.", date: "2026-05-02", destination: "Germany", flagEmoji: "🇩🇪", stage: "Visa Approved", status: "paid", commission: 8000 },
  { id: "ref_026", affiliateId: "aff_08", studentDisplay: "Kamala B.", date: "2026-04-29", destination: "United Kingdom", flagEmoji: "🇬🇧", stage: "Consultation", status: "pending", commission: 0 },
];

export const mockApplications: MockApplication[] = [
  {
    id: "app_01",
    fullName: "Nabin Shrestha",
    email: "nabin.shrestha@gmail.com",
    phone: "+977 9841234567",
    city: "Chitwan",
    organization: "Tribhuvan University",
    promotionMethod: "campus",
    platform: "WhatsApp Groups",
    audienceSize: "500-2K",
    profileLink: "",
    hasReferred: false,
    motivation: "I want to help my batchmates find opportunities abroad and earn while doing it.",
    appliedAt: "2026-05-16",
    status: "pending",
  },
  {
    id: "app_02",
    fullName: "Sita Kumari Yadav",
    email: "sita.yadav@gmail.com",
    phone: "+977 9807654321",
    city: "Biratnagar",
    organization: "Purwanchal University",
    promotionMethod: "social",
    platform: "TikTok",
    audienceSize: "2K-10K",
    profileLink: "https://tiktok.com/@sitayadav",
    hasReferred: true,
    motivation: "I already referred 2 students informally. I want to do it properly with a tracking link.",
    appliedAt: "2026-05-15",
    status: "pending",
  },
  {
    id: "app_03",
    fullName: "Prakash Tharu",
    email: "prakash.tharu@outlook.com",
    phone: "+977 9855112233",
    city: "Dharan",
    organization: "BPKIHS College",
    promotionMethod: "social",
    platform: "Instagram",
    audienceSize: "2K-10K",
    profileLink: "https://instagram.com/prakashtharu",
    hasReferred: false,
    motivation: "I run a study abroad tips page on Instagram and want to partner with a real consultancy.",
    appliedAt: "2026-05-14",
    status: "pending",
  },
  {
    id: "app_04",
    fullName: "Manisha Ghimire",
    email: "manisha.ghimire@gmail.com",
    phone: "+977 9812233445",
    city: "Hetauda",
    organization: "Self-employed (IELTS Tutor)",
    promotionMethod: "professional",
    platform: "WhatsApp Groups",
    audienceSize: "500-2K",
    profileLink: "",
    hasReferred: true,
    motivation: "As an IELTS tutor I refer students to consultancies regularly. I want commission for my work.",
    appliedAt: "2026-05-14",
    status: "pending",
  },
  {
    id: "app_05",
    fullName: "Aakash Limbu",
    email: "aakash.limbu@gmail.com",
    phone: "+977 9823344556",
    city: "Birgunj",
    organization: "Kathmandu University",
    promotionMethod: "social",
    platform: "YouTube",
    audienceSize: "2K-10K",
    profileLink: "https://youtube.com/@aakashlimbu",
    hasReferred: false,
    motivation: "I make study abroad vlogs. Adding Admizz to my content makes sense — my audience asks about consultancies.",
    appliedAt: "2026-05-13",
    status: "pending",
  },
  {
    id: "app_06",
    fullName: "Puja Basnet",
    email: "puja.basnet@gmail.com",
    phone: "+977 9834455667",
    city: "Pokhara",
    organization: "Pokhara University",
    promotionMethod: "campus",
    platform: "Instagram",
    audienceSize: "500-2K",
    profileLink: "https://instagram.com/pujabasnet",
    hasReferred: false,
    motivation: "I am a student representative at PU. Many of my peers ask about abroad options and I want to guide them properly.",
    appliedAt: "2026-05-12",
    status: "pending",
  },
];

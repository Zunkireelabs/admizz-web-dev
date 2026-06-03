export type Tier = "Starter" | "Rising Star" | "Elite Partner" | "Admizz Legend";
export type ReferralStatus = "pending" | "converted" | "paid";
export type AppStatus = "new" | "approved" | "rejected";

export interface Affiliate {
  id: string;
  application_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  referral_code: string;
  tier: Tier;
  status: "active" | "suspended";
  total_referrals: number;
  total_converted: number;
  total_earned: number;
  joined_at: string;
  created_at: string;
}

export interface AffiliateReferral {
  id: string;
  affiliate_id: string;
  affiliate_code: string;
  student_display: string;
  destination: string;
  flag_emoji: string;
  stage: "Consultation" | "Enrolled" | "University Confirmed" | "Visa Approved";
  status: ReferralStatus;
  commission: number;
  created_at: string;
  updated_at: string;
  lead_id: string | null;
  email: string | null;
}

export interface RegisterLead {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  countries: string | null;
  intake: string | null;
  field: string | null;
  education: string | null;
  contact_pref: string | null;
  status: string | null;
  source: string | null;
  created_at: string;
}

export interface AffiliateApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  promotion_method: string;
  platform: string;
  audience_size: string;
  profile_link: string;
  has_referred: boolean;
  motivation: string;
  status: AppStatus;
  affiliate_code: string | null;
  created_at: string;
}

export interface AffiliateClick {
  id: string;
  code: string;
  lead_id: string | null;
  landing_page: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface CountryBreakdownEntry {
  destination: string;
  flag_emoji: string;
  count: number;
}

export type ActivityEventKind = "click" | "registration";

export interface ActivityEvent {
  id: string;
  kind: ActivityEventKind;
  at: string;
  // click fields
  landing_page?: string;
  utm_source?: string | null;
  referrer?: string | null;
  // registration fields
  student_display?: string;
  destination?: string;
  flag_emoji?: string;
  stage?: AffiliateReferral["stage"];
  status?: ReferralStatus;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  city: string;
  referral_count: number;
  tier: Tier;
  affiliate_id: string;
}

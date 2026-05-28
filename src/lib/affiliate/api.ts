import {
  mockAffiliates,
  mockReferrals,
  mockApplications,
  type MockAffiliate,
  type MockReferral,
  type MockApplication,
  type Tier,
} from "@/data/affiliate/mockData";

// Mutable state for demo (approve/reject mutates this array in memory)
let _applications = [...mockApplications];

export async function getAffiliateByCredentials(
  email: string,
  code: string
): Promise<MockAffiliate | null> {
  const normalEmail = email.trim().toLowerCase();
  const normalCode = code.trim().toUpperCase();
  return (
    mockAffiliates.find(
      (a) =>
        a.email.toLowerCase() === normalEmail &&
        a.code === normalCode &&
        a.status === "active"
    ) ?? null
  );
}

export async function getAffiliateReferrals(
  affiliateId: string
): Promise<MockReferral[]> {
  return mockReferrals
    .filter((r) => r.affiliateId === affiliateId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  city: string;
  referralCount: number;
  tier: Tier;
  affiliateId: string;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return [...mockAffiliates]
    .filter((a) => a.status === "active")
    .sort((a, b) => b.referralCount - a.referralCount)
    .slice(0, 8)
    .map((a, i) => ({
      rank: i + 1,
      name: a.fullName.split(" ")[0] + " " + a.fullName.split(" ")[1]?.[0] + ".",
      city: a.city,
      referralCount: a.referralCount,
      tier: a.tier,
      affiliateId: a.id,
    }));
}

export async function getAllApplications(): Promise<MockApplication[]> {
  return [..._applications].sort(
    (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
  );
}

export async function getAllAffiliates(): Promise<MockAffiliate[]> {
  return [...mockAffiliates].sort((a, b) => b.referralCount - a.referralCount);
}

export async function getAllReferrals(): Promise<MockReferral[]> {
  return [...mockReferrals].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function approveApplication(id: string): Promise<void> {
  _applications = _applications.map((a) =>
    a.id === id ? { ...a, status: "approved" as const } : a
  );
}

export async function rejectApplication(id: string): Promise<void> {
  _applications = _applications.map((a) =>
    a.id === id ? { ...a, status: "rejected" as const } : a
  );
}

export function getTierThresholds(): {
  tier: Tier;
  min: number;
  max: number | null;
  next: Tier | null;
}[] {
  return [
    { tier: "Starter", min: 0, max: 4, next: "Rising Star" },
    { tier: "Rising Star", min: 5, max: 14, next: "Elite Partner" },
    { tier: "Elite Partner", min: 15, max: 29, next: "Admizz Legend" },
    { tier: "Admizz Legend", min: 30, max: null, next: null },
  ];
}

export function getNextTierInfo(referralCount: number): {
  currentTier: Tier;
  nextTier: Tier | null;
  progressPercent: number;
  remaining: number;
} {
  const thresholds = getTierThresholds();
  const current = thresholds.findLast((t) => referralCount >= t.min) ?? thresholds[0];
  if (!current.next || current.max === null) {
    return { currentTier: current.tier, nextTier: null, progressPercent: 100, remaining: 0 };
  }
  const rangeSize = current.max - current.min + 1;
  const progress = referralCount - current.min;
  return {
    currentTier: current.tier,
    nextTier: current.next,
    progressPercent: Math.min(100, Math.round((progress / rangeSize) * 100)),
    remaining: current.max + 1 - referralCount,
  };
}

export function generateAffiliateCode(fullName: string): string {
  const first = fullName.trim().split(" ")[0] ?? "AFFILIATE";
  return first.toUpperCase().replace(/[^A-Z]/g, "") + "2026";
}

export function getAffiliateNameById(affiliateId: string): string {
  return mockAffiliates.find((a) => a.id === affiliateId)?.fullName ?? "Unknown";
}

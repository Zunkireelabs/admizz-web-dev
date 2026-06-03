import { supabase } from "@/lib/supabase";
import type {
  Affiliate,
  AffiliateReferral,
  AffiliateApplication,
  LeaderboardEntry,
  Tier,
} from "./types";

// ─── Tier helpers ──────────────────────────────────────────────────────────

export function calculateTier(referralCount: number): Tier {
  if (referralCount >= 30) return "Admizz Legend";
  if (referralCount >= 15) return "Elite Partner";
  if (referralCount >= 5) return "Rising Star";
  return "Starter";
}

export function getTierThresholds(): { tier: Tier; min: number; max: number | null; next: Tier | null }[] {
  return [
    { tier: "Starter",       min: 0,  max: 4,    next: "Rising Star"   },
    { tier: "Rising Star",   min: 5,  max: 14,   next: "Elite Partner" },
    { tier: "Elite Partner", min: 15, max: 29,   next: "Admizz Legend" },
    { tier: "Admizz Legend", min: 30, max: null, next: null            },
  ];
}

export function getNextTierInfo(referralCount: number): {
  currentTier: Tier;
  nextTier: Tier | null;
  progressPercent: number;
  remaining: number;
} {
  const thresholds = getTierThresholds();
  const current = [...thresholds].reverse().find(t => referralCount >= t.min) ?? thresholds[0];
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

export function generateReferralCode(fullName: string): string {
  const first = fullName.trim().split(" ")[0] ?? "AFFILIATE";
  return first.toUpperCase().replace(/[^A-Z]/g, "") + "2026";
}

// Returns a unique referral code by appending A, B, C... if the base collides.
export async function generateUniqueReferralCode(fullName: string): Promise<string> {
  const base = generateReferralCode(fullName);
  const { data } = await supabase
    .from("affiliates")
    .select("referral_code")
    .eq("referral_code", base)
    .maybeSingle();
  if (!data) return base;
  for (let i = 0; i < 26; i++) {
    const candidate = base + String.fromCharCode(65 + i); // A, B, C, ...
    const { data: collision } = await supabase
      .from("affiliates")
      .select("referral_code")
      .eq("referral_code", candidate)
      .maybeSingle();
    if (!collision) return candidate;
  }
  // Fallback: random 3-char suffix
  return base + Math.random().toString(36).slice(2, 5).toUpperCase();
}

// ─── Affiliate login ───────────────────────────────────────────────────────

export async function getAffiliateByCredentials(
  email: string,
  code: string
): Promise<Affiliate | null> {
  const { data, error } = await supabase
    .from("affiliates")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .eq("referral_code", code.trim().toUpperCase())
    .eq("status", "active")
    .maybeSingle();

  if (error) { console.error("[affiliate login]", error.message); return null; }
  return data ?? null;
}

// ─── Affiliate dashboard ───────────────────────────────────────────────────

export async function getAffiliateReferrals(affiliateId: string): Promise<AffiliateReferral[]> {
  const { data, error } = await supabase
    .from("affiliate_referrals")
    .select("*")
    .eq("affiliate_id", affiliateId)
    .order("created_at", { ascending: false });

  if (error) { console.error("[affiliate referrals]", error.message); return []; }
  return data ?? [];
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("affiliates")
    .select("id, full_name, city, total_referrals, tier")
    .eq("status", "active")
    .order("total_referrals", { ascending: false })
    .limit(8);

  if (error) { console.error("[leaderboard]", error.message); return []; }
  return (data ?? []).map((a, i) => ({
    rank: i + 1,
    name: a.full_name.split(" ")[0] + " " + (a.full_name.split(" ")[1]?.[0] ?? "") + ".",
    city: a.city ?? "",
    referral_count: a.total_referrals,
    tier: a.tier as Tier,
    affiliate_id: a.id,
  }));
}

// ─── Admin: read ───────────────────────────────────────────────────────────

export async function getAllApplications(): Promise<AffiliateApplication[]> {
  const { data, error } = await supabase
    .from("affiliate_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { console.error("[admin applications]", error.message); return []; }
  return (data ?? []).map(row => ({
    id: row.id,
    full_name: row.full_name,
    email: row.email,
    phone: row.phone ?? "",
    city: row.city ?? "",
    organization: row.organization ?? "",
    promotion_method: row.promotion_method ?? "",
    platform: row.platform ?? "",
    audience_size: row.audience_size ?? "",
    profile_link: row.profile_link ?? "",
    has_referred: row.has_referred === "Yes" || row.has_referred === true,
    motivation: row.motivation ?? "",
    status: (row.status === "approved" ? "approved" : row.status === "rejected" ? "rejected" : "new") as AffiliateApplication["status"],
    affiliate_code: row.affiliate_code ?? null,
    created_at: row.created_at ?? row.appliedAt ?? new Date().toISOString(),
  }));
}

export async function getAllAffiliates(): Promise<Affiliate[]> {
  const { data, error } = await supabase
    .from("affiliates")
    .select("*")
    .order("total_referrals", { ascending: false });

  if (error) { console.error("[admin affiliates]", error.message); return []; }
  return data ?? [];
}

export async function getAllReferrals(): Promise<AffiliateReferral[]> {
  const { data, error } = await supabase
    .from("affiliate_referrals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { console.error("[admin referrals]", error.message); return []; }
  return data ?? [];
}

// ─── Admin: approve / reject ───────────────────────────────────────────────

export type AdminResult<T> = { ok: true; data: T } | { ok: false; error: string };

export async function approveApplication(app: AffiliateApplication): Promise<AdminResult<{ code: string }>> {
  try {
    // Already approved? Return existing code.
    const { data: existing, error: existingError } = await supabase
      .from("affiliates")
      .select("id, referral_code")
      .eq("email", app.email.toLowerCase())
      .maybeSingle();

    if (existingError) return { ok: false, error: existingError.message };

    if (existing) {
      const { error: updErr } = await supabase
        .from("affiliate_leads")
        .update({ status: "approved" })
        .eq("id", app.id);
      if (updErr) return { ok: false, error: updErr.message };
      return { ok: true, data: { code: existing.referral_code } };
    }

    // Generate a unique code (handles name collisions automatically)
    const code = await generateUniqueReferralCode(app.full_name);

    const { error: insertError } = await supabase.from("affiliates").insert({
      application_id:  app.id,
      full_name:       app.full_name,
      email:           app.email.toLowerCase(),
      phone:           app.phone || null,
      city:            app.city || null,
      referral_code:   code,
      tier:            "Starter",
      status:          "active",
      total_referrals: 0,
      total_converted: 0,
      total_earned:    0,
    });

    if (insertError) {
      console.error("[approve application]", insertError.message);
      return { ok: false, error: insertError.message };
    }

    const { error: leadErr } = await supabase
      .from("affiliate_leads")
      .update({ status: "approved" })
      .eq("id", app.id);
    if (leadErr) return { ok: false, error: leadErr.message };

    return { ok: true, data: { code } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function rejectApplication(id: string): Promise<AdminResult<true>> {
  try {
    const { error } = await supabase
      .from("affiliate_leads")
      .update({ status: "rejected" })
      .eq("id", id);
    if (error) {
      console.error("[reject application]", error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ─── Admin: affiliate management ───────────────────────────────────────────

export async function updateAffiliateStatus(
  id: string,
  status: "active" | "suspended"
): Promise<AdminResult<true>> {
  try {
    const { error } = await supabase
      .from("affiliates")
      .update({ status })
      .eq("id", id);
    if (error) {
      console.error("[update affiliate status]", error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ─── Admin: referral management ────────────────────────────────────────────

export async function addReferral(referral: {
  affiliate_id: string;
  affiliate_code: string;
  student_display: string;
  destination: string;
  flag_emoji: string;
  stage: AffiliateReferral["stage"];
  status: AffiliateReferral["status"];
  commission: number;
}): Promise<AdminResult<true>> {
  try {
    const { error } = await supabase.from("affiliate_referrals").insert(referral);
    if (error) {
      console.error("[add referral]", error.message);
      return { ok: false, error: error.message };
    }

    // Update affiliate totals + tier
    const { data: aff, error: affErr } = await supabase
      .from("affiliates")
      .select("total_referrals, total_converted, total_earned, tier")
      .eq("id", referral.affiliate_id)
      .maybeSingle();

    if (affErr) return { ok: false, error: affErr.message };

    if (aff) {
      const newReferrals = aff.total_referrals + 1;
      const newConverted = referral.status !== "pending" ? aff.total_converted + 1 : aff.total_converted;
      const newEarned    = referral.status === "paid" ? aff.total_earned + referral.commission : aff.total_earned;
      const newTier      = calculateTier(newReferrals);

      const { error: updErr } = await supabase
        .from("affiliates")
        .update({ total_referrals: newReferrals, total_converted: newConverted, total_earned: newEarned, tier: newTier })
        .eq("id", referral.affiliate_id);
      if (updErr) return { ok: false, error: updErr.message };
    }
    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function updateReferralStatus(
  id: string,
  status: ReferralStatus,
  commission: number
): Promise<AdminResult<true>> {
  try {
    const { error } = await supabase
      .from("affiliate_referrals")
      .update({ status, commission, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      console.error("[update referral status]", error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function markReferralPaid(id: string, affiliateId: string, commission: number): Promise<AdminResult<true>> {
  const r = await updateReferralStatus(id, "paid", commission);
  if (!r.ok) return r;

  try {
    const { data: aff, error: affErr } = await supabase
      .from("affiliates")
      .select("total_earned")
      .eq("id", affiliateId)
      .maybeSingle();
    if (affErr) return { ok: false, error: affErr.message };

    if (aff) {
      const { error: updErr } = await supabase
        .from("affiliates")
        .update({ total_earned: aff.total_earned + commission })
        .eq("id", affiliateId);
      if (updErr) return { ok: false, error: updErr.message };
    }
    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ─── Auto-referral creation from student registration ────────────────────
// Called from RegisterForm.tsx after a successful student registration.
// Looks up the affiliate by code, creates a pending referral, and updates
// the affiliate's totals + tier. Silent on failure (registration must not break).

interface RegistrationData {
  full_name:  string;
  countries:  string;    // e.g. "🇨🇦 Canada, 🇺🇸 USA"
  lead_id?:   string;    // register_leads.id — links the referral row back to the student lead
  email?:     string;    // denormalized so admin can search/filter without a join
}

function parseFirstCountry(countries: string): { name: string; flag: string } {
  const first = countries.split(",")[0]?.trim() ?? "";
  // Format from RegisterForm: "🇨🇦 Canada" — first token is flag emoji
  const parts = first.split(/\s+/);
  const flag = parts[0] ?? "🌍";
  const name = parts.slice(1).join(" ") || "Other";
  return { name, flag };
}

function buildStudentDisplay(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "Anonymous";
  const parts = trimmed.split(/\s+/);
  const first = parts[0];
  const lastInitial = parts[1]?.[0]?.toUpperCase();
  return lastInitial ? `${first} ${lastInitial}.` : first;
}

export async function createReferralFromRegistration(
  refCode: string,
  registration: RegistrationData
): Promise<AdminResult<true>> {
  try {
    const code = refCode.trim().toUpperCase();
    if (!code) return { ok: false, error: "Empty referral code" };

    // Look up the affiliate (must be active)
    const { data: aff, error: affErr } = await supabase
      .from("affiliates")
      .select("id, referral_code, total_referrals, total_converted, total_earned, status")
      .eq("referral_code", code)
      .maybeSingle();

    if (affErr) return { ok: false, error: affErr.message };
    if (!aff) return { ok: false, error: `Affiliate with code ${code} not found` };
    if (aff.status !== "active") return { ok: false, error: `Affiliate ${code} is not active` };

    const { name: destination, flag: flag_emoji } = parseFirstCountry(registration.countries);
    const student_display = buildStudentDisplay(registration.full_name);

    // Create the referral row (default: Consultation / pending / NPR 0)
    const { error: insertError } = await supabase.from("affiliate_referrals").insert({
      affiliate_id:    aff.id,
      affiliate_code:  aff.referral_code,
      student_display,
      destination,
      flag_emoji,
      stage:           "Consultation",
      status:          "pending",
      commission:      0,
      lead_id:         registration.lead_id ?? null,
      email:           registration.email?.trim().toLowerCase() ?? null,
    });

    if (insertError) {
      console.error("[auto referral insert]", insertError.message);
      return { ok: false, error: insertError.message };
    }

    // Update affiliate totals + tier
    const newReferrals = aff.total_referrals + 1;
    const newTier      = calculateTier(newReferrals);

    const { error: updErr } = await supabase
      .from("affiliates")
      .update({ total_referrals: newReferrals, tier: newTier })
      .eq("id", aff.id);

    if (updErr) {
      console.error("[auto referral update affiliate]", updErr.message);
      return { ok: false, error: updErr.message };
    }

    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// Re-export types for convenience
export type { Affiliate, AffiliateReferral, AffiliateApplication, LeaderboardEntry, Tier, ReferralStatus } from "./types";
type ReferralStatus = import("./types").ReferralStatus;

import { supabase } from "@/lib/supabase";
import type {
  Affiliate,
  AffiliateReferral,
  AffiliateApplication,
  AffiliateClick,
  CountryBreakdownEntry,
  ActivityEvent,
  LeaderboardEntry,
  RegisterLead,
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
// All affiliate-facing reads go through SECURITY DEFINER RPCs (defined in
// supabase/migrations/002_rls_and_auth.sql). The anon key cannot SELECT
// directly from the affiliates / affiliate_referrals / affiliate_clicks
// tables — RLS blocks it. The RPCs validate (email + referral_code) on
// every call and return only that affiliate's own data.

interface AffiliateCredentials {
  email: string;
  code: string;
}

export async function getAffiliateByCredentials(
  email: string,
  code: string
): Promise<Affiliate | null> {
  const { data, error } = await supabase.rpc("affiliate_login", {
    p_email: email.trim().toLowerCase(),
    p_code:  code.trim().toUpperCase(),
  });
  if (error) { console.error("[affiliate login]", error.message); return null; }
  if (!data) return null;
  const row = Array.isArray(data) ? data[0] : (data as Affiliate);
  // Postgres functions returning a composite type return an all-NULL row when
  // no record matched (instead of NULL). Treat missing id as no-match.
  if (!row || !row.id) return null;
  return row;
}

// ─── Affiliate dashboard ───────────────────────────────────────────────────

// Re-fetch the affiliate row so totals/tier reflect server state, not stale
// localStorage. We re-validate the credentials on every call so RLS is honored.
export async function refreshAffiliate(creds: AffiliateCredentials): Promise<Affiliate | null> {
  return getAffiliateByCredentials(creds.email, creds.code);
}

// Back-compat shim — old callsites still pass an id. We can't fetch by id under
// RLS, so this just returns null. Callers should migrate to refreshAffiliate(creds).
export async function getAffiliateById(_id: string): Promise<Affiliate | null> {
  console.warn("[getAffiliateById] deprecated under RLS — use refreshAffiliate(creds) instead");
  return null;
}

// RLS-aware version — pass credentials so the RPC can authorize the read.
export async function getAffiliateReferrals(creds: AffiliateCredentials): Promise<AffiliateReferral[]> {
  const { data, error } = await supabase.rpc("affiliate_self_referrals", {
    p_email: creds.email.trim().toLowerCase(),
    p_code:  creds.code.trim().toUpperCase(),
  });
  if (error) { console.error("[affiliate referrals]", error.message); return []; }
  return (data ?? []) as AffiliateReferral[];
}

// Public leaderboard via dedicated VIEW — anon can SELECT this only.
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("affiliate_leaderboard_public")
    .select("id, full_name, city, total_referrals, tier")
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

// ─── Affiliate clicks / funnel ─────────────────────────────────────────────
// Reads go through the affiliate_self_clicks RPC (credential-validated).
// Direct SELECT on affiliate_clicks is blocked by RLS.

export async function getAffiliateClicks(creds: AffiliateCredentials, limit = 200): Promise<AffiliateClick[]> {
  const { data, error } = await supabase.rpc("affiliate_self_clicks", {
    p_email: creds.email.trim().toLowerCase(),
    p_code:  creds.code.trim().toUpperCase(),
    p_limit: limit,
  });
  if (error) { console.error("[affiliate clicks]", error.message); return []; }
  return (data ?? []) as AffiliateClick[];
}

// Count is derived from the array length on the client to avoid a separate query.
export function getAffiliateClickCountFromList(clicks: AffiliateClick[]): number {
  return clicks.length;
}

// Derived client-side from the referrals already loaded — no extra query.
export function buildCountryBreakdown(referrals: AffiliateReferral[]): CountryBreakdownEntry[] {
  const map = new Map<string, CountryBreakdownEntry>();
  for (const r of referrals) {
    const key = r.destination || "Other";
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, { destination: key, flag_emoji: r.flag_emoji || "🌍", count: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

// Merge clicks + referrals into a unified, time-sorted activity feed.
export function buildActivityFeed(
  clicks: AffiliateClick[],
  referrals: AffiliateReferral[],
  limit = 25,
): ActivityEvent[] {
  const feed: ActivityEvent[] = [
    ...clicks.map<ActivityEvent>(c => ({
      id: `c-${c.id}`,
      kind: "click",
      at: c.created_at,
      landing_page: c.landing_page,
      utm_source: c.utm_source,
      referrer: c.referrer,
    })),
    ...referrals.map<ActivityEvent>(r => ({
      id: `r-${r.id}`,
      kind: "registration",
      at: r.created_at,
      student_display: r.student_display,
      destination: r.destination,
      flag_emoji: r.flag_emoji,
      stage: r.stage,
      status: r.status,
    })),
  ];
  return feed.sort((a, b) => +new Date(b.at) - +new Date(a.at)).slice(0, limit);
}

// ─── Admin: program-wide reads ─────────────────────────────────────────────

export async function getAllClicks(limit = 1000): Promise<AffiliateClick[]> {
  const { data, error } = await supabase
    .from("affiliate_clicks")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) { console.error("[admin clicks]", error.message); return []; }
  return (data ?? []) as AffiliateClick[];
}

// ─── Admin: drill into the originating register_leads row ─────────────────

export async function getLeadById(id: string): Promise<RegisterLead | null> {
  const { data, error } = await supabase
    .from("register_leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) { console.error("[lead drill-in]", error.message); return null; }
  return data ?? null;
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

// ─── Aggregate recompute ──────────────────────────────────────────────────
// Rebuild the affiliate's totals + tier directly from the referrals table.
// Called after ANY mutation that affects referrals (insert / status change /
// commission edit). Idempotent — works no matter how many times it runs.
export async function recomputeAffiliateTotals(affiliateId: string): Promise<AdminResult<true>> {
  try {
    const { data: rows, error } = await supabase
      .from("affiliate_referrals")
      .select("status, commission")
      .eq("affiliate_id", affiliateId);
    if (error) return { ok: false, error: error.message };

    const refs = rows ?? [];
    const total_referrals = refs.length;
    const total_converted = refs.filter(r => r.status === "converted" || r.status === "paid").length;
    const total_earned    = refs.filter(r => r.status === "paid").reduce((s, r) => s + (r.commission ?? 0), 0);
    const tier            = calculateTier(total_referrals);

    const { error: updErr } = await supabase
      .from("affiliates")
      .update({ total_referrals, total_converted, total_earned, tier })
      .eq("id", affiliateId);
    if (updErr) return { ok: false, error: updErr.message };
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
    return recomputeAffiliateTotals(referral.affiliate_id);
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
    // We need the affiliate_id so we can recompute totals after the change.
    const { data: existing, error: fetchErr } = await supabase
      .from("affiliate_referrals")
      .select("affiliate_id")
      .eq("id", id)
      .maybeSingle();
    if (fetchErr) return { ok: false, error: fetchErr.message };
    if (!existing) return { ok: false, error: "Referral not found" };

    const { error } = await supabase
      .from("affiliate_referrals")
      .update({ status, commission, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      console.error("[update referral status]", error.message);
      return { ok: false, error: error.message };
    }
    return recomputeAffiliateTotals(existing.affiliate_id);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// affiliateId kept in the signature for callsite compatibility — the recompute
// inside updateReferralStatus reads it from the referral row itself.
export async function markReferralPaid(id: string, _affiliateId: string, commission: number): Promise<AdminResult<true>> {
  return updateReferralStatus(id, "paid", commission);
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

    return recomputeAffiliateTotals(aff.id);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// Re-export types for convenience
export type { Affiliate, AffiliateReferral, AffiliateApplication, AffiliateClick, CountryBreakdownEntry, ActivityEvent, LeaderboardEntry, RegisterLead, Tier, ReferralStatus } from "./types";
type ReferralStatus = import("./types").ReferralStatus;

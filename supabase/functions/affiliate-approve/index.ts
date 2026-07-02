// ============================================================================
// affiliate-approve — Supabase Edge Function
// ============================================================================
// Called by the admin panel when an admin clicks "Approve" on an application.
//
// What it does:
//   1. Verifies the caller is a logged-in admin (Supabase Auth JWT + is_admin)
//   2. Generates a unique referral code
//   3. Invites the affiliate via Supabase Auth (sends approval email automatically)
//   4. Creates the affiliates row with auth_user_id linked
//   5. Updates affiliate_leads status → "approved"
//
// Environment variables (automatically injected by Supabase into every function):
//   SUPABASE_URL              — your project URL
//   SUPABASE_SERVICE_ROLE_KEY — service role key (bypasses RLS, never in frontend)
//
// Environment variables (set manually in Supabase Dashboard → Edge Functions → Secrets):
//   SITE_URL — e.g. https://admizzeducation.com (used as redirectTo in invite email)
// ============================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL             = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL                 = Deno.env.get("SITE_URL") ?? "https://admizzeducation.com";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── Helpers ────────────────────────────────────────────────────────────────

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function randomSuffix(len = 4): string {
  const chars  = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
  const bytes  = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => chars[b % chars.length]).join("");
}

function buildReferralCode(fullName: string): string {
  const first = (fullName.trim().split(" ")[0] ?? "AFFILIATE")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 8);
  return `${first}-${randomSuffix(4)}`;
}

// ── Main handler ────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // ── 1. Verify caller is an authenticated admin ─────────────────────────
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return json({ error: "Missing authorization header" }, 401);
  }

  const callerJwt = authHeader.replace("Bearer ", "").trim();

  // Use service role client to verify the caller's JWT
  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Verify JWT by fetching the user it belongs to
  const { data: { user: callerUser }, error: userErr } = await adminClient.auth.getUser(callerJwt);
  if (userErr || !callerUser) {
    return json({ error: "Invalid or expired session" }, 401);
  }

  // Check admin role in user_metadata
  const role = callerUser.user_metadata?.role ?? "";
  if (role !== "admin") {
    return json({ error: "Forbidden — admin only" }, 403);
  }

  // ── 2. Parse request body ──────────────────────────────────────────────
  let app: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    city?: string;
  };
  let redirectOrigin: string | undefined;

  try {
    const body = await req.json();
    app = body.app;
    redirectOrigin = typeof body.redirectOrigin === "string" ? body.redirectOrigin : undefined;
    if (!app?.id || !app?.email || !app?.full_name) {
      return json({ error: "Missing required fields: app.id, app.email, app.full_name" }, 400);
    }
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = app.email.trim().toLowerCase();

  // Prefer the origin the admin's browser is on (dev vs prod), fall back to
  // the SITE_URL env. Only http/https URLs are accepted to avoid open-redirect
  // shenanigans if a body field is tampered with.
  const baseUrl = (() => {
    if (redirectOrigin && /^https?:\/\//i.test(redirectOrigin)) return redirectOrigin;
    return SITE_URL;
  })();
  const inviteRedirectTo = `${baseUrl.replace(/\/$/, "")}/affiliate-dashboard`;

  // ── 3. Check if already an affiliate ──────────────────────────────────
  const { data: existing } = await adminClient
    .from("affiliates")
    .select("id, referral_code, auth_user_id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    // Already approved — sync lead status and write the assigned code back so the admin UI shows it correctly
    await adminClient
      .from("affiliate_leads")
      .update({ status: "approved", affiliate_code: existing.referral_code })
      .eq("id", app.id);

    return json({ ok: true, data: { code: existing.referral_code, already_existed: true } });
  }

  // ── 4. Generate a unique referral code ────────────────────────────────
  let referralCode = "";
  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = buildReferralCode(app.full_name);
    const { data: clash } = await adminClient
      .from("affiliates")
      .select("referral_code")
      .eq("referral_code", candidate)
      .maybeSingle();
    if (!clash) { referralCode = candidate; break; }
  }
  if (!referralCode) referralCode = `AFF-${randomSuffix(6)}`;

  // ── 5. Invite via Supabase Auth — sends approval email automatically ──
  const { data: inviteData, error: inviteErr } = await adminClient.auth.admin.inviteUserByEmail(
    email,
    {
      redirectTo: inviteRedirectTo,
      data: { role: "affiliate", full_name: app.full_name, must_change_password: true },
    }
  );

  if (inviteErr) {
    // "User already registered" means they have a Supabase Auth account
    // (e.g. from a previous invite) — look up by email and proceed
    if (!inviteErr.message.toLowerCase().includes("already")) {
      return json({ ok: false, error: `Invite failed: ${inviteErr.message}` }, 400);
    }

    // Find the existing auth user and reuse their id
    const { data: { users } } = await adminClient.auth.admin.listUsers();
    const authUser = users.find(u => u.email?.toLowerCase() === email);
    if (!authUser) {
      return json({ ok: false, error: "Could not find existing auth user" }, 400);
    }

    // Insert affiliates row using existing auth user id
    const { error: insertErr } = await adminClient.from("affiliates").insert({
      application_id:  app.id,
      full_name:       app.full_name.trim(),
      email,
      phone:           app.phone?.trim() || null,
      city:            app.city?.trim()  || null,
      referral_code:   referralCode,
      auth_user_id:    authUser.id,
      tier:            "Starter",
      status:          "active",
      total_referrals: 0,
      total_converted: 0,
      total_earned:    0,
    });

    if (insertErr) return json({ ok: false, error: insertErr.message }, 400);

    await adminClient.from("affiliate_leads").update({ status: "approved", affiliate_code: referralCode }).eq("id", app.id);
    return json({ ok: true, data: { code: referralCode } });
  }

  const authUserId = inviteData.user.id;

  // ── 6. Insert affiliates row ───────────────────────────────────────────
  const { error: insertErr } = await adminClient.from("affiliates").insert({
    application_id:  app.id,
    full_name:       app.full_name.trim(),
    email,
    phone:           app.phone?.trim() || null,
    city:            app.city?.trim()  || null,
    referral_code:   referralCode,
    auth_user_id:    authUserId,
    tier:            "Starter",
    status:          "active",
    total_referrals: 0,
    total_converted: 0,
    total_earned:    0,
  });

  if (insertErr) {
    return json({ ok: false, error: insertErr.message }, 400);
  }

  // ── 7. Mark application as approved + write assigned code back so admin UI persists it ──
  await adminClient
    .from("affiliate_leads")
    .update({ status: "approved", affiliate_code: referralCode })
    .eq("id", app.id);

  return json({ ok: true, data: { code: referralCode } });
});

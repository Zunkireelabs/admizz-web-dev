// ============================================================================
// affiliate-resend-invite — Supabase Edge Function
// ============================================================================
// Called by the admin panel when an admin clicks "Resend Invite" on an affiliate.
// Sends a fresh activation email with a new magic link (24h expiry).
//
// POST body: { email: string, redirectOrigin?: string }
// Auth:      Bearer <admin JWT>
// ============================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL              = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL                  = Deno.env.get("SITE_URL") ?? "https://admizzeducation.com";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // ── 1. Verify caller is an authenticated admin ───────────────────────────
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return json({ error: "Missing authorization header" }, 401);

  const callerJwt = authHeader.replace("Bearer ", "").trim();
  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: { user: callerUser }, error: userErr } = await adminClient.auth.getUser(callerJwt);
  if (userErr || !callerUser) return json({ error: "Invalid or expired session" }, 401);
  if (callerUser.user_metadata?.role !== "admin") return json({ error: "Forbidden — admin only" }, 403);

  // ── 2. Parse body ────────────────────────────────────────────────────────
  let email: string;
  let redirectOrigin: string | undefined;
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    redirectOrigin = typeof body.redirectOrigin === "string" ? body.redirectOrigin : undefined;
    if (!email) return json({ error: "Missing required field: email" }, 400);
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const baseUrl = redirectOrigin && /^https?:\/\//i.test(redirectOrigin) ? redirectOrigin : SITE_URL;
  const inviteRedirectTo = `${baseUrl.replace(/\/$/, "")}/affiliate-dashboard`;

  // ── 3. Look up the existing auth user to preserve their metadata ─────────
  const { data: { users }, error: listErr } = await adminClient.auth.admin.listUsers();
  if (listErr) return json({ error: "Could not fetch users" }, 500);

  const existingUser = users.find(u => u.email?.toLowerCase() === email);
  if (!existingUser) return json({ error: "No auth user found for this email. Have they been approved yet?" }, 404);

  // Preserve must_change_password: if they've already set a password, don't force it again.
  const mustChangePassword = existingUser.user_metadata?.must_change_password !== false;

  // ── 4. Re-send the invite (generates a fresh magic link) ─────────────────
  const { error: inviteErr } = await adminClient.auth.admin.inviteUserByEmail(email, {
    redirectTo: inviteRedirectTo,
    data: {
      ...existingUser.user_metadata,
      must_change_password: mustChangePassword,
    },
  });

  if (inviteErr) return json({ ok: false, error: `Failed to resend invite: ${inviteErr.message}` }, 400);

  return json({ ok: true });
});

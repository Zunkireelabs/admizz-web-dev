// affiliate-forgot-password — Self-serve password reset via Resend
//
// POST body: { email: string }
// No auth required — public endpoint.
// Always returns { ok: true } regardless of whether the email exists
// to prevent email enumeration attacks.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL              = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY            = Deno.env.get("RESEND_API_KEY")!;

// Whitelisted origins — reset email will link back to whichever of these sent the request.
const ALLOWED_ORIGINS = [
  "https://admizzeducation.com",
  "https://dev-web.admizzeducation.com",
];
const FALLBACK_SITE_URL = "https://admizzeducation.com";

function resolveSiteUrl(req: Request): string {
  const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
  const matched = ALLOWED_ORIGINS.find(o => origin.startsWith(o));
  return matched ?? FALLBACK_SITE_URL;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "content-type, authorization, x-client-info, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function buildEmailHtml(resetLink: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;background:#FAFAFB;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFB;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img
                src="https://admizzeducation.com/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
                alt="Admizz Education"
                height="36"
                style="display:block;"
              />
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#FFFFFF;border:1px solid #EAECF0;border-radius:16px;padding:40px 36px;">

              <!-- Badge -->
              <p style="margin:0 0 24px;text-align:center;">
                <span style="display:inline-block;background:rgba(252,183,48,0.08);border:1px solid rgba(252,183,48,0.25);color:#b07400;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:5px 12px;border-radius:100px;">
                  Affiliate Portal
                </span>
              </p>

              <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#001353;text-align:center;letter-spacing:-0.3px;">
                Reset your password
              </h1>
              <p style="margin:0 0 32px;font-size:14px;color:#475569;text-align:center;line-height:1.6;">
                We received a request to reset the password for your Admizz affiliate account.
                Click the button below to set a new password.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a
                      href="${resetLink}"
                      style="display:inline-block;background:#FDED22;color:#001353;font-size:14px;font-weight:800;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:-0.1px;"
                    >
                      Set New Password →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Plain text fallback -->
              <p style="margin:0 0 8px;font-size:12px;color:#94A3B8;text-align:center;">
                Button not working? Copy and paste this link into your browser:
              </p>
              <p style="margin:0 0 32px;font-size:11px;color:#475569;text-align:center;word-break:break-all;">
                ${resetLink}
              </p>

              <hr style="border:none;border-top:1px solid #EAECF0;margin:0 0 24px;" />

              <p style="margin:0;font-size:12px;color:#94A3B8;text-align:center;line-height:1.6;">
                This link expires in 24 hours. If you didn't request a password reset,
                you can safely ignore this email — your account remains secure.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#94A3B8;">
                Admizz Education · Kathmandu, Nepal
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // ── 1. Parse body ────────────────────────────────────────────────────────
  let email: string;
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    if (!email) return json({ error: "Missing required field: email" }, 400);
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const dashboardUrl = `${resolveSiteUrl(req).replace(/\/$/, "")}/affiliate-dashboard`;

  // ── 2. Look up user — silently succeed if not found (prevent enumeration) ─
  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: { users }, error: listErr } = await adminClient.auth.admin.listUsers();
  if (listErr) {
    console.error("[forgot-password] listUsers error:", listErr.message);
    return json({ ok: true }); // still return ok — don't leak errors
  }

  const user = users.find(u => u.email?.toLowerCase() === email);

  // Unknown email — silent (prevent enumeration)
  if (!user) {
    console.info("[forgot-password] no user found for:", email, "— silently succeeding");
    return json({ ok: true });
  }

  // Not yet confirmed — invite link was never clicked or expired before use.
  // Resend a fresh invite link so they can reach SetPassword.
  if (!user.email_confirmed_at) {
    console.info("[forgot-password] unconfirmed user:", email, "— resending invite");
    const { error: inviteErr } = await adminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo: dashboardUrl,
      data: {
        ...user.user_metadata,
        must_change_password: true,
      },
    });
    if (inviteErr) {
      console.error("[forgot-password] inviteUserByEmail error:", inviteErr.message);
      return json({ ok: false, error: "Failed to send invite" }, 500);
    }
    return json({ ok: true });
  }

  // ── 3. Generate recovery link via service role ───────────────────────────
  const { data: linkData, error: linkErr } = await adminClient.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: dashboardUrl },
  });

  if (linkErr || !linkData?.properties?.action_link) {
    console.error("[forgot-password] generateLink error:", linkErr?.message);
    return json({ ok: false, error: "Failed to generate reset link" }, 500);
  }

  // generateLink ignores options.redirectTo and uses the project Site URL.
  // Manually override redirect_to in the action_link to point to the dashboard.
  const actionUrl = new URL(linkData.properties.action_link);
  actionUrl.searchParams.set("redirect_to", dashboardUrl);
  const resetLink = actionUrl.toString();

  // ── 4. Send via Resend ───────────────────────────────────────────────────
  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Admizz Education <noreply@admizzeducation.com>",
      to: [email],
      subject: "Reset your Admizz Affiliate password",
      html: buildEmailHtml(resetLink),
    }),
  });

  if (!resendRes.ok) {
    const resendError = await resendRes.text();
    console.error("[forgot-password] Resend error:", resendError);
    return json({ ok: false, error: "Failed to send email" }, 500);
  }

  console.info("[forgot-password] reset email sent to:", email);
  return json({ ok: true });
});

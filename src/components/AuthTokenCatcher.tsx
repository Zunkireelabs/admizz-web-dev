"use client";

import { useEffect } from "react";

// Catches Supabase auth tokens that land on any page other than the affiliate
// dashboard and bounces them to /affiliate-dashboard with the token preserved.
//
// Why this exists:
//   Supabase's invite email respects `redirectTo` but its password reset,
//   magic link, and recovery emails fall back to the project's Site URL
//   (the root, "/"). On a static export the root has no auth handler, so the
//   token just gets dropped and the user lands on the homepage with the spin
//   wheel. This component runs in the root layout, sees the token wherever it
//   lands, and forwards it to the page that knows how to process it.
//
// Recognized token shapes:
//   - "?code=..."                       (PKCE flow, all reset/recovery emails)
//   - "#access_token=..."               (implicit flow, older invite emails)
//   - "?type=recovery|invite|magiclink" (Supabase recovery flows)
//   - "?error=...&error_description=..."(expired/used token — surface on dashboard)

const TARGET = "/affiliate-dashboard";

function urlHasAuthToken(): boolean {
  if (typeof window === "undefined") return false;
  const hash   = window.location.hash;
  const params = new URLSearchParams(window.location.search);

  if (hash.includes("access_token"))      return true;
  if (hash.includes("type=invite"))       return true;
  if (hash.includes("type=recovery"))     return true;
  if (params.has("code"))                 return true;
  const t = params.get("type");
  if (t === "recovery" || t === "invite" || t === "magiclink" || t === "signup") return true;
  if (params.has("error") && params.has("error_description")) return true;

  return false;
}

export default function AuthTokenCatcher() {
  useEffect(() => {
    if (!urlHasAuthToken()) return;
    if (window.location.pathname === TARGET) return;

    // Preserve search + hash exactly so Supabase JS can still consume them.
    const next = `${TARGET}${window.location.search}${window.location.hash}`;
    window.location.replace(next);
  }, []);

  return null;
}

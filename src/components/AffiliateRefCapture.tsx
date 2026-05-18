"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const COOKIE_NAME = "admizz_ref";
const COOKIE_DAYS = 90;

function hasCookie(name: string) {
  return typeof document !== "undefined" &&
    document.cookie.split("; ").some(c => c.startsWith(name + "="));
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const maxAge = days * 86400;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export default function AffiliateRefCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (!ref) return;

      // Fire-and-forget insert (never awaited — page is unaffected)
      supabase
        .from("affiliate_clicks")
        .insert({
          code: ref,
          landing_page: window.location.pathname,
          referrer: document.referrer || null,
          utm_source:   params.get("utm_source"),
          utm_medium:   params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
          user_agent: navigator.userAgent,
        })
        .then(({ error }) => {
          if (error) console.warn("[ref capture] insert failed:", error.message);
        });

      // First-touch attribution — don't overwrite existing cookie
      if (!hasCookie(COOKIE_NAME)) {
        setCookie(COOKIE_NAME, ref, COOKIE_DAYS);
      }
    } catch (err) {
      console.warn("[ref capture] unexpected error:", err);
    }
  }, []);

  return null;
}

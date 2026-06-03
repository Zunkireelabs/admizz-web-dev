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

      // Validated insert via RPC — unknown codes are rejected server-side so
      // affiliate_clicks can't be spammed for arbitrary codes.
      supabase
        .rpc("record_affiliate_click", {
          p_code:         ref,
          p_landing_page: window.location.pathname,
          p_referrer:     document.referrer || null,
          p_utm_source:   params.get("utm_source"),
          p_utm_medium:   params.get("utm_medium"),
          p_utm_campaign: params.get("utm_campaign"),
          p_user_agent:   navigator.userAgent,
        })
        .then(({ error, data }) => {
          if (error) console.warn("[ref capture] rpc failed:", error.message);
          else if (data === false) console.info("[ref capture] code not active:", ref);
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

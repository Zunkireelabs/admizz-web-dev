"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { writeAffiliateRef } from "@/lib/affiliate/refCookie";

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

      // Write to both sessionStorage (this session) and cookie (30-day fallback).
      // sessionStorage is cleared when the browser closes, preventing a user who
      // clicked an affiliate link weeks ago from being falsely attributed when
      // they return organically in a new session.
      writeAffiliateRef(ref);
    } catch (err) {
      console.warn("[ref capture] unexpected error:", err);
    }
  }, []);

  return null;
}

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Short-link redirect page. URL shape: /r?c=A8x2qP
// Reads ?c=, resolves it via the public RPC, then window.location.replace()s
// to the original destination with ?ref=AFF_CODE attached. The resolve RPC
// also bumps the short link's click_count atomically.
export default function ShortLinkRedirect() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = (params.get("c") || "").trim();

    if (!code) {
      setError("This short link is missing its code.");
      return;
    }

    let cancelled = false;
    (async () => {
      const { data, error: rpcErr } = await supabase.rpc(
        "affiliate_resolve_short_link",
        { p_code: code },
      );
      if (cancelled) return;

      if (rpcErr) {
        console.warn("[short-link resolve] rpc error:", rpcErr.message);
        setError("We couldn't open this link. Please double-check it.");
        return;
      }

      const row = Array.isArray(data) ? data[0] : null;
      if (!row || !row.destination_path) {
        setError("This short link is no longer valid.");
        return;
      }

      // Preserve any query/hash the recipient added themselves (e.g. utm_*).
      const path  = row.destination_path as string;
      const owner = row.owner_ref_code  as string;

      const target = new URL(path, window.location.origin);
      target.searchParams.set("ref", owner);

      window.location.replace(target.toString());
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#FAFAFB" }}
    >
      <img
        src="/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
        alt="Admizz Education"
        className="h-8 w-auto mb-8"
        style={{ opacity: 0.85 }}
      />
      {error ? (
        <div className="text-center max-w-sm">
          <p className="text-sm font-semibold mb-3" style={{ color: "#b91d3f" }}>
            {error}
          </p>
          <a
            href="/"
            className="text-sm font-bold underline"
            style={{ color: "#001353" }}
          >
            Go to admizzeducation.com
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <svg
            className="w-4 h-4 animate-spin flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "#FCB730" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <p className="text-sm font-semibold" style={{ color: "#475569" }}>
            Redirecting…
          </p>
        </div>
      )}
    </div>
  );
}

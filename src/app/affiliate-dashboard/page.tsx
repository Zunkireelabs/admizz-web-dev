"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Affiliate, AffiliateReferral, LeaderboardEntry, AffiliateClick } from "@/lib/affiliate/types";
import { getLeaderboard } from "@/lib/affiliate/api";
import AffiliateLogin from "@/components/affiliate/dashboard/AffiliateLogin";
import DashboardShell from "@/components/affiliate/dashboard/DashboardShell";
import SetPassword from "@/components/affiliate/dashboard/SetPassword";

type View = "loading" | "activating" | "login" | "set-password" | "dashboard" | "load-error";

function needsPasswordChange(session: Session): boolean {
  return session.user.user_metadata?.must_change_password === true;
}

// Supabase redirects back to the dashboard with ?error=... or #error=... when
// an invite/OTP link is invalid, expired, or already consumed. We must detect
// this BEFORE checking for a session — otherwise a stale localStorage session
// keeps us on the dead set-password screen.
function readUrlError(): string | null {
  if (typeof window === "undefined") return null;
  const search = new URLSearchParams(window.location.search);
  const hash   = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return search.get("error_description")
      ?? hash.get("error_description")
      ?? search.get("error")
      ?? hash.get("error")
      ?? null;
}

type InviteFromUrl =
  | { kind: "hash";  access_token: string; refresh_token: string }
  | { kind: "pkce";  code: string }
  | { kind: "error"; description: string }
  | { kind: "none" };

// Single source of truth for what's in the URL when the page mounts. The
// invite handshake is owned here — supabase-js detectSessionInUrl is disabled
// on purpose so a stale localStorage session can never silently win the race.
function classifyInviteUrl(): InviteFromUrl {
  if (typeof window === "undefined") return { kind: "none" };

  const search = new URLSearchParams(window.location.search);
  const hash   = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  const errorDesc = search.get("error_description") ?? hash.get("error_description")
                 ?? search.get("error")             ?? hash.get("error");
  if (errorDesc) return { kind: "error", description: errorDesc };

  const access  = hash.get("access_token");
  const refresh = hash.get("refresh_token");
  if (access && refresh) {
    return { kind: "hash", access_token: access, refresh_token: refresh };
  }

  const code = search.get("code");
  if (code) return { kind: "pkce", code };

  return { kind: "none" };
}

function scrubUrl() {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", window.location.pathname);
}

export default function AffiliateDashboardPage() {
  const [view,        setView]        = useState<View>("loading");
  const [session,     setSession]     = useState<Session | null>(null);
  const [affiliate,   setAffiliate]   = useState<Affiliate | null>(null);
  const [referrals,   setReferrals]   = useState<AffiliateReferral[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [clicks,      setClicks]      = useState<AffiliateClick[]>([]);
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  const [loadErrorMsg, setLoadErrorMsg] = useState<string | null>(null);
  const [retrying,    setRetrying]    = useState(false);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      const urlState = classifyInviteUrl();
      console.info("[affiliate-dashboard] url state:", urlState.kind);

      // 1. Expired/consumed invite link — Supabase redirected back with error params.
      //    Force a clean state: sign out any stale session, scrub the URL, show login.
      if (urlState.kind === "error") {
        console.warn("[affiliate-dashboard] invite error:", urlState.description);
        setLoginNotice(
          "Your activation link has expired or was already used. Please ask the team to resend it.",
        );
        scrubUrl();
        if (!cancelled) setView("login");
        // Fire-and-forget — never await Supabase Auth here. signOut() hits the
        // same flaky endpoint as setSession/updateUser and can hang forever,
        // which would trap us on the "Loading…" screen.
        void supabase.auth.signOut().catch(() => {});
        return;
      }

      // 2. Fresh invite tokens in URL — establish a clean session deterministically.
      //    Any stale session in localStorage is wiped first so we can never be
      //    fooled into rendering SetPassword against a dead session.
      if (urlState.kind === "hash" || urlState.kind === "pkce") {
        setView("activating");
        // Fire-and-forget — never await. See note above on signOut hang.
        void supabase.auth.signOut().catch(() => {});

        // Race against an 8s timeout. Observed: Supabase Auth /user endpoint
        // occasionally hangs the response, but the session is already persisted
        // to localStorage by the time the network call is made. On timeout,
        // ask getSession() what's in storage and proceed if it picked up.
        const EXCHANGE_TIMEOUT_MS = 8_000;
        const exchangePromise =
          urlState.kind === "hash"
            ? supabase.auth.setSession({
                access_token:  urlState.access_token,
                refresh_token: urlState.refresh_token,
              })
            : supabase.auth.exchangeCodeForSession(urlState.code);
        const timeoutPromise = new Promise<{ __timeout: true }>(resolve =>
          setTimeout(() => resolve({ __timeout: true }), EXCHANGE_TIMEOUT_MS),
        );

        const exchanged = await Promise.race([exchangePromise, timeoutPromise]);
        scrubUrl();

        let fresh: Session | null = null;
        if ("__timeout" in exchanged) {
          console.warn("[affiliate-dashboard] invite exchange hung — checking localStorage fallback");
          const { data } = await Promise.race([
            supabase.auth.getSession(),
            new Promise<{ data: { session: null } }>(resolve =>
              setTimeout(() => resolve({ data: { session: null } }), 3_000),
            ),
          ]);
          fresh = data.session ?? null;
        } else if (exchanged.error || !exchanged.data.session) {
          console.warn("[affiliate-dashboard] invite exchange failed:", exchanged.error?.message);
        } else {
          fresh = exchanged.data.session;
        }

        if (!fresh) {
          setLoginNotice(
            "Your activation link has expired or was already used. Please ask the team to resend it.",
          );
          if (!cancelled) setView("login");
          void supabase.auth.signOut().catch(() => {});
          return;
        }
        console.info("[affiliate-dashboard] invite session established for", fresh.user.email);
        if (cancelled) return;

        setSession(fresh);
        if (needsPasswordChange(fresh)) {
          setView("set-password");
        } else {
          await loadDashboard(fresh);
        }
        return;
      }

      // 3. No invite in URL — fall back to whatever session is already stored.
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      if (session) {
        setSession(session);
        if (needsPasswordChange(session)) {
          setView("set-password");
        } else {
          await loadDashboard(session);
        }
      } else {
        setView("login");
      }
    };

    bootstrap();

    // Live auth state changes — invite token exchange, sign-out, token refresh.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setSession(session);
        if (needsPasswordChange(session)) {
          setView("set-password");
          return;
        }
        await loadDashboard(session);
      }
      if (event === "USER_UPDATED" && session) {
        // Password was just set — load the dashboard with the updated session.
        setSession(session);
        await loadDashboard(session);
      }
      if (event === "SIGNED_OUT") {
        setView("login");
        setSession(null);
        setAffiliate(null);
        setReferrals([]);
        setClicks([]);
        setLeaderboard([]);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  // Pre-warm the JWT before firing parallel RPCs. supabase-js queues the next
  // refresh internally; calling getSession() forces it to settle here (in
  // series) instead of every parallel RPC blocking behind it. Wrapped in its
  // own short timeout so a hung refresh doesn't trap us — we just proceed
  // optimistically with the existing token.
  const prewarmJwt = async () => {
    try {
      await Promise.race([
        supabase.auth.getSession(),
        new Promise(resolve => setTimeout(resolve, 4_000)),
      ]);
    } catch { /* ignore — caller will fall through with current token */ }
  };

  const loadDashboard = async (sess: Session) => {
    // Per-call timeout so a single hung RPC can't trap the page on "Loading…"
    // forever. Bumped to 25s to swallow slow JWT refreshes on poor networks —
    // the older 10s was below the long tail of Supabase Auth response times.
    const LOAD_TIMEOUT_MS = 25_000;
    const withTimeout = <T,>(label: string, p: PromiseLike<T>): Promise<T | { __timeout: true }> => {
      return Promise.race<T | { __timeout: true }>([
        Promise.resolve(p),
        new Promise<{ __timeout: true }>(resolve =>
          setTimeout(() => {
            console.warn("[dashboard load] timed out:", label);
            resolve({ __timeout: true });
          }, LOAD_TIMEOUT_MS),
        ),
      ]);
    };

    console.info("[dashboard load] starting for", sess.user.email);
    setLoadErrorMsg(null);

    // Force any pending JWT refresh to complete BEFORE we fire parallel RPCs.
    await prewarmJwt();

    const runOnce = async () => Promise.all([
      withTimeout("affiliate_me",            supabase.rpc("affiliate_me")),
      withTimeout("affiliate_self_referrals", supabase.rpc("affiliate_self_referrals")),
      withTimeout("getLeaderboard",          getLeaderboard()),
      withTimeout("affiliate_self_clicks",    supabase.rpc("affiliate_self_clicks", { p_limit: 200 })),
    ]);

    try {
      let [affRes, refRes, lb, clkRes] = await runOnce();

      // Silent single retry if the primary RPC timed out — most slow refreshes
      // resolve on the second try once the new token is in hand.
      if (affRes && typeof affRes === "object" && "__timeout" in affRes) {
        console.warn("[dashboard load] affiliate_me timed out — retrying once");
        await prewarmJwt();
        [affRes, refRes, lb, clkRes] = await runOnce();
      }

      // Still timing out — keep the session intact and show a retry banner
      // instead of signing the user out. The session is almost certainly fine;
      // Supabase or the network is just slow.
      if (affRes && typeof affRes === "object" && "__timeout" in affRes) {
        console.warn("[dashboard load] affiliate_me still timed out — showing retry UI");
        setLoadErrorMsg("We couldn't load your dashboard. Your connection looks slow — give it another try.");
        setView("load-error");
        return;
      }

      // Postgres composite-returning functions return an all-NULL row (not NULL)
      // when no match is found, so `!affRes.data` is not enough — check for an id.
      const affRow = (affRes.data as Affiliate | null) ?? null;
      if (affRes.error || !affRow || !affRow.id) {
        console.warn("[dashboard load] no affiliate row for", sess.user.email, affRes.error?.message);
        setLoginNotice("No affiliate account is linked to this email. Please contact the team or sign up again.");
        setView("login");
        void supabase.auth.signOut().catch(() => {});
        return;
      }

      const refData = refRes && "__timeout" in refRes ? null : refRes;
      const lbData  = lb    && typeof lb === "object" && "__timeout" in lb ? null : lb;
      const clkData = clkRes && "__timeout" in clkRes ? null : clkRes;

      setAffiliate(affRow);
      setReferrals((refData?.data ?? []) as AffiliateReferral[]);
      setLeaderboard((lbData as LeaderboardEntry[] | null) ?? []);
      setClicks((clkData?.data ?? []) as AffiliateClick[]);
      setView("dashboard");
      console.info("[dashboard load] done");
    } catch (err) {
      console.error("[dashboard load] unexpected error:", err);
      // Keep the session — surface a retry, not a logout. A thrown error here
      // is almost always a transient network blip, not an auth failure.
      setLoadErrorMsg("Something went wrong loading your dashboard. Please try again.");
      setView("load-error");
    }
  };

  const handleRetryLoad = async () => {
    if (retrying) return;
    setRetrying(true);
    try {
      const { data: { session: sess } } = await supabase.auth.getSession();
      if (!sess) {
        setLoginNotice("Your session expired. Please log in again.");
        setView("login");
        return;
      }
      setView("loading");
      await loadDashboard(sess);
    } finally {
      setRetrying(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handlePasswordSet = () => {
    // Clear invite token from URL so a refresh doesn't re-trigger this flow.
    // USER_UPDATED in onAuthStateChange handles the dashboard transition.
    window.history.replaceState(null, "", window.location.pathname);
  };

  // ── Render ──────────────────────────────────────────────────────────────

  if (view === "loading" || view === "activating") {
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
        <div className="flex items-center gap-2.5">
          <svg
            className="w-4 h-4 animate-spin flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "#FCB730" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className="text-sm font-semibold" style={{ color: "#475569" }}>
            {view === "activating" ? "Activating your account…" : "Loading…"}
          </p>
        </div>
      </div>
    );
  }

  if (view === "set-password") {
    return <SetPassword onComplete={handlePasswordSet} />;
  }

  if (view === "load-error") {
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
        <div className="max-w-md w-full text-center">
          <p className="text-base font-semibold mb-2" style={{ color: "#0F172A" }}>
            We couldn’t load your dashboard
          </p>
          <p className="text-sm mb-6" style={{ color: "#64748B" }}>
            {loadErrorMsg ?? "Your connection looks slow — give it another try."}
          </p>
          <button
            onClick={handleRetryLoad}
            disabled={retrying}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity"
            style={{
              background: "#FCB730",
              color: "#0F172A",
              opacity: retrying ? 0.7 : 1,
              cursor: retrying ? "wait" : "pointer",
            }}
          >
            {retrying ? "Retrying…" : "Retry"}
          </button>
          <p className="text-xs mt-4" style={{ color: "#94A3B8" }}>
            You’re still signed in — no need to log in again.
          </p>
        </div>
      </div>
    );
  }

  if (view === "login" || !affiliate) {
    return (
      <AffiliateLogin
        notice={loginNotice}
        onLogin={async (email, password) => {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) console.warn("[affiliate login]", error.message);
          if (!error) setLoginNotice(null);
          return !error;
        }}
      />
    );
  }

  return (
    <DashboardShell
      affiliate={affiliate}
      referrals={referrals}
      leaderboard={leaderboard}
      clicks={clicks}
      onLogout={handleLogout}
      affiliateCode={affiliate.referral_code}
    />
  );
}

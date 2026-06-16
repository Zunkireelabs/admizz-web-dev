"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Affiliate, AffiliateReferral, LeaderboardEntry, AffiliateClick } from "@/lib/affiliate/types";
import { getLeaderboard } from "@/lib/affiliate/api";
import AffiliateLogin from "@/components/affiliate/dashboard/AffiliateLogin";
import DashboardShell from "@/components/affiliate/dashboard/DashboardShell";
import SetPassword from "@/components/affiliate/dashboard/SetPassword";

type View = "loading" | "activating" | "login" | "set-password" | "dashboard";

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

  const loadDashboard = async (sess: Session) => {
    // Wrap each request in a per-call timeout so a single hung RPC can't trap
    // the page on "Loading…" forever. Observed: Supabase Auth API occasionally
    // hangs the JWT refresh that runs ahead of authenticated requests, which
    // takes every parallel RPC down with it.
    const LOAD_TIMEOUT_MS = 10_000;
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

    try {
      const [affRes, refRes, lb, clkRes] = await Promise.all([
        withTimeout("affiliate_me",            supabase.rpc("affiliate_me")),
        withTimeout("affiliate_self_referrals", supabase.rpc("affiliate_self_referrals")),
        withTimeout("getLeaderboard",          getLeaderboard()),
        withTimeout("affiliate_self_clicks",    supabase.rpc("affiliate_self_clicks", { p_limit: 200 })),
      ]);

      // If the primary call (affiliate_me) timed out, we have nothing useful to
      // render — sign the user out and let them re-enter their password.
      if (affRes && typeof affRes === "object" && "__timeout" in affRes) {
        console.warn("[dashboard load] affiliate_me timed out — forcing re-login");
        setLoginNotice("Your session expired. Please log in again.");
        setView("login");
        void supabase.auth.signOut().catch(() => {});
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
      setLoginNotice("Something went wrong loading the dashboard. Please log in again.");
      setView("login");
      void supabase.auth.signOut().catch(() => {});
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

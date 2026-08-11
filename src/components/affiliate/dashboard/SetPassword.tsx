"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  onComplete: () => void;
}

// Narrow signals that the underlying invite session is dead. Everything else
// is surfaced verbatim so future failures are debuggable instead of being
// hidden behind a generic "link expired" toast.
const EXPIRED_PATTERNS = [
  /refresh_token_not_found/i,
  /invalid_grant/i,
  /invalid refresh token/i,
  /jwt expired/i,
  /jwt_expired/i,
  /user_not_found/i,
];

function looksLikeDeadSession(msg: string): boolean {
  return EXPIRED_PATTERNS.some(rx => rx.test(msg));
}

export default function SetPassword({ onComplete }: Props) {
  const [password,     setPassword]     = useState("");
  const [confirm,      setConfirm]      = useState("");
  const [loading,      setLoading]      = useState(false);
  const [stalled,      setStalled]      = useState(false);
  const [error,        setError]        = useState("");
  const [userEmail,    setUserEmail]    = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);

  // Show the affiliate which email this password will be tied to. A mismatch
  // (e.g. a leftover stale session) is the kind of bug that's only obvious
  // when you can see the email on screen.
  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.warn("[SetPassword] getUser error:", error.message);
        return;
      }
      setUserEmail(data.user?.email ?? null);
    });
  }, []);

  const startOver = async () => {
    await supabase.auth.signOut().catch(() => {});
    if (typeof window !== "undefined") {
      window.location.href = "/affiliate-dashboard";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Race updateUser against a short timeout. Observed in the wild: Supabase
    // applies the password update server-side but the HTTP response can hang,
    // so we can't trust "no response" to mean "no update". On timeout we
    // re-check the server: if must_change_password flipped to false, the call
    // actually succeeded and we move on.
    const TIMEOUT_MS = 8_000;
    const updatePromise = supabase.auth.updateUser({
      password,
      data: { must_change_password: false },
    });
    const timeoutPromise = new Promise<{ timeout: true }>(resolve =>
      setTimeout(() => resolve({ timeout: true }), TIMEOUT_MS),
    );

    const result = await Promise.race([updatePromise, timeoutPromise]);

    if ("timeout" in result) {
      console.warn(
        "[SetPassword] updateUser response hung after",
        TIMEOUT_MS,
        "ms — forcing full page reload to recover",
      );
      // CRITICAL: do NOT call any more Supabase Auth APIs here. If updateUser
      // hung, refreshSession / getUser will likely hang too — they all hit the
      // same flaky endpoint. A hard reload tears down the JS context and runs
      // the dashboard bootstrap fresh. The password is almost always set
      // server-side already; on reload the user_metadata flag is false and the
      // bootstrap goes straight to the dashboard. If the password was NOT set,
      // the bootstrap surfaces the login screen with our existing notice.
      setStalled(true);
      window.location.replace("/affiliate-dashboard");
      return;
    }

    setLoading(false);

    if (result.error) {
      const msg = result.error.message ?? "";
      console.warn("[SetPassword] updateUser error:", msg, result.error);
      if (looksLikeDeadSession(msg)) {
        // Same logic as the timeout path: do not chain more flaky API calls.
        // Hard-reload so the bootstrap can route the user to login cleanly.
        setStalled(true);
        if (typeof window !== "undefined") {
          try { window.localStorage.clear(); } catch {}
        }
        window.location.replace("/affiliate-dashboard");
        return;
      }
      setError(msg || "Could not set password. Please try again.");
      return;
    }

    console.info("[SetPassword] password set OK for", result.data.user?.email);
    onComplete();
  };

  if (stalled) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: "#FAFAFB" }}
      >
        <p className="text-sm font-semibold mb-3" style={{ color: "#001353" }}>
          Finalizing your account…
        </p>
        <a
          href="/affiliate-dashboard"
          className="text-xs underline"
          style={{ color: "#64748b" }}
        >
          Click here if this takes more than a few seconds
        </a>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#FAFAFB" }}
    >
      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(252,183,48,0.06) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(49,66,156,0.04) 0%, transparent 60%)" }} />

      <div className="w-full max-w-sm relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <a href="/affiliate" className="inline-block mb-7">
            <img
              src="/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
              alt="Admizz Education"
              className="h-9 w-auto mx-auto"
            />
          </a>
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase mb-5"
            style={{
              background: "rgba(252,183,48,0.08)",
              border: "1px solid rgba(252,183,48,0.25)",
              color: "#b07400",
              letterSpacing: "0.12em",
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: "#FCB730" }} />
            Welcome to Admizz Affiliates
          </div>
          <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight" style={{ color: "#001353" }}>
            Set your password
          </h1>
          <p className="mt-2 text-sm leading-snug" style={{ color: "#475569" }}>
            Choose a secure password to protect your affiliate account. You only do this once.
          </p>
          {userEmail && (
            <p className="mt-3 text-xs" style={{ color: "#64748b" }}>
              Activating <span className="font-semibold" style={{ color: "#001353" }}>{userEmail}</span>
            </p>
          )}
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-7 space-y-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EAECF0",
            boxShadow: "0 12px 32px rgba(16,24,40,0.06), 0 4px 8px rgba(16,24,40,0.04)",
          }}
        >
          {/* New password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase" style={{ color: "#475569", letterSpacing: "0.12em" }}>
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200"
                style={{ background: "#FAFAFB", border: "1px solid #EAECF0", color: "#001353" }}
                onFocus={e => { e.target.style.borderColor = "#FCB730"; e.target.style.background = "#FFFFFF"; e.target.style.boxShadow = "0 0 0 3px rgba(252,183,48,0.12)"; }}
                onBlur={e => { e.target.style.borderColor = "#EAECF0"; e.target.style.background = "#FAFAFB"; e.target.style.boxShadow = "none"; }}
              />
              <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: "#94A3B8" }}>
                {showPassword
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                }
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase" style={{ color: "#475569", letterSpacing: "0.12em" }}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all duration-200"
                style={{ background: "#FAFAFB", border: "1px solid #EAECF0", color: "#001353" }}
                onFocus={e => { e.target.style.borderColor = "#FCB730"; e.target.style.background = "#FFFFFF"; e.target.style.boxShadow = "0 0 0 3px rgba(252,183,48,0.12)"; }}
                onBlur={e => { e.target.style.borderColor = "#EAECF0"; e.target.style.background = "#FAFAFB"; e.target.style.boxShadow = "none"; }}
              />
              <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: "#94A3B8" }}>
                {showConfirm
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                }
              </button>
            </div>
          </div>

          {/* Strength hint */}
          {password.length > 0 && (
            <p className="text-xs" style={{ color: password.length >= 8 ? "#16a34a" : "#b07400" }}>
              {password.length >= 8 ? "✓ Strong enough" : `${8 - password.length} more characters needed`}
            </p>
          )}

          {/* Error */}
          {error && (
            <div
              className="flex items-start gap-2 px-3.5 py-3 rounded-xl text-xs"
              style={{ background: "rgba(224,69,98,0.06)", color: "#b91d3f", border: "1px solid rgba(224,69,98,0.18)" }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0 mt-px" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: loading ? "rgba(253,237,34,0.6)" : "#FDED22",
              color: "#001353",
              boxShadow: loading ? "none" : "0 4px 16px rgba(253,237,34,0.4)",
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#FCB730"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(252,183,48,0.5)"; } }}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = "#FDED22"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(253,237,34,0.4)"; } }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Setting password…
              </>
            ) : (
              <>
                Set Password & Go to Dashboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={startOver}
            className="block w-full text-center text-xs font-semibold pt-1 transition-colors duration-200"
            style={{ color: "#64748b" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#001353"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; }}
          >
            Use a different account
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface Props {
  onLogin: (email: string, code: string) => Promise<boolean>;
  notice?: string | null;
}

export default function AffiliateLogin({ onLogin, notice }: Props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await onLogin(email.trim(), code.trim());
    setLoading(false);
    if (!ok) {
      setError("Incorrect email or password. Check your approval email for your login credentials.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#FAFAFB" }}
    >
      {/* Soft ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(252,183,48,0.06) 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(49,66,156,0.04) 0%, transparent 60%)" }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/affiliate-program" className="inline-block mb-7">
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
            Affiliate Portal
          </div>
          <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight" style={{ color: "#001353" }}>
            Sign in to your dashboard
          </h1>
          <p className="mt-2 text-sm leading-snug" style={{ color: "#475569" }}>
            Access your referral analytics, marketing toolkit, and earnings.
          </p>
        </div>

        {/* Premium form card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-7 space-y-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EAECF0",
            boxShadow: "0 12px 32px rgba(16,24,40,0.06), 0 4px 8px rgba(16,24,40,0.04)",
          }}
        >
          <div className="space-y-1.5">
            <label
              className="text-[11px] font-bold uppercase"
              style={{ color: "#475569", letterSpacing: "0.12em" }}
            >
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                background: "#FAFAFB",
                border: "1px solid #EAECF0",
                color: "#001353",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#FCB730";
                e.target.style.background = "#FFFFFF";
                e.target.style.boxShadow = "0 0 0 3px rgba(252,183,48,0.12)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#EAECF0";
                e.target.style.background = "#FAFAFB";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-[11px] font-bold uppercase"
              style={{ color: "#475569", letterSpacing: "0.12em" }}
            >
              Password
            </label>
            <input
              type="password"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Your account password"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                background: "#FAFAFB",
                border: "1px solid #EAECF0",
                color: "#001353",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#FCB730";
                e.target.style.background = "#FFFFFF";
                e.target.style.boxShadow = "0 0 0 3px rgba(252,183,48,0.12)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#EAECF0";
                e.target.style.background = "#FAFAFB";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {notice && !error && (
            <div
              className="flex items-start gap-2 px-3.5 py-3 rounded-xl text-xs"
              style={{
                background: "rgba(252,183,48,0.08)",
                color: "#92580a",
                border: "1px solid rgba(252,183,48,0.3)",
              }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0 mt-px" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="leading-snug">{notice}</span>
            </div>
          )}

          {error && (
            <div
              className="flex items-start gap-2 px-3.5 py-3 rounded-xl text-xs"
              style={{
                background: "rgba(224,69,98,0.06)",
                color: "#b91d3f",
                border: "1px solid rgba(224,69,98,0.18)",
              }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0 mt-px" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <span className="leading-snug">{error}</span>
            </div>
          )}

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
                Verifying…
              </>
            ) : (
              <>
                Access My Dashboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-xs" style={{ color: "#64748B" }}>
          Not an affiliate yet?{" "}
          <a href="/affiliate-program#apply-form" className="font-bold transition-colors" style={{ color: "#b07400" }}>
            Apply to join the program →
          </a>
        </p>
      </div>
    </div>
  );
}

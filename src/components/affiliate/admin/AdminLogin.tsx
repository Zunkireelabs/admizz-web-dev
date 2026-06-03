"use client";

import { useState } from "react";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admizz@admin2026") {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#FAFAFB" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(49,66,156,0.05) 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 30% at 50% 100%, rgba(252,183,48,0.04) 0%, transparent 60%)" }}
      />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <img
            src="/images/logos/Admizz-Education-New-Logo-For-Light-Background.webp"
            alt="Admizz Education"
            className="h-9 w-auto mx-auto mb-6"
          />
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase mb-5"
            style={{
              background: "rgba(49,66,156,0.06)",
              border: "1px solid rgba(49,66,156,0.25)",
              color: "#31429C",
              letterSpacing: "0.12em",
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Internal Portal
          </div>
          <h1 className="text-2xl md:text-[28px] font-extrabold tracking-tight" style={{ color: "#001353" }}>
            Affiliate Admin
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#475569" }}>
            Manage applications, affiliates, referrals, and payouts.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-7 space-y-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EAECF0",
            boxShadow: "0 12px 32px rgba(16,24,40,0.06), 0 4px 8px rgba(16,24,40,0.04)",
            animation: shake ? "admin-shake 0.4s ease" : "none",
          }}
        >
          <div className="space-y-1.5">
            <label
              className="text-[11px] font-bold uppercase"
              style={{ color: "#475569", letterSpacing: "0.12em" }}
            >
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                background: "#FAFAFB",
                border: `1px solid ${error ? "rgba(220,38,38,0.4)" : "#EAECF0"}`,
                color: "#001353",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#31429C";
                e.target.style.background = "#FFFFFF";
                e.target.style.boxShadow = "0 0 0 3px rgba(49,66,156,0.1)";
              }}
              onBlur={e => {
                e.target.style.borderColor = error ? "rgba(220,38,38,0.4)" : "#EAECF0";
                e.target.style.background = "#FAFAFB";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <div
              className="flex items-start gap-2 px-3.5 py-3 rounded-xl text-xs"
              style={{
                background: "rgba(220,38,38,0.06)",
                color: "#b91d3f",
                border: "1px solid rgba(220,38,38,0.18)",
              }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0 mt-px" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <span className="leading-snug">Incorrect password. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: "#FDED22",
              color: "#001353",
              boxShadow: "0 4px 16px rgba(253,237,34,0.4)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#FCB730"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(252,183,48,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FDED22"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(253,237,34,0.4)"; }}
          >
            Continue to Admin
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>

        <p className="text-center mt-6 text-xs" style={{ color: "#64748B" }}>
          Authorized personnel only · All actions are logged
        </p>

        <style>{`
          @keyframes admin-shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
          }
        `}</style>
      </div>
    </div>
  );
}

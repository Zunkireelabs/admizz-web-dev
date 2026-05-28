"use client";

import { useState } from "react";

interface Props {
  onLogin: (email: string, code: string) => Promise<boolean>;
}

export default function AffiliateLogin({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await onLogin(email.trim(), code.trim().toUpperCase());
    setLoading(false);
    if (!ok) {
      setError("Invalid email or referral code. Check your approval email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#020818" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/affiliate-program" className="inline-block mb-6">
            <img
              src="/images/logos/Admizz-Education-New-Logo-For-Dark-Background-1.png-1-1024x331.webp"
              alt="Admizz Education"
              className="h-9 w-auto mx-auto"
            />
          </a>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: "rgba(253,237,34,0.1)", border: "1px solid rgba(253,237,34,0.2)", color: "#FDED22" }}
          >
            Affiliate Portal
          </div>
          <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Sign in with your approved credentials
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{
            background: "rgba(13,25,80,0.7)",
            border: "1px solid rgba(252,183,48,0.15)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
              onFocus={e => { e.target.style.borderColor = "#FCB730"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
              Referral code
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. FIRSTNAME2026"
              required
              className="w-full px-4 py-3 rounded-xl text-sm font-mono font-bold outline-none tracking-widest"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#FCB730" }}
              onFocus={e => { e.target.style.borderColor = "#FCB730"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
            />
          </div>

          {error && (
            <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(224,69,98,0.12)", color: "#e04562" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-[10px] text-sm font-extrabold text-black transition-all duration-200"
            style={{ background: loading ? "rgba(253,237,34,0.6)" : "#FDED22" }}
          >
            {loading ? "Checking…" : "Access My Dashboard →"}
          </button>
        </form>

        <p className="text-center mt-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          Don&apos;t have a code?{" "}
          <a href="/affiliate-program#apply-form" className="underline" style={{ color: "rgba(253,237,34,0.7)" }}>
            Apply here →
          </a>
        </p>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#020818" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mb-6">
            <img
              src="/images/logos/Admizz-Education-New-Logo-For-Dark-Background-1.png-1-1024x331.webp"
              alt="Admizz Education"
              className="h-9 w-auto mx-auto"
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            Internal Portal
          </p>
          <h1 className="text-2xl font-extrabold text-white">Affiliate Admin</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{
            background: "rgba(13,25,80,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            animation: shake ? "shake 0.4s ease" : "none",
          }}
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter admin password"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: `1px solid ${error ? "rgba(224,69,98,0.5)" : "rgba(255,255,255,0.12)"}`,
                color: "#fff",
              }}
            />
          </div>

          {error && (
            <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(224,69,98,0.12)", color: "#e04562" }}>
              Incorrect password. Try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-[10px] text-sm font-extrabold text-black"
            style={{ background: "#FDED22" }}
          >
            Enter →
          </button>
        </form>

        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-8px)}
            40%{transform:translateX(8px)}
            60%{transform:translateX(-6px)}
            80%{transform:translateX(6px)}
          }
        `}</style>
      </div>
    </div>
  );
}

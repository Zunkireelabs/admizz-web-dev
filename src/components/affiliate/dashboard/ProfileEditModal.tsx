"use client";

import { useEffect, useRef, useState } from "react";
import type { Affiliate } from "@/lib/affiliate/types";
import { supabase } from "@/lib/supabase";

interface Props {
  affiliate: Affiliate;
  onClose: () => void;
  onSaved: (updated: Pick<Affiliate, "full_name" | "phone">) => void;
}

const INPUT_BASE: React.CSSProperties = {
  background: "#FAFAFB",
  border: "1px solid #EAECF0",
  color: "#001353",
};

export default function ProfileEditModal({ affiliate, onClose, onSaved }: Props) {
  const [fullName, setFullName] = useState(affiliate.full_name);
  const [phone, setPhone]       = useState(affiliate.phone ?? "");
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const [saved, setSaved]       = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first field + bind ESC
  useEffect(() => {
    firstInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (fullName.trim().length < 2) { setError("Name must be at least 2 characters."); return; }
    setSaving(true);
    const { data, error: rpcErr } = await supabase.rpc("affiliate_update_profile", {
      p_full_name: fullName.trim(),
      p_phone:     phone.trim() || null,
    });
    setSaving(false);
    if (rpcErr || data === false) {
      setError(rpcErr?.message ?? "Update failed — please try again.");
      return;
    }
    setSaved(true);
    onSaved({ full_name: fullName.trim(), phone: phone.trim() || null });
    setTimeout(onClose, 900);
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#FCB730";
    e.target.style.background  = "#FFFFFF";
    e.target.style.boxShadow   = "0 0 0 3px rgba(252,183,48,0.12)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#EAECF0";
    e.target.style.background  = "#FAFAFB";
    e.target.style.boxShadow   = "none";
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(3px)" }}
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm rounded-2xl p-7 z-10"
        role="dialog"
        aria-modal="true"
        aria-label="Edit profile"
        style={{
          background: "#FFFFFF",
          border: "1px solid #EAECF0",
          boxShadow: "0 24px 64px rgba(15,23,42,0.22)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight" style={{ color: "#001353" }}>
              Edit Profile
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              Update your name or phone number.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ border: "1px solid #EAECF0", color: "#64748B" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F8F9FC"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            aria-label="Close"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email — read-only */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase" style={{ color: "#475569", letterSpacing: "0.12em" }}>
              Email address
            </label>
            <div
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", color: "#94A3B8" }}
            >
              {affiliate.email}
            </div>
            <p className="text-[10px]" style={{ color: "#94A3B8" }}>Email cannot be changed — contact admin.</p>
          </div>

          {/* Full name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase" style={{ color: "#475569", letterSpacing: "0.12em" }}>
              Full name
            </label>
            <input
              ref={firstInputRef}
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={INPUT_BASE}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase" style={{ color: "#475569", letterSpacing: "0.12em" }}>
              Phone <span style={{ color: "#94A3B8", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+977 98XXXXXXXX"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={INPUT_BASE}
              onFocus={focusStyle}
              onBlur={blurStyle}
            />
          </div>

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

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
              style={{ border: "1px solid #EAECF0", color: "#475569", background: "#FFFFFF" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F8F9FC"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || saved}
              className="flex-1 py-3 rounded-xl text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: saved ? "#22c55e" : saving ? "rgba(253,237,34,0.6)" : "#FDED22",
                color: saved ? "#FFFFFF" : "#001353",
                boxShadow: saved || saving ? "none" : "0 4px 16px rgba(253,237,34,0.4)",
              }}
            >
              {saved ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </>
              ) : saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

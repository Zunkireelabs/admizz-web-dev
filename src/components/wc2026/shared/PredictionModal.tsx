"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MatchWithTeams, PredictionChoice, PredictionLead } from "@/lib/wc2026/types";
import { savePrediction } from "@/lib/wc2026/predictions";
import { DIAL_CODES, dialSpec, phoneDigits } from "@/lib/dialCodes";
import Flag from "./Flag";
import { CheckIcon } from "./Icons";

const CRM_ENDPOINT     = "https://lead-crm.zunkireelabs.com/api/v1/leads";
const CRM_TENANT_ID    = "febeb37c-521c-4f29-adbb-0195b2eede88";
const CRM_FORM_CONFIG_ID = "94f614bd-21e5-4e7a-a134-b4fe66f6f975";

function makeSessionId(): string {
  return Math.random().toString(36).slice(2, 16);
}

function splitName(full: string): { first_name: string; last_name: string | null } {
  const trimmed = full.trim().replace(/\s+/g, " ");
  if (!trimmed) return { first_name: "", last_name: null };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { first_name: trimmed, last_name: null };
  return { first_name: trimmed.slice(0, idx), last_name: trimmed.slice(idx + 1) };
}

interface PredictionModalProps {
  open: boolean;
  match: MatchWithTeams | null;
  choice: PredictionChoice | null;
  onClose: () => void;
  onSubmitted: () => void;
}

function pickLabel(match: MatchWithTeams, choice: PredictionChoice): string {
  if (choice === "team_a") return `${match.teamAData.name} to win`;
  if (choice === "team_b") return `${match.teamBData.name} to win`;
  return "A draw at full time";
}

export default function PredictionModal({ open, match, choice, onClose, onSubmitted }: PredictionModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dialKey, setDialKey] = useState("NP");
  const [phone, setPhone] = useState("");
  const [dialOpen, setDialOpen] = useState(false);
  const [dialSearch, setDialSearch] = useState("");
  const dialRootRef = useRef<HTMLDivElement>(null);
  const dialSearchRef = useRef<HTMLInputElement>(null);
  const spec = dialSpec(dialKey);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setPhone("");
      setDialKey("NP");
      setDialOpen(false);
    }
  }, [open, match?.id, choice]);

  useEffect(() => {
    if (!dialOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (dialRootRef.current && !dialRootRef.current.contains(e.target as Node)) setDialOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDialOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [dialOpen]);

  useEffect(() => {
    if (dialOpen) {
      setDialSearch("");
      requestAnimationFrame(() => dialSearchRef.current?.focus());
    }
  }, [dialOpen]);

  const filteredDialCodes = useMemo(() => {
    const q = dialSearch.trim().toLowerCase();
    if (!q) return DIAL_CODES;
    return DIAL_CODES.filter(
      d => d.country.toLowerCase().includes(q) || d.dial.includes(q) || d.key.toLowerCase().includes(q),
    );
  }, [dialSearch]);

  if (!open || !match || !choice) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone.length < 7) return;
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const lead: PredictionLead = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: `${spec.dial} ${phone}`,
      dialCode: spec.dial,
      city: String(formData.get("city") || ""),
      source: "worldcup-predict-win",
      matchId: match.id,
      matchLabel: `${match.teamAData.name} vs ${match.teamBData.name}`,
      prediction: choice,
      submittedAt: new Date().toISOString(),
    };
    try {
      const names = splitName(lead.name);
      const dialDigits = lead.dialCode.replace(/\D/g, "");
      const phoneAllDigits = lead.phone.replace(/\D/g, "");
      const phoneLocalDigits = phoneAllDigits.startsWith(dialDigits)
        ? phoneAllDigits.slice(dialDigits.length)
        : phoneAllDigits;
      const sessionId = makeSessionId();
      const res = await fetch(CRM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant_id:       CRM_TENANT_ID,
          form_config_id:  CRM_FORM_CONFIG_ID,
          session_id:      sessionId,
          idempotency_key: `${sessionId}-final`,
          intake_source:   "form",
          intake_medium:   null,
          intake_campaign: null,
          status:          "new",
          step:            1,
          is_final:        true,
          file_urls:       [],
          country:         null,
          first_name:      names.first_name || null,
          last_name:       names.last_name,
          phone:           lead.phone,
          email:           lead.email,
          city:            lead.city,
          custom_fields: {
            full_name:       lead.name,
            phone_number:    phoneLocalDigits,
            dial_code:       lead.dialCode,
            city:            lead.city,
            source:          lead.source,
            match_id:        lead.matchId,
            match_label:     lead.matchLabel,
            prediction:      lead.prediction,
            prediction_text: pickLabel(match, choice),
            submitted_at:    lead.submittedAt,
          },
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[wc2026] CRM submit failed", res.status, body);
      }
    } catch (err) {
      console.error("[wc2026] CRM submit error", err);
    } finally {
      savePrediction(match.id, choice, lead.matchLabel);
      if (typeof window !== "undefined") window.sessionStorage.removeItem("wc26-pending-pick");
      setSubmitting(false);
      setSubmitted(true);
      onSubmitted();
    }
  };

  const team = choice === "team_a" ? match.teamAData : choice === "team_b" ? match.teamBData : null;

  return (
    <div className="wc-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Prediction form">
      <div className="wc-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="wc-modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="wc-modal-success">
            <div className="wc-modal-success-mark">
              <CheckIcon size={26} strokeWidth={2.6} />
            </div>
            <h3 className="wc-modal-success-title">Locked In</h3>
            <p className="wc-modal-success-text">
              Your prediction is recorded and your free counselling slot is reserved. The Admizz team will reach out shortly.
            </p>
            <button type="button" className="wc-btn-primary" onClick={onClose}>
              Continue exploring
            </button>
          </div>
        ) : (
          <>
            <div className="wc-modal-header">
              <span className="wc-modal-eyebrow">Your prediction</span>
              <div className="wc-modal-pick">
                {team && (
                  <div className="wc-modal-pick-flag">
                    <Flag src={team.flag} fitParent />
                  </div>
                )}
                {!team && <div className="wc-modal-pick-flag wc-modal-pick-flag--draw">=</div>}
                <div>
                  <div className="wc-modal-pick-label">{pickLabel(match, choice)}</div>
                  <div className="wc-modal-pick-match">
                    {match.teamAData.name} <span style={{ color: "var(--wc-text-faint)" }}>vs</span> {match.teamBData.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="wc-modal-body">
              <p className="wc-modal-intro">
                Drop your details to lock in your prediction. Every entry includes a free Admizz counselling session — no purchase, no obligation.
              </p>
              <form className="wc-modal-form" onSubmit={handleSubmit}>
                <div className="wc-form-row">
                  <div className="wc-field">
                    <label className="wc-field-label" htmlFor="wc-pf-name">
                      Full name<span className="wc-field-required">*</span>
                    </label>
                    <input id="wc-pf-name" className="wc-input" type="text" name="name" placeholder="Your name" required autoFocus />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label" htmlFor="wc-pf-email">
                      Email address<span className="wc-field-required">*</span>
                    </label>
                    <input id="wc-pf-email" className="wc-input" type="email" name="email" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="wc-form-row">
                  <div className="wc-field">
                    <label className="wc-field-label">
                      Phone number<span className="wc-field-required">*</span>
                    </label>
                    <div ref={dialRootRef} className={`wc-phone${dialOpen ? " wc-phone--open" : ""}`}>
                      <button
                        type="button"
                        className="wc-phone-dial"
                        onClick={() => setDialOpen(o => !o)}
                        aria-label="Choose country dial code"
                        aria-expanded={dialOpen}
                      >
                        <span className="wc-phone-dial-label">{spec.label}</span>
                        <svg
                          className="wc-phone-dial-chev"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <input
                        className="wc-phone-input"
                        type="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={e => setPhone(phoneDigits(e.target.value).slice(0, 15))}
                        placeholder="Phone number"
                        maxLength={15}
                        required
                      />
                      {dialOpen && (
                        <div className="wc-phone-pop" role="listbox">
                          <div className="wc-phone-pop-search">
                            <input
                              ref={dialSearchRef}
                              type="text"
                              value={dialSearch}
                              onChange={e => setDialSearch(e.target.value)}
                              placeholder="Search country or dial code…"
                              className="wc-input wc-input--search"
                            />
                          </div>
                          <ul className="wc-phone-pop-list">
                            {filteredDialCodes.length === 0 ? (
                              <li className="wc-phone-pop-empty">No matches</li>
                            ) : (
                              filteredDialCodes.map(d => {
                                const active = d.key === dialKey;
                                return (
                                  <li
                                    key={d.key}
                                    role="option"
                                    aria-selected={active}
                                    className={`wc-phone-pop-item${active ? " is-active" : ""}`}
                                    onClick={() => {
                                      setDialKey(d.key);
                                      setDialOpen(false);
                                    }}
                                  >
                                    <span className="wc-phone-pop-item-left">
                                      <span className="wc-phone-pop-item-flag">{d.label.split(" ")[0]}</span>
                                      <span className="wc-phone-pop-item-country">{d.country}</span>
                                    </span>
                                    <span className="wc-phone-pop-item-dial">{d.dial}</span>
                                  </li>
                                );
                              })
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label" htmlFor="wc-pf-city">
                      Which city are you in?<span className="wc-field-required">*</span>
                    </label>
                    <input id="wc-pf-city" className="wc-input" type="text" name="city" placeholder="e.g. Kathmandu, London, Lagos" required />
                  </div>
                </div>
                <button type="submit" className="wc-submit" disabled={submitting}>
                  {submitting ? "Locking in…" : "Lock in my prediction"}
                </button>
                <p className="wc-form-note">
                  By submitting, you agree to be contacted by Admizz Education about your study-abroad plans.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

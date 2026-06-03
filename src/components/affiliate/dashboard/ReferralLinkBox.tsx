"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import type { Affiliate } from "@/lib/affiliate/types";
import { LINK_DESTINATIONS, DEFAULT_DESTINATION, type LinkDestination } from "@/lib/affiliate/linkDestinations";
import { CHANNEL_PRESETS, type ChannelPreset } from "@/lib/affiliate/channelPresets";

interface Props {
  affiliate: Affiliate;
}

const BASE_URL = "https://admizzeducation.com";
const HISTORY_KEY_PREFIX = "admizz_affiliate_links:";
const HISTORY_MAX = 10;

type Tab = "link" | "qr";

interface SavedLink {
  url:         string;
  destination: string;   // path
  channel:     string;   // channel id or "" for none
  at:          string;   // ISO timestamp
}

function buildUrl(dest: LinkDestination, code: string, channel: ChannelPreset | null): string {
  const params = new URLSearchParams();
  params.set("ref", code);
  if (channel) {
    params.set("utm_source", channel.source);
    params.set("utm_medium", channel.medium);
  }
  return `${BASE_URL}${dest.path}?${params.toString()}`;
}

function loadHistory(code: string): SavedLink[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY_PREFIX + code);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, HISTORY_MAX) : [];
  } catch { return []; }
}

function saveToHistory(code: string, entry: SavedLink) {
  if (typeof window === "undefined") return;
  try {
    const current = loadHistory(code);
    // De-dupe — if the same URL is already top of history, don't push
    if (current[0]?.url === entry.url) return;
    const next = [entry, ...current.filter(e => e.url !== entry.url)].slice(0, HISTORY_MAX);
    localStorage.setItem(HISTORY_KEY_PREFIX + code, JSON.stringify(next));
  } catch { /* ignore */ }
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1)    return "Just now";
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7)    return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function ReferralLinkBox({ affiliate }: Props) {
  const code = affiliate.referral_code;

  const [tab, setTab]                 = useState<Tab>("link");
  const [destPath, setDestPath]       = useState(DEFAULT_DESTINATION.path);
  const [channelId, setChannelId]     = useState<string>("");
  const [copied, setCopied]           = useState<"link" | "code" | null>(null);
  const [history, setHistory]         = useState<SavedLink[]>([]);
  const [qrDataUrl, setQrDataUrl]     = useState<string>("");

  const destination = useMemo(
    () => LINK_DESTINATIONS.find(d => d.path === destPath) ?? DEFAULT_DESTINATION,
    [destPath],
  );
  const channel = useMemo(
    () => CHANNEL_PRESETS.find(c => c.id === channelId) ?? null,
    [channelId],
  );
  const url = useMemo(
    () => buildUrl(destination, code, channel),
    [destination, code, channel],
  );

  // Load history once on mount, per affiliate code
  useEffect(() => {
    setHistory(loadHistory(code));
  }, [code]);

  // Generate QR whenever URL changes and QR tab is shown (small, cheap)
  useEffect(() => {
    if (tab !== "qr") return;
    let cancelled = false;
    QRCode.toDataURL(url, { width: 320, margin: 1, color: { dark: "#001353", light: "#FFFFFF" } })
      .then(dataUrl => { if (!cancelled) setQrDataUrl(dataUrl); })
      .catch(() => { if (!cancelled) setQrDataUrl(""); });
    return () => { cancelled = true; };
  }, [url, tab]);

  const persistUse = () => {
    const entry: SavedLink = { url, destination: destPath, channel: channelId, at: new Date().toISOString() };
    saveToHistory(code, entry);
    setHistory(loadHistory(code));
  };

  const copy = (what: "link" | "code") => {
    const text = what === "link" ? url : code;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(what);
    if (what === "link") persistUse();
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `admizz-${code}-${destination.path.replace(/\//g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    persistUse();
  };

  const shareWhatsApp = () => {
    const msg = `Hi! If you're planning to study abroad, I highly recommend Admizz Education. They've helped 1,500+ students get into top universities worldwide.\n\nGet a free consultation through my link: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    persistUse();
  };

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAECF0",
        boxShadow: "0 1px 3px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
      }}
    >
      {/* Header */}
      <div>
        <p className="text-[12px] font-bold uppercase mb-1.5" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
          Your Referral Link
        </p>
        <p className="text-[13px] leading-[1.55]" style={{ color: "#475569" }}>
          Pick a destination, optionally tag the channel — every click is tracked, every conversion credits you.
        </p>
      </div>

      {/* Tabs */}
      <div className="inline-flex p-1 rounded-xl self-start" style={{ background: "#F1F5F9" }}>
        {[{ k: "link" as Tab, label: "Short link" }, { k: "qr" as Tab, label: "QR code" }].map(t => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className="px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all"
              style={{
                background: active ? "#FFFFFF" : "transparent",
                color: active ? "#001353" : "#64748B",
                boxShadow: active ? "0 1px 2px rgba(16,24,40,0.06)" : "none",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Destination select */}
      <div>
        <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.06em" }}>
          Destination page
        </label>
        <select
          value={destPath}
          onChange={e => setDestPath(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={{ background: "#FFFFFF", border: "1px solid #EAECF0", color: "#001353" }}
        >
          {LINK_DESTINATIONS.map(d => (
            <option key={d.path} value={d.path}>
              {d.badge ? `[${d.badge}] ` : ""}{d.label}
            </option>
          ))}
        </select>
        <p className="text-[11.5px] mt-1.5" style={{ color: "#94A3B8" }}>{destination.hint}</p>
      </div>

      {/* Channel preset chips */}
      <div>
        <label className="text-[12px] font-bold uppercase mb-1.5 block" style={{ color: "#64748B", letterSpacing: "0.06em" }}>
          Where will you share it? <span style={{ color: "#94A3B8", letterSpacing: 0 }}>(optional — helps you see what's working)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          <ChannelChip active={channelId === ""} onClick={() => setChannelId("")} emoji="—" label="None" />
          {CHANNEL_PRESETS.map(c => (
            <ChannelChip
              key={c.id}
              active={channelId === c.id}
              onClick={() => setChannelId(c.id)}
              emoji={c.emoji}
              label={c.label}
            />
          ))}
        </div>
      </div>

      {/* Generated URL OR QR */}
      {tab === "link" ? (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "#FAFAFB", border: "1px solid #EAECF0" }}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "#64748B" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="flex-1 text-[12.5px] font-mono truncate" style={{ color: "#001353" }}>{url}</span>
          <button
            onClick={() => copy("link")}
            className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: copied === "link" ? "rgba(34,197,94,0.12)" : "#FFFFFF",
              color:      copied === "link" ? "#16a34a" : "#b07400",
              border:     copied === "link" ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(252,183,48,0.32)",
            }}
          >
            {copied === "link" ? "Copied" : "Copy"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-4 px-4 rounded-xl" style={{ background: "#FAFAFB", border: "1px solid #EAECF0" }}>
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrDataUrl} alt={`QR code for ${url}`} className="w-48 h-48 rounded-lg" style={{ border: "1px solid #EAECF0" }} />
          ) : (
            <div className="w-48 h-48 rounded-lg flex items-center justify-center text-[12px]" style={{ background: "#FFFFFF", border: "1px solid #EAECF0", color: "#94A3B8" }}>
              Generating…
            </div>
          )}
          <p className="text-[11.5px] text-center" style={{ color: "#64748B" }}>
            Print on posters, business cards, or event banners.<br />
            Every scan tracks back to you.
          </p>
          <button
            onClick={downloadQr}
            disabled={!qrDataUrl}
            className="text-xs font-bold px-4 py-2 rounded-lg transition-all"
            style={{
              background: "#001353",
              color: "#FFFFFF",
              opacity: qrDataUrl ? 1 : 0.5,
              boxShadow: "0 2px 8px rgba(0,19,83,0.25)",
            }}
          >
            Download QR (PNG)
          </button>
        </div>
      )}

      {/* WhatsApp share */}
      <button
        onClick={shareWhatsApp}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200"
        style={{
          background: "#25D366",
          color: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(37,211,102,0.25)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#22c35e"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#25D366"; }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Share on WhatsApp
      </button>

      {/* Referral code (always visible — share-anywhere fallback) */}
      <div>
        <p className="text-[12px] font-bold uppercase mb-1.5" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
          Or share your code · works without a link
        </p>
        <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "rgba(252,183,48,0.06)", border: "1px solid rgba(252,183,48,0.32)" }}>
          <span className="font-mono text-base font-extrabold tracking-widest" style={{ color: "#b07400" }}>{code}</span>
          <button
            onClick={() => copy("code")}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: copied === "code" ? "rgba(34,197,94,0.12)" : "#FFFFFF",
              color:      copied === "code" ? "#16a34a" : "#b07400",
              border:     copied === "code" ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(252,183,48,0.32)",
            }}
          >
            {copied === "code" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <p className="text-[12px] font-bold uppercase mb-2" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
            Recent links <span style={{ color: "#94A3B8", letterSpacing: 0 }}>(saved on this device)</span>
          </p>
          <ul className="space-y-1.5">
            {history.map(h => {
              const d = LINK_DESTINATIONS.find(x => x.path === h.destination);
              const c = CHANNEL_PRESETS.find(x => x.id === h.channel);
              return (
                <li
                  key={h.url + h.at}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-[12.5px]"
                  style={{ background: "#FAFAFB", border: "1px solid #EAECF0" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate" style={{ color: "#001353" }}>
                      {d?.label ?? h.destination}
                      {c && <span style={{ color: "#94A3B8" }}> · {c.emoji} {c.label}</span>}
                    </div>
                    <div className="text-[11px]" style={{ color: "#94A3B8" }}>{formatRelative(h.at)} · <span className="font-mono">{h.url}</span></div>
                  </div>
                  <button
                    onClick={() => { navigator.clipboard.writeText(h.url).catch(() => {}); }}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-md flex-shrink-0"
                    style={{ background: "#FFFFFF", color: "#b07400", border: "1px solid rgba(252,183,48,0.32)" }}
                  >
                    Copy
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChannelChip({ active, onClick, emoji, label }: { active: boolean; onClick: () => void; emoji: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all"
      style={{
        background: active ? "#001353" : "#FFFFFF",
        color:      active ? "#FFFFFF" : "#475569",
        border: active ? "1px solid #001353" : "1px solid #EAECF0",
      }}
    >
      <span style={{ fontSize: 13 }}>{emoji}</span>
      {label}
    </button>
  );
}

"use client";

import { useMemo } from "react";
import type { Affiliate, AffiliateReferral, AffiliateClick } from "@/lib/affiliate/types";
import { buildCountryBreakdown, buildActivityFeed } from "@/lib/affiliate/api";
import FunnelCard from "../dashboard/FunnelCard";
import CountryBreakdownCard from "../dashboard/CountryBreakdownCard";
import ActivityTimelineCard from "../dashboard/ActivityTimelineCard";
import StatsRow from "../dashboard/StatsRow";
import TierProgressCard from "../dashboard/TierProgressCard";
import PerformanceChart from "../dashboard/PerformanceChart";
import ReferralsTab from "./ReferralsTab";

interface Props {
  affiliate: Affiliate;
  referrals: AffiliateReferral[];
  clicks: AffiliateClick[];
  onRefresh: () => Promise<void>;
}

export default function AffiliateDetail({ affiliate, referrals, clicks, onRefresh }: Props) {
  const breakdown  = useMemo(() => buildCountryBreakdown(referrals), [referrals]);
  const activity   = useMemo(() => buildActivityFeed(clicks, referrals, 30), [clicks, referrals]);
  const converted  = referrals.filter(r => r.status === "converted" || r.status === "paid").length;
  const refLink    = `https://admizzeducation.com/register?ref=${affiliate.referral_code}`;
  const joined     = new Date(affiliate.joined_at ?? affiliate.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-4">
      {/* Header chip */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md" style={{ background: "#E0E7FF", color: "#3730A3", letterSpacing: "0.06em" }}>
          Affiliate detail · admin view
        </span>
        <span className="text-[12px]" style={{ color: "#64748B" }}>
          Joined {joined}
        </span>
      </div>

      {/* Profile card — full PII for admin */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #EAECF0", boxShadow: "0 1px 3px rgba(16,24,40,0.04)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 mb-4">
          <Field label="Full name"        value={affiliate.full_name} />
          <Field label="Email"            value={affiliate.email} mono />
          <Field label="Phone"            value={affiliate.phone ?? "—"} mono />
          <Field label="City"             value={affiliate.city ?? "—"} />
          <Field label="Referral code"    value={affiliate.referral_code} mono />
          <Field label="Tier"             value={affiliate.tier} />
          <Field label="Status"           value={affiliate.status} />
          <Field label="Application id"   value={affiliate.application_id ?? "—"} mono small />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
          <span className="text-[11px] font-bold uppercase" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>Personal link</span>
          <code className="text-[12px] px-2 py-1 rounded-md font-mono" style={{ background: "#FAFAFB", color: "#001353", border: "1px solid #EAECF0" }}>{refLink}</code>
          <button
            onClick={() => { navigator.clipboard.writeText(refLink).catch(() => {}); }}
            className="text-[11px] font-bold px-2.5 py-1 rounded-md"
            style={{ background: "#FFFFFF", color: "#b07400", border: "1px solid rgba(252,183,48,0.32)" }}
          >
            Copy link
          </button>
          <a
            href={`mailto:${affiliate.email}`}
            className="text-[11px] font-bold px-2.5 py-1 rounded-md"
            style={{ background: "#001353", color: "#FFFFFF" }}
          >
            Email
          </a>
          {affiliate.phone && (
            <a
              href={`https://wa.me/${affiliate.phone.replace(/[^0-9]/g, "")}`}
              target="_blank" rel="noopener noreferrer"
              className="text-[11px] font-bold px-2.5 py-1 rounded-md"
              style={{ background: "#25D366", color: "#FFFFFF" }}
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>

      {/* Stats parity with the affiliate's own dashboard */}
      <StatsRow affiliate={affiliate} rank={0} clicks={clicks.length} />

      {/* Funnel */}
      <FunnelCard clicks={clicks.length} registrations={referrals.length} conversions={converted} />

      {/* Tier progress + performance chart side by side */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        <TierProgressCard affiliate={affiliate} />
        <PerformanceChart referrals={referrals} />
      </div>

      {/* Country + activity timeline */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
        <CountryBreakdownCard breakdown={breakdown} />
        <ActivityTimelineCard events={activity} />
      </div>

      {/* Full referrals table with per-row lead drill-in */}
      <div>
        <p className="text-[12px] font-bold uppercase mb-2" style={{ color: "#64748B", letterSpacing: "0.08em" }}>
          Referrals — click any row to see the full lead
        </p>
        <ReferralsTab referrals={referrals} affiliates={[affiliate]} onRefresh={onRefresh} />
      </div>
    </div>
  );
}

function Field({ label, value, mono = false, small = false }: { label: string; value: string; mono?: boolean; small?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase mb-0.5" style={{ color: "#94A3B8", letterSpacing: "0.06em" }}>{label}</div>
      <div
        className="font-semibold break-words"
        style={{
          color: "#001353",
          fontSize: small ? 11 : 13,
          fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined,
        }}
      >
        {value}
      </div>
    </div>
  );
}

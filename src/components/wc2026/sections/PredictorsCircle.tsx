"use client";

import { useEffect, useMemo, useState } from "react";
import { getMockMatchWinners, type MatchOutcome, type MatchStage, type MatchWinner } from "@/lib/wc2026/winners/mockData";
import { buildMatchWinners, fetchCrmLeaderboard } from "@/lib/wc2026/winners/fromCrm";
import { ArrowRightIcon } from "../shared/Icons";
import Countdown from "../shared/Countdown";
import { useLive } from "@/lib/wc2026/LiveProvider";

const TOTAL_MATCHES = 104;
const STADIUM_BG = "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&w=1800&q=70";

const STAGE_LABELS: Record<MatchStage, string> = {
  group: "Group Stage",
  r32: "Round of 32",
  r16: "Round of 16",
  qf: "Quarterfinal",
  sf: "Semifinal",
  final: "Final",
};

const FILTERS: { key: MatchStage | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "group", label: "Group" },
  { key: "r32", label: "R32" },
  { key: "r16", label: "R16" },
  { key: "qf", label: "QF" },
  { key: "sf", label: "SF" },
  { key: "final", label: "Final" },
];

function initials(name: string): string {
  return name
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Deterministic avatar tint based on name hash — small palette of brand-aligned hues.
const AVATAR_TINTS = [
  { bg: "#001353", fg: "#FFCC00" },
  { bg: "#31429C", fg: "#FFFFFF" },
  { bg: "#C8102E", fg: "#FFFFFF" },
  { bg: "#0A3161", fg: "#FFCC00" },
  { bg: "#006847", fg: "#FFFFFF" },
  { bg: "#FCB723", fg: "#001353" },
  { bg: "#5B2A86", fg: "#FFFFFF" },
  { bg: "#1F8FA3", fg: "#FFFFFF" },
];

function tintFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_TINTS[h % AVATAR_TINTS.length];
}

function Avatar({ name, size = 44, ring = false }: { name: string; size?: number; ring?: boolean }) {
  const tint = tintFor(name);
  return (
    <div
      className={`wc-pc-avatar${ring ? " wc-pc-avatar--ring" : ""}`}
      style={{
        width: size,
        height: size,
        background: tint.bg,
        color: tint.fg,
        fontSize: Math.round(size * 0.36),
      }}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}

function pickedTeamData(w: MatchWinner): { code: string; name: string; flag: string } | null {
  if (!w.winner) return null;
  if (w.winner.picked === "team_a") return w.team_a;
  if (w.winner.picked === "team_b") return w.team_b;
  return null;
}

function pickedLabel(w: MatchWinner): string {
  if (!w.winner) return "—";
  if (w.winner.picked === "draw") return "Draw";
  const team = w.winner.picked === "team_a" ? w.team_a : w.team_b;
  return team.name;
}

function ScoreCell({ w }: { w: MatchWinner }) {
  if (!w.score) return <span className="wc-pc-score wc-pc-score--pending">vs</span>;
  return <span className="wc-pc-score">{w.score}</span>;
}

export default function PredictorsCircle() {
  const [filter, setFilter] = useState<MatchStage | "all">("all");
  const live = useLive();
  const [crmWinners, setCrmWinners] = useState<MatchWinner[] | null>(null);

  // Fetch CRM winners and refresh every 60s. Falls back to mock data if
  // the join produces zero matches (e.g. ESPN hasn't loaded yet on first
  // render) so the section never goes blank.
  useEffect(() => {
    let active = true;
    const load = async () => {
      const crm = await fetchCrmLeaderboard();
      if (!active || !crm) return;
      const joined = buildMatchWinners(crm, live.matches);
      if (joined.length > 0) setCrmWinners(joined);
    };
    load();
    const id = setInterval(load, 60_000);
    return () => { active = false; clearInterval(id); };
  }, [live.matches]);

  const winners = crmWinners ?? getMockMatchWinners();

  // Most recent winner (with a winner assigned) = the spotlight
  const sortedByDate = useMemo(
    () => [...winners].sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime()),
    [winners],
  );
  const spotlight = sortedByDate.find((w) => w.winner) ?? null;

  // Winner streak counts — how many wins each predictor has
  const winsByName = useMemo(() => {
    const m = new Map<string, number>();
    for (const w of winners) {
      if (w.winner) m.set(w.winner.name, (m.get(w.winner.name) ?? 0) + 1);
    }
    return m;
  }, [winners]);

  const spotlightWins = spotlight?.winner ? winsByName.get(spotlight.winner.name) ?? 1 : 0;

  const filtered = useMemo(() => {
    const list = sortedByDate;
    if (filter === "all") return list;
    return list.filter((w) => w.stage === filter);
  }, [sortedByDate, filter]);

  const totalWinners = winners.filter((w) => w.winner).length;
  const pendingCount = winners.filter((w) => w.status === "final" && !w.winner).length;

  const scrollToPredict = () => {
    document.getElementById("motd")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="wc-section wc-pc-section" id="predictors-circle">
      <div className="wc-section-inner">

        {/* Header */}
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow wc-section-eyebrow--gold">Predict &amp; Win Winners</span>
            <h2 className="wc-section-title">
              The Predictors&apos; <span className="wc-section-title-accent wc-section-title-accent--gold">Circle</span>
            </h2>
            <p className="wc-section-lede">
              Every match. One winning predictor. Real Nepalis calling the World Cup right — match by match.
            </p>
          </div>
          <div className="wc-pc-pulse">
            <div className="wc-pc-pulse-row">
              <span className="wc-pc-pulse-dot" />
              <div className="wc-pc-pulse-meta">
                <strong>{totalWinners}</strong> crowned
                {pendingCount > 0 && <> · <em>{pendingCount} pending</em></>}
              </div>
              <span className="wc-pc-pulse-total">/ {TOTAL_MATCHES}</span>
            </div>
            <div className="wc-pc-progress" aria-label={`${totalWinners} of ${TOTAL_MATCHES} matches called`}>
              <div
                className="wc-pc-progress-bar"
                style={{ width: `${Math.min(100, (totalWinners / TOTAL_MATCHES) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Layer 1 — Spotlight ── */}
        {spotlight && (
          <div className="wc-pc-spotlight">
            <div
              className="wc-pc-spotlight-stadium"
              style={{ backgroundImage: `url(${STADIUM_BG})` }}
              aria-hidden
            />
            <div className="wc-pc-spotlight-eyebrow">
              <span className="wc-pc-spark" aria-hidden /> Latest call
            </div>
            <div className="wc-pc-spotlight-grid">
              {/* Match card (left) */}
              <div className="wc-pc-spotlight-match">
                <div className="wc-pc-spotlight-stage">{STAGE_LABELS[spotlight.stage]}</div>
                <div className="wc-pc-spotlight-teams">
                  <div className="wc-pc-spotlight-team">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={spotlight.team_a.flag} alt="" className="wc-pc-flag wc-pc-flag--big" />
                    <span className="wc-pc-spotlight-team-code">{spotlight.team_a.code}</span>
                  </div>
                  <div className="wc-pc-spotlight-score-wrap">
                    <ScoreCell w={spotlight} />
                  </div>
                  <div className="wc-pc-spotlight-team">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={spotlight.team_b.flag} alt="" className="wc-pc-flag wc-pc-flag--big" />
                    <span className="wc-pc-spotlight-team-code">{spotlight.team_b.code}</span>
                  </div>
                </div>
              </div>

              {/* Winner card (right) */}
              <div className="wc-pc-spotlight-winner">
                <Avatar name={spotlight.winner!.name} size={72} ring />
                <div className="wc-pc-spotlight-winner-meta">
                  <div className="wc-pc-spotlight-winner-nameline">
                    <span className="wc-pc-spotlight-winner-name">{spotlight.winner!.name}</span>
                    {spotlightWins >= 2 && (
                      <span className="wc-pc-streak" title={`${spotlightWins} wins this tournament`}>
                        <span className="wc-pc-streak-flame" aria-hidden>🔥</span>
                        {spotlightWins}× winner
                      </span>
                    )}
                  </div>
                  <div className="wc-pc-spotlight-winner-pick">
                    Picked <strong>{pickedLabel(spotlight)}</strong>
                    {pickedTeamData(spotlight) && (
                      <>
                        {" "}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pickedTeamData(spotlight)!.flag} alt="" className="wc-pc-flag wc-pc-flag--inline" />
                      </>
                    )}
                  </div>
                  <div className="wc-pc-spotlight-winner-check">
                    <span className="wc-pc-check">✓</span> Called it before kickoff
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Layer 2 — Archive ── */}
        <div className="wc-pc-archive">
          <div className="wc-pc-filters" role="tablist" aria-label="Filter winners by tournament stage">
            {FILTERS.map((f) => {
              const count = f.key === "all" ? winners.length : winners.filter((w) => w.stage === f.key).length;
              if (f.key !== "all" && count === 0) return null;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.key}
                  className={`wc-pc-filter${filter === f.key ? " wc-pc-filter--active" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  <span className="wc-pc-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="wc-pc-grid">
            {filtered.map((w) => {
              const team = pickedTeamData(w);
              const isDrawPick = w.winner?.picked === "draw";
              return (
                <div key={w.match_id} className={`wc-pc-tile${!w.winner ? " wc-pc-tile--pending" : ""}`}>
                  <div className="wc-pc-tile-head">
                    <span className="wc-pc-tile-stage">{STAGE_LABELS[w.stage]}</span>
                    {w.winner && <span className="wc-pc-tile-check" aria-label="winner">✓</span>}
                  </div>
                  <div className="wc-pc-tile-match">
                    <div className="wc-pc-tile-team">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.team_a.flag} alt="" className="wc-pc-flag" />
                      <span>{w.team_a.code}</span>
                    </div>
                    <ScoreCell w={w} />
                    <div className="wc-pc-tile-team wc-pc-tile-team--right">
                      <span>{w.team_b.code}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.team_b.flag} alt="" className="wc-pc-flag" />
                    </div>
                  </div>
                  {w.winner ? (
                    <div className="wc-pc-tile-winner">
                      <Avatar name={w.winner.name} size={32} />
                      <div className="wc-pc-tile-winner-meta">
                        <div className="wc-pc-tile-winner-nameline">
                          <span className="wc-pc-tile-winner-name">{w.winner.name}</span>
                          {(winsByName.get(w.winner.name) ?? 0) >= 2 && (
                            <span className="wc-pc-tile-streak" title="Repeat winner">
                              ×{winsByName.get(w.winner.name)}
                            </span>
                          )}
                        </div>
                        <div className="wc-pc-tile-winner-pick">
                          {isDrawPick ? (
                            <>Picked <strong>Draw</strong></>
                          ) : (
                            <>
                              Picked <strong>{team?.code}</strong>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="wc-pc-tile-winner wc-pc-tile-winner--pending">
                      <div className="wc-pc-tile-pending-dot" />
                      <span>Winner being verified</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="wc-pc-empty">No winners yet in this stage. Predict the upcoming matches to be the first.</div>
          )}

          <div className="wc-pc-eligibility">
            All above winners are eligible for our grand prizes
          </div>
        </div>

        {/* ── Layer 3 — CTA with next-match countdown ── */}
        <div className="wc-pc-cta">
          <div className="wc-pc-cta-text">
            <div className="wc-pc-cta-eyebrow">Next up</div>
            {live.nextMatch ? (
              <>
                <div className="wc-pc-cta-fixture">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={live.nextMatch.teamAData.flag} alt="" className="wc-pc-flag" />
                  <span className="wc-pc-cta-team">{live.nextMatch.teamAData.shortName ?? live.nextMatch.teamAData.name}</span>
                  <span className="wc-pc-cta-vs">vs</span>
                  <span className="wc-pc-cta-team">{live.nextMatch.teamBData.shortName ?? live.nextMatch.teamBData.name}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={live.nextMatch.teamBData.flag} alt="" className="wc-pc-flag" />
                </div>
                <div className="wc-pc-cta-line">
                  Kickoff in <Countdown targetISO={live.nextMatch.kickoffISO} format="short" /> — your name could be next.
                </div>
              </>
            ) : (
              <div className="wc-pc-cta-line">Your name could be on this wall after the next match.</div>
            )}
          </div>
          <button type="button" className="wc-btn-primary" onClick={scrollToPredict}>
            Make Your Pick
            <ArrowRightIcon size={16} strokeWidth={2.2} />
          </button>
        </div>

      </div>
    </section>
  );
}

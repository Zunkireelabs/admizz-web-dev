"use client";

import type { MatchWithTeams } from "@/lib/wc2026/types";
import { formatKickoff } from "@/lib/wc2026/format";
import { useTimezone } from "@/lib/wc2026/TimezoneProvider";
import Countdown from "./Countdown";
import Flag from "./Flag";
import { PinIcon } from "./Icons";

const STADIUM_BG =
  "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=2000&q=80";

interface MatchScoreboardProps {
  match: MatchWithTeams;
  compact?: boolean;
}

function StatusPill({ match }: { match: MatchWithTeams }) {
  const status = match.score?.status ?? "UPCOMING";
  if (status === "LIVE")
    return (
      <span className="wc-motd-status wc-motd-status--live">
        <span className="wc-pulse-dot" /> Live
      </span>
    );
  if (status === "HT") return <span className="wc-motd-status wc-motd-status--live">Half Time</span>;
  if (status === "FT") return <span className="wc-motd-status wc-motd-status--ft">Full Time</span>;
  return <span className="wc-motd-status wc-motd-status--upcoming">Upcoming</span>;
}

function FormPills({ form }: { form?: ("W" | "D" | "L")[] }) {
  if (!form || form.length === 0) return null;
  return (
    <div className="wc-motd-form" aria-label="Recent form">
      {form.slice(0, 5).map((f, i) => (
        <span key={i} className={`wc-motd-form-pill wc-motd-form-pill--${f}`}>{f}</span>
      ))}
    </div>
  );
}

export default function MatchScoreboard({ match, compact = false }: MatchScoreboardProps) {
  const status = match.score?.status ?? "UPCOMING";
  const isLive = status === "LIVE" || status === "HT";
  const isFt = status === "FT";
  const { tz } = useTimezone();
  const { date, time } = formatKickoff(match.kickoffISO, tz);

  return (
    <div className={`wc-motd ${compact ? "wc-motd--compact" : ""}`}>
      <div className="wc-motd-bg" style={{ backgroundImage: `url(${STADIUM_BG})` }} aria-hidden="true" />
      <div className="wc-motd-scrim" aria-hidden="true" />

      <div className="wc-motd-content">
        <div className="wc-motd-top">
          <div className="wc-motd-meta">
            <span>{match.round}</span>
            {match.group !== "—" && match.round === "Group Stage" && (
              <>
                <span className="wc-motd-meta-divider" />
                <span>Group {match.group}</span>
              </>
            )}
            <span className="wc-motd-meta-divider" />
            <span>Match {match.matchNumber}</span>
          </div>
          <StatusPill match={match} />
        </div>

        <div className="wc-motd-stage">
          <div className="wc-motd-team wc-motd-team--home">
            <div className="wc-motd-flag">
              <Flag src={match.teamAData.flag} fitParent />
            </div>
            <div>
              <div className="wc-motd-team-name">{match.teamAData.name}</div>
              {match.teamAData.fifaRank && (
                <div className="wc-motd-rank">FIFA #{match.teamAData.fifaRank}</div>
              )}
            </div>
            <FormPills form={match.teamAData.form} />
          </div>

          <div className="wc-motd-center">
            {isLive || isFt ? (
              <div className="wc-motd-score">
                <span className="wc-motd-score-digit">{match.score?.a ?? 0}</span>
                <span className="wc-motd-score-divider" />
                <span className="wc-motd-score-digit">{match.score?.b ?? 0}</span>
              </div>
            ) : (
              <span className="wc-motd-vs">VS</span>
            )}
            {isLive && match.score && (
              <div className="wc-motd-clock wc-motd-clock-live">
                {status === "HT" ? "HALF TIME" : `${match.score.minute ?? 0}'`}
              </div>
            )}
            {!isLive && !isFt && (
              <div className="wc-motd-clock">
                Kickoff in <Countdown targetISO={match.kickoffISO} format="long" />
              </div>
            )}
          </div>

          <div className="wc-motd-team wc-motd-team--away">
            <div className="wc-motd-flag">
              <Flag src={match.teamBData.flag} fitParent />
            </div>
            <div>
              <div className="wc-motd-team-name">{match.teamBData.name}</div>
              {match.teamBData.fifaRank && (
                <div className="wc-motd-rank">FIFA #{match.teamBData.fifaRank}</div>
              )}
            </div>
            <FormPills form={match.teamBData.form} />
          </div>
        </div>

        <div className="wc-motd-venue-line">
          <PinIcon size={14} />
          <strong>{match.stadium}</strong>
          {match.city && <span>· {match.city}</span>}
          <span className="wc-motd-meta-divider" />
          <span>{date} · {time}</span>
        </div>
      </div>
    </div>
  );
}

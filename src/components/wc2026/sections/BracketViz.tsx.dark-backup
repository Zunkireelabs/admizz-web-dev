"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import { buildBracket } from "@/lib/wc2026/bracket";
import { formatKickoff } from "@/lib/wc2026/format";
import { useTimezone } from "@/lib/wc2026/TimezoneProvider";
import type { BracketSlot } from "@/lib/wc2026/types";
import Flag from "../shared/Flag";
import { TrophyIcon } from "../shared/Icons";

const ROUND_LABELS: Record<BracketSlot["round"], string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-finals",
  SF: "Semi-finals",
  "3RD": "Third Place",
  F: "Final",
};

const ROUND_META: Record<BracketSlot["round"], { count: number; window: string }> = {
  R32: { count: 16, window: "Jun 28 – Jul 3" },
  R16: { count: 8, window: "Jul 4 – Jul 7" },
  QF: { count: 4, window: "Jul 9 – Jul 11" },
  SF: { count: 2, window: "Jul 14 – Jul 15" },
  "3RD": { count: 1, window: "Jul 18" },
  F: { count: 1, window: "Jul 19" },
};

const ROUND_DATES: Record<BracketSlot["round"], { start: string; end: string }> = {
  R32: { start: "2026-06-28", end: "2026-07-03" },
  R16: { start: "2026-07-04", end: "2026-07-07" },
  QF:  { start: "2026-07-09", end: "2026-07-11" },
  SF:  { start: "2026-07-14", end: "2026-07-15" },
  "3RD": { start: "2026-07-18", end: "2026-07-18" },
  F:   { start: "2026-07-19", end: "2026-07-19" },
};

const ORDER: BracketSlot["round"][] = ["R32", "R16", "QF", "SF", "F"];

function isoDay(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

function getActiveRound(nowMs: number): BracketSlot["round"] | null {
  const today = isoDay(nowMs);
  for (const r of ORDER) {
    const meta = ROUND_DATES[r];
    if (today >= meta.start && today <= meta.end) return r;
  }
  return null;
}

function getNextRound(nowMs: number): BracketSlot["round"] | null {
  const today = isoDay(nowMs);
  for (const r of ORDER) {
    if (today < ROUND_DATES[r].start) return r;
  }
  return null;
}

function SlotRow({
  team,
  label,
  isWinner,
  isLoser,
  score,
}: {
  team?: BracketSlot["teamA"];
  label?: string;
  isWinner?: boolean;
  isLoser?: boolean;
  score?: number;
}) {
  const className = `wc-br-row ${isWinner ? "wc-br-row--winner" : ""} ${isLoser ? "wc-br-row--loser" : ""}`;
  return (
    <div className={className}>
      <div className="wc-br-row-flag">
        {team ? <Flag src={team.flag} fitParent /> : <span className="wc-br-row-flag-empty" />}
      </div>
      <span className="wc-br-row-name">
        {team ? team.shortName : (label || "TBD")}
      </span>
      <span className="wc-br-row-score">{score !== undefined ? score : ""}</span>
    </div>
  );
}

const Slot = ({
  slot,
  isFinal,
  slotRef,
}: {
  slot: BracketSlot;
  isFinal?: boolean;
  slotRef?: (el: HTMLDivElement | null) => void;
}) => {
  const { tz } = useTimezone();
  const aIsWinner = slot.winner === "a";
  const bIsWinner = slot.winner === "b";
  const isLive = slot.status === "LIVE" || slot.status === "HT";
  const isFt = slot.status === "FT";
  const isTbd = slot.status === "TBD";

  const kickoffLabel = slot.kickoffISO
    ? formatKickoff(slot.kickoffISO, tz).day
    : ROUND_META[slot.round].window;

  return (
    <div
      ref={slotRef}
      className={`wc-br-slot ${isFinal ? "wc-br-slot--final" : ""} ${isLive ? "wc-br-slot--live" : ""} ${isFt ? "wc-br-slot--ft" : ""} ${isTbd ? "wc-br-slot--tbd" : ""}`}
    >
      {isFinal && (
        <div className="wc-br-final-stamp">
          <TrophyIcon size={14} strokeWidth={1.8} />
          <span>FINAL</span>
        </div>
      )}
      <SlotRow
        team={slot.teamA}
        label={slot.teamALabel}
        isWinner={aIsWinner}
        isLoser={bIsWinner}
        score={slot.scoreA}
      />
      <SlotRow
        team={slot.teamB}
        label={slot.teamBLabel}
        isWinner={bIsWinner}
        isLoser={aIsWinner}
        score={slot.scoreB}
      />
      <div className="wc-br-slot-meta">
        {isLive && <span className="wc-br-live-pill"><span className="wc-pulse-dot" /> Live</span>}
        {!isLive && <span>{kickoffLabel}</span>}
      </div>
    </div>
  );
};

function RoundColumn({
  round,
  slots,
  isFinalRound,
  isActive,
  isNext,
  registerSlot,
}: {
  round: BracketSlot["round"];
  slots: BracketSlot[];
  isFinalRound?: boolean;
  isActive?: boolean;
  isNext?: boolean;
  registerSlot?: (round: BracketSlot["round"], idx: number, el: HTMLDivElement | null) => void;
}) {
  const meta = ROUND_META[round];
  const stateClass = isActive ? "wc-br-col--active" : isNext ? "wc-br-col--next" : "";
  return (
    <div className={`wc-br-col wc-br-col--${round.toLowerCase()} ${stateClass}`}>
      <div className="wc-br-col-header">
        <div className="wc-br-col-title">
          {ROUND_LABELS[round]}
          {isActive && (
            <span className="wc-br-col-pill wc-br-col-pill--live">
              <span className="wc-pulse-dot" /> LIVE
            </span>
          )}
          {!isActive && isNext && (
            <span className="wc-br-col-pill wc-br-col-pill--next">NEXT</span>
          )}
        </div>
        <div className="wc-br-col-meta">{meta.count} {meta.count === 1 ? "match" : "matches"} · {meta.window}</div>
      </div>
      <div className="wc-br-col-slots">
        {slots.map((s, i) => (
          <Slot
            key={s.id}
            slot={s}
            isFinal={isFinalRound}
            slotRef={registerSlot ? (el) => registerSlot(round, i, el) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

type SlotMap = Partial<Record<BracketSlot["round"], (HTMLDivElement | null)[]>>;

interface ConnectorPath {
  d: string;
  active: boolean;
}

function buildConnectorPaths(
  grid: HTMLDivElement,
  slots: SlotMap,
  activeRound: BracketSlot["round"] | null,
): ConnectorPath[] {
  const gridRect = grid.getBoundingClientRect();
  const paths: ConnectorPath[] = [];
  // Pair children: 2 slots in round N → 1 slot in round N+1
  const pairs: { from: BracketSlot["round"]; to: BracketSlot["round"] }[] = [
    { from: "R32", to: "R16" },
    { from: "R16", to: "QF" },
    { from: "QF", to: "SF" },
    { from: "SF", to: "F" },
  ];
  const activeIdx = activeRound ? ORDER.indexOf(activeRound) : -1;

  for (let p = 0; p < pairs.length; p++) {
    const { from, to } = pairs[p];
    const fromSlots = slots[from] || [];
    const toSlots = slots[to] || [];
    const isPathActive = activeIdx >= 0 && p >= activeIdx;
    for (let i = 0; i < toSlots.length; i++) {
      const parent = toSlots[i];
      const childA = fromSlots[i * 2];
      const childB = fromSlots[i * 2 + 1];
      if (!parent || !childA || !childB) continue;
      const pRect = parent.getBoundingClientRect();
      const aRect = childA.getBoundingClientRect();
      const bRect = childB.getBoundingClientRect();
      const ax = aRect.right - gridRect.left;
      const ay = aRect.top + aRect.height / 2 - gridRect.top;
      const bx = bRect.right - gridRect.left;
      const by = bRect.top + bRect.height / 2 - gridRect.top;
      const px = pRect.left - gridRect.left;
      const py = pRect.top + pRect.height / 2 - gridRect.top;
      const midX = px - 16;
      paths.push({ d: `M ${ax} ${ay} H ${midX} V ${py} H ${px}`, active: isPathActive });
      paths.push({ d: `M ${bx} ${by} H ${midX} V ${py} H ${px}`, active: isPathActive });
    }
  }
  return paths;
}

export default function BracketViz() {
  const { matches, now } = useLive();
  const bracket = useMemo(() => buildBracket(matches), [matches]);
  const [activeRound, setActiveRound] = useState<BracketSlot["round"] | null>(null);
  const [nextRound, setNextRound] = useState<BracketSlot["round"] | null>(null);
  const [activeTab, setActiveTab] = useState<BracketSlot["round"]>("R32");
  const [isMobile, setIsMobile] = useState(false);
  const [paths, setPaths] = useState<ConnectorPath[]>([]);
  const [gridSize, setGridSize] = useState({ w: 0, h: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<SlotMap>({});

  useEffect(() => {
    const active = getActiveRound(now);
    const next = getNextRound(now);
    setActiveRound(active);
    setNextRound(next);
    if (active) setActiveTab(active);
    else if (next) setActiveTab(next);
  }, [now]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const registerSlot = (round: BracketSlot["round"], idx: number, el: HTMLDivElement | null) => {
    if (!slotsRef.current[round]) slotsRef.current[round] = [];
    (slotsRef.current[round] as (HTMLDivElement | null)[])[idx] = el;
  };

  const recomputePaths = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    setGridSize({ w: rect.width, h: rect.height });
    setPaths(buildConnectorPaths(grid, slotsRef.current, activeRound));
  };

  useLayoutEffect(() => {
    if (isMobile) {
      setPaths([]);
      return;
    }
    recomputePaths();
    const grid = gridRef.current;
    if (!grid) return;
    const ro = new ResizeObserver(() => recomputePaths());
    ro.observe(grid);
    window.addEventListener("resize", recomputePaths);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recomputePaths);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, activeRound, bracket]);

  return (
    <section className="wc-section" id="bracket" ref={sectionRef}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow">Knockout Bracket</span>
            <h2 className="wc-section-title">
              The Road to <span className="wc-section-title-accent">MetLife.</span>
            </h2>
            <p className="wc-section-lede">
              Sixteen knockout matches. One final on July 19. The bracket fills in automatically as the tournament unfolds.
            </p>
          </div>
        </div>

        {/* The trophy beacon */}
        <div className="wc-br-trophy">
          <div className="wc-br-trophy-glow" />
          <div className="wc-br-trophy-icon">
            <TrophyIcon size={24} strokeWidth={1.6} />
          </div>
          <div className="wc-br-trophy-label">FIFA World Cup 2026</div>
          <div className="wc-br-trophy-venue">Final · 19 July · MetLife Stadium</div>
        </div>

        {/* Mobile round tabs */}
        {isMobile && (
          <div className="wc-br-tabs">
            {ORDER.map((round) => (
              <button
                key={round}
                type="button"
                className={`wc-br-tab ${activeTab === round ? "wc-br-tab--active" : ""} ${activeRound === round ? "wc-br-tab--live" : ""}`}
                onClick={() => setActiveTab(round)}
              >
                {round}
                {activeRound === round && <span className="wc-br-tab-dot" />}
              </button>
            ))}
          </div>
        )}

        <div className="wc-br-wrapper">
          {isMobile ? (
            <div className="wc-br-mobile">
              <RoundColumn
                round={activeTab}
                slots={bracket[activeTab]}
                isFinalRound={activeTab === "F"}
                isActive={activeRound === activeTab}
                isNext={activeRound !== activeTab && nextRound === activeTab}
              />
              {activeTab === "F" && bracket["3RD"].length > 0 && (
                <div className="wc-br-third-mobile">
                  <div className="wc-br-col-title" style={{ marginTop: 24 }}>{ROUND_LABELS["3RD"]}</div>
                  <Slot slot={bracket["3RD"][0]} />
                </div>
              )}
            </div>
          ) : (
            <div className="wc-br-desktop">
              <div className="wc-br-grid" ref={gridRef}>
                {/* Connector lines layer */}
                {paths.length > 0 && (
                  <svg
                    className="wc-br-connectors"
                    width={gridSize.w}
                    height={gridSize.h}
                    viewBox={`0 0 ${gridSize.w} ${gridSize.h}`}
                    aria-hidden="true"
                  >
                    {paths.map((p, i) => (
                      <path
                        key={i}
                        d={p.d}
                        className={`wc-br-connector ${p.active ? "wc-br-connector--active" : ""}`}
                        style={{ animationDelay: `${i * 18}ms` }}
                      />
                    ))}
                  </svg>
                )}
                {ORDER.map((round) => (
                  <RoundColumn
                    key={round}
                    round={round}
                    slots={bracket[round]}
                    isFinalRound={round === "F"}
                    isActive={activeRound === round}
                    isNext={activeRound !== round && nextRound === round}
                    registerSlot={registerSlot}
                  />
                ))}
              </div>
              {/* Third place sits beside the final */}
              <div className="wc-br-third">
                <div className="wc-br-col-header">
                  <div className="wc-br-col-title">Third Place</div>
                  <div className="wc-br-col-meta">1 match · Jul 18</div>
                </div>
                <Slot slot={bracket["3RD"][0]} />
              </div>
              <div className="wc-br-fade" aria-hidden="true" />
            </div>
          )}
        </div>

        <p className="wc-bracket-hint">Swipe to explore the bracket</p>
      </div>
    </section>
  );
}

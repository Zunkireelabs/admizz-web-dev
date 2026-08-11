"use client";

import { useEffect, useRef, useState } from "react";
import { useLive } from "@/lib/wc2026/LiveProvider";
import Flag from "../shared/Flag";
import type { GroupStanding, StandingsEntry } from "@/lib/wc2026/types";

function groupAnchor(group: string): string {
  return `standings-group-${group.replace(/[^A-Za-z0-9]/g, "").toLowerCase()}`;
}

function Row({ e }: { e: StandingsEntry }) {
  const modifier = e.qualified
    ? "wc-stand-row--qualify"
    : e.bestThird
    ? "wc-stand-row--bestthird"
    : "";
  return (
    <div className={`wc-stand-row ${modifier}`}>
      <div className="wc-stand-cell wc-stand-cell--team">
        <div className="wc-stand-rank">{e.rank}</div>
        <div className="wc-stand-flag">
          <Flag src={e.team.flag} fitParent />
        </div>
        <div className="wc-stand-name">{e.team.shortName}</div>
      </div>
      <div className="wc-stand-cell wc-stand-cell--num">{e.played}</div>
      <div className="wc-stand-cell wc-stand-cell--num">
        {e.goalDiff > 0 ? `+${e.goalDiff}` : e.goalDiff}
      </div>
      <div className="wc-stand-cell wc-stand-cell--num wc-stand-cell--pts">{e.points}</div>
    </div>
  );
}

function GroupTable({ group, refCb }: { group: GroupStanding; refCb: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="wc-standings-card" id={groupAnchor(group.group)} ref={refCb}>
      <div className="wc-standings-header">
        <span className="wc-standings-group">Group {group.group}</span>
        <span className="wc-standings-stage">FIFA</span>
      </div>
      <div className="wc-stand">
        <div className="wc-stand-head">
          <div className="wc-stand-cell wc-stand-cell--team-h">Team</div>
          <div className="wc-stand-cell wc-stand-cell--num-h">P</div>
          <div className="wc-stand-cell wc-stand-cell--num-h">GD</div>
          <div className="wc-stand-cell wc-stand-cell--num-h">PTS</div>
        </div>
        <div className="wc-stand-body">
          {group.entries.map((e) => (
            <Row key={e.team.code} e={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GroupStandings() {
  const { standings } = useLive();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (standings.length === 0) return;
    if (!activeGroup) setActiveGroup(standings[0].group);

    // Mobile: horizontal strip — observe against the strip element, pick the
    // card whose centre is closest to the strip's centre.
    // Desktop: vertical grid — observe against the viewport, pick the card
    // highest on screen.
    const isStrip = isMobile && gridRef.current !== null;
    const root = isStrip ? gridRef.current : null;
    const rootMargin = isStrip ? "0px -35% 0px -35%" : "-120px 0px -55% 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((en) => en.isIntersecting);
        if (visible.length === 0) return;
        let pick = visible[0];
        if (isStrip && root) {
          const rootRect = root.getBoundingClientRect();
          const centre = rootRect.left + rootRect.width / 2;
          pick = visible.reduce((best, e) => {
            const bestCentre = best.boundingClientRect.left + best.boundingClientRect.width / 2;
            const eCentre = e.boundingClientRect.left + e.boundingClientRect.width / 2;
            return Math.abs(eCentre - centre) < Math.abs(bestCentre - centre) ? e : best;
          }, visible[0]);
        } else {
          pick = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        }
        const match = standings.find((g) => groupAnchor(g.group) === pick.target.id);
        if (match) setActiveGroup(match.group);
      },
      { root, rootMargin, threshold: 0 },
    );

    standings.forEach((g) => {
      const el = groupRefs.current[g.group];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [standings.length, isMobile]);

  // Keep the active letter visible inside the horizontal nav strip.
  // Scroll the letters container directly — scrollIntoView would bubble to
  // the window and fight with the IntersectionObserver above.
  useEffect(() => {
    if (!activeGroup || !navRef.current) return;
    const letters = navRef.current.querySelector<HTMLElement>(".wc-standings-nav-letters");
    const activeBtn = navRef.current.querySelector<HTMLElement>(`[data-group="${activeGroup}"]`);
    if (!letters || !activeBtn) return;
    const target = activeBtn.offsetLeft - letters.clientWidth / 2 + activeBtn.clientWidth / 2;
    letters.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeGroup]);

  if (standings.length === 0) {
    return null;
  }

  const jumpToGroup = (group: string) => {
    const el = groupRefs.current[group];
    if (!el) return;
    if (isMobile && gridRef.current) {
      // Centre this card inside the horizontal strip
      const strip = gridRef.current;
      const target = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
      strip.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    } else {
      const navHeight = navRef.current?.getBoundingClientRect().height ?? 0;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="wc-section" id="standings" style={{ background: "var(--wc-surface-1)" }}>
      <div className="wc-section-inner">
        <div className="wc-section-header">
          <div className="wc-section-title-block">
            <span className="wc-section-eyebrow">Group Stage</span>
            <h2 className="wc-section-title">
              Twelve Groups. <span className="wc-section-title-accent">One Bracket.</span>
            </h2>
            <p className="wc-section-lede">
              Top two from each group advance. The eight best third-place finishers join them in the Round of 32.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--wc-text-dim)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 12, height: 3, background: "rgba(34,197,94,0.6)", borderRadius: 2 }} />
              Qualified
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 12, height: 3, background: "rgba(255,204,0,0.6)", borderRadius: 2 }} />
              Best 3rd
            </span>
          </div>
        </div>

        {/* Sticky group navigator */}
        <div className="wc-standings-nav-wrap">
          <div className="wc-standings-nav" ref={navRef} role="tablist" aria-label="Jump to group">
            <span className="wc-standings-nav-label">GROUPS</span>
            <div className="wc-standings-nav-letters">
              {standings.map((g) => (
                <button
                  key={g.group}
                  type="button"
                  role="tab"
                  data-group={g.group}
                  aria-selected={activeGroup === g.group}
                  className={`wc-standings-nav-btn ${activeGroup === g.group ? "wc-standings-nav-btn--active" : ""}`}
                  onClick={() => jumpToGroup(g.group)}
                >
                  {g.group}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="wc-standings-grid" ref={gridRef}>
          {standings.map((g) => (
            <GroupTable
              key={g.group}
              group={g}
              refCb={(el) => { groupRefs.current[g.group] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

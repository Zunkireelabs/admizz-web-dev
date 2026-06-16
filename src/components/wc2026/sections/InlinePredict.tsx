"use client";

import { useEffect, useState } from "react";
import type { MatchWithTeams, PredictionChoice } from "@/lib/wc2026/types";
import { loadStoredPredictions } from "@/lib/wc2026/predictions";
import PredictionModal from "../shared/PredictionModal";
import { CheckIcon } from "../shared/Icons";

interface Props {
  match: MatchWithTeams;
  now: number;
  onPredicted?: () => void;
  onPredictNext?: () => void;
}

export default function InlinePredict({ match, now, onPredicted, onPredictNext }: Props) {
  const [stored, setStored] = useState<ReturnType<typeof loadStoredPredictions>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [choice, setChoice] = useState<PredictionChoice | null>(null);

  useEffect(() => {
    setStored(loadStoredPredictions());
  }, []);

  const kickoff = new Date(match.kickoffISO).getTime();
  const open = now < kickoff;
  const existing = stored[match.id];
  const alreadyPredicted = !!existing;

  const handlePick = (c: PredictionChoice) => {
    if (!open || alreadyPredicted) return;
    setChoice(c);
    setModalOpen(true);
  };

  return (
    <>
      <div className="wc-predict-bar">
        <p className="wc-predict-bar-label">
          {alreadyPredicted ? "You're locked in for this match" : "Quick pick — tap to predict"}
        </p>
        <div className="wc-predict-tiles">
          <button
            type="button"
            className={`wc-predict-tile ${existing?.prediction === "team_a" ? "wc-predict-tile--selected" : ""} ${!open || alreadyPredicted ? "wc-predict-tile--locked" : ""}`}
            onClick={() => handlePick("team_a")}
            disabled={!open || alreadyPredicted}
          >
            <span className="wc-predict-tile-label">{match.teamAData.shortName} WIN</span>
            <span className="wc-predict-tile-out">
              {existing?.prediction === "team_a" ? <CheckIcon size={12} /> : "Pick this"}
            </span>
          </button>
          <button
            type="button"
            className={`wc-predict-tile ${existing?.prediction === "draw" ? "wc-predict-tile--selected" : ""} ${!open || alreadyPredicted ? "wc-predict-tile--locked" : ""}`}
            onClick={() => handlePick("draw")}
            disabled={!open || alreadyPredicted}
          >
            <span className="wc-predict-tile-label">DRAW</span>
            <span className="wc-predict-tile-out">
              {existing?.prediction === "draw" ? <CheckIcon size={12} /> : "Pick this"}
            </span>
          </button>
          <button
            type="button"
            className={`wc-predict-tile ${existing?.prediction === "team_b" ? "wc-predict-tile--selected" : ""} ${!open || alreadyPredicted ? "wc-predict-tile--locked" : ""}`}
            onClick={() => handlePick("team_b")}
            disabled={!open || alreadyPredicted}
          >
            <span className="wc-predict-tile-label">{match.teamBData.shortName} WIN</span>
            <span className="wc-predict-tile-out">
              {existing?.prediction === "team_b" ? <CheckIcon size={12} /> : "Pick this"}
            </span>
          </button>
        </div>
      </div>

      <PredictionModal
        open={modalOpen}
        match={match}
        choice={choice}
        onClose={() => setModalOpen(false)}
        onSubmitted={() => { setStored(loadStoredPredictions()); onPredicted?.(); }}
        onPredictNext={onPredictNext}
      />
    </>
  );
}

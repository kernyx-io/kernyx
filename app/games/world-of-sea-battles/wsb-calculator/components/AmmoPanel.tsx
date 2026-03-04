"use client";

import { useMemo } from "react";
import "./calculator.css";
import { useWsbStore } from "@/lib/wsb/store";
import type { AmmoType } from "@/lib/wsb/types";

const AMMO_ICONS: Record<string, string> = {
  round: "🔵",
  heated: "🔥",
  bar: "⛓️",
  grape: "☠️",
  heavy: "⚫",
  saxon: "🔷",
};

const SPECIAL_LABELS: Record<string, string> = {
  fire: "Fire",
  slow: "Slow",
  pierce: "Pierce",
};

function LevelDots({ value }: { value: number }) {
  return (
    <div className="calc-ammo-dots" aria-hidden>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`calc-ammo-dot ${value >= n ? "calc-ammo-dot-active" : ""}`}
        />
      ))}
    </div>
  );
}

interface AmmoPanelProps {
  ammoTypes: AmmoType[];
}

export default function AmmoPanel({ ammoTypes }: AmmoPanelProps) {
  const { ammoId, setAmmo } = useWsbStore();

  const activeAmmo = useMemo(
    () => ammoTypes.find((ammo) => ammo.id === ammoId) ?? ammoTypes[0],
    [ammoId, ammoTypes]
  );

  return (
    <div className="calc-ammo-panel">
      <div className="calc-ammo-head">
        <div>
          <div className="calc-ammo-label">Ammunition Type</div>
          <div className="calc-ammo-sub">
            Pick the shot type that matches your damage goal.
          </div>
        </div>

        {activeAmmo && (
          <div className="calc-ammo-current-badge">
            {AMMO_ICONS[activeAmmo.id] ?? "•"} {activeAmmo.name}
          </div>
        )}
      </div>

      <div className="calc-ammo-grid">
        {ammoTypes.map((ammo) => {
          const isActive = ammoId === ammo.id;
          const hullPct = Math.round(ammo.hullDmgPct * 100);

          return (
            <button
              key={ammo.id}
              type="button"
              onClick={() => setAmmo(ammo.id)}
              className={`calc-ammo-card ${isActive ? "calc-ammo-card-active" : ""}`}
            >
              <div className="calc-ammo-card-top">
                <div className="calc-ammo-title-wrap">
                  <span className="calc-ammo-icon">{AMMO_ICONS[ammo.id] ?? "•"}</span>
                  <span className="calc-ammo-name">{ammo.name}</span>
                </div>

                {ammo.special && (
                  <span className="calc-ammo-special">
                    {SPECIAL_LABELS[ammo.special] ?? ammo.special}
                  </span>
                )}
              </div>

              <div className="calc-ammo-hull-row">
                <span className="calc-ammo-hull-label">Hull Damage</span>
                <strong className="calc-ammo-hull-value">{hullPct}%</strong>
              </div>

              <div className="calc-ammo-meters">
                <div className="calc-ammo-meter">
                  <span>Sails</span>
                  <LevelDots value={ammo.sailsDmg} />
                </div>

                <div className="calc-ammo-meter">
                  <span>Crew</span>
                  <LevelDots value={ammo.crewDmg} />
                </div>
              </div>

              <p className="calc-ammo-desc">{ammo.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

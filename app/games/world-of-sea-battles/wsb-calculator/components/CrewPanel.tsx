"use client";

import "./calculator.css";
import { useWsbStore } from "@/lib/wsb/store";
import { CREW, CREW_FACTIONS, getCrewById } from "@/lib/wsb/crew";

function MiniPill({ label }: { label: string }) {
  return <span className="calc-mini-pill">{label}</span>;
}

export default function CrewPanel() {
  const { crewIds, toggleCrew } = useWsbStore();
  const selectedCrew = crewIds.map((id) => getCrewById(id)).filter(Boolean);

  return (
    <div className="calc-select-panel">
      <div className="calc-select-head">
        <div>
          <div className="calc-select-label">Crew</div>
          <div className="calc-select-sub">Select up to 4 crew members.</div>
        </div>

        <div className="calc-limit-badges">
          <MiniPill label={`${crewIds.length}/4 selected`} />
        </div>
      </div>

      <div className="calc-active-strip">
        {Array.from({ length: 4 }, (_, i) => {
          const member = selectedCrew[i];
          return (
            <button
              key={i}
              type="button"
              className={`calc-slot-chip ${member ? "calc-slot-chip-filled" : ""}`}
              onClick={() => member && toggleCrew(member.id)}
              disabled={!member}
              title={member ? `Remove ${member.name}` : undefined}
            >
              {member ? member.name : "Empty"}
            </button>
          );
        })}
      </div>

      <div className="calc-catalog-stack">
        {CREW_FACTIONS.map((faction) => {
          const factionCrew = CREW.filter((c) => c.faction === faction);

          return (
            <section key={faction} className="calc-catalog-section">
              <div className="calc-catalog-title">{faction}</div>

              <div className="calc-choice-grid">
                {factionCrew.map((member) => {
                  const isActive = crewIds.includes(member.id);
                  const isDisabled = !isActive && crewIds.length >= 4;

                  const pills = [
                    ...member.types,
                    member.dmgBonus !== 0
                      ? `${member.dmgBonus > 0 ? "+" : ""}${Math.round(member.dmgBonus * 100)}% dmg`
                      : null,
                    member.reloadBonus !== 0
                      ? `${member.reloadBonus > 0 ? "+" : ""}${Math.round(member.reloadBonus * 100)}% reload`
                      : null,
                  ].filter(Boolean) as string[];

                  return (
                    <button
                      key={member.id}
                      type="button"
                      className={`calc-choice-card ${isActive ? "calc-choice-card-active" : ""}`}
                      onClick={() => !isDisabled && toggleCrew(member.id)}
                      disabled={isDisabled}
                      title={isDisabled ? "Max 4 crew slots reached" : undefined}
                    >
                      <div className="calc-choice-top">
                        <div className="calc-choice-name">{member.name}</div>
                        {isActive && <span className="calc-choice-state">Selected</span>}
                      </div>

                      <div className="calc-pill-row">
                        {pills.length > 0 ? pills.map((pill) => <MiniPill key={pill} label={pill} />) : <MiniPill label="Utility" />}
                      </div>

                      <p className="calc-choice-desc">{member.bonusDesc}</p>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

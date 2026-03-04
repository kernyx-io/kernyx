"use client";

import "./calculator.css";
import { useWsbStore } from "@/lib/wsb/store";
import { ATTACHMENTS } from "@/lib/wsb/attachments";

const CATEGORY_ORDER = [
  "Sails",
  "Speed",
  "Expeditionary",
  "Protection",
  "Combat",
  "Unusual",
  "Mortar",
] as const;

const CATEGORY_MAP: Record<string, string> = {
  cheap_sails: "Sails",
  stitched_sails: "Sails",
  elite_sails: "Sails",
  tarpaulin_sails: "Sails",
  reinforced_masts: "Speed",
  maneuverable_helm: "Speed",
  lightweight_hull: "Speed",
  small_hooks: "Expeditionary",
  sturdy_frames: "Expeditionary",
  combat_crows_nest: "Expeditionary",
  double_hold: "Expeditionary",
  extra_ballast: "Expeditionary",
  cellars: "Expeditionary",
  extra_bunks: "Expeditionary",
  repair_arsenal: "Protection",
  copper_plating: "Protection",
  iron_ram: "Protection",
  fortified_gun_ports: "Protection",
  iron_plating: "Protection",
  teak_frames: "Protection",
  advanced_gun_carriages: "Combat",
  upper_deck: "Combat",
  ammunition_cradles: "Combat",
  incendiary_mixture: "Combat",
  fortified_ports: "Combat",
  combat_arsenal: "Combat",
  reinforced_cannons: "Combat",
  strong_beams: "Unusual",
  high_helm_port: "Unusual",
  portable_chest: "Unusual",
  structural_expansion: "Unusual",
  emergency_powder_charge: "Unusual",
  long_range_mortars: "Mortar",
  swivel_mortars: "Mortar",
  reinforced_centre_line: "Mortar",
  lightweight_construction: "Mortar",
};

const SAIL_IDS = new Set([
  "cheap_sails",
  "stitched_sails",
  "elite_sails",
  "tarpaulin_sails",
]);

function BonusPill({ label }: { label: string }) {
  return <span className="calc-mini-pill">{label}</span>;
}

export default function AttachmentsPanel() {
  const { attachmentIds, toggleAttachment } = useWsbStore();

  const sailCount = attachmentIds.filter((id) => SAIL_IDS.has(id)).length;
  const generalCount = attachmentIds.filter((id) => !SAIL_IDS.has(id)).length;

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof ATTACHMENTS>>(
    (acc, cat) => {
      acc[cat] = ATTACHMENTS.filter((a) => CATEGORY_MAP[a.id] === cat);
      return acc;
    },
    {}
  );

  return (
    <div className="calc-select-panel">
      <div className="calc-select-head">
        <div>
          <div className="calc-select-label">Attachments</div>
          <div className="calc-select-sub">
            Choose up to 1 sail attachment and 5 general attachments.
          </div>
        </div>

        <div className="calc-limit-badges">
          <BonusPill label={`Sail ${sailCount}/1`} />
          <BonusPill label={`General ${generalCount}/5`} />
        </div>
      </div>

      <div className="calc-active-strip">
        {attachmentIds.length > 0 ? (
          attachmentIds.map((id) => {
            const item = ATTACHMENTS.find((a) => a.id === id);
            if (!item) return null;
            return (
              <button
                key={id}
                type="button"
                className="calc-active-chip"
                onClick={() => toggleAttachment(item.id, item.slotType)}
                title={`Remove ${item.name}`}
              >
                {item.name} ×
              </button>
            );
          })
        ) : (
          <div className="calc-empty-inline">No attachments selected yet.</div>
        )}
      </div>

      <div className="calc-catalog-stack">
        {CATEGORY_ORDER.map((cat) =>
          grouped[cat]?.length ? (
            <section key={cat} className="calc-catalog-section">
              <div className="calc-catalog-title">{cat}</div>

              <div className="calc-choice-grid">
                {grouped[cat].map((att) => {
                  const isSail = SAIL_IDS.has(att.id);
                  const isActive = attachmentIds.includes(att.id);
                  const isDisabled =
                    !isActive && (isSail ? sailCount >= 1 : generalCount >= 5);

                  const bonusLabels = [
                    att.dmgBonus !== 0
                      ? `${att.dmgBonus > 0 ? "+" : ""}${Math.round(att.dmgBonus * 100)}% dmg`
                      : null,
                    att.rateBonus !== 0
                      ? `${att.rateBonus > 0 ? "+" : ""}${Math.round(att.rateBonus * 100)}% reload`
                      : null,
                    isSail ? "Sail slot" : "General",
                  ].filter(Boolean) as string[];

                  return (
                    <button
                      key={att.id}
                      type="button"
                      className={`calc-choice-card ${isActive ? "calc-choice-card-active" : ""}`}
                      onClick={() => !isDisabled && toggleAttachment(att.id, att.slotType)}
                      disabled={isDisabled}
                      title={
                        isDisabled
                          ? `Max ${isSail ? "1 sail" : "5 general"} slot${isSail ? "" : "s"} reached`
                          : undefined
                      }
                    >
                      <div className="calc-choice-top">
                        <div className="calc-choice-name">{att.name}</div>
                        {isActive && <span className="calc-choice-state">Selected</span>}
                      </div>

                      <div className="calc-pill-row">
                        {bonusLabels.map((label) => (
                          <BonusPill key={label} label={label} />
                        ))}
                      </div>

                      <p className="calc-choice-desc">{att.desc}</p>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null
        )}
      </div>
    </div>
  );
}

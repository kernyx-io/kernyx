"use client";

import "./calculator.css";
import { useWsbStore } from "@/lib/wsb/store";
import { SUPPORT_GROUPS, SUPPORT_ITEMS, getSupportById } from "@/lib/wsb/support";

function MiniPill({ label }: { label: string }) {
  return <span className="calc-mini-pill">{label}</span>;
}

export default function SupportPanel() {
  const { supportIds, toggleSupport } = useWsbStore();
  const selectedItems = supportIds.map((id) => getSupportById(id)).filter(Boolean);

  return (
    <div className="calc-select-panel">
      <div className="calc-select-head">
        <div>
          <div className="calc-select-label">Support</div>
          <div className="calc-select-sub">Select up to 3 support items.</div>
        </div>

        <div className="calc-limit-badges">
          <MiniPill label={`${supportIds.length}/3 selected`} />
        </div>
      </div>

      <div className="calc-active-strip">
        {Array.from({ length: 3 }, (_, i) => {
          const item = selectedItems[i];
          return (
            <button
              key={i}
              type="button"
              className={`calc-slot-chip ${item ? "calc-slot-chip-filled" : ""}`}
              onClick={() => item && toggleSupport(item.id)}
              disabled={!item}
              title={item ? `Remove ${item.name}` : undefined}
            >
              {item ? item.name : "Empty"}
            </button>
          );
        })}
      </div>

      <div className="calc-catalog-stack">
        {SUPPORT_GROUPS.map((group) => {
          const groupItems = SUPPORT_ITEMS.filter((s) => s.group === group);

          return (
            <section key={group} className="calc-catalog-section">
              <div className="calc-catalog-title">{group}</div>

              <div className="calc-choice-grid">
                {groupItems.map((item) => {
                  const isActive = supportIds.includes(item.id);
                  const isDisabled = !isActive && supportIds.length >= 3;

                  const pills = [
                    ...item.types,
                    item.dmgBonus !== 0
                      ? `${item.dmgBonus > 0 ? "+" : ""}${Math.round(item.dmgBonus * 100)}% dmg`
                      : null,
                    item.reloadBonus !== 0
                      ? `${item.reloadBonus > 0 ? "+" : ""}${Math.round(item.reloadBonus * 100)}% reload`
                      : null,
                  ].filter(Boolean) as string[];

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`calc-choice-card ${isActive ? "calc-choice-card-active" : ""}`}
                      onClick={() => !isDisabled && toggleSupport(item.id)}
                      disabled={isDisabled}
                      title={isDisabled ? "Max 3 support slots reached" : undefined}
                    >
                      <div className="calc-choice-top">
                        <div className="calc-choice-name">{item.name}</div>
                        {isActive && <span className="calc-choice-state">Selected</span>}
                      </div>

                      <div className="calc-pill-row">
                        {pills.length > 0 ? pills.map((pill) => <MiniPill key={pill} label={pill} />) : <MiniPill label="Support" />}
                      </div>

                      <p className="calc-choice-desc">{item.bonusDesc}</p>
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

"use client";

import "./calculator.css";
import { fmt } from "@/lib/wsb/calculator";
import type { DamageReport as DamageReportType } from "@/lib/wsb/types";

interface DamageReportProps {
  report: DamageReportType | null;
}

const SIDE_COLORS: Record<string, string> = {
  Bow: "#7aadcf",
  Port: "#b8c8d8",
  Starboard: "#b8c8d8",
  Stern: "#cf9f7a",
};

function SummaryBox({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="calc-report-box">
      <div className="calc-report-box-label">{label}</div>
      <div className="calc-report-box-value">{value}</div>
      <div className="calc-report-box-hint">{hint}</div>
    </div>
  );
}

export default function DamageReport({ report }: DamageReportProps) {
  const hasData = !!report && report.cannonsArmed > 0;

  return (
    <div className="calc-report-panel">
      <div className="calc-select-head">
        <div>
          <div className="calc-select-label">Damage Report</div>
          <div className="calc-select-sub">
            Full volley, sustained DPM, active bonuses, and per-side breakdown.
          </div>
        </div>

        <div className="calc-limit-badges">
          <span className="calc-mini-pill">{hasData ? "Broadside Ready" : "Standby"}</span>
        </div>
      </div>

      {hasData && report.bonusPills.length > 0 && (
        <div className="calc-pill-row">
          {report.bonusPills.map((pill, i) => (
            <span key={`${pill}-${i}`} className="calc-mini-pill">
              {pill}
            </span>
          ))}
        </div>
      )}

      <div className="calc-report-grid">
        <SummaryBox
          label="Volley Damage"
          value={hasData ? fmt(report.volleyDamage) : "—"}
          hint="Full broadside"
        />
        <SummaryBox
          label="Damage / Min"
          value={hasData ? fmt(report.damagePerMinute) : "—"}
          hint="Sustained DPM"
        />
        <SummaryBox
          label="Avg per Cannon"
          value={hasData ? fmt(report.avgDmgPerCannon) : "—"}
          hint="Per volley"
        />
        <SummaryBox
          label="Cannons Armed"
          value={
            report
              ? `${report.cannonsArmed}${report.totalSlots > 0 ? ` / ${report.totalSlots}` : ""}`
              : "—"
          }
          hint="Slots filled"
        />
        <SummaryBox
          label="Damage Bonus"
          value={report ? `${report.dmgBonusPct >= 0 ? "+" : ""}${fmt(report.dmgBonusPct)}%` : "—"}
          hint="From bonuses"
        />
        <SummaryBox
          label="Armour Lost"
          value={report && report.targetArmourLost > 0 ? `-${fmt(report.targetArmourLost)}` : "—"}
          hint="Per shot vs target"
        />
      </div>

      {hasData && report.groupResults.length > 0 ? (
        <div className="calc-side-list">
          {report.groupResults.map((row, i) => (
            <div key={`${row.side}-${i}`} className="calc-side-card">
              <div className="calc-side-top">
                <div className="calc-side-name" style={{ color: SIDE_COLORS[row.side] ?? "var(--calc-cream)" }}>
                  {row.side}
                </div>
                <span className="calc-mini-pill">
                  {row.armedCount}/{row.slotCount} armed
                </span>
              </div>

              <div className="calc-side-cannon">{row.cannonName}</div>

              <div className="calc-side-stats">
                <div><span>Volley</span><strong>{fmt(row.volleyDmg)}</strong></div>
                <div><span>DPM</span><strong>{fmt(row.dpm)}</strong></div>
                <div><span>Reload</span><strong>{row.reloadTime}s</strong></div>
                <div><span>Shots</span><strong>{row.shots}</strong></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="calc-empty-inline">
          Configure a ship and arm at least one cannon to see broadside output.
        </div>
      )}
    </div>
  );
}

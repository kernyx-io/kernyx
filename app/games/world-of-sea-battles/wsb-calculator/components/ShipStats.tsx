"use client";

import "./calculator.css";
import { useWsbStore } from "@/lib/wsb/store";
import { getShipById, parseWeaponSlots } from "@/lib/wsb/ships";
import { getAttachmentById } from "@/lib/wsb/attachments";
import { getCrewById } from "@/lib/wsb/crew";
import { getSupportById } from "@/lib/wsb/support";
import { getAmmoById } from "@/lib/wsb/ammo";
import { fmt } from "@/lib/wsb/calculator";

interface StatDeltas {
  durability: number;
  durabilityPct: number;
  speedFlat: number;
  speedPct: number;
  maneuverFlat: number;
  maneuverPct: number;
  armorFlat: number;
  armorPct: number;
  crewFlat: number;
  holdFlat: number;
  holdPct: number;
}

function emptyDeltas(): StatDeltas {
  return {
    durability: 0,
    durabilityPct: 0,
    speedFlat: 0,
    speedPct: 0,
    maneuverFlat: 0,
    maneuverPct: 0,
    armorFlat: 0,
    armorPct: 0,
    crewFlat: 0,
    holdFlat: 0,
    holdPct: 0,
  };
}

function parseAttachmentDesc(desc: string, d: StatDeltas) {
  const getPct = (pattern: RegExp): number => {
    const m = desc.match(new RegExp(pattern.source + "\\s*([+-][\\d.]+)%", "i"));
    return m ? parseFloat(m[1]) / 100 : 0;
  };

  const getKnots = (): number => {
    const m = desc.match(/speed\s*\+\s*([\d.]+)\s*knt/i);
    return m ? parseFloat(m[1]) : 0;
  };

  d.durabilityPct += getPct(/durability/);

  const durFlatM = desc.match(/durability\s*\+\s*(\d+)(?!\s*%)/i);
  if (durFlatM) d.durability += parseFloat(durFlatM[1]);
  const durNegM = desc.match(/durability\s*-\s*(\d+)(?!\s*%)/i);
  if (durNegM) d.durability -= parseFloat(durNegM[1]);

  d.speedPct += getPct(/(?:cruise max\.\s*)?speed(?!\s*change)(?!\s*penalty)/);
  d.speedFlat += getKnots();
  const scM = desc.match(/speed\s*change\s*([+-][\d.]+)%/i);
  if (scM) d.speedPct += parseFloat(scM[1]) / 100;

  d.maneuverPct += getPct(/maneuverability/);
  const manFlatM = desc.match(/maneuverability\s*([+-]\d+)(?!\s*%)/i);
  if (manFlatM) d.maneuverFlat += parseFloat(manFlatM[1]);

  d.armorPct += getPct(/armor/);
  const armorFlatM = desc.match(/armor\s*([+-]\d+)(?!\s*%)/i);
  if (armorFlatM) d.armorFlat += parseFloat(armorFlatM[1]);

  const crewM = desc.match(/crew\s*\+\s*(\d+)/i);
  if (crewM) d.crewFlat += parseFloat(crewM[1]);

  d.holdPct += getPct(/hold/);
  const holdFlatM = desc.match(/hold\s*\+\s*(\d+)(?!\s*%)/i);
  if (holdFlatM) d.holdFlat += parseFloat(holdFlatM[1]);
}

function computeDeltas(
  attachmentIds: string[],
  crewIds: string[],
  supportIds: string[]
): StatDeltas {
  const d = emptyDeltas();

  for (const id of attachmentIds) {
    const a = getAttachmentById(id);
    if (a) parseAttachmentDesc(a.desc, d);
  }

  for (const id of crewIds) {
    const c = getCrewById(id);
    if (!c) continue;
    d.speedPct += c.speedBonus;
    d.maneuverPct += c.maneuverBonus;
  }

  for (const id of supportIds) {
    const s = getSupportById(id);
    if (!s) continue;
    d.speedPct += s.speedBonus;
    d.maneuverPct += s.maneuverBonus;
  }

  return d;
}

function applyPctFlat(base: number, pct: number, flat: number) {
  return base * (1 + pct) + flat;
}

function StatTile({
  label,
  base,
  modified,
  unit = "",
  decimals = 0,
}: {
  label: string;
  base: number;
  modified: number;
  unit?: string;
  decimals?: number;
}) {
  const changed = Math.abs(modified - base) > 0.009;
  const render = (v: number) =>
    decimals > 0 ? v.toFixed(decimals) : fmt(Math.round(v));

  return (
    <div className="calc-stat-tile">
      <div className="calc-stat-tile-label">{label}</div>
      <div className="calc-stat-tile-main">
        {render(modified)}
        {unit}
      </div>
      <div className="calc-stat-tile-sub">
        Base {render(base)}
        {unit}
        {changed && ` → ${render(modified)}${unit}`}
      </div>
    </div>
  );
}

export default function ShipStats() {
  const { shipId, ammoId, attachmentIds, crewIds, supportIds } = useWsbStore();
  const ship = getShipById(shipId);

  if (!ship) {
    return <div className="calc-empty-inline">Select a ship to see live stats.</div>;
  }

  const layout = parseWeaponSlots(ship.heavyWeapons);
  const d = computeDeltas(attachmentIds, crewIds, supportIds);

  const modDurability = applyPctFlat(ship.durability, d.durabilityPct, d.durability);
  const modSpeed = applyPctFlat(ship.speed, d.speedPct, d.speedFlat);
  const modManeuver = applyPctFlat(ship.maneuverability, d.maneuverPct, d.maneuverFlat);
  const modArmor = applyPctFlat(ship.broadsideArmor, d.armorPct, d.armorFlat);
  const modCrew = ship.crew + d.crewFlat;
  const modHold = applyPctFlat(ship.hold, d.holdPct, d.holdFlat);

  const ammo = getAmmoById(ammoId);

  let totalDmgBonus = 0;
  let totalReloadBonus = 0;

  for (const id of attachmentIds) {
    const a = getAttachmentById(id);
    if (a) {
      totalDmgBonus += a.dmgBonus;
      totalReloadBonus += a.rateBonus;
    }
  }

  for (const id of crewIds) {
    const c = getCrewById(id);
    if (c) {
      totalDmgBonus += c.dmgBonus;
      totalReloadBonus += c.reloadBonus;
    }
  }

  for (const id of supportIds) {
    const s = getSupportById(id);
    if (s) {
      totalDmgBonus += s.dmgBonus;
      totalReloadBonus += s.reloadBonus;
    }
  }

  const effects: { source: string; desc: string; tag: string }[] = [];

  if (ammo && ammoId !== "round") {
    effects.push({ source: ammo.name, desc: ammo.desc, tag: "Ammo" });
  }

  for (const id of attachmentIds) {
    const a = getAttachmentById(id);
    if (a) effects.push({ source: a.name, desc: a.desc, tag: "Attachment" });
  }

  for (const id of crewIds) {
    const c = getCrewById(id);
    if (c) effects.push({ source: c.name, desc: c.bonusDesc, tag: "Crew" });
  }

  for (const id of supportIds) {
    const s = getSupportById(id);
    if (s) effects.push({ source: s.name, desc: s.bonusDesc, tag: "Support" });
  }

  return (
    <div className="calc-stats-panel">
      <div className="calc-stats-head">
        <div>
          <div className="calc-select-label">Ship Stats</div>
          <div className="calc-select-sub">{ship.name} live build preview</div>
        </div>

        <div className="calc-limit-badges">
          <span className="calc-mini-pill">{ship.shipType}</span>
          <span className="calc-mini-pill">Rate {ship.rate}</span>
        </div>
      </div>

      <div className="calc-stat-grid">
        <StatTile label="Durability" base={ship.durability} modified={modDurability} />
        <StatTile label="Speed" base={ship.speed} modified={modSpeed} unit=" knt" decimals={1} />
        <StatTile label="Maneuver" base={ship.maneuverability} modified={modManeuver} />
        <StatTile label="Armor" base={ship.broadsideArmor} modified={modArmor} decimals={1} />
        <StatTile label="Crew" base={ship.crew} modified={modCrew} />
        <StatTile label="Hold" base={ship.hold} modified={modHold} />
      </div>

      <div className="calc-ship-meta-grid">
        <div className="calc-meta-row"><span>Hull</span><strong>{ship.hullDims}</strong></div>
        <div className="calc-meta-row"><span>Displacement</span><strong>{ship.displacement}</strong></div>
        <div className="calc-meta-row"><span>Weapons</span><strong>{ship.heavyWeapons}</strong></div>
        <div className="calc-meta-row"><span>Layout</span><strong>{layout.bow}-{layout.broadside}-{layout.stern}</strong></div>
        {ship.integrity != null && <div className="calc-meta-row"><span>Integrity</span><strong>{ship.integrity}</strong></div>}
        {ship.swivelGuns > 0 && <div className="calc-meta-row"><span>Swivels</span><strong>{ship.swivelGuns}</strong></div>}
      </div>

      <div className="calc-bonus-grid">
        <div className="calc-bonus-box">
          <div className="calc-bonus-label">Damage Bonus</div>
          <div className="calc-bonus-value">
            {totalDmgBonus >= 0 ? "+" : ""}
            {Math.round(totalDmgBonus * 100)}%
          </div>
        </div>
        <div className="calc-bonus-box">
          <div className="calc-bonus-label">Reload Bonus</div>
          <div className="calc-bonus-value">
            {totalReloadBonus >= 0 ? "+" : ""}
            {Math.round(totalReloadBonus * 100)}%
          </div>
        </div>
      </div>

      <div className="calc-effects-list">
        {effects.length > 0 ? (
          effects.map((effect, i) => (
            <div key={`${effect.source}-${i}`} className="calc-effect-card">
              <div className="calc-effect-top">
                <span className="calc-mini-pill">{effect.tag}</span>
                <strong>{effect.source}</strong>
              </div>
              <p>{effect.desc}</p>
            </div>
          ))
        ) : (
          <div className="calc-empty-inline">
            No extra effects yet. Add ammo, attachments, crew, or support items.
          </div>
        )}
      </div>
    </div>
  );
}

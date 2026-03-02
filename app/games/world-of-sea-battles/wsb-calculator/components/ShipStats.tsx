'use client'

import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { getShipById, parseWeaponSlots } from '@/lib/wsb/ships'
import { getAttachmentById } from '@/lib/wsb/attachments'
import { getCrewById } from '@/lib/wsb/crew'
import { getSupportById } from '@/lib/wsb/support'
import { getAmmoById } from '@/lib/wsb/ammo'
import { fmt } from '@/lib/wsb/calculator'

// ─── Stat delta aggregation ───────────────────────────────────────────────────

interface StatDeltas {
  durability:          number   // flat
  durabilityPct:       number   // additive multiplier e.g. 0.10 = +10%
  speedFlat:           number   // flat knots
  speedPct:            number
  maneuverFlat:        number   // flat points
  maneuverPct:         number
  armorFlat:           number
  armorPct:            number
  crewFlat:            number
  holdFlat:            number
  holdPct:             number
}

function emptyDeltas(): StatDeltas {
  return {
    durability: 0, durabilityPct: 0,
    speedFlat: 0, speedPct: 0,
    maneuverFlat: 0, maneuverPct: 0,
    armorFlat: 0, armorPct: 0,
    crewFlat: 0,
    holdFlat: 0, holdPct: 0,
  }
}

// Parse attachment desc strings — these have the numeric data in text form
function parseAttachmentDesc(desc: string, d: StatDeltas) {
  // Extract percentage modifier for a keyword e.g. "Durability +10%"
  const getPct = (pattern: RegExp): number => {
    const m = desc.match(new RegExp(pattern.source + '\\s*([+-][\\d.]+)%', 'i'))
    return m ? parseFloat(m[1]) / 100 : 0
  }
  // Extract flat modifier for a keyword e.g. "Crew +20"  or "Armor +1"
  const getFlat = (pattern: RegExp): number => {
    const m = desc.match(new RegExp(pattern.source + '[^%\\d]*([+-][\\d.]+)(?!%)', 'i'))
    return m ? parseFloat(m[1]) : 0
  }
  // Extract flat knt e.g. "Speed +0.4 knt"
  const getKnots = (): number => {
    const m = desc.match(/speed\s*\+\s*([\d.]+)\s*knt/i)
    return m ? parseFloat(m[1]) : 0
  }

  // Durability: could be flat ("Durability +210") or pct ("Durability +10%")
  d.durabilityPct  += getPct(/durability/)
  // flat durability only if it's a plain number NOT followed by %
  const durFlatM = desc.match(/durability\s*\+\s*(\d+)(?!\s*%)/i)
  if (durFlatM) d.durability += parseFloat(durFlatM[1])
  const durNegM = desc.match(/durability\s*-\s*(\d+)(?!\s*%)/i)
  if (durNegM) d.durability -= parseFloat(durNegM[1])

  // Speed
  d.speedPct  += getPct(/(?:cruise max\.\s*)?speed(?!\s*change)(?!\s*penalty)/)
  d.speedFlat += getKnots()
  // "Speed change -15%" = penalty to speed
  const scM = desc.match(/speed\s*change\s*([+-][\d.]+)%/i)
  if (scM) d.speedPct += parseFloat(scM[1]) / 100

  // Maneuverability: both flat ("Maneuverability -1") and pct ("Maneuverability +8%")
  d.maneuverPct  += getPct(/maneuverability/)
  const manFlatM = desc.match(/maneuverability\s*([+-]\d+)(?!\s*%)/i)
  if (manFlatM) d.maneuverFlat += parseFloat(manFlatM[1])

  // Armor
  d.armorPct  += getPct(/armor/)
  const armorFlatM = desc.match(/armor\s*([+-]\d+)(?!\s*%)/i)
  if (armorFlatM) d.armorFlat += parseFloat(armorFlatM[1])

  // Crew flat
  const crewM = desc.match(/crew\s*\+\s*(\d+)/i)
  if (crewM) d.crewFlat += parseFloat(crewM[1])

  // Hold: flat ("Hold +6500") or pct ("Hold +12%")
  d.holdPct  += getPct(/hold/)
  const holdFlatM = desc.match(/hold\s*\+\s*(\d+)(?!\s*%)/i)
  if (holdFlatM) d.holdFlat += parseFloat(holdFlatM[1])
}

function computeDeltas(
  attachmentIds: string[],
  crewIds: string[],
  supportIds: string[],
): StatDeltas {
  const d = emptyDeltas()

  // Attachments: parse desc strings (numeric data lives in text)
  for (const id of attachmentIds) {
    const a = getAttachmentById(id)
    if (a) parseAttachmentDesc(a.desc, d)
  }

  // Crew: use stored numeric fields directly
  for (const id of crewIds) {
    const c = getCrewById(id)
    if (!c) continue
    d.speedPct    += c.speedBonus      // e.g. sailing_master +0.25
    d.maneuverPct += c.maneuverBonus   // e.g. pilot -0.31 (turning penalty)
  }

  // Support: use stored numeric fields directly
  for (const id of supportIds) {
    const s = getSupportById(id)
    if (!s) continue
    d.speedPct    += s.speedBonus      // e.g. rum_ration -0.08
    d.maneuverPct += s.maneuverBonus   // e.g. filling_ration +0.05
  }

  return d
}

function applyPctFlat(base: number, pct: number, flat: number) {
  return base * (1 + pct) + flat
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ title }: { title: string }) {
  return <div className="wsb-stats-section-header">{title}</div>
}

function DeltaBadge({ delta, isPercent = false }: { delta: number; isPercent?: boolean }) {
  if (Math.abs(delta) < 0.009) return null
  const pos = delta > 0
  const label = isPercent
    ? `${pos ? '+' : ''}${(delta * 100).toFixed(0)}%`
    : `${pos ? '+' : ''}${Math.abs(delta) < 10 ? delta.toFixed(1) : Math.round(delta)}`
  return (
    <span className={`wsb-delta-badge ${pos ? 'positive' : 'negative'}`}>{label}</span>
  )
}

function StatRow({
  label,
  base,
  modified,
  unit = '',
  decimals = 0,
}: {
  label: string
  base: number
  modified: number
  unit?: string
  decimals?: number
}) {
  const delta = modified - base
  const changed = Math.abs(delta) > 0.009
  const display = (v: number) => decimals > 0 ? v.toFixed(decimals) : fmt(Math.round(v))

  return (
    <div className="wsb-statrow">
      <span className="wsb-statrow-label">{label}</span>
      <span className="wsb-statrow-values">
        {changed ? (
          <>
            <span className="wsb-statrow-base">{display(base)}{unit}</span>
            <span className="wsb-statrow-arrow">→</span>
            <span className={`wsb-statrow-modified ${delta > 0 ? 'positive' : 'negative'}`}>
              {display(modified)}{unit}
            </span>
            <DeltaBadge delta={delta} />
          </>
        ) : (
          <span className="wsb-statrow-value">{display(base)}{unit}</span>
        )}
      </span>
    </div>
  )
}

function TextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="wsb-statrow">
      <span className="wsb-statrow-label">{label}</span>
      <span className="wsb-statrow-value">{value}</span>
    </div>
  )
}

function EffectRow({ source, desc, tag }: { source: string; desc: string; tag: string }) {
  return (
    <div className="wsb-effect-row">
      <div className="wsb-effect-source">
        <span className={`wsb-effect-tag wsb-effect-tag-${tag}`}>{tag}</span>
        {source}
      </div>
      <div className="wsb-effect-desc">{desc}</div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ShipStats() {
  const { shipId, ammoId, attachmentIds, crewIds, supportIds } = useWsbStore()
  const ship = getShipById(shipId)
  if (!ship) return null

  const layout = parseWeaponSlots(ship.heavyWeapons)
  const d = computeDeltas(attachmentIds, crewIds, supportIds)

  const modDurability  = applyPctFlat(ship.durability,     d.durabilityPct, d.durability)
  const modSpeed       = applyPctFlat(ship.speed,          d.speedPct,      d.speedFlat)
  const modManeuver    = applyPctFlat(ship.maneuverability,d.maneuverPct,   d.maneuverFlat)
  const modArmor       = applyPctFlat(ship.broadsideArmor, d.armorPct,      d.armorFlat)
  const modCrew        = ship.crew + d.crewFlat
  const modHold        = applyPctFlat(ship.hold,           d.holdPct,       d.holdFlat)

  // Loadout effects list
  const effects: { source: string; desc: string; tag: string }[] = []
  const ammo = getAmmoById(ammoId)
  if (ammo && ammoId !== 'round_shot') effects.push({ source: ammo.name, desc: ammo.desc, tag: 'Ammo' })
  for (const id of attachmentIds) { const a = getAttachmentById(id); if (a) effects.push({ source: a.name, desc: a.desc, tag: 'Attachment' }) }
  for (const id of crewIds) { const c = getCrewById(id); if (c) effects.push({ source: c.name, desc: c.bonusDesc, tag: 'Crew' }) }
  for (const id of supportIds) { const s = getSupportById(id); if (s) effects.push({ source: s.name, desc: s.bonusDesc, tag: 'Support' }) }

  // Combat bonuses
  let totalDmgBonus = 0, totalReloadBonus = 0
  for (const id of attachmentIds) { const a = getAttachmentById(id); if (a) { totalDmgBonus += a.dmgBonus; totalReloadBonus += a.rateBonus } }
  for (const id of crewIds) { const c = getCrewById(id); if (c) { totalDmgBonus += c.dmgBonus; totalReloadBonus += c.reloadBonus } }
  for (const id of supportIds) { const s = getSupportById(id); if (s) { totalDmgBonus += s.dmgBonus; totalReloadBonus += s.reloadBonus } }

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">🚢 {ship.name} — Ship Overview</div>

      <div className="wsb-ship-overview-grid">

        {/* ── Left: Live stats ── */}
        <div className="wsb-ship-stats-col">
          <Section title="Combat Profile" />
          <TextRow label="Rate"  value={`Rate ${ship.rate}`} />
          <TextRow label="Type"  value={ship.shipType} />
          <StatRow label="Durability"      base={ship.durability}      modified={modDurability} />
          <StatRow label="Broadside Armor" base={ship.broadsideArmor}  modified={modArmor}      decimals={1} />
          <TextRow label="Weapon Slots"    value={`${layout.bow}B / ${layout.broadside}×2 / ${layout.stern}S`} />
          {ship.integrity   != null && <TextRow label="Integrity"   value={String(ship.integrity)} />}
          {ship.swivelGuns > 0      && <TextRow label="Swivel Guns" value={String(ship.swivelGuns)} />}

          <Section title="Handling" />
          <StatRow label="Speed"           base={ship.speed}           modified={modSpeed}    unit=" knt" decimals={1} />
          <StatRow label="Maneuverability" base={ship.maneuverability} modified={modManeuver} unit="%" />
          <StatRow label="Crew"            base={ship.crew}            modified={modCrew} />
          <StatRow label="Hold"            base={ship.hold}            modified={modHold}     unit=" t" />
          <TextRow label="Hull Dims"    value={ship.hullDims} />
          <TextRow label="Displacement" value={ship.displacement} />

          <Section title="Combat Bonuses" />
          <div className="wsb-statrow">
            <span className="wsb-statrow-label">Damage Bonus</span>
            <span className={`wsb-statrow-value ${totalDmgBonus > 0 ? 'positive' : totalDmgBonus < 0 ? 'negative' : ''}`}>
              {totalDmgBonus >= 0 ? '+' : ''}{(totalDmgBonus * 100).toFixed(0)}%
            </span>
          </div>
          <div className="wsb-statrow">
            <span className="wsb-statrow-label">Reload Bonus</span>
            <span className={`wsb-statrow-value ${totalReloadBonus > 0 ? 'positive' : totalReloadBonus < 0 ? 'negative' : ''}`}>
              {totalReloadBonus >= 0 ? '+' : ''}{(totalReloadBonus * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* ── Right: Loadout effects ── */}
        <div className="wsb-ship-loadout-col">
          <Section title="Active Loadout Effects" />
          {effects.length > 0 ? (
            <div className="wsb-effects-list">
              {effects.map((e, i) => <EffectRow key={i} {...e} />)}
            </div>
          ) : (
            <div className="wsb-no-loadout">
              No attachments, crew, or support equipped.<br />
              Add items above to see their effects here.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

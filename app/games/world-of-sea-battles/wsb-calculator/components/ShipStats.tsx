'use client'

import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { getShipById, parseWeaponSlots } from '@/lib/wsb/ships'
import { getAttachmentById } from '@/lib/wsb/attachments'
import { getCrewById } from '@/lib/wsb/crew'
import { getSupportById } from '@/lib/wsb/support'
import { getAmmoById } from '@/lib/wsb/ammo'
import { fmt } from '@/lib/wsb/calculator'

// ─── Stat row ─────────────────────────────────────────────────────────────────

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="wsb-statrow">
      <span className="wsb-statrow-label">{label}</span>
      <span className="wsb-statrow-value">{value}</span>
    </div>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────

function Section({ title }: { title: string }) {
  return <div className="wsb-stats-section-header">{title}</div>
}

// ─── Effect item ──────────────────────────────────────────────────────────────

function EffectRow({ source, desc, tag }: { source: string; desc: string; tag?: string }) {
  return (
    <div className="wsb-effect-row">
      <div className="wsb-effect-source">
        {tag && <span className={`wsb-effect-tag wsb-effect-tag-${tag}`}>{tag}</span>}
        {source}
      </div>
      <div className="wsb-effect-desc">{desc}</div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ShipStats() {
  const { shipId, ammoId, attachmentIds, crewIds, supportIds } = useWsbStore()
  const ship = getShipById(shipId)

  if (!ship) return null

  const layout = parseWeaponSlots(ship.heavyWeapons)
  const totalWeaponSlots = layout.bow + layout.broadside * 2 + layout.stern

  // Aggregate loadout effects
  const effects: { source: string; desc: string; tag: string }[] = []

  // Ammo
  const ammo = getAmmoById(ammoId)
  if (ammo && ammoId !== 'round_shot') {
    effects.push({ source: ammo.name, desc: ammo.desc, tag: 'Ammo' })
  }

  // Attachments
  for (const id of attachmentIds) {
    const att = getAttachmentById(id)
    if (att) effects.push({ source: att.name, desc: att.desc, tag: 'Attachment' })
  }

  // Crew
  for (const id of crewIds) {
    const crew = getCrewById(id)
    if (crew) effects.push({ source: crew.name, desc: crew.bonusDesc, tag: 'Crew' })
  }

  // Support
  for (const id of supportIds) {
    const sup = getSupportById(id)
    if (sup) effects.push({ source: sup.name, desc: sup.desc, tag: 'Support' })
  }

  // Numeric combat bonuses to show as modified stats
  let totalDmgBonus = 0
  let totalReloadBonus = 0
  for (const id of attachmentIds) {
    const a = getAttachmentById(id)
    if (a) { totalDmgBonus += a.dmgBonus; totalReloadBonus += a.rateBonus }
  }
  for (const id of crewIds) {
    const c = getCrewById(id)
    if (c) { totalDmgBonus += c.dmgBonus; totalReloadBonus += c.reloadBonus }
  }
  for (const id of supportIds) {
    const s = getSupportById(id)
    if (s) { totalDmgBonus += s.dmgBonus; totalReloadBonus += s.reloadBonus }
  }

  const hasLoadout = effects.length > 0

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        🚢 {ship.name} — Ship Overview
      </div>

      <div className="wsb-ship-overview-grid">

        {/* ── Left: Base stats ── */}
        <div className="wsb-ship-stats-col">
          <Section title="Combat Profile" />
          <StatRow label="Rate" value={`Rate ${ship.rate}`} />
          <StatRow label="Type" value={ship.shipType} />
          <StatRow label="Durability" value={fmt(ship.durability)} />
          <StatRow label="Broadside Armor" value={ship.broadsideArmor} />
          <StatRow label="Weapon Slots" value={`${layout.bow}B / ${layout.broadside}×2 / ${layout.stern}S`} />
          {ship.integrity && <StatRow label="Integrity" value={ship.integrity} />}
          {ship.swivelGuns > 0 && <StatRow label="Swivel Guns" value={ship.swivelGuns} />}

          <Section title="Handling" />
          <StatRow label="Speed" value={`${ship.speed} knt`} />
          <StatRow label="Maneuverability" value={`${ship.maneuverability}%`} />
          <StatRow label="Crew" value={ship.crew} />
          <StatRow label="Hold" value={`${fmt(ship.hold)} t`} />
          <StatRow label="Hull Dims" value={ship.hullDims} />
          <StatRow label="Displacement" value={ship.displacement} />
        </div>

        {/* ── Right: Loadout effects ── */}
        <div className="wsb-ship-loadout-col">
          <Section title="Loadout Effects" />

          {/* Numeric combat bonuses summary */}
          <div className="wsb-loadout-summary">
            <div className="wsb-loadout-summary-stat">
              <span className="wsb-loadout-summary-label">Damage Bonus</span>
              <span className={`wsb-loadout-summary-value ${totalDmgBonus > 0 ? 'positive' : totalDmgBonus < 0 ? 'negative' : 'neutral'}`}>
                {totalDmgBonus >= 0 ? '+' : ''}{(totalDmgBonus * 100).toFixed(0)}%
              </span>
            </div>
            <div className="wsb-loadout-summary-stat">
              <span className="wsb-loadout-summary-label">Reload Bonus</span>
              <span className={`wsb-loadout-summary-value ${totalReloadBonus > 0 ? 'positive' : totalReloadBonus < 0 ? 'negative' : 'neutral'}`}>
                {totalReloadBonus >= 0 ? '+' : ''}{(totalReloadBonus * 100).toFixed(0)}%
              </span>
            </div>
            <div className="wsb-loadout-summary-stat">
              <span className="wsb-loadout-summary-label">Items Equipped</span>
              <span className="wsb-loadout-summary-value neutral">
                {attachmentIds.length + crewIds.length + supportIds.length}
              </span>
            </div>
          </div>

          {hasLoadout ? (
            <div className="wsb-effects-list">
              {effects.map((e, i) => (
                <EffectRow key={i} source={e.source} desc={e.desc} tag={e.tag} />
              ))}
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

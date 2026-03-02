'use client'

import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { getShipById, parseWeaponSlots } from '@/lib/wsb/ships'
import { CANNONS, CANNON_CATEGORIES, getCannonById } from '@/lib/wsb/cannons'
import type { CannonSlot } from '@/lib/wsb/types'

// ─── Single cannon select ─────────────────────────────────────────────────────

function CannonSelect({
  value,
  onChange,
  position,
  placeholder = '— Empty —',
}: {
  value: string
  onChange: (id: string) => void
  position: CannonSlot['position']
  placeholder?: string
}) {
  const filtered = CANNONS.filter(c =>
    position === 'broadside' ? !c.bowSternOnly && !c.specialShipOnly : !c.specialShipOnly
  )
  const grouped = CANNON_CATEGORIES.reduce<Record<string, typeof CANNONS>>((acc, cat) => {
    const cats = filtered.filter(c => c.category === cat)
    if (cats.length) acc[cat] = cats
    return acc
  }, {})

  return (
    <select
      className="wsb-select"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ fontSize: '0.78rem' }}
    >
      <option value="none">{placeholder}</option>
      {Object.entries(grouped).map(([cat, cannons]) => (
        <optgroup key={cat} label={cat}>
          {cannons.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}{c.rank ? ` (${c.rank})` : ''}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}

// ─── Side panel (Port, Starboard, Bow, Stern) ─────────────────────────────────
// One dropdown fills ALL slots on this side simultaneously

function SidePanel({
  label,
  color,
  position,
  count,
  slots,
  onFill,
}: {
  label: string
  color: string
  position: CannonSlot['position']
  count: number
  slots: CannonSlot[]
  onFill: (cannonId: string) => void
}) {
  // Derive current value: if all slots have the same cannon show it, else 'none'
  const ids = slots.map(s => s.cannonId)
  const allSame = ids.length > 0 && ids.every(id => id === ids[0]) ? ids[0] : 'none'
  const cannon = getCannonById(allSame)

  if (count === 0) return (
    <div className="wsb-side-panel wsb-side-panel-empty">
      <div className="wsb-side-label" style={{ color }}>
        {label}
      </div>
      <div className="wsb-side-empty">No slots</div>
    </div>
  )

  return (
    <div className="wsb-side-panel">
      <div className="wsb-side-label" style={{ color }}>
        {label}
        <span className="wsb-side-count">{count} slots</span>
      </div>

      <CannonSelect
        value={allSame}
        onChange={onFill}
        position={position}
        placeholder="— Select cannon for all —"
      />

      {cannon && cannon.id !== 'none' && (
        <div className="wsb-cannon-slot-stats" style={{ marginTop: '0.4rem' }}>
          <span className="wsb-stat-chip">Dmg <span>{cannon.dmg}</span></span>
          <span className="wsb-stat-chip">Pen <span>{cannon.penetration}</span></span>
          <span className="wsb-stat-chip">Reload <span>{cannon.reloadTime}s</span></span>
          <span className="wsb-stat-chip">Rng <span>{cannon.rangeMin ? `${cannon.rangeMin}–` : ''}{cannon.range}m</span></span>
          {cannon.shots > 1 && <span className="wsb-stat-chip">×<span>{cannon.shots} shots</span></span>}
        </div>
      )}

      {cannon && cannon.id !== 'none' && (
        <div style={{ fontSize: '0.62rem', color: 'var(--gold-dim)', marginTop: '0.3rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>
          All {count} {label.toLowerCase()} cannons armed
        </div>
      )}
    </div>
  )
}

// ─── Ship centre card ─────────────────────────────────────────────────────────

function ShipCentre({
  ship,
  layout,
  armedSides,
}: {
  ship: NonNullable<ReturnType<typeof getShipById>>
  layout: { bow: number; broadside: number; stern: number }
  armedSides: number
  totalSides: number
}) {
  const total = (layout.bow > 0 ? 1 : 0) + (layout.broadside > 0 ? 2 : 0) + (layout.stern > 0 ? 1 : 0)
  return (
    <div className="wsb-bs-centre">
      <div className="wsb-bs-ship-icon">⛵</div>
      <div className="wsb-bs-ship-name">{ship.name}</div>
      <div className="wsb-bs-ship-rate">Rate {ship.rate} · {ship.shipType}</div>
      <div className="wsb-bs-ship-divider" />
      {layout.bow > 0 && <div className="wsb-bs-stat"><span>{layout.bow}</span> Bow</div>}
      {layout.broadside > 0 && <div className="wsb-bs-stat"><span>{layout.broadside}</span> per side</div>}
      {layout.stern > 0 && <div className="wsb-bs-stat"><span>{layout.stern}</span> Stern</div>}
      <div className="wsb-bs-ship-divider" />
      <div className="wsb-bs-armed">{armedSides}<span style={{ fontSize: '0.75rem', color: 'var(--cream-dim)' }}>/{total}</span></div>
      <div className="wsb-bs-armed-label">Sides Armed</div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BroadsideConfig() {
  const { shipId, cannonSlots, setCannonSlot, resetSlots } = useWsbStore()
  const ship = getShipById(shipId)
  const layout = ship ? parseWeaponSlots(ship.heavyWeapons) : { bow: 0, broadside: 0, stern: 0 }

  // Fill all slots for a given position with one cannon
  function fillSide(position: CannonSlot['position'], count: number, cannonId: string) {
    Array.from({ length: count }, (_, i) => setCannonSlot(position, i, cannonId))
  }

  // Get slots for a position
  function getSideSlots(position: CannonSlot['position'], count: number): CannonSlot[] {
    return Array.from({ length: count }, (_, i) => {
      const existing = cannonSlots.find(s => s.position === position && s.index === i)
      return existing ?? { position, index: i, cannonId: 'none' }
    })
  }

  // Count how many sides have all slots armed
  const bowSlots = getSideSlots('bow', layout.bow)
  const portSlots = getSideSlots('broadside', layout.broadside)
  const sternSlots = getSideSlots('stern', layout.stern)
  // starboard mirrors port cannon selection

  const bowArmed = layout.bow > 0 && bowSlots.every(s => s.cannonId !== 'none')
  const portArmed = layout.broadside > 0 && portSlots.every(s => s.cannonId !== 'none')
  const sternArmed = layout.stern > 0 && sternSlots.every(s => s.cannonId !== 'none')
  const armedSides = [bowArmed, portArmed, portArmed, sternArmed].filter(Boolean).length

  const totalSides = (layout.bow > 0 ? 1 : 0) + (layout.broadside > 0 ? 2 : 0) + (layout.stern > 0 ? 1 : 0)

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-panel-title-row">
          <span>💥 Broadside Configuration</span>
          {ship && (
            <button className="wsb-toggle-btn" onClick={resetSlots}>Clear All</button>
          )}
        </div>
      </div>

      {!ship ? (
        <div className="wsb-no-ship">⚓ Select a vessel above to configure your broadside.</div>
      ) : (
        <div className="wsb-bs-layout">

          {/* Bow row */}
          {layout.bow > 0 && (
            <div className="wsb-bs-top">
              <SidePanel
                label="Bow"
                color="#7aadcf"
                position="bow"
                count={layout.bow}
                slots={bowSlots}
                onFill={id => fillSide('bow', layout.bow, id)}
              />
            </div>
          )}

          {/* Middle: Port | Ship | Starboard */}
          <div className="wsb-bs-middle">
            <SidePanel
              label="Port"
              color="var(--cream-dim)"
              position="broadside"
              count={layout.broadside}
              slots={portSlots}
              onFill={id => fillSide('broadside', layout.broadside, id)}
            />

            <ShipCentre ship={ship} layout={layout} armedSides={armedSides} totalSides={totalSides} />

            {/* Starboard mirrors port — same cannon selection */}
            <div className="wsb-side-panel">
              <div className="wsb-side-label" style={{ color: 'var(--cream-dim)' }}>
                Starboard
                <span className="wsb-side-count">{layout.broadside} slots</span>
              </div>
              <div style={{
                padding: '0.6rem 0.75rem',
                background: 'var(--navy-mid)',
                border: '1px solid var(--gold-border)',
                borderRadius: '2px',
                fontSize: '0.75rem',
                color: 'var(--cream-dim)',
                fontStyle: 'italic',
              }}>
                {portSlots.every(s => s.cannonId !== 'none')
                  ? `Mirrors Port — ${getCannonById(portSlots[0]?.cannonId)?.name ?? '—'}`
                  : 'Mirrors Port selection'}
              </div>
              {portSlots.length > 0 && portSlots[0].cannonId !== 'none' && (() => {
                const cannon = getCannonById(portSlots[0].cannonId)
                return cannon && cannon.id !== 'none' ? (
                  <div className="wsb-cannon-slot-stats" style={{ marginTop: '0.4rem' }}>
                    <span className="wsb-stat-chip">Dmg <span>{cannon.dmg}</span></span>
                    <span className="wsb-stat-chip">Pen <span>{cannon.penetration}</span></span>
                    <span className="wsb-stat-chip">Reload <span>{cannon.reloadTime}s</span></span>
                  </div>
                ) : null
              })()}
            </div>
          </div>

          {/* Stern row */}
          {layout.stern > 0 && (
            <div className="wsb-bs-bottom">
              <SidePanel
                label="Stern"
                color="#cf9f7a"
                position="stern"
                count={layout.stern}
                slots={sternSlots}
                onFill={id => fillSide('stern', layout.stern, id)}
              />
            </div>
          )}

        </div>
      )}
    </div>
  )
}

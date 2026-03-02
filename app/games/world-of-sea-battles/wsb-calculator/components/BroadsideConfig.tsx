'use client'

import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { getShipById, parseWeaponSlots } from '@/lib/wsb/ships'
import { CANNONS, CANNON_CATEGORIES, getCannonById } from '@/lib/wsb/cannons'
import type { CannonSlot } from '@/lib/wsb/types'

// ─── Cannon select ────────────────────────────────────────────────────────────

function CannonSelect({
  value,
  onChange,
  position,
  placeholder = '— Select cannon —',
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

// ─── Side panel ───────────────────────────────────────────────────────────────

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
  const ids = slots.map(s => s.cannonId)
  const currentValue = ids.length > 0 && ids.every(id => id === ids[0]) ? ids[0] : 'none'
  const cannon = getCannonById(currentValue)

  if (count === 0) return (
    <div className="wsb-side-panel wsb-side-panel-empty">
      <div className="wsb-side-label" style={{ color }}>{label} <span className="wsb-side-count">0 slots</span></div>
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
        value={currentValue}
        onChange={onFill}
        position={position}
        placeholder="— Select cannon —"
      />

      {cannon && cannon.id !== 'none' && (
        <>
          <div className="wsb-cannon-slot-stats">
            <span className="wsb-stat-chip">Dmg <span>{cannon.dmg}</span></span>
            <span className="wsb-stat-chip">Pen <span>{cannon.penetration}</span></span>
            <span className="wsb-stat-chip">Reload <span>{cannon.reloadTime}s</span></span>
            <span className="wsb-stat-chip">Rng <span>{cannon.rangeMin ? `${cannon.rangeMin}–` : ''}{cannon.range}m</span></span>
            {cannon.shots > 1 && <span className="wsb-stat-chip">×<span>{cannon.shots}</span></span>}
          </div>
          <div style={{ fontSize: '0.62rem', color: 'var(--gold-dim)', fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>
            All {count} {label.toLowerCase()} cannons armed
          </div>
        </>
      )}
    </div>
  )
}

// ─── Ship centre card ─────────────────────────────────────────────────────────

function ShipCentre({ ship, layout }: {
  ship: NonNullable<ReturnType<typeof getShipById>>
  layout: { bow: number; broadside: number; stern: number }
}) {
  return (
    <div className="wsb-bs-centre">
      <div className="wsb-bs-ship-icon">⛵</div>
      <div className="wsb-bs-ship-name">{ship.name}</div>
      <div className="wsb-bs-ship-rate">Rate {ship.rate} · {ship.shipType}</div>
      <div className="wsb-bs-ship-divider" />
      {layout.bow > 0 && <div className="wsb-bs-stat"><span>{layout.bow}</span> Bow</div>}
      {layout.broadside > 0 && <div className="wsb-bs-stat"><span>{layout.broadside}</span> per side</div>}
      {layout.stern > 0 && <div className="wsb-bs-stat"><span>{layout.stern}</span> Stern</div>}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

// Starboard uses indices broadside..broadside*2-1 to keep them separate in the store
export default function BroadsideConfig() {
  const { shipId, cannonSlots, setCannonSlot, resetSlots } = useWsbStore()
  const ship = getShipById(shipId)
  const layout = ship ? parseWeaponSlots(ship.heavyWeapons) : { bow: 0, broadside: 0, stern: 0 }
  const n = layout.broadside

  function getSideSlots(position: CannonSlot['position'], start: number, count: number): CannonSlot[] {
    return Array.from({ length: count }, (_, i) => {
      const idx = start + i
      return cannonSlots.find(s => s.position === position && s.index === idx)
        ?? { position, index: idx, cannonId: 'none' }
    })
  }

  function fillSide(position: CannonSlot['position'], start: number, count: number, cannonId: string) {
    Array.from({ length: count }, (_, i) => setCannonSlot(position, start + i, cannonId))
  }

  const bowSlots      = getSideSlots('bow', 0, layout.bow)
  const portSlots     = getSideSlots('broadside', 0, n)
  const starboardSlots = getSideSlots('broadside', n, n)   // indices n..2n-1
  const sternSlots    = getSideSlots('stern', 0, layout.stern)

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-panel-title-row">
          <span>💥 Broadside Configuration</span>
          {ship && <button className="wsb-toggle-btn" onClick={resetSlots}>Clear All</button>}
        </div>
      </div>

      {!ship ? (
        <div className="wsb-no-ship">⚓ Select a vessel above to configure your broadside.</div>
      ) : (
        <div className="wsb-bs-layout">

          {layout.bow > 0 && (
            <div className="wsb-bs-top">
              <SidePanel
                label="Bow" color="#7aadcf" position="bow"
                count={layout.bow} slots={bowSlots}
                onFill={id => fillSide('bow', 0, layout.bow, id)}
              />
            </div>
          )}

          <div className="wsb-bs-middle">
            <SidePanel
              label="Port" color="var(--cream-dim)" position="broadside"
              count={n} slots={portSlots}
              onFill={id => fillSide('broadside', 0, n, id)}
            />

            <ShipCentre ship={ship} layout={layout} />

            <SidePanel
              label="Starboard" color="var(--cream-dim)" position="broadside"
              count={n} slots={starboardSlots}
              onFill={id => fillSide('broadside', n, n, id)}
            />
          </div>

          {layout.stern > 0 && (
            <div className="wsb-bs-bottom">
              <SidePanel
                label="Stern" color="#cf9f7a" position="stern"
                count={layout.stern} slots={sternSlots}
                onFill={id => fillSide('stern', 0, layout.stern, id)}
              />
            </div>
          )}

        </div>
      )}
    </div>
  )
}

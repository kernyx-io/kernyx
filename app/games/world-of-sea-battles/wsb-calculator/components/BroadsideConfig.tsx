'use client'

import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { getShipById, parseWeaponSlots } from '@/lib/wsb/ships'
import { CANNONS, CANNON_CATEGORIES, getCannonById } from '@/lib/wsb/cannons'
import type { CannonSlot } from '@/lib/wsb/types'

// ─── Cannon select dropdown ───────────────────────────────────────────────────

function CannonSelect({
  value,
  onChange,
  position,
}: {
  value: string
  onChange: (id: string) => void
  position: CannonSlot['position']
}) {
  const filtered = CANNONS.filter(c => {
    if (position === 'broadside') return !c.bowSternOnly && !c.specialShipOnly
    return !c.specialShipOnly
  })

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
      style={{ fontSize: '0.75rem' }}
    >
      <option value="none">— Empty —</option>
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

// ─── Single cannon slot card ──────────────────────────────────────────────────

function CannonSlotCard({
  position,
  index,
  cannonId,
  onChange,
  label,
}: {
  position: CannonSlot['position']
  index: number
  cannonId: string
  onChange: (id: string) => void
  label: string
}) {
  const cannon = getCannonById(cannonId)

  return (
    <div className="wsb-cannon-slot">
      <div className="wsb-cannon-slot-label">{label}</div>
      <CannonSelect value={cannonId} onChange={onChange} position={position} />
      {cannon && cannon.id !== 'none' && (
        <div className="wsb-cannon-slot-stats">
          <span className="wsb-stat-chip">Pen <span>{cannon.penetration}</span></span>
          <span className="wsb-stat-chip">Reload <span>{cannon.reloadTime}s</span></span>
          <span className="wsb-stat-chip">Rng <span>{cannon.rangeMin ? `${cannon.rangeMin}–` : ''}{cannon.range}m</span></span>
          {cannon.shots > 1 && <span className="wsb-stat-chip">×<span>{cannon.shots}</span></span>}
        </div>
      )}
    </div>
  )
}

// ─── Column of slots ──────────────────────────────────────────────────────────

function SlotColumn({
  position,
  count,
  slots,
  onSlotChange,
  header,
  color,
}: {
  position: CannonSlot['position']
  count: number
  slots: CannonSlot[]
  onSlotChange: (pos: CannonSlot['position'], idx: number, id: string) => void
  header: string
  color: string
}) {
  if (count === 0) return (
    <div className="wsb-bs-column wsb-bs-column-empty">
      <div className="wsb-bs-col-header" style={{ color }}>{header}</div>
      <div style={{ color: 'var(--cream-dim)', fontSize: '0.7rem', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>
        No {header.toLowerCase()} slots
      </div>
    </div>
  )

  return (
    <div className="wsb-bs-column">
      <div className="wsb-bs-col-header" style={{ color }}>{header}</div>
      <div className="wsb-bs-slots">
        {Array.from({ length: count }, (_, i) => {
          const slot = slots.find(s => s.position === position && s.index === i)
          return (
            <CannonSlotCard
              key={`${position}-${i}`}
              position={position}
              index={i}
              cannonId={slot?.cannonId ?? 'none'}
              onChange={id => onSlotChange(position, i, id)}
              label={`${header} ${i + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Ship silhouette centre panel ─────────────────────────────────────────────

function ShipCentre({ ship, layout, armedCount }: {
  ship: NonNullable<ReturnType<typeof getShipById>>
  layout: { bow: number; broadside: number; stern: number }
  armedCount: number
}) {
  const total = layout.bow + layout.broadside + layout.stern
  return (
    <div className="wsb-bs-centre">
      <div className="wsb-bs-ship-icon">⛵</div>
      <div className="wsb-bs-ship-name">{ship.name}</div>
      <div className="wsb-bs-ship-rate">Rate {ship.rate}</div>
      <div className="wsb-bs-ship-divider" />
      <div className="wsb-bs-stat"><span>{layout.bow}</span> Bow</div>
      <div className="wsb-bs-stat"><span>{layout.broadside}</span> Broadside</div>
      <div className="wsb-bs-stat"><span>{layout.stern}</span> Stern</div>
      <div className="wsb-bs-ship-divider" />
      <div className="wsb-bs-armed">{armedCount} / {total}</div>
      <div className="wsb-bs-armed-label">Armed</div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BroadsideConfig() {
  const { shipId, cannonSlots, setCannonSlot, resetSlots } = useWsbStore()
  const ship = getShipById(shipId)
  const layout = ship ? parseWeaponSlots(ship.heavyWeapons) : { bow: 0, broadside: 0, stern: 0 }

  const armedCount = cannonSlots.filter(s => s.cannonId !== 'none').length

  // Split broadside evenly: port = first half, starboard = second half
  const portCount = Math.ceil(layout.broadside / 2)
  const starboardCount = Math.floor(layout.broadside / 2)

  // Port slots = indices 0..portCount-1, starboard = portCount..broadside-1
  const portSlots = cannonSlots
    .filter(s => s.position === 'broadside' && s.index < portCount)
  const starboardSlots = cannonSlots
    .filter(s => s.position === 'broadside' && s.index >= portCount)
    .map(s => ({ ...s, index: s.index - portCount }))

  function handlePortChange(pos: CannonSlot['position'], idx: number, id: string) {
    setCannonSlot('broadside', idx, id)
  }
  function handleStarboardChange(pos: CannonSlot['position'], idx: number, id: string) {
    setCannonSlot('broadside', idx + portCount, id)
  }

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

          {/* Bow column (top) */}
          {layout.bow > 0 && (
            <div className="wsb-bs-top">
              <SlotColumn
                position="bow"
                count={layout.bow}
                slots={cannonSlots}
                onSlotChange={setCannonSlot}
                header="Bow"
                color="#7aadcf"
              />
            </div>
          )}

          {/* Middle row: Port | Ship | Starboard */}
          <div className="wsb-bs-middle">
            <SlotColumn
              position="broadside"
              count={portCount}
              slots={portSlots}
              onSlotChange={handlePortChange}
              header="Port"
              color="var(--cream-dim)"
            />

            <ShipCentre ship={ship} layout={layout} armedCount={armedCount} />

            <SlotColumn
              position="broadside"
              count={starboardCount}
              slots={starboardSlots}
              onSlotChange={handleStarboardChange}
              header="Starboard"
              color="var(--cream-dim)"
            />
          </div>

          {/* Stern column (bottom) */}
          {layout.stern > 0 && (
            <div className="wsb-bs-bottom">
              <SlotColumn
                position="stern"
                count={layout.stern}
                slots={cannonSlots}
                onSlotChange={setCannonSlot}
                header="Stern"
                color="#cf9f7a"
              />
            </div>
          )}

        </div>
      )}
    </div>
  )
}

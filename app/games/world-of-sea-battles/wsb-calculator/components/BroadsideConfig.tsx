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
  // Filter cannons valid for this position
  const filtered = CANNONS.filter(c => {
    if (c.id === 'none') return true
    if (position === 'broadside') return !c.bowSternOnly && !c.specialShipOnly
    // bow or stern: include bowSternOnly, exclude broadside-only (none marked as such)
    return !c.specialShipOnly
  })

  const grouped = CANNON_CATEGORIES.reduce<Record<string, typeof CANNONS>>((acc, cat) => {
    const cats = filtered.filter(c => c.category === cat)
    if (cats.length) acc[cat] = cats
    return acc
  }, {})

  const selected = getCannonById(value)

  return (
    <select
      className="wsb-select"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ fontSize: '0.78rem' }}
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

// ─── Single cannon slot ───────────────────────────────────────────────────────

function CannonSlotCard({
  position,
  index,
  cannonId,
  onChange,
}: {
  position: CannonSlot['position']
  index: number
  cannonId: string
  onChange: (id: string) => void
}) {
  const cannon = getCannonById(cannonId)
  const posLabel = position === 'bow' ? 'Bow' : position === 'stern' ? 'Stern' : 'Broadside'
  const slotLabel = `${posLabel} ${index + 1}`

  return (
    <div className="wsb-cannon-slot">
      <div className="wsb-cannon-slot-label">{slotLabel}</div>
      <CannonSelect value={cannonId} onChange={onChange} position={position} />
      {cannon && cannon.id !== 'none' && (
        <div className="wsb-cannon-slot-stats">
          <span className="wsb-stat-chip">Pen <span>{cannon.penetration}</span></span>
          <span className="wsb-stat-chip">Reload <span>{cannon.reloadTime}s</span></span>
          <span className="wsb-stat-chip">Range <span>{cannon.rangeMin ? `${cannon.rangeMin}–` : ''}{cannon.range}m</span></span>
          {cannon.shots > 1 && (
            <span className="wsb-stat-chip">×<span>{cannon.shots}</span></span>
          )}
          {cannon.bowSternOnly && (
            <span className="wsb-stat-chip" style={{ color: 'var(--gold-dim)' }}>Bow/Stern only</span>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Position section ─────────────────────────────────────────────────────────

function PositionSection({
  position,
  count,
  slots,
  onSlotChange,
}: {
  position: CannonSlot['position']
  count: number
  slots: CannonSlot[]
  onSlotChange: (position: CannonSlot['position'], index: number, cannonId: string) => void
}) {
  if (count === 0) return null
  const label = position === 'bow' ? '⬆ Bow Weapons' : position === 'stern' ? '⬇ Stern Weapons' : '⬛ Broadside Weapons'

  return (
    <div className="wsb-broadside-section">
      <div className="wsb-broadside-section-label">{label}</div>
      <div className="wsb-cannon-slots">
        {Array.from({ length: count }, (_, i) => {
          const slot = slots.find(s => s.position === position && s.index === i)
          return (
            <CannonSlotCard
              key={`${position}-${i}`}
              position={position}
              index={i}
              cannonId={slot?.cannonId ?? 'none'}
              onChange={(id) => onSlotChange(position, i, id)}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BroadsideConfig() {
  const { shipId, cannonSlots, setCannonSlot, resetSlots } = useWsbStore()
  const ship = getShipById(shipId)
  const layout = ship ? parseWeaponSlots(ship.heavyWeapons) : { bow: 0, broadside: 0, stern: 0 }
  const totalSlots = layout.bow + layout.broadside + layout.stern

  // Summary stats
  const armedSlots = cannonSlots.filter(s => s.cannonId !== 'none')
  const armedCount = armedSlots.length

  // Quick-fill: set all broadside slots to a given cannon
  function fillAll(cannonId: string) {
    ;(['bow', 'broadside', 'stern'] as const).forEach(pos => {
      const count = layout[pos === 'bow' ? 'bow' : pos === 'stern' ? 'stern' : 'broadside']
      Array.from({ length: count }, (_, i) => setCannonSlot(pos, i, cannonId))
    })
  }

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-panel-title-row">
          <span>💥 Broadside Configuration</span>
          {ship && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                className="wsb-toggle-btn"
                onClick={resetSlots}
                title="Clear all cannon slots"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {!ship ? (
        <div className="wsb-no-ship">⚓ Select a vessel above to configure your broadside.</div>
      ) : (
        <div className="wsb-broadside-grid">
          <PositionSection
            position="bow"
            count={layout.bow}
            slots={cannonSlots}
            onSlotChange={setCannonSlot}
          />
          <PositionSection
            position="broadside"
            count={layout.broadside}
            slots={cannonSlots}
            onSlotChange={setCannonSlot}
          />
          <PositionSection
            position="stern"
            count={layout.stern}
            slots={cannonSlots}
            onSlotChange={setCannonSlot}
          />

          {/* Summary bar */}
          <div className="wsb-broadside-summary">
            <div className="wsb-summary-stat">
              <div className="wsb-summary-stat-value">{totalSlots}</div>
              <div className="wsb-summary-stat-label">Total Slots</div>
            </div>
            <div className="wsb-summary-stat">
              <div className="wsb-summary-stat-value">{armedCount}</div>
              <div className="wsb-summary-stat-label">Armed</div>
            </div>
            <div className="wsb-summary-stat">
              <div className="wsb-summary-stat-value">{layout.bow + layout.stern}</div>
              <div className="wsb-summary-stat-label">Bow / Stern</div>
            </div>
            <div className="wsb-summary-stat">
              <div className="wsb-summary-stat-value">{layout.broadside}</div>
              <div className="wsb-summary-stat-label">Broadside</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

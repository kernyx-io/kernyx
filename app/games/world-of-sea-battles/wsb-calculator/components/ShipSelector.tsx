'use client'

import './calculator.css'
import type { Ship } from '@/lib/wsb/types'
import { parseWeaponSlots } from '@/lib/wsb/ships'

interface ShipSelectorProps {
  label: string
  icon: string
  title: string
  caption: string
  value: string
  onChange: (id: string) => void
  ships: Ship[]
  variant: 'player' | 'target'
}

const RATE_LABELS: Record<number, string> = {
  1: 'Rate I', 2: 'Rate II', 3: 'Rate III', 4: 'Rate IV',
  5: 'Rate V',  6: 'Rate VI', 7: 'Rate VII',
}

// Group ships by rate for optgroups
function groupByRate(ships: Ship[]): Record<number, Ship[]> {
  return ships.reduce<Record<number, Ship[]>>((acc, ship) => {
    const r = ship.rate
    if (!acc[r]) acc[r] = []
    acc[r].push(ship)
    return acc
  }, {})
}

function ShipCard({ ship, variant }: { ship: Ship; variant: 'player' | 'target' }) {
  const layout = parseWeaponSlots(ship.heavyWeapons)
  const totalSlots = layout.bow + layout.broadside + layout.stern

  return (
    <div className="wsb-vessel-card">
      <div className="wsb-vessel-card-name">{ship.name}</div>
      <div className="wsb-vessel-tags">
        <span className="wsb-tag wsb-tag-rate">Rate {ship.rate}</span>
        <span className="wsb-tag wsb-tag-type">{ship.shipType}</span>
        <span className="wsb-tag wsb-tag-slots">{totalSlots} weapon slots</span>
      </div>
      <div className="wsb-vessel-stats">
        <div className="wsb-stat-row">
          <span className="wsb-stat-key">Durability</span>
          <span className="wsb-stat-val">{ship.durability.toLocaleString()}</span>
        </div>
        <div className="wsb-stat-row">
          <span className="wsb-stat-key">Speed</span>
          <span className="wsb-stat-val">{ship.speed} knt</span>
        </div>
        <div className="wsb-stat-row">
          <span className="wsb-stat-key">Maneuverability</span>
          <span className="wsb-stat-val">{ship.maneuverability}%</span>
        </div>
        <div className="wsb-stat-row">
          <span className="wsb-stat-key">Broadside Armor</span>
          <span className={`wsb-stat-val ${variant === 'target' ? 'negative' : 'gold'}`}>
            {ship.broadsideArmor}
          </span>
        </div>
        <div className="wsb-stat-row">
          <span className="wsb-stat-key">Crew</span>
          <span className="wsb-stat-val">{ship.crew}</span>
        </div>
        <div className="wsb-stat-row">
          <span className="wsb-stat-key">Hold</span>
          <span className="wsb-stat-val">{ship.hold.toLocaleString()}</span>
        </div>
      </div>
      <div className="wsb-vessel-weapons">
        <strong>Weapons:</strong>{' '}
        {ship.heavyWeapons === '—' ? '—' : (
          <>
            {layout.bow > 0 && <span>{layout.bow} bow · </span>}
            {layout.broadside > 0 && <span>{layout.broadside} broadside · </span>}
            {layout.stern > 0 && <span>{layout.stern} stern</span>}
          </>
        )}
        {ship.swivelGuns > 0 && <span> · {ship.swivelGuns} swivel</span>}
      </div>
      {ship.info && (
        <div className="wsb-vessel-info">{ship.info}</div>
      )}
    </div>
  )
}

export default function ShipSelector({
  label, icon, title, caption, value, onChange, ships, variant,
}: ShipSelectorProps) {
  const grouped = groupByRate(ships.filter(s => s.id !== 'none'))
  const selected = ships.find(s => s.id === value)

  return (
    <div className="wsb-panel">
      <div className="wsb-panel-title">
        <span>{icon}</span> {title}
      </div>

      <p style={{
        fontSize: '0.72rem',
        color: 'var(--cream-dim)',
        fontStyle: 'italic',
        marginBottom: '0.75rem',
        lineHeight: 1.5,
      }}>
        {caption}
      </p>

      <label className="wsb-label" htmlFor={`ship-select-${variant}`}>{label}</label>
      <select
        id={`ship-select-${variant}`}
        className="wsb-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="none">— Select a vessel —</option>
        {Object.entries(grouped)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([rate, rateShips]) => (
            <optgroup key={rate} label={RATE_LABELS[Number(rate)] ?? `Rate ${rate}`}>
              {rateShips.map(ship => (
                <option key={ship.id} value={ship.id}>{ship.name}</option>
              ))}
            </optgroup>
          ))
        }
      </select>

      {selected && selected.id !== 'none' ? (
        <ShipCard ship={selected} variant={variant} />
      ) : (
        <div className="wsb-vessel-card">
          <div className="wsb-vessel-empty">
            {variant === 'player'
              ? '⚓ Select a vessel to preview its class, broadside profile, and base handling stats.'
              : '⚓ Select an enemy ship to compare its broadside armour, durability, speed, and crew profile.'
            }
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { getShipById } from '@/lib/wsb/ships'

function StatRow({
  label,
  value,
  unit = '',
  className = '',
}: {
  label: string
  value: string | number
  unit?: string
  className?: string
}) {
  return (
    <div className="wsb-stat-row">
      <span className="wsb-stat-key">{label}</span>
      <span className={`wsb-stat-val ${className}`}>
        {value}{unit}
      </span>
    </div>
  )
}

export default function ShipStats() {
  const { shipId, targetShipId } = useWsbStore()
  const player = getShipById(shipId)
  const target = getShipById(targetShipId)

  if (!player && !target) return null

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">📊 Ship Statistics Comparison</div>

      <div className="wsb-stats-grid">
        {/* ── Player ship ─────────────────────────────────────────────────── */}
        {player && (
          <div>
            <div className="wsb-ship-name-header">
              🚢 <span>{player.name}</span>
            </div>
            <div className="wsb-stats-section-title">Combat Profile</div>
            <StatRow label="Rate" value={`Rate ${player.rate}`} className="gold" />
            <StatRow label="Type" value={player.shipType} />
            <StatRow label="Durability" value={player.durability.toLocaleString()} className="positive" />
            <StatRow label="Broadside Armor" value={player.broadsideArmor} className="gold" />
            <StatRow label="Weapon Slots" value={player.slots} />
            {player.integrity !== null && (
              <StatRow label="Integrity" value={player.integrity} />
            )}

            <div className="wsb-stats-section-title" style={{ marginTop: '1rem' }}>Handling</div>
            <StatRow label="Speed" value={player.speed} unit=" knt" />
            <StatRow label="Maneuverability" value={player.maneuverability} unit="%" />
            <StatRow label="Crew" value={player.crew} />
            <StatRow label="Hold" value={player.hold.toLocaleString()} unit=" t" />
            <StatRow label="Hull Dims" value={player.hullDims} />
            <StatRow label="Displacement" value={player.displacement} />
            <StatRow label="Swivel Guns" value={player.swivelGuns} />
          </div>
        )}

        {/* ── Target ship ──────────────────────────────────────────────────── */}
        {target && (
          <div>
            <div className="wsb-ship-name-header">
              🎯 <span>{target.name}</span>
            </div>
            <div className="wsb-stats-section-title">Combat Profile</div>
            <StatRow label="Rate" value={`Rate ${target.rate}`} className="gold" />
            <StatRow label="Type" value={target.shipType} />
            <StatRow label="Durability" value={target.durability.toLocaleString()} className="negative" />
            <StatRow label="Broadside Armor" value={target.broadsideArmor} className="negative" />
            <StatRow label="Weapon Slots" value={target.slots} />
            {target.integrity !== null && (
              <StatRow label="Integrity" value={target.integrity} />
            )}

            <div className="wsb-stats-section-title" style={{ marginTop: '1rem' }}>Handling</div>
            <StatRow label="Speed" value={target.speed} unit=" knt" />
            <StatRow label="Maneuverability" value={target.maneuverability} unit="%" />
            <StatRow label="Crew" value={target.crew} />
            <StatRow label="Hold" value={target.hold.toLocaleString()} unit=" t" />
            <StatRow label="Hull Dims" value={target.hullDims} />
            <StatRow label="Displacement" value={target.displacement} />
            <StatRow label="Swivel Guns" value={target.swivelGuns} />

            {/* Estimated volleys to sink */}
            {player && (
              <>
                <div className="wsb-stats-section-title" style={{ marginTop: '1rem' }}>Engagement Estimate</div>
                <StatRow
                  label="Armor reduction / shot"
                  value={`-${target.broadsideArmor}`}
                  className="negative"
                />
                <StatRow
                  label="Durability"
                  value={target.durability.toLocaleString()}
                  className="negative"
                />
              </>
            )}
          </div>
        )}

        {/* If only one side selected, fill with placeholder */}
        {player && !target && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--cream-dim)',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            padding: '2rem',
          }}>
            Select a target vessel above to compare stats side-by-side.
          </div>
        )}
        {!player && target && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--cream-dim)',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            padding: '2rem',
          }}>
            Select your vessel above to compare stats side-by-side.
          </div>
        )}
      </div>
    </div>
  )
}

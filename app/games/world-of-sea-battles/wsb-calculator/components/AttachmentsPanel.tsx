'use client'

import { useState } from 'react'
import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { ATTACHMENTS } from '@/lib/wsb/attachments'

const CATEGORY_ORDER = [
  'Sails',
  'Speed',
  'Expeditionary',
  'Protection',
  'Combat',
  'Unusual',
  'Mortar',
]

const CATEGORY_MAP: Record<string, string> = {
  cheap_sails: 'Sails', stitched_sails: 'Sails', elite_sails: 'Sails', tarpaulin_sails: 'Sails',
  reinforced_masts: 'Speed', maneuverable_helm: 'Speed', lightweight_hull: 'Speed',
  small_hooks: 'Expeditionary', sturdy_frames: 'Expeditionary', combat_crows_nest: 'Expeditionary',
  double_hold: 'Expeditionary', extra_ballast: 'Expeditionary', cellars: 'Expeditionary', extra_bunks: 'Expeditionary',
  repair_arsenal: 'Protection', copper_plating: 'Protection', iron_ram: 'Protection',
  fortified_gun_ports: 'Protection', iron_plating: 'Protection', teak_frames: 'Protection',
  advanced_gun_carriages: 'Combat', upper_deck: 'Combat', ammunition_cradles: 'Combat',
  incendiary_mixture: 'Combat', fortified_ports: 'Combat', combat_arsenal: 'Combat', reinforced_cannons: 'Combat',
  strong_beams: 'Unusual', high_helm_port: 'Unusual', portable_chest: 'Unusual',
  structural_expansion: 'Unusual', emergency_powder_charge: 'Unusual',
  long_range_mortars: 'Mortar', swivel_mortars: 'Mortar', reinforced_centre_line: 'Mortar', lightweight_construction: 'Mortar',
}

const SAIL_IDS = new Set(['cheap_sails', 'stitched_sails', 'elite_sails', 'tarpaulin_sails'])

export default function AttachmentsPanel() {
  const { attachmentIds, toggleAttachment } = useWsbStore()
  const [collapsed, setCollapsed] = useState(false)

  const sailCount = attachmentIds.filter(id => SAIL_IDS.has(id)).length
  const generalCount = attachmentIds.filter(id => !SAIL_IDS.has(id)).length

  // Group by category
  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof ATTACHMENTS>>((acc, cat) => {
    acc[cat] = ATTACHMENTS.filter(a => CATEGORY_MAP[a.id] === cat)
    return acc
  }, {})

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-panel-title-row">
          <span>⚙️ Attachments</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--cream-dim)', fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}>
              Sail: {sailCount}/1 · General: {generalCount}/5
            </span>
            <button className="wsb-toggle-btn" onClick={() => setCollapsed(c => !c)}>
              {collapsed ? 'Expand' : 'Shrink'}
            </button>
          </div>
        </div>
      </div>

      {!collapsed && (
        <div className="wsb-items-grid">
          {CATEGORY_ORDER.map(cat => (
            grouped[cat]?.length ? (
              <>
                <div key={`label-${cat}`} className="wsb-group-label">{cat}</div>
                {grouped[cat].map(att => {
                  const isSail = SAIL_IDS.has(att.id)
                  const isActive = attachmentIds.includes(att.id)
                  const isDisabled = !isActive && (
                    isSail ? sailCount >= 1 : generalCount >= 5
                  )

                  return (
                    <div
                      key={att.id}
                      className={`wsb-item-card${isActive ? ' active' : ''}${isDisabled ? ' disabled' : ''}`}
                      onClick={() => !isDisabled && toggleAttachment(att.id, att.slotType)}
                      role="button"
                      tabIndex={isDisabled ? -1 : 0}
                      onKeyDown={e => e.key === 'Enter' && !isDisabled && toggleAttachment(att.id, att.slotType)}
                      title={isDisabled ? `Max ${isSail ? '1 sail' : '5 general'} slot${isSail ? '' : 's'} reached` : undefined}
                    >
                      <div className="wsb-item-name">{att.name}</div>
                      <div className="wsb-item-tags">
                        <span className={`wsb-item-tag slot-${att.slotType}`}>
                          {isSail ? 'Sail slot' : 'General'}
                        </span>
                        {att.dmgBonus !== 0 && (
                          <span className="wsb-item-tag bonus-dmg">
                            +{(att.dmgBonus * 100).toFixed(0)}% dmg
                          </span>
                        )}
                        {att.rateBonus !== 0 && (
                          <span className="wsb-item-tag bonus-reload">
                            +{(att.rateBonus * 100).toFixed(0)}% reload
                          </span>
                        )}
                      </div>
                      <div className="wsb-item-desc">{att.desc}</div>
                    </div>
                  )
                })}
              </>
            ) : null
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { CREW, CREW_FACTIONS, getCrewById } from '@/lib/wsb/crew'

export default function CrewPanel() {
  const { crewIds, toggleCrew } = useWsbStore()
  const [collapsed, setCollapsed] = useState(false)

  const selectedCrew = crewIds.map(id => getCrewById(id)).filter(Boolean)

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-panel-title-row">
          <span>
            👥 Crew Selection{' '}
            <span style={{
              fontFamily: "'IM Fell English', serif",
              fontSize: '0.78rem',
              fontStyle: 'italic',
              color: 'var(--cream-dim)',
              letterSpacing: 0,
              textTransform: 'none',
            }}>
              — Select up to 4
            </span>
          </span>
          <button className="wsb-toggle-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? 'Expand' : 'Shrink'}
          </button>
        </div>
      </div>

      {/* Active crew bar */}
      <div className="wsb-selected-bar">
        <span className="wsb-selected-label">Active Crew</span>
        {Array.from({ length: 4 }, (_, i) => {
          const member = selectedCrew[i]
          return (
            <span
              key={i}
              className={`wsb-slot-pill${member ? ' filled' : ''}`}
              onClick={() => member && toggleCrew(member.id)}
              style={{ cursor: member ? 'pointer' : 'default' }}
              title={member ? `Remove ${member.name}` : undefined}
            >
              {member ? member.name : 'Empty'}
            </span>
          )
        })}
        <span className="wsb-count-badge">{crewIds.length} / 4 slots filled</span>
      </div>

      {!collapsed && (
        <div className="wsb-items-grid">
          {CREW_FACTIONS.map(faction => {
            const factionCrew = CREW.filter(c => c.faction === faction)
            return (
              <>
                <div key={`label-${faction}`} className="wsb-group-label">{faction}</div>
                {factionCrew.map(member => {
                  const isActive = crewIds.includes(member.id)
                  const isDisabled = !isActive && crewIds.length >= 4

                  return (
                    <div
                      key={member.id}
                      className={`wsb-item-card${isActive ? ' active' : ''}${isDisabled ? ' disabled' : ''}`}
                      onClick={() => !isDisabled && toggleCrew(member.id)}
                      role="button"
                      tabIndex={isDisabled ? -1 : 0}
                      onKeyDown={e => e.key === 'Enter' && !isDisabled && toggleCrew(member.id)}
                      title={isDisabled ? 'Max 4 crew slots reached' : undefined}
                    >
                      <div className="wsb-item-name">{member.name}</div>

                      <div className="wsb-item-tags">
                        {member.types.map(t => (
                          <span key={t} className="wsb-item-tag">{t}</span>
                        ))}
                        {member.dmgBonus !== 0 && (
                          <span className="wsb-item-tag bonus-dmg">
                            +{(member.dmgBonus * 100).toFixed(0)}% dmg
                          </span>
                        )}
                        {member.reloadBonus !== 0 && (
                          <span className="wsb-item-tag bonus-reload">
                            +{(member.reloadBonus * 100).toFixed(0)}% reload
                          </span>
                        )}
                      </div>

                      <div className="wsb-item-desc">{member.bonusDesc}</div>
                    </div>
                  )
                })}
              </>
            )
          })}
        </div>
      )}
    </div>
  )
}

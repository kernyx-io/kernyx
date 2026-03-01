'use client'

import { useState } from 'react'
import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import type { AmmoType } from '@/lib/wsb/types'

const AMMO_ICONS: Record<string, string> = {
  round:  '🔵',
  heated: '🔥',
  bar:    '⛓️',
  grape:  '💀',
  heavy:  '⚫',
  saxon:  '💠',
}

const SPECIAL_LABELS: Record<string, string> = {
  fire:   '🔥 Fire',
  slow:   '⚓ Slow',
  pierce: '➤ Pierce',
}

interface AmmoPanelProps {
  ammoTypes: AmmoType[]
}

export default function AmmoPanel({ ammoTypes }: AmmoPanelProps) {
  const { ammoId, setAmmo } = useWsbStore()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-panel-title-row">
          <span>🎯 Ammunition Type</span>
          <button className="wsb-toggle-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? 'Expand' : 'Shrink'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="wsb-ammo-grid">
          {ammoTypes.map(ammo => {
            const isActive = ammoId === ammo.id
            const hullPct = Math.round(ammo.hullDmgPct * 100)

            return (
              <div
                key={ammo.id}
                className={`wsb-ammo-card${isActive ? ' active' : ''}`}
                onClick={() => setAmmo(ammo.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setAmmo(ammo.id)}
              >
                <div className="wsb-ammo-icon">{AMMO_ICONS[ammo.id] ?? '💣'}</div>
                <div className="wsb-ammo-name">{ammo.name}</div>
                <div
                  className="wsb-ammo-pct"
                  style={{
                    color: hullPct >= 100
                      ? 'var(--gold-bright)'
                      : hullPct >= 80
                      ? 'var(--cream)'
                      : 'var(--cream-dim)',
                  }}
                >
                  {hullPct}% hull dmg
                </div>

                <div className="wsb-ammo-bars">
                  <div className="wsb-ammo-bar-row">
                    <span style={{ width: '2.5rem' }}>Sails</span>
                    <div className="wsb-ammo-bar-track">
                      <div
                        className="wsb-ammo-bar-fill"
                        style={{
                          width: `${(ammo.sailsDmg / 3) * 100}%`,
                          background:
                            ammo.sailsDmg >= 3
                              ? 'var(--red-light)'
                              : ammo.sailsDmg >= 2
                              ? 'var(--gold-dim)'
                              : 'var(--navy-light)',
                        }}
                      />
                    </div>
                  </div>
                  <div className="wsb-ammo-bar-row">
                    <span style={{ width: '2.5rem' }}>Crew</span>
                    <div className="wsb-ammo-bar-track">
                      <div
                        className="wsb-ammo-bar-fill"
                        style={{
                          width: `${(ammo.crewDmg / 3) * 100}%`,
                          background:
                            ammo.crewDmg >= 3
                              ? 'var(--red-light)'
                              : ammo.crewDmg >= 2
                              ? 'var(--gold-dim)'
                              : 'var(--navy-light)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="wsb-ammo-desc">{ammo.desc}</div>

                {ammo.special && (
                  <div className="wsb-ammo-special">
                    {SPECIAL_LABELS[ammo.special] ?? ammo.special}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import './calculator.css'
import { useWsbStore } from '@/lib/wsb/store'
import { SUPPORT_ITEMS, SUPPORT_GROUPS, getSupportById } from '@/lib/wsb/support'

export default function SupportPanel() {
  const { supportIds, toggleSupport } = useWsbStore()
  const [collapsed, setCollapsed] = useState(false)

  const selectedItems = supportIds.map(id => getSupportById(id)).filter(Boolean)

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-panel-title-row">
          <span>
            🧪 Support Items{' '}
            <span style={{
              fontFamily: "'IM Fell English', serif",
              fontSize: '0.78rem',
              fontStyle: 'italic',
              color: 'var(--cream-dim)',
              letterSpacing: 0,
              textTransform: 'none',
            }}>
              — Select up to 3
            </span>
          </span>
          <button className="wsb-toggle-btn" onClick={() => setCollapsed(c => !c)}>
            {collapsed ? 'Expand' : 'Shrink'}
          </button>
        </div>
      </div>

      {/* Active items bar */}
      <div className="wsb-selected-bar">
        <span className="wsb-selected-label">Active Items</span>
        {Array.from({ length: 3 }, (_, i) => {
          const item = selectedItems[i]
          return (
            <span
              key={i}
              className={`wsb-slot-pill${item ? ' filled' : ''}`}
              onClick={() => item && toggleSupport(item.id)}
              style={{ cursor: item ? 'pointer' : 'default' }}
              title={item ? `Remove ${item.name}` : undefined}
            >
              {item ? item.name : 'Empty'}
            </span>
          )
        })}
        <span className="wsb-count-badge">{supportIds.length} / 3 slots filled</span>
      </div>

      {!collapsed && (
        <div className="wsb-items-grid">
          {SUPPORT_GROUPS.map(group => {
            const groupItems = SUPPORT_ITEMS.filter(s => s.group === group)
            return (
              <>
                <div key={`label-${group}`} className="wsb-group-label">{group}</div>
                {groupItems.map(item => {
                  const isActive = supportIds.includes(item.id)
                  const isDisabled = !isActive && supportIds.length >= 3

                  return (
                    <div
                      key={item.id}
                      className={`wsb-item-card${isActive ? ' active' : ''}${isDisabled ? ' disabled' : ''}`}
                      onClick={() => !isDisabled && toggleSupport(item.id)}
                      role="button"
                      tabIndex={isDisabled ? -1 : 0}
                      onKeyDown={e => e.key === 'Enter' && !isDisabled && toggleSupport(item.id)}
                      title={isDisabled ? 'Max 3 support slots reached' : undefined}
                    >
                      <div className="wsb-item-name">{item.name}</div>

                      <div className="wsb-item-tags">
                        {item.types.map(t => (
                          <span key={t} className="wsb-item-tag">{t}</span>
                        ))}
                        {item.dmgBonus !== 0 && (
                          <span className="wsb-item-tag bonus-dmg">
                            +{(item.dmgBonus * 100).toFixed(0)}% dmg
                          </span>
                        )}
                        {item.reloadBonus !== 0 && (
                          <span className="wsb-item-tag bonus-reload">
                            {item.reloadBonus > 0 ? '+' : ''}{(item.reloadBonus * 100).toFixed(0)}% reload
                          </span>
                        )}
                      </div>

                      <div className="wsb-item-desc">{item.bonusDesc}</div>
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

'use client'

import './calculator.css'
import { fmt } from '@/lib/wsb/calculator'
import type { DamageReport as DamageReportType } from '@/lib/wsb/types'

interface DamageReportProps {
  report: DamageReportType | null
}

const SIDE_COLORS: Record<string, string> = {
  Bow:       '#7aadcf',
  Port:      '#b8c8d8',
  Starboard: '#b8c8d8',
  Stern:     '#cf9f7a',
}

export default function DamageReport({ report }: DamageReportProps) {
  const hasData = report && report.cannonsArmed > 0

  return (
    <div className="wsb-panel full-width">
      <div className="wsb-panel-title">
        <div className="wsb-report-hero">
          <div>
            <div className="wsb-report-kicker">⚔️ Damage Report</div>
            <p className="wsb-report-subnote">
              Estimated broadside output based on current ship, cannon, ammo, crew, and attachment configuration.
              Figures represent a full volley and sustained DPM per side.
              Armour reduction is applied per shot before bonuses.
            </p>
          </div>
          <div className={`wsb-report-badge ${hasData ? 'ready' : 'standby'}`}>
            {hasData ? '⚡ Broadside Ready' : '⚓ Standby'}
          </div>
        </div>
      </div>

      {/* Active bonus pills */}
      {hasData && report.bonusPills.length > 0 && (
        <div className="wsb-bonus-pills">
          {report.bonusPills.map((pill, i) => (
            <span key={i} className="wsb-bonus-pill">{pill}</span>
          ))}
        </div>
      )}

      {/* Summary stat boxes */}
      <div className="wsb-stats-boxes">
        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Volley Damage</div>
          <div className={`wsb-stat-box-value${!hasData ? ' negative' : ''}`}>
            {hasData ? fmt(report.volleyDamage) : '—'}
          </div>
          <div className="wsb-stat-box-unit">full broadside</div>
        </div>
        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Damage / Min</div>
          <div className={`wsb-stat-box-value${!hasData ? ' negative' : ''}`}>
            {hasData ? fmt(report.damagePerMinute) : '—'}
          </div>
          <div className="wsb-stat-box-unit">sustained DPM</div>
        </div>
        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Avg per Cannon</div>
          <div className={`wsb-stat-box-value${!hasData ? ' negative' : ''}`}>
            {hasData ? fmt(report.avgDmgPerCannon) : '—'}
          </div>
          <div className="wsb-stat-box-unit">per volley</div>
        </div>
        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Cannons Armed</div>
          <div className="wsb-stat-box-value">
            {report ? report.cannonsArmed : '—'}
            {report && report.totalSlots > 0 && (
              <span style={{ fontSize: '0.9rem', color: 'var(--cream-dim)' }}>/{report.totalSlots}</span>
            )}
          </div>
          <div className="wsb-stat-box-unit">slots filled</div>
        </div>
        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Damage Bonus</div>
          <div className="wsb-stat-box-value"
            style={{ color: report && report.dmgBonusPct > 0 ? 'var(--green)' : 'var(--cream-dim)' }}>
            {report ? `+${fmt(report.dmgBonusPct)}%` : '—'}
          </div>
          <div className="wsb-stat-box-unit">from bonuses</div>
        </div>
        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Armour Lost</div>
          <div className="wsb-stat-box-value"
            style={{ color: report && report.targetArmourLost > 0 ? 'var(--red-light)' : 'var(--cream-dim)' }}>
            {report && report.targetArmourLost > 0 ? `-${fmt(report.targetArmourLost)}` : '—'}
          </div>
          <div className="wsb-stat-box-unit">per shot vs target</div>
        </div>
      </div>

      {/* Per-side breakdown table */}
      {hasData && report.groupResults.length > 0 ? (
        <div className="wsb-breakdown">
          <table className="wsb-breakdown-table">
            <thead>
              <tr>
                <th>Side</th>
                <th>Cannon</th>
                <th>Slots</th>
                <th>Volley Dmg</th>
                <th>DPM</th>
                <th>Reload</th>
              </tr>
            </thead>
            <tbody>
              {report.groupResults.map((row, i) => (
                <tr key={i}>
                  <td style={{ color: SIDE_COLORS[row.side] ?? 'var(--cream)' }}>
                    {row.side}
                  </td>
                  <td>{row.cannonName}</td>
                  <td style={{ color: 'var(--cream-dim)' }}>
                    {row.armedCount}/{row.slotCount}
                  </td>
                  <td className="val-dmg">{fmt(row.volleyDmg)}</td>
                  <td className="val-dpm">{fmt(row.dpm)}</td>
                  <td style={{ color: 'var(--cream-dim)' }}>{row.reloadTime}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="wsb-empty-result">
          ⚓ Configure a ship and arm at least one cannon to see your broadside output.
        </div>
      )}
    </div>
  )
}

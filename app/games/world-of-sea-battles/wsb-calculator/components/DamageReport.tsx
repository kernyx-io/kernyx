'use client'

import './calculator.css'
import { fmt } from '@/lib/wsb/calculator'
import type { DamageReport as DamageReportType } from '@/lib/wsb/types'

interface DamageReportProps {
  report: DamageReportType | null
}

const POSITION_LABELS: Record<string, string> = {
  bow: 'Bow',
  broadside: 'Broadside',
  stern: 'Stern',
}

const POSITION_CLASSES: Record<string, string> = {
  bow: 'pos-bow',
  broadside: 'pos-broad',
  stern: 'pos-stern',
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
              Figures represent a single broadside volley and sustained damage per minute.
              Armour reduction is applied per shot before bonuses.
            </p>
          </div>
          <div
            className={`wsb-report-badge ${hasData ? 'ready' : 'standby'}`}
          >
            {hasData ? '⚡ Broadside Ready' : '⚓ Standby'}
          </div>
        </div>
      </div>

      {/* Bonus pills */}
      {hasData && report.bonusPills.length > 0 && (
        <div className="wsb-bonus-pills">
          {report.bonusPills.map((pill, i) => (
            <span key={i} className="wsb-bonus-pill">{pill}</span>
          ))}
        </div>
      )}

      {/* Stat boxes */}
      <div className="wsb-stats-boxes">
        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Volley Damage</div>
          <div className={`wsb-stat-box-value${!hasData ? ' negative' : ''}`}>
            {hasData ? fmt(report.volleyDamage) : '—'}
          </div>
          <div className="wsb-stat-box-unit">per broadside</div>
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
            {report ? `${report.cannonsArmed}` : '—'}
            {report && report.totalSlots > 0 && (
              <span style={{ fontSize: '0.9rem', color: 'var(--cream-dim)' }}>
                /{report.totalSlots}
              </span>
            )}
          </div>
          <div className="wsb-stat-box-unit">slots filled</div>
        </div>

        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Damage Bonus</div>
          <div className={`wsb-stat-box-value${report && report.dmgBonusPct > 0 ? '' : ''}`}
            style={{ color: report && report.dmgBonusPct > 0 ? 'var(--green)' : 'var(--cream-dim)' }}
          >
            {report ? `+${fmt(report.dmgBonusPct)}%` : '—'}
          </div>
          <div className="wsb-stat-box-unit">from bonuses</div>
        </div>

        <div className="wsb-stat-box">
          <div className="wsb-stat-box-label">Armour Lost</div>
          <div className="wsb-stat-box-value"
            style={{ color: report && report.targetArmourLost > 0 ? 'var(--red-light)' : 'var(--cream-dim)' }}
          >
            {report && report.targetArmourLost > 0 ? `-${fmt(report.targetArmourLost)}` : '—'}
          </div>
          <div className="wsb-stat-box-unit">per shot vs target</div>
        </div>
      </div>

      {/* Per-slot breakdown table */}
      {hasData ? (
        <div className="wsb-breakdown">
          <table className="wsb-breakdown-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Cannon</th>
                <th>Base Dmg</th>
                <th>Final Dmg</th>
                <th>Shots</th>
                <th>Reload</th>
                <th>DPM</th>
              </tr>
            </thead>
            <tbody>
              {report.slotResults.map((row, i) => (
                <tr key={i}>
                  <td>
                    <span className={POSITION_CLASSES[row.position]}>
                      {POSITION_LABELS[row.position]} {row.index + 1}
                    </span>
                  </td>
                  <td>{row.cannonName}</td>
                  <td>{fmt(row.baseDmg)}</td>
                  <td className="val-dmg">{fmt(row.finalDmg)}</td>
                  <td>×{row.shots}</td>
                  <td>{row.reloadTime}s</td>
                  <td className="val-dpm">{fmt(row.dpm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="wsb-empty-result">
          ⚓ Configure a ship and arm at least one cannon slot to see your broadside output.
        </div>
      )}
    </div>
  )
}

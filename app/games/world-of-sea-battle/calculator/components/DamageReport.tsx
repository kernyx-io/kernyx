"use client"

import styles from "../calculator.module.css"

export default function DamageReport({ results }: any) {
  return (
    <div>

      <div className={styles.ledger}>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Cannon Damage</span>
          <span className={styles.statValue}>{results.damagePerShot}</span>
        </div>

        <div className={styles.statRow}>
          <span className={styles.statLabel}>Reload Time</span>
          <span className={styles.statValue}>{results.reloadTime}s</span>
        </div>

        <div className={styles.statRow}>
          <span className={styles.statLabel}>Cannons Fired</span>
          <span className={styles.statValue}>{results.cannonCount}</span>
        </div>
      </div>

      <div className={styles.highlightBlock}>
        <div className={styles.highlightLabel}>Total Broadside DPS</div>
        <div className={styles.highlightValue}>
          {results.totalDPS}
        </div>
      </div>

    </div>
  )
}

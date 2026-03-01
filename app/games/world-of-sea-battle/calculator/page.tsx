"use client"

import styles from "./calculator.module.css"
import { useReducer } from "react"
import { ships, cannons } from "./lib/data"
import { calculateResults } from "./lib/calculations"
import type { CalculatorState } from "./lib/types"

const initialState: CalculatorState = {
  ship: ships[0],
  cannon: cannons[0],
  cannonCount: 1,
  crew: { reloadBonus: 0, damageBonus: 0 }
}

function reducer(state: CalculatorState, action: any): CalculatorState {
  switch (action.type) {
    case "SET_SHIP": return { ...state, ship: action.payload }
    case "SET_CANNON": return { ...state, cannon: action.payload }
    case "SET_COUNT": return { ...state, cannonCount: action.payload }
    case "SET_CREW": return { ...state, crew: action.payload }
    default: return state
  }
}

export default function CalculatorPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const results = calculateResults(state)

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <div className={styles.header}>
        <h1>CANNON DPS CALCULATOR</h1>
        <p>WORLD OF SEA BATTLE – ARTILLERY DAMAGE ESTIMATOR</p>
      </div>

      {/* TOP TWO PANELS */}
      <div className={styles.row2}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>VESSEL SELECTION</div>
          <div className={styles.sectionBody}>
            <select
              className={styles.select}
              value={state.ship.id}
              onChange={(e) =>
                dispatch({ type: "SET_SHIP", payload: ships.find(s => s.id === e.target.value) })
              }
            >
              {ships.map(ship => (
                <option key={ship.id} value={ship.id}>{ship.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>TARGET SHIP</div>
          <div className={styles.sectionBody}>
            <select className={styles.select}>
              <option>HMS Aurora</option>
            </select>
          </div>
        </div>
      </div>

      {/* BROADSIDE */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>BROADSIDE CONFIGURATION</div>
        <div className={styles.sectionBody}>
          <select
            className={styles.select}
            value={state.cannon.id}
            onChange={(e) =>
              dispatch({ type: "SET_CANNON", payload: cannons.find(c => c.id === e.target.value) })
            }
          >
            {cannons.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input
            type="number"
            className={styles.input}
            value={state.cannonCount}
            onChange={(e) =>
              dispatch({ type: "SET_COUNT", payload: Number(e.target.value) })
            }
          />
        </div>
      </div>

      {/* CREW */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>CREW SELECTION</div>
        <div className={styles.sectionBody}>
          <input
            type="number"
            className={styles.input}
            placeholder="Reload Bonus %"
            onChange={(e) =>
              dispatch({ type: "SET_CREW", payload: { ...state.crew, reloadBonus: Number(e.target.value) } })
            }
          />
        </div>
      </div>

      {/* SHIP STATS */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>SHIP STATISTICS</div>
        <div className={styles.sectionBody}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Base HP</td>
                <td>{state.ship.baseHP}</td>
              </tr>
              <tr>
                <td>Armor</td>
                <td>{state.ship.armor}</td>
              </tr>
              <tr>
                <td>Cannon Slots</td>
                <td>{state.ship.cannonSlots}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* DAMAGE REPORT */}
     <div className={styles.section}>
  <div className={styles.sectionHeader}>DAMAGE OUTPUT REPORT</div>
  <div className={styles.sectionBody}>
    <div className={styles.statsGrid}>

      <div className={styles.statBox}>
        <div className={styles.statLabel}>Adjusted Damage</div>
        <div className={styles.statValue}>
          {results.adjustedDamage.toFixed(1)}
        </div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.statLabel}>Adjusted Reload</div>
        <div className={styles.statValue}>
          {results.adjustedReload.toFixed(2)}s
        </div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.statLabel}>Volley Damage</div>
        <div className={styles.statValue}>
          {results.volleyDamage.toFixed(1)}
        </div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.statLabel}>Total DPS</div>
        <div className={styles.statValue}>
          {results.totalDPS.toFixed(2)}
        </div>
      </div>

    </div>
  </div>
</div>

      <div className={styles.footerBar}>
        Unofficial fan project – Not affiliated with World of Sea Battle
      </div>

    </div>
  )
}

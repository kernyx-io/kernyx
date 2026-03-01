"use client"

import { useReducer } from "react"
import styles from "./calculator.module.css"
import { ships, cannons } from "./lib/data"
import { calculateResults } from "./lib/calculations"
import type { CalculatorState } from "./lib/types"

import VesselSelection from "./components/VesselSelection"
import BroadsideConfig from "./components/BroadsideConfig"
import CrewSelection from "./components/CrewSelection"
import DamageReport from "./components/DamageReport"

const initialState: CalculatorState = {
  ship: ships[0],
  cannon: cannons[0],
  cannonCount: 1,
  crew: {
    reloadBonus: 0,
    damageBonus: 0,
  },
}

function reducer(state: CalculatorState, action: any): CalculatorState {
  switch (action.type) {
    case "SET_SHIP":
      return { ...state, ship: action.payload }
    case "SET_CANNON":
      return { ...state, cannon: action.payload }
    case "SET_COUNT":
      return { ...state, cannonCount: action.payload }
    case "SET_CREW":
      return { ...state, crew: action.payload }
    default:
      return state
  }
}

export default function CalculatorPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const results = calculateResults(state)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Admiralty Gunnery Ledger</h1>

      <div className={styles.layout}>

        <div>
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Vessel</div>
            <VesselSelection state={state} dispatch={dispatch} />
          </div>

          <div className={styles.panel} style={{ marginTop: "1.5rem" }}>
            <div className={styles.panelTitle}>Broadside</div>
            <BroadsideConfig state={state} dispatch={dispatch} />
          </div>

          <div className={styles.panel} style={{ marginTop: "1.5rem" }}>
            <div className={styles.panelTitle}>Crew</div>
            <CrewSelection state={state} dispatch={dispatch} />
          </div>
        </div>

        <div>
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Engagement Report</div>
            <DamageReport results={results} />
          </div>
        </div>

      </div>
    </div>
  )
}

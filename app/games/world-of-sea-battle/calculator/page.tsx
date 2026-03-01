"use client"

import { useReducer } from "react"
import styles from "./calculator.module.css"
import { ships, cannons } from "./lib/data"
import { calculateResults } from "./lib/calculations"
import { CalculatorState } from "./lib/types"

import VesselSelection from "./components/VesselSelection.tsx"
import BroadsideConfig from "./components/BroadsideConfig.tsx"
import CrewSelection from "./components/CrewSelection.tsx"
import DamageReport from "./components/DamageReport.tsx"

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
      <h1 className={styles.title}>Cannon DPS Calculator</h1>

      <VesselSelection
        state={state}
        dispatch={dispatch}
      />

      <BroadsideConfig
        state={state}
        dispatch={dispatch}
      />

      <CrewSelection
        state={state}
        dispatch={dispatch}
      />

      <DamageReport results={results} />
    </div>
  )
}

"use client"

import { CalculatorState } from "../lib/types"

type Props = {
  state: CalculatorState
  dispatch: React.Dispatch<any>
}

export default function BroadsideConfig({ state, dispatch }: Props) {
  return (
    <div>
      {/* your UI here */}
    </div>
  )
}

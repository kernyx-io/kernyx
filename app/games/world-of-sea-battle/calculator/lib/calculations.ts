import type { CalculatorState } from "./lib/types"

export function calculateResults(state: CalculatorState) {
  const adjustedReload =
    state.cannon.reload * (1 - state.crew.reloadBonus)

  const adjustedDamage =
    state.cannon.damage * (1 + state.crew.damageBonus)

  const volleyDamage =
    adjustedDamage * state.cannonCount

  const dps =
    volleyDamage / adjustedReload

  return {
    adjustedReload: Number(adjustedReload.toFixed(2)),
    adjustedDamage: Number(adjustedDamage.toFixed(2)),
    volleyDamage: Number(volleyDamage.toFixed(2)),
    dps: Number(dps.toFixed(2)),
  }
}

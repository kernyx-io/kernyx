
export type Ship = {
  id: string
  name: string
  baseHP: number
  armor: number
  cannonSlots: number
}

export type Cannon = {
  id: string
  name: string
  damage: number
  reload: number
}

export type CrewBonus = {
  reloadBonus: number
  damageBonus: number
}

export type CalculatorState = {
  ship: Ship
  cannon: Cannon
  cannonCount: number
  crew: CrewBonus
}

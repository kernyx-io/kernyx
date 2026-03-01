import { Ship, Cannon } from "./types"

export const ships: Ship[] = [
  {
    id: "dreadnought",
    name: "HMS Dreadnought",
    baseHP: 3200,
    armor: 150,
    cannonSlots: 4,
  },
]

export const cannons: Cannon[] = [
  {
    id: "mk1",
    name: "Mk I Heavy Cannon",
    damage: 120,
    reload: 6,
  },
  {
    id: "mk2",
    name: "Mk II Siege Cannon",
    damage: 180,
    reload: 8,
  },
]

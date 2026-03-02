import type { AmmoType } from './types'

export const AMMO_TYPES: AmmoType[] = [
  {
    id: 'round',
    name: 'Round Shots',
    hullDmgPct: 1.0,
    sailsDmg: 1,
    crewDmg: 1,
    weight: 1,
    special: '',
    desc: 'Standard all-purpose shot for dealing damage.',
  },
  {
    id: 'heated',
    name: 'Heated Shots',
    hullDmgPct: 0.9,
    sailsDmg: 1,
    crewDmg: 1,
    weight: 3,
    special: 'fire',
    desc: 'Shells filled with flammable mixture. Deal increased damage by igniting ships or the water surface; great for triggering barrels. Range reduced by 40%.',
  },
  {
    id: 'bar',
    name: 'Bar Shots',
    hullDmgPct: 0.5,
    sailsDmg: 3,
    crewDmg: 2,
    weight: 1,
    special: 'slow',
    desc: 'Two half-shots chained together for maximum sail and rigging damage. Can slow enemy speed and manoeuvrability. Can destroy enemy weapons.',
  },
  {
    id: 'grape',
    name: 'Grapeshot',
    hullDmgPct: 0.2,
    sailsDmg: 2,
    crewDmg: 3,
    weight: 1,
    special: '',
    desc: 'Inflicts high crew damage with fast reload time. Outnumbering enemies increases boarding odds. Crew damage slows enemy reload speed.',
  },
  {
    id: 'heavy',
    name: 'Heavy Shots',
    hullDmgPct: 1.25,
    sailsDmg: 1,
    crewDmg: 1,
    weight: 2,
    special: '',
    desc: 'Unique shots crafted with mysterious technology. The finest projectiles available. Slower reload time.',
  },
  {
    id: 'saxon',
    name: 'Saxon Shots',
    hullDmgPct: 0.8,
    sailsDmg: 2,
    crewDmg: 2,
    weight: 1,
    special: 'pierce',
    desc: 'Costly rounds filled with white Bengal powder. Can pierce through the hull, damaging multiple ships in a row. Obtainable via events, Imperial Flagships, sea loot, or Shop.',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getAmmoById(id: string): AmmoType {
  return AMMO_TYPES.find((a) => a.id === id) ?? AMMO_TYPES[0]
}

/** Returns the sail/crew damage label 1–3 as a readable string */
export function ratingLabel(rating: number): string {
  if (rating >= 3) return 'High'
  if (rating >= 2) return 'Medium'
  return 'Low'
}

import type { SupportItem } from './types'

export const SUPPORT_ITEMS: SupportItem[] = [
  // ─── Ship Enhancements ───────────────────────────────────────────────────────
  {
    id: 'small_additional_sails_support',
    group: 'Ship Enhancements',
    name: 'Small Additional Sails',
    types: ['Speed'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Speed +1 knot. Repeat: 60s. Active: 30s.',
  },
  {
    id: 'large_additional_sails_support',
    group: 'Ship Enhancements',
    name: 'Large Additional Sails',
    types: ['Speed'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Speed +1.5 knots, but -1 knot in rowing mode. Repeat: 60s. Active: 30s.',
  },

  // ─── Repair & Durability ─────────────────────────────────────────────────────
  {
    id: 'small_plates',
    group: 'Repair & Durability',
    name: 'Small Plates',
    types: ['Defense'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: -0.05,
    bonusDesc: 'Ship defense +2. Speeds up extinguishing minor fires. Maneuverability -5%. Repeat: 50s. Active: 30s.',
  },
  {
    id: 'large_plates',
    group: 'Repair & Durability',
    name: 'Large Plates',
    types: ['Defense'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: -0.10,
    bonusDesc: 'Ship defense +4. Speeds up extinguishing minor fires. Maneuverability -10%. Repeat: 50s. Active: 30s.',
  },

  // ─── Special Powders & Ammunition ────────────────────────────────────────────
  {
    id: 'black_double_powder',
    group: 'Special Powders & Ammunition',
    name: 'Black Double Powder',
    types: ['Powder', 'Damage'],
    dmgBonus: 0,
    reloadBonus: -0.09,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Ammo penetration +2.5. Mortar damage +15%. Reload time +9%. Repeat: 30s. Active: 50s.',
  },
  {
    id: 'red_double_powder',
    group: 'Special Powders & Ammunition',
    name: 'Red Double Powder',
    types: ['Powder', 'Damage'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: '+25% damage vs structures for guns and mortars. Swivel gun reload speed +30%. Repeat: 30s. Active: 50s.',
  },
  {
    id: 'white_double_powder',
    group: 'Special Powders & Ammunition',
    name: 'White Double Powder',
    types: ['Powder', 'Range'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Cannon and mortar range +10m. Shot accuracy +20%. Speed -1 knot while active. Repeat: 30s. Active: 50s.',
  },
  {
    id: 'phosphorous',
    group: 'Special Powders & Ammunition',
    name: 'Phosphorous',
    types: ['Powder', 'Utility'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Enhances any ammo with phosphorous. Penetration +2. Slows enemies on impact. Does not stack with gunpowder.',
  },
  {
    id: 'powder_charge',
    group: 'Special Powders & Ammunition',
    name: 'Powder Charge',
    types: ['Powder', 'Damage'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Causes ammo to explode and deal area damage. Range -5%. Penetration halved. Explosion damages even protected ships. Repeat: 40s. Active: 50s.',
  },

  // ─── Crew Items ──────────────────────────────────────────────────────────────
  {
    id: 'rum_ration',
    group: 'Crew Items',
    name: 'Rum Ration',
    types: ['Crew', 'Reload', 'Speed'],
    dmgBonus: 0,
    reloadBonus: 0.20,
    speedBonus: -0.08,
    maneuverBonus: 0,
    bonusDesc: 'Crew speed +20% (reload bonus). Movement speed -8%. Repeat: 60s. Active: 30s.',
  },
  {
    id: 'filling_ration',
    group: 'Crew Items',
    name: 'Filling Ration',
    types: ['Crew', 'Utility'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0.05,
    bonusDesc: 'Maneuverability +5%. Improves reload speed of other items, repair speed, and utility actions. Repeat: 60s. Active: 30s.',
  },

  // ─── Group Support Items ──────────────────────────────────────────────────────
  {
    id: 'poseidon_hook',
    group: 'Group Support Items',
    name: "Poseidon's Hook",
    types: ['Squadron', 'Loot'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Doubles weapons received when sinking NPCs.',
  },
  {
    id: 'horn',
    group: 'Group Support Items',
    name: 'Horn',
    types: ['Squadron', 'Defense'],
    dmgBonus: 0,
    reloadBonus: 0,
    speedBonus: 0,
    maneuverBonus: 0,
    bonusDesc: 'Adds 5% temporary durability that absorbs damage for all squadron allies. Repeat: 120s.',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const SUPPORT_GROUPS = [
  'Ship Enhancements',
  'Repair & Durability',
  'Special Powders & Ammunition',
  'Crew Items',
  'Group Support Items',
] as const

export function getSupportById(id: string): SupportItem | undefined {
  return SUPPORT_ITEMS.find((s) => s.id === id)
}

export function getSupportByGroup(group: string): SupportItem[] {
  return SUPPORT_ITEMS.filter((s) => s.group === group)
}

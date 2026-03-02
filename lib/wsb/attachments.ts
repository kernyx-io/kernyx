import type { Attachment } from './types'

export const ATTACHMENTS: Attachment[] = [
  // ─── Sail Slot ───────────────────────────────────────────────────────────────
  { id: 'cheap_sails',     slotType: 'sail', name: 'Cheap Sails',     dmgBonus: 0,    rateBonus: 0,    desc: 'Cruise max. speed +35%.' },
  { id: 'stitched_sails',  slotType: 'sail', name: 'Stitched Sails',  dmgBonus: 0,    rateBonus: 0,    desc: 'Cruise max. speed +45%.' },
  { id: 'elite_sails',     slotType: 'sail', name: 'Elite Sails',     dmgBonus: 0,    rateBonus: 0,    desc: 'Cruise max. speed +60%.' },
  { id: 'tarpaulin_sails', slotType: 'sail', name: 'Tarpaulin Sails', dmgBonus: 0,    rateBonus: 0,    desc: 'Cruise max. speed +70%. Maneuverability -1.' },

  // ─── Speed ───────────────────────────────────────────────────────────────────
  { id: 'reinforced_masts',  slotType: 'general', name: 'Reinforced Masts',  dmgBonus: 0, rateBonus: 0, desc: 'Speed +0.4 knt. Additional sail efficiency +0.8.' },
  { id: 'maneuverable_helm', slotType: 'general', name: 'Maneuverable Helm', dmgBonus: 0, rateBonus: 0, desc: 'Maneuverability +8%. Speed penalty when turning in cruise speed -15%.' },
  { id: 'lightweight_hull',  slotType: 'general', name: 'Lightweight Hull',  dmgBonus: 0, rateBonus: 0, desc: 'Maneuverability +5%. Speed +4%. Armor -15%.' },

  // ─── Expeditionary ───────────────────────────────────────────────────────────
  { id: 'small_hooks',       slotType: 'general', name: 'Small Hooks',       dmgBonus: 0, rateBonus: 0, desc: 'Item collection speed +250%. Fishing speed +30%. Boarding range +15%.' },
  { id: 'sturdy_frames',     slotType: 'general', name: 'Sturdy Frames',     dmgBonus: 0, rateBonus: 0, desc: 'Durability +10%. Hold +12%. Speed change -15%.' },
  { id: 'combat_crows_nest', slotType: 'general', name: "Combat Crow's Nest", dmgBonus: 0, rateBonus: 0, desc: 'Visibility Range +50%. Weapon aiming speed +60%.' },
  { id: 'double_hold',       slotType: 'general', name: 'Double Hold',       dmgBonus: 0, rateBonus: 0, desc: 'Hold +6500. Item Loss Reduction -40%. Durability -5%.' },
  { id: 'extra_ballast',     slotType: 'general', name: 'Extra Ballast',     dmgBonus: 0, rateBonus: 0, desc: 'Ship roll reduced +50%. Weapon spread -40%.' },
  { id: 'cellars',           slotType: 'general', name: 'Cellars',           dmgBonus: 0, rateBonus: 0, desc: 'Hold +3500. Perishable goods do not spoil.' },
  { id: 'extra_bunks',       slotType: 'general', name: 'Extra Bunks',       dmgBonus: 0, rateBonus: 0, desc: 'Crew +20. Crew count hidden.' },

  // ─── Protection ──────────────────────────────────────────────────────────────
  { id: 'repair_arsenal',      slotType: 'general', name: 'Repair Arsenal',      dmgBonus: 0, rateBonus: 0, desc: 'Durability +210. Repair item efficiency +20%.' },
  { id: 'copper_plating',      slotType: 'general', name: 'Copper Plating',      dmgBonus: 0, rateBonus: 0, desc: 'Water fire protection +25%. Protection against gunpowder barrels and fire ships +30%.' },
  { id: 'iron_ram',            slotType: 'general', name: 'Iron Ram',            dmgBonus: 0, rateBonus: 0, desc: 'Ram Damage +20%. Bow damage absorption +20%. Quick sinking by ramming.' },
  { id: 'fortified_gun_ports', slotType: 'general', name: 'Fortified Gun Ports', dmgBonus: 0, rateBonus: 0, desc: 'Sail protection +30%. Sail fire protection +50%.' },
  { id: 'iron_plating',        slotType: 'general', name: 'Iron Plating',        dmgBonus: 0, rateBonus: 0, desc: 'Water fire protection +45%. Armor -10%.' },
  { id: 'teak_frames',         slotType: 'general', name: 'Teak Frames',         dmgBonus: 0, rateBonus: 0, desc: 'Armor +1. Crew +14. Maneuverability -6%.' },

  // ─── Combat ──────────────────────────────────────────────────────────────────
  { id: 'advanced_gun_carriages', slotType: 'general', name: 'Advanced Gun Carriages', dmgBonus: 0,    rateBonus: 0,    desc: 'Weapon angle +10. Weapon aiming speed +30%.' },
  { id: 'upper_deck',             slotType: 'general', name: 'Upper Deck',             dmgBonus: 0,    rateBonus: 0,    desc: 'Barrel reload speed +35%. Swivel gun reload speed +35%.' },
  { id: 'ammunition_cradles',     slotType: 'general', name: 'Ammunition Cradles',     dmgBonus: 0,    rateBonus: 0.18, desc: 'Reload Speed +12%.' },
  { id: 'ammunition_cradles R1',     slotType: 'general', name: 'Ammunition Cradles R1',     dmgBonus: 0,    rateBonus: 0.18, desc: 'Reload Speed +18%.' },
  { id: 'incendiary_mixture',     slotType: 'general', name: 'Incendiary Mixture',     dmgBonus: 0,    rateBonus: 0,    desc: 'Fire effects and ignition with any ammo type. Projectile speed +10%.' },
  { id: 'fortified_ports',        slotType: 'general', name: 'Fortified Ports',        dmgBonus: 0,    rateBonus: 0,    desc: 'Cannon range +10m.' },
  { id: 'combat_arsenal',         slotType: 'general', name: 'Combat Arsenal',         dmgBonus: 0,    rateBonus: 0,    desc: 'Items reload +20%. Ammo type switch speed +50%.' },
  { id: 'reinforced_cannons',     slotType: 'general', name: 'Reinforced Cannons',     dmgBonus: 1.13, rateBonus: 0,    desc: 'Damage from stern and bow weapons +113%. (Bow/stern positions only.)' },

  // ─── Unusual ─────────────────────────────────────────────────────────────────
  { id: 'strong_beams',              slotType: 'general', name: 'Strong Beams',              dmgBonus: 0,    rateBonus: 0, desc: 'Durability +5%. Mortar Protection +30%. Speed -5%.' },
  { id: 'high_helm_port',            slotType: 'general', name: 'High Helm Port',            dmgBonus: 0,    rateBonus: 0, desc: 'Barrels and mines available on 3rd speed. Barrel and mine damage radius +30%.' },
  { id: 'portable_chest',            slotType: 'general', name: 'Portable Chest',            dmgBonus: 0,    rateBonus: 0, desc: 'Winning boarding attempts gives +5% gold.' },
  { id: 'structural_expansion',      slotType: 'general', name: 'Structural Expansion',      dmgBonus: 0,    rateBonus: 0, desc: 'Spaces for upgrades +2. Maneuverability -10%.' },
  { id: 'emergency_powder_charge',   slotType: 'general', name: 'Emergency Powder Charge',   dmgBonus: 0.25, rateBonus: 0, desc: 'Damage +25% when ship durability is below 50%.' },

  // ─── Mortar ──────────────────────────────────────────────────────────────────
  { id: 'long_range_mortars',      slotType: 'general', name: 'Long-Range Mortars',      dmgBonus: 0, rateBonus: 0, desc: 'Range +10m. Maneuverability -8%.' },
  { id: 'swivel_mortars',          slotType: 'general', name: 'Swivel Mortars',          dmgBonus: 0, rateBonus: 0, desc: 'Mortar Damage +12%. Mortar angle +50 degrees. Mortar aiming speed -25%.' },
  { id: 'reinforced_centre_line',  slotType: 'general', name: 'Reinforced Centre-Line',  dmgBonus: 0, rateBonus: 0, desc: 'Mortar aiming speed +40%. "Dead" zone reduction +30%.' },
  { id: 'lightweight_construction',slotType: 'general', name: 'Lightweight Construction',dmgBonus: 0, rateBonus: 0, desc: 'Mortar reload speed +40%. Hold +25%. Mortar Damage -25%.' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const ATTACHMENT_CATEGORIES = [
  'Sails',
  'Speed',
  'Expeditionary',
  'Protection',
  'Combat',
  'Unusual',
  'Mortar',
] as const

export function getAttachmentById(id: string): Attachment | undefined {
  return ATTACHMENTS.find((a) => a.id === id)
}

export function getAttachmentsBySlot(slotType: 'sail' | 'general'): Attachment[] {
  return ATTACHMENTS.filter((a) => a.slotType === slotType)
}

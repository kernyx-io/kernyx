// ─── Cannon ───────────────────────────────────────────────────────────────────

export type CannonCategory =
  | 'None'
  | 'Cannon'
  | 'Long Cannon'
  | 'Carronade'
  | 'Bombard'
  | 'Mortar'
  | 'Special'

export interface Cannon {
  id: string
  category: CannonCategory
  rank: string
  dmg: number
  penetration: number
  shots: number
  reloadTime: number
  range: number
  rangeMin?: number
  maxAngle: number
  scatter: number
  name: string
  desc: string
  bowSternOnly?: boolean
  specialShipOnly?: boolean
  splashRadius?: number
  reduction?: number
  preparation?: number
  structureBonus?: boolean
}

// ─── Ship ─────────────────────────────────────────────────────────────────────

export type ShipType = 'Fast' | 'Balanced' | 'Heavy' | 'Support' | 'Special'

export interface Ship {
  id: string
  name: string
  shipType: ShipType
  rate: number
  slots: number
  durability: number
  speed: number
  maneuverability: number
  broadsideArmor: number
  hold: number
  crew: number
  hullDims: string
  displacement: string
  // weapon layout: "bow-broadside-stern" e.g. "2-12-2"
  heavyWeapons: string
  swivelGuns: number
  integrity: number | null
  info: string
}

// ─── Ammo ─────────────────────────────────────────────────────────────────────

export interface AmmoType {
  id: string
  name: string
  hullDmgPct: number   // multiplier on hull damage e.g. 1.0 = 100%
  sailsDmg: number     // 0–1 scale of sail damage
  crewDmg: number      // 0–1 scale of crew damage
  weight: number       // affects reload penalty
  special: string      // free-text special effect description
  desc: string
}

// ─── Attachment ───────────────────────────────────────────────────────────────

export type AttachmentSlot = 'sail' | 'general'

export interface Attachment {
  id: string
  slotType: AttachmentSlot
  name: string
  dmgBonus: number     // additive %, e.g. 5 = +5%
  rateBonus: number    // additive reload speed %, e.g. 5 = +5% faster
  desc: string
}

// ─── Cosmetic ─────────────────────────────────────────────────────────────────

export type CosmeticSlot = 'lantern' | 'figurehead' | 'flag' | 'hull'

export interface Cosmetic {
  id: string
  slotType: CosmeticSlot
  name: string
  dmgBonus: number
  rateBonus: number
  desc: string
}

// ─── Armour ───────────────────────────────────────────────────────────────────

export interface ArmourType {
  id: string
  name: string
  armour: number       // points subtracted from each shot
}

// ─── Crew ─────────────────────────────────────────────────────────────────────

export type CrewFaction = 'Buccaneers' | 'Corsairs' | 'Naval Officers' | 'Adventurers'

export interface CrewMember {
  id: string
  faction: CrewFaction
  name: string
  types: string[]      // e.g. ['Gunner', 'Navigator']
  dmgBonus: number
  reloadBonus: number
  speedBonus: number
  maneuverBonus: number
  bonusDesc: string
}

// ─── Support Item ─────────────────────────────────────────────────────────────

export interface SupportItem {
  id: string
  group: string
  name: string
  types: string[]
  dmgBonus: number
  reloadBonus: number
  speedBonus: number
  maneuverBonus: number
  bonusDesc: string
}

// ─── Calculator State ─────────────────────────────────────────────────────────

export interface CannonSlot {
  position: 'bow' | 'broadside' | 'stern'
  index: number
  cannonId: string
}

export interface CalculatorState {
  // selections
  shipId: string
  targetShipId: string
  ammoId: string
  cannonSlots: CannonSlot[]
  attachmentIds: string[]
  cosmeticIds: string[]
  crewIds: string[]         // max 4
  supportIds: string[]      // max 3
  armourTypeId: string

  // actions
  setShip: (id: string) => void
  setTargetShip: (id: string) => void
  setAmmo: (id: string) => void
  setCannonSlot: (position: CannonSlot['position'], index: number, cannonId: string) => void
  toggleAttachment: (id: string, slotType: AttachmentSlot) => void
  toggleCosmetic: (id: string, slotType: CosmeticSlot) => void
  toggleCrew: (id: string) => void
  toggleSupport: (id: string) => void
  setArmourType: (id: string) => void
  resetSlots: () => void
}

// ─── Damage Report ────────────────────────────────────────────────────────────

export interface SlotResult {
  position: CannonSlot['position']
  index: number
  cannonName: string
  baseDmg: number
  finalDmg: number
  shots: number
  reloadTime: number
  dpm: number
}

export interface GroupResult {
  side: string
  position: CannonSlot['position']
  cannonName: string
  slotCount: number
  armedCount: number
  volleyDmg: number
  dpm: number
  reloadTime: number
  shots: number
}

export interface DamageReport {
  volleyDamage: number
  damagePerMinute: number
  avgDmgPerCannon: number
  cannonsArmed: number
  totalSlots: number
  dmgBonusPct: number
  targetArmourLost: number
  slotResults: SlotResult[]
  groupResults: GroupResult[]
  bonusPills: string[]
}

import type { CannonSlot, DamageReport } from './types'
import { getCannonById } from './cannons'
import { getShipById, parseWeaponSlots } from './ships'
import { getAmmoById } from './ammo'
import { getAttachmentById } from './attachments'
import { getCrewById } from './crew'
import { getSupportById } from './support'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalcInput {
  shipId: string
  targetShipId: string
  ammoId: string
  cannonSlots: CannonSlot[]
  attachmentIds: string[]
  crewIds: string[]
  supportIds: string[]
}

export interface GroupResult {
  side: string               // 'Bow' | 'Port' | 'Starboard' | 'Stern'
  position: CannonSlot['position']
  cannonName: string         // cannon used on this side (or 'Mixed' / 'Empty')
  slotCount: number          // number of slots on this side
  armedCount: number         // how many are filled
  volleyDmg: number          // total volley damage for this side
  dpm: number                // total DPM for this side
  reloadTime: number         // effective reload
  shots: number              // barrels per cannon
}

// ─── Bonus Aggregation ────────────────────────────────────────────────────────

function aggregateBonuses(input: CalcInput) {
  let dmgBonus = 0
  let reloadBonus = 0
  const bonusPills: string[] = []

  for (const id of input.attachmentIds) {
    const att = getAttachmentById(id)
    if (!att) continue
    if (att.dmgBonus !== 0) { dmgBonus += att.dmgBonus; bonusPills.push(`${att.name}: +${(att.dmgBonus*100).toFixed(0)}% dmg`) }
    if (att.rateBonus !== 0) { reloadBonus += att.rateBonus; bonusPills.push(`${att.name}: +${(att.rateBonus*100).toFixed(0)}% reload`) }
  }
  for (const id of input.crewIds) {
    const crew = getCrewById(id)
    if (!crew) continue
    if (crew.dmgBonus !== 0) { dmgBonus += crew.dmgBonus; bonusPills.push(`${crew.name}: +${(crew.dmgBonus*100).toFixed(0)}% dmg`) }
    if (crew.reloadBonus !== 0) { reloadBonus += crew.reloadBonus; bonusPills.push(`${crew.name}: +${(crew.reloadBonus*100).toFixed(0)}% reload`) }
  }
  for (const id of input.supportIds) {
    const sup = getSupportById(id)
    if (!sup) continue
    if (sup.dmgBonus !== 0) { dmgBonus += sup.dmgBonus; bonusPills.push(`${sup.name}: +${(sup.dmgBonus*100).toFixed(0)}% dmg`) }
    if (sup.reloadBonus !== 0) { reloadBonus += sup.reloadBonus; bonusPills.push(`${sup.name}: ${sup.reloadBonus>0?'+':''}${(sup.reloadBonus*100).toFixed(0)}% reload`) }
  }

  return { dmgBonus, reloadBonus, bonusPills }
}

// ─── Calculate one side group ─────────────────────────────────────────────────

function calcSide(
  side: string,
  position: CannonSlot['position'],
  slots: CannonSlot[],
  targetArmour: number,
  ammoPct: number,
  dmgBonus: number,
  reloadBonus: number,
  hasReinforcedCannons: boolean,
): GroupResult {
  const isBowStern = position === 'bow' || position === 'stern'
  const posBonus = hasReinforcedCannons && isBowStern ? 1.13 : 0
  const totalDmgMult = 1 + dmgBonus + posBonus

  const armed = slots.filter(s => s.cannonId !== 'none')
  const cannonNames = [...new Set(armed.map(s => getCannonById(s.cannonId)?.name ?? ''))]
  const cannonName = cannonNames.length === 0 ? 'Empty' : cannonNames.length === 1 ? cannonNames[0] : 'Mixed'

  let volleyDmg = 0
  let dpm = 0
  let reloadTime = 0
  let shots = 1

  for (const slot of armed) {
    const cannon = getCannonById(slot.cannonId)
    if (!cannon || cannon.id === 'none') continue
    const dmgAfterArmour = Math.max(0, cannon.dmg - targetArmour)
    const finalDmg = dmgAfterArmour * ammoPct * totalDmgMult * cannon.shots
    const effReload = reloadBonus > 0
      ? cannon.reloadTime / (1 + reloadBonus)
      : cannon.reloadTime * (1 + Math.abs(reloadBonus))
    volleyDmg += finalDmg
    dpm += effReload > 0 ? (finalDmg / effReload) * 60 : 0
    reloadTime = effReload
    shots = cannon.shots
  }

  return {
    side,
    position,
    cannonName,
    slotCount: slots.length,
    armedCount: armed.length,
    volleyDmg: parseFloat(volleyDmg.toFixed(1)),
    dpm: parseFloat(dpm.toFixed(1)),
    reloadTime: parseFloat(reloadTime.toFixed(1)),
    shots,
  }
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

export function calculateDamage(input: CalcInput): DamageReport {
  const ship = getShipById(input.shipId)
  const targetShip = getShipById(input.targetShipId)
  const ammo = getAmmoById(input.ammoId)
  const targetArmour = targetShip?.broadsideArmor ?? 0
  const { dmgBonus, reloadBonus, bonusPills } = aggregateBonuses(input)
  const ammoPct = ammo.hullDmgPct
  const layout = ship ? parseWeaponSlots(ship.heavyWeapons) : { bow: 0, broadside: 0, stern: 0 }
  const hasReinforcedCannons = input.attachmentIds.includes('reinforced_cannons')
  const n = layout.broadside

  // Build slot arrays per side
  function getSide(position: CannonSlot['position'], start: number, count: number): CannonSlot[] {
    return Array.from({ length: count }, (_, i) => {
      const idx = start + i
      return input.cannonSlots.find(s => s.position === position && s.index === idx)
        ?? { position, index: idx, cannonId: 'none' }
    })
  }

  const groups: GroupResult[] = []

  if (layout.bow > 0) {
    groups.push(calcSide('Bow', 'bow', getSide('bow', 0, layout.bow), targetArmour, ammoPct, dmgBonus, reloadBonus, hasReinforcedCannons))
  }
  if (n > 0) {
    groups.push(calcSide('Port', 'broadside', getSide('broadside', 0, n), targetArmour, ammoPct, dmgBonus, reloadBonus, hasReinforcedCannons))
    groups.push(calcSide('Starboard', 'broadside', getSide('broadside', n, n), targetArmour, ammoPct, dmgBonus, reloadBonus, hasReinforcedCannons))
  }
  if (layout.stern > 0) {
    groups.push(calcSide('Stern', 'stern', getSide('stern', 0, layout.stern), targetArmour, ammoPct, dmgBonus, reloadBonus, hasReinforcedCannons))
  }

  const totalVolley = groups.reduce((s, g) => s + g.volleyDmg, 0)
  const totalDPM   = groups.reduce((s, g) => s + g.dpm, 0)
  const cannonsArmed = groups.reduce((s, g) => s + g.armedCount, 0)
  const totalSlots   = groups.reduce((s, g) => s + g.slotCount, 0)
  const avgDmgPerCannon = cannonsArmed > 0 ? totalVolley / cannonsArmed : 0

  return {
    volleyDamage: parseFloat(totalVolley.toFixed(1)),
    damagePerMinute: parseFloat(totalDPM.toFixed(1)),
    avgDmgPerCannon: parseFloat(avgDmgPerCannon.toFixed(1)),
    cannonsArmed,
    totalSlots,
    dmgBonusPct: parseFloat((dmgBonus * 100).toFixed(1)),
    targetArmourLost: parseFloat(targetArmour.toFixed(1)),
    groupResults: groups,
    bonusPills,
    // keep slotResults for type compat — empty now
    slotResults: [],
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function fmt(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

export function buildDefaultSlots(shipId: string): CannonSlot[] {
  const ship = getShipById(shipId)
  if (!ship) return []
  const layout = parseWeaponSlots(ship.heavyWeapons)
  const slots: CannonSlot[] = []
  for (let i = 0; i < layout.bow; i++) slots.push({ position: 'bow', index: i, cannonId: 'none' })
  for (let i = 0; i < layout.broadside * 2; i++) slots.push({ position: 'broadside', index: i, cannonId: 'none' })
  for (let i = 0; i < layout.stern; i++) slots.push({ position: 'stern', index: i, cannonId: 'none' })
  return slots
}

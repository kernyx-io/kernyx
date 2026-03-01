import type { CannonSlot, DamageReport, SlotResult } from './types'
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

// ─── Bonus Aggregation ────────────────────────────────────────────────────────

function aggregateBonuses(input: CalcInput): {
  dmgBonus: number      // additive multiplier e.g. 0.12 = +12%
  reloadBonus: number   // additive multiplier e.g. 0.18 = 18% faster
  bonusPills: string[]
} {
  let dmgBonus = 0
  let reloadBonus = 0
  const bonusPills: string[] = []

  // Attachments
  for (const id of input.attachmentIds) {
    const att = getAttachmentById(id)
    if (!att) continue
    if (att.dmgBonus !== 0) {
      dmgBonus += att.dmgBonus
      bonusPills.push(`${att.name}: +${(att.dmgBonus * 100).toFixed(0)}% dmg`)
    }
    if (att.rateBonus !== 0) {
      reloadBonus += att.rateBonus
      bonusPills.push(`${att.name}: +${(att.rateBonus * 100).toFixed(0)}% reload`)
    }
  }

  // Crew
  for (const id of input.crewIds) {
    const crew = getCrewById(id)
    if (!crew) continue
    if (crew.dmgBonus !== 0) {
      dmgBonus += crew.dmgBonus
      bonusPills.push(`${crew.name}: +${(crew.dmgBonus * 100).toFixed(0)}% dmg`)
    }
    if (crew.reloadBonus !== 0) {
      reloadBonus += crew.reloadBonus
      bonusPills.push(`${crew.name}: +${(crew.reloadBonus * 100).toFixed(0)}% reload`)
    }
  }

  // Support items
  for (const id of input.supportIds) {
    const sup = getSupportById(id)
    if (!sup) continue
    if (sup.dmgBonus !== 0) {
      dmgBonus += sup.dmgBonus
      bonusPills.push(`${sup.name}: +${(sup.dmgBonus * 100).toFixed(0)}% dmg`)
    }
    if (sup.reloadBonus !== 0) {
      reloadBonus += sup.reloadBonus
      bonusPills.push(`${sup.name}: ${sup.reloadBonus > 0 ? '+' : ''}${(sup.reloadBonus * 100).toFixed(0)}% reload`)
    }
  }

  return { dmgBonus, reloadBonus, bonusPills }
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

export function calculateDamage(input: CalcInput): DamageReport {
  const ship = getShipById(input.shipId)
  const targetShip = getShipById(input.targetShipId)
  const ammo = getAmmoById(input.ammoId)

  // Target armour (broadside armor value = damage reduced per shot)
  const targetArmour = targetShip?.broadsideArmor ?? 0

  // Aggregate bonuses from crew, attachments, support
  const { dmgBonus, reloadBonus, bonusPills } = aggregateBonuses(input)

  // Ammo hull damage multiplier
  const ammoPct = ammo.hullDmgPct

  // Build weapon slot layout from ship
  const weaponLayout = ship ? parseWeaponSlots(ship.heavyWeapons) : { bow: 0, broadside: 0, stern: 0 }

  // Has Reinforced Cannons attachment (bow/stern +113%)
  const hasReinforcedCannons = input.attachmentIds.includes('reinforced_cannons')

  // Process each filled slot
  const slotResults: SlotResult[] = []
  let totalVolley = 0
  let totalDPM = 0
  let cannonsArmed = 0

  // Determine which slots are valid for this ship
  const validSlots: CannonSlot[] = []
  for (let i = 0; i < weaponLayout.bow; i++) {
    validSlots.push({ position: 'bow', index: i, cannonId: 'none' })
  }
  for (let i = 0; i < weaponLayout.broadside; i++) {
    validSlots.push({ position: 'broadside', index: i, cannonId: 'none' })
  }
  for (let i = 0; i < weaponLayout.stern; i++) {
    validSlots.push({ position: 'stern', index: i, cannonId: 'none' })
  }

  // Merge user selections into valid slots
  const mergedSlots = validSlots.map((vs) => {
    const userSlot = input.cannonSlots.find(
      (s) => s.position === vs.position && s.index === vs.index
    )
    return userSlot ?? vs
  })

  for (const slot of mergedSlots) {
    const cannon = getCannonById(slot.cannonId)
    if (!cannon || cannon.id === 'none') continue

    cannonsArmed++

    // Position bonus: bow/stern get reinforced cannons bonus if equipped
    const posBonus =
      hasReinforcedCannons && (slot.position === 'bow' || slot.position === 'stern')
        ? 1.13
        : 0

    // Total damage multiplier
    const totalDmgMult = 1 + dmgBonus + posBonus

    // Base damage per shot (per barrel)
    const baseDmgPerShot = cannon.dmg

    // Effective damage after armour reduction (per shot, per barrel)
    const dmgAfterArmour = Math.max(0, baseDmgPerShot - targetArmour)

    // Apply ammo hull % and damage bonus multiplier
    const finalDmgPerShot = dmgAfterArmour * ammoPct * totalDmgMult

    // Total damage for this cannon per volley (shots = number of barrels)
    const volleyDmg = finalDmgPerShot * cannon.shots

    // Effective reload time (faster reload = lower number)
    // reloadBonus is additive: 0.18 = 18% faster = divide by 1.18
    const effectiveReload = reloadBonus > 0
      ? cannon.reloadTime / (1 + reloadBonus)
      : cannon.reloadTime * (1 + Math.abs(reloadBonus))

    // Damage per minute
    const dpm = effectiveReload > 0 ? (volleyDmg / effectiveReload) * 60 : 0

    totalVolley += volleyDmg
    totalDPM += dpm

    slotResults.push({
      position: slot.position,
      index: slot.index,
      cannonName: cannon.name,
      baseDmg: baseDmgPerShot * cannon.shots,
      finalDmg: volleyDmg,
      shots: cannon.shots,
      reloadTime: parseFloat(effectiveReload.toFixed(1)),
      dpm: parseFloat(dpm.toFixed(1)),
    })
  }

  const avgDmgPerCannon = cannonsArmed > 0 ? totalVolley / cannonsArmed : 0

  return {
    volleyDamage: parseFloat(totalVolley.toFixed(1)),
    damagePerMinute: parseFloat(totalDPM.toFixed(1)),
    avgDmgPerCannon: parseFloat(avgDmgPerCannon.toFixed(1)),
    cannonsArmed,
    totalSlots: mergedSlots.length,
    dmgBonusPct: parseFloat((dmgBonus * 100).toFixed(1)),
    targetArmourLost: parseFloat(targetArmour.toFixed(1)),
    slotResults,
    bonusPills,
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format a number with commas e.g. 12345 → "12,345" */
export function fmt(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

/** Build default empty cannon slots for a ship */
export function buildDefaultSlots(shipId: string): CannonSlot[] {
  const ship = getShipById(shipId)
  if (!ship) return []
  const layout = parseWeaponSlots(ship.heavyWeapons)
  const slots: CannonSlot[] = []
  for (let i = 0; i < layout.bow; i++) {
    slots.push({ position: 'bow', index: i, cannonId: 'none' })
  }
  for (let i = 0; i < layout.broadside; i++) {
    slots.push({ position: 'broadside', index: i, cannonId: 'none' })
  }
  for (let i = 0; i < layout.stern; i++) {
    slots.push({ position: 'stern', index: i, cannonId: 'none' })
  }
  return slots
}

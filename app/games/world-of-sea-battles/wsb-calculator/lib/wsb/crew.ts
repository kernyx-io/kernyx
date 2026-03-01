import type { CrewMember } from './types'

export const CREW: CrewMember[] = [
  // ─── Pirates ─────────────────────────────────────────────────────────────────
  { id: 'connie',      faction: 'Buccaneers', name: 'Connie',             types: ['Boarding'],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'General league bows +50%.' },
  { id: 'skipper',     faction: 'Buccaneers', name: 'Skipper',            types: ['Boarding'],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Max range +5–10% during boarding per transfer.' },
  { id: 'powder_monkey', faction: 'Buccaneers', name: 'Powder Monkey',   types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0.25, speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Flintlock reload speed +25%.' },
  { id: 'clark',       faction: 'Buccaneers', name: 'Clark',              types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Faster blow to ship: movement/upgrades +1%.' },
  { id: 'ballancer',   faction: 'Buccaneers', name: 'Ballancer',          types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Item plunder range +50%.' },
  { id: 'landlord',    faction: 'Buccaneers', name: 'Landlord',           types: ['Special'],             dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Vitality by rage +50%.' },
  { id: 'cannibal',    faction: 'Buccaneers', name: 'Cannibal',           types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Crew does not die during combat action.' },
  { id: 'navigator_p', faction: 'Buccaneers', name: 'Navigator',          types: ['Boarding'],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Minimize attack range +50%.' },
  { id: 'gunner_p',    faction: 'Buccaneers', name: 'Gunner',             types: ['Combat'],              dmgBonus: 0.12, reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Charging party gun quality +50%. Damage +12%.' },
  { id: 'quartermaster', faction: 'Buccaneers', name: 'Quartermaster',   types: ['Special'],             dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'When boarding begins, only one random target selected.' },
  { id: 'senior_neg',  faction: 'Buccaneers', name: 'Senior Negotiator', types: ['Boarding', 'Special'], dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Crew healing after boarding +25%.' },
  { id: 'harpooner',   faction: 'Buccaneers', name: 'Harpooner',          types: ['Boarding'],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Grappling hook reload speed +50%.' },
  { id: 'recruiter',   faction: 'Buccaneers', name: 'Recruiter',          types: ['Boarding'],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Crew hint for sea/boarding phrase +$5.' },

  // ─── Sailors ──────────────────────────────────────────────────────────────────
  { id: 'pilot',         faction: 'Corsairs', name: 'Pilot',           types: ['Special'],   dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0.31, bonusDesc: 'Turning speed penalty in naval mode -31%.' },
  { id: 'outdoor',       faction: 'Corsairs', name: 'Outdoor',         types: ['Special'],   dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Evergreen enhancer for boat.' },
  { id: 'sailing_master',faction: 'Corsairs', name: 'Sailing Master',  types: ['Boarding'],  dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0.25, maneuverBonus: 0,    bonusDesc: 'Speed +25%.' },
  { id: 'helmsman',      faction: 'Corsairs', name: 'Helmsman',        types: ['Boarding'],  dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0.25, bonusDesc: 'At-dunk +25%, maneuver -5.' },
  { id: 'cook',          faction: 'Corsairs', name: 'Cook',            types: ['Special'],   dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Sail flute/oil and blast +50%.' },
  { id: 'steersman',     faction: 'Corsairs', name: 'Steersman',       types: [],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Maneuver on specific first gear +5.' },
  { id: 'sailmaker',     faction: 'Corsairs', name: 'Sailmaker',       types: ['Combat'],    dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Sail reload speed +50%.' },
  { id: 'clerk',         faction: 'Corsairs', name: 'Clerk',           types: ['Boarding'],  dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Weapon acquisition chance reduction +50%.' },
  { id: 'navigator_s',   faction: 'Corsairs', name: 'Navigator',       types: ['Boarding'],  dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Helps keep straight course.' },
  { id: 'carpenter',     faction: 'Corsairs', name: 'Carpenter',       types: [],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: '+0.5% reach speed per sailor.' },
  { id: 'fisherman',     faction: 'Corsairs', name: 'Fisherman',       types: ['Combat'],    dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: '+0.5% fishing catch per transfer.' },
  { id: 'ships_carpenter',faction: 'Corsairs', name: "Ship's Carpenter", types: ['Combat'],  dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Board and bore at speed, not slower.' },
  { id: 'gunman',        faction: 'Corsairs', name: 'Gunman',          types: [],            dmgBonus: 0.05, reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: '+1% firing speed per sailor. Damage +5%.' },
  { id: 'supersurgeon',  faction: 'Corsairs', name: 'Supersurgeon',    types: ['Combat'],    dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: 'Speed penalty for sailors overload -50%.' },
  { id: 'first_mate',    faction: 'Corsairs', name: 'First Mate',      types: [],            dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0,    maneuverBonus: 0,    bonusDesc: '+0.25% speed gain per sailor.' },

  // ─── Military ────────────────────────────────────────────────────────────────
  { id: 'midshipman',   faction: 'Naval Officers', name: 'Midshipman',        types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: "Crew won't abandon defense during boarding." },
  { id: 'commander',    faction: 'Naval Officers', name: 'Commander',          types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Curl lifting speed +75%.' },
  { id: 'gunner_m',     faction: 'Naval Officers', name: 'Gunner',             types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0.50, speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Weapon reload speed +50%.' },
  { id: 'watchman',     faction: 'Naval Officers', name: 'Watchman',           types: ['Combat'],              dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Fire extinguishing speed +50%.' },
  { id: 'officer',      faction: 'Naval Officers', name: 'Officer',            types: ['Special'],             dmgBonus: 0.08, reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: '+0.75% extra damage per sailor. Damage +8%.' },
  { id: 'side_bomb',    faction: 'Naval Officers', name: 'Side Bombardment',   types: ['Special'],             dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: '+0.5% item repair per sailor.' },
  { id: 'junior_peasant',faction: 'Naval Officers', name: 'Junior Peasant',   types: ['Special'],             dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Large fire damage +20%.' },
  { id: 'armourer',     faction: 'Naval Officers', name: 'Armourer',           types: [],                      dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Item restoration 50% faster.' },
  { id: 'constable',    faction: 'Naval Officers', name: 'Constable',          types: [],                      dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: '+8% difficulty; +0.5% restore reload -0.5% per sailor.' },
  { id: 'surgeon',      faction: 'Naval Officers', name: 'Surgeon',            types: [],                      dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Bound to two crew pool of wounded crew.' },
  { id: 'artificer',    faction: 'Naval Officers', name: 'Artificer',          types: ['Combat'],              dmgBonus: 0.10, reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Weapon aiming speed +50%. Damage +10%.' },
  { id: 'whisperer',    faction: 'Naval Officers', name: 'Whisperer',          types: ['Boarding', 'Incoming'], dmgBonus: 0.05, reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Crammed damage and NPCs +25%. Damage +5%.' },
  { id: 'sentinabler',  faction: 'Naval Officers', name: 'Sentinabler',        types: [],                      dmgBonus: 0,    reloadBonus: 0,    speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Water reload -50% if rumors invited.' },

  // ─── Adventurers ─────────────────────────────────────────────────────────────
  { id: 'alchemist',   faction: 'Adventurers', name: 'Alchemist',   types: [],                   dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: '+25% chance to find unique icons when rewarding ships.' },
  { id: 'veteran',     faction: 'Adventurers', name: 'Veteran',     types: ['Special'],          dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: 'No river and crumbling part penalties.' },
  { id: 'explorer',    faction: 'Adventurers', name: 'Explorer',    types: ['Incoming'],         dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: '+5% chance to find unique icons at sea.' },
  { id: 'experienced', faction: 'Adventurers', name: 'Experienced', types: ['Incoming','Special'],dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: '+5% ending relevant dream, appending ship coverage.' },
  { id: 'garibor',     faction: 'Adventurers', name: 'Garibor',     types: ['Incoming'],         dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: '+5% chance to find unique items per game mode.' },
  { id: 'seafood',     faction: 'Adventurers', name: 'Seafood',     types: ['Special'],          dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: 'Becomes trustworthy over time.' },
  { id: 'lucky',       faction: 'Adventurers', name: 'Lucky',       types: [],                   dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: '-25% chance to find divine forms at sea.' },
  { id: 'scout',       faction: 'Adventurers', name: 'Scout',       types: [],                   dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: '+5% chance to find items from those encountered traveling.' },
  { id: 'sailor_adv',  faction: 'Adventurers', name: 'Sailor',      types: [],                   dmgBonus: 0, reloadBonus: 0, speedBonus: 0, maneuverBonus: 0, bonusDesc: '+5% chance to find icons at sea and islands.' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const CREW_FACTIONS = [
  'Buccaneers',
  'Corsairs',
  'Naval Officers',
  'Adventurers',
] as const

export function getCrewById(id: string): CrewMember | undefined {
  return CREW.find((c) => c.id === id)
}

export function getCrewByFaction(faction: string): CrewMember[] {
  return CREW.filter((c) => c.faction === faction)
}

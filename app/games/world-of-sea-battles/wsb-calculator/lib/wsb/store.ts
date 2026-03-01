'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CannonSlot, AttachmentSlot, CosmeticSlot } from './types'
import { buildDefaultSlots } from './calculator'

// ─── State Shape ──────────────────────────────────────────────────────────────

interface WsbState {
  // Selections
  shipId: string
  targetShipId: string
  ammoId: string
  cannonSlots: CannonSlot[]
  attachmentIds: string[]
  cosmeticIds: string[]
  crewIds: string[]
  supportIds: string[]
  armourTypeId: string

  // Actions
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
  resetAll: () => void
}

// ─── Default Values ───────────────────────────────────────────────────────────

const DEFAULTS = {
  shipId: 'none',
  targetShipId: 'none',
  ammoId: 'round',
  cannonSlots: [] as CannonSlot[],
  attachmentIds: [] as string[],
  cosmeticIds: [] as string[],
  crewIds: [] as string[],
  supportIds: [] as string[],
  armourTypeId: 'none',
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useWsbStore = create<WsbState>()(
  persist(
    (set, get) => ({
      ...DEFAULTS,

      // ── Ship selection — rebuilds cannon slots automatically ────────────────
      setShip: (id) => {
        const slots = buildDefaultSlots(id)
        set({ shipId: id, cannonSlots: slots })
      },

      // ── Target ship ────────────────────────────────────────────────────────
      setTargetShip: (id) => set({ targetShipId: id }),

      // ── Ammo ───────────────────────────────────────────────────────────────
      setAmmo: (id) => set({ ammoId: id }),

      // ── Cannon slot assignment ─────────────────────────────────────────────
      setCannonSlot: (position, index, cannonId) => {
        const slots = get().cannonSlots.map((s) =>
          s.position === position && s.index === index
            ? { ...s, cannonId }
            : s
        )
        // If slot doesn't exist yet, add it
        const exists = get().cannonSlots.some(
          (s) => s.position === position && s.index === index
        )
        if (!exists) {
          slots.push({ position, index, cannonId })
        }
        set({ cannonSlots: slots })
      },

      // ── Attachments — one sail slot max, up to 5 general slots ────────────
      toggleAttachment: (id, slotType) => {
        const current = get().attachmentIds
        if (current.includes(id)) {
          // Deselect
          set({ attachmentIds: current.filter((a) => a !== id) })
          return
        }
        if (slotType === 'sail') {
          // Only one sail slot — replace any existing sail attachment
          const withoutSail = current.filter((a) => {
            const att = import('./attachments').then(m =>
              m.getAttachmentsBySlot('sail').some(s => s.id === a)
            )
            return att
          })
          // Simple approach: replace if already have a sail attachment
          set({ attachmentIds: [...current.filter((a) => !isSailAttachment(a)), id] })
        } else {
          // Up to 5 general slots
          const generalCount = current.filter((a) => !isSailAttachment(a)).length
          if (generalCount >= 5) return
          set({ attachmentIds: [...current, id] })
        }
      },

      // ── Cosmetics ─────────────────────────────────────────────────────────
      toggleCosmetic: (id, _slotType) => {
        const current = get().cosmeticIds
        if (current.includes(id)) {
          set({ cosmeticIds: current.filter((c) => c !== id) })
        } else {
          set({ cosmeticIds: [...current, id] })
        }
      },

      // ── Crew — max 4 ──────────────────────────────────────────────────────
      toggleCrew: (id) => {
        const current = get().crewIds
        if (current.includes(id)) {
          set({ crewIds: current.filter((c) => c !== id) })
        } else {
          if (current.length >= 4) return
          set({ crewIds: [...current, id] })
        }
      },

      // ── Support — max 3 ───────────────────────────────────────────────────
      toggleSupport: (id) => {
        const current = get().supportIds
        if (current.includes(id)) {
          set({ supportIds: current.filter((s) => s !== id) })
        } else {
          if (current.length >= 3) return
          set({ supportIds: [...current, id] })
        }
      },

      // ── Armour type ───────────────────────────────────────────────────────
      setArmourType: (id) => set({ armourTypeId: id }),

      // ── Reset cannon slots only (when ship changes) ───────────────────────
      resetSlots: () => {
        const slots = buildDefaultSlots(get().shipId)
        set({ cannonSlots: slots })
      },

      // ── Full reset ────────────────────────────────────────────────────────
      resetAll: () => set({ ...DEFAULTS }),
    }),
    {
      name: 'wsb-calculator-v1', // localStorage key
      // Only persist selections, not actions
      partialize: (state) => ({
        shipId: state.shipId,
        targetShipId: state.targetShipId,
        ammoId: state.ammoId,
        cannonSlots: state.cannonSlots,
        attachmentIds: state.attachmentIds,
        cosmeticIds: state.cosmeticIds,
        crewIds: state.crewIds,
        supportIds: state.supportIds,
        armourTypeId: state.armourTypeId,
      }),
    }
  )
)

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Sail attachment IDs — kept in sync with attachments.ts
const SAIL_ATTACHMENT_IDS = new Set([
  'cheap_sails',
  'stitched_sails',
  'elite_sails',
  'tarpaulin_sails',
])

function isSailAttachment(id: string): boolean {
  return SAIL_ATTACHMENT_IDS.has(id)
}

// ─── Selector Hooks ───────────────────────────────────────────────────────────
// Pre-built selectors to avoid unnecessary re-renders

export const selectShipId = (s: WsbState) => s.shipId
export const selectTargetShipId = (s: WsbState) => s.targetShipId
export const selectAmmoId = (s: WsbState) => s.ammoId
export const selectCannonSlots = (s: WsbState) => s.cannonSlots
export const selectAttachmentIds = (s: WsbState) => s.attachmentIds
export const selectCrewIds = (s: WsbState) => s.crewIds
export const selectSupportIds = (s: WsbState) => s.supportIds

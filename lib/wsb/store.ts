'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CannonSlot, AttachmentSlot, CosmeticSlot } from './types'
import { buildDefaultSlots } from './calculator'

// ─── Sail attachment IDs — kept in sync with attachments.ts ──────────────────
const SAIL_IDS = new Set([
  'cheap_sails',
  'stitched_sails',
  'elite_sails',
  'tarpaulin_sails',
])

// ─── State Shape ──────────────────────────────────────────────────────────────

interface WsbState {
  shipId: string
  targetShipId: string
  ammoId: string
  cannonSlots: CannonSlot[]
  attachmentIds: string[]
  cosmeticIds: string[]
  crewIds: string[]
  supportIds: string[]
  armourTypeId: string

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

// ─── Defaults ─────────────────────────────────────────────────────────────────

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

      setShip: (id) => {
        set({ shipId: id, cannonSlots: buildDefaultSlots(id) })
      },

      setTargetShip: (id) => set({ targetShipId: id }),

      setAmmo: (id) => set({ ammoId: id }),

      setCannonSlot: (position, index, cannonId) => {
        const existing = get().cannonSlots
        const exists = existing.some(s => s.position === position && s.index === index)
        if (exists) {
          set({ cannonSlots: existing.map(s =>
            s.position === position && s.index === index ? { ...s, cannonId } : s
          )})
        } else {
          set({ cannonSlots: [...existing, { position, index, cannonId }] })
        }
      },

      toggleAttachment: (id, slotType) => {
        const current = get().attachmentIds
        // Deselect if already active
        if (current.includes(id)) {
          set({ attachmentIds: current.filter(a => a !== id) })
          return
        }
        if (slotType === 'sail') {
          // Replace any existing sail attachment (max 1)
          set({ attachmentIds: [...current.filter(a => !SAIL_IDS.has(a)), id] })
        } else {
          // Max 5 general slots
          const generalCount = current.filter(a => !SAIL_IDS.has(a)).length
          if (generalCount >= 5) return
          set({ attachmentIds: [...current, id] })
        }
      },

      toggleCosmetic: (id, _slotType) => {
        const current = get().cosmeticIds
        set({
          cosmeticIds: current.includes(id)
            ? current.filter(c => c !== id)
            : [...current, id],
        })
      },

      toggleCrew: (id) => {
        const current = get().crewIds
        if (current.includes(id)) {
          set({ crewIds: current.filter(c => c !== id) })
        } else {
          if (current.length >= 4) return
          set({ crewIds: [...current, id] })
        }
      },

      toggleSupport: (id) => {
        const current = get().supportIds
        if (current.includes(id)) {
          set({ supportIds: current.filter(s => s !== id) })
        } else {
          if (current.length >= 3) return
          set({ supportIds: [...current, id] })
        }
      },

      setArmourType: (id) => set({ armourTypeId: id }),

      resetSlots: () => set({ cannonSlots: buildDefaultSlots(get().shipId) }),

      resetAll: () => set({ ...DEFAULTS }),
    }),
    {
      name: 'wsb-calculator-v1',
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

// ─── Selector hooks ───────────────────────────────────────────────────────────

export const selectShipId       = (s: WsbState) => s.shipId
export const selectTargetShipId = (s: WsbState) => s.targetShipId
export const selectAmmoId       = (s: WsbState) => s.ammoId
export const selectCannonSlots  = (s: WsbState) => s.cannonSlots
export const selectAttachmentIds = (s: WsbState) => s.attachmentIds
export const selectCrewIds      = (s: WsbState) => s.crewIds
export const selectSupportIds   = (s: WsbState) => s.supportIds

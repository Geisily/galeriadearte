'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Artwork, CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (artwork: Artwork) => void
  removeItem: (artworkId: string) => void
  updateQuantity: (artworkId: string, quantity: number) => void
  clearCart: () => void
  count: () => number
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (artwork: Artwork) => {
        set(state => {
          const existing = state.items.find(i => i.artwork._id === artwork._id)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.artwork._id === artwork._id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          return { items: [...state.items, { artwork, quantity: 1 }] }
        })
      },

      removeItem: (artworkId: string) => {
        set(state => ({
          items: state.items.filter(i => i.artwork._id !== artworkId),
        }))
      },

      updateQuantity: (artworkId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(artworkId)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.artwork._id === artworkId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      total: () =>
        get().items.reduce((sum, i) => sum + i.artwork.price * i.quantity, 0),
    }),
    { name: 'galeria-cart' }
  )
)

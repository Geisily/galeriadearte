import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartStore, Artwork } from '../types'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (artwork: Artwork) => {
        const existing = get().items.find(i => i.artwork._id === artwork._id)
        if (existing) return
        set(state => ({ items: [...state.items, { artwork, quantity: 1 }] }))
      },

      removeItem: (id: string) => {
        set(state => ({ items: state.items.filter(i => i.artwork._id !== id) }))
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.artwork._id === id ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.artwork.price * i.quantity, 0),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'gallery-cart' }
  )
)

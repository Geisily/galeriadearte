export interface Artwork {
  _id: string
  title: string
  artist: string
  description: string
  price: number
  year: number
  dimensions: string
  medium: string
  category: string
  inStock: boolean
  slug: { current: string }
  image: {
    asset: { _ref: string }
    alt?: string
  }
}

export interface CartItem {
  artwork: Artwork
  quantity: number
}

export interface CartStore {
  items: CartItem[]
  addItem: (artwork: Artwork) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

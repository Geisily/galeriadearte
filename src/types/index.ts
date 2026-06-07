export type Artwork = {
  _id: string
  title: string
  slug: { current: string }
  image: { asset: { _ref: string }; alt?: string }
  price: number
  inStock: boolean
  category: string
  medium: string
  dimensions?: string
  year: number
  description?: string
  artist: string
}

export type CartItem = { artwork: Artwork; quantity: number }

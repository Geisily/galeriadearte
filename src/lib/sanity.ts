import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: object) {
  return builder.image(source)
}

export const queries = {
  allArtworks: `*[_type == "artwork"] | order(year desc) {
    _id, title, artist, description, price, year,
    dimensions, medium, category, inStock, slug, image
  }`,

  artworkBySlug: (slug: string) => `
    *[_type == "artwork" && slug.current == "${slug}"][0] {
      _id, title, artist, description, price, year,
      dimensions, medium, category, inStock, slug, image
    }
  `,

  artworksByCategory: (category: string) => `
    *[_type == "artwork" && category == "${category}"] | order(year desc) {
      _id, title, artist, description, price, year,
      dimensions, medium, category, inStock, slug, image
    }
  `,

  categories: `array::unique(*[_type == "artwork"].category)`,
}

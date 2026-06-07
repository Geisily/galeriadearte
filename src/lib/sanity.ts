import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = createImageUrlBuilder(sanityClient)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

export const queries = {
  allArtworks: `*[_type == "artwork"] | order(_createdAt desc) { _id, title, slug, image, price, inStock, category, medium, dimensions, year, description, artist }`,
  artworkBySlug: `*[_type == "artwork" && slug.current == $slug][0] { _id, title, slug, image, price, inStock, category, medium, dimensions, year, description, artist }`,
  artworksByCategory: `*[_type == "artwork" && category == $category] | order(_createdAt desc) { _id, title, slug, image, price, inStock, category, medium, dimensions, year }`,
}

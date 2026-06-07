import type { MetadataRoute } from 'next'
import { sanityClient, queries } from '@/lib/sanity'
import { mockArtworks } from '@/lib/mockData'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alemaovargasmoreira.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/galeria`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/sobre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contato`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/encomenda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  let artworks = mockArtworks
  try {
    const data = await sanityClient.fetch(queries.allArtworks)
    if (Array.isArray(data) && data.length > 0) artworks = data
  } catch { /* noop */ }

  const artworkRoutes: MetadataRoute.Sitemap = artworks.map(artwork => ({
    url: `${SITE_URL}/obra/${artwork.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...artworkRoutes]
}

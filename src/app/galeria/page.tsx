import type { Metadata } from 'next'
import { sanityClient, queries } from '@/lib/sanity'
import { mockArtworks } from '@/lib/mockData'
import type { Artwork } from '@/types'
import { GalleryClient } from '@/components/gallery/GalleryClient'

export const metadata: Metadata = {
  title: 'Galeria de Obras',
  description:
    'Explore a coleção completa de pinturas a óleo realistas — retratos, paisagens, natureza morta e cenas urbanas. Obras originais à venda.',
  openGraph: {
    url: 'https://alemaovargasmoreira.com.br/galeria',
  },
}

async function getArtworks(): Promise<Artwork[]> {
  try {
    const data = await sanityClient.fetch(queries.allArtworks)
    if (Array.isArray(data) && data.length > 0) return data
  } catch {
    // fall through to mock
  }
  return mockArtworks
}

export default async function GaleriaPage() {
  const artworks = await getArtworks()

  return (
    <div>
      {/* Page header */}
      <div
        className="border-b"
        style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="section-label mb-3">Coleção</p>
          <h1
            className="text-serif font-semibold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--teal-900)' }}
          >
            Galeria de Obras
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--teal-600)', maxWidth: '480px' }}>
            Pinturas a óleo originais disponíveis para sua coleção.
          </p>
        </div>
      </div>

      <GalleryClient artworks={artworks} />
    </div>
  )
}

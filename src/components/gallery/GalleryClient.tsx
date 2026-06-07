'use client'
import { useState } from 'react'
import type { Artwork } from '@/types'
import { ArtworkCard } from '@/components/artwork/ArtworkCard'

const categories = ['Todas', 'Retrato', 'Natureza Morta', 'Paisagem', 'Cena Urbana']

interface Props {
  artworks: Artwork[]
  initialCategory?: string
}

export function GalleryClient({ artworks, initialCategory = 'Todas' }: Props) {
  const [active, setActive] = useState(
    categories.includes(initialCategory) ? initialCategory : 'Todas'
  )

  const filtered = active === 'Todas'
    ? artworks
    : artworks.filter(a => a.category === active)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm cursor-pointer transition-all duration-200"
            style={
              active === cat
                ? { backgroundColor: 'var(--terra)', color: '#fff' }
                : {
                    backgroundColor: 'var(--card)',
                    color: 'var(--teal-700)',
                    border: '1px solid #e8e0d6',
                  }
            }
          >
            {cat}
          </button>
        ))}
        <span
          className="ml-auto self-center text-xs"
          style={{ color: 'var(--cream-3)' }}
        >
          {filtered.length} {filtered.length === 1 ? 'obra' : 'obras'}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map(artwork => (
            <ArtworkCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
      ) : (
        <div className="text-center py-28" style={{ color: 'var(--teal-600)' }}>
          <p className="text-serif text-xl mb-2">Nenhuma obra nesta categoria</p>
          <p className="text-sm">Selecione outra categoria acima.</p>
        </div>
      )}
    </div>
  )
}

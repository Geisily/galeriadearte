import { useState } from 'react'
import { mockArtworks } from '../lib/mockData'
import { ArtworkCard } from '../components/artwork/ArtworkCard'

const categories = ['Todas', 'Retrato', 'Natureza Morta', 'Paisagem', 'Cena Urbana']

export function GalleryPage() {
  const [active, setActive] = useState('Todas')

  const filtered = active === 'Todas'
    ? mockArtworks
    : mockArtworks.filter(a => a.category === active)

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs text-amber-500 tracking-[0.4em] uppercase mb-2">Coleção</p>
        <h1 className="text-4xl font-light text-white">Galeria de Obras</h1>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
              active === cat
                ? 'bg-amber-700 text-white'
                : 'border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(artwork => (
          <ArtworkCard key={artwork._id} artwork={artwork} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-neutral-600 py-20">Nenhuma obra nesta categoria.</p>
      )}
    </main>
  )
}

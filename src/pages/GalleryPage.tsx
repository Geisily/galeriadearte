import { useState } from 'react'
import { mockArtworks } from '../lib/mockData'
import { ArtworkCard } from '../components/artwork/ArtworkCard'
import { SEO } from '../components/SEO'

const categories = ['Todas', 'Retrato', 'Natureza Morta', 'Paisagem', 'Cena Urbana']

export function GalleryPage() {
  const [active, setActive] = useState('Todas')

  const filtered = active === 'Todas'
    ? mockArtworks
    : mockArtworks.filter(a => a.category === active)

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <SEO
        title="Galeria de Obras"
        description="Explore a coleção completa de pinturas a óleo realistas — retratos, paisagens, natureza morta e cenas urbanas. Obras originais à venda."
        url="https://alemaovargasmoreira.com.br/galeria"
      />
      <div className="mb-12">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-2 font-semibold"
          style={{ color: 'var(--salmon)' }}
        >
          Coleção
        </p>
        <h1 className="text-4xl font-bold" style={{ color: 'var(--teal-900)' }}>
          Galeria de Obras
        </h1>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-2 text-xs font-bold tracking-widest uppercase rounded cursor-pointer transition-all duration-200"
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
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(artwork => (
          <ArtworkCard key={artwork._id} artwork={artwork} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-20" style={{ color: 'var(--teal-600)' }}>
          Nenhuma obra nesta categoria.
        </p>
      )}
    </main>
  )
}

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { mockArtworks } from '../lib/mockData'
import { ArtworkCard } from '../components/artwork/ArtworkCard'
import { SEO } from '../components/SEO'

const categories = ['Todas', 'Retrato', 'Natureza Morta', 'Paisagem', 'Cena Urbana']

export function GalleryPage() {
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') || 'Todas'
  const [active, setActive] = useState(
    categories.includes(initialCat) ? initialCat : 'Todas'
  )

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && categories.includes(cat)) setActive(cat)
  }, [searchParams])

  const filtered = active === 'Todas'
    ? mockArtworks
    : mockArtworks.filter(a => a.category === active)

  return (
    <main>
      <SEO
        title="Galeria de Obras"
        description="Explore a coleção completa de pinturas a óleo realistas — retratos, paisagens, natureza morta e cenas urbanas. Obras originais à venda."
        url="https://alemaovargasmoreira.com.br/galeria"
      />

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
    </main>
  )
}

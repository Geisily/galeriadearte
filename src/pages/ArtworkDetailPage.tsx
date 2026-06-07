import { useParams, Link } from 'react-router-dom'
import { mockArtworks, placeholderImages } from '../lib/mockData'
import { useCartStore } from '../store/cartStore'

export function ArtworkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const addItem = useCartStore(s => s.addItem)
  const items = useCartStore(s => s.items)

  const artwork = mockArtworks.find(a => a.slug.current === slug)

  if (!artwork) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="text-neutral-500">Obra não encontrada.</p>
        <Link to="/galeria" className="mt-4 inline-block text-sm text-amber-500 hover:underline">
          Voltar à galeria
        </Link>
      </main>
    )
  }

  const inCart = items.some(i => i.artwork._id === artwork._id)

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <Link to="/galeria" className="text-sm text-neutral-600 hover:text-white transition-colors tracking-wider uppercase">
        ← Galeria
      </Link>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Imagem */}
        <div className="bg-neutral-900 overflow-hidden">
          <img
            src={placeholderImages[artwork._id] || ''}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detalhes */}
        <div className="flex flex-col justify-center">
          <p className="text-xs text-amber-500 tracking-[0.4em] uppercase mb-3">{artwork.category}</p>
          <h1 className="text-4xl font-light text-white leading-tight">{artwork.title}</h1>
          <p className="mt-1 text-sm text-neutral-500 tracking-wider">{artwork.artist} · {artwork.year}</p>

          <p className="mt-6 text-neutral-400 leading-relaxed">{artwork.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-8">
            {[
              { label: 'Técnica', value: artwork.medium },
              { label: 'Dimensões', value: artwork.dimensions },
              { label: 'Ano', value: String(artwork.year) },
              { label: 'Categoria', value: artwork.category },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-neutral-600 uppercase tracking-widest">{label}</p>
                <p className="mt-1 text-sm text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-8">
            {artwork.inStock ? (
              <>
                <p className="text-2xl text-amber-400 font-light">
                  R$ {artwork.price.toLocaleString('pt-BR')}
                </p>
                <button
                  onClick={() => addItem(artwork)}
                  disabled={inCart}
                  className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors ${
                    inCart
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      : 'bg-amber-700 text-white hover:bg-amber-600'
                  }`}
                >
                  {inCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}
                </button>
              </>
            ) : (
              <p className="text-neutral-600 text-sm tracking-wider uppercase">Esta obra foi vendida</p>
            )}
          </div>

          {inCart && (
            <Link
              to="/carrinho"
              className="mt-3 text-sm text-amber-500 hover:underline text-right"
            >
              Ver carrinho →
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}

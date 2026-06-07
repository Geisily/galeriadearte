import { useParams, Link } from 'react-router-dom'
import { mockArtworks, placeholderImages, artistInfo } from '../lib/mockData'
import { useCartStore } from '../store/cartStore'
import { SEO } from '../components/SEO'
import { ArtworkCard } from '../components/artwork/ArtworkCard'

export function ArtworkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const addItem = useCartStore(s => s.addItem)
  const items = useCartStore(s => s.items)

  const artwork = mockArtworks.find(a => a.slug.current === slug)

  if (!artwork) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p style={{ color: 'var(--bege-d)' }}>Obra não encontrada.</p>
        <Link to="/galeria" className="mt-4 inline-block text-sm hover:underline" style={{ color: 'var(--terra)' }}>
          ← Voltar à galeria
        </Link>
      </main>
    )
  }

  const inCart = items.some(i => i.artwork._id === artwork._id)
  const related = mockArtworks.filter(a => a._id !== artwork._id && a.category === artwork.category).slice(0, 3)

  const artworkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: artwork.title,
    description: artwork.description,
    image: placeholderImages[artwork._id],
    brand: { '@type': 'Person', name: artistInfo.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: artwork.price,
      availability: artwork.inStock ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `https://alemaovargasmoreira.com.br/obra/${artwork.slug.current}`,
    },
  }

  return (
    <main>
      <SEO
        title={artwork.title}
        description={`${artwork.description} ${artwork.medium}, ${artwork.dimensions}, ${artwork.year}.`}
        image={placeholderImages[artwork._id]}
        url={`https://alemaovargasmoreira.com.br/obra/${artwork.slug.current}`}
        type="product"
        jsonLd={artworkJsonLd}
      />

      {/* Breadcrumb */}
      <div className="border-b" style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs" style={{ color: 'var(--bege-d)' }}>
          <Link to="/" className="hover:text-[var(--terra)] transition-colors">Início</Link>
          <span>/</span>
          <Link to="/galeria" className="hover:text-[var(--terra)] transition-colors">Galeria</Link>
          <span>/</span>
          <span style={{ color: 'var(--grafite)' }}>{artwork.title}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Image */}
          <div className="sticky top-24 self-start">
            <div
              className="overflow-hidden"
              style={{
                aspectRatio: '4/5',
                borderRadius: '1px',
                boxShadow: '0 8px 48px rgba(30,75,90,0.12)',
                backgroundColor: 'var(--bege-l)',
              }}
            >
              <img
                src={placeholderImages[artwork._id] || ''}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="section-label mb-3">{artwork.category}</p>
            <h1
              className="text-serif font-semibold mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--grafite)', lineHeight: 1.1 }}
            >
              {artwork.title}
            </h1>
            <p className="text-xs mb-6" style={{ color: 'var(--bege-d)' }}>
              {artwork.artist} · {artwork.year}
            </p>

            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--grafite)', lineHeight: 1.8 }}>
              {artwork.description}
            </p>

            {/* Specs grid */}
            <div
              className="grid grid-cols-2 gap-px mb-8"
              style={{ backgroundColor: 'var(--bege)', border: '1px solid var(--bege)', borderRadius: '1px' }}
            >
              {[
                { label: 'Técnica', value: artwork.medium },
                { label: 'Dimensões', value: artwork.dimensions || '—' },
                { label: 'Ano', value: String(artwork.year) },
                { label: 'Categoria', value: artwork.category },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="px-5 py-4"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--bege-d)' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--grafite)' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Certificate badge */}
            <div
              className="flex items-center gap-4 p-4 mb-8 rounded-sm"
              style={{ backgroundColor: 'var(--bege-l)', border: '1px solid var(--bege)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--terra)', color: '#fff' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--grafite)' }}>Certificado de Autenticidade</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--bege-d)' }}>
                  Incluído com a obra · assinado pelo artista
                </p>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="pt-6" style={{ borderTop: '1px solid var(--bege)' }}>
              {artwork.inStock ? (
                <>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-serif font-semibold" style={{ fontSize: '2rem', color: 'var(--grafite)' }}>
                      R$ {artwork.price.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--bege-d)' }}>à vista · ou parcelado via MP</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => addItem(artwork)}
                      disabled={inCart}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '1rem',
                        opacity: inCart ? 0.7 : 1,
                        cursor: inCart ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {inCart ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          No Carrinho
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Adicionar ao Carrinho
                        </>
                      )}
                    </button>

                    <a
                      href={`${artistInfo.whatsappLink}?text=${encodeURIComponent(`Olá! Tenho interesse na obra "${artwork.title}" (R$ ${artwork.price.toLocaleString('pt-BR')}). Podemos conversar?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', color: 'var(--petrol)', borderColor: 'var(--bege)' }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                      Perguntar pelo WhatsApp
                    </a>
                  </div>

                  {inCart && (
                    <Link to="/carrinho" className="btn-ghost mt-4 w-full justify-center">
                      Ver carrinho →
                    </Link>
                  )}
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-serif text-xl mb-2" style={{ color: 'var(--bege-d)' }}>Esta obra foi vendida</p>
                  <Link to="/encomenda" className="btn-primary mt-4">
                    Solicitar Obra Similar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── A História por trás da Obra ─────────────────── */}
        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 p-10 rounded-sm"
          style={{ backgroundColor: 'var(--bege-l)', border: '1px solid var(--bege)' }}
        >
          <div>
            <p className="section-label mb-4">Processo Criativo</p>
            <h2 className="text-serif font-semibold mb-4" style={{ fontSize: '1.8rem', color: 'var(--grafite)' }}>
              A história por trás da obra
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grafite)', lineHeight: 1.8 }}>
              Cada pintura nasce de semanas de observação. Antes de tocar o pincel na tela,
              o artista estuda a luz, as texturas e a emoção que quer transmitir.
              Esta obra reflete esse processo silencioso — camada por camada, do esboço ao acabamento final.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {[
              { icon: '⏳', label: 'Tempo de execução', value: '3 a 6 semanas' },
              { icon: '🎨', label: 'Material', value: `${artwork.medium} sobre tela de linho` },
              { icon: '📐', label: 'Dimensões', value: artwork.dimensions || 'Sob consulta' },
              { icon: '🔒', label: 'Verniz de proteção', value: 'Aplicado após cura completa' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--bege-d)' }}>{item.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--grafite)' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Obras Relacionadas ──────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-20">
            <p className="section-label mb-3">Mais obras</p>
            <h2 className="text-serif font-semibold mb-10" style={{ fontSize: '1.8rem', color: 'var(--grafite)' }}>
              Você também pode gostar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {related.map(a => <ArtworkCard key={a._id} artwork={a} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

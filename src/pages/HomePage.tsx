import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockArtworks, artistInfo, placeholderImages } from '../lib/mockData'
import { ArtworkCard } from '../components/artwork/ArtworkCard'
import { SEO } from '../components/SEO'

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: artistInfo.name,
  jobTitle: 'Pintor Realista',
  description: artistInfo.bio,
  url: 'https://alemaovargasmoreira.com.br',
  sameAs: [artistInfo.tiktok],
  knowsAbout: ['Pintura a óleo', 'Realismo', 'Arte brasileira'],
}

const categoryData = [
  { label: 'Retrato', count: 3 },
  { label: 'Paisagem', count: 1 },
  { label: 'Natureza Morta', count: 1 },
  { label: 'Cena Urbana', count: 1 },
]

type Filter = 'Todas' | 'Disponíveis' | 'Vendidas'

export function HomePage() {
  const [filter, setFilter] = useState<Filter>('Todas')

  const featured = (() => {
    if (filter === 'Disponíveis') return mockArtworks.filter(a => a.inStock).slice(0, 3)
    if (filter === 'Vendidas') return mockArtworks.filter(a => !a.inStock).slice(0, 3)
    return mockArtworks.slice(0, 3)
  })()

  return (
    <main>
      <SEO
        description={`${artistInfo.bio} Obras originais à venda. TikTok ${artistInfo.tiktokHandle}.`}
        jsonLd={homeJsonLd}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--teal-900)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          {/* texto */}
          <div className="flex-1 animate-fade-up">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4 font-semibold"
              style={{ color: 'var(--peach)' }}
            >
              Pintura Realista a Óleo
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--cream)' }}
            >
              A vida retratada<br />com fidelidade
            </h1>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'var(--cream-2)' }}>
              {artistInfo.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/galeria"
                className="px-8 py-3 text-sm font-bold tracking-widest uppercase text-white cursor-pointer rounded"
                style={{ backgroundColor: 'var(--terra)' }}
              >
                Ver Galeria
              </Link>
              <Link
                to="/sobre"
                className="px-8 py-3 text-sm font-semibold tracking-widest uppercase cursor-pointer rounded border"
                style={{ borderColor: 'var(--teal-600)', color: 'var(--cream-2)' }}
              >
                Sobre o Artista
              </Link>
            </div>
          </div>

          {/* imagem destaque */}
          <div className="flex-1 max-w-sm md:max-w-md animate-fade-in animation-delay-300">
            <div className="rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
              <img
                src={placeholderImages['1']}
                alt="Obra em destaque"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Barra de benefícios ───────────────────────────── */}
      <section
        className="border-y"
        style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
              title: 'Envio com Seguro',
              desc: 'Embalagem profissional e seguro total',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              ),
              title: 'Pagamento via Mercado Pago',
              desc: 'Pix, cartão e boleto com segurança',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
              title: 'Certificado de Autenticidade',
              desc: 'Cada obra acompanha certificado assinado',
            },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-4">
              <span style={{ color: 'var(--terra)' }}>{item.icon}</span>
              <div>
                <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--teal-900)' }}>
                  {item.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--teal-600)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categorias ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-2 font-semibold"
            style={{ color: 'var(--salmon)' }}
          >
            Explorar
          </p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--teal-900)' }}>
            Categorias
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryData.map(cat => (
            <Link
              key={cat.label}
              to={`/galeria?cat=${encodeURIComponent(cat.label)}`}
              className="group flex flex-col justify-between p-5 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-md"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: '#e8e0d6',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-2xl font-bold"
                  style={{ color: 'var(--terra)' }}
                >
                  {cat.count}
                </span>
                <span
                  className="text-lg font-bold transition-transform group-hover:translate-x-1 duration-300"
                  style={{ color: 'var(--teal-600)' }}
                >
                  →
                </span>
              </div>
              <p className="text-sm font-bold" style={{ color: 'var(--teal-900)' }}>
                {cat.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--teal-600)' }}>
                {cat.count} {cat.count === 1 ? 'obra' : 'obras'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Nossa Coleção ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-2 font-semibold"
              style={{ color: 'var(--salmon)' }}
            >
              Obras Originais
            </p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--teal-900)' }}>
              Nossa Coleção
            </h2>
          </div>

          <div className="flex gap-2">
            {(['Todas', 'Disponíveis', 'Vendidas'] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 text-xs font-bold tracking-wider uppercase rounded cursor-pointer transition-all duration-200"
                style={
                  filter === f
                    ? { backgroundColor: 'var(--terra)', color: '#fff' }
                    : {
                        backgroundColor: 'var(--card)',
                        color: 'var(--teal-700)',
                        border: '1px solid #e8e0d6',
                      }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(artwork => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <p className="text-center py-16" style={{ color: 'var(--teal-600)' }}>
            Nenhuma obra nesta categoria.
          </p>
        )}

        <div className="text-center mt-10">
          <Link
            to="/galeria"
            className="inline-block px-10 py-3 text-sm font-bold tracking-widest uppercase cursor-pointer rounded border-2 transition-colors duration-200"
            style={{ borderColor: 'var(--terra)', color: 'var(--terra)' }}
          >
            Ver Todas as Obras →
          </Link>
        </div>
      </section>

      {/* ── Banner TikTok ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--teal-900)' }}>
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2 font-semibold"
              style={{ color: 'var(--cream-3)' }}
            >
              Processo Criativo
            </p>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--cream)' }}>
              Veja como as obras tomam forma
            </h2>
            <p className="max-w-lg leading-relaxed text-sm" style={{ color: 'var(--cream-2)' }}>
              No TikTok, {artistInfo.name} compartilha momentos do ateliê — o gesto do pincel,
              as escolhas de cor e a paciência que transforma tela em vida.
            </p>
          </div>
          <a
            href={artistInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase cursor-pointer rounded transition-colors duration-200"
            style={{ backgroundColor: 'var(--terra)', color: '#fff' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
            </svg>
            Assistir no TikTok
          </a>
        </div>
      </section>

      {/* ── Citação ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <blockquote
          className="text-2xl md:text-3xl font-light leading-relaxed italic"
          style={{ color: 'var(--teal-700)' }}
        >
          "Pintar é ver o que os outros passam sem notar."
        </blockquote>
        <cite
          className="mt-6 block text-sm not-italic tracking-widest uppercase font-semibold"
          style={{ color: 'var(--teal-600)' }}
        >
          — {artistInfo.name}
        </cite>
      </section>
    </main>
  )
}

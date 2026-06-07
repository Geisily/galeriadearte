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
  { label: 'Retrato', icon: '◎' },
  { label: 'Paisagem', icon: '◫' },
  { label: 'Natureza Morta', icon: '◧' },
  { label: 'Cena Urbana', icon: '◨' },
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
        style={{ backgroundColor: 'var(--teal-900)', minHeight: '88vh' }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[88vh]">

          {/* Text column */}
          <div>
            <p className="section-label animate-fade-up mb-5" style={{ color: 'var(--peach)' }}>
              Pintura Realista a Óleo
            </p>

            <h1
              className="text-serif animate-fade-up animation-delay-100"
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                color: 'var(--cream)',
                marginBottom: '1.5rem',
              }}
            >
              A vida retratada<br />
              <em style={{ color: 'var(--peach)', fontStyle: 'italic' }}>com fidelidade</em>
            </h1>

            <p
              className="animate-fade-up animation-delay-200"
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--cream-2)',
                maxWidth: '420px',
                marginBottom: '2.5rem',
              }}
            >
              {artistInfo.bio}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-300">
              <Link to="/galeria" className="btn-primary">
                Ver Galeria
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/sobre"
                className="btn-outline"
                style={{ borderColor: 'var(--teal-500)', color: 'var(--cream-2)' }}
              >
                Sobre o Artista
              </Link>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap gap-6 mt-12 pt-10 animate-fade-up animation-delay-400"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { value: '40+', label: 'anos de ofício' },
                { value: '300+', label: 'obras realizadas' },
                { value: '100%', label: 'original & único' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-serif font-semibold text-2xl" style={{ color: 'var(--peach)' }}>
                    {s.value}
                  </p>
                  <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--cream-3)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className="animate-fade-in animation-delay-300 hidden md:block">
            <div className="relative">
              {/* Main image */}
              <div
                className="overflow-hidden"
                style={{ aspectRatio: '3/4', borderRadius: '2px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
              >
                <img
                  src={placeholderImages['1']}
                  alt="Obra em destaque"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div
                className="absolute -bottom-6 -left-10 px-6 py-4 rounded-sm shadow-xl"
                style={{ backgroundColor: 'var(--terra)', color: '#fff', maxWidth: '200px' }}
              >
                <p className="text-xs uppercase tracking-widest mb-1 opacity-80">Certificado</p>
                <p className="text-sm font-semibold leading-snug">Autenticidade em cada obra</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-600">
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--cream-3)' }}>
            Explorar
          </span>
          <div
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, var(--cream-3), transparent)' }}
          />
        </div>
      </section>

      {/* ── Benefícios ────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid #e8e0d6' }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
              title: 'Envio com Seguro',
              desc: 'Embalagem profissional e seguro total para cada obra',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              ),
              title: 'Mercado Pago',
              desc: 'Pix, cartão e boleto bancário com total segurança',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
              title: 'Certificado de Autenticidade',
              desc: 'Cada obra acompanha certificado assinado pelo artista',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="flex items-start gap-4 px-8 py-6 first:pl-0 last:pr-0"
              style={i === 0 ? { paddingLeft: 0 } : i === 2 ? { paddingRight: 0 } : {}}
            >
              <span style={{ color: 'var(--terra)', marginTop: '2px' }}>{item.icon}</span>
              <div>
                <p className="text-sans font-semibold text-sm mb-0.5" style={{ color: 'var(--teal-900)' }}>
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
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">Explorar</p>
            <h2 className="text-serif text-3xl font-semibold" style={{ color: 'var(--teal-900)' }}>
              Categorias
            </h2>
          </div>
          <Link
            to="/galeria"
            className="hidden md:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
            style={{ color: 'var(--terra)' }}
          >
            Ver tudo
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categoryData.map((cat) => (
            <Link
              key={cat.label}
              to={`/galeria?cat=${encodeURIComponent(cat.label)}`}
              className="group relative overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid #e8e0d6',
                borderRadius: '2px',
                boxShadow: '0 1px 3px rgba(14,31,43,0.04)',
              }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ backgroundColor: 'var(--terra)' }}
              />
              <div className="flex items-start justify-between mb-8">
                <span className="text-3xl" style={{ color: 'var(--cream-2)' }}>{cat.icon}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  style={{ color: 'var(--terra)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="text-sans text-sm font-semibold" style={{ color: 'var(--teal-900)' }}>
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Coleção ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-3">Obras Originais</p>
            <h2 className="text-serif text-3xl font-semibold" style={{ color: 'var(--teal-900)' }}>
              Coleção em Destaque
            </h2>
          </div>

          <div className="flex gap-1.5">
            {(['Todas', 'Disponíveis', 'Vendidas'] as Filter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all duration-200 rounded-sm"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map(artwork => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-sans" style={{ color: 'var(--teal-600)' }}>
            Nenhuma obra nesta categoria.
          </p>
        )}

        <div className="text-center mt-14">
          <Link to="/galeria" className="btn-outline" style={{ color: 'var(--terra)', borderColor: 'var(--terra)' }}>
            Ver Todas as Obras
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Citação ───────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', borderTop: '1px solid #e8e0d6', borderBottom: '1px solid #e8e0d6' }}>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="divider mx-auto mb-8" />
          <blockquote
            className="text-serif italic"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              lineHeight: 1.6,
              color: 'var(--teal-800)',
            }}
          >
            "Pintar é ver o que os outros passam sem notar."
          </blockquote>
          <cite
            className="mt-6 block text-xs not-italic tracking-[0.3em] uppercase font-semibold"
            style={{ color: 'var(--terra)' }}
          >
            — {artistInfo.name}
          </cite>
        </div>
      </section>

      {/* ── TikTok banner ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--teal-900)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="section-label mb-4" style={{ color: 'var(--peach)' }}>
              Processo Criativo
            </p>
            <h2
              className="text-serif font-semibold mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--cream)' }}
            >
              Veja as obras tomarem forma
            </h2>
            <p className="leading-relaxed text-sm" style={{ color: 'var(--cream-2)' }}>
              No TikTok, {artistInfo.name} compartilha momentos do ateliê — o gesto do pincel,
              as escolhas de cor e a paciência que transforma tela em vida.
            </p>
          </div>
          <a
            href={artistInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
            style={{ fontSize: '0.75rem' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
            </svg>
            Assistir no TikTok
          </a>
        </div>
      </section>
    </main>
  )
}

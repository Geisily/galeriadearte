import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockArtworks, artistInfo, placeholderImages, testimonials } from '../lib/mockData'
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

type Filter = 'Todas' | 'Disponíveis' | 'Vendidas'

export function HomePage() {
  const [filter, setFilter] = useState<Filter>('Todas')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featured = (() => {
    if (filter === 'Disponíveis') return mockArtworks.filter(a => a.inStock).slice(0, 3)
    if (filter === 'Vendidas') return mockArtworks.filter(a => !a.inStock).slice(0, 3)
    return mockArtworks.slice(0, 3)
  })()

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <main>
      <SEO
        description={`${artistInfo.bio} Obras originais à venda e encomendas personalizadas. TikTok ${artistInfo.tiktokHandle}.`}
        jsonLd={homeJsonLd}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--petrol)', minHeight: '92vh' }}
      >
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '180px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ minHeight: '92vh' }}>

          {/* Text */}
          <div>
            <p className="section-label animate-fade-up mb-5" style={{ color: 'var(--terra-l)' }}>
              Pintura Realista a Óleo
            </p>

            <h1
              className="text-serif animate-fade-up animation-delay-100"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                color: '#fff',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Pinturas que transformam{' '}
              <em style={{ color: 'var(--terra-l)', fontStyle: 'italic' }}>memórias em arte</em>
            </h1>

            <p
              className="animate-fade-up animation-delay-200"
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.65)',
                maxWidth: '440px',
                marginBottom: '2.5rem',
              }}
            >
              Obras realistas criadas com técnica, emoção e autenticidade.
              Mais de 40 anos de ofício a serviço da beleza que existe no cotidiano.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up animation-delay-300">
              <Link to="/galeria" className="btn-primary">
                Comprar Obras
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/encomenda"
                className="btn-outline"
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)' }}
              >
                Solicitar Retrato Personalizado
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-3 gap-6 mt-14 pt-10 animate-fade-up animation-delay-400"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { value: '40+', label: 'anos de ofício' },
                { value: '300+', label: 'obras realizadas' },
                { value: '100%', label: 'original & único' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-serif font-semibold" style={{ fontSize: '2rem', color: 'var(--terra-l)' }}>
                    {s.value}
                  </p>
                  <p className="text-xs tracking-wider uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block animate-fade-in animation-delay-300 relative">
            <div
              className="overflow-hidden"
              style={{ aspectRatio: '3/4', borderRadius: '1px', boxShadow: '0 40px 100px rgba(0,0,0,0.55)' }}
            >
              <img
                src={placeholderImages['1']}
                alt="Obra em destaque"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating cert card */}
            <div
              className="absolute -bottom-5 -left-8 px-5 py-4 animate-float"
              style={{
                backgroundColor: 'var(--terra)',
                color: '#fff',
                maxWidth: '200px',
                borderRadius: '1px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              <p className="text-xs uppercase tracking-widest mb-1 opacity-75">Certificado</p>
              <p className="text-sm font-semibold leading-snug">Autenticidade inclusa em cada obra</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-600">
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Explorar</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)' }} />
        </div>
      </section>

      {/* ── Benefícios ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid #e8e0d6' }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ '--tw-divide-color': '#e8e0d6' } as React.CSSProperties}>
          {[
            {
              icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
              title: 'Envio com Seguro', desc: 'Embalagem profissional e seguro total',
            },
            {
              icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
              title: 'Mercado Pago', desc: 'Pix, cartão e boleto com segurança',
            },
            {
              icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
              title: 'Certificado de Autenticidade', desc: 'Cada obra acompanha certificado assinado',
            },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-4 px-8 py-6 first:pl-0 last:pr-0">
              <span style={{ color: 'var(--terra)', marginTop: '2px' }}>{item.icon}</span>
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--grafite)' }}>{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--bege-d)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Encomenda CTA ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden"
          style={{ borderRadius: '2px', boxShadow: '0 4px 32px rgba(30,75,90,0.08)' }}
        >
          {/* Image half */}
          <div className="hidden md:block relative overflow-hidden" style={{ minHeight: '400px' }}>
            <img
              src={placeholderImages['4']}
              alt="Retrato personalizado"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'rgba(30,75,90,0.35)' }} />
          </div>
          {/* Text half */}
          <div
            className="flex flex-col justify-center px-10 py-12"
            style={{ backgroundColor: 'var(--petrol)', color: '#fff' }}
          >
            <p className="section-label mb-4" style={{ color: 'var(--terra-l)' }}>Obra Exclusiva</p>
            <h2
              className="text-serif font-semibold mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1 }}
            >
              Tenha um retrato pintado <em>só para você</em>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Imortalize uma pessoa especial, um lugar inesquecível ou qualquer coisa que mereça existir para sempre.
              Encomendas com até 60 dias de prazo e acompanhamento pelo TikTok.
            </p>
            <Link to="/encomenda" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Solicitar Encomenda
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Coleção ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-3">Obras Originais</p>
            <h2 className="text-serif font-semibold" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--grafite)' }}>
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
                    : { backgroundColor: 'var(--card)', color: 'var(--bege-d)', border: '1px solid var(--bege)' }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {featured.map(artwork => <ArtworkCard key={artwork._id} artwork={artwork} />)}
          </div>
        ) : (
          <p className="text-center py-20 text-sans" style={{ color: 'var(--bege-d)' }}>
            Nenhuma obra nesta categoria.
          </p>
        )}

        <div className="text-center mt-14">
          <Link to="/galeria" className="btn-outline" style={{ color: 'var(--terra)', borderColor: 'var(--terra)' }}>
            Ver Todas as Obras →
          </Link>
        </div>
      </section>

      {/* ── Citação ───────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--bege-l)', borderTop: '1px solid var(--bege)', borderBottom: '1px solid var(--bege)' }}>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="divider mx-auto mb-8" />
          <blockquote
            className="text-serif italic"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', lineHeight: 1.55, color: 'var(--petrol)' }}
          >
            "Pintar é ver o que os outros passam sem notar."
          </blockquote>
          <cite className="mt-6 block text-xs not-italic tracking-[0.3em] uppercase font-semibold" style={{ color: 'var(--terra)' }}>
            — {artistInfo.name}
          </cite>
        </div>
      </section>

      {/* ── Depoimentos ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Prova Social</p>
          <h2 className="text-serif font-semibold" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--grafite)' }}>
            O que dizem os colecionadores
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="flex flex-col p-8"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--bege)',
                borderRadius: '1px',
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5" style={{ color: 'var(--terra)' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote
                className="text-sm leading-relaxed flex-1 mb-6"
                style={{ color: 'var(--grafite)' }}
              >
                "{t.text}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: 'var(--petrol)' }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--grafite)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--bege-d)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TikTok banner ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--petrol)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="section-label mb-4" style={{ color: 'var(--terra-l)' }}>Processo Criativo</p>
            <h2 className="text-serif font-semibold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff' }}>
              Veja as obras tomarem forma
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              No TikTok, {artistInfo.name} compartilha momentos do ateliê — o gesto do pincel,
              as escolhas de cor e a paciência que transforma tela em vida.
            </p>
          </div>
          <a
            href={artistInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
            </svg>
            Assistir no TikTok
          </a>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--bege-l)', borderTop: '1px solid var(--bege)' }}>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="section-label mb-3">Newsletter</p>
          <h2 className="text-serif font-semibold mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--grafite)' }}>
            Receba lançamentos exclusivos
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--bege-d)' }}>
            Seja o primeiro a saber quando uma nova obra chega ao acervo.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 animate-scale-in" style={{ color: 'var(--petrol)' }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Inscrito com sucesso. Obrigado!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                className="field flex-1"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary shrink-0">
                Inscrever
              </button>
            </form>
          )}
          <p className="text-xs mt-3" style={{ color: 'var(--bege-d)' }}>
            Sem spam. Cancele a qualquer momento.
          </p>
        </div>
      </section>
    </main>
  )
}

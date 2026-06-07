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

export function HomePage() {
  const featured = mockArtworks.filter(a => a.inStock).slice(0, 3)

  return (
    <main>
      <SEO
        description={`${artistInfo.bio} Obras originais à venda. TikTok ${artistInfo.tiktokHandle}.`}
        jsonLd={homeJsonLd}
      />
      {/* Hero */}
      <section className="relative h-[90vh] flex items-end overflow-hidden">
        <img
          src={placeholderImages['4']}
          alt="Obra em destaque"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          <p className="text-xs text-orange-400 tracking-[0.4em] uppercase mb-4">
            Pintura Realista
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight max-w-3xl">
            A vida retratada<br />com fidelidade
          </h1>
          <p className="mt-6 text-neutral-400 max-w-xl leading-relaxed">
            {artistInfo.bio}
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/galeria"
              className="px-8 py-3 bg-orange-800 text-white text-sm tracking-widest uppercase hover:bg-orange-700 transition-colors"
            >
              Ver Galeria
            </Link>
            <Link
              to="/sobre"
              className="px-8 py-3 border border-neutral-600 text-white text-sm tracking-widest uppercase hover:border-white transition-colors"
            >
              Sobre o Artista
            </Link>
          </div>
        </div>
      </section>

      {/* Obras em destaque */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-orange-500 tracking-[0.4em] uppercase mb-2">Obras Disponíveis</p>
            <h2 className="text-3xl font-light text-white">Peças Selecionadas</h2>
          </div>
          <Link to="/galeria" className="text-sm text-neutral-500 hover:text-white transition-colors tracking-wider uppercase">
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(artwork => (
            <ArtworkCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
      </section>

      {/* TikTok banner */}
      <section className="border-y border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">Processo Criativo</p>
            <h2 className="text-2xl font-light text-white">Veja como as obras tomam forma</h2>
            <p className="mt-3 text-neutral-500 max-w-lg leading-relaxed">
              No TikTok, {artistInfo.name} compartilha momentos do ateliê — o gesto do pincel,
              as escolhas de cor e a paciência que transforma tela em vida.
            </p>
          </div>
          <a
            href={artistInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-3 px-8 py-4 border border-neutral-700 text-white hover:border-white transition-colors text-sm tracking-widest uppercase"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
            </svg>
            Assistir no TikTok
          </a>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <blockquote className="text-2xl md:text-3xl font-light text-neutral-300 leading-relaxed italic">
          "Pintar é ver o que os outros passam sem notar."
        </blockquote>
        <cite className="mt-6 block text-sm text-neutral-600 not-italic tracking-widest uppercase">
          — {artistInfo.name}
        </cite>
      </section>
    </main>
  )
}

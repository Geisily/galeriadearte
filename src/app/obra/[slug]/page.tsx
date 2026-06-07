import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityClient, queries, urlFor } from '@/lib/sanity'
import { mockArtworks, placeholderImages, artistInfo } from '@/lib/mockData'
import type { Artwork } from '@/types'
import { ArtworkCard } from '@/components/artwork/ArtworkCard'
import { AddToCartButton } from '@/components/artwork/AddToCartButton'

async function getArtwork(slug: string): Promise<Artwork | null> {
  try {
    const data = await sanityClient.fetch(queries.artworkBySlug, { slug })
    if (data) return data
  } catch {
    // fall through to mock
  }
  return mockArtworks.find(a => a.slug.current === slug) || null
}

async function getAllArtworks(): Promise<Artwork[]> {
  try {
    const data = await sanityClient.fetch(queries.allArtworks)
    if (Array.isArray(data) && data.length > 0) return data
  } catch {
    // fall through
  }
  return mockArtworks
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const artwork = await getArtwork(slug)
  if (!artwork) return { title: 'Obra não encontrada' }

  let imageUrl = placeholderImages[artwork._id] || ''
  if (artwork.image?.asset?._ref && artwork.image.asset._ref !== '') {
    try { imageUrl = urlFor(artwork.image).width(1200).url() } catch { /* noop */ }
  }

  return {
    title: artwork.title,
    description: `${artwork.description} ${artwork.medium}, ${artwork.dimensions}, ${artwork.year}.`,
    openGraph: {
      title: artwork.title,
      description: artwork.description,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'website',
      url: `https://alemaovargasmoreira.com.br/obra/${slug}`,
    },
  }
}

export default async function ObraPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artwork = await getArtwork(slug)

  if (!artwork) notFound()

  const allArtworks = await getAllArtworks()
  const related = allArtworks
    .filter(a => a._id !== artwork._id && a.category === artwork.category)
    .slice(0, 3)

  let imageUrl = placeholderImages[artwork._id] || ''
  if (artwork.image?.asset?._ref && artwork.image.asset._ref !== '') {
    try { imageUrl = urlFor(artwork.image).width(1200).url() } catch { /* noop */ }
  }

  const artworkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: artwork.title,
    description: artwork.description,
    image: imageUrl,
    brand: { '@type': 'Person', name: artistInfo.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: artwork.price,
      availability: artwork.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      url: `https://alemaovargasmoreira.com.br/obra/${artwork.slug.current}`,
    },
  }

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artworkJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b" style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs" style={{ color: 'var(--bege-d)' }}>
          <Link href="/" className="hover:text-[var(--terra)] transition-colors">Início</Link>
          <span>/</span>
          <Link href="/galeria" className="hover:text-[var(--terra)] transition-colors">Galeria</Link>
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
              className="overflow-hidden relative"
              style={{
                aspectRatio: '4/5',
                borderRadius: '1px',
                boxShadow: '0 8px 48px rgba(30,75,90,0.12)',
                backgroundColor: 'var(--bege-l)',
              }}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )}
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
                  <AddToCartButton artwork={artwork} />
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-serif text-xl mb-2" style={{ color: 'var(--bege-d)' }}>Esta obra foi vendida</p>
                  <Link href="/encomenda" className="btn-primary mt-4">
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
    </div>
  )
}

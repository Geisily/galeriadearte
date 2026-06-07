import { Link } from 'react-router-dom'
import type { Artwork } from '../../types'
import { placeholderImages } from '../../lib/mockData'

interface Props {
  artwork: Artwork
  size?: 'default' | 'large'
}

export function ArtworkCard({ artwork, size = 'default' }: Props) {
  const imageUrl = placeholderImages[artwork._id] || ''

  return (
    <Link
      to={`/obra/${artwork.slug.current}`}
      className="group block"
      style={{ textDecoration: 'none' }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: size === 'large' ? '3/4' : '4/5',
          backgroundColor: 'var(--cream)',
        }}
      >
        <img
          src={imageUrl}
          alt={artwork.image.alt || artwork.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: 'linear-gradient(to top, rgba(14,31,43,0.55) 0%, transparent 55%)',
            opacity: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
        />

        {/* Hover CTA */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 translate-y-2 opacity-0 transition-all duration-350 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span
            className="inline-block text-xs tracking-widest uppercase font-semibold text-white px-4 py-2 rounded-sm"
            style={{ backgroundColor: 'rgba(200,75,42,0.92)' }}
          >
            Ver Obra
          </span>
        </div>

        {/* Status badge */}
        <span
          className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-sm"
          style={
            artwork.inStock
              ? { backgroundColor: 'var(--terra)', color: '#fff' }
              : { backgroundColor: 'rgba(14,31,43,0.65)', color: 'var(--cream-2)' }
          }
        >
          {artwork.inStock ? 'Disponível' : 'Vendido'}
        </span>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <h3
          className="text-serif font-semibold leading-snug mb-0.5 transition-colors duration-200 group-hover:text-[var(--terra)]"
          style={{ fontSize: '1rem', color: 'var(--teal-900)' }}
        >
          {artwork.title}
        </h3>

        <p className="text-xs mb-2" style={{ color: 'var(--teal-600)', letterSpacing: '0.05em' }}>
          {artwork.medium}{artwork.dimensions ? ` · ${artwork.dimensions}` : ''} · {artwork.year}
        </p>

        {artwork.inStock ? (
          <p className="text-base font-semibold text-sans" style={{ color: 'var(--terra)' }}>
            R$ {artwork.price.toLocaleString('pt-BR')}
          </p>
        ) : (
          <p className="text-sm text-sans" style={{ color: 'var(--cream-3)' }}>
            Obra vendida
          </p>
        )}
      </div>
    </Link>
  )
}

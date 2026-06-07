import { Link } from 'react-router-dom'
import type { Artwork } from '../../types'
import { placeholderImages } from '../../lib/mockData'

interface Props {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: Props) {
  const imageUrl = placeholderImages[artwork._id] || ''

  return (
    <Link
      to={`/obra/${artwork.slug.current}`}
      className="group block rounded-lg overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'var(--card)',
        boxShadow: '0 1px 4px rgba(14,31,43,0.08)',
      }}
    >
      {/* Imagem com badge */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
        <img
          src={imageUrl}
          alt={artwork.image.alt || artwork.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          loading="lazy"
          style={{ display: 'block' }}
        />
        {/* Badge status */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded"
          style={
            artwork.inStock
              ? { backgroundColor: 'var(--terra)', color: '#fff' }
              : { backgroundColor: 'var(--teal-600)', color: 'var(--cream)' }
          }
        >
          {artwork.inStock ? 'Disponível' : 'Vendido'}
        </span>
        {/* overlay hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-500" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="text-base font-bold leading-snug mb-1 transition-colors duration-300"
          style={{ color: 'var(--teal-900)' }}
        >
          {artwork.title}
        </h3>

        {/* Estrelinhas decorativas */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm" style={{ color: '#f59e0b' }}>★★★★★</span>
          <span className="text-xs" style={{ color: 'var(--teal-600)' }}>4.9</span>
        </div>

        <p className="text-xs tracking-wider uppercase mb-1" style={{ color: 'var(--teal-600)' }}>
          {artwork.medium} · {artwork.year}
        </p>
        <p className="text-xs mb-3" style={{ color: 'var(--cream-3)' }}>
          {artwork.dimensions}
        </p>

        {artwork.inStock ? (
          <p className="text-base font-bold" style={{ color: 'var(--terra)' }}>
            R$ {artwork.price.toLocaleString('pt-BR')}
          </p>
        ) : (
          <p className="text-sm font-medium" style={{ color: 'var(--teal-600)' }}>
            Obra vendida
          </p>
        )}
      </div>
    </Link>
  )
}

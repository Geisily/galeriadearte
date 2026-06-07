import { Link } from 'react-router-dom'
import type { Artwork } from '../../types'
import { placeholderImages } from '../../lib/mockData'

interface Props {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: Props) {
  const imageUrl = placeholderImages[artwork._id] || ''

  return (
    <Link to={`/obra/${artwork.slug.current}`} className="group block">
      <div className="overflow-hidden bg-[var(--teal-800)] aspect-[3/4] relative">
        <img
          src={imageUrl}
          alt={artwork.image.alt || artwork.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        {/* overlay suave no hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-light leading-snug text-neutral-200 group-hover:text-[var(--cream)] transition-colors duration-300">
            {artwork.title}
          </h3>
          {!artwork.inStock && (
            <span className="shrink-0 text-xs text-[var(--teal-500)] border border-[var(--teal-600)] px-2 py-0.5">
              Vendido
            </span>
          )}
        </div>

        <p className="text-xs text-[var(--cream-3)] tracking-wider uppercase">
          {artwork.medium} · {artwork.year}
        </p>
        <p className="text-xs text-[var(--teal-500)]">{artwork.dimensions}</p>

        {artwork.inStock && (
          <p className="text-sm text-[var(--peach)] font-light mt-2 group-hover:text-[var(--peach)] transition-colors duration-300">
            R$ {artwork.price.toLocaleString('pt-BR')}
          </p>
        )}
      </div>
    </Link>
  )
}

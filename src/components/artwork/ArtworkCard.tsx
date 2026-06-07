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
      <div className="overflow-hidden bg-neutral-900 aspect-[3/4]">
        <img
          src={imageUrl}
          alt={artwork.image.alt || artwork.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-light leading-snug text-white group-hover:text-amber-200 transition-colors">
            {artwork.title}
          </h3>
          {!artwork.inStock && (
            <span className="shrink-0 text-xs text-neutral-600 border border-neutral-800 px-2 py-0.5">
              Vendido
            </span>
          )}
        </div>

        <p className="text-xs text-neutral-500 tracking-wider uppercase">
          {artwork.medium} · {artwork.year}
        </p>
        <p className="text-xs text-neutral-600">{artwork.dimensions}</p>

        {artwork.inStock && (
          <p className="text-sm text-amber-400 font-light mt-2">
            R$ {artwork.price.toLocaleString('pt-BR')}
          </p>
        )}
      </div>
    </Link>
  )
}

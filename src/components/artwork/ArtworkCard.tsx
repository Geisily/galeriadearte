'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { Artwork } from '@/types'
import { placeholderImages } from '@/lib/mockData'
import { urlFor } from '@/lib/sanity'

interface Props {
  artwork: Artwork
  size?: 'default' | 'large'
}

export function ArtworkCard({ artwork, size = 'default' }: Props) {
  let imageUrl = placeholderImages[artwork._id] || ''
  if (artwork.image?.asset?._ref && artwork.image.asset._ref !== '') {
    try {
      imageUrl = urlFor(artwork.image).width(800).url()
    } catch {
      // fallback to placeholder
    }
  }

  return (
    <Link
      href={`/obra/${artwork.slug.current}`}
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
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={artwork.image?.alt || artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: 'var(--bege-l)' }}
          />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: 'linear-gradient(to top, rgba(14,31,43,0.55) 0%, transparent 55%)',
          }}
        />

        {/* Hover CTA */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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

'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Artwork } from '@/types'
import { ArtworkCard } from '@/components/artwork/ArtworkCard'

type Filter = 'Todas' | 'Disponíveis' | 'Vendidas'

interface Props {
  artworks: Artwork[]
}

export function FeaturedSection({ artworks }: Props) {
  const [filter, setFilter] = useState<Filter>('Todas')

  const featured = (() => {
    if (filter === 'Disponíveis') return artworks.filter(a => a.inStock).slice(0, 3)
    if (filter === 'Vendidas') return artworks.filter(a => !a.inStock).slice(0, 3)
    return artworks.slice(0, 3)
  })()

  return (
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
        <Link href="/galeria" className="btn-outline" style={{ color: 'var(--terra)', borderColor: 'var(--terra)' }}>
          Ver Todas as Obras →
        </Link>
      </div>
    </section>
  )
}

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // ignore errors, still show success
    }
    setSubscribed(true)
    setLoading(false)
  }

  return (
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
            <button type="submit" className="btn-primary shrink-0" disabled={loading}>
              {loading ? 'Inscrevendo...' : 'Inscrever'}
            </button>
          </form>
        )}
        <p className="text-xs mt-3" style={{ color: 'var(--bege-d)' }}>
          Sem spam. Cancele a qualquer momento.
        </p>
      </div>
    </section>
  )
}

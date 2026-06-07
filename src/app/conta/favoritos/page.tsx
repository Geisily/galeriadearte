'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Artwork } from '@/types'

interface WishlistItem {
  id: string
  artworkId: string
  artworkTitle: string
  artworkSlug: string
  createdAt: string
}

export default function FavoritosPage() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/wishlist')
      .then(r => r.json())
      .then(data => { setItems(data.items || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function removeItem(id: string) {
    try {
      await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setItems(prev => prev.filter(i => i.id !== id))
    } catch { /* noop */ }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/conta" className="text-xs" style={{ color: 'var(--bege-d)' }}>
          ← Minha Conta
        </Link>
      </div>

      <h1 className="text-serif font-semibold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--grafite)' }}>
        Favoritos
      </h1>

      {loading ? (
        <p className="text-sm" style={{ color: 'var(--bege-d)' }}>Carregando...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-serif text-xl mb-3" style={{ color: 'var(--grafite)' }}>Nenhum favorito salvo</p>
          <p className="text-sm mb-6" style={{ color: 'var(--bege-d)' }}>Adicione obras à sua lista de desejos.</p>
          <Link href="/galeria" className="btn-primary">Ver Galeria</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--bege)', borderRadius: '1px' }}
            >
              <Link
                href={`/obra/${item.artworkSlug}`}
                className="text-serif font-semibold text-sm hover:text-[var(--terra)] transition-colors"
                style={{ color: 'var(--grafite)' }}
              >
                {item.artworkTitle}
              </Link>
              <button
                onClick={() => removeItem(item.id)}
                className="text-xs cursor-pointer transition-colors ml-4 shrink-0"
                style={{ color: 'var(--bege-d)' }}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

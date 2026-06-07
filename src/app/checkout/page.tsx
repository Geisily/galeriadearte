'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'

export default function CheckoutPage() {
  const items = useCartStore(s => s.items)
  const total = useCartStore(s => s.total())
  const clearCart = useCartStore(s => s.clearCart)
  const router = useRouter()

  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (items.length === 0) {
      router.push('/carrinho')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.artwork._id,
            title: i.artwork.title,
            slug: i.artwork.slug.current,
            price: i.artwork.price,
            quantity: i.quantity,
          })),
          payer: form,
          total,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao processar')
      clearCart()
      window.location.href = data.init_point
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
    }
    setLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="text-serif text-xl mb-4" style={{ color: 'var(--grafite)' }}>Carrinho vazio</p>
        <a href="/galeria" className="btn-primary">Ver Galeria</a>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-serif font-semibold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--grafite)' }}>
        Finalizar Compra
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="field-label">Nome completo *</label>
              <input
                type="text"
                required
                className="field"
                placeholder="Seu nome"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>
            <div>
              <label className="field-label">E-mail *</label>
              <input
                type="email"
                required
                className="field"
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>
            <div>
              <label className="field-label">Telefone</label>
              <input
                type="tel"
                className="field"
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs p-3 rounded-sm" style={{ color: '#fff', backgroundColor: 'var(--terra)' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary w-full justify-center"
              style={{ padding: '1rem' }}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Pagar com Mercado Pago'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <p className="text-xs text-center" style={{ color: 'var(--bege-d)' }}>
              Você será redirecionado ao Mercado Pago para concluir o pagamento.
            </p>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div
            className="p-5"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--bege)', borderRadius: '1px' }}
          >
            <h2 className="text-serif font-semibold mb-4" style={{ fontSize: '1.1rem', color: 'var(--grafite)' }}>
              Resumo
            </h2>
            <div className="space-y-3 mb-4">
              {items.map(({ artwork, quantity }) => (
                <div key={artwork._id} className="flex justify-between text-xs">
                  <span style={{ color: 'var(--grafite)' }}>
                    {artwork.title} × {quantity}
                  </span>
                  <span style={{ color: 'var(--grafite)' }}>
                    R$ {(artwork.price * quantity).toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="flex justify-between font-semibold pt-3"
              style={{ borderTop: '1px solid var(--bege)' }}
            >
              <span style={{ color: 'var(--grafite)' }}>Total</span>
              <span className="text-serif" style={{ color: 'var(--terra)', fontSize: '1.1rem' }}>
                R$ {total.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

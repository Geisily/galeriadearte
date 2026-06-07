'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { placeholderImages } from '@/lib/mockData'
import { urlFor } from '@/lib/sanity'

export default function CarrinhoPage() {
  const items = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.removeItem)
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const total = useCartStore(s => s.total())
  const clearCart = useCartStore(s => s.clearCart)

  const [coupon, setCoupon] = useState('')
  const [couponResult, setCouponResult] = useState<{ valid: boolean; discount: number; message: string } | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  async function handleCoupon(e: React.FormEvent) {
    e.preventDefault()
    setCouponLoading(true)
    try {
      const res = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: coupon, total }),
      })
      const data = await res.json()
      setCouponResult(data)
    } catch {
      setCouponResult({ valid: false, discount: 0, message: 'Erro ao validar cupom.' })
    }
    setCouponLoading(false)
  }

  const discount = couponResult?.valid ? couponResult.discount : 0
  const finalTotal = total - discount

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <svg className="w-16 h-16 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--bege-d)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="text-serif text-2xl mb-3" style={{ color: 'var(--grafite)' }}>Seu carrinho está vazio</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--bege-d)' }}>Explore a galeria e adicione obras à sua coleção.</p>
        <Link href="/galeria" className="btn-primary">Ver Galeria</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-serif font-semibold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--grafite)' }}>
        Carrinho
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ artwork, quantity }) => {
            let imageUrl = placeholderImages[artwork._id] || ''
            if (artwork.image?.asset?._ref && artwork.image.asset._ref !== '') {
              try { imageUrl = urlFor(artwork.image).width(400).url() } catch { /* noop */ }
            }

            return (
              <div
                key={artwork._id}
                className="flex gap-4 p-4"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--bege)', borderRadius: '1px' }}
              >
                {/* Image */}
                <div className="relative shrink-0" style={{ width: '80px', height: '100px' }}>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={artwork.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-serif font-semibold text-sm mb-1" style={{ color: 'var(--grafite)' }}>
                    {artwork.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--bege-d)' }}>
                    {artwork.medium} · {artwork.dimensions}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(artwork._id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-sm font-semibold cursor-pointer"
                        style={{ border: '1px solid var(--bege)', borderRadius: '1px', color: 'var(--grafite)' }}
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center" style={{ color: 'var(--grafite)' }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(artwork._id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-sm font-semibold cursor-pointer"
                        style={{ border: '1px solid var(--bege)', borderRadius: '1px', color: 'var(--grafite)' }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(artwork._id)}
                      className="text-xs cursor-pointer transition-colors"
                      style={{ color: 'var(--bege-d)' }}
                    >
                      Remover
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right">
                  <p className="text-serif font-semibold" style={{ color: 'var(--terra)' }}>
                    R$ {(artwork.price * quantity).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            )
          })}

          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="text-xs cursor-pointer transition-colors"
              style={{ color: 'var(--bege-d)' }}
            >
              Limpar carrinho
            </button>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div
            className="p-6"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--bege)', borderRadius: '1px' }}
          >
            <h2 className="text-serif font-semibold text-lg mb-6" style={{ color: 'var(--grafite)' }}>
              Resumo do Pedido
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--bege-d)' }}>Subtotal</span>
                <span style={{ color: 'var(--grafite)' }}>R$ {total.toLocaleString('pt-BR')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--bege-d)' }}>Desconto</span>
                  <span style={{ color: 'var(--terra)' }}>- R$ {discount.toLocaleString('pt-BR')}</span>
                </div>
              )}
              <div
                className="flex justify-between text-base font-semibold pt-3"
                style={{ borderTop: '1px solid var(--bege)' }}
              >
                <span style={{ color: 'var(--grafite)' }}>Total</span>
                <span className="text-serif" style={{ color: 'var(--grafite)', fontSize: '1.25rem' }}>
                  R$ {finalTotal.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Coupon */}
            <form onSubmit={handleCoupon} className="mb-6">
              <label className="field-label mb-2">Cupom de desconto</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="field flex-1"
                  placeholder="CODIGO"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                />
                <button type="submit" className="btn-outline shrink-0" style={{ color: 'var(--petrol)', borderColor: 'var(--bege)', padding: '0.75rem 1rem' }} disabled={couponLoading}>
                  {couponLoading ? '...' : 'Aplicar'}
                </button>
              </div>
              {couponResult && (
                <p className="text-xs mt-2" style={{ color: couponResult.valid ? 'var(--petrol)' : 'var(--terra)' }}>
                  {couponResult.message}
                </p>
              )}
            </form>

            <Link
              href="/checkout"
              className="btn-primary w-full justify-center"
              style={{ padding: '1rem' }}
            >
              Finalizar Compra
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <p className="text-xs text-center mt-4" style={{ color: 'var(--bege-d)' }}>
              Pagamento seguro via Mercado Pago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

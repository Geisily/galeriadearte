import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { placeholderImages } from '../lib/mockData'
import { SEO } from '../components/SEO'

type Status = 'idle' | 'loading' | 'error'

export function CheckoutPage() {
  const { items, total } = useCartStore()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ artwork }) => ({
            title: artwork.title,
            unit_price: artwork.price,
            quantity: 1,
          })),
          payer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
          },
        }),
      })

      if (!res.ok) throw new Error('Erro ao criar preferência')
      const data = await res.json()
      window.location.href = data.init_point
    } catch {
      setStatus('error')
      setErrorMsg('Não foi possível iniciar o pagamento. Tente novamente.')
    }
  }

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-32 text-center">
        <SEO title="Checkout" />
        <p style={{ color: 'var(--cream-3)' }}>Seu carrinho está vazio.</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <SEO title="Finalizar Compra" description="Finalize sua compra com segurança via Mercado Pago." />
      <h1 className="text-3xl font-light mb-12" style={{ color: 'var(--cream)' }}>Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Resumo */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--teal-500)' }}>Resumo do Pedido</p>
          <div className="divide-y" style={{ borderColor: 'var(--teal-600)' }}>
            {items.map(({ artwork }) => (
              <div key={artwork._id} className="flex gap-4 py-4">
                <div className="w-16 h-16 overflow-hidden shrink-0" style={{ backgroundColor: 'var(--teal-800)' }}>
                  <img src={placeholderImages[artwork._id]} alt={artwork.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm" style={{ color: 'var(--cream)' }}>{artwork.title}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--teal-500)' }}>{artwork.dimensions}</p>
                </div>
                <p className="text-sm" style={{ color: 'var(--peach)' }}>R$ {artwork.price.toLocaleString('pt-BR')}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between border-t" style={{ borderColor: 'var(--teal-600)' }}>
            <p style={{ color: 'var(--cream-3)' }}>Total</p>
            <p className="text-lg font-light" style={{ color: 'var(--cream)' }}>R$ {total().toLocaleString('pt-BR')}</p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs" style={{ color: 'var(--teal-500)' }}>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Pagamento 100% seguro via Mercado Pago
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--teal-500)' }}>Seus Dados</p>

          {[
            { id: 'name', label: 'Nome completo', type: 'text' },
            { id: 'email', label: 'E-mail', type: 'email' },
            { id: 'phone', label: 'Telefone / WhatsApp', type: 'tel' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--cream-3)' }}>
                {label}
              </label>
              <input
                id={id} type={type} required
                value={form[id as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                className="w-full border px-4 py-3 text-sm focus:outline-none transition-colors"
                style={{ backgroundColor: 'var(--teal-800)', borderColor: 'var(--teal-600)', color: 'var(--cream)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--terra)')}
                onBlur={e => (e.target.style.borderColor = 'var(--teal-600)')}
              />
            </div>
          ))}

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--cream-3)' }}>
              Observações (opcional)
            </label>
            <textarea
              id="message" rows={3}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full border px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
              style={{ backgroundColor: 'var(--teal-800)', borderColor: 'var(--teal-600)', color: 'var(--cream)' }}
              onFocus={e => (e.target.style.borderColor = 'var(--terra)')}
              onBlur={e => (e.target.style.borderColor = 'var(--teal-600)')}
            />
          </div>

          {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-3 mt-4 transition-opacity"
            style={{
              backgroundColor: status === 'loading' ? 'var(--teal-600)' : 'var(--terra)',
              color: 'var(--cream)',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Aguarde...
              </>
            ) : (
              'Pagar com Mercado Pago'
            )}
          </button>

          <p className="text-xs text-center" style={{ color: 'var(--teal-500)' }}>
            Você será redirecionado para o ambiente seguro do Mercado Pago
          </p>
        </form>
      </div>
    </main>
  )
}

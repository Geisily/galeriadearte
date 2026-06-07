import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { placeholderImages } from '../lib/mockData'

export function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Integração com Stripe será adicionada via VITE_STRIPE_PUBLIC_KEY
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="w-12 h-12 border border-orange-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-5 h-5 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-light text-white">Pedido Recebido</h1>
        <p className="mt-4 text-neutral-400 leading-relaxed">
          Obrigado pelo seu interesse. Entraremos em contato em breve para finalizar os detalhes da compra e envio.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light text-white mb-12">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Resumo */}
        <div>
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-6">Resumo do Pedido</p>
          <div className="divide-y divide-neutral-800">
            {items.map(({ artwork }) => (
              <div key={artwork._id} className="flex gap-4 py-4">
                <div className="w-16 h-16 bg-neutral-900 overflow-hidden shrink-0">
                  <img
                    src={placeholderImages[artwork._id]}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{artwork.title}</p>
                  <p className="text-xs text-neutral-600 mt-1">{artwork.dimensions}</p>
                </div>
                <p className="text-sm text-orange-400">R$ {artwork.price.toLocaleString('pt-BR')}</p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-neutral-800 flex justify-between">
            <p className="text-neutral-500">Total</p>
            <p className="text-white text-lg font-light">R$ {total().toLocaleString('pt-BR')}</p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-6">Seus Dados</p>

          {[
            { id: 'name', label: 'Nome completo', type: 'text' },
            { id: 'email', label: 'E-mail', type: 'email' },
            { id: 'phone', label: 'Telefone / WhatsApp', type: 'tel' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-xs text-neutral-500 uppercase tracking-widest mb-1">
                {label}
              </label>
              <input
                id={id}
                type={type}
                required
                value={form[id as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-orange-800 transition-colors"
              />
            </div>
          ))}

          <div>
            <label htmlFor="message" className="block text-xs text-neutral-500 uppercase tracking-widest mb-1">
              Observações (opcional)
            </label>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-orange-800 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-800 text-white text-sm tracking-widest uppercase hover:bg-orange-700 transition-colors mt-4"
          >
            Confirmar Pedido
          </button>

          <p className="text-xs text-neutral-700 text-center">
            Ao confirmar, entraremos em contato para processar o pagamento e combinar o envio.
          </p>
        </form>
      </div>
    </main>
  )
}

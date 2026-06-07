import { useState } from 'react'
import { artistInfo } from '../lib/mockData'
import { SEO } from '../components/SEO'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <SEO
        title="Contato"
        description={`Entre em contato com ${artistInfo.name} para dúvidas sobre obras, encomendas e envio. Pintura a óleo realista original.`}
        url="https://alemaovargasmoreira.com.br/contato"
      />
      <div className="mb-12">
        <p className="text-xs text-amber-500 tracking-[0.4em] uppercase mb-2">Fale Conosco</p>
        <h1 className="text-4xl font-light text-white">Contato</h1>
        <p className="mt-3 text-neutral-500 leading-relaxed max-w-lg">
          Dúvidas sobre obras, encomendas, frete ou exposições? Entre em contato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Informações */}
        <div className="space-y-8">
          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-3">Localização</p>
            <p className="text-neutral-400">{artistInfo.location}</p>
          </div>

          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-3">TikTok</p>
            <a
              href={artistInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors text-sm"
            >
              @alemaovargasmoreira
            </a>
          </div>

          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-3">Tempo de resposta</p>
            <p className="text-neutral-400 text-sm">Geralmente em 1–2 dias úteis</p>
          </div>
        </div>

        {/* Formulário */}
        {sent ? (
          <div className="flex flex-col justify-center">
            <div className="w-10 h-10 border border-amber-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-light text-white">Mensagem Enviada</h2>
            <p className="mt-2 text-neutral-500">Retornaremos em breve. Obrigado pelo contato.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'name', label: 'Nome', type: 'text' },
              { id: 'email', label: 'E-mail', type: 'email' },
              { id: 'subject', label: 'Assunto', type: 'text' },
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
                  className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block text-xs text-neutral-500 uppercase tracking-widest mb-1">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-700 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-amber-700 text-white text-sm tracking-widest uppercase hover:bg-amber-600 transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

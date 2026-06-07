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
    <main>
      <SEO
        title="Contato"
        description={`Entre em contato com ${artistInfo.name} para dúvidas sobre obras, encomendas e envio.`}
        url="https://alemaovargasmoreira.com.br/contato"
      />

      <div className="border-b" style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="section-label mb-3">Fale Conosco</p>
          <h1 className="text-serif font-semibold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--grafite)' }}>
            Contato
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--bege-d)', maxWidth: '440px' }}>
            Dúvidas sobre obras, encomendas, frete ou exposições? Entre em contato.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-14">

        {/* Sidebar */}
        <div className="space-y-8">
          {[
            { label: 'Localização', value: artistInfo.location },
            { label: 'Resposta', value: '1 a 2 dias úteis' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: 'var(--bege-d)' }}>
                {label}
              </p>
              <p className="text-sm" style={{ color: 'var(--grafite)' }}>{value}</p>
            </div>
          ))}

          <div>
            <p className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: 'var(--bege-d)' }}>
              TikTok
            </p>
            <a
              href={artistInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-[var(--terra)]"
              style={{ color: 'var(--petrol)' }}
            >
              {artistInfo.tiktokHandle}
            </a>
          </div>

          <div
            className="p-5 rounded-sm"
            style={{ backgroundColor: 'var(--bege-l)', border: '1px solid var(--bege)' }}
          >
            <p className="text-serif font-semibold text-base mb-2" style={{ color: 'var(--grafite)' }}>
              Prefere WhatsApp?
            </p>
            <a
              href={`${artistInfo.whatsappLink}?text=${encodeURIComponent('Olá! Gostaria de tirar uma dúvida.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs mt-2"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div
              className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-sm animate-scale-in"
              style={{ backgroundColor: 'var(--bege-l)', border: '1px solid var(--bege)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'var(--terra)', color: '#fff' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-serif font-semibold text-2xl mb-2" style={{ color: 'var(--grafite)' }}>
                Mensagem Enviada
              </h2>
              <p className="text-sm" style={{ color: 'var(--bege-d)' }}>
                Retornaremos em breve. Obrigado pelo contato!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: 'name', label: 'Nome', type: 'text', placeholder: 'Seu nome' },
                  { id: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label className="field-label">{label} *</label>
                    <input
                      id={id}
                      type={type}
                      required
                      className="field"
                      placeholder={placeholder}
                      value={form[id as keyof typeof form] as string}
                      onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="field-label">Assunto *</label>
                <input
                  type="text"
                  required
                  className="field"
                  placeholder="Compra, encomenda, dúvida..."
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                />
              </div>

              <div>
                <label className="field-label">Mensagem *</label>
                <textarea
                  rows={6}
                  required
                  className="field"
                  style={{ resize: 'vertical' }}
                  placeholder="Escreva sua mensagem aqui..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

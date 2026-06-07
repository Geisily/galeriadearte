'use client'
import { useState } from 'react'
import type { Metadata } from 'next'
import { artistInfo } from '@/lib/mockData'

const steps = [
  { n: '01', title: 'Envio de referência', desc: 'Você envia fotos e descreve o que imagina para a obra.' },
  { n: '02', title: 'Avaliação e orçamento', desc: 'O artista avalia e apresenta o orçamento e prazo de execução.' },
  { n: '03', title: 'Aprovação e sinal', desc: 'Com a aprovação, você realiza o pagamento do sinal de 50%.' },
  { n: '04', title: 'Produção', desc: 'A obra é pintada com dedicação. Acompanhe pelo TikTok.' },
  { n: '05', title: 'Entrega com certificado', desc: 'Obra entregue com embalagem especial e certificado de autenticidade.' },
]

const sizes = [
  '30 × 40 cm',
  '40 × 50 cm',
  '50 × 70 cm',
  '60 × 80 cm',
  '80 × 100 cm',
  '100 × 120 cm',
  'Outro (especificar)',
]

type FormState = {
  name: string
  email: string
  phone: string
  type: string
  size: string
  deadline: string
  observations: string
  hasConsent: boolean
}

export default function EncomendaPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    type: 'Retrato',
    size: '60 × 80 cm',
    deadline: '',
    observations: '',
    hasConsent: false,
  })
  const [sent, setSent] = useState(false)

  function set(key: keyof FormState, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Save to DB
    try {
      await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch { /* noop */ }
    // Also open WhatsApp
    const msg = `*Nova Encomenda*%0ANome: ${form.name}%0AE-mail: ${form.email}%0ATelefone: ${form.phone}%0ATipo: ${form.type}%0ATamanho: ${form.size}%0APrazo: ${form.deadline}%0AObservações: ${form.observations}`
    window.open(`${artistInfo.whatsappLink}?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <div>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="section-label mb-3">Obra Exclusiva</p>
          <h1 className="text-serif font-semibold mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--grafite)' }}>
            Encomenda Personalizada
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--bege-d)', maxWidth: '520px' }}>
            Uma obra criada exclusivamente para você — seja um retrato de família, um lugar especial ou
            a composição que sempre imaginou.
          </p>
        </div>
      </div>

      {/* Processo */}
      <section style={{ backgroundColor: 'var(--petrol)', color: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="section-label mb-4" style={{ color: 'var(--terra-l)' }}>Como funciona</p>
          <h2 className="text-serif font-semibold mb-12" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Do pedido à sua parede
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-4 left-full w-full h-px -translate-x-1/2 z-0"
                    style={{ background: 'rgba(255,255,255,0.12)', width: '100%' }}
                  />
                )}
                <div className="relative z-10">
                  <span
                    className="text-serif font-bold"
                    style={{ fontSize: '2.2rem', color: 'rgba(255,255,255,0.12)' }}
                  >
                    {s.n}
                  </span>
                  <h3 className="text-serif font-semibold text-base mt-1 mb-2">{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário + info */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Info lateral */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="section-label mb-4">Informações</p>
              <div className="space-y-5">
                {[
                  { label: 'Prazo médio', value: '30 a 60 dias úteis' },
                  { label: 'Pagamento', value: '50% sinal + 50% na entrega' },
                  { label: 'Formatos', value: 'Tela, painel ou papel' },
                  { label: 'Certificado', value: 'Incluso em todas as obras' },
                  { label: 'Envio', value: 'Para todo o Brasil' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="divider mt-2 shrink-0" style={{ width: '1rem' }} />
                    <div>
                      <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--bege-d)' }}>
                        {label}
                      </p>
                      <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--grafite)' }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-6 rounded-sm"
              style={{ backgroundColor: 'var(--bege-l)', border: '1px solid var(--bege)' }}
            >
              <p className="text-serif font-semibold text-lg mb-2" style={{ color: 'var(--petrol)' }}>
                Prefere falar agora?
              </p>
              <p className="text-xs mb-4" style={{ color: 'var(--bege-d)' }}>
                Converse diretamente com o artista pelo WhatsApp para tirar dúvidas antes de preencher o formulário.
              </p>
              <a
                href={`${artistInfo.whatsappLink}?text=${encodeURIComponent('Olá! Gostaria de solicitar uma encomenda.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Falar pelo WhatsApp
              </a>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-3">
            {sent ? (
              <div
                className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-sm animate-scale-in"
                style={{ backgroundColor: 'var(--bege-l)', border: '1px solid var(--bege)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--terra)', color: '#fff' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-serif font-semibold text-2xl mb-3" style={{ color: 'var(--grafite)' }}>
                  Solicitação Enviada!
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--bege-d)', maxWidth: '360px' }}>
                  Você foi redirecionado ao WhatsApp. O artista entrará em contato em até 2 dias úteis para discutir sua encomenda.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost mt-8"
                >
                  Fazer outra solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="field-label">WhatsApp</label>
                    <input
                      type="tel"
                      className="field"
                      placeholder="(11) 99999-9999"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="field-label">Tipo de obra *</label>
                    <select
                      required
                      className="field"
                      value={form.type}
                      onChange={e => set('type', e.target.value)}
                    >
                      <option>Retrato (pessoa)</option>
                      <option>Retrato (animal)</option>
                      <option>Paisagem</option>
                      <option>Natureza Morta</option>
                      <option>Cena Urbana</option>
                      <option>Outro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="field-label">Tamanho desejado *</label>
                    <select
                      required
                      className="field"
                      value={form.size}
                      onChange={e => set('size', e.target.value)}
                    >
                      {sizes.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Prazo desejado</label>
                    <input
                      type="text"
                      className="field"
                      placeholder="Ex: 2 meses, sem pressa..."
                      value={form.deadline}
                      onChange={e => set('deadline', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Descrição e referências *</label>
                  <textarea
                    required
                    rows={5}
                    className="field"
                    style={{ resize: 'vertical' }}
                    placeholder="Descreva a obra que imagina. Pessoas, lugares, estilo, cores, referências visuais, ocasião (presente, decoração, homenagem)..."
                    value={form.observations}
                    onChange={e => set('observations', e.target.value)}
                  />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.hasConsent}
                      onChange={e => set('hasConsent', e.target.checked)}
                      style={{ marginTop: '2px', accentColor: 'var(--terra)' }}
                    />
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--bege-d)' }}>
                      Concordo que meus dados sejam utilizados para contato referente a esta solicitação, conforme a LGPD.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                  Solicitar Encomenda via WhatsApp
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--bege-d)' }}>
                  Ao enviar, você será direcionado ao WhatsApp com os dados preenchidos.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

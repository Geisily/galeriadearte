import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pagamento Pendente' }

export default function PendentePage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: 'var(--bege-d)', color: '#fff' }}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-serif font-semibold text-3xl mb-3" style={{ color: 'var(--grafite)' }}>
        Pagamento em Processamento
      </h1>
      <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--bege-d)' }}>
        Seu pagamento está sendo processado. Você receberá uma confirmação por e-mail assim que for aprovado.
        O prazo pode ser de até 2 dias úteis dependendo do método de pagamento.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary">
          Voltar ao Início
        </Link>
        <Link href="/contato" className="btn-outline" style={{ color: 'var(--petrol)', borderColor: 'var(--bege)' }}>
          Falar com Suporte
        </Link>
      </div>
    </div>
  )
}

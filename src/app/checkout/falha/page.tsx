import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pagamento Não Aprovado' }

export default function FalhaPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: 'var(--terra)', color: '#fff' }}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-serif font-semibold text-3xl mb-3" style={{ color: 'var(--grafite)' }}>
        Pagamento Não Aprovado
      </h1>
      <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--bege-d)' }}>
        Seu pagamento não foi aprovado. Por favor, verifique os dados do cartão ou tente outro método de pagamento.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/carrinho" className="btn-primary">
          Tentar Novamente
        </Link>
        <Link href="/contato" className="btn-outline" style={{ color: 'var(--petrol)', borderColor: 'var(--bege)' }}>
          Falar com Suporte
        </Link>
      </div>
    </div>
  )
}

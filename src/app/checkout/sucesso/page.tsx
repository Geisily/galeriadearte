import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pagamento Confirmado' }

export default function SucessoPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: 'var(--petrol)', color: '#fff' }}
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-serif font-semibold text-3xl mb-3" style={{ color: 'var(--grafite)' }}>
        Pagamento Confirmado!
      </h1>
      <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--bege-d)' }}>
        Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido em breve.
        Entraremos em contato para combinar os detalhes do envio.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/galeria" className="btn-outline" style={{ color: 'var(--petrol)', borderColor: 'var(--bege)' }}>
          Ver Galeria
        </Link>
        <Link href="/" className="btn-primary">
          Voltar ao Início
        </Link>
      </div>
    </div>
  )
}

'use client'
import Link from 'next/link'

export default function ContaPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-serif font-semibold mb-2" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--grafite)' }}>
        Minha Conta
      </h1>
      <p className="text-sm mb-10" style={{ color: 'var(--bege-d)' }}>
        Gerencie seus pedidos e lista de desejos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/conta/pedidos"
          className="flex flex-col gap-3 p-6 transition-all hover:shadow-md"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--bege)', borderRadius: '1px' }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--bege-l)' }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--petrol)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-serif font-semibold text-lg mb-1" style={{ color: 'var(--grafite)' }}>Meus Pedidos</h2>
            <p className="text-xs" style={{ color: 'var(--bege-d)' }}>Acompanhe o status das suas compras</p>
          </div>
        </Link>

        <Link
          href="/conta/favoritos"
          className="flex flex-col gap-3 p-6 transition-all hover:shadow-md"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--bege)', borderRadius: '1px' }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--bege-l)' }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--terra)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-serif font-semibold text-lg mb-1" style={{ color: 'var(--grafite)' }}>Favoritos</h2>
            <p className="text-xs" style={{ color: 'var(--bege-d)' }}>Obras salvas na sua lista de desejos</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

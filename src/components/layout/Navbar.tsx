import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { artistInfo } from '../../lib/mockData'

export function Navbar() {
  const count = useCartStore(s => s.count())
  const location = useLocation()

  const links = [
    { to: '/', label: 'Início' },
    { to: '/galeria', label: 'Galeria' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/videos', label: 'Vídeos' },
    { to: '/contato', label: 'Contato' },
  ]

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-sm"
      style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="text-lg font-bold tracking-[0.15em] uppercase"
            style={{ color: 'var(--terra)' }}
          >
            {artistInfo.name}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm tracking-wider uppercase transition-colors font-medium"
                style={{
                  color: location.pathname === l.to ? 'var(--terra)' : 'var(--teal-700)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/carrinho"
            className="relative flex items-center gap-2 text-sm transition-colors cursor-pointer"
            style={{ color: 'var(--teal-700)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white font-bold"
                style={{ backgroundColor: 'var(--terra)' }}
              >
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

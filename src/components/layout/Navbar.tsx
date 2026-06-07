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
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-lg font-light tracking-[0.2em] text-amber-200 uppercase">
            {artistInfo.name}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wider uppercase transition-colors ${
                  location.pathname === l.to
                    ? 'text-amber-300'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/carrinho"
            className="relative flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-xs text-white font-medium">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

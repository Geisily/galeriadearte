import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'

export function Navbar() {
  const count = useCartStore(s => s.count())
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const links = [
    { to: '/', label: 'Início' },
    { to: '/galeria', label: 'Galeria' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/videos', label: 'Vídeos' },
    { to: '/contato', label: 'Contato' },
  ]

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'var(--card)',
          borderBottom: '1px solid #e8e0d6',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(14,31,43,0.06)' : 'none',
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-18 items-center justify-between" style={{ height: '4.5rem' }}>

            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none">
              <span
                className="text-serif font-semibold tracking-wide"
                style={{ fontSize: '1.1rem', color: 'var(--teal-900)' }}
              >
                Alemão Vargas
              </span>
              <span
                className="text-sans text-xs tracking-[0.25em] uppercase"
                style={{ color: 'var(--terra)', marginTop: '1px' }}
              >
                Moreira
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="relative text-xs tracking-[0.12em] uppercase font-medium py-1"
                  style={{ color: isActive(l.to) ? 'var(--terra)' : 'var(--teal-700)' }}
                >
                  {l.label}
                  {isActive(l.to) && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: 'var(--terra)' }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                to="/carrinho"
                className="relative flex items-center gap-1.5 transition-colors duration-200"
                style={{ color: 'var(--teal-700)' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {count > 0 && (
                  <span
                    className="absolute -top-2 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-white font-bold"
                    style={{ backgroundColor: 'var(--terra)', fontSize: '0.6rem', width: '1.1rem', height: '1.1rem' }}
                  >
                    {count}
                  </span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Menu"
              >
                <span
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--teal-800)',
                    transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--teal-800)',
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-5 h-px transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--teal-800)',
                    transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden animate-slide-down border-t"
            style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-3 text-sm font-medium tracking-wider uppercase border-b transition-colors"
                  style={{
                    borderColor: '#f0ebe4',
                    color: isActive(l.to) ? 'var(--terra)' : 'var(--teal-800)',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

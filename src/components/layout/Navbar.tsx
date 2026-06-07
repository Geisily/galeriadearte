'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'

export function Navbar() {
  const count = useCartStore(s => s.count())
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const links = [
    { to: '/', label: 'Início' },
    { to: '/galeria', label: 'Galeria' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contato', label: 'Contato' },
  ]

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'var(--card)',
        borderBottom: '1px solid #e8e0d6',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(30,75,90,0.07)' : 'none',
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between" style={{ height: '4.5rem' }}>

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span
              className="text-serif font-semibold tracking-wide"
              style={{ fontSize: '1.05rem', color: 'var(--grafite)' }}
            >
              Alemão Vargas
            </span>
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--terra)', marginTop: '1px', fontSize: '0.62rem' }}
            >
              Moreira · Arte Realista
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <Link
                key={l.to}
                href={l.to}
                className="relative text-xs tracking-[0.1em] uppercase font-medium py-1 transition-colors duration-200"
                style={{ color: isActive(l.to) ? 'var(--terra)' : 'var(--petrol)' }}
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
          <div className="flex items-center gap-3">
            {/* Encomenda CTA — desktop only */}
            <Link
              href="/encomenda"
              className="hidden md:inline-flex btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.7rem' }}
            >
              Solicitar Encomenda
            </Link>

            {/* Cart */}
            <Link
              href="/carrinho"
              className="relative flex items-center justify-center transition-colors duration-200"
              style={{ color: 'var(--petrol)', width: '2.5rem', height: '2.5rem' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {count > 0 && (
                <span
                  className="absolute top-0.5 right-0.5 flex items-center justify-center rounded-full text-white font-bold"
                  style={{ backgroundColor: 'var(--terra)', fontSize: '0.55rem', width: '1rem', height: '1rem' }}
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
                  backgroundColor: 'var(--grafite)',
                  transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  backgroundColor: 'var(--grafite)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  backgroundColor: 'var(--grafite)',
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
          <nav className="flex flex-col px-6 py-4">
            {links.map(l => (
              <Link
                key={l.to}
                href={l.to}
                className="py-3.5 text-sm font-medium tracking-wider uppercase border-b transition-colors"
                style={{
                  borderColor: 'var(--bege-l)',
                  color: isActive(l.to) ? 'var(--terra)' : 'var(--grafite)',
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/encomenda"
              className="btn-primary mt-4 justify-center"
            >
              Solicitar Encomenda
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

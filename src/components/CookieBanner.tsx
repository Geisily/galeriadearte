'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }
  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="animate-slide-down"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        backgroundColor: 'var(--petrol-d, #142f38)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1rem 1.5rem',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p style={{ color: 'var(--cream-2)', fontSize: '0.8rem', lineHeight: 1.6, maxWidth: '600px' }}>
          Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
          <Link href="/privacidade" style={{ color: 'var(--terra-l)', textDecoration: 'underline' }}>
            Política de Privacidade
          </Link>
          . (LGPD)
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs font-medium tracking-wider uppercase cursor-pointer transition-colors"
            style={{ color: 'var(--bege-d)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '1px' }}
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors"
            style={{ backgroundColor: 'var(--terra)', color: '#fff', borderRadius: '1px' }}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}

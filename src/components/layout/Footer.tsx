import { Link } from 'react-router-dom'
import { artistInfo } from '../../lib/mockData'

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--teal-900)' }}>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Brand */}
          <div>
            <p className="text-serif font-semibold text-lg mb-1" style={{ color: 'var(--cream)' }}>
              Alemão Vargas
            </p>
            <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--terra)' }}>
              Moreira
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--cream-3)' }}>
              {artistInfo.speciality}<br />{artistInfo.location}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: 'var(--cream-3)' }}>
              Navegação
            </p>
            <div className="flex flex-col gap-3">
              {[
                { to: '/galeria', label: 'Galeria' },
                { to: '/sobre', label: 'Sobre o Artista' },
                { to: '/videos', label: 'Vídeos' },
                { to: '/contato', label: 'Contato' },
              ].map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-xs transition-colors duration-200 hover:text-white"
                  style={{ color: 'var(--cream-2)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: 'var(--cream-3)' }}>
              Redes
            </p>
            <a
              href={artistInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs transition-colors duration-200 hover:text-white"
              style={{ color: 'var(--cream-2)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
              </svg>
              TikTok · {artistInfo.tiktokHandle}
            </a>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--cream-3)', maxWidth: '180px' }}>
              Acompanhe o processo de criação das obras
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: 'var(--cream-3)' }}>
            © {new Date().getFullYear()} {artistInfo.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: 'var(--cream-3)' }}>
            Pagamentos via Mercado Pago
          </p>
        </div>
      </div>
    </footer>
  )
}

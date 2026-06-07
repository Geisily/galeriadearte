import { Link } from 'react-router-dom'
import { artistInfo } from '../../lib/mockData'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm font-light tracking-[0.2em] text-amber-200 uppercase mb-3">
              {artistInfo.name}
            </p>
            <p className="text-sm text-neutral-500 leading-relaxed">{artistInfo.speciality}</p>
            <p className="text-sm text-neutral-600 mt-1">{artistInfo.location}</p>
          </div>

          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Navegação</p>
            <div className="flex flex-col gap-2">
              {[
                { to: '/galeria', label: 'Galeria' },
                { to: '/sobre', label: 'Sobre o Artista' },
                { to: '/videos', label: 'Vídeos' },
                { to: '/contato', label: 'Contato' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-neutral-500 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">TikTok</p>
            <a
              href={artistInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
              </svg>
              Acompanhe no TikTok
            </a>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Veja o processo de criação das obras
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-neutral-700">
            © {new Date().getFullYear()} {artistInfo.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-neutral-700">
            Pagamentos processados com segurança via Stripe
          </p>
        </div>
      </div>
    </footer>
  )
}

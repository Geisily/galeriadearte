import { Link } from 'react-router-dom'
import { artistInfo } from '../../lib/mockData'

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--petrol-d, #142f38)' }}>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-serif font-semibold text-xl mb-0.5" style={{ color: '#fff' }}>
              Alemão Vargas Moreira
            </p>
            <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ color: 'var(--terra-l)' }}>
              Arte Realista a Óleo
            </p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Mais de 40 anos pintando a realidade com técnica e emoção.
              Obras originais disponíveis e encomendas personalizadas.
            </p>
            <a
              href={artistInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-xs transition-colors duration-200 hover:opacity-100"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
              </svg>
              {artistInfo.tiktokHandle}
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Navegação
            </p>
            <div className="flex flex-col gap-3">
              {[
                { to: '/galeria', label: 'Galeria' },
                { to: '/encomenda', label: 'Encomendas' },
                { to: '/sobre', label: 'Sobre o Artista' },
                { to: '/videos', label: 'Vídeos' },
                { to: '/contato', label: 'Contato' },
              ].map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-xs transition-colors duration-200 hover:opacity-100"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`${artistInfo.whatsappLink}?text=${encodeURIComponent('Olá! Vim pelo site.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs transition-colors hover:opacity-100"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <Link
                to="/contato"
                className="text-xs transition-colors hover:opacity-100"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Formulário de contato
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            © {new Date().getFullYear()} {artistInfo.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Pagamentos via Mercado Pago · CNPJ do artista
          </p>
        </div>
      </div>
    </footer>
  )
}

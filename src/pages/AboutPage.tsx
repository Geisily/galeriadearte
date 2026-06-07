import { artistInfo, placeholderImages } from '../lib/mockData'
import { SEO } from '../components/SEO'

export function AboutPage() {
  return (
    <main>
      <SEO
        title="Sobre o Artista"
        description={`Conheça ${artistInfo.name}, pintor realista brasileiro. ${artistInfo.bio}`}
        url="https://alemaovargasmoreira.com.br/sobre"
      />

      {/* Header */}
      <div className="border-b" style={{ backgroundColor: 'var(--card)', borderColor: '#e8e0d6' }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="section-label mb-3">O Artista</p>
          <h1 className="text-serif font-semibold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--teal-900)' }}>
            {artistInfo.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Image */}
          <div className="lg:col-span-2">
            <div
              className="overflow-hidden"
              style={{ aspectRatio: '3/4', borderRadius: '2px', boxShadow: '0 8px 40px rgba(14,31,43,0.12)' }}
            >
              <img
                src={placeholderImages['1']}
                alt={artistInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3 lg:pt-2">
            <p className="text-sans text-sm mb-1" style={{ color: 'var(--teal-600)' }}>
              {artistInfo.speciality} · {artistInfo.location}
            </p>

            <div className="divider my-6" />

            <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--teal-700)' }}>
              <p>
                Dedicado à pintura a óleo realista, {artistInfo.name} construiu
                uma obra singular marcada pela precisão técnica e pela atenção às histórias contidas
                nos rostos e nas cenas do cotidiano brasileiro.
              </p>
              <p>
                Influenciado pelos grandes mestres do realismo europeu — de Rembrandt a Gustave Courbet —,
                ele desenvolveu uma linguagem própria que honra a tradição sem abrir mão de uma
                sensibilidade contemporânea. Cada tela é resultado de semanas de observação, esboços
                e camadas de tinta a óleo sobrepostas com paciência.
              </p>
              <p>
                No TikTok, compartilha momentos do ateliê com quem quer entender o ofício da pintura
                realista — o gesto do pincel, as escolhas de cor, e a paciência que transforma
                tela em vida.
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10"
              style={{ borderTop: '1px solid #e8e0d6' }}
            >
              {[
                { label: 'Anos de ofício', value: '40+' },
                { label: 'Obras realizadas', value: '300+' },
                { label: 'Técnica principal', value: 'Óleo s/ tela' },
                { label: 'Presença online', value: 'TikTok' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-serif font-semibold text-2xl mb-1" style={{ color: 'var(--terra)' }}>
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--cream-3)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={artistInfo.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
                </svg>
                Acompanhar no TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

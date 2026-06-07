import { artistInfo, placeholderImages } from '../lib/mockData'

export function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Foto */}
        <div className="bg-neutral-900 overflow-hidden aspect-[3/4] max-w-md">
          <img
            src={placeholderImages['1']}
            alt={artistInfo.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bio */}
        <div className="lg:pt-8">
          <p className="text-xs text-amber-500 tracking-[0.4em] uppercase mb-4">O Artista</p>
          <h1 className="text-4xl font-light text-white leading-tight">{artistInfo.name}</h1>
          <p className="text-neutral-500 mt-1">{artistInfo.speciality} · {artistInfo.location}</p>

          <div className="mt-8 space-y-4 text-neutral-400 leading-relaxed">
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

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-neutral-800 pt-10">
            {[
              { label: 'Anos de ofício', value: '40+' },
              { label: 'Obras realizadas', value: '300+' },
              { label: 'Técnica principal', value: 'Óleo s/ tela' },
              { label: 'Presença online', value: 'TikTok' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-neutral-600 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-light text-white mt-1">{value}</p>
              </div>
            ))}
          </div>

          <a
            href={artistInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-neutral-700 text-white hover:border-amber-600 transition-colors text-sm tracking-widest uppercase"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.01-.39z"/>
            </svg>
            Acompanhar no TikTok
          </a>
        </div>
      </div>
    </main>
  )
}

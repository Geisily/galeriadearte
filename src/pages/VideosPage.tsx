import { artistInfo } from '../lib/mockData'
import { SEO } from '../components/SEO'

const videos = [
  {
    id: '1',
    title: 'Como pintar pele com óleo — técnica de velaturas',
    views: '124k',
    thumb: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Natureza morta do zero ao acabamento',
    views: '89k',
    thumb: 'https://images.unsplash.com/photo-1579762593175-20226054cad0?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Os pincéis que uso depois de 40 anos pintando',
    views: '210k',
    thumb: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Retrato em 4 horas — timelapse completo',
    views: '340k',
    thumb: 'https://images.unsplash.com/photo-1456518563096-0ff5ee08204e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    title: 'Como misturar cores terrosas para pele brasileira',
    views: '156k',
    thumb: 'https://images.unsplash.com/photo-1610070302904-b70f8bccfb7f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    title: 'Preparando tela com gesso artesanal',
    views: '67k',
    thumb: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&auto=format&fit=crop&q=80',
  },
]

export function VideosPage() {
  return (
    <>
    <SEO
      title="Vídeos — Processo Criativo"
      description={`Assista aos vídeos de ${artistInfo.name} no TikTok ${artistInfo.tiktokHandle}. Técnicas de pintura a óleo, timelapses e bastidores do ateliê.`}
      url="https://alemaovargasmoreira.com.br/videos"
    />
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs text-amber-500 tracking-[0.4em] uppercase mb-2">Processo Criativo</p>
        <h1 className="text-4xl font-light text-white">Vídeos no TikTok</h1>
        <p className="mt-3 text-neutral-500 max-w-xl leading-relaxed">
          Bastidores do ateliê, técnicas de pintura a óleo e o olhar de quem dedica a vida à arte.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <a
            key={video.id}
            href={artistInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="aspect-[9/16] overflow-hidden bg-neutral-900 relative">
              <img
                src={video.thumb}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-white transition-colors">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-3 right-3 text-xs text-white/70">{video.views} views</span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 group-hover:text-white transition-colors leading-snug">
              {video.title}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href={artistInfo.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 border border-neutral-700 text-white hover:border-amber-600 transition-colors text-sm tracking-widest uppercase"
        >
          Ver todos no TikTok
        </a>
      </div>
    </main>
    </>
  )
}

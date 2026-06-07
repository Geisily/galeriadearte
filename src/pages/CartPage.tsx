import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { placeholderImages } from '../lib/mockData'

export function CartPage() {
  const { items, removeItem, total, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="text-neutral-500 mb-4">Seu carrinho está vazio.</p>
        <Link to="/galeria" className="text-sm text-orange-500 hover:underline tracking-wider uppercase">
          Explorar galeria
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light text-white mb-12">Carrinho</h1>

      <div className="divide-y divide-neutral-800">
        {items.map(({ artwork }) => (
          <div key={artwork._id} className="flex gap-6 py-6">
            <div className="w-24 h-24 bg-neutral-900 overflow-hidden shrink-0">
              <img
                src={placeholderImages[artwork._id]}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-light">{artwork.title}</h3>
              <p className="text-sm text-neutral-500 mt-1">{artwork.medium} · {artwork.dimensions}</p>
              <p className="text-orange-400 mt-2">R$ {artwork.price.toLocaleString('pt-BR')}</p>
            </div>

            <button
              onClick={() => removeItem(artwork._id)}
              className="text-neutral-700 hover:text-red-400 transition-colors text-sm"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-8">
        <div>
          <p className="text-neutral-500 text-sm">Total</p>
          <p className="text-2xl text-white font-light mt-1">R$ {total().toLocaleString('pt-BR')}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-6 py-3 text-sm text-neutral-500 hover:text-white transition-colors tracking-wider uppercase"
          >
            Limpar
          </button>
          <Link
            to="/checkout"
            className="px-8 py-3 bg-orange-800 text-white text-sm tracking-widest uppercase hover:bg-orange-700 transition-colors"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </main>
  )
}

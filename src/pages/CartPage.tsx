import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { placeholderImages } from '../lib/mockData'

export function CartPage() {
  const { items, removeItem, total, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-32 text-center">
        <p className="text-[var(--cream-3)] mb-4">Seu carrinho está vazio.</p>
        <Link to="/galeria" className="text-sm text-[var(--salmon)] hover:underline tracking-wider uppercase">
          Explorar galeria
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light text-white mb-12">Carrinho</h1>

      <div className="divide-y divide-[var(--teal-600)]">
        {items.map(({ artwork }) => (
          <div key={artwork._id} className="flex gap-6 py-6">
            <div className="w-24 h-24 bg-[var(--teal-800)] overflow-hidden shrink-0">
              <img
                src={placeholderImages[artwork._id]}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-light">{artwork.title}</h3>
              <p className="text-sm text-[var(--cream-3)] mt-1">{artwork.medium} · {artwork.dimensions}</p>
              <p className="text-[var(--peach)] mt-2">R$ {artwork.price.toLocaleString('pt-BR')}</p>
            </div>

            <button
              onClick={() => removeItem(artwork._id)}
              className="text-[var(--teal-500)] hover:text-red-400 transition-colors text-sm"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[var(--teal-600)] pt-8">
        <div>
          <p className="text-[var(--cream-3)] text-sm">Total</p>
          <p className="text-2xl text-white font-light mt-1">R$ {total().toLocaleString('pt-BR')}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-6 py-3 text-sm text-[var(--cream-3)] hover:text-[var(--cream)] transition-colors tracking-wider uppercase"
          >
            Limpar
          </button>
          <Link
            to="/checkout"
            className="px-8 py-3 bg-[var(--terra)] text-white text-sm tracking-widest uppercase hover:bg-[var(--terra-h)] transition-colors"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </main>
  )
}

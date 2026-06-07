'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  createdAt: string
  total: number
  status: string
  items: { artworkTitle: string; quantity: number; price: number }[]
}

const statusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: 'var(--bege-d)' },
  PAID: { label: 'Pago', color: 'var(--petrol)' },
  PROCESSING: { label: 'Processando', color: 'var(--petrol-l)' },
  SHIPPED: { label: 'Enviado', color: 'var(--terra)' },
  DELIVERED: { label: 'Entregue', color: '#27ae60' },
  CANCELLED: { label: 'Cancelado', color: '#e74c3c' },
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/conta/pedidos')
      .then(r => r.json())
      .then(data => { setOrders(data.orders || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/conta" className="text-xs" style={{ color: 'var(--bege-d)' }}>
          ← Minha Conta
        </Link>
      </div>

      <h1 className="text-serif font-semibold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--grafite)' }}>
        Meus Pedidos
      </h1>

      {loading ? (
        <p className="text-sm" style={{ color: 'var(--bege-d)' }}>Carregando...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-serif text-xl mb-3" style={{ color: 'var(--grafite)' }}>Nenhum pedido encontrado</p>
          <p className="text-sm mb-6" style={{ color: 'var(--bege-d)' }}>Você ainda não realizou nenhuma compra.</p>
          <Link href="/galeria" className="btn-primary">Ver Galeria</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const status = statusMap[order.status] || { label: order.status, color: 'var(--bege-d)' }
            return (
              <div
                key={order.id}
                className="p-5"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--bege)', borderRadius: '1px' }}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-mono mb-1" style={{ color: 'var(--bege-d)' }}>#{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs" style={{ color: 'var(--bege-d)' }}>
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-sm"
                      style={{ backgroundColor: 'var(--bege-l)', color: status.color }}
                    >
                      {status.label}
                    </span>
                    <span className="text-serif font-semibold" style={{ color: 'var(--terra)' }}>
                      R$ {order.total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  {order.items?.map((item, i) => (
                    <p key={i} className="text-xs" style={{ color: 'var(--grafite)' }}>
                      {item.artworkTitle} × {item.quantity} — R$ {(item.price * item.quantity).toLocaleString('pt-BR')}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

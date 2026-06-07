import type { VercelRequest, VercelResponse } from '@vercel/node'
import { MercadoPagoConfig, Preference } from 'mercadopago'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items, payer } = req.body

  if (!items?.length) {
    return res.status(400).json({ error: 'Nenhum item no carrinho' })
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  })

  const preference = new Preference(client)

  const siteUrl = process.env.VITE_SITE_URL || 'https://seusite.vercel.app'

  const result = await preference.create({
    body: {
      items: items.map((item: { title: string; unit_price: number; quantity: number }) => ({
        title: item.title,
        unit_price: item.unit_price,
        quantity: item.quantity,
        currency_id: 'BRL',
      })),
      payer: {
        name: payer.name,
        email: payer.email,
        phone: { number: payer.phone },
      },
      back_urls: {
        success: `${siteUrl}/checkout/sucesso`,
        failure: `${siteUrl}/checkout/falha`,
        pending: `${siteUrl}/checkout/pendente`,
      },
      auto_return: 'approved',
      statement_descriptor: 'ALEMAO VARGAS',
    },
  })

  return res.status(200).json({ id: result.id, init_point: result.init_point })
}

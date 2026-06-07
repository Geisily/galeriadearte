import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { prisma } from '@/lib/prisma'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alemaovargasmoreira.com.br'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, payer, total } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Itens inválidos' }, { status: 400 })
    }

    if (!payer?.name || !payer?.email) {
      return NextResponse.json({ error: 'Dados do comprador inválidos' }, { status: 400 })
    }

    // Create MP preference
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN || '',
    })

    const preference = new Preference(client)

    const mpItems = items.map((item: { id: string; title: string; price: number; quantity: number }) => ({
      id: item.id,
      title: item.title,
      unit_price: item.price,
      quantity: item.quantity,
      currency_id: 'BRL',
    }))

    const preferenceData = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: payer.name,
          email: payer.email,
          phone: payer.phone ? { number: payer.phone } : undefined,
        },
        back_urls: {
          success: `${SITE_URL}/checkout/sucesso`,
          failure: `${SITE_URL}/checkout/falha`,
          pending: `${SITE_URL}/checkout/pendente`,
        },
        auto_return: 'approved',
        notification_url: `${SITE_URL}/api/webhook/mercadopago`,
        statement_descriptor: 'Alemão Vargas Moreira',
      },
    })

    // Create order in DB
    const order = await prisma.order.create({
      data: {
        customerName: payer.name,
        customerEmail: payer.email,
        customerPhone: payer.phone || null,
        subtotal: total,
        total: total,
        paymentId: preferenceData.id || null,
        items: {
          create: items.map((item: { id: string; title: string; slug: string; price: number; quantity: number }) => ({
            artworkId: item.id,
            artworkTitle: item.title,
            artworkSlug: item.slug,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    })

    return NextResponse.json({
      id: preferenceData.id,
      init_point: preferenceData.init_point,
      orderId: order.id,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

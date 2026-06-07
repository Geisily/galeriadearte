import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

function mapPaymentStatus(mpStatus: string): string {
  const map: Record<string, string> = {
    approved: 'PAID',
    pending: 'PENDING',
    in_process: 'PENDING',
    rejected: 'CANCELLED',
    cancelled: 'CANCELLED',
    refunded: 'REFUNDED',
    charged_back: 'REFUNDED',
  }
  return map[mpStatus] || 'PENDING'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    // Validate webhook signature if secret is set
    const secret = process.env.MP_WEBHOOK_SECRET
    if (secret) {
      const xSignature = req.headers.get('x-signature')
      const xRequestId = req.headers.get('x-request-id')
      if (xSignature && xRequestId) {
        const parts = xSignature.split(',')
        const ts = parts.find(p => p.startsWith('ts='))?.split('=')[1]
        const v1 = parts.find(p => p.startsWith('v1='))?.split('=')[1]

        const url = req.url
        const manifest = `id:${xRequestId};request-id:${xRequestId};ts:${ts};`
        const hash = crypto
          .createHmac('sha256', secret)
          .update(manifest)
          .digest('hex')

        if (hash !== v1) {
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }
      }
    }

    const data = JSON.parse(body)

    if (data.type === 'payment') {
      const paymentId = data.data?.id
      if (!paymentId) return NextResponse.json({ ok: true })

      const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN || '',
      })
      const paymentClient = new Payment(client)
      const payment = await paymentClient.get({ id: paymentId })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentData = payment as any
      if (paymentData.external_reference || paymentData.preference_id) {
        const preferenceId = paymentData.preference_id || paymentData.external_reference
        const status = mapPaymentStatus(paymentData.status || 'pending')

        await prisma.order.updateMany({
          where: { paymentId: preferenceId },
          data: { status: status as never },
        })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

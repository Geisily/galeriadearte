import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { code, total } = await req.json()

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Código inválido' })
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: String(code).toUpperCase() },
    })

    if (!coupon) {
      return NextResponse.json({ valid: false, discount: 0, message: 'Cupom não encontrado.' })
    }

    if (!coupon.active) {
      return NextResponse.json({ valid: false, discount: 0, message: 'Cupom inativo.' })
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, discount: 0, message: 'Cupom expirado.' })
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ valid: false, discount: 0, message: 'Limite de usos atingido.' })
    }

    if (coupon.minOrder && total < coupon.minOrder) {
      return NextResponse.json({
        valid: false,
        discount: 0,
        message: `Pedido mínimo de R$ ${coupon.minOrder.toLocaleString('pt-BR')} para este cupom.`,
      })
    }

    const discount =
      coupon.type === 'PERCENT'
        ? (total * coupon.value) / 100
        : coupon.value

    return NextResponse.json({
      valid: true,
      type: coupon.type,
      value: coupon.value,
      discount: Math.min(discount, total),
      message: `Cupom aplicado! Desconto de ${coupon.type === 'PERCENT' ? `${coupon.value}%` : `R$ ${coupon.value}`}.`,
    })
  } catch (error) {
    console.error('Coupon error:', error)
    return NextResponse.json({ valid: false, discount: 0, message: 'Erro ao validar cupom.' })
  }
}

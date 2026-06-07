import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, type, size, deadline, observations } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Dados obrigatórios faltando' }, { status: 400 })
    }

    const commission = await prisma.commission.create({
      data: {
        name,
        email,
        phone: phone || null,
        type: type || 'Retrato',
        size: size || '60 × 80 cm',
        deadline: deadline || null,
        description: observations || '',
      },
    })

    return NextResponse.json({ ok: true, id: commission.id })
  } catch (error) {
    console.error('Commission error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

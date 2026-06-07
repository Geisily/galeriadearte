import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // In production, filter by authenticated user's email/id
    // const session = await getServerSession(...)
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { items: true },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Orders error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

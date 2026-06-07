import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 })
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true, name: name || null },
      create: { email, name: name || null },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

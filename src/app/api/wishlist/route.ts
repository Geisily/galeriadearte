import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'

// Note: These endpoints require authentication in production.
// For now, they return empty data for unauthenticated users.

export async function GET() {
  try {
    // In production, get userId from session
    // const session = await getServerSession(...)
    return NextResponse.json({ items: [] })
  } catch (error) {
    console.error('Wishlist GET error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { artworkId, artworkTitle, artworkSlug, userId } = await req.json()

    if (!userId || !artworkId) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const item = await prisma.wishlist.upsert({
      where: { userId_artworkId: { userId, artworkId } },
      update: {},
      create: {
        userId,
        artworkId,
        artworkTitle,
        artworkSlug,
      },
    })

    return NextResponse.json({ ok: true, item })
  } catch (error) {
    console.error('Wishlist POST error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
    }

    await prisma.wishlist.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Wishlist DELETE error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

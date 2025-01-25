import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json(user)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: body,
  })
  return NextResponse.json(user)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.delete({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json(user)
}


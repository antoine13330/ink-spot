import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json(appointment)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const appointment = await prisma.appointment.update({
    where: {
      id: params.id,
    },
    data: body,
  })
  return NextResponse.json(appointment)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const appointment = await prisma.appointment.delete({
    where: {
      id: params.id,
    },
  })
  return NextResponse.json(appointment)
}


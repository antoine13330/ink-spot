import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const appointments = await prisma.appointment.findMany()
  return NextResponse.json(appointments)
}

export async function POST(request: Request) {
  const body = await request.json()
  const appointment = await prisma.appointment.create({
    data: body,
  })
  return NextResponse.json(appointment)
}


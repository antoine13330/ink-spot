import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { appointmentId } = await req.json()

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { user: true },
    })

    if (!appointment) {
      return new NextResponse("Appointment not found", { status: 404 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(appointment.price * 100), // Stripe expects amount in cents
      currency: "usd",
      metadata: {
        appointmentId: appointment.id,
      },
    })

    // Update the appointment with the payment intent ID
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { paymentId: paymentIntent.id },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Payment intent error:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}


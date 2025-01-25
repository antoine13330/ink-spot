"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface BookingFormProps {
  artistId: string
}

export function BookingForm({ artistId }: BookingFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create the appointment
      const appointmentResponse = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistId,
          date,
          description,
          status: "PENDING",
          price: 100, // This should be dynamically set based on the artist's rate
        }),
      })

      if (!appointmentResponse.ok) {
        throw new Error("Failed to create appointment")
      }

      const appointment = await appointmentResponse.json()

      // Create a payment intent
      const paymentIntentResponse = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: appointment.id }),
      })

      if (!paymentIntentResponse.ok) {
        throw new Error("Failed to create payment intent")
      }

      const { clientSecret } = await paymentIntentResponse.json()

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      const result = await stripe?.redirectToCheckout({
        clientSecret,
      })

      if (result?.error) {
        throw new Error(result.error.message)
      }

      toast({
        title: "Appointment booked",
        description: "Your appointment has been successfully booked.",
      })
      router.push(`/appointments/${appointment.id}`)
    } catch (error) {
      console.error("Booking failed:", error)
      toast({
        title: "Booking failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Select Date</label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your tattoo idea..."
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </Button>
      </form>
    </Card>
  )
}


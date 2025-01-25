"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface Appointment {
  id: string
  date: string
  status: string
  description: string
  user: {
    name: string
  }
}

export function AppointmentManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments')
      if (!response.ok) throw new Error('Failed to fetch appointments')
      const data = await response.json()
      setAppointments(data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error('Failed to update appointment')
      fetchAppointments()
      toast({
        title: "Appointment updated",
        description: `Appointment status changed to ${status}.`,
      })
    } catch (error) {
      console.error('Error updating appointment:', error)
      toast({
        title: "Update failed",
        description: "Failed to update appointment status. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Appointments</h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{appointment.user.name}</p>
                <p className="text-sm text-muted-foreground">{new Date(appointment.date).toLocaleString()}</p>
                <p className="text-sm">{appointment.description}</p>
              </div>
              <div className="space-x-2">
                <Button
                  size="sm"
                  onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                  disabled={appointment.status === 'CONFIRMED'}
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => updateAppointmentStatus(appointment.id, 'CANCELLED')}
                  disabled={appointment.status === 'CANCELLED'}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}


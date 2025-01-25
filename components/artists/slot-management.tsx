"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Slot {
  id: string
  date: Date
  startTime: string
  endTime: string
}

export function SlotManagement() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const addSlot = () => {
    if (selectedDate && startTime && endTime) {
      const newSlot: Slot = {
        id: Date.now().toString(),
        date: selectedDate,
        startTime,
        endTime
      }
      setSlots([...slots, newSlot])
      setStartTime("")
      setEndTime("")
    }
  }

  const removeSlot = (id: string) => {
    setSlots(slots.filter(slot => slot.id !== id))
  }

  return (
    <Card className="p-4 space-y-6">
      <h3 className="font-semibold text-lg">Manage Available Slots</h3>
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-time">Start Time</Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="end-time">End Time</Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={addSlot} className="w-full">Add Slot</Button>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Available Slots</h4>
        {slots.map(slot => (
          <div key={slot.id} className="flex justify-between items-center bg-accent p-2 rounded-md">
            <span>{slot.date.toDateString()} {slot.startTime} - {slot.endTime}</span>
            <Button variant="destructive" size="sm" onClick={() => removeSlot(slot.id)}>Remove</Button>
          </div>
        ))}
      </div>
    </Card>
  )
}


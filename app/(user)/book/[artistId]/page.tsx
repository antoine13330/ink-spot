import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { SlotManagement } from "@/components/artists/slot-management"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Book Appointment" 
        subtitle="with @pierce"
        backHref="/artists"
      />

      <div className="pt-20 pb-20 px-4">
        <SlotManagement />

        <Card className="mt-6 p-4">
          <h3 className="font-semibold mb-2">Project Details</h3>
          <textarea 
            className="w-full min-h-[100px] p-3 rounded-lg bg-accent"
            placeholder="Describe your tattoo idea..."
          />
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <Button className="w-full">Continue to Payment</Button>
      </div>
    </div>
  )
}


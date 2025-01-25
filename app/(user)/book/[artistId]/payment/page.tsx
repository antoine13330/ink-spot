import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Info } from 'lucide-react'

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Payment" 
        backHref="/book/artist-id"
      />

      <div className="pt-20 pb-20 px-4 space-y-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              You can either pay your reservation deposit online or wait to pay in person
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Reservation price</span>
              <span className="font-semibold">70$</span>
            </div>
            <div className="flex justify-between">
              div>
            <div className="flex justify-between">
              <span>Full price</span>
              <span className="font-semibold">700$</span>
            </div>
            <Button className="w-full">Pay reservation</Button>
            <Button variant="outline" className="w-full">Pay in person</Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Full payment request</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Paid</span>
              <span className="font-semibold">70$</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining</span>
              <span className="font-semibold">630$</span>
            </div>
            <Button className="w-full">Pay now</Button>
            <Button variant="outline" className="w-full">Pay in person</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}


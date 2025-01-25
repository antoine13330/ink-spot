import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UserAvatar } from "@/components/ui/user-avatar"
import { PageHeader } from "@/components/ui/page-header"
import { MoreHorizontal } from 'lucide-react'

export default function ConversationPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="@pierce" 
        subtitle="Tattoo artist" 
        backHref="/messages"
      >
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </PageHeader>

      <div className="pt-20 pb-20 px-4">
        <div className="space-y-4">
          <Card className="p-4 bg-accent">
            <p>J'aimerais bien faire une realisation venant de toi est que tu aurais des dispos prochainement</p>
          </Card>
          <Card className="p-4 ml-auto bg-primary text-primary-foreground max-w-[80%]">
            <p>Je te propose un projet que je veux depuis deux ans</p>
          </Card>
          <Card className="p-4 ml-auto bg-primary text-primary-foreground max-w-[80%]">
            <p>C'est un style un peu neo tribal</p>
          </Card>
          <Card className="p-4 ml-auto bg-primary text-primary-foreground max-w-[80%]">
            <p>Ca tinteresse ?</p>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-4 bg-accent">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserAvatar fallback="P" />
                  <span className="font-semibold">@pierce</span>
                </div>
                <span className="text-sm">700$</span>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1" variant="outline">Decline</Button>
                <Button className="flex-1">Accept</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Write here..." 
            className="flex-1 bg-accent rounded-lg px-4 py-2"
          />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  )
}


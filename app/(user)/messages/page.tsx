import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserAvatar } from "@/components/ui/user-avatar"
import { PageHeader } from "@/components/ui/page-header"
import Link from "next/link"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <PageHeader title="Messages" />
      <div className="pt-16 p-4">
        <Tabs defaultValue="conversations">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="conversations" className="flex-1">Conversations</TabsTrigger>
            <TabsTrigger value="archives" className="flex-1">Archives</TabsTrigger>
          </TabsList>
          <TabsContent value="conversations">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground mb-2">Incoming appointment</div>
              <ScrollArea className="h-[calc(100vh-200px)]">
                {Array.from({length: 10}).map((_, i) => (
                  <Link href={`/messages/${i}`} key={i}>
                    <div className="flex items-center gap-4 p-4 hover:bg-accent rounded-lg cursor-pointer">
                      <UserAvatar fallback="TD" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">Despoteur Fou</h3>
                          <span className="text-sm text-muted-foreground">12:34</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Are you open for a new tattoo project? I have some...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


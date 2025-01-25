import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Heart, MessageSquare, Share2 } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <ScrollArea className="h-[100px] w-full border-b">
        <div className="flex gap-4 p-4">
          {Array.from({length: 10}).map((_, i) => (
            <Link key={i} href="#" className="flex flex-col items-center gap-1">
              <UserAvatar fallback={`A${i}`} size="lg" />
              <span className="text-xs">Artist {i + 1}</span>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-6 p-4">
        {Array.from({length: 3}).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="p-4 flex items-center gap-3">
              <UserAvatar fallback="P" />
              <div>
                <h3 className="font-semibold">@pierce</h3>
                <p className="text-sm text-muted-foreground">Tattoo artist</p>
              </div>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/placeholder.svg"
                alt="Tattoo work"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>
              <div>
                <p className="font-semibold">29 likes</p>
                <p className="text-sm text-muted-foreground mt-1">
                  View all 29 comments
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


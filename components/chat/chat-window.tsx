"use client"

import { useEffect, useRef, useState } from "react"
import { useSocket } from "@/hooks/use-socket"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: Date
}

export function ChatWindow({
  receiverId,
  currentUserId,
}: {
  receiverId: string
  currentUserId: string
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const socket = useSocket()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (socket) {
      socket.emit("join-chat", `${currentUserId}-${receiverId}`)

      socket.on("receive-message", (message: Message) => {
        setMessages((prev) => [...prev, message])
      })
    }

    return () => {
      if (socket) {
        socket.off("receive-message")
      }
    }
  }, [socket, currentUserId, receiverId])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const message = {
      content: newMessage,
      senderId: currentUserId,
      receiverId,
      createdAt: new Date(),
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      })

      if (response.ok) {
        socket?.emit("send-message", {
          ...message,
          chatId: `${currentUserId}-${receiverId}`,
        })
        setNewMessage("")
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-background border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.senderId === currentUserId ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.senderId === currentUserId
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70">
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}


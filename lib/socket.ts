import { Server as NetServer } from "http"
import { Server as ServerIO } from "socket.io"
import { NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: false,
  },
}

export const initSocket = (server: NetServer) => {
  const io = new ServerIO(server, {
    path: "/api/socket",
    addTrailingSlash: false,
  })

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id)

    socket.on("join-chat", (chatId: string) => {
      socket.join(chatId)
    })

    socket.on("send-message", (message) => {
      io.to(message.chatId).emit("receive-message", message)
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id)
    })
  })

  return io
}


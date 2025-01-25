import { NavigationBar } from "@/components/layout/navigation-bar"
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import './globals.css'
import { NextAuthProvider } from "@/components/providers/session-provider"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <main
            className={inter.className}
          >{children}</main>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  )
}



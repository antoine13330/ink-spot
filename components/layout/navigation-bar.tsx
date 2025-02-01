"use client"

import { Search, Grid2X2, MessageSquare, User, Home, LayoutGrid, BadgePlus } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavigationBar() {
  const pathname = usePathname()
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <nav className="flex items-center justify-around p-2">
        <Link
         href="/"
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            pathname === "/" && "text-primary"
          )}
        >
          <Home size={24} />
        </Link>
        <Link 
          href="/discover" 
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            pathname === "/discover" && "text-primary"
          )}
        >
          <LayoutGrid size={24} />
        </Link>

        <Link 
          href="/create"
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            pathname === "/create" && "text-primary"
          )}
        >
          <BadgePlus size={24} />
        </Link>
        <Link 
          href="/messages" 
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            pathname === "/messages" && "text-primary"
          )}
        >
          <MessageSquare size={24} />
        </Link>
        <Link 
          href="/profile" 
          className={cn(
            "flex flex-col items-center p-2 rounded-lg",
            pathname === "/profile" && "text-primary"
          )}
        >
          <User size={24} />
        </Link>
      </nav>
    </div>
  )
}


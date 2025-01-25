"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/ui/user-avatar"
import { PageHeader } from "@/components/ui/page-header"
import { Settings, Upload, LogOut } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg")
  const [uploading, setUploading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const { url } = await response.json()
      setAvatarUrl(url)
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been successfully updated.",
      })
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your avatar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background pb-16">
       <PageHeader title="Profile">
        <div className="flex gap-2">
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-6 w-6" />
          </Button>
        </div>
      </PageHeader>
      
      <div className="pt-20 p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <UserAvatar src={avatarUrl} fallback={session.user?.name?.[0] || "U"} size="lg" />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
              <Upload className="h-4 w-4" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              disabled={uploading}
            />
          </div>
          <div>
            <h2 className="font-semibold">{session.user?.name}</h2>
            <p className="text-sm text-muted-foreground">{session.user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {Array.from({length: 9}).map((_, i) => (
            <div key={i} className="aspect-square relative">
              <Image
                src="/placeholder.svg"
                alt={`Work ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


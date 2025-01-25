import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string
  fallback: string
  size?: "sm" | "md" | "lg"
}

export function UserAvatar({ src, fallback, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  }

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={src || "/placeholder.svg"} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}


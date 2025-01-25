import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backHref?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, backHref, children }: PageHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="flex items-center p-4">
        {backHref && (
          <Link href={backHref}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        )}
        <div className="flex-1 px-4">
          <h2 className="font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}


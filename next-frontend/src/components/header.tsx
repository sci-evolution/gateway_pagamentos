import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  userName?: string
}

export function Header({ userName = "usuário" }: HeaderProps) {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/invoices" className="text-xl font-bold">
          Full Cycle Gateway
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Olá, {userName}</span>
          <Button variant="destructive" size="sm" className="gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

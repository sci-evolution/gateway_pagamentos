"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

interface HeaderProps {
  userName?: string
}

export function Header({ userName }: HeaderProps) {
  const { isAuthenticated, userName: contextUserName, logout } = useAuth()
  
  // Use the prop value if provided, otherwise fall back to the context value
  const displayName = userName || contextUserName

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href={isAuthenticated ? "/invoices" : "/"} className="text-xl font-bold">
          Full Cycle Gateway
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <span className="text-sm text-muted-foreground">Olá, {displayName}</span>
              <Button variant="destructive" size="sm" className="gap-2" onClick={logout}>
                <LogOut size={16} />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

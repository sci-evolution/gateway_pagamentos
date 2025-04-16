import type React from "react"
import { Header } from "@/components/header"
import { getUserInfo } from "@/lib/auth-utils"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get server-verified user info
  const userInfo = await getUserInfo()
  const userName = userInfo?.name || "usuário"

  return (
    <div className="flex min-h-screen flex-col">
      <Header userName={userName} />
      <main className="flex-1 py-8">
        <div className="container px-4">{children}</div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Full Cycle Gateway. Todos os direitos reservados.
      </footer>
    </div>
  )
}

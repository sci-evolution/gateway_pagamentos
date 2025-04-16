import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { logout as logoutAction } from "@/app/actions"
// import { cookies } from "next/headers"
interface AuthContextType {
  isAuthenticated: boolean
  userName: string
  logout: () => Promise<void>
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  userName: "usuário",
  logout: async () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContext)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // Using a fixed userName since we're not setting it dynamically in this example
  const userName = "usuário"
  const router = useRouter()

  // Check authentication status when component mounts
  useEffect(() => {
    // Only run in the browser
    if (typeof window !== "undefined") {
      // Check server-set cookie
      checkAuthStatus()
    }
  }, [])

  const checkAuthStatus = async () => {
    // Check if the apiKey cookie exists
    
    const cookies = document.cookie.split(";")
    const hasApiKey = cookies.some(
      (cookie) => cookie.trim().startsWith("apiKey=") && cookie.trim() !== "apiKey="
    )
    
    // providório para testar
    //const cookiesStore = await cookies();
    //const hasApiKey = cookiesStore.get("apiKey") !== undefined;
    //console.log("hasApiKey", hasApiKey)
    // fimprovidório para testar

    setIsAuthenticated(hasApiKey)
  }

  const logout = async () => {
    try {
      await logoutAction()
      setIsAuthenticated(false)
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, logout }}>
      {children}
    </AuthContext.Provider>
  )
} 
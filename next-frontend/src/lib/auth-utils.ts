import { cookies } from 'next/headers'

/**
 * Check if the user is authenticated by verifying the apiKey cookie
 * This is a server-side function that should be used in server components
 * or server actions for secure authentication checking
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const apiKey = cookieStore.get('apiKey')?.value
  
  // Return true if the apiKey exists and is not empty
  return !!apiKey && apiKey.trim() !== ''
}

/**
 * Get the user info from the authentication data
 * In a real application, this would typically validate the apiKey
 * and retrieve user information from a database or authentication service
 */
export async function getUserInfo() {
  const isUserAuthenticated = await isAuthenticated()
  
  if (!isUserAuthenticated) {
    return null
  }
  
  // In a real app, you would fetch user data from your backend
  // For now, we return a dummy user object
  return {
    name: 'Usuário Autenticado',
    // Add other user properties as needed
  }
} 
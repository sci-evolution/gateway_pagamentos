'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  // Remover o cookie apiKey
  const cookieStore = await cookies()
  cookieStore.set('apiKey', '', { 
    expires: new Date(0),
    path: '/'
  })
  
  // Redirecionar para a página de login
  redirect('/login')
} 
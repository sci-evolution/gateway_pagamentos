'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation"

// Define the response type for clarity
export type ActionResponse = {
  success: boolean;
  message: string;
}

// Server action para processar o login
export async function loginWithApiKey(formData: FormData): Promise<ActionResponse> {
  // Extrai o valor da API Key do formulário
  const apiKey = formData.get('apiKey') as string
  
  // Validação básica do lado do servidor
  if (!apiKey || apiKey.trim() === '') {
    return {
      success: false,
      message: 'A API Key é obrigatória'
    }
  }
  
  // Aqui você implementaria a validação real da API Key
  // Por enquanto, apenas simulamos uma validação básica
  if (apiKey && apiKey.length > 5) {
    // Armazenaria a sessão do usuário, token, etc.
    const cookieStore = await cookies();
    cookieStore.set('apiKey', apiKey as string);

    console.log('apiKey', apiKey);
    
    await fetch('http://localhost:8080/accounts', {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey
      }
    })
    .then(response => {
      console.log('response', response.statusText);
      if (!response.ok) {
        console.error('Erro ao buscar contas:', response.statusText)
        return {
          success: false,
          message: 'Erro ao fazer login.'
        }
      } else {
        console.log('Login realizado com sucesso', response.statusText);
        // Para este exemplo, apenas redirecionamos para a página de faturas
        redirect('/invoices');
      }
    })
    .catch(error => {
      console.error('Erro ao buscar contas:', error)
      return {
        success: false,
        message: 'Erro ao fazer login.'
      }
    })

    // Para este exemplo, apenas redirecionamos para a página de faturas
    // redirect('/invoices')
  }

  // Se chegou até aqui, significa que a autenticação falhou
  return {
    success: false,
    message: 'API Key inválida. A chave deve ter pelo menos 6 caracteres.'
  }
} 
'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const pagamentosGatewayURL = process.env.PAGAMENTOS_GATEWAY_URL;

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
    
    const response = await fetch(`${pagamentosGatewayURL}/accounts`, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey
      }
    });

    if (!response.ok) {
      console.error('Erro ao autenticar com a API externa:', response.statusText);
      // Se a autenticação falhar, você pode retornar uma mensagem de erro
      return {
        success: false,
        message: 'Erro ao fazer login.'
      }
    }
    
    // Neste exemplo, vamos redirecionar para a página de faturas
    redirect('/invoices');
  }

  // Se chegou até aqui, significa que a autenticação falhou
  return {
    success: false,
    message: 'API Key inválida. A chave deve ter pelo menos 6 caracteres.'
  }
}
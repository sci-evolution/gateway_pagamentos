import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Origens permitidos para CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((o: string) => o.trim()) || [];

// Rotas que devem ser protegidas (requer autenticação)
const protectedRoutes = ['/invoices'];

// Rotas de autenticação (não redirecionar de volta para login)
const authRoutes = ['/login'];

export function middleware(request: NextRequest) {
  // Configurar CORS
  const origin = request.headers.get('origin');

  // Resolve requisições CORS preflight (OPTIONS)
  if (request.method === 'OPTIONS') {
    if (origin && allowedOrigins.includes(origin)) {
      const response = new NextResponse(null, { status: 204 });
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      return response;
    }
    // Retorna 403 se não autorizado
    return new NextResponse('CORS Forbidden', { status: 403 });
  }

  const { pathname } = request.nextUrl;
  const apiKey = request.cookies.get('apiKey')?.value;

  // Verificar se a apiKey existe e não está vazia
  const isAuthenticated = !!apiKey && apiKey.trim() !== '';

  // Verificar se a rota atual está na lista de rotas protegidas
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  )

  // Verificar se a rota atual é uma rota de autenticação
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  )

  // Se for uma rota protegida e não há apiKey, redireciona para login
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/login', request.url)
    return NextResponse.redirect(url);
  }

  // Se o usuário já está autenticado e tenta acessar uma rota de autenticação,
  // redireciona para a página principal de faturas
  if (isAuthRoute && isAuthenticated) {
    const url = new URL('/invoices', request.url)
    return NextResponse.redirect(url);
  }

  // Para outras requisições, definir os cabeçalhos CORS se a origem for permitida
  const response = NextResponse.next();
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
};

// Configurar o matcher para as rotas que o middleware deve ser executado
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

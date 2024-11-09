import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  // Rutas públicas que no requieren autenticación
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register'
  ) {
    if (session) {
      return NextResponse.redirect(new URL('/songs', request.url));
    }
    return NextResponse.next();
  }

  // Rutas protegidas que requieren autenticación
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/songs/:path*', '/login', '/register'],
};

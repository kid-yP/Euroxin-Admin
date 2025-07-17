import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = request.cookies.get('session');
  const userRole = request.cookies.get('userRole');

  // Public routes
  if (pathname === '/login') {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!userRole || !['admin', 'supervisor'].includes(userRole.value)) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      response.cookies.delete('userRole');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
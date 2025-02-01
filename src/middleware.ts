import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const signInUrl = '/auth/signin';
  const dashboardUrl = '/dashboard';
  console.log(request.nextUrl.pathname);
  const token = await getToken({ req: request });
  console.log(request.nextUrl.pathname);
  if (!token) {
    if (!request.nextUrl.pathname.includes('/auth')) {
      return NextResponse.redirect(new URL(signInUrl, request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith(signInUrl)) {
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api/auth|_next/static|_next/image|pwa|image|favicon.ico|sitemap.xml|robots.txt).*)',
    },
  ],
};

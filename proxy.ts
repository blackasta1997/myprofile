import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const loggedIn = request.cookies.get('loggedIn')?.value;

  if (loggedIn !== 'true') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/calendar/:path*', '/appointment/:path*', '/profile'],
};

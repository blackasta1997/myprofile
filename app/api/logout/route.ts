import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('loggedIn', '', {
    path: '/',
    maxAge: 0,
  });
  response.cookies.set('uid', '', {
    path: '/',
    maxAge: 0,
  });
  return response;
}

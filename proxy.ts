import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const loggedIn = request.cookies.get("loggedIn")?.value;
  const pathname = request.nextUrl.pathname;
  console.log(loggedIn, pathname);
  if (loggedIn === undefined) {
    if (pathname === "/appointment") {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (pathname !== "/login") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } else {
    if (loggedIn !== undefined && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/calendar/:path*", "/appointment/:path*", "/dashboard", "/login"],
};

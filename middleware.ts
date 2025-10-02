import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/success") || pathname.startsWith("/cancel")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/checkout")) {
    const authHeader = request.headers.get("authorization");
    const firebaseToken = request.cookies.get("firebase-auth-token");

    if (!authHeader && !firebaseToken) {
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("checkout", "true");
      signinUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};

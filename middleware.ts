import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Add any custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect checkout routes
        if (req.nextUrl.pathname.startsWith("/checkout")) {
          return !!token;
        }

        // Allow access to other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/checkout/:path*"],
};

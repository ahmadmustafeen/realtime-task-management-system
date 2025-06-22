import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/lib/constants";

// Define protected routes
const protectedRoutes = [ROUTES.DASHBOARD, ROUTES.PROFILE];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the route is protected and no token is found, redirect to login
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const token = request.cookies.get("token")?.value;

  if (isProtected && !token) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

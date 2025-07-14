import { NextResponse } from "next/server";

const protectedRoutes = [
  "/home",
  "/dashboard",
  "/settings",
  "/profile",
  "/store",
];

const publicRoutes = ["/login", "/register"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refreshToken")?.value;

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (publicRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    "/home/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/settings",
    "/settings/:path*",
    "/profile",
    "/profile/:path*",
    "/store",
    "/store/:path*",
    "/login",
    "/register",
  ],
};

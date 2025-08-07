import { NextRequest, NextResponse } from "next/server";
export async function middleware(req) {
  const token = req.cookies.get("token")?.value || "";
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  if (isPublicPath && token)
    return NextResponse.redirect(new URL("/", req.nextUrl));
  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/login", req.nextUrl));
}

export const config = {
  matcher: ["/", "/profile/:path*", "/signup", "/login"],
};

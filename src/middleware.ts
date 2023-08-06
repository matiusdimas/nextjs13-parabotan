import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const cookie = req.cookies.has('token')
    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        if (cookie) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }
    if (req.nextUrl.pathname === '/cart') {
        if (!cookie) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }
}


export { default } from "next-auth/middleware"
export const config = { matcher: ["/cart", "/login", '/register'] }

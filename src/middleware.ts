import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    if (path === '/') {
      return NextResponse.next();
    }
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        raw: true
    });
    const isProtected = config.matcher.find(u => { return u == path })
    
    if (!session && isProtected) {
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${path}`, req.url));
    }
    return NextResponse.next();
}

export const config = { matcher: [
    "/playerGroup", "/auth/profile"
]}
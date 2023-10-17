import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'
import type { Database } from '@/app/lib/database.types'


export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({ req, res })
    const { data, error } = await supabase.auth.getSession();

    if (data.session && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/homepage', req.url))
    }

    else if (!data.session && req.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}

export const config = {
    matcher: ['/','/homepage'],
  }
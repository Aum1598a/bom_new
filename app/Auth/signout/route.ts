import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/app/lib/database.types'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    const {
        data: { session },
      } = await supabase.auth.getSession()
      
      if (session) {
        
        await supabase.auth.signOut()
        // localStorage.setItem('userNew','');
    
      }
      return NextResponse.redirect(new URL('/', request.url), {
        status: 302,
      })
}
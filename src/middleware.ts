import { createServerClient, type CookieOptions } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    let res = NextResponse.next({
        request: {
            headers: req.headers,
        },
    });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If keys are missing, we can't do anything with auth, just pass through
    if (!url || !key) {
        return res;
    }

    const supabase = createServerClient(url, key, {
        cookies: {
            get(name: string) {
                return req.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
                req.cookies.set({ name, value, ...options });
                res = NextResponse.next({
                    request: {
                        headers: req.headers,
                    },
                });
                res.cookies.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
                req.cookies.set({ name, value: '', ...options });
                res = NextResponse.next({
                    request: {
                        headers: req.headers,
                    },
                });
                res.cookies.set({ name, value: '', ...options });
            },
        },
    }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protect /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            // Security by obscurity: return 404 for unauthorized admin access
            return new NextResponse(null, { status: 404 });
        }
    }

    // Hide the secret login page if already logged in
    if (req.nextUrl.pathname.startsWith('/nx72-naav/login')) {
        if (user) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',
        '/nx72-naav/:path*'
    ],
};

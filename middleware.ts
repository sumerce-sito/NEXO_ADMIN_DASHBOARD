import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASS = process.env.ADMIN_PASSWORD

export function middleware(req: NextRequest) {
  if (!ADMIN_USER || !ADMIN_PASS) return NextResponse.next()

  const auth = req.headers.get('authorization') ?? ''
  if (auth.startsWith('Basic ')) {
    const decoded = atob(auth.slice(6))
    const colon   = decoded.indexOf(':')
    const user     = decoded.slice(0, colon)
    const pass     = decoded.slice(colon + 1)
    if (user === ADMIN_USER && pass === ADMIN_PASS) return NextResponse.next()
  }

  return new NextResponse('Acceso restringido — NEXO Admin', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="NEXO Admin QUIE"' },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/scan).*)'],
}

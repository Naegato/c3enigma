import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin'],
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'cedric' && pwd === '1234') {
      return NextResponse.next()
    }
  }

  const res = new NextResponse('Authentication required', {
    status: 401,
  })
  res.headers.set('WWW-Authenticate', 'Basic realm="Secure Area"')

  return res
}

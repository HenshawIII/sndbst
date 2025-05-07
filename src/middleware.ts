import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Log CoinGecko API requests
  if (request.nextUrl.pathname.startsWith('/api/coingecko')) {
    const timestamp = new Date().toISOString()
    console.log('\n=== CoinGecko API Request ===')
    console.log(`Timestamp: ${timestamp}`)
    console.log(`Path: ${request.nextUrl.pathname}`)
    console.log(`Method: ${request.method}`)
    console.log('Headers:', Object.fromEntries(request.headers))
    console.log('Search Params:', Object.fromEntries(request.nextUrl.searchParams))
    
    // Clone the request to read the body
    const clonedRequest = request.clone()
    try {
      const body = await clonedRequest.text()
      if (body) {
        console.log('Request Body:', body)
      }
    } catch (error) {
      console.log('No request body or error reading body')
    }
    console.log('===========================\n')
  }

  const response = NextResponse.next()
  
  // Log response status
  if (request.nextUrl.pathname.startsWith('/api/coingecko')) {
    console.log('\n=== CoinGecko API Response ===')
    console.log(`Status: ${response.status}`)
    console.log('Response Headers:', Object.fromEntries(response.headers))
    console.log('===========================\n')
  }

  return response
}

export const config = {
  matcher: '/api/coingecko/:path*',
} 
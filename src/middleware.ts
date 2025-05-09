import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Basic logging to verify middleware execution
  console.log('\n=== Middleware Executed ===')
  console.log(`Request URL: ${request.url}`)
  console.log(`Request Path: ${request.nextUrl.pathname}`)
  
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

  // Forward the request to the actual API with API key as query parameter
  const apiUrl = `https://api.coingecko.com/api/v3${request.nextUrl.pathname.replace('/api/coingecko', '')}${request.nextUrl.search}${request.nextUrl.search ? '&' : '?'}x_cg_demo_api_key=CG-oSn1QEGnT1dixqQi3cTrRHDT`
  console.log('Forwarding to:', apiUrl)
  
  const response = await fetch(apiUrl)

  // Create a new response with the API response data
  const newResponse = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  })
  
  // Log response status
  if (request.nextUrl.pathname.startsWith('/api/coingecko')) {
    console.log('\n=== CoinGecko API Response ===')
    console.log(`Status: ${response.status}`)
    console.log('Response Headers:', Object.fromEntries(response.headers))
    console.log('===========================\n')
  }

  return newResponse
}

// Update the matcher to be more specific
export const config = {
  matcher: [
    '/api/coingecko/:path*',
    '/api/jupag/:path*'
  ]
} 
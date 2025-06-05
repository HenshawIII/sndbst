import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Forward the body and headers to the real API
    const body = await req.text(); // Use .text() to support any content-type
    
    console.log('Forwarding request to pump.fun/api/ipfs');
    console.log('Request body:', body);
    console.log('Content-Type:', req.headers.get("content-type"));

    const response = await fetch("https://pump.fun/api/ipfs", {
      method: "POST",
      headers: {
        // Forward only necessary headers
        "Content-Type": req.headers.get("content-type") || "application/json",
      },
      body,
    });

    if (!response.ok) {
      console.error('Error from pump.fun:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to forward request to pump.fun' }), 
        { 
          status: response.status,
          headers: {
            'content-type': 'application/json'
          }
        }
      );
    }

    // Forward the response (status, headers, body)
    const data = await response.text();
    return new NextResponse(data, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error: any) {
    console.error('Error in IPFS route handler:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error', details: error?.message || 'Unknown error' }), 
      { 
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
}
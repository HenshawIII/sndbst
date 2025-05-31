import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { mint: string } }
) {
  try {
    // Make the request exactly like a browser would
    const response = await fetch(`https://tokens.jup.ag/token/${params.mint}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch token data' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept'
    }
  });
} 
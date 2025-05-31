import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { mint: string } }
) {
  try {
    const response = await fetch(`https://tokens.jup.ag/token/${params.mint}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Accept'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch token data' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Accept'
        }
      }
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
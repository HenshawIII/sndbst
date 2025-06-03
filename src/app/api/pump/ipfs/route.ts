import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Forward the body and headers to the real API
  const body = await req.text(); // Use .text() to support any content-type
  const response = await fetch("https://pump.fun/api/ipfs", {
    method: "POST",
    headers: {
      // Forward only necessary headers
      "Content-Type": req.headers.get("content-type") || "application/json",
    },
    body,
  });

  // Forward the response (status, headers, body)
  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
    },
  });
}
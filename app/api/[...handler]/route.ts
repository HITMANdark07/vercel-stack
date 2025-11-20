import { NextRequest } from 'next/server';
import router from '../../../server/index';

async function handleRequest(req: NextRequest) {
  const url = new URL(req.url);
  // Remove /api prefix and normalize path
  let pathname = url.pathname.replace('/api', '') || '/';
  // Remove trailing slash except for root
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Try to match a route
  const response = await router.handle(req, pathname);

  if (response) {
    return response;
  }

  // No route matched
  return Response.json(
    { error: 'Not Found' },
    { status: 404 }
  );
}

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

export async function PUT(req: NextRequest) {
  return handleRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req);
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req);
}

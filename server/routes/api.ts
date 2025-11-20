import { NextRequest, NextResponse } from 'next/server';
import Router from '../../lib/router';

const router = new Router();

// Example GET endpoint for /test
router.get('/test', async (_req: NextRequest) => {
  console.log('GET request received at /test');
  return NextResponse.json({
    message: 'GET request received at /test',
    timestamp: new Date().toISOString(),
  });
});

// Example POST endpoint
router.post('/test', async (req: NextRequest) => {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({
    message: 'POST request received',
    body: body,
  });
});

export default router;


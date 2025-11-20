import { NextRequest, NextResponse } from 'next/server';
import Router from '../lib/router';
import apiRoutes from './routes/api';

// Create main router that combines all routes
const router = new Router();

// Health check endpoint
router.get('/health', async (_req: NextRequest) => {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

// Merge API routes into main router
router.use(apiRoutes);

export default router;


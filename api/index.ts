import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import createApp from './server/index';

// Create Express app instance
const app = createApp();

// Wrap Express app with serverless-http for Vercel
const handler = serverless(app);

// Export serverless function handler
export default async function (req: VercelRequest, res: VercelResponse) {
  return handler(req, res);
}


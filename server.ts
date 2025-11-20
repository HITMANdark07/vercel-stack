import { createServer } from 'http';
import next from 'next';
import createApp from './api/server/index';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';

// Initialize Next.js app
const nextApp = next({ dev, hostname, port });
const nextHandler = nextApp.getRequestHandler();

// Create Express app
const expressApp = createApp();

nextApp.prepare().then(() => {
  // Handle all other routes with Next.js (catch-all middleware)
  // Use a middleware function instead of route pattern for Express 5 compatibility
  expressApp.use((req, res) => {
    // If Express already handled the request (response sent), don't do anything
    if (res.headersSent) {
      return;
    }
    // Pass all unmatched routes to Next.js
    return nextHandler(req, res);
  });

  // Create HTTP server
  const server = createServer(expressApp);

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Express API available at http://${hostname}:${port}/api`);
  });
});


import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

// Example GET endpoint
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Express API is working!',
    version: '1.0.0',
  });
});

// Example POST endpoint
router.post('/test', (req: Request, res: Response) => {
  res.json({
    message: 'POST request received',
    body: req.body,
  });
});

export default router;


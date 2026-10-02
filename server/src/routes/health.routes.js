import { Router } from 'express';
import { config } from '../config/env.js';
import { getDatabaseStatus } from '../config/database.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Rosenlilly API is running',
    environment: config.nodeEnv,
    database: {
      status: getDatabaseStatus(),
    },
  });
});

export default router;

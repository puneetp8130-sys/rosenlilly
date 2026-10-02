import authRoutes from './auth.routes.js';
import { Router } from 'express';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);

export default router;

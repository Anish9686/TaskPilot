import express from 'express';
import { generateAIDescription } from '../controllers/aiController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/generate-task-description',
  protect,
  authorize('admin'),
  generateAIDescription
);

export default router;

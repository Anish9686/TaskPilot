import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(authorize('admin'), createTask);

router
  .route('/:id')
  .put(updateTask)
  .delete(authorize('admin'), deleteTask);

export default router;

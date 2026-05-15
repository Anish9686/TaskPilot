import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getProjects)
  .post(authorize('admin'), createProject);

router
  .route('/:id')
  .put(authorize('admin'), updateProject)
  .delete(authorize('admin'), deleteProject);

export default router;

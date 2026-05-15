import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  registerMember,
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/users', protect, getUsers);
router.post('/invite', protect, authorize('admin'), registerMember);

export default router;

import { generateTaskDescription } from '../services/aiService.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Generate task description using AI
// @route   POST /api/ai/generate-task-description
// @access  Private/Admin
export const generateAIDescription = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please provide a task title');
  }

  const description = await generateTaskDescription(title);

  res.json({
    success: true,
    data: {
      description,
    },
  });
});

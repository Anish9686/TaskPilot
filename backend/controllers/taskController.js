import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all tasks (Admin: All, Member: Assigned Only)
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  let query;

  // Role-based filtering
  if (req.user.role === 'admin') {
    query = Task.find().populate('project', 'title').populate('assignedTo', 'name');
  } else {
    query = Task.find({ assignedTo: req.user._id }).populate('project', 'title');
  }

  const tasks = await query.sort('-createdAt');

  res.json({
    success: true,
    data: tasks,
  });
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, assignedTo, project } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    assignedTo: assignedTo || req.user._id,
    project,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Members can only update status
  if (req.user.role === 'member') {
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this task');
    }
    
    // Only allow status update for members
    const { status } = req.body;
    task = await Task.findByIdAndUpdate(req.params.id, { status }, {
      new: true,
      runValidators: true,
    });
  } else {
    // Admin can update everything
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  res.json({
    success: true,
    data: task,
  });
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.json({
    success: true,
    data: {},
  });
});

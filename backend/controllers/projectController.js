import Project from '../models/Project.js';
import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all projects (Admin: All, Member: Projects with assigned tasks)
// @route   GET /api/projects
// @access  Private
export const getProjects = asyncHandler(async (req, res) => {
  let projects;

  if (req.user.role === 'admin') {
    projects = await Project.find().sort('-createdAt');
  } else {
    // Find projects where the member has assigned tasks
    const assignedTasks = await Task.find({ assignedTo: req.user._id }).select('project');
    const projectIds = [...new Set(assignedTasks.map(t => t.project.toString()))];
    projects = await Project.find({ _id: { $in: projectIds } }).sort('-createdAt');
  }

  res.json({
    success: true,
    data: projects,
  });
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, deadline } = req.body;

  const project = await Project.create({
    title,
    description,
    deadline,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: project,
  });
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.json({
    success: true,
    data: project,
  });
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Delete associated tasks
  await Task.deleteMany({ project: req.params.id });
  await project.deleteOne();

  res.json({
    success: true,
    data: {},
  });
});

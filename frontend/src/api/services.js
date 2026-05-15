import axiosInstance from './axios';

export const taskService = {
  getAll: () => axiosInstance.get('/tasks'),
  getById: (id) => axiosInstance.get(`/tasks/${id}`),
  create: (data) => axiosInstance.post('/tasks', data),
  update: (id, data) => axiosInstance.put(`/tasks/${id}`, data),
  delete: (id) => axiosInstance.delete(`/tasks/${id}`),
  generateDescription: (title) => axiosInstance.post('/ai/generate-description', { title })
};

export const projectService = {
  getAll: () => axiosInstance.get('/projects'),
  getById: (id) => axiosInstance.get(`/projects/${id}`),
  create: (data) => axiosInstance.post('/projects', data),
  update: (id, data) => axiosInstance.put(`/projects/${id}`, data),
  delete: (id) => axiosInstance.delete(`/projects/${id}`)
};

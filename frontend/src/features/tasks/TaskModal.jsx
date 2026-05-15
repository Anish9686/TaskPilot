import React, { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { taskService } from '../../api/services';
import { Loader2, Sparkles, Calendar, Briefcase, Tag, AlertTriangle, Target } from 'lucide-react';
import toast from 'react-hot-toast';

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  task, 
  projects, 
  isAdmin, 
  loading 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    priority: 'medium',
    status: 'pending',
    dueDate: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        project: task.project?._id || task.project || '',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        project: projects[0]?._id || '',
        priority: 'medium',
        status: 'pending',
        dueDate: ''
      });
    }
  }, [task, projects, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.project) {
      toast.error('Please select a project for this task');
      return;
    }
    onSubmit(formData);
  };

  const handleGenerateAI = async () => {
    if (!formData.title) {
      toast.error('Please enter a task title first');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await taskService.generateDescription(formData.title);
      setFormData({ ...formData, description: response.data.data });
      toast.success('AI description generated!');
    } catch (error) {
      toast.error('AI generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Update Task' : 'Create New Task'}>
      <form onSubmit={handleSubmit} className="space-y-8 py-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Task Title</label>
            <div className="relative group">
               <input
                 type="text"
                 required
                 disabled={task && !isAdmin}
                 placeholder="e.g., Design System Audit"
                 className="block w-full px-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                 value={formData.title}
                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
               />
               {!isAdmin && task && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                     <ShieldAlert size={18} />
                  </div>
               )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
               <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
               {isAdmin && (
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={isGenerating || !formData.title}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-sage/10 text-sage rounded-full text-[10px] font-black hover:bg-sage/20 transition-all disabled:opacity-50 group/ai border border-sage/10"
                  >
                    {isGenerating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Sparkles size={12} className="group-hover/ai:animate-pulse" />
                    )}
                    <span>{isGenerating ? 'AI CRAFTING...' : 'REFINE WITH AI'}</span>
                  </button>
               )}
            </div>
            <textarea
              rows="4"
              disabled={task && !isAdmin}
              placeholder="Detail the requirements and expectations..."
              className={`block w-full px-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none resize-none disabled:bg-slate-100 disabled:cursor-not-allowed ${isGenerating ? 'animate-pulse opacity-50' : ''}`}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Project</label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <select
                  required
                  disabled={task && !isAdmin}
                  className="block w-full pl-12 pr-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none disabled:bg-slate-100 appearance-none"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                >
                  <option value="">Select a Project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Due Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="date"
                  required
                  disabled={task && !isAdmin}
                  className="block w-full pl-12 pr-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none disabled:bg-slate-100"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Priority</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <select
                  disabled={task && !isAdmin}
                  className="block w-full pl-12 pr-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none disabled:bg-slate-100 appearance-none"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Status</label>
              <div className="relative group">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <select
                  className="block w-full pl-12 pr-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none appearance-none"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-8 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={onClose} className="px-8 py-4 rounded-2xl border-slate-200">
            Cancel
          </Button>
          <Button variant="sage" type="submit" loading={loading} className="px-10 py-4 rounded-2xl shadow-xl shadow-sage/10">
            {task ? 'Update Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;

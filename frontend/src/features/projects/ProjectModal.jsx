import React, { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { FolderOpen, Calendar, AlignLeft } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, onSubmit, project = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description || '',
        deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({ title: '', description: '', deadline: '' });
    }
  }, [project, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={project ? 'Edit Project' : 'Initiate New Project'}
    >
      <form onSubmit={handleSubmit} className="space-y-8 py-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Project Title</label>
            <div className="relative group">
              <FolderOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
              <input 
                type="text" 
                required
                placeholder="e.g. Website Redesign"
                className="block w-full pl-12 pr-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
            <div className="relative group">
              <AlignLeft className="absolute left-4 top-4 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
              <textarea 
                rows="4"
                required
                placeholder="What is the scope of this workstream?"
                className="block w-full pl-12 pr-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Deadline</label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
              <input 
                type="date" 
                required
                className="block w-full pl-12 pr-4 py-4 bg-primary-50/50 border border-slate-200 rounded-[1.5rem] focus:bg-white focus:border-sage focus:ring-8 focus:ring-sage/5 transition-all duration-500 font-bold text-charcoal outline-none"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-8 border-t border-slate-100">
          <Button variant="secondary" type="button" onClick={onClose} className="px-8 py-4 rounded-2xl border-slate-200">
            Cancel
          </Button>
          <Button variant="sage" type="submit" loading={loading} className="px-10 py-4 rounded-2xl shadow-xl shadow-sage/10">
            {project ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectModal;

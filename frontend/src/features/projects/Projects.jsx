import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../../api/services';
import { useAuth } from '../auth/AuthContext';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  FolderOpen, 
  ArrowRight, 
  ShieldAlert, 
  Clock,
  Layout
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import ProjectModal from './ProjectModal';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';
import Badge from '../../components/ui/Badge';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAdmin } = useAuth();

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data.data);
    } catch (error) {
      toast.error('Sync failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete project and associated work?')) {
      try {
        await projectService.delete(id);
        toast.success('Archived');
        fetchProjects();
      } catch (error) {
        toast.error('Deletion restricted');
      }
    }
  };

  if (isLoading) return <Skeleton variant="dashboard" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
           <h1 className="text-2xl font-black text-charcoal tracking-tight">Active Workstreams</h1>
           <p className="text-slate-400 font-medium">Monitoring {projects.length} system-level initiatives.</p>
        </div>
        {isAdmin && (
          <Button variant="sage" onClick={() => setIsModalOpen(true)} className="text-xs px-4 py-2">
            <Plus size={16} className="mr-2" />
            New Initiative
          </Button>
        )}
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <div key={project._id} className="premium-card p-5 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                    <Layout size={20} />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingProject(project); setIsModalOpen(true); }} className="p-1.5 text-slate-300 hover:text-charcoal"><Edit2 size={14} /></button>
                    {isAdmin && (
                      <button onClick={() => handleDelete(project._id)} className="p-1.5 text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
                    )}
                  </div>
                </div>
                
                <h3 className="text-sm font-black text-charcoal mb-1 group-hover:text-sage transition-colors">{project.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{project.description || 'System orchestration active.'}</p>
                
              </div>
              
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center">
                  <Clock size={12} className="mr-1.5" />
                  <span>{formatDate(project.deadline)}</span>
                </div>
                <Link to={`/tasks?project=${project._id}`} className="text-sage hover:text-charcoal transition-colors">
                   View Backlog
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={FolderOpen}
          title="No Active Initiatives"
          description="Initialize a project to begin tracking milestones."
          actionLabel={isAdmin ? "Create Project" : null}
          onAction={isAdmin ? () => setIsModalOpen(true) : null}
        />
      )}

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProject(null); }}
        onSubmit={async (formData) => {
          setIsSubmitting(true);
          try {
            if (editingProject) await projectService.update(editingProject._id, formData);
            else await projectService.create(formData);
            fetchProjects();
            setIsModalOpen(false);
            setEditingProject(null);
          } catch (error) {
            toast.error('Action failed');
          } finally {
            setIsSubmitting(false);
          }
        }}
        project={editingProject}
        loading={isSubmitting}
      />
    </div>
  );
};

export default Projects;

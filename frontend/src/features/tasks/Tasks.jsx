import React, { useState, useEffect } from 'react';
import { taskService, projectService } from '../../api/services';
import { useAuth } from '../auth/AuthContext';
import { 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Edit2,
  Trash2,
  Calendar,
  ShieldAlert,
  CheckSquare,
  MoreVertical,
  Flag,
  User,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import TaskModal from './TaskModal';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { isAdmin } = useAuth();

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        taskService.getAll(),
        projectService.getAll()
      ]);
      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
    } catch (error) {
      toast.error('Sync failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.update(taskId, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchData();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Permanent deletion of work item?')) {
      try {
        await taskService.delete(id);
        toast.success('Removed');
        fetchData();
      } catch (error) {
        toast.error('Access restricted');
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) return <Skeleton variant="dashboard" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
           <h1 className="text-2xl font-black text-charcoal tracking-tight">Focus Queue</h1>
           <p className="text-slate-400 font-medium">Managing the production backlog and active sprints.</p>
        </div>
        {isAdmin && (
          <Button variant="sage" onClick={() => setIsModalOpen(true)} className="text-xs px-4 py-2">
            <Plus size={16} className="mr-2" />
            Add Work Item
          </Button>
        )}
      </div>

      {/* Utilities Bar */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search tasks..."
            className="pl-10 text-xs py-2 bg-slate-50 border-slate-100 focus:bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center bg-slate-100 p-1 rounded-lg gap-1">
          {['all', 'pending', 'in-progress', 'completed'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-md font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === s ? 'bg-white text-charcoal shadow-sm' : 'text-slate-500 hover:text-charcoal'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Production List View */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Task Detail</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, idx) => (
                  <tr key={task._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-black text-slate-300">#{1000 + idx}</span>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex flex-col max-w-md">
                          <span className="text-xs font-black text-charcoal group-hover:text-sage transition-colors cursor-pointer" onClick={() => { setEditingTask(task); setIsModalOpen(true); }}>
                             {task.title}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 line-clamp-1 mt-0.5">{task.description}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-center space-x-2">
                          <Flag size={12} className={task.priority === 'high' ? 'text-rose-500' : 'text-slate-300'} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${task.priority === 'high' ? 'text-rose-500' : 'text-slate-400'}`}>{task.priority}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate max-w-[120px] inline-block">
                          {task.project?.title || 'Standalone'}
                       </span>
                    </td>
                    <td className="px-4 py-4">
                       <select 
                         value={task.status}
                         onChange={(e) => handleStatusChange(task._id, e.target.value)}
                         className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border-none rounded p-1 cursor-pointer focus:ring-0 text-slate-500"
                       >
                         <option value="pending">Pending</option>
                         <option value="in-progress">Doing</option>
                         <option value="completed">Done</option>
                       </select>
                    </td>
                    <td className="px-4 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formatDate(task.dueDate)}</span>
                          <button onClick={() => handleDelete(task._id)} className="p-1.5 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                             <Trash2 size={14} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <EmptyState 
                      icon={CheckSquare}
                      title="No Work Items"
                      description="Queue is clear for this filter."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span>Showing {filteredTasks.length} results</span>
           <div className="flex gap-4">
              <button className="hover:text-charcoal disabled:opacity-20" disabled>Previous</button>
              <button className="hover:text-charcoal disabled:opacity-20" disabled>Next</button>
           </div>
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSubmit={async (formData) => {
          setIsSubmitting(true);
          try {
            if (editingTask) await taskService.update(editingTask._id, formData);
            else await taskService.create(formData);
            fetchData();
            setIsModalOpen(false);
            setEditingTask(null);
          } catch (error) {
            toast.error('Action failed');
          } finally {
            setIsSubmitting(false);
          }
        }}
        task={editingTask}
        loading={isSubmitting}
        projects={projects}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default Tasks;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { taskService, projectService } from '../../api/services';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  ArrowUpRight,
  Calendar,
  Shield,
  Layout
} from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/formatters';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ activeProjects: 0, totalTasks: 0, completionRate: 0, overdue: 0 });
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, projectsRes] = await Promise.all([
          taskService.getAll(),
          projectService.getAll()
        ]);
        const tasks = tasksRes.data.data;
        const projectList = projectsRes.data.data;
        
        setProjects(projectList.slice(0, 5));
        setStats({
          activeProjects: projectList.length,
          totalTasks: tasks.length,
          completionRate: Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) || 0,
          overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length
        });

        const upcoming = tasks
          .filter(t => t.status !== 'completed' && t.dueDate)
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 6);
        setUpcomingTasks(upcoming);

      } catch (error) {
        console.error('Fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Skeleton variant="dashboard" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
           <h1 className="text-2xl font-black text-charcoal tracking-tight">System Overview</h1>
           <p className="text-slate-400 font-medium font-mono text-[10px] uppercase tracking-widest">
             Session: {user?.name} | {new Date().toLocaleDateString()}
           </p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="secondary" className="text-xs px-4 py-2 border-slate-200">Export Logs</Button>
           <Link to="/tasks">
             <Button variant="sage" className="text-xs px-4 py-2">Initialize Task</Button>
           </Link>
        </div>
      </div>

      {/* High-Density Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Workstreams', value: stats.activeProjects, icon: Activity },
          { label: 'Pending Units', value: stats.totalTasks, icon: Clock },
          { label: 'Throughput Rate', value: `${stats.completionRate}%`, icon: TrendingUp },
          { label: 'Critical Overdue', value: stats.overdue, icon: AlertCircle, alert: stats.overdue > 0 },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-4 rounded-lg flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className={`p-1.5 rounded-md ${stat.alert ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-xl font-black text-charcoal">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Initiatives */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
             <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-[10px] font-black text-charcoal uppercase tracking-widest">Active Initiatives</h3>
                <Link to="/projects" className="text-[9px] font-black text-slate-400 hover:text-charcoal uppercase tracking-widest">View All</Link>
             </div>
             <div className="divide-y divide-slate-100">
                {projects.length > 0 ? projects.map((p) => (
                   <div key={p._id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                         <Layout size={16} />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-xs font-black text-charcoal">{p.title}</h4>
                         <p className="text-[10px] text-slate-400 truncate max-w-md">{p.description || 'No description provided.'}</p>
                      </div>
                      <Badge variant="stone">{formatDate(p.deadline)}</Badge>
                   </div>
                )) : (
                  <div className="px-6 py-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    No active initiatives detected
                  </div>
                )}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-charcoal text-white p-6 rounded-lg flex flex-col justify-between">
                <div>
                   <Shield size={24} className="mb-4 text-sage" />
                   <h3 className="text-sm font-black uppercase tracking-widest mb-2">Security Protocol</h3>
                   <p className="text-[10px] text-white/60 leading-relaxed font-bold">
                     RBAC standards enforced. All session interactions are logged and audited in the backend repository.
                   </p>
                </div>
                <div className="mt-6 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">System Secure</span>
                </div>
             </div>
             <div className="bg-slate-100 p-6 rounded-lg flex flex-col justify-between border border-slate-200">
                <div>
                   <Calendar size={24} className="mb-4 text-charcoal" />
                   <h3 className="text-sm font-black uppercase tracking-widest mb-2">Temporal Status</h3>
                   <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                     Current server time synchronized. All deadlines are calculated based on UTC+0.
                   </p>
                </div>
                <div className="mt-6">
                   <p className="text-[10px] font-black uppercase tracking-widest text-charcoal">
                     {new Date().toLocaleTimeString()}
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Tactical Backlog */}
        <div className="space-y-6">
           <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                 <h3 className="text-[10px] font-black text-charcoal uppercase tracking-widest">Tactical Backlog</h3>
              </div>
              <div className="p-4 space-y-3">
                 {upcomingTasks.length > 0 ? upcomingTasks.map((t) => (
                    <div key={t._id} className="p-3 bg-slate-50 rounded border border-slate-200 group hover:border-charcoal transition-all">
                       <div className="flex justify-between items-start mb-1">
                          <Badge variant={t.priority === 'high' ? 'rose' : 'stone'} className="text-[8px] px-1.5 py-0">
                            {t.priority}
                          </Badge>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{formatDate(t.dueDate)}</span>
                       </div>
                       <p className="text-xs font-bold text-charcoal group-hover:text-charcoal transition-colors truncate">{t.title}</p>
                    </div>
                 )) : (
                   <div className="py-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest border border-dashed border-slate-200 rounded">
                     Backlog Cleared
                   </div>
                 )}
                 <Link to="/tasks" className="block text-center mt-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-charcoal transition-colors">
                      Open Operational Backlog
                    </span>
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

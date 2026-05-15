import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { taskService, projectService } from '../../api/services';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  Calendar, 
  BarChart3,
  PieChart as PieIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const COLORS = ['#7A8F7B', '#111827', '#D8D2C8', '#6B705C'];

  const velocityData = [
    { name: 'Week 1', completed: 12, pending: 8 },
    { name: 'Week 2', completed: 18, pending: 5 },
    { name: 'Week 3', completed: 15, pending: 12 },
    { name: 'Week 4', completed: 22, pending: 4 },
  ];

  const distributionData = [
    { name: 'Design', value: 35 },
    { name: 'Development', value: 45 },
    { name: 'Marketing', value: 20 },
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <Skeleton variant="dashboard" />;

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-charcoal tracking-tighter">Workspace Analytics</h1>
          <p className="text-slate-400 font-bold">In-depth insights into team performance and project velocity.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
           <Calendar size={16} className="text-slate-400" />
           <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Last 30 Days</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Avg. Completion Time', value: '2.4 Days', change: '+12%', up: false, icon: Zap },
          { label: 'Task Velocity', value: '84%', change: '+5.2%', up: true, icon: TrendingUp },
          { label: 'Active Contributors', value: '18', change: '+2', up: true, icon: Users },
          { label: 'Project Health', value: 'Excellent', change: 'Stable', up: true, icon: Target },
        ].map((kpi, i) => (
          <div key={i} className="premium-card p-8 group">
            <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-sage group-hover:scale-110 transition-transform duration-500">
                  <kpi.icon size={22} />
               </div>
               <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-black ${kpi.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  <span>{kpi.change}</span>
               </div>
            </div>
            <p className="text-slate-400 font-bold text-sm mb-1">{kpi.label}</p>
            <h3 className="text-3xl font-black text-charcoal tracking-tight">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 premium-card p-10 atmospheric-glow">
          <div className="flex items-center justify-between mb-10">
             <div>
                <h3 className="text-2xl font-black text-charcoal tracking-tight mb-1">Production Velocity</h3>
                <p className="text-sm font-bold text-slate-400">Total tasks processed per week.</p>
             </div>
             <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                   <div className="w-3 h-3 rounded-full bg-sage"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                   <div className="w-3 h-3 rounded-full bg-stone"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending</span>
                </div>
             </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={velocityData}>
                <defs>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7A8F7B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7A8F7B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE4DA" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A19A91', fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A19A91', fontSize: 12, fontWeight: 700 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #EAE4DA', backdropFilter: 'blur(8px)' }} />
                <Area type="monotone" dataKey="completed" stroke="#7A8F7B" strokeWidth={4} fillOpacity={1} fill="url(#colorComp)" />
                <Area type="monotone" dataKey="pending" stroke="#D8D2C8" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="premium-card p-10">
          <h3 className="text-2xl font-black text-charcoal tracking-tight mb-1">Resource Split</h3>
          <p className="text-sm font-bold text-slate-400 mb-10">Departmental task distribution.</p>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <PieChart>
                <Pie 
                  data={distributionData} 
                  cx="50%" cy="50%" 
                  innerRadius={70} outerRadius={90} 
                  paddingAngle={8} 
                  dataKey="value"
                  animationDuration={1500}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <PieIcon size={24} className="text-slate-200 mb-1" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diversity</span>
            </div>
          </div>
          <div className="mt-10 space-y-4">
             {distributionData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-primary-50/50 border border-slate-200/50">
                   <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      <span className="text-sm font-bold text-slate-600">{item.name}</span>
                   </div>
                   <span className="text-sm font-black text-charcoal">{item.value}%</span>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  MoreHorizontal, 
  Search, 
  Circle,
  Briefcase,
  ExternalLink,
  MessageSquare,
  Target,
  Edit2,
  Trash2,
  UserCheck,
  Lock,
  User
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import Modal from '../../components/ui/Modal';
import axiosInstance from '../../api/axios';
import { useAuth } from '../auth/AuthContext';
import toast from 'react-hot-toast';

const TeamHub = () => {
  const { isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member'
  });

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/auth/users');
      setTeam(response.data.data);
    } catch (error) {
      toast.error('Failed to load team directory');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    setIsInviting(true);
    try {
      await axiosInstance.post('/api/auth/invite', formData);
      toast.success('Member added successfully!');
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'member' });
      fetchTeam();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add member');
    } finally {
      setIsInviting(false);
    }
  };

  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(search.toLowerCase()) || 
    member.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading && team.length === 0) return <Skeleton variant="dashboard" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
           <h1 className="text-2xl font-black text-charcoal tracking-tight">Team Directory</h1>
           <p className="text-slate-400 font-medium">Orchestrate workspace permissions and resource allocation.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="secondary" className="text-xs px-4 py-2 border-slate-200">Export CSV</Button>
           {isAdmin && (
             <Button variant="sage" className="text-xs px-4 py-2" onClick={() => setIsModalOpen(true)}>
                <UserPlus size={14} className="mr-2" />
                Invite Member
             </Button>
           )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative group w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search members, roles..."
            className="pl-10 text-xs py-2 bg-white border-slate-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
           <Circle size={6} className="fill-emerald-500 text-emerald-500" />
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{team.length} Total Members</span>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tasks</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Workload</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTeam.map((member) => (
                <tr key={member._id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-charcoal flex items-center justify-center text-white text-[10px] font-black">
                           {member.name[0]}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-charcoal">{member.name}</span>
                           <span className="text-[10px] font-bold text-slate-400">{member.email}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-4 py-4">
                     <div className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          member.status === 'online' ? 'bg-emerald-500' : member.status === 'away' ? 'bg-amber-400' : 'bg-slate-300'
                        }`}></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{member.status || 'offline'}</span>
                     </div>
                  </td>
                  <td className="px-4 py-4">
                     <Badge variant={member.role === 'admin' ? 'blue' : 'stone'}>{member.role}</Badge>
                  </td>
                  <td className="px-4 py-4 text-xs font-black text-charcoal">{member.tasks || 0}</td>
                  <td className="px-4 py-4">
                     <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1 bg-slate-100 rounded-full w-20 overflow-hidden">
                           <div className="h-full bg-sage transition-all duration-1000" style={{ width: `${((member.tasks || 0) / 25) * 100}%` }}></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400">{member.projects || 0} PRJ</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-300 hover:text-sage hover:bg-sage/10 rounded-lg transition-all" title="Message">
                           <MessageSquare size={14} />
                        </button>
                        {isAdmin && (
                          <>
                            <button className="p-2 text-slate-300 hover:text-charcoal hover:bg-slate-100 rounded-lg transition-all" title="Edit Permissions">
                               <Edit2 size={14} />
                            </button>
                            <button className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Remove Member">
                               <Trash2 size={14} />
                            </button>
                          </>
                        )}
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Invite New Member"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
              <input 
                type="text" 
                required
                placeholder="Enter member name"
                className="pl-12"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                className="pl-12"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporary Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
              <input 
                type="password" 
                required
                placeholder="Create a temporary password"
                className="pl-12"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Role</label>
            <div className="flex p-1 bg-slate-50 border border-slate-200 rounded-xl">
              {['admin', 'member'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({...formData, role: r})}
                  className={`flex-1 py-2 px-4 rounded-lg font-black text-[10px] transition-all uppercase tracking-widest ${
                    formData.role === r 
                      ? 'bg-charcoal text-white shadow-sm' 
                      : 'text-slate-400 hover:text-charcoal'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="sage" 
              className="flex-1"
              loading={isInviting}
            >
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeamHub;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { 
  Rocket, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Shield
} from 'lucide-react';
import Button from '../../components/ui/Button';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password, formData.role);
      toast.success('Workspace initialized');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] font-sans selection:bg-charcoal/10">
      <div className="max-w-[400px] w-full p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-charcoal rounded-xl flex items-center justify-center text-white mb-4">
            <Rocket size={24} />
          </div>
          <h1 className="text-2xl font-black text-charcoal tracking-tighter uppercase">TaskPilot</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">System Enrollment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-charcoal transition-colors" size={16} />
              <input 
                type="text" 
                required
                placeholder="John Doe"
                className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-charcoal focus:ring-4 focus:ring-charcoal/5 transition-all font-bold text-sm text-charcoal placeholder:text-slate-300 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-charcoal transition-colors" size={16} />
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-charcoal focus:ring-4 focus:ring-charcoal/5 transition-all font-bold text-sm text-charcoal placeholder:text-slate-300 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-charcoal transition-colors" size={16} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-charcoal focus:ring-4 focus:ring-charcoal/5 transition-all font-bold text-sm text-charcoal placeholder:text-slate-300 outline-none"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Role</label>
            <div className="flex p-1 bg-slate-50 border border-slate-200 rounded-lg">
              {['admin', 'member'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({...formData, role: r})}
                  className={`flex-1 py-2 px-4 rounded-md font-black text-[10px] transition-all uppercase tracking-widest ${
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

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full py-3 text-xs font-black bg-charcoal hover:bg-slate-800 text-white rounded-lg transition-all" 
              loading={isLoading}
            >
              Initialize Workspace
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 font-bold text-xs">
            Already registered? <Link to="/login" className="text-charcoal font-black hover:underline">Sign in here</Link>
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 grayscale opacity-50">
           <Shield size={12} className="text-slate-400" />
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enterprise RBAC Protocol</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

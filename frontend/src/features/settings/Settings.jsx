import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Camera,
  Save,
  Trash2,
  Lock
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    notifications: true,
    darkMode: false,
    language: 'English'
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Settings updated successfully!');
    setIsSaving(false);
  };

  const allTabs = [
    { id: 'profile', name: 'Profile', icon: User, roles: ['admin', 'member'] },
    { id: 'workspace', name: 'Workspace', icon: Globe, roles: ['admin'] },
    { id: 'security', name: 'Security', icon: Shield, roles: ['admin'] },
  ];

  const tabs = allTabs.filter(tab => tab.roles.includes(user?.role));

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-charcoal tracking-tighter mb-2">Settings</h1>
        <p className="text-slate-400 font-bold">Manage your account preferences and workspace configuration.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300
                ${activeTab === tab.id 
                  ? 'bg-white text-sage shadow-sm border border-slate-200' 
                  : 'text-slate-400 hover:bg-white/50 hover:text-slate-600'}
              `}
            >
              <tab.icon size={18} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <form onSubmit={handleSave} className="premium-card p-8 md:p-10">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-[2rem] bg-stone flex items-center justify-center text-white text-2xl font-black shadow-xl">
                      {formData.name[0]}
                    </div>
                    <button type="button" className="absolute -bottom-2 -right-2 w-10 h-10 bg-charcoal text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera size={18} />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-black text-charcoal">Public Profile</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">This will be displayed on your profile and tasks.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workspace' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-6 bg-primary-50/50 rounded-2xl border border-slate-200/50">
                      <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sage shadow-sm">
                            <Bell size={20} />
                         </div>
                         <div>
                            <p className="text-sm font-black text-charcoal">Desktop Notifications</p>
                            <p className="text-xs font-bold text-slate-400">Receive alerts for overdue tasks</p>
                         </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, notifications: !formData.notifications})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.notifications ? 'bg-sage' : 'bg-slate-200'}`}
                      >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.notifications ? 'right-1' : 'left-1'}`}></div>
                      </button>
                   </div>

                   <div className="flex items-center justify-between p-6 bg-primary-50/50 rounded-2xl border border-slate-200/50">
                      <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm">
                            <Moon size={20} />
                         </div>
                         <div>
                            <p className="text-sm font-black text-charcoal">Dark Mode</p>
                            <p className="text-xs font-bold text-slate-400">Switch to a darker interface</p>
                         </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, darkMode: !formData.darkMode})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.darkMode ? 'bg-sage' : 'bg-slate-200'}`}
                      >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.darkMode ? 'right-1' : 'left-1'}`}></div>
                      </button>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Current Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-12"
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-12"
                        />
                      </div>
                   </div>
                </div>
                <div className="pt-8 border-t border-slate-100">
                   <h4 className="text-sm font-black text-rose-600 mb-2 uppercase tracking-widest">Danger Zone</h4>
                   <p className="text-xs font-bold text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                   <Button variant="danger" type="button" className="px-6 py-3 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 border-none shadow-none">
                      <Trash2 size={18} className="mr-2" />
                      Delete Workspace
                   </Button>
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-end">
              <Button 
                type="submit" 
                variant="sage"
                className="px-8 py-4 rounded-2xl shadow-xl shadow-sage/10"
                loading={isSaving}
              >
                <Save size={18} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;

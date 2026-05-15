import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Globe,
  Command,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastSynced, setLastSynced] = useState('Just now');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: isAdmin ? 'Overview' : 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: isAdmin ? 'Projects' : 'My Projects', path: '/projects', icon: Briefcase },
    { label: isAdmin ? 'All Tasks' : 'My Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Team Hub', path: '/team', icon: Users },
  ];

  if (isAdmin) {
    navItems.push({ label: 'Analytics', path: '/analytics', icon: BarChart3 });
  }

  const bottomNavItems = [
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Help', path: '/help', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFB] flex text-charcoal selection:bg-sage/20 selection:text-sage">
      {/* Desktop Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-charcoal text-white transition-all duration-500 ease-in-out border-r border-white/5 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden lg:flex flex-col shadow-2xl`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/5 overflow-hidden">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-8 h-8 bg-sage rounded-xl flex items-center justify-center shadow-lg shadow-sage/20">
              <Command size={18} className="text-white" />
            </div>
            {isSidebarOpen && <span className="font-black text-lg tracking-tighter uppercase">TaskPilot</span>}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-sage' : 'text-slate-500 group-hover:text-slate-300'} />
                {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                {!isSidebarOpen && isActive && (
                   <div className="absolute left-0 w-1 h-6 bg-sage rounded-r-full"></div>
                )}
              </Link>
            );
          })}
          
          <div className="pt-6 pb-2">
            <div className={`h-px bg-white/5 mx-3 mb-4 ${!isSidebarOpen && 'hidden'}`}></div>
            {isSidebarOpen && (
               <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Support</p>
            )}
            {bottomNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-sage' : 'text-slate-500 group-hover:text-slate-300'} />
                  {isSidebarOpen && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className={`flex items-center space-x-3 px-3 py-3 rounded-xl w-full text-rose-400 hover:bg-rose-400/10 transition-all duration-300 ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold">Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-sage text-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#FDFDFB] hover:scale-110 transition-transform hidden lg:flex"
        >
          {isSidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-500 min-w-0 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center space-x-6 flex-1">
            <button 
              className="lg:hidden p-2 text-charcoal hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex items-center space-x-2 bg-slate-100/50 px-4 py-2 rounded-xl border border-slate-100 group max-w-sm w-full">
               <Search size={16} className="text-slate-400 group-focus-within:text-sage transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search terminal..." 
                 className="bg-transparent border-none text-sm font-bold text-charcoal focus:ring-0 w-full placeholder:text-slate-400"
               />
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
               <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Globe size={12} className="text-emerald-500 animate-pulse" />
                  <span>Synced: {lastSynced}</span>
               </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <button className="p-2.5 text-slate-400 hover:text-charcoal hover:bg-slate-100 rounded-xl relative transition-all">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-sage rounded-full border-2 border-white"></span>
             </button>
             
             <div className="h-8 w-px bg-slate-100 mx-2"></div>
             
             <div className="flex items-center space-x-3 pl-2">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-black text-charcoal leading-none mb-1">{user?.name}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     {isAdmin ? 'System Admin' : 'Workspace Member'}
                   </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-charcoal flex items-center justify-center text-white text-sm font-black shadow-lg shadow-charcoal/10 ring-2 ring-white ring-offset-2 ring-offset-slate-100">
                   {user?.name?.[0]}
                </div>
             </div>
          </div>
        </header>

        {/* Page Container */}
        <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-72 bg-charcoal text-white flex flex-col p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-10">
               <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-sage rounded-xl flex items-center justify-center">
                    <Command size={18} className="text-white" />
                  </div>
                  <span className="font-black text-lg tracking-tighter uppercase">TaskPilot</span>
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/60 hover:text-white">
                  <X size={24} />
               </button>
            </div>
            
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    location.pathname === item.path ? 'bg-white/10 text-sage' : 'text-white/60'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

import React from 'react';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  FileText, 
  Shield, 
  CreditCard, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const HelpCenter = () => {
  const categories = [
    { id: 1, title: 'Getting Started', icon: BookOpen, count: 12 },
    { id: 2, title: 'Project Management', icon: FileText, count: 8 },
    { id: 3, title: 'Security & Auth', icon: Shield, count: 5 },
    { id: 4, title: 'Billing & Plans', icon: CreditCard, count: 3 },
  ];

  const faqs = [
    { q: 'How do I promote a member to admin?', a: 'Admins can change user roles in the Team Hub by selecting the user and choosing "Promote" from the actions menu.' },
    { q: 'Can I export my project data?', a: 'Yes, you can export your dashboard data as a CSV from the Overview page.' },
    { q: 'Is there a limit to projects?', a: 'TaskPilot Solo allows up to 5 concurrent projects. Enterprise plans offer unlimited initiatives.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search Header - Utility Focused */}
      <div className="premium-card p-8 bg-charcoal text-white rounded-xl">
         <div className="max-w-2xl">
            <h1 className="text-2xl font-black tracking-tight mb-2">Support Center</h1>
            <p className="text-white/60 text-sm mb-6">Search our documentation for operational workflows and system guides.</p>
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-sage transition-colors" size={20} />
               <input 
                 type="text" 
                 placeholder="Search docs (e.g. 'RBAC permissions')..." 
                 className="w-full bg-white/5 border-white/10 text-white rounded-xl py-3 pl-12 focus:bg-white/10 transition-all placeholder:text-white/20"
               />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List */}
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                 <div key={cat.id} className="premium-card p-5 group cursor-pointer hover:border-sage/40 transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 bg-slate-50 rounded-lg text-slate-400 group-hover:text-sage transition-colors">
                          <cat.icon size={20} />
                       </div>
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{cat.count} Articles</span>
                    </div>
                    <h3 className="text-sm font-black text-charcoal mb-1 group-hover:text-sage transition-colors">{cat.title}</h3>
                    <p className="text-xs text-slate-400">Essential guides and operational best practices.</p>
                 </div>
              ))}
           </div>

           <div className="premium-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
                 <h3 className="text-xs font-black text-charcoal uppercase tracking-widest">Common Questions</h3>
              </div>
              <div className="divide-y divide-slate-100">
                 {faqs.map((faq, i) => (
                    <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors">
                       <h4 className="text-xs font-black text-charcoal mb-2">{faq.q}</h4>
                       <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar Help */}
        <div className="space-y-6">
           <div className="premium-card p-6">
              <h3 className="text-xs font-black text-charcoal uppercase tracking-widest mb-4">Need Direct Help?</h3>
              <div className="space-y-2">
                 <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-sage/20 transition-all group">
                    <div className="flex items-center space-x-3">
                       <MessageCircle size={16} className="text-slate-400 group-hover:text-sage transition-colors" />
                       <span className="text-xs font-bold text-charcoal">Live Chat Support</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                 </button>
                 <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-sage/20 transition-all group">
                    <div className="flex items-center space-x-3">
                       <HelpCircle size={16} className="text-slate-400 group-hover:text-sage transition-colors" />
                       <span className="text-xs font-bold text-charcoal">Submit Ticket</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                 </button>
              </div>
           </div>

           <div className="premium-card p-6 border-dashed border-2 border-slate-100 bg-slate-50/30">
              <div className="flex items-center space-x-2 text-sage mb-2">
                 <ExternalLink size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">External Resources</span>
              </div>
              <ul className="space-y-2">
                 <li className="text-xs font-bold text-slate-500 hover:text-charcoal cursor-pointer transition-colors underline decoration-slate-200">Developer API Docs</li>
                 <li className="text-xs font-bold text-slate-500 hover:text-charcoal cursor-pointer transition-colors underline decoration-slate-200">Community Forum</li>
                 <li className="text-xs font-bold text-slate-500 hover:text-charcoal cursor-pointer transition-colors underline decoration-slate-200">System Status Page</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

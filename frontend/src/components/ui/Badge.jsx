import React from 'react';

const Badge = ({ children, variant = 'stone', className = '' }) => {
  const variants = {
    blue: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    green: 'bg-sage/10 text-sage border-sage/10',
    yellow: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-rose-50 text-rose-600 border-rose-100',
    stone: 'bg-slate-100 text-slate-500 border-slate-200',
    charcoal: 'bg-charcoal text-white border-charcoal',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${variants[variant] || variants.stone} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

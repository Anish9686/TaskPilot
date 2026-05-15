import React from 'react';
import Button from './Button';
import { Sparkles } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 md:p-24 bg-white/40 border-2 border-dashed border-slate-200 rounded-[3rem] text-center animate-in fade-in zoom-in-95 duration-700">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-sage/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-sage shadow-[0_20px_50px_rgba(122,143,123,0.15)] border border-sage/10 transform -rotate-6">
          {Icon && <Icon size={40} />}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-charcoal text-white rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
           <Sparkles size={16} />
        </div>
      </div>

      <h3 className="text-3xl font-black text-charcoal mb-3 tracking-tighter">{title}</h3>
      <p className="text-slate-400 font-bold max-w-sm mx-auto mb-10 leading-relaxed text-lg">
        {description}
      </p>

      {actionLabel && (
        <Button 
          onClick={onAction} 
          variant="sage"
          className="px-8 py-4 rounded-2xl shadow-xl shadow-sage/10"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

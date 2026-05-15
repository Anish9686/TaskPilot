import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = "relative overflow-hidden bg-slate-100 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
  
  const variants = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4 w-full',
  };

  if (variant === 'dashboard') {
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div className="space-y-3">
             <Skeleton className="w-48 h-4" />
             <Skeleton className="w-80 h-10" />
          </div>
          <div className="flex space-x-3">
             <Skeleton className="w-32 h-12" />
             <Skeleton className="w-32 h-12" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Skeleton className="lg:col-span-2 h-[400px]" />
           <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variants[variant] || variants.rect} ${className}`}></div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
    <div className="flex justify-between items-start">
      <Skeleton className="w-12 h-12" />
      <div className="flex space-x-2">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
      </div>
    </div>
    <Skeleton variant="text" className="w-3/4 h-6" />
    <Skeleton variant="text" className="w-full h-12" />
    <div className="pt-4 border-t border-slate-50 space-y-2">
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" className="w-1/3" />
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="border-b border-slate-100">
    <td className="px-6 py-4"><Skeleton className="h-6 w-32" /></td>
    <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
    <td className="px-6 py-4"><Skeleton className="h-6 w-16" /></td>
    <td className="px-6 py-4"><Skeleton className="h-6 w-20" /></td>
    <td className="px-6 py-4"><Skeleton className="h-6 w-28" /></td>
    <td className="px-6 py-4 text-right"><Skeleton className="h-6 w-12 ml-auto" /></td>
  </tr>
);

export default Skeleton;

import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  icon: Icon,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-charcoal text-white hover:bg-slate-800 shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-200 shadow-md shadow-rose-100',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    sage: 'bg-sage text-white hover:bg-olive shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="mr-2 animate-spin">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      ) : Icon ? (
        <Icon className="mr-2" size={18} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;

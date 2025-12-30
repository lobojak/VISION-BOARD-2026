import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel rounded-2xl p-4 md:p-6 transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white/10 active:scale-95' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const GlassButton: React.FC<GlassButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyle = "glass-button px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-sm md:text-base";
  
  let variantStyle = "";
  if (variant === 'primary') {
    variantStyle = "bg-white/10 hover:bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]";
  } else if (variant === 'secondary') {
    variantStyle = "bg-black/20 hover:bg-black/30 text-gray-200 border-white/5";
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

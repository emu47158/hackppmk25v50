import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl ${className} ${onClick ? 'cursor-pointer hover:bg-white/15 transition-all duration-300' : ''}`}
      onClick={onClick}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {children}
    </div>
  );
};

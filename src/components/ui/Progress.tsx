import React from 'react';

interface ProgressProps {
  value: number;
  max: number;
  colorClass?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max, 
  colorClass = 'bg-primary', 
  className = '',
  size = 'md'
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

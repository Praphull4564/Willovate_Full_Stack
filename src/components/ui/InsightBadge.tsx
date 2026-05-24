import React from 'react';
import { TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface InsightBadgeProps {
  type: 'positive' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const InsightBadge: React.FC<InsightBadgeProps> = ({ type, children, className }) => {
  const styles = {
    positive: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
    warning: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
    info: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  };

  const icons = {
    positive: <TrendingUp size={14} className="mr-1.5 shrink-0" />,
    warning: <AlertTriangle size={14} className="mr-1.5 shrink-0" />,
    info: <Info size={14} className="mr-1.5 shrink-0" />,
  };

  return (
    <div className={clsx(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border",
      styles[type],
      className
    )}>
      {icons[type]}
      {children}
    </div>
  );
};

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
  isLoading?: boolean;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  className,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className={twMerge("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 h-36 animate-pulse", className)}>
        <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded mb-4"></div>
        <div className="h-8 w-32 bg-slate-100 dark:bg-slate-800 rounded mb-4"></div>
        <div className="h-4 w-40 bg-slate-100 dark:bg-slate-800 rounded"></div>
      </div>
    );
  }

  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className={twMerge(
      "group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-700/50",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 dark:bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
      
      <div className="relative flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-indigo-500 dark:text-indigo-400">
          {icon}
        </div>
      </div>

      <div className="relative flex flex-col gap-1">
        <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>
        
        {trend !== undefined && (
          <div className="flex items-center text-xs mt-1">
            <span className={clsx(
              "flex items-center font-semibold",
              isPositive ? "text-emerald-600 dark:text-emerald-400" :
              isNegative ? "text-rose-600 dark:text-rose-400" :
              "text-slate-500 dark:text-slate-400"
            )}>
              {isPositive ? <TrendingUp size={14} className="mr-1" /> :
               isNegative ? <TrendingDown size={14} className="mr-1" /> :
               <Minus size={14} className="mr-1" />}
              {Math.abs(trend)}%
            </span>
            {trendLabel && (
              <span className="text-slate-500 dark:text-slate-400 ml-2">{trendLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import { twMerge } from 'tailwind-merge';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  action,
  className,
  isLoading
}) => {
  return (
    <div className={twMerge(
      "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col min-w-0 overflow-hidden",
      className
    )}>
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      
      <div className="flex-1 w-full min-h-0 relative">
        {isLoading ? (
          <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-800/50 animate-pulse rounded-xl"></div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './Loader';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <div className="relative">
          <select
            className={cn(
              'flex h-11 w-full appearance-none rounded-xl border bg-white/50 dark:bg-slate-900/50 px-3 py-2 text-sm',
              'ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2',
              'transition-colors duration-200 backdrop-blur-sm',
              error 
                ? 'border-red-500 focus-visible:ring-red-500/50' 
                : 'border-slate-200 dark:border-slate-700 focus-visible:border-primary focus-visible:ring-primary/50',
              className
            )}
            ref={ref}
            {...props}
          >
            <option value="" disabled>Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <ChevronDown size={18} />
          </div>
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

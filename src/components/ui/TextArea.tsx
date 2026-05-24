import React from 'react';
import { cn } from './Loader';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-xl border bg-white/50 dark:bg-slate-900/50 px-3 py-2 text-sm',
            'ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2',
            'transition-colors duration-200 backdrop-blur-sm resize-y',
            error 
              ? 'border-red-500 focus-visible:ring-red-500/50' 
              : 'border-slate-200 dark:border-slate-700 focus-visible:border-primary focus-visible:ring-primary/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

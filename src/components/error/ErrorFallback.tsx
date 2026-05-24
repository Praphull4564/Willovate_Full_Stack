import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center animate-in fade-in zoom-in-95 duration-300">
      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-slate-900 shadow-sm">
        <AlertTriangle className="text-rose-500 w-10 h-10" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
        We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
      </p>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 w-full max-w-md text-left overflow-hidden mb-8 shadow-sm">
        <p className="text-xs font-mono text-rose-500 dark:text-rose-400 break-words">
          {error.message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Button 
          variant="primary" 
          onClick={resetErrorBoundary}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white border-0"
        >
          <RefreshCcw size={18} className="mr-2" />
          Try Again
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
          className="flex-1"
        >
          <Home size={18} className="mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  );
};

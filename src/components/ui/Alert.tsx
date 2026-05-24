import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, message, className = '' }) => {
  const styles = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/20',
      text: 'text-emerald-800 dark:text-emerald-200',
      icon: <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={20} />,
      titleColor: 'text-emerald-800 dark:text-emerald-300',
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      border: 'border-rose-200 dark:border-rose-500/20',
      text: 'text-rose-800 dark:text-rose-200',
      icon: <AlertCircle className="text-rose-500 mt-0.5 shrink-0" size={20} />,
      titleColor: 'text-rose-800 dark:text-rose-300',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      border: 'border-amber-200 dark:border-amber-500/20',
      text: 'text-amber-800 dark:text-amber-200',
      icon: <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={20} />,
      titleColor: 'text-amber-800 dark:text-amber-300',
    },
    info: {
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
      border: 'border-indigo-200 dark:border-indigo-500/20',
      text: 'text-indigo-800 dark:text-indigo-200',
      icon: <Info className="text-indigo-500 mt-0.5 shrink-0" size={20} />,
      titleColor: 'text-indigo-800 dark:text-indigo-300',
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`flex items-start p-4 rounded-xl border ${currentStyle.bg} ${currentStyle.border} ${className}`}>
      {currentStyle.icon}
      <div className="ml-3 flex-1">
        {title && <h4 className={`text-sm font-bold mb-1 ${currentStyle.titleColor}`}>{title}</h4>}
        <p className={`text-sm leading-relaxed ${currentStyle.text}`}>{message}</p>
      </div>
    </div>
  );
};

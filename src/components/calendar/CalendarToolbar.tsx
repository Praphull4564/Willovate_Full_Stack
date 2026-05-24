import React from 'react';

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export const CalendarToolbar: React.FC<any> = (props) => {
  const { label, view, onNavigate, onView } = props;

  const navigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    onNavigate(action);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
          <button
            onClick={() => navigate('PREV')}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => navigate('TODAY')}
            className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => navigate('NEXT')}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <CalendarIcon size={20} className="mr-2 text-primary" />
          {label}
        </h2>
      </div>

      <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
        {['month', 'week', 'day'].map((v) => (
          <button
            key={v}
            onClick={() => onView(v as any)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
              view === v
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};

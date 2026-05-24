import React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={twMerge("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 overflow-hidden flex flex-col h-full animate-pulse", className)}>
    <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4"></div>
    <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded mb-6"></div>
    <div className="mt-auto flex justify-between items-center">
      <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
      <div className="h-10 w-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
    </div>
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="border-b border-slate-100 dark:border-slate-800 animate-pulse">
    <td className="py-4 px-4"><div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div></td>
    <td className="py-4 px-4"><div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div></td>
    <td className="py-4 px-4"><div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded-full"></div></td>
    <td className="py-4 px-4"><div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div></td>
    <td className="py-4 px-4"><div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded ml-auto"></div></td>
  </tr>
);

export const DashboardStatsSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 h-36 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div>
          <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
        </div>
        <div className="h-8 w-32 bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
      </div>
    ))}
  </div>
);

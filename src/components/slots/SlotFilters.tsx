import React from 'react';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';

interface SlotFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  dateFilter: string;
  setDateFilter: (val: string) => void;
}

export const SlotFilters: React.FC<SlotFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search slots by offer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
        />
      </div>
      
      <div className="w-full md:w-48 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
          <CalendarIcon size={18} />
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
        />
      </div>

      <div className="w-full md:w-48 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
          <Filter size={18} />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full h-11 pl-10 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm appearance-none"
        >
          <option value="All">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Full">Full</option>
          <option value="Closed">Closed</option>
          <option value="Expired">Expired</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

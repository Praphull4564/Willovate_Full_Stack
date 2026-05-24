import React, { useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { AdminBookingStatus, BookingFilters as FilterType } from '../../types/bookingAdmin.types';

interface BookingFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setSearchTerm(filters.searchTerm || '');
  }, [filters.searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchTerm });
  };

  const handleClear = () => {
    setSearchTerm('');
    onFilterChange({
      searchTerm: undefined,
      status: 'All',
      dateFrom: undefined,
      dateTo: undefined,
      sortBy: 'date_desc'
    });
  };

  const statuses: (AdminBookingStatus | 'All')[] = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'No Show'];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer, reference ID, or phone..."
              className="w-full pl-10 pr-4 h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white"
            />
          </div>
          <Button type="submit" variant="primary" className="h-11 px-6">
            Search
          </Button>
        </form>
        
        {/* Toggles */}
        <div className="flex items-center gap-2">
          <Button 
            variant={showAdvanced ? "primary" : "outline"}
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="h-11"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
          
          {(filters.searchTerm || filters.status !== 'All' || filters.dateFrom) && (
            <Button variant="ghost" onClick={handleClear} className="h-11 text-slate-500">
              <X size={18} className="mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Status</label>
            <select
              value={filters.status || 'All'}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value as AdminBookingStatus | 'All' })}
              className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">From Date</label>
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
              className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Sort By</label>
            <select
              value={filters.sortBy || 'date_desc'}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
              className="w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="amount_desc">Highest Amount</option>
              <option value="amount_asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

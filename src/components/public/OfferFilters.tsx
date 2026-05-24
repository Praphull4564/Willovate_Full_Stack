import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';
import type { SearchFilters } from '../../types/publicOffer.types';

interface OfferFiltersProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onClose?: () => void;
}

export const OfferFilters: React.FC<OfferFiltersProps> = ({ filters, setFilters, onClose }) => {
  const handleCategoryChange = (category: string) => {
    setFilters({ ...filters, category });
  };

  const handleSortChange = (sortBy: any) => {
    setFilters({ ...filters, sortBy });
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: filters.searchTerm, // Preserve search term
      category: 'All',
    });
    if (onClose) onClose();
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white flex items-center">
            <Filter size={18} className="mr-2 text-indigo-500" />
            Filters
          </h3>
          <button 
            onClick={clearFilters}
            className="text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Clear all
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Categories</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={!filters.category || filters.category === 'All'}
                onChange={() => handleCategoryChange('All')}
                className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                All Categories
              </span>
            </label>
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.name}
                  onChange={() => handleCategoryChange(cat.name)}
                  className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Price Range</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Min (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full h-10 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Max (₹)</label>
              <input
                type="number"
                placeholder="Any"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full h-10 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Sort By</h4>
          <select
            value={filters.sortBy || ''}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full h-10 pl-3 pr-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
          >
            <option value="">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="discount_desc">Highest Discount</option>
            <option value="ending_soon">Ending Soon</option>
          </select>
        </div>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors md:hidden"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};

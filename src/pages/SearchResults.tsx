import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Filter as FilterIcon, SearchX } from 'lucide-react';
import { usePublicOffers } from '../hooks/usePublicOffers';
import { filterOffers } from '../utils/filters';
import { SearchBar } from '../components/public/SearchBar';
import { OfferGrid } from '../components/public/OfferGrid';
import { OfferFilters } from '../components/public/OfferFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { Drawer } from '../components/ui/Drawer';
import type { SearchFilters } from '../types/publicOffer.types';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const { offers, isLoading } = usePublicOffers();
  
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: query,
    category: 'All',
  });
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL query with local state
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchTerm: query }));
  }, [query]);

  const filteredOffers = useMemo(() => {
    if (!offers) return [];
    return filterOffers(offers, filters);
  }, [offers, filters]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sticky Header with Search */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex-1 max-w-3xl">
              <SearchBar 
                initialValue={query} 
                onSearch={handleSearch} 
                className="w-full"
              />
            </div>
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <FilterIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-40">
              <OfferFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Main Results Area */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {query ? `Results for "${query}"` : 'All Offers'}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Found {filteredOffers.length} {filteredOffers.length === 1 ? 'offer' : 'offers'}
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
                <span>Sort by:</span>
                <select 
                  className="bg-transparent border-none text-indigo-600 dark:text-indigo-400 font-semibold focus:ring-0 cursor-pointer outline-none"
                  value={filters.sortBy || ''}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                >
                  <option value="">Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="discount_desc">Highest Discount</option>
                </select>
              </div>
            </div>

            {filteredOffers.length > 0 || isLoading ? (
              <OfferGrid offers={filteredOffers} isLoading={isLoading} />
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl py-16 mt-4">
                <EmptyState
                  icon={SearchX}
                  title="No results found"
                  description={`We couldn't find any offers matching "${query}". Try checking your spelling or using more general terms.`}
                  actionLabel="Clear Search"
                  onAction={() => handleSearch('')}
                />
                
                {/* Search Suggestions */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-500 mb-4">Popular searches:</p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                    {['Spa', 'Gym', 'Buffet', 'Haircut', 'Yoga'].map(term => (
                      <button 
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 rounded-full text-sm font-medium transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Options"
        position="right"
      >
        <OfferFilters 
          filters={filters} 
          setFilters={setFilters} 
          onClose={() => setIsMobileFilterOpen(false)} 
        />
      </Drawer>
    </div>
  );
};

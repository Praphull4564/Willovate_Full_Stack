import React, { useState, useMemo } from 'react';
import { HeroSection } from '../components/public/HeroSection';
import { FeaturedOffers } from '../components/public/FeaturedOffers';
import { OfferGrid } from '../components/public/OfferGrid';
import { OfferFilters } from '../components/public/OfferFilters';
import { usePublicOffers } from '../hooks/usePublicOffers';
import { filterOffers } from '../utils/filters';
import type { SearchFilters } from '../types/publicOffer.types';
import { EmptyState } from '../components/ui/EmptyState';
import { Drawer } from '../components/ui/Drawer';
import { SearchX, Filter as FilterIcon } from 'lucide-react';

export const PublicOffers: React.FC = () => {
  const { offers, isLoading } = usePublicOffers();
  const [filters, setFilters] = useState<SearchFilters>({ category: 'All' });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredOffers = useMemo(() => {
    if (!offers) return [];
    return filterOffers(offers, filters);
  }, [offers, filters]);

  // Take top 4 by discount for featured
  const featuredOffers = useMemo(() => {
    if (!offers) return [];
    return [...offers].sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 4);
  }, [offers]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <HeroSection />
      
      {!filters.searchTerm && (!filters.category || filters.category === 'All') && (
        <div className="bg-slate-100/50 dark:bg-slate-900/50">
          <FeaturedOffers offers={featuredOffers} isLoading={isLoading} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <OfferFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Mobile Filter Button & Active Results Header */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {filters.searchTerm ? `Search results for "${filters.searchTerm}"` : 
                 filters.category && filters.category !== 'All' ? `${filters.category} Offers` : 
                 'All Active Offers'}
                <span className="text-sm font-medium text-slate-500 ml-3 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {filteredOffers.length}
                </span>
              </h2>

              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                <FilterIcon size={16} className="text-indigo-500" />
                <span>Filters</span>
              </button>
            </div>

            {/* Main Grid */}
            {filteredOffers.length > 0 || isLoading ? (
              <OfferGrid offers={filteredOffers} isLoading={isLoading} />
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl py-12 mt-4">
                <EmptyState
                  icon={SearchX}
                  title="No offers found"
                  description="We couldn't find any offers matching your current filters. Try adjusting your search criteria."
                  actionLabel="Clear Filters"
                  onAction={() => setFilters({ category: 'All' })}
                />
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

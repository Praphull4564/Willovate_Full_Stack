import React from 'react';
import type { PublicOffer } from '../../types/publicOffer.types';
import { OfferCard } from './OfferCard';
import { Skeleton } from '../ui/Skeleton';

interface OfferGridProps {
  offers: PublicOffer[];
  isLoading?: boolean;
}

export const OfferGrid: React.FC<OfferGridProps> = ({ offers, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden h-[400px] flex flex-col">
            <Skeleton className="h-48 sm:h-56 w-full rounded-none" />
            <div className="p-5 flex-1 flex flex-col">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="mt-auto flex justify-between items-end">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

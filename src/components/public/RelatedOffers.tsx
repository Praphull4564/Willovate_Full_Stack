import React from 'react';
import type { PublicOffer } from '../../types/publicOffer.types';
import { OfferGrid } from './OfferGrid';

interface RelatedOffersProps {
  offers: PublicOffer[];
  isLoading?: boolean;
}

export const RelatedOffers: React.FC<RelatedOffersProps> = ({ offers, isLoading }) => {
  if (!isLoading && offers.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Similar Offers You Might Like</h2>
        <OfferGrid offers={offers.slice(0, 4)} isLoading={isLoading} />
      </div>
    </section>
  );
};

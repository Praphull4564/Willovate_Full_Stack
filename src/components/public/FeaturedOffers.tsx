import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PublicOffer } from '../../types/publicOffer.types';
import { OfferGrid } from './OfferGrid';

interface FeaturedOffersProps {
  offers: PublicOffer[];
  isLoading?: boolean;
}

export const FeaturedOffers: React.FC<FeaturedOffersProps> = ({ offers, isLoading }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Featured Offers</h2>
            <p className="text-slate-500 dark:text-slate-400">Handpicked deals you won't want to miss.</p>
          </div>
          <Link 
            to="/search" 
            className="hidden sm:flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
          >
            View all offers 
            <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <OfferGrid offers={offers} isLoading={isLoading} />
        
        <div className="mt-8 text-center sm:hidden">
          <Link 
            to="/search" 
            className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
          >
            View all offers 
            <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

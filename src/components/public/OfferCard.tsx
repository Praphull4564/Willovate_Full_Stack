import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Star } from 'lucide-react';
import type { PublicOffer } from '../../types/publicOffer.types';
import { CountdownTimer } from './CountdownTimer';
import { CATEGORIES } from '../../constants/categories';
import { fallbackOfferImage } from '../../data/demoData';

interface OfferCardProps {
  offer: PublicOffer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const category = CATEGORIES.find((c) => c.name === offer.category || c.id === offer.category?.toLowerCase());
  const categoryColor = category?.color || 'from-indigo-500 to-violet-500';

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={offer.imageUrl}
          alt={offer.title}
          onError={(event) => {
            const target = event.currentTarget;
            if (target.src !== fallbackOfferImage) {
              target.src = fallbackOfferImage;
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColor} shadow-lg`}>
            {offer.category}
          </div>
          <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors">
            <Heart size={18} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl">
            <CountdownTimer endDate={offer.endDate} compact />
          </div>
          {offer.rating && (
            <div className="flex items-center space-x-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">{offer.rating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              {offer.businessName}
            </p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight line-clamp-2">
              {offer.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
          {offer.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-xs text-slate-400 line-through mb-0.5">
                {'\u20B9'}{offer.originalPrice.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {'\u20B9'}{offer.offerPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {offer.discountPercentage}% OFF
                </span>
              </div>
            </div>

            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <Users size={14} className="mr-1" />
              {offer.totalAvailableSlots} slots left
            </div>
          </div>

          <Link
            to={`/offer/${offer.id}`}
            className="block w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-center rounded-xl text-sm font-semibold transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Share2, Heart, MapPin, Star, Building2 } from 'lucide-react';
import type { PublicOffer } from '../../types/publicOffer.types';
import { CATEGORIES } from '../../constants/categories';

interface OfferDetailHeaderProps {
  offer: PublicOffer;
}

export const OfferDetailHeader: React.FC<OfferDetailHeaderProps> = ({ offer }) => {
  const category = CATEGORIES.find(c => c.name === offer.category || c.id === offer.category?.toLowerCase());
  const categoryColor = category?.color || 'from-indigo-500 to-violet-500';

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Main Image */}
          <div className="w-full md:w-1/2 lg:w-3/5">
            <div className="relative aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group">
              <img 
                src={offer.imageUrl} 
                alt={offer.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${categoryColor} shadow-lg`}>
                  {offer.category}
                </span>
              </div>
            </div>
            
            {/* Small Thumbnails (Placeholder for future gallery) */}
            <div className="grid grid-cols-4 gap-4 mt-4 hidden sm:grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity ring-2 ring-transparent hover:ring-indigo-500">
                  <img src={offer.imageUrl} alt="" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Header Content */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-4">
              <Building2 size={18} />
              <span className="font-medium">{offer.businessName}</span>
              {offer.rating && (
                <>
                  <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-2" />
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-900 dark:text-white">{offer.rating}</span>
                    <span className="text-sm">({offer.reviewCount} reviews)</span>
                  </div>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              {offer.title}
            </h1>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
                <MapPin size={18} className="text-indigo-500" />
                <span className="text-sm font-medium">Downtown, Metropolis</span>
              </div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {offer.description}
            </p>

            <div className="flex items-center space-x-4">
              <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex-1 sm:flex-none">
                <Heart size={20} />
                <span>Save Offer</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex-1 sm:flex-none">
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Tag, CalendarDays, Clock, Users } from 'lucide-react';
import type { OfferFormData } from '../../schemas/offer.schema';

interface OfferPreviewProps {
  data: Partial<OfferFormData>;
}

export const OfferPreview: React.FC<OfferPreviewProps> = ({ data }) => {
  const {
    title,
    description,
    category,
    originalPrice,
    offerPrice,
    startDate,
    endDate,
    startTime,
    endTime,
    totalCapacity,
  } = data;

  const discount = originalPrice && offerPrice && originalPrice > offerPrice
    ? Math.round(((originalPrice - offerPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      {/* Header / Banner */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              {category || 'Category'}
            </span>
            <h3 className="text-2xl font-bold leading-tight mb-2">
              {title || 'Offer Title'}
            </h3>
            <p className="text-indigo-100 text-sm max-w-sm line-clamp-2">
              {description || 'Offer description will appear here...'}
            </p>
          </div>
          {discount > 0 && (
            <div className="shrink-0 bg-white text-indigo-600 font-bold text-xl px-3 py-2 rounded-2xl shadow-lg transform rotate-3">
              {discount}% OFF
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Price</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                ₹{offerPrice || 0}
              </span>
              {originalPrice && originalPrice > (offerPrice || 0) && (
                <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Tag size={24} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-1">
              <CalendarDays size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Dates</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {startDate || 'TBD'} <span className="text-slate-400 font-normal mx-1">to</span> {endDate || 'TBD'}
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-1">
              <Clock size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">Timings</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {startTime || '00:00'} <span className="text-slate-400 font-normal mx-1">-</span> {endTime || '00:00'}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-2">
            <Users size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">Capacity</span>
          </div>
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
            <span className="text-sm text-slate-600 dark:text-slate-300">Total Slots</span>
            <span className="font-bold text-slate-900 dark:text-white">{totalCapacity || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

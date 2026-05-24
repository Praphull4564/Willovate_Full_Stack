import React from 'react';
import type { PublicOffer, PublicSlot } from '../../types/publicOffer.types';
import { PriceBreakdown } from './PriceBreakdown';
import { MapPin, Calendar, Clock, Building2 } from 'lucide-react';
import { formatDateSafe } from '../../utils/dateFormat';

interface BookingSummaryProps {
  offer: PublicOffer;
  selectedSlot?: PublicSlot;
  peopleCount: number;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ offer, selectedSlot, peopleCount }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none sticky top-24">
      {/* Header Image */}
      <div className="relative h-40">
        <img 
          src={offer.imageUrl} 
          alt={offer.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-200 mb-1">
            <Building2 size={14} />
            <span>{offer.businessName}</span>
          </div>
          <h3 className="text-lg font-bold leading-tight line-clamp-2">{offer.title}</h3>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Selected Slot Details */}
        {selectedSlot ? (
          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
              <Calendar size={18} className="text-indigo-500" />
              <span className="font-medium">{formatDateSafe(selectedSlot.date, 'EEEE, MMMM do, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
              <Clock size={18} className="text-indigo-500" />
              <span className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
              <MapPin size={18} className="text-indigo-500" />
              <span className="font-medium">Downtown, Metropolis</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 border-dashed text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">Select a slot to view schedule details</p>
          </div>
        )}

        <hr className="border-slate-100 dark:border-slate-800" />

        {/* Pricing */}
        <PriceBreakdown offer={offer} peopleCount={peopleCount} />

        {/* Terms */}
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
          By proceeding, you agree to our Terms of Service and Cancellation Policy.
        </div>
      </div>
    </div>
  );
};

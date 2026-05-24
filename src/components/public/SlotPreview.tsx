import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import type { PublicSlot } from '../../types/publicOffer.types';
import { format, parseISO } from 'date-fns';

interface SlotPreviewProps {
  slots: PublicSlot[];
  isLoading?: boolean;
}

export const SlotPreview: React.FC<SlotPreviewProps> = ({ slots, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-xl mr-4" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center p-8 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl">
        <p className="text-slate-500 dark:text-slate-400">No slots available for this offer currently.</p>
      </div>
    );
  }

  // Group by date (simplified for preview, just taking first few)
  const previewSlots = slots.slice(0, 5);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Available Slots</h3>
      
      <div className="space-y-3">
        {previewSlots.map((slot) => {
          const dateObj = parseISO(slot.date);
          const isFull = slot.status === 'Full';
          const isFastFilling = slot.status === 'Fast Filling';

          return (
            <div 
              key={slot.id} 
              className={`flex items-center p-4 rounded-2xl border transition-all ${
                isFull 
                  ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 opacity-70 cursor-not-allowed' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500 hover:shadow-md cursor-pointer group'
              }`}
            >
              <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center mr-5 shrink-0 ${
                isFull ? 'bg-slate-200 dark:bg-slate-800 text-slate-500' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
              }`}>
                <span className="text-xs font-semibold uppercase">{format(dateObj, 'MMM')}</span>
                <span className="text-xl font-bold leading-none mt-0.5">{format(dateObj, 'dd')}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-semibold mb-1">
                  <Clock size={16} className={isFull ? 'text-slate-400' : 'text-indigo-500'} />
                  <span>{slot.startTime} - {slot.endTime}</span>
                </div>
                <div className="flex items-center text-sm">
                  {isFull ? (
                    <span className="text-rose-500 font-medium">Fully Booked</span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">
                      {slot.availableCount} slots remaining
                    </span>
                  )}
                  
                  {isFastFilling && !isFull && (
                    <span className="ml-3 px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 rounded text-xs font-semibold">
                      Fast Filling
                    </span>
                  )}
                </div>
              </div>

              {!isFull && (
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <ChevronRight size={18} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {slots.length > 5 && (
        <button className="w-full py-3 mt-4 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline">
          View all {slots.length} available slots
        </button>
      )}
    </div>
  );
};

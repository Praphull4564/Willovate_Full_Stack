import React from 'react';
import { Clock, Users } from 'lucide-react';
import type { PublicSlot } from '../../types/publicOffer.types';
import { format, parseISO } from 'date-fns';

interface SlotCardProps {
  slot: PublicSlot;
  isSelected: boolean;
  onSelect: (slot: PublicSlot) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, isSelected, onSelect }) => {
  const isFull = slot.status === 'Full';
  const isFastFilling = slot.status === 'Fast Filling';
  const dateObj = parseISO(slot.date);

  return (
    <button
      onClick={() => !isFull && onSelect(slot)}
      disabled={isFull}
      className={`relative w-full p-4 rounded-2xl text-left border-2 transition-all duration-200 focus:outline-none ${
        isFull
          ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 opacity-60 cursor-not-allowed'
          : isSelected
          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-md shadow-indigo-100 dark:shadow-none transform scale-[1.02]'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm cursor-pointer'
      }`}
    >
      {/* Fast Filling Badge */}
      {isFastFilling && !isFull && !isSelected && (
        <div className="absolute -top-3 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm animate-pulse">
          Hot
        </div>
      )}

      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute -top-3 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
          Selected
        </div>
      )}

      <div className="flex items-center space-x-4">
        {/* Date Icon */}
        <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 ${
          isFull ? 'bg-slate-200 dark:bg-slate-700 text-slate-500' : 
          isSelected ? 'bg-indigo-600 text-white' : 
          'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">{format(dateObj, 'MMM')}</span>
          <span className="text-xl font-black leading-none">{format(dateObj, 'dd')}</span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className={`flex items-center space-x-1.5 font-bold mb-1 ${
            isFull ? 'text-slate-500' : 'text-slate-900 dark:text-white'
          }`}>
            <Clock size={14} className={isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
            <span className="truncate">{slot.startTime} - {slot.endTime}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={`flex items-center space-x-1 ${
              isFull ? 'text-rose-500' : 
              isFastFilling ? 'text-orange-500' : 
              'text-emerald-500'
            }`}>
              {isFull ? (
                'Fully Booked'
              ) : (
                <>
                  <Users size={12} />
                  <span>{slot.availableCount} left</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

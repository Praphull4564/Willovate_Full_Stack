import React from 'react';
import { Users } from 'lucide-react';
import type { PublicSlot } from '../../types/publicOffer.types';

interface CapacityIndicatorProps {
  slot: PublicSlot;
  requestedCount?: number;
  maxCapacity?: number; // Ideally slot should have totalCapacity, we'll estimate or just show remaining
}

export const CapacityIndicator: React.FC<CapacityIndicatorProps> = ({ 
  slot, 
  requestedCount = 0,
  maxCapacity = 20 // Mock default if not provided
}) => {
  const isFull = slot.status === 'Full';
  const isFastFilling = slot.status === 'Fast Filling';
  
  // Calculate visual capacity (how full it is)
  const bookedCount = Math.max(0, maxCapacity - slot.availableCount);
  
  const willExceed = requestedCount > slot.availableCount;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-end mb-3">
        <div className="flex items-center space-x-2">
          <Users size={16} className={willExceed || isFull ? 'text-rose-500' : 'text-slate-500'} />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Slot Capacity</span>
        </div>
        <div className="text-sm text-slate-500">
          <span className={willExceed ? 'text-rose-500 font-bold' : 'text-slate-900 dark:text-white font-bold'}>
            {slot.availableCount}
          </span>
          {' '}seats left
        </div>
      </div>
      
      {/* Base progress + proposed booking highlight */}
      <div className="relative h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        {/* Already Booked */}
        <div 
          className="absolute top-0 left-0 h-full bg-slate-300 dark:bg-slate-600 transition-all"
          style={{ width: `${(bookedCount / maxCapacity) * 100}%` }}
        />
        {/* Currently Requested */}
        {requestedCount > 0 && !willExceed && (
          <div 
            className="absolute top-0 h-full bg-indigo-500 transition-all"
            style={{ 
              left: `${(bookedCount / maxCapacity) * 100}%`,
              width: `${(requestedCount / maxCapacity) * 100}%` 
            }}
          />
        )}
        {/* Will Exceed (Red) */}
        {willExceed && (
          <div 
            className="absolute top-0 h-full bg-rose-500 transition-all"
            style={{ 
              left: `${(bookedCount / maxCapacity) * 100}%`,
              width: `${(requestedCount / maxCapacity) * 100}%` 
            }}
          />
        )}
      </div>

      <div className="mt-3 flex justify-between items-center text-xs">
        {isFull ? (
          <span className="text-rose-500 font-medium">No seats available</span>
        ) : isFastFilling ? (
          <span className="text-orange-500 font-medium flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse" />
            Filling up fast!
          </span>
        ) : (
          <span className="text-emerald-500 font-medium flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            Available
          </span>
        )}
        
        {willExceed && (
          <span className="text-rose-500 font-medium text-[10px]">
            Exceeds capacity by {requestedCount - slot.availableCount}
          </span>
        )}
      </div>
    </div>
  );
};

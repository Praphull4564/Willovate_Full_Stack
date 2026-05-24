import React from 'react';
import { CalendarDays, Clock, Users, Edit, Trash2 } from 'lucide-react';
import type { Slot } from '../../types/slot.types';
import type { Offer } from '../../types/offer.types';
import { SlotStatusBadge } from './SlotStatusBadge';

interface SlotCardProps {
  slot: Slot;
  offer?: Offer;
  onEditClick: (slot: Slot) => void;
  onDeleteClick: (id: string) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, offer, onEditClick, onDeleteClick }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="p-6 relative flex-1">
        <div className="flex justify-between items-start mb-4">
          <SlotStatusBadge status={slot.status} />
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEditClick(slot)}
              className="p-1.5 text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
              title="Edit Slot"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onDeleteClick(slot.id)}
              className="p-1.5 text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
              title="Delete Slot"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
          {offer?.title || 'Unknown Offer'}
        </h3>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
            <CalendarDays size={16} className="text-indigo-500" />
            <span className="font-medium">{slot.slotDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
            <Clock size={16} className="text-indigo-500" />
            <span>{slot.startTime} - {slot.endTime}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
            <Users size={16} className="text-slate-400" />
            <span>Capacity</span>
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {slot.bookedCount} / {slot.capacity}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              slot.bookedCount >= slot.capacity ? 'bg-rose-500' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(100, (slot.bookedCount / slot.capacity) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 text-right">
          {slot.availableCount} available
        </p>
      </div>
    </div>
  );
};

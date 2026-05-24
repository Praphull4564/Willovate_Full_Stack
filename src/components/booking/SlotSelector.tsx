import React, { useMemo } from 'react';
import { SlotCard } from './SlotCard';
import type { PublicSlot } from '../../types/publicOffer.types';
import { format, parseISO } from 'date-fns';

interface SlotSelectorProps {
  slots: PublicSlot[];
  selectedSlotId?: string;
  onSelect: (slot: PublicSlot) => void;
  error?: string;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({ slots, selectedSlotId, onSelect, error }) => {
  // Group slots by date for better UX
  const groupedSlots = useMemo(() => {
    const groups: Record<string, PublicSlot[]> = {};
    slots.forEach(slot => {
      const dateKey = slot.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(slot);
    });
    
    // Sort dates
    return Object.keys(groups).sort().map(date => ({
      date,
      formattedDate: format(parseISO(date), 'EEEE, MMMM do, yyyy'),
      slots: groups[date].sort((a, b) => a.startTime.localeCompare(b.startTime))
    }));
  }, [slots]);

  if (slots.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center">
        <p className="text-slate-500 dark:text-slate-400">No slots available for this offer.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groupedSlots.map((group) => (
        <div key={group.date}>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pl-1">
            {group.formattedDate}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.slots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                isSelected={selectedSlotId === slot.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
      
      {error && (
        <p className="text-sm text-rose-500 font-medium mt-2">{error}</p>
      )}
    </div>
  );
};

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import type { Slot } from '../../types/slot.types';
import type { Offer } from '../../types/offer.types';
import { SlotStatusBadge } from './SlotStatusBadge';

interface SlotTableProps {
  slots: Slot[];
  offersById: Record<string, Offer>;
  onEditClick: (slot: Slot) => void;
  onDeleteClick: (id: string) => void;
}

export const SlotTable: React.FC<SlotTableProps> = ({ slots, offersById, onEditClick, onDeleteClick }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Offer / Date</TableHead>
            <TableHead>Timings</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((slot) => {
            const offer = offersById[slot.offerId];
            const progressPercentage = Math.min(100, (slot.bookedCount / slot.capacity) * 100);

            return (
              <TableRow key={slot.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                      {offer?.title || 'Unknown Offer'}
                    </span>
                    <span className="text-xs text-slate-500">{slot.slotDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1 w-32">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">{slot.bookedCount} / {slot.capacity}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{slot.availableCount} left</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          progressPercentage >= 100 ? 'bg-rose-500' : 'bg-primary'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <SlotStatusBadge status={slot.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => onEditClick(slot)}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                      title="Edit Slot"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => onDeleteClick(slot.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                      title="Delete Slot"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

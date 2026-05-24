import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import type { AdminBooking, AdminBookingStatus } from '../../types/bookingAdmin.types';
import { useUpdateBookingStatus } from '../../hooks/useBookings';
import { Button } from '../ui/Button';

interface StatusUpdateModalProps {
  booking: AdminBooking;
  targetStatus: AdminBookingStatus;
  onClose: () => void;
}

export const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({ booking, targetStatus, onClose }) => {
  const { mutate, isPending, error } = useUpdateBookingStatus();
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    mutate(
      { id: booking.id, status: targetStatus, reason },
      {
        onSuccess: () => onClose()
      }
    );
  };

  const getWarningMessage = () => {
    if (targetStatus === 'Cancelled') {
      return "Cancelling this booking will open up capacity for the slot. This action cannot be reversed to 'Pending' or 'Confirmed'.";
    }
    if (targetStatus === 'Completed') {
      return "Marking this as completed finalizes the booking lifecycle.";
    }
    return null;
  };

  const isDestructive = targetStatus === 'Cancelled' || targetStatus === 'No Show';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Update Status</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-slate-600 dark:text-slate-300">
            You are about to change the status for <span className="font-bold text-slate-900 dark:text-white">{booking.customerName}</span> from <span className="font-semibold">{booking.status}</span> to <span className="font-bold text-indigo-600 dark:text-indigo-400">{targetStatus}</span>.
          </p>

          {getWarningMessage() && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex items-start space-x-3 text-amber-800 dark:text-amber-300 text-sm">
              <AlertTriangle className="shrink-0 mt-0.5" size={16} />
              <p>{getWarningMessage()}</p>
            </div>
          )}

          {targetStatus === 'Cancelled' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Cancellation Reason (Optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Why is this booking being cancelled?"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:text-white resize-none h-24"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-rose-500 font-medium">Failed to update status. Please try again.</p>
          )}
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isPending}>
            Cancel
          </Button>
          <Button 
            className={`flex-1 ${isDestructive ? 'bg-rose-500 hover:bg-rose-600 text-white' : ''}`}
            onClick={handleConfirm}
            isLoading={isPending}
            disabled={isPending}
          >
            Confirm Update
          </Button>
        </div>
      </div>
    </div>
  );
};

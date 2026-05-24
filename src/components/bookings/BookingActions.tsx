import React, { useState } from 'react';
import type { AdminBooking } from '../../types/bookingAdmin.types';
import { MoreHorizontal, Eye, CheckCircle2, XCircle, CheckSquare, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAvailableTransitions } from '../../utils/bookingStatusHelpers';
import { StatusUpdateModal } from './StatusUpdateModal';

interface BookingActionsProps {
  booking: AdminBooking;
}

export const BookingActions: React.FC<BookingActionsProps> = ({ booking }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState<any>(null);

  const availableTransitions = getAvailableTransitions(booking.status);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    action();
  };

  const getActionIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'Cancelled': return <XCircle size={16} className="text-rose-500" />;
      case 'Completed': return <CheckSquare size={16} className="text-indigo-500" />;
      case 'No Show': return <UserX size={16} className="text-slate-500" />;
      default: return null;
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
        >
          <MoreHorizontal size={20} />
        </button>

        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-20 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <button
                onClick={(e) => handleAction(e, () => navigate(`/bookings/${booking.id}`)) }
                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center transition-colors"
              >
                <Eye size={16} className="mr-2 text-slate-400" />
                View Details
              </button>
              
              {availableTransitions.length > 0 && (
                <>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Update Status
                  </div>
                  {availableTransitions.map(targetStatus => (
                    <button
                      key={targetStatus}
                      onClick={(e) => handleAction(e, () => setStatusToUpdate(targetStatus))}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center transition-colors"
                    >
                      <span className="mr-2">{getActionIcon(targetStatus)}</span>
                      Mark as {targetStatus}
                    </button>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {statusToUpdate && (
        <StatusUpdateModal
          booking={booking}
          targetStatus={statusToUpdate}
          onClose={() => setStatusToUpdate(null)}
        />
      )}
    </>
  );
};

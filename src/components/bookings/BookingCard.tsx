import React from 'react';
import type { AdminBooking } from '../../types/bookingAdmin.types';
import { BookingStatusBadge } from './BookingStatusBadge';
import { BookingActions } from './BookingActions';
import { Users, Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDateSafe } from '../../utils/dateFormat';

interface BookingCardProps {
  booking: AdminBooking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/bookings/${booking.id}`)}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <BookingStatusBadge status={booking.status} size="sm" />
        <div onClick={e => e.stopPropagation()}>
          <BookingActions booking={booking} />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{booking.customerName}</h3>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 line-clamp-1">{booking.offerTitle || 'Offer'}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-1.5">
          <Calendar size={14} className="text-indigo-500" />
          <span>{formatDateSafe(booking.slotDate, 'MMM d')} - {booking.slotStartTime || 'TBA'}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Users size={14} className="text-indigo-500" />
          <span>{booking.peopleCount} Guests</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Phone size={14} className="text-indigo-500" />
          <span>{booking.customerPhone}</span>
        </div>
        <div className="font-bold text-slate-900 dark:text-white">
          Rs {booking.totalPrice.toLocaleString()}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[10px] text-slate-400 font-mono">ID: {booking.referenceId}</span>
        <span className="text-[10px] text-slate-400">Booked {formatDateSafe(booking.createdAt, 'MMM d')}</span>
      </div>
    </div>
  );
};

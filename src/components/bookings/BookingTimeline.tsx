import React from 'react';
import type { AdminBooking } from '../../types/bookingAdmin.types';
import { Clock, CheckCircle2, XCircle, CheckSquare, UserX } from 'lucide-react';
import { formatDateSafe } from '../../utils/dateFormat';

interface BookingTimelineProps {
  booking: AdminBooking;
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({ booking }) => {
  // In a real app, this would come from a backend audit log
  // Here we reconstruct a timeline based on the current status
  const events = [
    {
      status: 'Pending',
      date: booking.createdAt,
      description: 'Booking created by customer',
      icon: <Clock size={16} className="text-amber-500" />,
      color: 'bg-amber-500'
    }
  ];

  if (booking.status === 'Confirmed') {
    events.push({
      status: 'Confirmed',
      date: booking.updatedAt,
      description: 'Booking confirmed by admin',
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
      color: 'bg-emerald-500'
    });
  }

  if (booking.status === 'Cancelled') {
    events.push({
      status: 'Cancelled',
      date: booking.updatedAt,
      description: 'Booking was cancelled',
      icon: <XCircle size={16} className="text-rose-500" />,
      color: 'bg-rose-500'
    });
  }

  if (booking.status === 'Completed') {
    events.push({
      status: 'Confirmed',
      date: booking.createdAt, // mock intermediate date
      description: 'Booking confirmed',
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
      color: 'bg-emerald-500'
    });
    events.push({
      status: 'Completed',
      date: booking.updatedAt,
      description: 'Customer attended and booking finalized',
      icon: <CheckSquare size={16} className="text-indigo-500" />,
      color: 'bg-indigo-500'
    });
  }

  if (booking.status === 'No Show') {
    events.push({
      status: 'Confirmed',
      date: booking.createdAt, // mock intermediate date
      description: 'Booking confirmed',
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
      color: 'bg-emerald-500'
    });
    events.push({
      status: 'No Show',
      date: booking.updatedAt,
      description: 'Customer failed to arrive',
      icon: <UserX size={16} className="text-slate-500" />,
      color: 'bg-slate-500'
    });
  }

  return (
    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
      {events.map((event, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Icon */}
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-50 dark:bg-slate-800 text-slate-500 group-[.is-active]:text-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
            {event.icon}
          </div>
          
          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-slate-900 dark:text-white">{event.status}</h4>
              <time className="text-xs text-slate-500 font-mono">{formatDateSafe(event.date, 'MMM d, HH:mm')}</time>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

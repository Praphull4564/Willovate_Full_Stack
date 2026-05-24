import React, { useMemo } from 'react';
import type { AdminBooking } from '../../types/bookingAdmin.types';
import { CalendarCheck, DollarSign, XCircle, Activity } from 'lucide-react';

interface BookingAnalyticsProps {
  bookings: AdminBooking[];
  isLoading?: boolean;
}

export const BookingAnalytics: React.FC<BookingAnalyticsProps> = ({ bookings, isLoading }) => {
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
    const noShows = bookings.filter(b => b.status === 'No Show').length;
    
    // Revenue only from Confirmed or Completed
    const revenue = bookings
      .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((sum, b) => sum + b.totalPrice, 0);
      
    const conversion = total > 0 ? ((confirmed + completed) / total) * 100 : 0;

    return { total, confirmed, completed, cancelled, noShows, revenue, conversion };
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <DollarSign size={20} className="text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/20'
    },
    {
      title: 'Active Bookings',
      value: stats.confirmed.toString(),
      icon: <CalendarCheck size={20} className="text-indigo-600 dark:text-indigo-400" />,
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
      border: 'border-indigo-200 dark:border-indigo-500/20'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversion.toFixed(1)}%`,
      icon: <Activity size={20} className="text-blue-600 dark:text-blue-400" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      border: 'border-blue-200 dark:border-blue-500/20'
    },
    {
      title: 'Failed/Cancelled',
      value: (stats.cancelled + stats.noShows).toString(),
      icon: <XCircle size={20} className="text-rose-600 dark:text-rose-400" />,
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      border: 'border-rose-200 dark:border-rose-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{card.title}</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</h4>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.bg} ${card.border}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

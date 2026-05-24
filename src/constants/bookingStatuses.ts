import type { AdminBookingStatus } from '../types/bookingAdmin.types';

export const ADMIN_BOOKING_STATUSES: Record<AdminBookingStatus, { label: string; color: string; bgColor: string; borderColor: string; icon: string }> = {
  Pending: { 
    label: 'Pending', 
    color: 'text-amber-700 dark:text-amber-400', 
    bgColor: 'bg-amber-100 dark:bg-amber-500/10',
    borderColor: 'border-amber-200 dark:border-amber-500/20',
    icon: 'Clock'
  },
  Confirmed: { 
    label: 'Confirmed', 
    color: 'text-emerald-700 dark:text-emerald-400', 
    bgColor: 'bg-emerald-100 dark:bg-emerald-500/10',
    borderColor: 'border-emerald-200 dark:border-emerald-500/20',
    icon: 'CheckCircle2'
  },
  Cancelled: { 
    label: 'Cancelled', 
    color: 'text-rose-700 dark:text-rose-400', 
    bgColor: 'bg-rose-100 dark:bg-rose-500/10',
    borderColor: 'border-rose-200 dark:border-rose-500/20',
    icon: 'XCircle'
  },
  Completed: { 
    label: 'Completed', 
    color: 'text-indigo-700 dark:text-indigo-400', 
    bgColor: 'bg-indigo-100 dark:bg-indigo-500/10',
    borderColor: 'border-indigo-200 dark:border-indigo-500/20',
    icon: 'CheckSquare'
  },
  'No Show': { 
    label: 'No Show', 
    color: 'text-slate-700 dark:text-slate-400', 
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    borderColor: 'border-slate-200 dark:border-slate-700',
    icon: 'UserX'
  },
};

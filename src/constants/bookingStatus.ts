import type { BookingStatus } from '../types/booking.types';

export const BOOKING_STATUSES: Record<BookingStatus, { label: string; color: string; bgColor: string }> = {
  Pending: { label: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  Confirmed: { label: 'Confirmed', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  Cancelled: { label: 'Cancelled', color: 'text-slate-600', bgColor: 'bg-slate-100' },
  Failed: { label: 'Failed', color: 'text-rose-600', bgColor: 'bg-rose-100' },
};

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminBookingDetails } from '../hooks/useBookings';
import { BookingTimeline } from '../components/bookings/BookingTimeline';
import { BookingStatusBadge } from '../components/bookings/BookingStatusBadge';
import { BookingActions } from '../components/bookings/BookingActions';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { ArrowLeft, User, Phone, Mail, Calendar, Clock, CreditCard, AlignLeft, SearchX } from 'lucide-react';
import { formatDateSafe } from '../utils/dateFormat';

export const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: booking, isLoading, isError } = useAdminBookingDetails(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <EmptyState
        icon={SearchX}
        title="Booking Not Found"
        description="This booking record might have been deleted or does not exist."
        actionLabel="Back to Bookings"
        onAction={() => navigate('/bookings')}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/bookings')}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Booking Details</h1>
              <BookingStatusBadge status={booking.status} />
            </div>
            <p className="text-sm text-slate-500 font-mono">ID: {booking.referenceId}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-sm font-medium text-slate-500 pl-2">Actions</span>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
          <BookingActions booking={booking} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <User size={20} className="mr-2 text-indigo-500" />
              Customer Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Full Name</p>
                <p className="font-bold text-slate-900 dark:text-white">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Phone Number</p>
                <div className="flex items-center text-slate-900 dark:text-white font-medium">
                  <Phone size={14} className="mr-1.5 text-slate-400" />
                  {booking.customerPhone}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Email Address</p>
                <div className="flex items-center text-slate-900 dark:text-white font-medium">
                  <Mail size={14} className="mr-1.5 text-slate-400" />
                  {booking.customerEmail || 'Not provided'}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Created At</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {formatDateSafe(booking.createdAt, 'MMM d, yyyy - HH:mm')}
                </p>
              </div>
            </div>

            {booking.specialNote && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start space-x-3 bg-amber-50 dark:bg-amber-500/10 p-4 rounded-2xl border border-amber-200 dark:border-amber-500/20">
                  <AlignLeft className="text-amber-500 mt-0.5 shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Special Notes</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400">{booking.specialNote}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Calendar size={20} className="mr-2 text-indigo-500" />
              Reservation Details
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Offer</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{booking.offerTitle || 'Offer'}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Calendar size={16} className="text-indigo-500 mb-2" />
                  <p className="text-xs text-slate-500 mb-1">Date</p>
                  <p className="font-bold text-slate-900 dark:text-white">{formatDateSafe(booking.slotDate, 'MMM d, yyyy')}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <Clock size={16} className="text-indigo-500 mb-2" />
                  <p className="text-xs text-slate-500 mb-1">Time</p>
                  <p className="font-bold text-slate-900 dark:text-white">{booking.slotStartTime || 'TBA'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <User size={16} className="text-indigo-500 mb-2" />
                  <p className="text-xs text-slate-500 mb-1">Guests</p>
                  <p className="font-bold text-slate-900 dark:text-white">{booking.peopleCount}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <CreditCard size={16} className="text-emerald-500 mb-2" />
                  <p className="text-xs text-slate-500 mb-1">Amount</p>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">Rs {booking.totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Payment Status</h3>
            <div className={`p-4 rounded-2xl border ${
              booking.paymentStatus === 'Paid'
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                : booking.paymentStatus === 'Refunded'
                ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{booking.paymentStatus}</span>
                <CreditCard size={18} />
              </div>
              <p className="text-sm opacity-80">
                {booking.paymentStatus === 'Paid' ? 'Payment collected successfully.' :
                 booking.paymentStatus === 'Refunded' ? 'Payment was refunded.' :
                 'Awaiting payment collection.'}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Booking Journey</h3>
            <BookingTimeline booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
};
